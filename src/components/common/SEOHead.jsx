import React from 'react';

const SEOHead = ({ title, description, keywords, canonical }) => {
  React.useEffect(() => {
    // Update meta tags dynamically
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Omkar Tour and Travels",
      "description": "Kerala tour packages and travel services since 2010",
      "url": window.location.href,
      "telephone": "+91-9028803309",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office No 238 Rashtrakuta Building Empire Industrial Centrum",
        "addressLocality": "Ambernath West",
        "postalCode": "421505",
        "addressRegion": "Thane",
        "addressCountry": "IN"
      },
      "openingHours": "Mo-Su 24/7",
      "areaServed": "Kerala, India"
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords]);

  return null;
};

export default SEOHead;