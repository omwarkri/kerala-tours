import React, { useState } from "react";
import Footer from "../components/common/Footer";

const ContactPage = () => {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  // WhatsApp numbers
  const whatsappNumbers = [
    "919028803309",
    "919146385636"
  ];

  // Phone numbers for calls
  const phoneNumbers = [
    "919028803309",
    "919146385636"
  ];

  const handleWhatsAppClick = () => {
    setShowWhatsAppModal(true);
  };

  const handleCallClick = () => {
    setShowCallModal(true);
  };

  const handleNumberSelect = (phoneNumber, isWhatsApp = false) => {
    if (isWhatsApp) {
      const message = "Hi, I'm interested in Kerala tour packages. Please share more details.";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setShowWhatsAppModal(false);
    } else {
      window.location.href = `tel:${phoneNumber}`;
      setShowCallModal(false);
    }
  };

  const closeModal = () => {
    setShowWhatsAppModal(false);
    setShowCallModal(false);
  };

  return (
    <div id="contact" className="pt-0 min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our travel experts to plan your perfect Kerala experience
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl text-white">📞</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <a href="tel:+919028803309" className="block text-gray-700 hover:text-blue-600 transition-colors">
                  +91-9028803309
                </a>
                <a href="tel:+919146385636" className="block text-gray-700 hover:text-blue-600 transition-colors">
                  +91-9146385636
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl text-white">💬</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <a 
                  href="https://wa.me/919028803309" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                >
                  +91-9028803309
                </a>
                <a 
                  href="https://wa.me/919146385636" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                >
                  +91-9146385636
                </a>
                <p className="text-sm text-green-600 mt-1">24/7 Available</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl text-white">✉️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <a href="mailto:omkartours143@gmail.com" className="block text-gray-700 hover:text-purple-600 transition-colors text-sm">
                  omkartours143@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl text-white">🏢</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                <p className="text-sm text-gray-700">
                  Office No 238, Rashtrakuta Building, Ambernath West 421505
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-4 max-w-sm mx-auto">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm"
            >
              <span className="mr-2">💬</span>
              Chat on WhatsApp
            </button>
            <button
              onClick={handleCallClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm"
            >
              <span className="mr-2">📞</span>
              Call Now
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Modal */}
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
                  onClick={() => handleNumberSelect(number, true)}
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

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xs w-full">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Choose a number</h3>
            </div>
            <div className="p-4 space-y-3">
              {phoneNumbers.map((number, index) => (
                <button
                  key={index}
                  onClick={() => handleNumberSelect(number, false)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
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
      

      <Footer />
    </div>
  );
};

export default ContactPage;