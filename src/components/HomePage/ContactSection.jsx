import React from "react";
// import SEOHead from "../components/common/SEOHead";
import Footer from "../components/common/Footer";

const ContactPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
     


      {/* Main Content - Centered Single Column */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help you plan the perfect Kerala experience. Reach out through any channel that's convenient for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Phone */}
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl text-white">📞</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-700 mb-1">
                  <a href="tel:+919028803309" className="hover:text-emerald-600 transition duration-200 font-semibold text-lg">
                    +91-9028803309
                  </a>
                </p>
                <p className="text-gray-700">
                  <a href="tel:+919028803309" className="hover:text-emerald-600 transition duration-200 font-semibold text-lg">
                    +91-9028803309
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-2 font-medium">Direct line to our travel experts</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl text-white">💬</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-gray-700 mb-1">
                  <a 
                    href="https://wa.me/919028803309" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 transition duration-200 font-semibold text-lg"
                  >
                    +91-9028803309
                  </a>
                </p>
                <p className="text-sm text-gray-600 font-medium">24/7 Available • Instant Response</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl text-white">✉️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-700 mb-1">
                  <a href="mailto:omkartours143@gmail.com" className="hover:text-emerald-600 transition duration-200 font-semibold text-base break-all">
                    omkartours143@gmail.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <a href="mailto:omkartours143@gmail.com" className="hover:text-emerald-600 transition duration-200 font-semibold text-base break-all">
                    omkartours143@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-2 font-medium">For detailed inquiries</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl text-white">🏢</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Office Address</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Office No 238 Rashtrakuta Building<br />
                  Empire Industrial Centrum<br />
                  Chikhloli Kalyan Badlapur road<br />
                  Ambernath west 421505<br />
                  Tal: Ambernath Dist - Thane
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <a
              href="https://wa.me/919028803309"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span className="mr-3 text-2xl">💬</span>
              Chat on WhatsApp
              <span className="ml-2">→</span>
            </a>
            <a
              href="tel:+919028803309"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span className="mr-3 text-2xl">📞</span>
              Call Now
              <span className="ml-2">→</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></span>
                ✅ 5000+ Happy Customers
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></span>
                ⭐ Best Price Guarantee
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></span>
                🕒 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;