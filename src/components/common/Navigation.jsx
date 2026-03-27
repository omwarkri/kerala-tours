import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll handler (works across pages)
  const handleScrollToSection = (path, sectionId = null) => {
    setIsMenuOpen(false);

    if (location.pathname !== path) {
      // Navigate first if not already on the page
      navigate(path);
      setTimeout(() => {
        if (sectionId) {
          const element = document.querySelector(sectionId);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 400); // small delay to wait for page render
    } else {
      // Already on same page → just scroll
      if (sectionId) {
        const element = document.querySelector(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const phoneNumbers = [
    {
      number: "+91 90288 03309",
      whatsapp: "https://wa.me/919028803309",
      call: "tel:+919028803309"
    },
    {
      number: "+91 91463 85636",
      whatsapp: "https://wa.me/919146385636",
      call: "tel:+919146385636"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/17W2P32GJD/",
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
   {
  name: "Instagram",
  url: "https://www.instagram.com/omkartours143/",
  icon: (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5c3.176 0 5.75-2.574 5.75-5.75v-8.5C22 4.574 19.426 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  ),
}
,
      {
      name: "YouTube",
      url: "https://youtube.com/yourchannel",
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourprofile",
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
  
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/yourcompany",
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-emerald-600 text-white py-1">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex justify-between items-center">
          {/* Phone Numbers with WhatsApp and Call Icons */}
          <div className="flex items-center space-x-3">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center space-x-1">
                {/* WhatsApp Icon */}
                <a
                  href={phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-green-200 transition-colors duration-200 bg-green-600 hover:bg-green-700 rounded p-1"
                  title={`WhatsApp ${phone.number}`}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
                  </svg>
                </a>

                {/* Call Icon */}
                <a
                  href={phone.call}
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200 bg-blue-600 hover:bg-blue-700 rounded p-1"
                  title={`Call ${phone.number}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.518 4.55a1 1 0 01-.272 1.03l-2.12 2.12a16.001 16.001 0 006.586 6.586l2.12-2.12a1 1 0 011.03-.272l4.55 1.518A1 1 0 0121 18.72V22a2 2 0 01-2 2h-1C9.716 24 0 14.284 0 3V2a2 2 0 012-2h1z"/>
                  </svg>
                </a>

                {/* Phone Number */}
                <span className="text-xs font-medium inline">{phone.number}</span>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-1">
  {/* Show all icons on desktop, only first 3 on mobile */}
  {socialLinks.slice(0, typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : socialLinks.length).map((social) => (
    <a

      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-200 p-0.5 rounded hover:bg-emerald-700 transition-colors duration-200"
      title={social.name}
    >
      {social.icon}
    </a>
  ))}
</div>
      
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto sm:px-2 lg:px-3">
        <div className="flex justify-between items-center py-3 sm:py-2">
          <Link
            to="/"
            onClick={() => handleScrollToSection("/")}
            className="flex items-center"
          >
            <img
              src="https://res.cloudinary.com/dl2gcscfa/image/upload/v1759578583/logo_dps0pd.jpg"
              className="w-32 md:w-44 h-auto ml-2"
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <button
              onClick={() => handleScrollToSection("/")}
              className="text-gray-700 hover:text-emerald-600 font-medium text-sm"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#packages")}
              className="text-gray-700 hover:text-emerald-600 font-medium text-sm"
            >
              Tour Packages
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#places")}
              className="text-gray-700 hover:text-emerald-600 font-medium text-sm"
            >
              Popular Places
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#about")}
              className="text-gray-700 hover:text-emerald-600 font-medium text-sm"
            >
              About Us
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#contact")}
              className="bg-emerald-500 text-white px-3 py-1 rounded font-medium hover:bg-emerald-600 transition-all duration-300 text-sm"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 rounded hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-4 h-4 flex flex-col justify-between relative">
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "max-h-96 py-2 border-t border-gray-200 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleScrollToSection("/")}
              className="text-gray-700 hover:text-emerald-600 font-medium py-1 px-3 text-sm text-left"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#packages")}
              className="text-gray-700 hover:text-emerald-600 font-medium py-1 px-3 text-sm text-left"
            >
              Tour Packages
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#places")}
              className="text-gray-700 hover:text-emerald-600 font-medium py-1 px-3 text-sm text-left"
            >
              Popular Places
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#about")}
              className="text-gray-700 hover:text-emerald-600 font-medium py-1 px-3 text-sm text-left"
            >
              About Us
            </button>
            <button
              onClick={() => handleScrollToSection("/", "#contact")}
              className="bg-emerald-500 text-white px-4 py-2 rounded font-medium hover:bg-emerald-600 text-center mt-1 text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  
};

export default Navigation;