// src/services/packageService.js
import { packagesData as initialPackages, getAllPackages, getPackageById } from '../data/packagesData';

class PackageService {
  constructor() {
    this.storageKey = 'omkar_tours_packages';
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.initializeData();
  }

  initializeData() {
    try {
      const currentData = this.getFromLocalStorage();
      if (!currentData || currentData.length === 0) {
        console.log('📦 Initializing packages data...');
        const defaultPackages = this.convertToArray(initialPackages);
        this.saveToLocalStorage(defaultPackages);
        console.log('✅ Packages data initialized:', defaultPackages.length, 'packages');
      }
    } catch (error) {
      console.error('❌ Error initializing data:', error);
    }
  }

  // Get all packages
  async getPackages() {
    try {
      const packages = this.getFromLocalStorage();
      
      if (!packages || packages.length === 0) {
        console.log('🔄 Loading default packages...');
        const defaultPackages = getAllPackages();
        this.saveToLocalStorage(defaultPackages);
        return defaultPackages;
      }
      
      return packages;
    } catch (error) {
      console.error('❌ Error getting packages:', error);
      return getAllPackages();
    }
  }

  // Get package by ID - FIXED: changed 'package' to 'packageItem'
  async getPackageById(id) {
    try {
      const packages = this.getFromLocalStorage();
      const packageItem = packages.find(pkg => pkg.id === id); // FIXED HERE
      
      if (!packageItem) {
        console.log('🔍 Package not found in localStorage, checking default data...');
        return getPackageById(id);
      }
      
      return packageItem || null;
    } catch (error) {
      console.error('❌ Error getting package by ID:', error);
      return getPackageById(id);
    }
  }

