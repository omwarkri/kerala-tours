import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Headphones, CreditCard, Lock, Phone, MessageCircle, X } from "lucide-react";

const Footer = () => {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const whatsappNumbers = [
    { number: "919028803309", display: "+91-9028803309" },
    { number: "919146385636", display: "+91-9146385636" }
  ];

  const openWhatsApp = (phoneNumber) => {
    const message = "Hello! I'm interested in your tour packages. Could you please provide more information?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppModal(false);
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-emerald-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Choose WhatsApp Number</h3>
              <button 
                onClick={() => setShowWhatsAppModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Select a number to start chatting on WhatsApp:
            </p>
            
            <div className="space-y-3">
              {whatsappNumbers.map((item, index) => (
                <button
                  key={index}
                  onClick={() => openWhatsApp(item.number)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-all duration-200 hover:scale-[1.02]"
                >
                  <span className="font-medium">{item.display}</span>
                  <MessageCircle className="w-5 h-5" />
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* === PAYMENT & SECURITY GROUP === */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PAYMENT OPTIONS */}
   <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
  <h3 className="text-emerald-400 font-bold text-sm mb-3 uppercase tracking-wide">
    Secure Payments
  </h3>
  <div className="flex justify-center flex-wrap gap-3">
    <div className="px-3 py-2 bg-white border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-20 text-center hover:bg-white/20 transition">
      <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="" />
    </div>
    <div className="px-3 py-2 bg-white border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-20 text-center hover:bg-white/20 transition">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/330px-Mastercard-logo.svg.png" alt="" />
    </div>
    <div className="px-3 py-2 bg-white border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-20 text-center hover:bg-white/20 transition">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/500px-PayPal.svg.png" alt="" />
    </div>
    <div className="px-3 py-2 bg-white border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-24 text-center hover:bg-white/20 transition">
      <img src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg" alt="" />
    </div>
    <div className="px-3 py-2 bg-white border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-20 text-center hover:bg-white/20 transition">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/500px-Maestro_2016.svg.png" alt="" />
    </div>
    <div className="px-3 py-2 bg-blue-600 border border-white/20 rounded-md text-white text-xs font-semibold uppercase tracking-wide w-24 text-center hover:bg-white/20 transition">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/640px-Visa_Electron.svg.png" alt="" />
    </div>
  </div>
</div>


          {/* APPROVED BY */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <h3 className="text-emerald-400 font-bold text-sm mb-3 uppercase tracking-wide">
              Approved By
            </h3>
            <div className="flex justify-center space-x-4 items-center">
              <div className="text-center">
                <div className="w-10 h-10 bg-white p-[1px]  flex items-center justify-center mx-auto mb-1">
                  <span className="text-orange-500 font-bold text-sm">🇮🇳</span>
                </div>
                <span className="text-white text-xs">Incredible India</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white p-[1px]  flex items-center justify-center mx-auto mb-1">
                  <img src="https://www.traveltrendstoday.in/storage/posts/iato-logo-1.jpg" alt="" />
                </div>
                <span className="text-white text-xs">IATO</span>
              </div>
                             <div className="text-center">
                <img className="w-10 h-10 bg-white p-[1px]  flex items-center justify-center mx-auto mb-1" src="https://images.squarespace-cdn.com/content/v1/5f24290fd0d0910ecab2b02e/1596245893901-GZ6ICWAPMR8QOY8MXDM3/0PATA-Logo-transparency_BLACK.png?format=1500w" alt="" />
                <span className="text-white text-xs">PATA</span>
              </div>
                   <div className="text-center">
                <img className="w-10 h-10 bg-white p-[1px]  flex items-center justify-center mx-auto mb-1" src="https://www.atoai.org/public/upload/atoai/images/logo.png" alt="" />
                <span className="text-white text-xs">ATOAI</span>
              </div>



              
            </div>
          </div>

          {/* GUARANTEE */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <h3 className="text-emerald-400 font-bold text-sm mb-3 uppercase tracking-wide">
              Our Guarantee
            </h3>
            <div className="flex justify-center space-x-4 text-green-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <Lock className="w-5 h-5" />
              <Headphones className="w-5 h-5" />
            </div>
            <p className="text-gray-300 text-xs">100% Trust & Security</p>
          </div>
        </div>
      </div>

      {/* === MAIN FOOTER GROUP === */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3 text-emerald-400">OMKAR TOUR AND TRAVELS</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Your trusted travel partner since 2010. Experience Kerala with expertly crafted tours and personalized service.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/17W2P32GJD/" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <span className="text-white text-sm font-semibold">f</span>
              </a>
              <a href="#youtube" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <span className="text-white text-sm font-semibold">y</span>
              </a>
              <a href="https://www.instagram.com/omkartours143/" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <span className="text-white text-sm">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/#packages" className="hover:text-emerald-400 transition-colors">Tour Packages</a>
              </li>
              <li>
                <a href="/#places" className="hover:text-emerald-400 transition-colors">Popular Places</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-emerald-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
              {/* Phone Numbers */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Call Us:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <a href="tel:+919028803309" className="hover:text-emerald-400 block text-white font-medium">
                    +91-9028803309
                  </a>
                  <a href="tel:+919146385636" className="hover:text-emerald-400 block text-white font-medium">
                    +91-9146385636
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <button 
                    onClick={() => setShowWhatsAppModal(true)}
                    className="hover:text-emerald-400 text-white font-medium text-left"
                  >
                    WhatsApp Now
                  </button>
                  <p className="text-xs text-gray-400">Both numbers available</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-2">
                <span className="w-4 h-4 text-emerald-400 mt-0.5">✉️</span>
                <a href="mailto:omkartours143@gmail.com" className="hover:text-emerald-400 text-white font-medium">
                  omkartours143@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Omkar Tour and Travels. All rights reserved.
            </p>
            <p className="text-emerald-400 text-sm font-semibold">
              Since 2010 • 5000+ Happy Travelers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;