// src/data/packagesData.js
export let packagesData = {
  "kerala-backwaters-beachesss": {
    id: "Kerala Backwaters & Beaches",
    name: "Kerala Backwaters & Beaches",
    duration: "05 Nights / 06 Days",
    destination: "Alleppey, Kovalam, Thiruvananthapuram",
    bestSeason: "Sep - Mar",
    price: "22,999",
    originalPrice: "27,999",
    discount: "Special 18% Off",
    rating: "4.7",
    reviews: "89",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526761122244-c85047c1e4bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552465018-69ad1d81d952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565498258066-166b3a4eb9e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Experience the ultimate Kerala getaway with our Backwaters & Beaches tour. This carefully crafted 6-day journey takes you through the serene backwaters of Alleppey and the stunning beaches of Kovalam.",
    detailedDescription: "Our Kerala Backwaters & Beaches package offers an unforgettable journey through God's Own Country. Begin your adventure in Alleppey, often called the 'Venice of the East,' where you'll cruise through tranquil backwaters on traditional houseboats.",
    highlights: [
      "Alleppey houseboat cruise through palm-lined waterways",
      "Kovalam beach relaxation and water sports",
      "Visit historic Alleppey Beach with 137-year-old pier",
      "Traditional Kerala street food experience",
      "Vijaya Beach Park family fun",
      "Sunset views at Alleppey Beach",
      "Local village culture experience"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Alleppey",
        description: "Arrive at Cochin International Airport, transfer to Alleppey. Evening visit to Alleppey Beach - walk on soft white sand, witness breathtaking sunset views, and enjoy local street food."
      },
      {
        day: "Day 2",
        title: "Alleppey Backwaters Cruise",
        description: "Full day houseboat cruise through Kerala's famous backwaters. Experience peaceful journey through green palm-lined waterways, traditional villages, and rich wildlife."
      }
    ],
    inclusions: [
      "Accommodation in 3-star hotels and houseboat",
      "Daily breakfast and all meals on houseboat",
      "AC vehicle for all transfers & sightseeing",
      "Alleppey backwater houseboat cruise"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner (except on houseboat)",
      "Premium water sports activities",
      "Personal expenses"
    ]
  }
  // ... other packages
};

// Update function
export const updatePackagesData = (newData) => {
  packagesData = { ...newData };
  console.log('Packages data updated:', Object.keys(packagesData).length, 'packages');
};

// Helper functions
export const getAllPackages = () => {
  return Object.values(packagesData);
};

export const getPackageById = (id) => {
    console.log(id)
  return packagesData[id] || null;
};

export const getPackageIds = () => {
  return Object.keys(packagesData);
};