  // Create new package
  async createPackage(packageData) {
    try {
      const packages = this.getFromLocalStorage();
      const newPackage = {
        id: `pkg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...packageData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      packages.push(newPackage);
      this.saveToLocalStorage(packages);
      
      console.log('✅ Package created:', newPackage.id);
      
      // In development, also update the local file
      if (this.isDevelopment) {
        await this.updateSourceFile(packages);
      }
      
      return newPackage;
    } catch (error) {
      console.error('❌ Error creating package:', error);
      throw error;
    }
  }

  // Update package
  async updatePackage(id, updates) {
    try {
      const packages = this.getFromLocalStorage();
      const index = packages.findIndex(pkg => pkg.id === id);
      
      if (index !== -1) {
        packages[index] = {
          ...packages[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.saveToLocalStorage(packages);
        
        console.log('✅ Package updated:', id);
        
        // In development, also update the local file
        if (this.isDevelopment) {
          await this.updateSourceFile(packages);
        }
        
        return packages[index];
      }
      console.log('❌ Package not found for update:', id);
      return null;
    } catch (error) {
      console.error('❌ Error updating package:', error);
      throw error;
    }
  }

  // Delete package
  async deletePackage(id) {
    try {
      const packages = this.getFromLocalStorage();
      const filteredPackages = packages.filter(pkg => pkg.id !== id);
      
      if (filteredPackages.length < packages.length) {
        this.saveToLocalStorage(filteredPackages);
        
        console.log('✅ Package deleted:', id);
        
        // In development, also update the local file
        if (this.isDevelopment) {
          await this.updateSourceFile(filteredPackages);
        }
        
        return true;
      }
      console.log('❌ Package not found for deletion:', id);
      return false;
    } catch (error) {
      console.error('❌ Error deleting package:', error);
      throw error;
    }
  }

  // Update the source JavaScript file (development only)
  async updateSourceFile(packages) {
    if (!this.isDevelopment) return;
    
    try {
      // Convert array back to object format
      const packagesObject = {};
      packages.forEach(pkg => {
        packagesObject[pkg.id] = pkg;
      });

      const fileContent = this.generateFileContent(packagesObject);
      
      console.log('📝 Development Mode: Source file update required');
      console.log('💡 Copy the following and replace src/data/packagesData.js:');
      console.log(fileContent);
      
      // Store the updated content for manual copy
      localStorage.setItem('updated_packages_data', fileContent);
      
      return fileContent;
    } catch (error) {
      console.error('❌ Error updating source file:', error);
    }
  }

  // Generate file content
  generateFileContent(packagesObject) {
    return `// src/data/packagesData.js
export const packagesData = ${JSON.stringify(packagesObject, null, 2)};

// Helper functions
export const getAllPackages = () => {
  return Object.values(packagesData);
};

export const getPackageById = (id) => {
  return packagesData[id] || null;
};

export const getPackageIds = () => {
  return Object.keys(packagesData);
};
`;
  }

  // Export data
  exportData() {
    try {
      const packages = this.getFromLocalStorage();
      const dataStr = JSON.stringify({ packages }, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'omkar-tours-packages.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ Data exported successfully');

      // Also show file update instructions in development
      if (this.isDevelopment) {
        this.showFileUpdateInstructions(packages);
      }
    } catch (error) {
      console.error('❌ Error exporting data:', error);
    }
  }

  // Show instructions for updating the source file
  showFileUpdateInstructions(packages) {
    const packagesObject = {};
    packages.forEach(pkg => {
      packagesObject[pkg.id] = pkg;
    });

    const fileContent = this.generateFileContent(packagesObject);

    console.log('🚀 DEVELOPMENT MODE: File Update Required');
    console.log('=========================================');
    console.log('1. Copy the code below:');
    console.log('2. Replace the content in src/data/packagesData.js');
    console.log('3. Save the file and commit to Git');
    console.log('=========================================');
    
    // Show in alert for easy copy
    const shouldCopy = window.confirm(
      'Development Mode: Your changes are saved in localStorage.\n\n' +
      'To make changes permanent and deploy to Vercel:\n\n' +
      '1. Click OK to copy the updated code to clipboard\n' +
      '2. Replace src/data/packagesData.js with the copied code\n' +
      '3. Commit and push to GitHub\n\n' +
      'Click OK to copy the code now.'
    );
    
    if (shouldCopy) {
      navigator.clipboard.writeText(fileContent);
      alert('✅ Code copied to clipboard! Now replace src/data/packagesData.js and commit your changes.');
    }
  }

  // Import data
  async importData(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const packages = importedData.packages || importedData;
          
          if (Array.isArray(packages)) {
            this.saveToLocalStorage(packages);
            
            console.log('✅ Data imported successfully:', packages.length, 'packages');
            
            // In development, update source file
            if (this.isDevelopment) {
              this.updateSourceFile(packages);
            }
            
            resolve({ success: true, count: packages.length });
          } else {
            resolve({ success: false, error: 'Invalid file format' });
          }
        } catch (error) {
          resolve({ success: false, error: 'Error parsing JSON file' });
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset to original data
  async resetToOriginal() {
    try {
      const defaultPackages = getAllPackages();
      this.saveToLocalStorage(defaultPackages);
      
      console.log('✅ Reset to original data:', defaultPackages.length, 'packages');
      
      if (this.isDevelopment) {
        await this.updateSourceFile(defaultPackages);
      }
      
      return defaultPackages;
    } catch (error) {
      console.error('❌ Error resetting to original:', error);
      throw error;
    }
  }

  // Clear all data
  clearAllData() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('✅ All package data cleared');
      this.initializeData();
      return true;
    } catch (error) {
      console.error('❌ Error clearing data:', error);
      return false;
    }
  }

  // Get storage info
  getStorageInfo() {
    const packages = this.getFromLocalStorage();
    return {
      count: packages.length,
      storageKey: this.storageKey,
      isDevelopment: this.isDevelopment
    };
  }

  // Local storage helpers
  getFromLocalStorage() {
    try {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
      }
      return [];
    } catch (error) {
      console.error('❌ Error reading from localStorage:', error);
      return [];
    }
  }

  saveToLocalStorage(packages) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(packages));
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
      return false;
    }
  }

  convertToArray(packagesObj) {
    return Object.values(packagesObj);
  }
}

export default new PackageService();