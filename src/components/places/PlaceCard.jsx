import React from "react";
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  return (
    <div className="block group">
      <div className="bg-white shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={place.image}
            alt={`${place.name} - Kerala tourism destination`}
            className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        {/* Info Section - Always visible below image */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition duration-300">
              {place.name}
            </h3>
            <div className="flex items-center text-sm text-emerald-600 font-semibold">
              <span className="mr-1">⭐</span>
              {place.rating}
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {place.desc}
          </p>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-emerald-400 mr-2"></span>
              {place.tours} tours available
            </div>
            
            {place.bestTime && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-emerald-400 mr-2"></span>
                Best time: {place.bestTime}
              </div>
            )}
            
            {place.distance && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-emerald-400 mr-2"></span>
                {place.distance} from Kochi
              </div>
            )}
          </div>

          {place.highlights && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Highlights:</h4>
              <div className="flex flex-wrap gap-1">
                {place.highlights.slice(0, 3).map((highlight, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1"
                  >
                    {highlight}
                  </span>
                ))}
                {place.highlights.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1">
                    +{place.highlights.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3 pt-2">
            <Link 
              to={`/place/${place.id}`}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-center py-2 px-3 font-semibold transition duration-300 text-sm"
            >
              View Details
            </Link>
            <Link 
              to={`/packages?destination=${place.name}`}
              className="flex-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white text-center py-2 px-3 font-semibold transition duration-300 text-sm"
            >
              View Tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;