import React from "react";
import {
  CheckCircle,

  HeartHandshake,
  MapPin,
  BadgeCheck,
  Star,

} from "lucide-react";

const AboutUsSection = () => {
  return (
    <div id="about" className="pt-16 md:pt-20 bg-white text-gray-800">
      {/* Main Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 lg:py-20 px-4 sm:px-6 mb-16">
        {/* Heading */}
        <div className="text-center mb-5 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-3 md:mb-4 tracking-wide uppercase">
            About Omkar Tour and Travels
          </h1>
          <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Your trusted travel partner in Kerala over 10 years, crafting
            unforgettable journeys across God's Own Country.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm sm:text-base">
              Omkar Tour and Travels is a well-established travel company in India, recognized as one of
the fastest-growing domestic and inbound tour operators with over ten years of experience.
They specialize in designing personalized travel itineraries tailored to meet the unique tastes
and preferences of each traveler. With extensive knowledge of Kerala’s rich culture, scenic
landscapes, and major attractions, Omkar Tour and Travels expertly combines genuine local
experiences with top-tier hospitality and high service standards.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm sm:text-base">
             Their team of experienced tourism professionals is committed to providing convenient,
efficient, and dependable services, available 24/7 to assist clients throughout their entire
journey. They offer affordable, reliable travel packages and have special options specifically
crafted for honeymoon couples and group travelers, ensuring that every guest enjoys a
memorable, smooth, and seamless travel experience from start to finish.
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                  10+
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                  5000+
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Happy Customers</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80"
              alt="Omkar Tour and Travels team"
              className="rounded-xl md:rounded-2xl shadow-lg w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>
        </div>

      

        {/* Why Us Section */}
        <div className="bg-gray-50 py-8 md:py-12 rounded-xl md:rounded-2xl mb-10 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-10">Why Choose Us</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4">
            {[
              {
                icon: BadgeCheck,
                title: "Approved by Tourism Board",
                desc: "Trusted by Government-certified tourism organizations.",
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                desc: "Deep understanding of Kerala's destinations & culture.",
              },
              {
                icon: HeartHandshake,
                title: "Personalized Service",
                desc: "Custom itineraries & dedicated travel support 24x7.",
              },
              {
                icon: Star,
                title: "Value for Money",
                desc: "Top-quality experiences at the best prices.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-3 sm:p-4 md:p-6 text-center rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition"
              >
                <item.icon className="mx-auto text-emerald-600 mb-2 md:mb-3" size={24} />
                <h4 className="font-semibold text-xs sm:text-sm md:text-lg mb-1 md:mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Book Online */}
        <div className="py-4 pt-0 md:py-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-10">
            Why Book <span className="text-emerald-600">Online</span> With Us
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4">
            {[
              {
                title: "Save Time",
                desc: "Get instant quotes & packages from verified agents.",
              },
              {
                title: "Multiple Options",
                desc: "Compare itineraries & select what fits your needs.",
              },
              {
                title: "Save Money",
                desc: "Get the best deals directly from trusted providers.",
              },
              {
                title: "Trusted Network",
                desc: "Access 2000+ verified hotels & travel guides.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-t-4 border-emerald-600 bg-white p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl text-center shadow-sm hover:shadow-md"
              >
                <CheckCircle
                  className="mx-auto text-emerald-600 mb-2 md:mb-3"
                  size={20}
                />
                <h4 className="font-semibold text-xs sm:text-sm md:text-lg mb-1 md:mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;