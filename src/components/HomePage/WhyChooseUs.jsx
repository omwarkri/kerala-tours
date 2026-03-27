import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏆",
      title: "13+ Years Experience",
      description: "Trusted travel experts since 2010 with deep local knowledge"
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      description: "We promise the best rates for the same quality of service"
    },
    
    {
      icon: "🛡️",
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your journey"
    },
    {
      icon: "🎯",
      title: "Customized Itineraries",
      description: "Tailor-made packages to match your preferences and budget"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "5000+ Happy Customers",
      description: "Join our family of satisfied travelers across India"
    },
    {
      icon: "🏨",
      title: "Premium Partnerships",
      description: "Best hotels and service providers across Kerala"
    }
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Why Choose Omkar Tour and Travels?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            We go beyond just booking your trip - we create memories that last a lifetime
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 text-center group hover:shadow-xl transition duration-300"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 group-hover:bg-emerald-200 transition duration-300">
                <span className="text-lg sm:text-xl lg:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;