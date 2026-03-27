import React from "react";
import SEOHead from "../components/common/SEOHead";
import Footer from "../components/common/Footer";

const AboutUsPage = () => {
  return (
    <div className="pt-20 min-h-screen">
      <SEOHead 
        title="About Omkar Tour and Travels | Kerala Tourism Experts"
        description="Omkar Tour and Travels - Trusted Kerala travel agency. 5000+ happy customers, best price guarantee, 24/7 support. Learn about our story and expertise."
        keywords="Omkar Tour and Travels about, Kerala travel agency, tour operators Kerala, trusted travel company"
      />
      
      <section className="max-w-7xl mx-auto py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-6 tracking-wider uppercase">
            About Omkar Tour and Travels
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted travel partner in Kerala, creating unforgettable experiences in God's Own Country.
          </p>
        </div>
        

        {/* Inserted About Us section */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-gray-700 leading-relaxed mb-4">
            Omkar Tour and Travels is a well-established travel company in India, recognized as one of the 
            fastest-growing domestic and inbound tour operators with over ten years of experience. They specialize 
            in designing personalized travel itineraries tailored to meet the unique tastes and preferences of each traveler.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With extensive knowledge of Kerala’s rich culture, scenic landscapes, and major attractions, Omkar Tour and Travels 
            expertly combines genuine local experiences with top-tier hospitality and high service standards.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Their team of experienced tourism professionals is committed to providing convenient, efficient, and dependable 
            services, available 24/7 to assist clients throughout their entire journey. They offer affordable, reliable travel 
            packages and have special options specifically crafted for honeymoon couples and group travelers, ensuring that every 
            guest enjoys a memorable, smooth, and seamless travel experience from start to finish.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                Omkar Tour and Travels is a well-established travel company in India, recognized as one of the 
                fastest-growing domestic and inbound tour operators with over ten years of experience. They specialize 
                in designing personalized travel itineraries tailored to meet the unique tastes and preferences of each traveler.
              </p>
              <p>
                With extensive knowledge of Kerala's rich culture, scenic landscapes, and major attractions, 
                Omkar Tour and Travels expertly combines genuine local experiences with top-tier hospitality 
                and high service standards.
              </p>
              <p>
                Their team of experienced tourism professionals is committed to providing convenient, efficient, 
                and dependable services, available 24/7 to assist clients throughout their entire journey. They 
                offer affordable, reliable travel packages and have special options specifically crafted for 
                honeymoon couples and group travelers, ensuring that every guest enjoys a memorable, smooth, 
                and seamless travel experience from start to finish.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80" 
              alt="Omkar Tour and Travels team" 
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-emerald-50 p-8 rounded-2xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To provide exceptional travel experiences in Kerala by combining local expertise with personalized 
              service, ensuring every journey becomes a cherished memory. We strive to deliver convenient, 
              efficient, and dependable services that exceed customer expectations.
            </p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-2xl">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be recognized as India's fastest-growing and most trusted travel company, known for our 
              personalized itineraries, genuine local experiences, and unwavering commitment to customer 
              satisfaction across all travel segments.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Travel With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold mb-2">Personalized Itineraries</h4>
              <p className="text-gray-600 text-sm">Tailored travel plans designed to match your unique preferences and tastes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold mb-2">Local Expertise</h4>
              <p className="text-gray-600 text-sm">Deep knowledge of Kerala's culture, landscapes, and authentic experiences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">Round-the-clock assistance throughout your entire journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💑</span>
              </div>
              <h4 className="font-semibold mb-2">Specialized Packages</h4>
              <p className="text-gray-600 text-sm">Expertly crafted options for honeymoon couples and group travelers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold mb-2">Affordable & Reliable</h4>
              <p className="text-gray-600 text-sm">Competitive pricing with dependable service quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-semibold mb-2">Seamless Experience</h4>
              <p className="text-gray-600 text-sm">Memorable and smooth travel experiences from start to finish</p>
            </div>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🏡</div>
              <h4 className="font-semibold mb-2">Domestic Tours</h4>
              <p className="text-gray-600 text-sm">Comprehensive travel experiences across India</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="font-semibold mb-2">Inbound Tourism</h4>
              <p className="text-gray-600 text-sm">Welcoming international travelers to experience Kerala</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">💑</div>
              <h4 className="font-semibold mb-2">Honeymoon Packages</h4>
              <p className="text-gray-600 text-sm">Romantic getaways for newlyweds</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">👥</div>
              <h4 className="font-semibold mb-2">Group Travel</h4>
              <p className="text-gray-600 text-sm">Customized packages for groups and families</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
