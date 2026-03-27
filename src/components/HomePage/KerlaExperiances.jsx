import React from "react";
import { useNavigate } from "react-router-dom";

const KeralaExperiences = () => {
  const navigate = useNavigate();

  const experiences = [
    {
      id: "ayurveda",
      title: "Ayurveda",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/shirodhara_t8shj8.jpg",
      description: "Traditional healing and wellness treatments"
    },
    {
      id: "artforms",
      title: "Artforms",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770809/theyyam_fnnirr.jpg",
      description: "Traditional arts and performances"
    },
    
    {
      id: "events",
      title: "Events",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
      description: "Cultural festivals and celebrations"
    },
    {
      id: "cuisine",
      title: "Cuisine",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/Puttu_and_Kadala_Curry_frdnyy.jpg",
      description: "Authentic Kerala culinary delights"
    },
    {
      id: "photo-gallery",
      title: "Photo Gallery",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/Snake_Boat_Races_Vallam_Kali_iko5qt.png",
      description: "Visual journey through Kerala"
    },
    {
      id: "people-experiances",
      title: "People Experiances",
      img: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/onam_12_n17zjz.png",
      description: "Digital travel guides and information"
    },
  ];

  const handleExploreClick = (experienceId) => {
    navigate(`/experiences/${experienceId}`);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 md:pb-20 mb-14 md:mb-32">
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-1 md:mb-6 tracking-wider uppercase">
          Kerala Roots
        </h2>
        <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
          Discover the diverse experiences that make Kerala truly unique
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left Section - Big image on top, two small images below */}
        <div className="space-y-3">
          {/* Big image - Ayurveda */}
          <div className="relative group overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={experiences[0].img}
              alt={experiences[0].title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white text-xl font-semibold mb-2">
                {experiences[0].title}
              </h3>
              <button
                onClick={() => handleExploreClick(experiences[0].id)}
                className="inline-flex text-white px-4 py-1 rounded-full text-sm border border-white hover:bg-white hover:text-black transition w-fit"
              >
                Explore →
              </button>
            </div>
          </div>
          
          {/* Two small images below - Artforms & Events */}
          <div className="grid grid-cols-2 gap-3">
            {experiences.slice(1, 3).map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => handleExploreClick(item.id)}
                    className="inline-flex bg-white/20 text-white px-3 py-1 rounded-full text-xs border border-white hover:bg-white hover:text-black transition w-fit"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Two small images on top, one big image below */}
        <div className="space-y-3">
          {/* Two small images on top - Cuisine & Photo Gallery */}
          <div className="grid grid-cols-2 gap-3">
            {experiences.slice(3, 5).map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => handleExploreClick(item.id)}
                    className="inline-flex bg-white/20 text-white px-3 py-1 rounded-full text-xs border border-white hover:bg-white hover:text-black transition w-fit"
                  >
                    Exploree →
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Big image at bottom - E-brochure */}
          <div className="relative group overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={experiences[5].img}
              alt={experiences[5].title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white text-xl font-semibold mb-2">
                {experiences[5].title}
              </h3>
              <button
                onClick={() => handleExploreClick(experiences[5].id)}
                className="inline-flex bg-white/20 text-white px-4 py-1 rounded-full text-sm border border-white hover:bg-white hover:text-black transition w-fit"
              >
                Explore →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeralaExperiences;