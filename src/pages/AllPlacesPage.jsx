// src/pages/AllPlacesPage.js
import React from "react";
import { Link } from 'react-router-dom';
import SEOHead from "../components/common/SEOHead";
import Footer from "../components/common/Footer";
import PlaceCard from '../components/places/PlaceCard';

const AllPlacesPage = () => {
  const places = [
    { 
      id: "munnar",
      name: "MUNNAR", 
      desc: "Arguably the best hill station in South India with tea-clad hill tops and valleys.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
      rating: "4.8",
      tours: "12",
      highlights: ["Tea Plantations", "Eravikulam National Park", "Mattupetty Dam", "Tea Museum"],
      bestSeason: "September to May",
      packages: ["Munnar Tea Plantations Tour", "Complete Kerala Experience", "Kerala Honeymoon Special"]
    },
    { 
      id: "alleppey",
      name: "ALLEPPEY", 
      desc: "The rare water world aptly called Venice of the East with beautiful green paddy pastures.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/alleppey_o4rtdm.jpg",
      rating: "4.9",
      tours: "8",
      highlights: ["Houseboat Cruise", "Backwaters", "Alleppey Beach", "Vembanad Lake"],
      bestSeason: "August to March",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"]
    },
    { 
      id: "kochi",
      name: "KOCHI", 
      desc: "The commercial capital of Kerala blending Portuguese, Dutch, and British colonial influences.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
      rating: "4.5",
      tours: "7",
      highlights: ["Fort Kochi", "Chinese Fishing Nets", "Jewish Synagogue", "Kathakali Dance"],
      bestSeason: "Year Round",
      packages: ["Kerala Cultural Heritage", "Complete Kerala Experience"]
    },
    { 
      id: "wayanad",
      name: "WAYANAD", 
      desc: "Mystical wilderness and tribal heritage in the northern hills of Kerala.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/wayanad_wj1ce1.jpg",
      rating: "4.7",
      tours: "9",
      highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak", "Wildlife Sanctuary"],
      bestSeason: "October to May",
      packages: ["Wayanad Adventure Tour", "Complete Kerala Experience"]
    },
    { 
      id: "thekkady",
      name: "THEKKADY", 
      desc: "Home to Periyar Wildlife Sanctuary, offering thrilling jungle experiences and spice plantations.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg",
      rating: "4.6",
      tours: "9",
      highlights: ["Periyar Wildlife Sanctuary", "Spice Plantations", "Bamboo Rafting", "Elephant Ride"],
      bestSeason: "November to April",
      packages: ["Kerala Wildlife Adventure", "Complete Kerala Experience", "Munnar Tea Plantations Tour"]
    },
    { 
      id: "kumarakom",
      name: "KUMARAKOM", 
      desc: "A picturesque backwater destination with luxurious resorts and serene Vembanad Lake views.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumarakom-Kumarakom-Bird-Sanctuary-2_tksq4a.jpg",
      rating: "4.8",
      tours: "4",
      highlights: ["Vembanad Lake", "Bird Sanctuary", "Luxury Resorts", "Houseboat Stays"],
      bestSeason: "September to March",
      packages: ["Kerala Backwaters & Beaches", "Luxury Kerala Experience"]
    },
    { 
      id: "kovalam",
      name: "KOVALAM", 
      desc: "Experience beach life with friendly tides, sun ups and sun downs - the best beach to unwind.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kovalam_tkrqfh.jpg",
      rating: "4.7",
      tours: "6",
      highlights: ["Lighthouse Beach", "Hawa Beach", "Water Sports", "Ayurvedic Massage"],
      bestSeason: "September to March",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"]
    },
    { 
      id: "vagamon",
      name: "VAGAMON", 
      desc: "The Queen of Mist and Tranquility with rolling green meadows and pine forests.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193267/Vagamon_xgcm4m.jpg",
      rating: "4.4",
      tours: "3",
      highlights: ["Pine Forest", "Vagamon Meadows", "Kurisumala Church", "Paragliding"],
      bestSeason: "September to March",
      packages: ["Vagamon Hill Retreat", "Adventure Kerala Tour"]
    },
    { 
      id: "athirappilly",
      name: "ATHIRAPPILLY", 
      desc: "The Niagara of South India - Kerala's largest waterfall in lush tropical forests.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Athirappilly_Waterfalls__pnmbmo.jpg",
      rating: "4.6",
      tours: "5",
      highlights: ["Athirappilly Waterfalls", "Vazhachal Waterfalls", "Butterfly Garden", "Sholayar Dam"],
      bestSeason: "October to May",
      packages: ["Waterfall Adventure Tour", "Nature & Wildlife Kerala"]
    },
    { 
      id: "varkala",
      name: "VARKALA", 
      desc: "Coastal cliffs and spiritual serenity with dramatic red sandstone cliffs overlooking the Arabian Sea.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/varkala_1_zcdenb.jpg",
      rating: "4.5",
      tours: "4",
      highlights: ["Varkala Beach", "Janardhana Swamy Temple", "Varkala Cliff", "Kappil Lake"],
      bestSeason: "October to March",
      packages: ["Beach & Culture Tour", "Kerala Coastal Experience"]
    },
    { 
      id: "palakkad",
      name: "PALAKKAD", 
      desc: "The Gateway of Kerala's Natural and Cultural Heritage with vast paddy fields and ancient forts.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Palakkad_kava54.jpg",
      rating: "4.3",
      tours: "5",
      highlights: ["Malampuzha Dam", "Palakkad Fort", "Parambikulam Sanctuary", "Silent Valley"],
      bestSeason: "November to February",
      packages: ["Nature & Heritage Tour", "Complete Kerala Experience"]
    },
    { 
      id: "bekal",
      name: "BEKAL", 
      desc: "Historic Fort and Seaside Serenity - Kerala's largest and best-preserved fort by the Arabian Sea.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/bekal3_nq1ce8.jpg",
      rating: "4.4",
      tours: "3",
      highlights: ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Kodi Cliff"],
      bestSeason: "October to March",
      packages: ["Historic Kerala Tour", "Coastal Heritage Experience"]
    },
    { 
      id: "thrissur",
      name: "THRISSUR", 
      desc: "Kerala's Cultural Capital rich in heritage, festivals, temples, and natural beauty.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
      rating: "4.5",
      tours: "6",
      highlights: ["Vadakkunnathan Temple", "Athirappilly Waterfalls", "Guruvayur Temple", "Thrissur Pooram"],
      bestSeason: "October to March",
      packages: ["Cultural Kerala Tour", "Temple Trail Experience"]
    },
    { 
      id: "munroe-island",
      name: "MUNROE ISLAND", 
      desc: "Tranquil Backwater Gem - cluster of eight small islands at the confluence of Ashtamudi Lake.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munroe-island-_j6vwln.jpg",
      rating: "4.3",
      tours: "2",
      highlights: ["Backwater Canals", "Coir Making Units", "Village Life", "Dutch Church"],
      bestSeason: "October to February",
      packages: ["Backwater Village Experience", "Eco-Tourism Kerala"]
    },
    { 
      id: "poovar",
      name: "POOVAR", 
      desc: "Where River, Lake, and Sea Meet - golden sandy beaches and tranquil backwaters.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Poovar_gvqskq.jpg",
      rating: "4.4",
      tours: "3",
      highlights: ["Poovar Beach", "Backwaters", "Mangrove Forests", "Poovar Island"],
      bestSeason: "August to March",
      packages: ["Beach & Backwater Tour", "Kerala Coastal Retreat"]
    },
    { 
      id: "thiruvananthapuram",
      name: "TRIVANDRUM", 
      desc: "Kerala's Capital of Culture and Nature blending ancient traditions with modern infrastructure.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Thiruvananthapuram_Trivandrum_sgwysg.jpg",
      rating: "4.5",
      tours: "8",
      highlights: ["Padmanabhaswamy Temple", "Napier Museum", "Kovalam Beach", "Neyyar Sanctuary"],
      bestSeason: "October to March",
      packages: ["Capital City Tour", "Cultural Heritage Experience"]
    },
    { 
      id: "kannur",
      name: "KANNUR", 
      desc: "The Land of Beaches, Forts, and Culture with pristine beaches and Theyyam festivals.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/Kannur_jy8wax.jpg",
      rating: "4.4",
      tours: "4",
      highlights: ["St. Angelo Fort", "Muzhappilangad Beach", "Arakkal Museum", "Theyyam Festival"],
      bestSeason: "October to March",
      packages: ["Northern Kerala Tour", "Cultural & Beach Experience"]
    },
    { 
      id: "kollam",
      name: "KOLLAM", 
      desc: "Gateway to Kerala's Backwaters and Heritage with historic sites and Ashtamudi Lake.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/-kollam-_bsqsgx.jpg",
      rating: "4.3",
      tours: "5",
      highlights: ["Ashtamudi Lake", "Jatayu Earth Center", "Thangassery Lighthouse", "Palaruvi Waterfalls"],
      bestSeason: "October to March",
      packages: ["Backwater Gateway Tour", "Eco-Tourism Experience"]
    },
    { 
      id: "idukki",
      name: "IDUKKI", 
      desc: "Kerala's Mountainous Spice Garden and Wildlife Haven with highest peaks and dense forests.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Idukki_qn2nbg.jpg",
      rating: "4.6",
      tours: "7",
      highlights: ["Idukki Arch Dam", "Periyar Sanctuary", "Meesapulimala", "Anamudi Peak"],
      bestSeason: "October to May",
      packages: ["Mountain Adventure Tour", "Wildlife & Spice Experience"]
    },
    { 
      id: "chinnar",
      name: "CHINNAR", 
      desc: "Kerala's Unique Dry Forest Reserve with endangered species and diverse wildlife.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Chinnar_Wildlife_Sanctuary_k2e4bb.jpg",
      rating: "4.2",
      tours: "2",
      highlights: ["Grizzled Giant Squirrel", "Thoovanam Waterfalls", "Wildlife Safaris", "Bird Watching"],
      bestSeason: "October to November",
      packages: ["Wildlife Sanctuary Tour", "Nature & Adventure"]
    },
    { 
      id: "kalamassery",
      name: "KALAMASSERY", 
      desc: "Industrial and Educational Hub of Kochi with urban infrastructure and academic excellence.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kalamassery_ltevtp.jpg",
      rating: "4.0",
      tours: "1",
      highlights: ["CUSAT University", "FACT Industries", "Kochi Metro", "Educational Institutions"],
      bestSeason: "Year Round",
      packages: ["Educational Tour", "Industrial Visit"]
    },
    { 
      id: "kumbalangi",
      name: "KUMBALANGI", 
      desc: "India's First Model Fishing Village and Eco-Tourism Haven with sustainable tourism.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumbalangi-_vgkqik.jpg",
      rating: "4.3",
      tours: "2",
      highlights: ["Chinese Fishing Nets", "Mangrove Forests", "Sea Sparkle", "Crab Catching"],
      bestSeason: "November to February",
      packages: ["Village Tourism", "Eco-Tourism Experience"]
    },
    { 
      id: "silent-valley",
      name: "SILENT VALLEY", 
      desc: "The Last Undisturbed Rainforest of Kerala with pristine tropical evergreen forests.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/silentvalley-_chdrlb.jpg",
      rating: "4.5",
      tours: "2",
      highlights: ["Lion-tailed Macaque", "Watchtower", "Kunthi River", "Evergreen Forests"],
      bestSeason: "December to April",
      packages: ["Rainforest Adventure", "Wildlife Conservation Tour"]
    },
    { 
      id: "edakkal-caves",
      name: "EDAKKAL CAVES", 
      desc: "Ancient Rock Art and Prehistoric Heritage with carvings dating back over 6,000 years.", 
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Edakkal_Caves_scfq2n.jpg",
      rating: "4.4",
      tours: "3",
      highlights: ["Prehistoric Carvings", "Rock Shelters", "Ancient Petroglyphs", "Trekking"],
      bestSeason: "October to May",
      packages: ["Historical Tour", "Archaeological Experience"]
    }
  ];

  // Categorize places
  const hillStations = places.filter(place => 
    ["munnar", "wayanad", "vagamon", "idukki"].includes(place.id)
  );
  
  const backwaters = places.filter(place => 
    ["alleppey", "kumarakom", "kumbalangi", "munroe-island"].includes(place.id)
  );
  
  const beaches = places.filter(place => 
    ["kovalam", "varkala", "kannur", "poovar"].includes(place.id)
  );
  
  const cultural = places.filter(place => 
    ["kochi", "thrissur", "thiruvananthapuram", "palakkad", "bekal"].includes(place.id)
  );

  const wildlife = places.filter(place => 
    ["thekkady", "chinnar", "silent-valley", "edakkal-caves", "kollam"].includes(place.id)
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead 
        title="All Kerala Destinations | Complete Travel Guide - Omkar Tour and Travels"
        description="Explore all 24 amazing destinations in Kerala. Hill stations, backwaters, beaches, wildlife sanctuaries, and cultural sites. Plan your perfect Kerala itinerary."
        keywords="Kerala destinations, Munnar, Alleppey, Kovalam, Thekkady, Kochi, Wayanad, Kumarakom, Varkala, Thrissur, 24 places Kerala"
      />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
            🗺️ {places.length} Amazing Destinations
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-6 tracking-wider uppercase">KERALA'S STUNNING WONDERS</h1>
          <p className="text-md md:text-xl text-gray-500 max-w-3xl mx-auto">
            Kerala's diversity: hill stations, backwaters, beaches & rich culture for every traveler.
          </p>
        </div>


        {/* Quick Stats */}
        <div className="bg-white shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">{places.length}</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">4.9</div>
              <div className="text-gray-600">Highest Rated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">120+</div>
              <div className="text-gray-600">Tour Packages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">14</div>
              <div className="text-gray-600">Districts Covered</div>
            </div>
          </div>
        </div>

        {/* All Places Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">All Destinations</h2>
            <div className="text-gray-600">
              Showing {places.length} places
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <Link 
                key={place.id} 
                to={`/places/${place.id}`}
                className="block transition-transform duration-300 hover:scale-105"
              >
                <PlaceCard place={place} />
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Explore by Category</h2>
          
          {/* Hill Stations */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏔️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Hill Stations</h3>
              <span className="ml-3 bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium">
                {hillStations.length} destinations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hillStations.map((place) => (
                <Link 
                  key={place.id} 
                  to={`/places/${place.id}`}
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <PlaceCard place={place} />
                </Link>
              ))}
            </div>
          </div>

          {/* Backwaters */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm">🚤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Backwaters</h3>
              <span className="ml-3 bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                {backwaters.length} destinations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {backwaters.map((place) => (
                <Link 
                  key={place.id} 
                  to={`/places/${place.id}`}
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <PlaceCard place={place} />
                </Link>
              ))}
            </div>
          </div>

          {/* Beaches */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-amber-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏖️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Beaches</h3>
              <span className="ml-3 bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
                {beaches.length} destinations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beaches.map((place) => (
                <Link 
                  key={place.id} 
                  to={`/places/${place.id}`}
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <PlaceCard place={place} />
                </Link>
              ))}
            </div>
          </div>

          {/* Cultural */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm">🕌</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Cultural & Heritage</h3>
              <span className="ml-3 bg-purple-100 text-purple-700 px-3 py-1 text-sm font-medium">
                {cultural.length} destinations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cultural.map((place) => (
                <Link 
                  key={place.id} 
                  to={`/places/${place.id}`}
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <PlaceCard place={place} />
                </Link>
              ))}
            </div>
          </div>

          {/* Wildlife & Nature */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Wildlife & Nature</h3>
              <span className="ml-3 bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
                {wildlife.length} destinations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wildlife.map((place) => (
                <Link 
                  key={place.id} 
                  to={`/places/${place.id}`}
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <PlaceCard place={place} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Planning Assistance */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Need Help Planning?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto text-lg">
            Our travel experts can help you create the perfect Kerala itinerary based on your preferences, 
            budget, and travel dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919028803309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-50 transition duration-300 shadow-lg"
            >
              💬 Get Free Consultation
            </a>
            <a
              href="tel:+919028803309"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 transition duration-300"
            >
              📞 Call for Itinerary
            </a>
          </div>
        </div>

        {/* Back to Packages */}
        <div className="text-center mt-12">
          <Link 
            to="/packages" 
            className="inline-flex items-center px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Explore Tour Packages
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllPlacesPage;