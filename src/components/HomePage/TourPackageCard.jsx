import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TourPackageCard = ({ pkg }) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  
  const displayedHighlights = showAllHighlights 
    ? pkg.highlights 
    : pkg.highlights.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden w-full">
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {pkg.discount}
        </div>
      </div>
      

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg sm:text-xl font-serif font-semibold text-gray-800 leading-tight">{pkg.name}</h3>
          <div className="flex items-center bg-emerald-50 px-2 py-1 rounded ml-2">
            <span className="text-emerald-600 font-semibold text-sm">{pkg.rating}</span>
            <span className="text-yellow-400 ml-1 text-sm">★</span>
          </div>
        </div>

        {/* Duration and Destination */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-1">{pkg.duration}</p>
          <p className="text-gray-500 text-xs line-clamp-1">{pkg.destination}</p>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm">Tour Highlights:</h4>
          <ul className="space-y-1">
            {displayedHighlights.map((highlight, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-emerald-500 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
          {pkg.highlights.length > 3 && (
            <button
              onClick={() => setShowAllHighlights(!showAllHighlights)}
              className="text-emerald-600 text-xs font-semibold mt-2 hover:text-emerald-700 transition-colors"
            >
              {showAllHighlights ? 'Show Less' : `+${pkg.highlights.length - 3} More Days`}
            </button>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-baseline">
            <span className="text-xl sm:text-2xl font-bold text-emerald-600">₹{pkg.price.toLocaleString()}</span>
            <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">₹{pkg.originalPrice.toLocaleString()}</span>
          </div>
          <Link 
            to={`/packages/${pkg.id}`}
            className="bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPackageCard;