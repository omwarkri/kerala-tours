import React, { useState } from "react";
import { Link } from 'react-router-dom';

const TourPackageCard = ({ pkg }) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const hasMoreHighlights = pkg.highlights.length > 3;
  const displayedHighlights = showAllHighlights ? pkg.highlights : pkg.highlights.slice(0, 3);

  // WhatsApp numbers
  const whatsappNumbers = [
    "919028803309",
    "919146385636"
  ];

  const handleWhatsAppClick = () => {
    setShowWhatsAppModal(true);
  };

  const handleNumberSelect = (phoneNumber) => {
    const message = `Hi, I'm interested in the ${pkg.name} (${pkg.duration}). Please share more details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppModal(false);
  };

  const closeModal = () => {
    setShowWhatsAppModal(false);
  };

  return (
    <>
      <div className="group bg-white shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Image Section - Fixed Height */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={pkg.image}
            alt={`${pkg.name} - ${pkg.destination} tour package`}
            className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {pkg.duration}
            </span>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Omkar Special
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
        </div>

        {/* Content Section - Flexible Height */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Header Section */}
          <div className="mb-4 flex-shrink-0">
            <Link to={`/package/${pkg.id}`}>
              <h3 className="text-xl font-bold text-gray-800  hover:text-emerald-600 transition duration-300 line-clamp-2 min-h-[1.5rem]">
                {pkg.name}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 w-full">
              <span className="flex items-center mr-1 md:mr-4 text-[12px] truncate">
                <svg className="w-4 h-4 mr-1 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{pkg.destination}</span>
              </span>
              <span className="flex items-center text-[12px] flex-shrink-0">
                <svg className="w-4 h-4 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Best: {pkg.bestSeason}
              </span>
            </div>
          </div>

          {/* Icons Section - Fixed Height */}
          <div className="flex justify-between mb-4 py-3 border-y border-gray-100 flex-shrink-0">
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm">✈️</span>
              </div>
              <span className="text-xs text-gray-600">Flight</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm">🏨</span>
              </div>
              <span className="text-xs text-gray-600">Hotels</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm">👀</span>
              </div>
              <span className="text-xs text-gray-600">Sights</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm">🍴</span>
              </div>
              <span className="text-xs text-gray-600">Meals</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-sm">🚐</span>
              </div>
              <span className="text-xs text-gray-600">Transfers</span>
            </div>
          </div>

          {/* Highlights Section - Flexible Height */}
          <div className="mb-4 flex-grow">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm">
              <svg className="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Tour Highlights
            </h4>
            <ul className="space-y-2">
              {displayedHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span className="line-clamp-2 leading-tight">{highlight}</span>
                </li>
              ))}
            </ul>
            
            {/* Show More/Less Button */}
            {hasMoreHighlights && (
              <button
                onClick={() => setShowAllHighlights(!showAllHighlights)}
                className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center transition duration-300"
              >
                {showAllHighlights ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    +{pkg.highlights.length - 3} More Highlights
                  </>
                )}
              </button>
            )}
          </div>

          {/* Price and Rating Section - Fixed Height */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-800">₹{pkg.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500 ml-1">/person</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded mr-2">
                  {pkg.discount}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₹{pkg.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-emerald-600 justify-end">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {pkg.rating} ({pkg.reviews})
              </div>
            </div>
          </div>

          {/* CTA Buttons - Fixed Height */}
          <div className="flex space-x-3 flex-shrink-0">
            <Link
              to={`/package/${pkg.id}`}
              className="flex-1 bg-emerald-500 text-white py-2 font-semibold hover:bg-emerald-600 transition duration-300 text-center text-sm"
            >
              View Details
            </Link>
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition duration-300 text-center text-sm"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Simple WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xs w-full">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Choose a number</h3>
            </div>
            <div className="p-4 space-y-3">
              {whatsappNumbers.map((number, index) => (
                <button
                  key={index}
                  onClick={() => handleNumberSelect(number)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                >
                  +91 {number.slice(2)}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="w-full text-gray-600 hover:text-gray-800 py-2 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourPackageCard;