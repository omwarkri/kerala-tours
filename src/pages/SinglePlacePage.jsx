import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import SEOHead from "../components/common/SEOHead";
import Footer from "../components/common/Footer";
import { X, Phone, MessageCircle } from "lucide-react";

const SinglePlacePage = () => {
  const { placeId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'book', 'customize', 'call'
  
  // Complete places data with all detailed information
  const allPlaces = [

    {
      id: "munnar",
      name: "MUNNAR",
      desc: "Hill Station of Endless Tea Gardens - Arguably the best hill station in South India with tea-clad hill tops and valleys.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_3_shjd5a.jpg"
      ],
      rating: "4.8",
      tours: "12",
      highlights: ["Tea Plantations", "Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Anamudi Peak"],
      bestSeason: "October to March is the most pleasant time to explore Munnar. The weather is cool, the skies are clear, and the flora is vibrant, making it perfect for sightseeing, trekking, and photography.",
      distance: "110 km from Kochi",
      packages: ["Munnar Tea Plantations Tour", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      
      overview: "Munnar is a picturesque hill station in Kerala's Idukki district, celebrated for its sprawling tea plantations, mist-covered mountains, pleasant climate, and colonial heritage. It was once the summer resort of the British government and remains a top escape for nature lovers and adventure seekers.",
      
      keyAttractions: [
        {
          name: "Eravikulam National Park",
          description: "Home to the endangered Nilgiri Tahr and famous for the rare Neelakurinji flower that blooms every 12 years."
        },
        {
          name: "Tea Museums",
          description: "Tata Tea Museum and Kannan Devan Tea Museum showcasing tea cultivation and history."
        },
        {
          name: "Mattupetty Dam",
          description: "Popular for boating and scenic views amidst tea gardens."
        },
        {
          name: "Echo Point",
          description: "Acoustic echo effect amidst lush hills."
        },
        {
          name: "Top Station",
          description: "Offers panoramic views of the Western Ghats and valley of Theni."
        },
        {
          name: "Blossom Park",
          description: "Beautiful landscaped gardens ideal for families and nature walks."
        },
        {
          name: "Chokramudi Peak & Anamudi Peak",
          description: "Trekking destinations including South India's highest peak, Anamudi."
        },
        {
          name: "Devikulam",
          description: "Serene picnic spot with Sita Devi Lake."
        },
        {
          name: "Carmelagiri Elephant Park",
          description: "Elephant rides through tea estates."
        }
      ],
      
      topActivities: [
        "Trekking and nature walks in the hills and national parks",
        "Boating at Mattupetty Dam and Kundala Lake",
        "Explore tea plantations and learn about tea processing",
        "Wildlife spotting in Eravikulam National Park",
        "Visiting waterfalls like Attukal and Lakkom",
        "Visiting spice gardens and enjoying fresh local produce"
      ],
      
      localCuisine: "Don't miss Kerala delicacies including spicy Malabar meals, aromatic cardamom tea, local chocolates, and fresh garden vegetables. Many cafes and restaurants offer fresh homemade chocolates and local snacks.",
      
      festivalsCulture: "Munnar celebrates the blooming of Neelakurinji every 12 years, a spectacular event that paints the hills in blue. The region also hosts local temple festivals and seasonal cultural fairs celebrating local traditions.",
      
      travelTips: [
        "Carry woollens as evenings are cool",
        "Early mornings offer the best views and fewer crowds",
        "Book guided tours for trekking and wildlife safaris",
        "Avoid monsoon season for difficult roads and landslides",
        "Respect local customs and natural habitats"
      ],
      
      nearbyAttractions: [
        "Thekkady wildlife sanctuary",
        "Chinnar wildlife sanctuary",
        "Various spice plantations and waterfalls in the Idukki district"
      ],
      
      howToReach: {
        air: "The nearest airport is Cochin International Airport (about 110 km away)",
        rail: "The closest railway station is Ernakulam Junction",
        road: "From these hubs, taxis and buses provide good connectivity to Munnar"
      },
      
      climate: "Cool and pleasant throughout the year, with temperatures ranging from 5°C to 25°C"
    },
    {
      id: "alleppey",
      name: "ALLEPPEY",
      desc: "Venice of the East and Backwaters Paradise - The rare water world aptly called Venice of the East with beautiful green paddy pastures.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/alleppey_o4rtdm.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/alleppey_o4rtdm.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_4_ruiygh.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330511/Allappy_3_ktn290.jpg"
      ],
      rating: "4.9",
      tours: "8",
      highlights: ["Houseboat Cruise", "Backwaters", "Alleppey Beach", "Vembanad Lake", "Punnamada Lake"],
      bestSeason: "September to March offers pleasant and comfortable weather, avoiding heavy monsoon rains, which makes it ideal for water-based activities and sightseeing.",
      distance: "75 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      
      overview: "Alleppey, also known as Alappuzha, is a charming coastal town in Kerala famous for its serene backwaters, sprawling canals, lagoons, and lush green paddy fields. Known as the 'Venice of the East,' Alleppey offers an unmatched experience through its signature houseboat cruises, historic sites, and captivating natural beauty. The town's rich culture, heritage, and traditional village life attract travelers worldwide.",
      
      keyAttractions: [
        {
          name: "Alleppey Backwaters",
          description: "Network of tranquil lagoons and canals perfect for houseboat cruises and shikara rides that showcase the calm lifestyle along the water."
        },
        {
          name: "Alleppey Beach",
          description: "Scenic beach dotted with palm trees, an ancient lighthouse, and tranquil surroundings for relaxation and seaside activities."
        },
        {
          name: "Punnamada Lake",
          description: "Famous for the Nehru Trophy Snake Boat Race, one of the most exciting boat races in Kerala."
        },
        {
          name: "Kuttanad",
          description: "Known as the 'Rice Bowl of Kerala,' featuring vast paddy fields and unique below-sea-level farming."
        },
        {
          name: "Ambalappuzha Sri Krishna Temple",
          description: "Revered temple famous for its mural paintings and the famous sweet pudding (palpayasam) offered to the deity."
        },
        {
          name: "Karumadi Kuttan",
          description: "Ancient granite idol of Lord Buddha and a prominent Buddhist pilgrim spot."
        },
        {
          name: "Krishnapuram Palace",
          description: "A heritage museum known for its architecture and mural art."
        },
        {
          name: "Pathiramanal Island",
          description: "A small island known for migratory birds and natural beauty."
        },
        {
          name: "St. Mary's Forane Church",
          description: "Historic church with beautiful murals and heritage significance."
        },
        {
          name: "Marari Beach",
          description: "Picturesque and quiet beach resort known for Ayurvedic centers and pristine shoreline."
        }
      ],
      
      topActivities: [
        "Houseboat cruises through the backwaters",
        "Witness the famed Nehru Trophy Boat Race (typically in August-September)",
        "Relax on quiet beaches and engage in water sports",
        "Visit temples and churches showcasing Kerala's cultural fabric",
        "Explore local markets and try fresh seafood and traditional Kerala cuisine",
        "Bird watching at Vembanad Bird Sanctuary",
        "Visit historic palaces and museums"
      ],
      
      localCuisine: "Enjoy Kerala's traditional dishes such as steamed rice and fish curry, tapioca with fish curry, coconut-based vegetarian meals, Karimeen pollichathu (pearl spot fish), and fresh seafood delicacies. Street food near the beach offers snacks like banana chips and fried fish.",
      
      festivalsCulture: [
        "The famous Nehru Trophy Snake Boat Race is a major highlight attracting thousands of visitors",
        "Local temple festivals and Christian church feasts add to the rich cultural atmosphere"
      ],
      
      travelTips: [
        "Book houseboats in advance, especially during peak season",
        "Carry mosquito repellent for backwater cruises",
        "Respect local customs and environment",
        "Morning and evening hours are best for photography and cruising",
        "Explore offbeat islands and fishing villages for authentic experiences"
      ],
      
      nearbyAttractions: [
        "Kumarakom Bird Sanctuary",
        "Vembanad Lake",
        "Mararikulam Beach",
        "Pathiramanal Island for bird watching and nature exploration"
      ],
      
      howToReach: {
        air: "Cochin International Airport (approximately 75 km from Alleppey)",
        rail: "Alappuzha railway station is well-connected to major cities across India",
        road: "Well linked by road with trains and buses regularly available"
      },
      
      climate: "Tropical climate with moderate temperatures ranging from 22°C to 35°C"
    },
    {
      id: "kochi",
      name: "KOCHI",
      desc: "Where Kerala's Past Meets Modern Charm - The commercial capital of Kerala blending Portuguese, Dutch, and British colonial influences.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490476/premium_photo-1697729597066-7b3d09b6dab7_oxwkpb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg"
      ],
      rating: "4.5",
      tours: "7",
      highlights: ["Fort Kochi", "Chinese Fishing Nets", "Jewish Synagogue", "Kathakali Dance", "Marine Drive"],
      bestSeason: "October to March is the best period for pleasant weather, sightseeing, and cultural festivals. The monsoon season (June-September) beautifies the greenery but limits activities.",
      distance: "0 km (Starting Point)",
      packages: ["Kerala Cultural Heritage", "Complete Kerala Experience"],
      
      overview: "Kochi, also known as Cochin, is a vibrant port city on Kerala's southwest coast, renowned for its unique blend of colonial history, diverse cultures, and natural beauty. Nicknamed the 'Queen of the Arabian Sea,' it has been a hub of spice trade and multicultural exchange for centuries. Kochi offers a fascinating mix of historic heritage sites and modern urban attractions, making it a beloved destination for both cultural enthusiasts and casual travelers.",
      
      keyAttractions: [
        {
          name: "Fort Kochi",
          description: "Historic precinct famous for Chinese fishing nets, colonial buildings, art galleries, and cobblestone streets."
        },
        {
          name: "Jew Town & Paradesi Synagogue",
          description: "UNESCO heritage area with antique shops and one of India's oldest active synagogues."
        },
        {
          name: "Mattancherry Palace (Dutch Palace)",
          description: "A royal structure adorned with Kerala-style murals and ancient artifacts."
        },
        {
          name: "Santa Cruz Basilica",
          description: "A grand church known for its colonial Gothic architecture and stunning interiors."
        },
        {
          name: "St. Francis Church",
          description: "India's oldest European church, reputedly the original burial site of Vasco da Gama."
        },
        {
          name: "Marine Drive",
          description: "A bustling seafront promenade perfect for evening strolls with city skyline views."
        },
        {
          name: "Lulu Mall",
          description: "One of India's largest shopping malls with entertainment, dining, and retail options."
        },
        {
          name: "Kerala Folklore Museum",
          description: "Showcasing traditional arts, crafts, and cultural relics of Kerala."
        },
        {
          name: "Bolgatty Palace & Willingdon Island",
          description: "Colonial landmarks and commercial heart of Kochi's harbor."
        },
        {
          name: "Kochi-Muziris Biennale",
          description: "International contemporary art festival held across Fort Kochi and nearby areas."
        }
      ],
      
      topActivities: [
        "Heritage walks through Fort Kochi and Mattancherry",
        "Witness traditional Kathakali dance performances and Kalaripayattu martial arts",
        "Explore vibrant spice markets and sample local cuisine",
        "Enjoy boat rides on the Kochi backwaters and harbor cruises",
        "Shop for antiques, handicrafts, and spices in Jew Town",
        "Attend cultural events and festivals, including the Kochi-Muziris Biennale"
      ],
      
      localCuisine: "Kochi is a gastronomic delight with seafood, Malabar biryani, Keralite vegetarian meals, and fusion cuisine reflecting its multicultural history. Street food like pazhampori (banana fritters) and Kerala parotta with beef fry are crowd favorites.",
      
      festivalsCulture: [
        "Onam: The harvest festival with elaborate feasts and boat races",
        "Cochin Carnival: Annual December festival celebrating the city's maritime heritage",
        "Religious festivals across Hindu temples, churches, and mosques depicting Kochi's diverse faiths"
      ],
      
      travelTips: [
        "Wear comfortable shoes for walking tours on uneven cobblestones",
        "Morning and evening periods have the best lighting and ambiance for photography",
        "Respect heritage sites and local customs when visiting places of worship",
        "Use local water taxis and ferries for unique perspectives of the city"
      ],
      
      nearbyAttractions: [
        "Cherai Beach: A beautiful beach resort close to Kochi city",
        "Hill Palace Museum: A large archaeological museum near Thrippunithura",
        "Fort Kochi's nearby islands including Vypin and Bolgatty"
      ],
      
      howToReach: {
        air: "Cochin International Airport, well connected globally",
        rail: "Ernakulam Junction and Ernakulam Town railway stations serve Kochi",
        road: "National Highways and regular bus connectivity from all nearby cities"
      },
      
      climate: "Tropical climate with moderate temperatures year-round"
    },
    {
      id: "wayanad",
      name: "WAYANAD",
      desc: "Mystical Wilderness and Tribal Heritage - A beautiful hill district in northern Kerala renowned for its lush green forests, misty mountains, spice plantations, waterfalls, and rich tribal culture.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/wayanad_wj1ce1.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/wayanad_wj1ce1.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.7",
      tours: "9",
      highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak", "Wayanad Wildlife Sanctuary", "Pookode Lake"],
      bestSeason: "October to May is ideal to visit Wayanad, offering pleasant weather for trekking and sightseeing. The monsoon season (June to September) rejuvenates the landscape but can make some trails slippery.",
      distance: "250 km from Kochi",
      packages: ["Wayanad Adventure Tour", "Complete Kerala Experience"],
      
      overview: "Wayanad, a beautiful hill district in northern Kerala, is renowned for its lush green forests, misty mountains, spice plantations, waterfalls, and rich tribal culture. Nestled within the Western Ghats, Wayanad is a biodiversity hotspot and a perfect destination for nature lovers, adventure enthusiasts, and cultural explorers.",
      
      keyAttractions: [
        {
          name: "Edakkal Caves",
          description: "Prehistoric caves famous for ancient petroglyphs dating back over 6,000 years."
        },
        {
          name: "Pookode Lake",
          description: "A scenic freshwater lake surrounded by forests and hills, ideal for boating and picnics."
        },
        {
          name: "Banasura Sagar Dam",
          description: "Largest earth dam in India, offering boating and spectacular views of the reservoir and hills."
        },
        {
          name: "Chembra Peak",
          description: "The highest peak in Wayanad and a popular trekking destination with a heart-shaped lake en route."
        },
        {
          name: "Meenmutty Waterfalls",
          description: "One of the largest waterfalls in Wayanad, set amidst dense forest."
        },
        {
          name: "Wayanad Wildlife Sanctuary",
          description: "Habitat to elephants, tigers, deer, and other wildlife species."
        },
        {
          name: "Tholpetty Wildlife Sanctuary",
          description: "Another rich forest reserve with jeep safaris."
        },
        {
          name: "Soochipara Falls",
          description: "Three-tiered waterfall with natural pools suitable for swimming."
        },
        {
          name: "Chain Tree",
          description: "A unique historical tree with a legend, popular among tourists."
        },
        {
          name: "Kuruva Island",
          description: "A protected river delta with diverse flora and fauna and wooden bridges."
        }
      ],
      
      topActivities: [
        "Trekking to Chembra Peak and other hills",
        "Wildlife safaris in Wayanad and Tholpetty sanctuaries",
        "Boating and cycling around Pookode Lake and Banasura Sagar Dam",
        "Exploring tribal heritage and visiting local villages",
        "Nature walks in dense forests and coffee plantations"
      ],
      
      localCuisine: "Experience traditional Malabar meals, bamboo rice dishes, spicy curries made with local herbs, and fresh vegetables from the hills. Enjoy tribal food specialties available at local eateries.",
      
      festivalsCulture: [
        "Tribal festivals and dances showcasing local traditions",
        "Local temple festivals and Onam celebrations"
      ],
      
      travelTips: [
        "Carry good trekking shoes and mosquito repellent",
        "Book guides for wildlife safaris and trekking",
        "Respect tribal customs when visiting indigenous villages",
        "Avoid isolated forest areas without proper guidance"
      ],
      
      nearbyAttractions: [
        "Sulthan Bathery town for cultural explorations and shopping",
        "Wayanad Heritage Museum",
        "Nearby caves and waterfalls for day excursions"
      ],
      
      howToReach: {
        air: "Kozhikode International Airport (approximately 100 km) and Kannur International Airport (around 110 km)",
        rail: "Kozhikode and Mysore railway stations",
        road: "Well connected by buses and taxis from nearby cities and towns"
      },
      
      climate: "Pleasant climate with temperatures ranging from 17°C to 30°C"
    },
    {
      id: "thekkady",
      name: "THEKKADY",
      desc: "Wildlife Sanctuary and Spice Gardens - Renowned for its Periyar Wildlife Sanctuary, lush spice plantations, and scenic lakes. Known as a nature lover's paradise.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
      ],
      rating: "4.6",
      tours: "9",
      highlights: ["Periyar Wildlife Sanctuary", "Spice Plantations", "Bamboo Rafting", "Elephant Ride", "Boat Cruise"],
      bestSeason: "From September to May, the climate is pleasant and favorable for wildlife safaris, spice tours, and trekking. Avoid heavy monsoon months (June–August) due to rains and access difficulties.",
      distance: "110 km from Kochi",
      packages: ["Kerala Wildlife Adventure", "Complete Kerala Experience", "Munnar Tea Plantations Tour"],
      
      overview: "Thekkady, located in Kerala's Idukki district, is renowned for its Periyar Wildlife Sanctuary, lush spice plantations, and scenic lakes. Known as a nature lover's paradise, Thekkady offers a blend of wildlife encounters, cultural experiences, and serene landscapes, making it a perfect destination for ecotourism and adventure enthusiasts.",
      
      keyAttractions: [
        {
          name: "Periyar National Park and Tiger Reserve",
          description: "A densely forested sanctuary home to elephants, sambar deer, wild boars, tigers, and exotic birds."
        },
        {
          name: "Periyar Lake",
          description: "Artificial lake ideal for boat cruises that offer wildlife viewing opportunities along the shore."
        },
        {
          name: "Spice Plantations",
          description: "Extensive plantations of cardamom, pepper, cinnamon, nutmeg, and cloves with guided tours."
        },
        {
          name: "Kadathanadan Kalari & Navarasa Kathakali Center",
          description: "Live martial arts (Kalaripayattu) and classical dance (Kathakali) performances reflecting Kerala's cultural heritage."
        },
        {
          name: "Mangala Devi Temple",
          description: "Ancient temple set amidst dense forest on a hilltop, offering panoramic views."
        },
        {
          name: "Elephant Junction",
          description: "Popular spot for elephant spotting and feedings."
        },
        {
          name: "Chellarkovil",
          description: "Scenic viewpoint with waterfall and panoramic vistas."
        },
        {
          name: "Tribal Museum, Kumily",
          description: "Exhibits tribal culture and lifestyle of the region."
        }
      ],
      
      topActivities: [
        "Boat cruises in Periyar Lake with wildlife sightings",
        "Guided jungle treks for spotting tiger and elephants",
        "Exploring spice gardens with sensory tours and spice shopping",
        "Attend classical Kalaripayattu and Kathakali performances",
        "Visiting tribal villages and local markets for crafts",
        "Elephant safaris and nature walks"
      ],
      
      localCuisine: "Taste Kerala specialties infused with local spices such as pepper and cardamom, including fresh fish curries, tapioca, Kerala parotta, and traditional vegetarian meals.",
      
      festivalsCulture: [
        "Cultural programs and exhibitions showcasing Kalaripayattu and Kathakali",
        "Local temple festivals and harvest celebrations"
      ],
      
      travelTips: [
        "Book wildlife tours and spice plantation visits in advance",
        "Carry insect repellent and light rain gear during monsoons",
        "Respect wildlife and follow park regulations strictly",
        "Wear comfortable shoes for trekking and walking"
      ],
      
      nearbyAttractions: [
        "Kumily town for shopping and local eateries",
        "Munnar for tea estates and hill station experiences",
        "Anakkara and Chinnar Wildlife Sanctuaries for extended nature explorations"
      ],
      
      howToReach: {
        air: "Cochin International Airport, about 110 km away",
        rail: "Kottayam is the nearest major railway station (114 km)",
        road: "Well connected by bus and taxi from major cities and airports"
      },
      
      climate: "Pleasant climate with temperatures ranging from 15°C to 30°C"
    },
    {
      id: "kumarakom",
      name: "KUMARAKOM",
      desc: "Serenity Amidst Kerala Backwaters - A peaceful village situated on the banks of Vembanad Lake, Kerala's largest freshwater lake. Known for its tranquil backwaters, lush greenery, and bird sanctuary.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumarakom-Kumarakom-Bird-Sanctuary-2_tksq4a.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumarakom-Kumarakom-Bird-Sanctuary-2_tksq4a.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490668/Kumarkom_f7plnd.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg"
      ],
      rating: "4.8",
      tours: "4",
      highlights: ["Vembanad Lake", "Bird Sanctuary", "Luxury Resorts", "Houseboat Stays", "Backwaters"],
      bestSeason: "November to February for pleasant weather and clear skies ideal for backwater cruises and outdoor activities. Monsoon months (June to September) bring lush greenery but may limit some activities.",
      distance: "65 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Luxury Kerala Experience"],
      
      overview: "Kumarakom is a peaceful village situated on the banks of Vembanad Lake, Kerala's largest freshwater lake. Known for its tranquil backwaters, lush greenery, and bird sanctuary, it is an ideal destination for nature lovers seeking relaxation amidst rural landscapes.",
      
      keyAttractions: [
        {
          name: "Kumarakom Bird Sanctuary",
          description: "A 14-acre sanctuary that hosts migratory birds like Siberian cranes, herons, kingfishers, and egrets, perfect for birdwatching."
        },
        {
          name: "Backwaters and Houseboat Cruises",
          description: "Experience traditional kettuvallam (houseboat) cruises through serene canals, passing along paddy fields and coconut groves."
        },
        {
          name: "Vembanad Lake",
          description: "Largest lake in Kerala, offering stunning sunset views and boating opportunities."
        },
        {
          name: "Aruvikkuzhi Waterfalls",
          description: "A nearby beautiful waterfall surrounded by lush greenery, ideal for picnics and nature walks."
        },
        {
          name: "Pathiramanal Island",
          description: "A small secluded island and haven for bird watchers."
        },
        {
          name: "Ettumanoor Mahadeva Temple",
          description: "A historic temple near Kumarakom known for intricate Kerala-style murals."
        },
        {
          name: "Bay Island Driftwood Museum",
          description: "Showcases exquisite driftwood art and sculptures."
        }
      ],
      
      topActivities: [
        "Relaxing houseboat cruises on serene backwaters",
        "Bird watching in the sanctuary",
        "Ayurvedic spa treatments and wellness therapies",
        "Cycling and village tours around lush paddy fields and coconut groves",
        "Sampling local Keralite culinary delights in resorts and homestays"
      ],
      
      localCuisine: "Freshwater fish delicacies, traditional Kerala vegetarian meals flavored with coconut, and seasonal specialties. Experience authentic Onam Sadya during festival times.",
      
      festivalsCulture: [
        "Annual Nehru Trophy Boat Race held in August on Vembanad Lake, a major cultural event",
        "Local temple fairs and church festivals reflecting religious harmony"
      ],
      
      travelTips: [
        "Book houseboats in advance, especially during peak season",
        "Early mornings are the best time for birdwatching and enjoying calm backwaters",
        "Carry insect repellent and sunscreen for outdoor activities"
      ],
      
      nearbyAttractions: [
        "Alleppey backwaters and beaches",
        "Marari Beach for serene coastal escapes",
        "Ecotourism spots like spice plantations and waterfalls nearby"
      ],
      
      howToReach: {
        air: "Cochin International Airport (approximately 65 km)",
        rail: "Kottayam railway station (around 15 km)",
        road: "Good road connections with buses and taxis available from nearby towns"
      },
      
      climate: "Tropical climate with moderate temperatures"
    },
    // Continue with the remaining 18 destinations following the exact same structure...
    // Due to character limits, I'll show the pattern for the next few:
    {
      id: "kovalam",
      name: "KOVALAM",
      desc: "Kerala's Premier Beach Destination - A picturesque coastal town near Thiruvananthapuram, famous for its crescent-shaped beaches lined with palm trees and vibrant cultural life.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kovalam_tkrqfh.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kovalam_tkrqfh.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-2_vutkfm.jpg"
      ],
      rating: "4.7",
      tours: "6",
      highlights: ["Lighthouse Beach", "Hawa Beach", "Water Sports", "Ayurvedic Massage", "Sunset Views"],
      bestSeason: "October to March is the ideal season, offering pleasant weather for beach activities and water sports. The monsoon months (June to September) bring heavy rains but enrich the landscape.",
      distance: "200 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      
      overview: "Kovalam is a picturesque coastal town near Thiruvananthapuram, famous for its crescent-shaped beaches lined with palm trees and vibrant cultural life. Known as the 'Grove of Coconut Trees,' Kovalam is Kerala's most popular beach destination, attracting tourists seeking sunbathing, water sports, Ayurvedic treatments, and a relaxing seaside atmosphere.",
      
      keyAttractions: [
        {
          name: "Lighthouse Beach",
          description: "The southernmost beach with a historic 35-meter-high lighthouse offering panoramic views of the Arabian Sea. Ideal for swimming, sunbathing, and photography."
        },
        {
          name: "Hawrah Beach",
          description: "Known for shallow waters and gentle waves, popular for swimming and local seafood shacks."
        },
        {
          name: "Samudra Beach",
          description: "Less crowded, peaceful beach with soft sands, situated near the KTDC Samudra hotel."
        },
        {
          name: "Vizhinjam Marine Aquarium",
          description: "Showcases a wide array of marine life, including rare fish species and coral reefs."
        },
        {
          name: "Vellayani Lake",
          description: "Serene freshwater lake near Kovalam perfect for boating and picnics."
        },
        {
          name: "Kerala Arts and Crafts Village",
          description: "Cultural center with exhibitions related to local craftsmanship and traditional performances."
        },
        {
          name: "Neyyar Dam and Wildlife Sanctuary",
          description: "About 15 km from Kovalam, offering boating and wildlife experiences."
        },
        {
          name: "Kovalam Fish Market",
          description: "A bustling spot to witness local fishermen's catch and traditional market scenes."
        }
      ],
      
      topActivities: [
        "Swimming, sunbathing, surfing, parasailing, and jet skiing",
        "Ayurvedic spa treatments and yoga sessions",
        "Exploring local markets and seafood eateries",
        "Visiting cultural programs and festivals",
        "Catamaran cruises along the coastline"
      ],
      
      localCuisine: "Enjoy coastal Kerala cuisine: fresh seafood like Karimeen Pollichathu (grilled pearl spot fish), spicy fish curry, traditional meals rich in coconut, and tasty street snacks such as banana chips.",
      
      festivalsCulture: [
        "Cultural programs including traditional dance, music, and handicraft exhibitions",
        "Local temple and community festivals"
      ],
      
      travelTips: [
        "Carry sunscreen and light clothing",
        "Avoid swimming during rough sea conditions, especially during monsoons",
        "Respect local customs, particularly in religious places",
        "Evening beach markets are great for shopping souvenirs and handicrafts"
      ],
      
      nearbyAttractions: [
        "Neyyar Dam Wildlife Sanctuary for eco-adventure",
        "Vizhinjam Port and harbor area",
        "Ponmudi hill station for a day trip to the cooler hill climate"
      ],
      
      howToReach: {
        air: "Thiruvananthapuram International Airport is about 10 km away",
        rail: "Thiruvananthapuram Central Railway Station is approximately 16 km from Kovalam",
        road: "Regular bus and taxi services from the city and nearby towns"
      },
      
      climate: "Tropical coastal climate with temperatures between 24°C to 32°C"
    },
    // Complete places data with all detailed information


  {
    id: "vagamon",
    name: "VAGAMON",
    desc: "The Queen of Mist and Tranquility - A tranquil hill station in the Idukki district renowned for its rolling green meadows, dense pine forests, tea gardens, and cool climate.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193267/Vagamon_xgcm4m.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193267/Vagamon_xgcm4m.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
    ],
    rating: "4.4",
    tours: "3",
    highlights: ["Pine Forest", "Vagamon Meadows", "Kurisumala Church", "Paragliding", "Thangal Para"],
    bestSeason: "The best months to visit Vagamon are from September to March when the weather is pleasant, cool, and ideal for outdoor activities.",
    distance: "100 km from Kochi",
    packages: ["Vagamon Hill Retreat", "Adventure Kerala Tour"],
    
    overview: "Vagamon is a tranquil hill station located in the Idukki district of Kerala, renowned for its rolling green meadows, dense pine forests, tea gardens, and cool climate. It is often called the 'Queen of the Mist' because of its mist-covered hills and serene landscapes. Vagamon offers a peaceful retreat away from crowded tourist spots, making it ideal for nature lovers and adventure seekers.",
    
    keyAttractions: [
      {
        name: "Pine Forest Vagamon",
        description: "An enchanting forest of symmetrical pine trees, frequently used for film shootings and nature walks."
      },
      {
        name: "Vagamon Meadows",
        description: "Expansive grassy slopes perfect for picnics, photography, and sunset views."
      },
      {
        name: "Kurisumala Church",
        description: "A Christian pilgrimage site situated atop a hill, surrounded by lush greenery."
      },
      {
        name: "Thangal Para",
        description: "A large rock cliff known for panoramic views and religious significance linked to Sufi saint Sheikh Fariduddin."
      },
      {
        name: "Vagamon Lake",
        description: "Calm lake ideal for boating and quiet relaxation."
      },
      {
        name: "Maramala Waterfalls",
        description: "A scenic waterfall accessible via a forest trek."
      },
      {
        name: "Orchidarium and Floriculture Projects",
        description: "Botanical garden showcasing diverse orchids and floriculture innovations."
      },
      {
        name: "Karikadu Viewpoint (Echo Point)",
        description: "Known for the echo phenomenon and captivating scenic views."
      },
      {
        name: "Vagamon Adventure Park",
        description: "Offers activities like zip-lining, paragliding, rope activities, and giant swings."
      },
      {
        name: "Tea Garden Hills at Ulippuni",
        description: "Vast tea estates surrounded by rolling hills."
      }
    ],
    
    topActivities: [
      "Enjoy trekking, hiking, and nature walks in the meadows and forests",
      "Boating and fishing at Vagamon Lake",
      "Adventure sports including paragliding and rock climbing",
      "Visiting temples and pilgrimage sites",
      "Photography of scenic hill views and waterfalls"
    ],
    
    localCuisine: "Experience simple and fresh Kerala cuisine featuring local vegetables, spices, and traditional preparations suited to the hill station climate.",
    
    festivalsCulture: [
      "Local pilgrimage and religious festivals at Kurisumala Church and Thangal Para",
      "Community events showcasing local traditions and music"
    ],
    
    travelTips: [
      "Carry warm clothing, especially for early mornings and evenings",
      "Use sturdy footwear for trekking and walking on uneven terrain",
      "Book adventure activities and local guides in advance for best experience",
      "Respect wildlife and local customs during visits"
    ],
    
    nearbyAttractions: [
      "Idukki Arch Dam",
      "Munnar tea gardens",
      "Other hill stations in the Western Ghats"
    ],
    
    howToReach: {
      air: "Nearest airports: Cochin International Airport (about 110 km) and Kannur International Airport (about 110 km)",
      rail: "Nearby railway stations: Ernakulam and Mysore railway stations",
      road: "Well connected by road with taxis and buses from major cities"
    },
    
    climate: "Cool climate with temperatures ranging from 10°C to 25°C"
  },
  {
    id: "athirappilly",
    name: "ATHIRAPPILLY WATERFALLS",
    desc: "The Niagara of South India - Kerala's largest waterfall standing at about 80 feet high, located in the Thrissur district on the Chalakudy River.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Athirappilly_Waterfalls__pnmbmo.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Athirappilly_Waterfalls__pnmbmo.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
    ],
    rating: "4.6",
    tours: "5",
    highlights: ["Athirappilly Waterfalls", "Vazhachal Waterfalls", "Butterfly Garden", "Sholayar Dam", "Wildlife Spotting"],
    bestSeason: "The best time to visit is from October to May for pleasant weather and good water flow. Monsoon months (June to September) bring high water volume making the falls more spectacular but also slippery and less accessible.",
    distance: "78 km from Kochi",
    packages: ["Waterfall Adventure Tour", "Nature & Wildlife Kerala"],
    
    overview: "Athirappilly Waterfalls is the largest waterfall in Kerala, standing at about 80 feet high, located in the Thrissur district on the Chalakudy River. Nestled amid lush tropical forests at the entry of the Sholayar ranges, it is a breathtaking natural spectacle often called the 'Niagara of South India.' The area around the falls is rich in biodiversity, offering a peaceful and rejuvenating experience for nature lovers and adventure enthusiasts alike.",
    
    keyAttractions: [
      {
        name: "Athirappilly Waterfalls",
        description: "Majestic three-tiered cascades surrounded by evergreen forests and wildlife. The falls create a misty, mesmerizing atmosphere ideal for photography and relaxation."
      },
      {
        name: "Vazhachal Waterfalls",
        description: "Located just 7 km from Athirappilly, this waterfall is equally stunning with a steep drop of over 300 feet and is part of the Chalakudy River."
      },
      {
        name: "Thumboormuzhy Butterfly Garden",
        description: "A landscaped garden near Chalakudy River, home to more than 140 species of butterflies, providing a colorful and peaceful retreat."
      },
      {
        name: "Charpa Waterfall",
        description: "A seven-step waterfall located between Athirappilly and Vazhachal, accessible from the roadside."
      },
      {
        name: "Sholayar Dam",
        description: "Asia's second-largest rock-filled dam, surrounded by green hills, about 53 km from Athirappilly."
      },
      {
        name: "Peechi Dam and Wildlife Sanctuary",
        description: "Located 22 km away, known for boating and rich flora and fauna."
      },
      {
        name: "Medicinal Herb Garden",
        description: "Close to Vazhachal Waterfalls featuring many plants with therapeutic properties."
      }
    ],
    
    topActivities: [
      "Enjoying the panoramic views and photography at various viewpoints",
      "Trekking and nature walks in the surrounding forests",
      "Visiting nearby waterfalls and butterfly gardens",
      "Bird watching and wildlife spotting in the Sholayar forest range",
      "Boating and sightseeing at distant dams and reservoirs nearby"
    ],
    
    localCuisine: "Enjoy traditional Kerala hill cuisine featuring locally sourced vegetables, freshwater fish curry, and coconut-based delicacies. Refresh yourself with fresh fruit juices and homemade snacks available at local eateries near the waterfall.",
    
    festivalsCulture: [
      "Local tribal festivals and seasonal fairs celebrate the region's natural heritage and culture",
      "Many temples in the region are associated with annual festivals attended by local communities"
    ],
    
    
    travelTips: [
      "Wear sturdy footwear suitable for slippery pathways and trekking",
      "Carry rain gear and be cautious during the monsoon season",
      "Maintain a safe distance from the water edges and follow park guidelines",
      "Visit early morning or late afternoon for best light and solitude",
      "Respect the environment and avoid littering"
    ],
    
    nearbyAttractions: [
      "Vazhachal Waterfalls, Thumboormuzhy Butterfly Garden, Charpa Waterfall",
      "Sholayar and Peechi Dams for scenic nature trips",
      "Chalakudy town for cultural experiences and local shopping"
    ],
    
    howToReach: {
      air: "Cochin International Airport (about 78 km)",
      rail: "Chalakudy railway station is the closest railhead (22 km)",
      road: "Well connected by roads and regular transport from major cities like Kochi and Thrissur"
    },
    
    climate: "Tropical climate with moderate temperatures"
  },
  {
    id: "varkala",
    name: "VARKALA",
    desc: "Coastal Cliffs and Spiritual Serenity - A charming coastal town in Kerala known for its dramatic red sandstone cliffs overlooking the Arabian Sea.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/varkala_1_zcdenb.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/varkala_1_zcdenb.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490719/Varkala_Beach__Varkala__Kerala_vuiq2z.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg"
    ],
    rating: "4.5",
    tours: "4",
    highlights: ["Varkala Beach", "Janardhana Swamy Temple", "Varkala Cliff", "Kappil Lake", "Ayurvedic Treatments"],
    bestSeason: "October to March provides the best weather for beach activities, sightseeing, and outdoor adventures with pleasant temperatures and low rainfall.",
    distance: "180 km from Kochi",
    packages: ["Beach & Culture Tour", "Kerala Coastal Experience"],
    
    overview: "Varkala is a charming coastal town in Kerala known for its dramatic red sandstone cliffs overlooking the Arabian Sea. The town's unique geography combines beautiful beaches with spiritual sites, making it a popular destination for relaxation, pilgrimage, and adventure. Varkala is appreciated for its laid-back vibe, yoga centers, Ayurvedic spas, and vibrant beachside cafes.",
    
    keyAttractions: [
      {
        name: "Varkala Beach (Papanasam Beach)",
        description: "A long sandy beach famous for its red cliffs, natural springs believed to have healing properties, and picturesque sunsets. It is popular for both pilgrims and tourists seeking calm and rejuvenation."
      },
      {
        name: "Janardhana Swamy Temple",
        description: "An ancient temple dedicated to Lord Vishnu, revered by devotees and visited by thousands during festivals."
      },
      {
        name: "Varkala Cliff",
        description: "A scenic stretch lined with cafes, shops, and restaurants offering spectacular views of the sea."
      },
      {
        name: "Kappil Lake",
        description: "A serene freshwater lake near Varkala ideal for boating and bird watching."
      },
      {
        name: "Anjengo Fort",
        description: "Historical fort ruins located nearby, reflecting colonial history."
      },
      {
        name: "Varkala Lighthouse",
        description: "Offers panoramic views of the coastline and town."
      },
      {
        name: "Varkala Aquarium",
        description: "Showcases marine life native to Kerala's coasts."
      },
      {
        name: "Black Sand Beach",
        description: "A quieter alternative beach known for its unique black sand and surfing opportunities."
      },
      {
        name: "Sree Janardhana Swamy Temple",
        description: "Important Hindu pilgrimage spot."
      },
      {
        name: "Jatayu Earth Center",
        description: "Though a bit farther (35 km), a giant bird sculpture and adventure park popular with visitors."
      }
    ],
    
    topActivities: [
      "Walking along the cliffs and beaches, soaking in the scenic views",
      "Participating in or observing Hindu pilgrimage rituals and ceremonies",
      "Yoga and wellness retreats offered by numerous centers on the cliffs",
      "Water sports including surfing, parasailing, jet skiing, and stand-up paddleboarding",
      "Exploring local markets, cafes, and fresh seafood restaurants",
      "Boat rides on Kappil Lake and nearby backwaters"
    ],
    
    localCuisine: "Enjoy fresh seafood, spicy Kerala curries, coconut-based dishes, and healthy vegetarian options at beachside shacks and restaurants. Sampling local sweets and tropical fruits is a must.",
    
    festivalsCulture: [
      "Hindu temple festivals, especially in Janardhana Swamy Temple",
      "Seasonal cultural events and yoga retreats attracting international visitors"
    ],
    
    travelTips: [
      "Dress modestly near temples and during religious ceremonies",
      "Morning and late afternoon offer the best light for photography and comfortable beach visits",
      "Respect local rituals and privacy during ceremonies on the beach",
      "Book wellness and yoga sessions in advance during high season"
    ],
    
    nearbyAttractions: [
      "Munroe Island for tranquil backwater experiences",
      "Trivandrum city with Sree Padmanabhaswamy Temple and museums",
      "Anjengo Fort and Varkala Lighthouse for history buffs"
    ],
    
    howToReach: {
      air: "Trivandrum International Airport, about 50 km away",
      rail: "Varkala Railway Station connects to major cities and towns",
      road: "Regular bus and taxi services connect Varkala with nearby cities and towns"
    },
    
    climate: "Tropical coastal climate"
  },
  {
    id: "palakkad",
    name: "PALAKKAD",
    desc: "The Gateway of Kerala's Natural and Cultural Heritage - A vibrant district located at the foothills of the Western Ghats known as the 'Granary of Kerala' due to its vast paddy fields.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Palakkad_kava54.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Palakkad_kava54.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
    ],
    rating: "4.3",
    tours: "5",
    highlights: ["Malampuzha Dam", "Palakkad Fort", "Parambikulam Sanctuary", "Silent Valley", "Nelliyampathy Hills"],
    bestSeason: "The best time to visit Palakkad is from November to February when the weather is cool and dry, ideal for sightseeing and outdoor activities. The monsoon season (June-September) brings heavy rains that enhance the greenery but can disrupt travel plans.",
    distance: "100 km from Kochi",
    packages: ["Nature & Heritage Tour", "Complete Kerala Experience"],
    
    overview: "Palakkad, also known as Palghat, is a vibrant district located at the foothills of the Western Ghats. Known as the 'Granary of Kerala' due to its vast paddy fields, Palakkad combines lush green landscapes, ancient forts, hill stations, and rich biodiversity. It is a peaceful destination offering nature, history, and cultural experiences.",
    
    keyAttractions: [
      {
        name: "Malampuzha Dam and Gardens",
        description: "A scenic reservoir surrounded by beautifully landscaped gardens, a snake park, freshwater aquarium, Japanese garden, hanging bridge, ropeway, and children's park. The ropeway is a unique attraction offering panoramic views."
      },
      {
        name: "Palakkad Fort",
        description: "A historic fortress in the heart of Palakkad town built in 1766 by Hyder Ali with massive stone walls. The fort houses the Jainimedu Jain Temple nearby and children's park outside."
      },
      {
        name: "Parambikulam Wildlife Sanctuary",
        description: "Sprawling sanctuary known for rich flora and fauna, including tigers, elephants, and many bird species. It offers wildlife safaris, boating, and trekking."
      },
      {
        name: "Silent Valley National Park",
        description: "A pristine and biodiverse evergreen forest sanctuary home to endangered species, laid out with trekking trails and nature exploration facilities."
      },
      {
        name: "Chulannur Peacock Sanctuary",
        description: "A protected area dedicated to preserving peacocks and natural forests."
      },
      {
        name: "Seetharkundu Viewpoint (Nelliampathy Hills)",
        description: "Offers breathtaking scenic views, tea estates, and waterfalls like Meenkara falls believed to be where Sita bathed during exile."
      },
      {
        name: "Meenkara Dam",
        description: "Known for its natural beauty, fish ponds, and quiet surroundings."
      },
      {
        name: "Siruvani Dam",
        description: "Positioned on the border of Kerala and Tamil Nadu, famous for crystal-clear water and scenic views."
      },
      {
        name: "Kollengode Palace",
        description: "An architectural marvel showcasing traditional Kerala style and heritage."
      }
    ],
    
    topActivities: [
      "Boating and ropeway rides at Malampuzha Dam",
      "Wildlife safaris and trekking in Parambikulam and Silent Valley",
      "Exploring historic forts and temples",
      "Nature photography and bird watching",
      "Visiting tea plantations and scenic hills"
    ],
    
    localCuisine: "Experience Kerala's traditional food with a focus on rice-based dishes, spicy curries, and fresh vegetables. Palakkad is also known for unique snacks and sweets influenced by Tamil and Kerala culinary traditions.",
    
    festivalsCulture: [
      "Local temple festivals with rituals and cultural performances",
      "Wildlife and nature festivals promoting conservation awareness",
      "Traditional dance and music events in town"
    ],
    
    travelTips: [
      "Wear comfortable shoes for exploring forts, hills, and wildlife sanctuaries",
      "Carry rain gear if visiting during monsoon",
      "Book wildlife safaris and permits in advance",
      "Respect local customs and protected natural areas"
    ],
    
    nearbyAttractions: [
      "Nelliyampathy Hills for trekking and scenic beauty",
      "Dhoni Waterfalls near Palakkad town",
      "Jainimedu Jain Temple in Palakkad",
      "Malampuzha Fantasy Park for family entertainment"
    ],
    
    howToReach: {
      air: "Coimbatore Airport (nearby Tamil Nadu) about 56 km away or Cochin International Airport about 100 km away",
      rail: "Palakkad Junction railway station is well connected to major Indian cities",
      road: "Good connectivity via buses and taxis from neighboring towns and cities"
    },
    
    climate: "Pleasant climate with moderate temperatures"
  },
  {
    id: "bekal",
    name: "BEKAL",
    desc: "Historic Fort and Seaside Serenity - A charming town in the Kasaragod district best known for its majestic Bekal Fort—the largest and best-preserved fort in Kerala.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/bekal3_nq1ce8.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/bekal3_nq1ce8.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
    ],
    rating: "4.4",
    tours: "3",
    highlights: ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Kodi Cliff", "Theyyam Performances"],
    bestSeason: "October to March is the best period to visit Bekal, with cool weather and minimal rainfall, perfect for exploring the fort, beaches, and nearby attractions.",
    distance: "350 km from Kochi",
    packages: ["Historic Kerala Tour", "Coastal Heritage Experience"],
    
    overview: "Bekal is a charming town in the Kasaragod district of Kerala, best known for its majestic Bekal Fort—the largest and best-preserved fort in Kerala. The fort rises dramatically by the Arabian Sea, showcasing a blend of military architecture and scenic beauty. Bekal combines historical significance, coastal tranquillity, and cultural richness, making it a unique tourist destination.",
    
    keyAttractions: [
      {
        name: "Bekal Fort",
        description: "Constructed in 1650 AD by Shivappa Nayaka of Keladi, this grand laterite fort is shaped uniquely like a keyhole and spans over 40 acres. It features massive walls, bastions, secret tunnels, a water tank, an observation tower built by Tipu Sultan, and panoramic views of the Arabian Sea."
      },
      {
        name: "Bekal Beach",
        description: "A serene beach adjacent to the fort, lined with palm trees, ideal for long walks and relaxation."
      },
      {
        name: "Mukhyaprana Temple",
        description: "Dedicated to Hanuman, located near the fort entrance."
      },
      {
        name: "Anjaneya Temple",
        description: "Another significant temple close to Bekal Fort, known for its architecture and spiritual importance."
      },
      {
        name: "Kappil Beach",
        description: "Approximately 7 km from Bekal, famed for its calm waters and tranquil setting."
      },
      {
        name: "Kodi Cliff",
        description: "Offers spectacular views of the coastline and a perfect spot for trekking."
      },
      {
        name: "Hosdurg and Chandragiri Forts",
        description: "Nearby forts that add to the historical richness of the region."
      },
      {
        name: "Bekal Waterfalls and Backwaters",
        description: "Picturesque natural spots ideal for a day trip."
      }
    ],
    
    topActivities: [
      "Exploring the vast Bekal Fort and walking its ramparts",
      "Relaxing and swimming at Bekal and Kappil beaches",
      "Trekking to Kodi Cliff and enjoying coastal views",
      "Visiting temples and understanding local culture and rituals",
      "Bird watching and boating in nearby backwaters",
      "Photography of fort architecture and sunset over the Arabian Sea"
    ],
    
    localCuisine: "Savor traditional Malabar cuisine with seafood specialties including freshly caught fish, prawn curry, and spicy chicken. Local snacks such as banana chips and halwa are popular.",
    
    festivalsCulture: [
      "Traditional Theyyam performances, a ritual dance form of North Kerala",
      "Local temple festivals celebrated with fervor and enthusiasm",
      "The fort area occasionally hosts cultural events and fairs"
    ],
    
    travelTips: [
      "Wear comfortable walking shoes for exploring the fort's uneven terrain",
      "Carry water and sun protection gear for daytime visits",
      "Respect local customs at temples and beaches",
      "Visit early morning or late afternoon for pleasant weather and beautiful light"
    ],
    
    nearbyAttractions: [
      "Kasaragod town",
      "Other historic forts in the region",
      "Northern Kerala backwaters"
    ],
    
    howToReach: {
      air: "Mangalore International Airport (approximately 65 km) and Kannur International Airport (about 110 km)",
      rail: "Bekal Fort railway station has good connections to major cities",
      road: "Well-connected by highway and local transport from Kasaragod and Kasaragod town"
    },
    
    climate: "Coastal climate with pleasant temperatures"
  },
  {
    id: "thrissur",
    name: "THRISSUR",
    desc: "Kerala's Cultural Capital - Rich in heritage, festivals, temples, and natural beauty. Famous for its grand religious celebrations, classical arts, historic architecture, and scenic waterfalls.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488067/padmanabha-swamy2_bgsb1c.png"
    ],
    rating: "4.5",
    tours: "6",
    highlights: ["Vadakkunnathan Temple", "Athirappilly Waterfalls", "Guruvayur Temple", "Thrissur Pooram", "Kerala Kalamandalam"],
    bestSeason: "October to March is the ideal time for visiting Thrissur due to pleasant weather and several festivals taking place during this period, including the world-famous Thrissur Pooram.",
    distance: "50 km from Kochi",
    packages: ["Cultural Kerala Tour", "Temple Trail Experience"],
    
    overview: "Thrissur, known as the cultural capital of Kerala, is rich in heritage, festivals, temples, and natural beauty. It is famous for its grand religious celebrations, classical arts, historic architecture, and scenic waterfalls. The city is a vibrant blend of spirituality, tradition, and modern cultural expressions.",
    
    keyAttractions: [
      {
        name: "Vadakkunnathan Temple",
        description: "An ancient and monumental Shiva temple in the heart of Thrissur city, classified as a UNESCO heritage site. Known for its traditional Kerala architecture and murals."
      },
      {
        name: "Athirappilly Waterfalls",
        description: "Often called the 'Niagara of India,' this majestic waterfall set in the midst of lush forests is a top nature attraction near Thrissur."
      },
      {
        name: "Guruvayur Temple",
        description: "One of Kerala's most famous temples dedicated to Lord Krishna, drawing pilgrims from across India."
      },
      {
        name: "Punnathur Kotta",
        description: "The elephant sanctuary near Guruvayur where temple elephants are cared for. Visitors can watch these majestic animals up close."
      },
      {
        name: "Shakthan Thampuran Palace",
        description: "A historic palace turned museum showcasing art, weaponry, and the rich heritage of the region."
      },
      {
        name: "Kerala Kalamandalam",
        description: "Renowned center for classical performing arts like Kathakali and Mohiniyattam."
      },
      {
        name: "Thrissur Zoo and State Museum",
        description: "Offers a mix of wildlife and cultural history exhibits."
      },
      {
        name: "Vilangan Kunnu",
        description: "Thrissur's largest hill, offering panoramic views and picnic spots."
      },
      {
        name: "Snehatheeram Beach",
        description: "A nearby beautiful beach ideal for relaxation and sunset views."
      }
    ],
    
    topActivities: [
      "Witness cultural performances like Kathakali, Kalaripayattu, and traditional music",
      "Explore historic temples, churches, and palaces",
      "Visit wildlife sanctuaries and waterfalls",
      "Take part in or observe the vibrant Thrissur Pooram festival if visiting during festival season",
      "Enjoy local crafts and shopping in bustling markets"
    ],
    
    localCuisine: "Sample authentic Kerala cuisine with dishes like Malabar biryani, Kerala Sadya, seafood specialties, and street foods such as banana chips and sweet snacks.",
    
    festivalsCulture: [
      "Thrissur Pooram: The grand temple festival featuring spectacular elephant processions, traditional music, and fireworks",
      "Various temple festivals and classical art events held year-round"
    ],
    
    travelTips: [
      "Plan visits during festivals for a unique cultural experience",
      "Carry comfortable walking shoes for temple visits and hill trekking",
      "Respect temple protocols and dress codes",
      "Try local delicacies at small eateries for authentic taste"
    ],
    
    nearbyAttractions: [
      "Athirappilly and Vazhachal Waterfalls for nature lovers",
      "Kodungallur Bhagavathy Temple for spiritual visits",
      "Nearby hill stations and wildlife sanctuaries"
    ],
    
    howToReach: {
      air: "Cochin International Airport, approximately 50 km from Thrissur city",
      rail: "Thrissur railway station with regular connectivity to major cities",
      road: "Well connected by buses and taxis"
    },
    
    climate: "Tropical climate with moderate temperatures"
  },
  {
    id: "munroe-island",
    name: "MUNROE ISLAND",
    desc: "Tranquil Backwater Gem of Kerala - A cluster of eight small inland islands located at the confluence of Ashtamudi Lake and the Kallada River in Kollam district.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munroe-island-_j6vwln.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munroe-island-_j6vwln.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
    ],
    rating: "4.3",
    tours: "2",
    highlights: ["Backwater Canals", "Coir Making Units", "Village Life", "Dutch Church", "Bird Watching"],
    bestSeason: "October to February is ideal with cool, dry weather perfect for boating, exploring villages, and birdwatching.",
    distance: "25 km from Kollam",
    packages: ["Backwater Village Experience", "Eco-Tourism Kerala"],
    
    overview: "Munroe Island, locally known as Mundrothuruthu, is a cluster of eight small inland islands located at the confluence of Ashtamudi Lake and the Kallada River in Kollam district, Kerala. Named after Colonel John Munro, a British Resident who played a key role in land reclamation during the Travancore era, the island is a picturesque blend of peaceful backwaters, lush greenery, and traditional village life. It is often called the 'Sinking Island of Kerala' due to gradual subsidence but remains a serene destination rich in nature and culture.",
    
    keyAttractions: [
      {
        name: "Backwater Canals and Lagoons",
        description: "Narrow waterways perfect for canoe rides, kayaking, and boat cruises, offering intimate views of village life and nature."
      },
      {
        name: "Coir Making Units",
        description: "Traditional coir retting and weaving factories where visitors can observe and experience authentic craftsmanship."
      },
      {
        name: "Village Life",
        description: "Witness daily activities such as fishing, prawn feeding, coconut farming, and local markets."
      },
      {
        name: "Dutch Church",
        description: "An ancient church built by the Dutch in 1878 showcasing distinctive Dutch-Kerala architecture on the lakeshore."
      },
      {
        name: "Pathupara Islands",
        description: "Tiny islets surrounding Munroe Island, known for bird watching and scenic beauty."
      },
      {
        name: "Kallada Boat Race",
        description: "Held during the Onam festival, this famous snake boat race is a spirited cultural event nearby."
      }
    ],
    
    topActivities: [
      "Canoe and boat tours through calming backwaters and mangroves",
      "Exploring rural villages and engaging with local culture",
      "Observing traditional coir industry and fishing techniques",
      "Bird watching with migratory and native bird species",
      "Enjoying local cuisine and fresh seafood at village eateries"
    ],
    
    localCuisine: "Local dishes centered around fresh fish, coconut-rich curries, rice, and tropical fruits are specialties here. Homestays and small restaurants serve authentic Kerala meals with a village touch.",
    
    festivalsCulture: [
      "Onam Festivals: The annual harvest festival celebrated with cultural shows, boat races, and feasts",
      "Church and temple festivals drawing pilgrims from various parts of Kerala and beyond"
    ],
    
    travelTips: [
      "Carry mosquito repellent and sun protection for outdoor activities",
      "Respect local customs and privacy while visiting villages",
      "Bring a change of clothes if planning canoe or kayaking tours",
      "Avoid littering to preserve the fragile ecosystem",
      "Best visited during daylight hours for safety and enjoyment"
    ],
    
    nearbyAttractions: [
      "Ashtamudi Lake for larger backwater cruises",
      "Kollam city with historic sites and bustling markets",
      "Palaruvi Waterfalls and Thenmala Eco-tourism site for nature excursions"
    ],
    
    howToReach: {
      air: "Thiruvananthapuram International Airport is about 80 km away",
      rail: "Munroe Thuruthu Railway Station is the nearest railhead",
      road: "Easily accessible by taxi or public transport from Kollam city and nearby towns"
    },
    
    climate: "Tropical climate with high humidity"
  },
  {
    id: "poovar",
    name: "POOVAR",
    desc: "Where River, Lake, and Sea Meet - A picturesque fishing village and eco-tourism destination in the Thiruvananthapuram district featuring the confluence of the Arabian Sea, the Neyyar River, and backwaters.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Poovar_gvqskq.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Poovar_gvqskq.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_2_jzvrhh.jpg"
    ],
    rating: "4.4",
    tours: "3",
    highlights: ["Poovar Beach", "Backwaters", "Mangrove Forests", "Poovar Island", "Sunset Cruises"],
    bestSeason: "August to March is the best time to visit Poovar when the climate is cool and pleasant, perfect for beach activities, boating, and exploring natural beauty.",
    distance: "35 km from Trivandrum",
    packages: ["Beach & Backwater Tour", "Kerala Coastal Retreat"],
    
    overview: "Poovar is a picturesque fishing village and eco-tourism destination in the Thiruvananthapuram district of Kerala. Poovar uniquely features the confluence of the Arabian Sea, the Neyyar River, and backwaters, creating a delightful natural estuary. Known as the 'Stream of Flowers,' the village offers golden sandy beaches, mangrove forests, tranquil backwaters, and a peaceful retreat away from bustling tourist spots.",
    
    keyAttractions: [
      {
        name: "Poovar Beach",
        description: "A pristine stretch of golden sands bordered by palm groves on one side and calm backwaters on the other, offering a serene atmosphere."
      },
      {
        name: "Poovar Backwaters and Mangroves",
        description: "Explore the lush mangrove forests by boat, rich with flora and fauna including water birds, crabs, and other wildlife."
      },
      {
        name: "Poovar Island",
        description: "Situated near the estuary, this small island is famous for its idyllic landscapes and quiet surroundings."
      },
      {
        name: "Vizhinjam Marine Aquarium",
        description: "Located nearby, showcasing marine life from the region's coastal waters."
      },
      {
        name: "Pulinkudi Azhimala Shiva Temple",
        description: "Perched atop cliffs overlooking the sea, this temple offers spiritual solace with stunning views."
      },
      {
        name: "Neyyar River Estuary",
        description: "The unique hotspot where freshwater meets the sea, creating a diverse ecosystem."
      },
      {
        name: "Fishing Village Experience",
        description: "Observe and interact with the local fishermen who maintain traditional methods and a simple lifestyle."
      },
      {
        name: "Sunset Cruises",
        description: "Evening boat rides on the backwaters, offering picturesque sunsets and serene views."
      }
    ],
    
    topActivities: [
      "Leisurely boat rides through the backwaters and mangrove forests",
      "Relaxing on quiet golden-sand beaches",
      "Birdwatching, especially spotting water birds in the estuary and backwaters",
      "Visiting local temples and experiencing village culture",
      "Sunset cruises offering stunning natural panoramas",
      "Indulging in Ayurvedic spa and wellness treatments nearby"
    ],
    
    localCuisine: "Taste fresh seafood, traditional Kerala meals, and tropical fruits. Local eateries serve simple but flavorful dishes highlighting the bounty of the sea and land.",
    
    festivalsCulture: [
      "Local festivals at temples including vibrant rituals at Pulinkudi Azhimala Shiva Temple",
      "Cultural performances like Kathakali and traditional music offered at local venues",
      "Fishing festivals and community events showcasing the coastal lifestyle"
    ],
    
    travelTips: [
      "Carry sun protection, hats, and light clothing for daytime outdoor activities",
      "Respect the natural environment, especially the mangrove ecosystem",
      "Use local guides for boat trips to safely explore dense mangrove areas",
      "Visit early mornings or late afternoons for the best light and cooler temperatures"
    ],
    
    nearbyAttractions: [
      "Kovalam Beach for water sports and nightlife",
      "Varkala Cliff and Beach for scenic beauty",
      "Neyyar Wildlife Sanctuary and Dam for nature enthusiasts"
    ],
    
    howToReach: {
      air: "Thiruvananthapuram International Airport, around 35 km away",
      rail: "Thiruvananthapuram Central and Varkala Railway Stations",
      road: "Well connected through local taxis and buses from nearby cities"
    },
    
    climate: "Tropical coastal climate"
  },
  {
    id: "thiruvananthapuram",
    name: "TRIVANDRUM",
    desc: "Kerala's Capital of Culture and Nature - Kerala's bustling capital city blending ancient traditions, modern infrastructure, and rich cultural heritage.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Thiruvananthapuram_Trivandrum_sgwysg.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Thiruvananthapuram_Trivandrum_sgwysg.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488067/padmanabha-swamy2_bgsb1c.png"
    ],
    rating: "4.5",
    tours: "8",
    highlights: ["Padmanabhaswamy Temple", "Napier Museum", "Kovalam Beach", "Neyyar Sanctuary", "Agasthyarkoodam"],
    bestSeason: "October to March is the best season, with pleasant weather ideal for sightseeing, beach activities, and trekking. The monsoon months bring greenery but may limit outdoor plans.",
    distance: "200 km from Kochi",
    packages: ["Capital City Tour", "Cultural Heritage Experience"],
    
    overview: "Thiruvananthapuram, commonly known as Trivandrum, is Kerala's bustling capital city blending ancient traditions, modern infrastructure, and rich cultural heritage. It is known for its beautiful coastline, historic temples, lush greenery, and vibrant arts scene. The city is also the gateway to many natural attractions and hill stations in southern Kerala.",
    
    keyAttractions: [
      {
        name: "Sree Padmanabhaswamy Temple",
        description: "One of the richest and most famous temples dedicated to Lord Vishnu, known for its intricate Dravidian architecture and extensive treasures."
      },
      {
        name: "Napier Museum",
        description: "A 19th-century Indo-Saracenic art and natural history museum showcasing Kerala's cultural artifacts, ancient art, and weaponry."
      },
      {
        name: "Kanakakkunnu Palace",
        description: "A historic palace and cultural venue with sprawling grounds, hosting festivals and exhibitions."
      },
      {
        name: "Kuthiramalika Palace Museum",
        description: "Built by King Swathi Thirunal with unique wooden carvings and architecture, famous for its collection of artifacts and paintings."
      },
      {
        name: "Vizhinjam Rock-cut Temple",
        description: "An ancient 8th-century rock-cut temple with intricate sculptures and religious significance."
      },
      {
        name: "Thiruvananthapuram Zoo and Museum",
        description: "The oldest zoo in India with a variety of animals and adjoining natural history museum."
      },
      {
        name: "Attukal Bhagavathy Temple",
        description: "Known for the famous annual Attukal Pongala festival attracting millions of women pilgrims."
      },
      {
        name: "Kovalam Beach",
        description: "Iconic beach resort town near the city, known for its crescent beaches and lighthouse."
      },
      {
        name: "Poovar Island",
        description: "A scenic estuary where backwaters meet the sea, popular for boat trips and peaceful surroundings."
      },
      {
        name: "Neyyar Wildlife Sanctuary",
        description: "A wildlife reserve offering boating, elephant rides, and nature treks."
      },
      {
        name: "Agasthyarkoodam",
        description: "The second highest peak in Kerala, situated within the Agasthyamalai Biosphere Reserve, popular among trekkers and nature lovers."
      }
    ],
    
    topActivities: [
      "Exploring the architectural and cultural landmarks in the city",
      "Attending traditional festivals and cultural programs",
      "Relaxing at nearby beaches like Kovalam and Shangumugham",
      "Trekking in Agasthyarkoodam and visiting wildlife sanctuaries",
      "Experiencing Ayurvedic spa and wellness treatments"
    ],
    
    localCuisine: "Thiruvananthapuram offers a rich culinary scene with fresh seafood, spicy vegetable curries, appam with stew, puttu and kadala curry, and vegetarian and non-vegetarian Onam Sadya (traditional feast).",
    
    festivalsCulture: [
      "Attukal Pongala: A unique women's festival involving an offering of sweet pongal at the Attukal Bhagavathy Temple",
      "Onam: The vibrant harvest festival marked by elaborate feasts, boat races, and cultural programs",
      "Various temple festivals celebrating Kerala's religious diversity and cultural heritage"
    ],
    
    travelTips: [
      "Dress modestly when visiting temples and religious sites",
      "Best to explore heritage sites in the morning or late afternoon to avoid heat",
      "Use local transport or hire taxis for convenient city commuting",
      "Plan visits to natural sites with a guide for trekking and wildlife safaris"
    ],
    
    nearbyAttractions: [
      "Kovalam Beach for sun and sea relaxation",
      "Poovar Island and Veli Tourist Village for backwaters and boating",
      "Ponmudi hill station for cool climate and trekking"
    ],
    
    howToReach: {
      air: "Trivandrum International Airport, connecting well with major Indian and international cities",
      rail: "Trivandrum Central Railway Station, a major rail hub",
      road: "Well connected by highways, taxis, and buses"
    },
    
    climate: "Tropical climate with coastal influence"
  },
  {
    id: "kannur",
    name: "KANNUR",
    desc: "The Land of Beaches, Forts, and Culture - Renowned for its pristine beaches, historic forts, rich cultural festivals like Theyyam, and lush mangrove forests.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/Kannur_jy8wax.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/Kannur_jy8wax.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_2_jzvrhh.jpg"
    ],
    rating: "4.4",
    tours: "4",
    highlights: ["St. Angelo Fort", "Muzhappilangad Beach", "Arakkal Museum", "Theyyam Festival", "Kavvayi Backwaters"],
    bestSeason: "October to March offers the most pleasant weather for sightseeing, beach activities, and festivals.",
    distance: "250 km from Kochi",
    packages: ["Northern Kerala Tour", "Cultural & Beach Experience"],
    
    overview: "Kannur, located in the northern part of Kerala, is renowned for its pristine beaches, historic forts, rich cultural festivals like Theyyam, and lush mangrove forests. The region offers a blend of natural beauty, historical significance, and vibrant traditions, making it a perfect destination for travelers seeking diverse experiences.",
    
    keyAttractions: [
      {
        name: "St. Angelo Fort",
        description: "A historic Portuguese fortress built in the 16th century on an island, offering spectacular views of the Arabian Sea and a glimpse into Kerala's colonial past."
      },
      {
        name: "Muzhappilangad Drive-in Beach",
        description: "Asia's longest drive-in beach, where visitors can drive along the shoreline and enjoy the scenic ocean."
      },
      {
        name: "Arakkal Museum",
        description: "Dedicated to the Arakkal royal family, the only Muslim royal family of Kerala, showcasing their history and artefacts."
      },
      {
        name: "Parassini Madappura Sree Muthappan Temple",
        description: "A famous temple known for its lively rituals and festivals."
      },
      {
        name: "Ezhimala Hill & Beach",
        description: "The hillock offers panoramic views and is famous for Ezhimala Naval Academy. The nearby beach is scenic and less crowded."
      },
      {
        name: "Bekal Fort",
        description: "A nearby historic seaside fort in Kasaragod, known for its architecture and expansive views of the coast."
      },
      {
        name: "Kavvayi Backwaters",
        description: "An extensive network of lakes and rivers perfect for kayaking, houseboat rides, and birdwatching."
      },
      {
        name: "Pazhassi Dam",
        description: "A scenic dam surrounded by lush forests, ideal for picnics and nature walks."
      },
      {
        name: "Valapattanam River",
        description: "Known for its mangrove forests and boat rides showcasing Kerala's natural ecosystem."
      },
      {
        name: "Theyyam Festival",
        description: "A ritual dance performance unique to North Kerala, celebrated with vibrant processions and performances."
      }
    ],
    
    topActivities: [
      "Exploring forts, temples, and historical sites",
      "Enjoying drive-in beaches and relaxing on the pristine sands",
      "Engaging in water sports at Muzhappilangad Beach",
      "Participating in or watching Theyyam festivals and cultural performances",
      "Cruising through the backwaters of Kavvayi or Valapattanam",
      "Trekking and bird watching in nearby hills and forests"
    ],
    
    localCuisine: "Savor Malabar cuisine with spicy seafood curries, appams, puttu, and toddy, along with local snacks like banana chips and pathiri.",
    
    festivalsCulture: [
      "Theyyam: The spectacular ritual dance with elaborate costumes and fiery performances during festival seasons",
      "Local temple festivals, celebrating deities with processions, music, and dance"
    ],
    
    travelTips: [
      "Carry sun protection and adequate water for outdoor excursions",
      "Respect local customs, especially during festivals and temple visits",
      "Book boat rides and cultural tours in advance during peak seasons",
      "Early morning visits provide excellent sights and fewer crowds"
    ],
    
    nearbyAttractions: [
      "Ezhimala Naval Academy and beaches",
      "Bekal Fort in Kasaragod",
      "Wayanad hills and tea plantations nearby for a mix of hill station experiences",
      "Kizhunna Beach and Thalassery for more coastal adventures"
    ],
    
    howToReach: {
      air: "Kannur International Airport, about 26 km from the city",
      rail: "Kannur Railway Station is well-connected to major Indian cities",
      road: "Extensive bus network and taxis link Kannur to other parts of Kerala and neighboring states"
    },
    
    climate: "Tropical coastal climate"
  },
  {
    id: "kollam",
    name: "KOLLAM",
    desc: "Gateway to Kerala's Backwaters and Heritage - A coastal city and district recognized for its role in ancient trade, especially in spices and cashew.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/-kollam-_bsqsgx.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/-kollam-_bsqsgx.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
    ],
    rating: "4.3",
    tours: "5",
    highlights: ["Ashtamudi Lake", "Jatayu Earth Center", "Thangassery Lighthouse", "Palaruvi Waterfalls", "Thenmala Eco-tourism"],
    bestSeason: "October to March is the best time to explore Kollam and its surroundings due to pleasant weather and minimal rainfall.",
    distance: "150 km from Kochi",
    packages: ["Backwater Gateway Tour", "Eco-Tourism Experience"],
    
    overview: "Kollam, historically known as Quilon, is a coastal city and district in Kerala recognized for its role in ancient trade, especially in spices and cashew. Nestled beside the Arabian Sea and blessed with intricate backwaters like Ashtamudi Lake, Kollam offers a mix of natural beauty, historic sites, and vibrant local culture. It is a key entry point to Kerala's famous backwater network and eco-tourism destinations.",
    
    keyAttractions: [
      {
        name: "Ashtamudi Lake",
        description: "The largest lake in Kerala with eight prominent channels, offering scenic houseboat cruises and lush tropical landscapes."
      },
      {
        name: "Jatayu Earth Center",
        description: "Home to the world's largest bird sculpture, Jatayu, and offers adventure activities like rock climbing, zip-lining, and trekking. Recognized by the Guinness Book of World Records."
      },
      {
        name: "Thangassery Lighthouse",
        description: "A historic lighthouse standing 144 feet tall on the coast, built in 1902, offering panoramic views of the Arabian Sea."
      },
      {
        name: "Palaruvi Waterfalls",
        description: "Known as the 'Stream of Milk,' this 300-foot waterfall cascades down the Western Ghats amidst lush forests."
      },
      {
        name: "Thenmala Eco-tourism",
        description: "India's first planned eco-tourism destination featuring boating, trekking, a suspension rope bridge, and a musical fountain."
      },
      {
        name: "Kollam Beach and Thirumullavaram Beach",
        description: "Beautiful sandy beaches ideal for relaxing, swimming, and enjoying sunsets."
      },
      {
        name: "Punalur Suspension Bridge",
        description: "Historic suspension bridge known as the 'London Bridge of Kerala,' an architectural marvel built in 1877."
      },
      {
        name: "Shenduruny Wildlife Sanctuary",
        description: "Part of the Agasthyamalai Biosphere Reserve, home to diverse flora and fauna including elephants and rare primates."
      },
      {
        name: "Thevally Palace",
        description: "A heritage site near Ashtamudi Lake with historical significance."
      },
      {
        name: "Munroe Island",
        description: "Nearby islands with serene backwaters, traditional coir-making, and village life."
      }
    ],
    
    topActivities: [
      "Houseboat cruises through Ashtamudi Lake and Munroe Island backwaters",
      "Adventure sports and trekking at Jatayu Earth Center and Thenmala",
      "Beach activities and relaxing on sandy shores",
      "Visiting historic forts, lighthouses, and heritage sites",
      "Exploring waterfalls and wildlife sanctuaries",
      "Sampling local cuisine and exploring traditional markets"
    ],
    
    localCuisine: "Fresh seafood, traditional Kerala curries, homemade pickles, and snacks like banana chips and tapioca are highlights. Local eateries offer authentic meals made with fresh regional ingredients.",
    
    festivalsCulture: [
      "Thriving local festivals at temples and churches",
      "Cultural events at Thenmala and Jatayu Earth Center with performances and exhibitions",
      "Cashew and spice trade fairs emphasizing Kollam's commercial prominence"
    ],
    
    travelTips: [
      "Plan houseboat cruises in advance, especially during peak season",
      "Use comfortable footwear for trekking and adventure activities",
      "Respect wildlife and adhere to guidelines in sanctuaries",
      "Carry sun protection and insect repellents for outdoor excursions"
    ],
    
    nearbyAttractions: [
      "Ashtamudi Lake backwaters",
      "Munroe Island for village experiences",
      "Thenmala eco-tourism destination",
      "Sasthamkotta freshwater lake"
    ],
    
    howToReach: {
      air: "Trivandrum International Airport (about 70 km)",
      rail: "Kollam Junction is a major railway station connecting to major Indian cities",
      road: "Well connected by national highways and buses"
    },
    
    climate: "Tropical coastal climate"
  },
  {
    id: "idukki",
    name: "IDUKKI",
    desc: "Kerala's Mountainous Spice Garden and Wildlife Haven - A picturesque district renowned for its mountainous terrain, dense forests, spice plantations, and serene hill stations.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Idukki_qn2nbg.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Idukki_qn2nbg.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
    ],
    rating: "4.6",
    tours: "7",
    highlights: ["Idukki Arch Dam", "Periyar Sanctuary", "Meesapulimala", "Anamudi Peak", "Spice Plantations"],
    bestSeason: "October to May is the best time to visit Idukki, with cool, pleasant weather ideal for sightseeing, trekking, and wildlife safaris. Monsoon season (June to September) can be rainy but transforms the forests into lush landscapes.",
    distance: "120 km from Kochi",
    packages: ["Mountain Adventure Tour", "Wildlife & Spice Experience"],
    
    overview: "Idukki is a picturesque district in Kerala, renowned for its mountainous terrain, dense forests, spice plantations, and serene hill stations. It is part of the Western Ghats and home to some of the highest peaks in South India including Anamudi and Meesapulimala. Known as Kerala's 'Spice Garden,' Idukki offers rich biodiversity, tranquil lakes, lush valleys, and vibrant wildlife sanctuaries, making it a prime destination for nature lovers and adventure seekers.",
    
    keyAttractions: [
      {
        name: "Idukki Arch Dam",
        description: "Asia's largest arch dam across the Periyar River, set between two granite hills (Kuravanmala and Kurathimala). It is a marvel of engineering and offers breathtaking views."
      },
      {
        name: "Periyar Wildlife Sanctuary (Thekkady)",
        description: "Famous for its elephant-populated forests and tiger reserve, it offers boat safaris on Periyar Lake, jungle trekking, and wildlife watching."
      },
      {
        name: "Munnar",
        description: "A famous hill station with sprawling tea estates, Eravikulam National Park, waterfalls, and scenic viewpoints."
      },
      {
        name: "Meesapulimala",
        description: "The second highest peak in the Western Ghats, popular among trekkers for its challenging trails and panoramic views."
      },
      {
        name: "Anamudi Peak",
        description: "The highest peak in South India situated within Eravikulam National Park, accessible to trekkers with permits."
      },
      {
        name: "Cheruthoni and Kulamavu Dams",
        description: "Part of the Idukki Hydroelectric Project with scenic reservoirs and viewpoints."
      },
      {
        name: "Ramakkalmedu",
        description: "Known for its wind energy parks and panoramic views covering neighboring Tamil Nadu."
      },
      {
        name: "Hill View Park",
        description: "A popular viewpoint near Painavu offering expansive views of the hills and reservoirs."
      },
      {
        name: "Sita Devi Lake",
        description: "A tranquil lake near Idukki surrounded by hills and tea plantations."
      },
      {
        name: "Gavi",
        description: "An eco-tourism hotspot with trekking, boating, and rich flora and fauna."
      }
    ],
    
    topActivities: [
      "Trekking to peaks like Anamudi and Meesapulimala",
      "Wildlife safaris and boat rides in Periyar Wildlife Sanctuary",
      "Exploring tea plantations and visiting spice gardens",
      "Sightseeing at dams, reservoirs, and scenic viewpoints",
      "Adventure activities at Ramakkalmedu and eco-tourism sites like Gavi"
    ],
    
    localCuisine: "Savor Kerala's hill cuisine featuring fresh spices such as cardamom and pepper. Local dishes include traditional Kerala meals, with an emphasis on vegetarian food, tapioca, and fresh fish delicacies.",
    
    festivalsCulture: [
      "Traditional temple festivals in the region",
      "Cultural events promoting local arts and traditions linked with the tribal communities and plantation culture"
    ],
    
    travelTips: [
      "Book trekking and wildlife tours in advance with proper permits",
      "Carry warm clothing, especially for higher altitude areas",
      "Use guided tours for forest safaris and trekking routes",
      "Respect wildlife guidelines and safety protocols"
    ],
    
    nearbyAttractions: [
      "Thekkady Tiger Reserve",
      "Munnar hill station and Eravikulam National Park",
      "Vattavada and Kattapana for nature and tea estates"
    ],
    
    howToReach: {
      air: "Cochin International Airport (around 110 km from Munnar)",
      rail: "Aluva and Ernakulam railway stations are the nearest major railheads",
      road: "Well connected with buses, taxis, and private vehicles from major cities"
    },
    
    climate: "Cool mountain climate"
  },
  {
    id: "chinnar",
    name: "CHINNAR WILDLIFE SANCTUARY",
    desc: "Kerala's Unique Dry Forest Reserve - Located 18 km north of Marayoor in the Devikulam taluk of Idukki district, featuring dry thorn scrub forests and rich biodiversity.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Chinnar_Wildlife_Sanctuary_k2e4bb.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Chinnar_Wildlife_Sanctuary_k2e4bb.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
    ],
    rating: "4.2",
    tours: "2",
    highlights: ["Grizzled Giant Squirrel", "Thoovanam Waterfalls", "Wildlife Safaris", "Bird Watching", "Trekking"],
    bestSeason: "October to November offers the most pleasant climate for trekking, wildlife viewing, and outdoor activities. The sanctuary is open all year round; avoid monsoon months (June-September) due to slippery trails and heavy rain.",
    distance: "150 km from Kochi",
    packages: ["Wildlife Sanctuary Tour", "Nature & Adventure"],
    
    overview: "Chinnar Wildlife Sanctuary is located 18 km north of Marayoor in the Devikulam taluk of Idukki district, Kerala. Established in 1984, it spans approximately 91 sq. km in the rain shadow region of the Western Ghats. The sanctuary features dry thorn scrub forests, dry deciduous, shola grasslands, and riparian forests. It borders the Eravikulam National Park in the south and the Indira Gandhi Wildlife Sanctuary in the north, creating a contiguous biodiversity zone.",
    
    keyAttractions: [
      {
        name: "Grizzled Giant Squirrel and Indian Star Tortoise",
        description: "Home to the endangered Grizzled Giant Squirrel and Indian star tortoise, with a unique rehabilitation center for the latter."
      },
      {
        name: "Thoovanam Waterfalls",
        description: "A popular trekking spot deep inside the sanctuary."
      },
      {
        name: "Rare Flora",
        description: "Including sandalwood, teak, acacia, and over 1,000 species of flowering plants."
      },
      {
        name: "Diverse Fauna",
        description: "Elephants, tigers, panthers, gaur, spotted deer, sambar, Hanuman monkeys, bonnet macaques, slender loris."
      },
      {
        name: "Bird Species",
        description: "Over 225 species including black eagle, yellow-throated bulbul, serpent eagle, greys heron."
      },
      {
        name: "Trekking Routes",
        description: "Several trekking routes with scenic views, nature trails, and cultural sites."
      }
    ],
    
    topActivities: [
      "Guided jeep and elephant safaris for wildlife spotting",
      "Trekking to Thoovanam Waterfalls and other cultural sites",
      "Birdwatching and nature walks",
      "Visiting the Indian star tortoise rehabilitation center",
      "Eco-tourism activities including overnight stays in treehouses and eco-lodges"
    ],
    
    localCuisine: "Traditional Kerala dishes centered around rice, tapioca, and locally sourced fish. Tribal culinary influences introduce wild greens, roots, and meat preparations flavored with native spices like cardamom and black pepper.",
    
    festivalsCulture: [
      "Celebrates major Kerala festivals such as Onam and Vishu with traditional rituals and feasts",
      "Local tribal festivals featuring folk dances, music, and rituals showcasing rich cultural heritage"
    ],
    
    travelTips: [
      "Wear sturdy shoes and carry mosquito repellent and sunscreen",
      "Book safaris and guided tours in advance for guaranteed entry",
      "Maintain silence during tours for better wildlife encounters",
      "Carry water, binoculars, and a camera for an enhanced experience",
      "Travel early morning or late afternoon to maximize wildlife sighting opportunities"
    ],
    
    nearbyAttractions: [
      "Thoovanam Waterfalls (within sanctuary)",
      "Marayoor Sandalwood Forests and ancient dolmens",
      "Lakkam and Attukal Waterfalls near Munnar",
      "Aliyar Dam and Monkey Falls (near Tamil Nadu border)",
      "Amaravathi Dam and crocodile sanctuary",
      "Topslip and Parambikulam Tiger Reserve",
      "Ramakkalmedu wind farms and viewpoints",
      "Pothamedu Viewpoint near Munnar for panoramic tea estate views"
    ],
    
    howToReach: {
      air: "Cochin International Airport is about 150 km away",
      rail: "Pollachi railway station is approximately 60 km from the sanctuary",
      road: "Accessible from Cochin, Pollachi, and Munnar via road networks; taxis and private vehicles allowed with Forest Department registration"
    },
    
    climate: "Dry forest climate"
  },
  {
    id: "kalamassery",
    name: "KALAMASSERY",
    desc: "Industrial and Educational Hub of Kochi - A prominent industrial and residential locality in the Kochi metropolitan area, known for its blend of urban infrastructure and academic excellence.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kalamassery_ltevtp.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kalamassery_ltevtp.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490476/premium_photo-1697729597066-7b3d09b6dab7_oxwkpb.jpg"
    ],
    rating: "4.0",
    tours: "1",
    highlights: ["CUSAT University", "FACT Industries", "Kochi Metro", "Educational Institutions", "Urban Development"],
    bestSeason: "Year Round",
    distance: "9 km from Kochi",
    packages: ["Educational Tour", "Industrial Visit"],
    
    overview: "Kalamassery is a prominent industrial and residential locality in the Kochi metropolitan area, located about 9 km northeast of Kochi city center. It is a key center for Kerala's industrial development, hosting major companies and institutions, and known for its blend of urban infrastructure and academic excellence.",
    
    keyAttractions: [
      {
        name: "FACT Industrial Complex",
        description: "Home to the Fertilizers and Chemicals Travancore (FACT) industrial complex, one of India's largest fertilizer producers established in 1943."
      },
      {
        name: "Major Industries",
        description: "Hosts industries like Apollo Tyres, Hindustan Machine Tools (HMT), Carborundum, Merchem, and others. Many vehicle service centers for leading automobile brands are located here."
      },
      {
        name: "IT and Startup Hubs",
        description: "Important IT and startup hubs including Kerala Startup Village and Kochi Science City are in Kalamassery."
      },
      {
        name: "Educational Institutions",
        description: "Hosts several prestigious institutions such as Cochin University of Science and Technology (CUSAT), Government Medical College Ernakulam, National University of Advanced Legal Studies (NUALS), Rajagiri College of Social Sciences, Model Engineering College, and many others."
      },
      {
        name: "Infrastructure",
        description: "Well connected through NH 66 and Kochi Metro, with 3 metro stations servicing the area (Kalamassery Town, CUSAT, Pathadipalam). Home to the largest shopping mall in India, Lulu International Shopping Mall, located at nearby Edapally toll."
      },
      {
        name: "Healthcare Facilities",
        description: "Significant healthcare facilities include Government Medical College and KIMS hospital."
      },
      {
        name: "Local Amenities",
        description: "Various schools, colleges, and polytechnic institutions serving the population. Social and religious diversity with temples, churches, mosques, and community centers."
      }
    ],
    
    topActivities: [
      "Educational campus tours",
      "Industrial visits to major companies",
      "Shopping at Lulu Mall",
      "Exploring urban infrastructure and development",
      "Visiting educational and research institutions"
    ],
    
    localCuisine: "Urban Kerala cuisine with a mix of traditional and modern food options. Various restaurants and eateries offering local and international cuisine.",
    
    festivalsCulture: [
      "Cultural events at educational institutions",
      "Urban festivals and community events",
      "Religious festivals across diverse communities"
    ],
    
    travelTips: [
      "Use metro for convenient transportation",
      "Plan visits during weekdays for educational and industrial tours",
      "Carry identification for institutional visits",
      "Respect institutional guidelines and protocols"
    ],
    
    nearbyAttractions: [
      "Lulu International Shopping Mall",
      "Cochin University campus",
      "Kochi city center and Fort Kochi",
      "Marine Drive and other Kochi attractions"
    ],
    
    howToReach: {
      air: "Cochin International Airport is well connected",
      rail: "Ernakulam railway stations serve the area",
      road: "Excellent road connectivity with national highways and metro rail"
    },
    
    climate: "Urban tropical climate"
  },
  {
    id: "kumbalangi",
    name: "KUMBALANGI",
    desc: "India's First Model Fishing Village and Eco-Tourism Haven - A picturesque fishing village known as India's first model eco-tourism village, surrounded by tranquil backwaters and lush mangrove forests.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumbalangi-_vgkqik.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumbalangi-_vgkqik.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
    ],
    rating: "4.3",
    tours: "2",
    highlights: ["Chinese Fishing Nets", "Mangrove Forests", "Sea Sparkle", "Crab Catching", "Village Life"],
    bestSeason: "The months from November to February are cooler and pleasant for exploring. Sea sparkle phenomenon is best witnessed in September-October and again in March-April.",
    distance: "15 km from Kochi",
    packages: ["Village Tourism", "Eco-Tourism Experience"],
    
    overview: "Kumbalangi, located about 15 km from Kochi city, is a picturesque fishing village known as India's first model eco-tourism village. Surrounded by tranquil backwaters and lush mangrove forests, the village showcases sustainable tourism alongside traditional fishing lifestyles. Plastic bags are banned here to preserve the natural ecosystem, and no commercial resorts are built, maintaining its authentic charm.",
    
    keyAttractions: [
      {
        name: "Chinese Fishing Nets",
        description: "More than 100 distinctive fishing nets dot the tranquil backwaters, operated by locals using traditional methods."
      },
      {
        name: "Kumbalangi Integrated Tourism Village",
        description: "A government-supported initiative providing guided tours explaining the village's lifestyle, craft demonstrations, and sustainable fishing techniques."
      },
      {
        name: "Mangrove Forests",
        description: "Explore winding canals bordered by mangroves, a safe breeding ground for prawns, crabs, and oysters, through relaxing boat rides."
      },
      {
        name: "Sea Sparkle (Kavaru)",
        description: "A natural bioluminescence phenomenon visible during certain months (September-October and March-April) where water glows under moonlight, caused by micro-plankton."
      },
      {
        name: "Kalagraamam",
        description: "An artist village displaying handicrafts and fishing equipment reflecting local culture."
      },
      {
        name: "Toddy Tapping Demonstrations",
        description: "Witness traditional toddy extraction from coconut palms by skilled locals, a centuries-old craft."
      },
      {
        name: "Crab Catching",
        description: "Join fishermen during low tide to catch crabs in this natural habitat, an engaging experience for visitors."
      },
      {
        name: "Village Life Experiences",
        description: "Stays in homestays offering authentic local seafood cuisine such as prawn curry, fish fry, and crab masala."
      }
    ],
    
    topActivities: [
      "Guided backwater boat tours through the scenic canals",
      "Observing traditional fishing and coir-making activities",
      "Exploring mangrove ecosystems rich in biodiversity",
      "Enjoying fresh seafood at local homestays and eateries",
      "Participating in cultural activities and festivals"
    ],
    
    localCuisine: "Fresh seafood dominates the culinary scene, including prawn curry, crab masala, fish moilee, and fried fish, all flavored with rich Kerala spices and coconut milk.",
    
    festivalsCulture: [
      "Local temple festivals and Onam celebrations with folk art and boat races",
      "Preservation of traditional fishing culture and eco-friendly practices"
    ],
    
    travelTips: [
      "Book homestays in advance during peak seasons for an authentic village experience",
      "Carry insect repellent and sun protection for outdoors",
      "Respect local customs and ecological guidelines to help maintain the village's pristine environment"
    ],
    
    nearbyAttractions: [
      "Kochi city and Fort Kochi",
      "Cherai Beach",
      "Other backwater destinations in Kochi"
    ],
    
    howToReach: {
      rail: "Ernakulam railway station is the nearest, about 14 km away",
      air: "Cochin International Airport is approximately 46 km from Kumbalangi",
      road: "Well connected by local transport services and taxis from Kochi"
    },
    
    climate: "Coastal tropical climate"
  },
  {
    id: "silent-valley",
    name: "SILENT VALLEY NATIONAL PARK",
    desc: "The Last Undisturbed Rainforest of Kerala - Located in the Nilgiri Hills of Palakkad district, renowned for its pristine tropical evergreen rainforest and rich biodiversity.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/silentvalley-_chdrlb.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/silentvalley-_chdrlb.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
    ],
    rating: "4.5",
    tours: "2",
    highlights: ["Lion-tailed Macaque", "Watchtower", "Kunthi River", "Evergreen Forests", "Wildlife Safari"],
    bestSeason: "December to April is the best period, with pleasant weather ideal for trekking, safari, and wildlife viewing. The park is generally closed on Fridays for maintenance.",
    distance: "75 km from Palakkad",
    packages: ["Rainforest Adventure", "Wildlife Conservation Tour"],
    
    overview: "Silent Valley National Park is located in the Nilgiri Hills of Palakkad district, Kerala, spanning an area of 89.52 sq km as part of the Nilgiri Biosphere Reserve. It is renowned for its pristine tropical evergreen rainforest, rich biodiversity, and as one of the last substantial tracts of virgin rainforest in the Western Ghats. This park is a biodiversity hotspot, hosting endangered species and endemic flora and fauna.",
    
    keyAttractions: [
      {
        name: "Lion-tailed Macaque",
        description: "Home to the largest population of this endangered primate."
      },
      {
        name: "Watchtower at Sairandhri",
        description: "A 150-meter high tower offering panoramic views of the forest canopy, Kunthi River, and surrounding peaks like Anginda and Poochipara."
      },
      {
        name: "Kunthi River",
        description: "A pristine freshwater river flowing through the park with a hanging bridge providing stunning views."
      },
      {
        name: "Dense Evergreen Forests",
        description: "Towering ancient trees, orchids, mosses, and a rich canopy that limits sunlight reaching the forest floor."
      },
      {
        name: "Wildlife",
        description: "Includes Nilgiri tahr, Malabar giant squirrel, Nilgiri langur, elephants, gaur, spotted deer, leopards, tigers, and a broad variety of bird species like the Malabar Whistling Thrush and Racket-tailed Drongo."
      },
      {
        name: "Museum at Watchtower",
        description: "Displays information about the park's flora, fauna, and bird sounds with interactive exhibits."
      }
    ],
    
    topActivities: [
      "Guided jeep safari and nature walks within the park",
      "Trekking to watchtower and Kunthi River route for wildlife and bird watching",
      "Photography of rare and endemic species and scenic forests",
      "Exploring the hanging bridge over Kunthi River",
      "Visiting the museum for wildlife education"
    ],
    
    localCuisine: "The cuisine in surrounding areas features traditional Kerala dishes with rice, tapioca, and local vegetables. Freshwater fish and game meat might be available in local tribal cuisine nearby, enhanced with local spices and coconut.",
    
    festivalsCulture: [
      "The park area is influenced by local tribal communities with unique cultural festivals connected to nature and forest life",
      "Ecotourism and conservation awareness programs often coincide with cultural exhibitions and traditional rituals"
    ],
    
    travelTips: [
      "Book safari and trekking permits in advance",
      "Carry mosquito repellent, comfortable walking shoes, binoculars, and water",
      "Follow park guidelines strictly; avoid littering and disturbing wildlife",
      "The trek to the watchtower involves stairs and uneven trails, so prepare accordingly",
      "Avoid visits during heavy rain and peak summer for a better experience"
    ],
    
    nearbyAttractions: [
      "Silent Valley Watchtower and Museum",
      "Kunthi River and Hanging Bridge",
      "Sispara Peak",
      "Anginda Peak",
      "Protected forest tracts adjoining the Nilgiri Biosphere Reserve"
    ],
    
    howToReach: {
      air: "Peelamamedu Airport, Coimbatore (117 km)",
      rail: "Palakkad Junction, Palghat (75 km)",
      road: "Well connected by regular bus services from Coimbatore, Palakkad, and other major cities. Mukkali is the main gateway to the park."
    },
    
    climate: "Rainforest climate"
  },
  {
    id: "edakkal-caves",
    name: "EDAKKAL CAVES",
    desc: "Ancient Rock Art and Prehistoric Heritage in Wayanad - Two natural rock shelters located on the Ambukuthi Hills near Sulthan Bathery, famous for ancient petroglyphs dating back over 6,000 years.",
    image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Edakkal_Caves_scfq2n.jpg",
    images: [
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Edakkal_Caves_scfq2n.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
      "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
    ],
    rating: "4.4",
    tours: "3",
    highlights: ["Prehistoric Carvings", "Rock Shelters", "Ancient Petroglyphs", "Trekking", "Historical Exploration"],
    bestSeason: "October to May is ideal to visit Edakkal Caves, offering pleasant weather for trekking and exploration. Avoid monsoon months due to slippery trails.",
    distance: "10 km from Sulthan Bathery",
    packages: ["Historical Tour", "Archaeological Experience"],
    
    overview: "Edakkal Caves are two natural rock shelters located on the Ambukuthi Hills near Sulthan Bathery in Wayanad district. Despite the name, these are not typical caves but formed by huge boulders wedged together creating a sheltered space. Situated at around 1,200 meters above sea level, Edakkal Caves provide one of the earliest evidences of human civilization in Kerala with pictorial writings and carvings dating back over 6,000 years, to the Neolithic period.",
    
    keyAttractions: [
      {
        name: "Prehistoric Carvings and Petroglyphs",
        description: "Ancient rock engravings and paintings dating back over 6,000 years to the Neolithic period, depicting human figures, animals, tools, symbols, and scripts."
      },
      {
        name: "Rock Shelters",
        description: "Natural caves formed by large boulders wedged together, creating two main chambers: the lower chamber (smaller) and the larger upper chamber adorned with over 400 identifiable petroglyphs."
      },
      {
        name: "Historical Significance",
        description: "The caves were discovered in 1890 by Fred Fawcett, the then Superintendent of Police for Malabar. The carvings span different eras, from the Neolithic (6000 BCE) to the Iron Age (up to 1000 BCE), with some showing possible links to the Indus Valley civilization."
      },
      {
        name: "Mythological Association",
        description: "Myths associate the cave's formation with the arrows shot by Lava and Kusha, sons of Lord Rama, cleaving the rock. The name 'Edakkal' means 'a stone in between' referencing the boulder structure."
      },
      {
        name: "Archaeological Importance",
        description: "Provides one of the earliest evidences of human civilization in Kerala, indicating prehistoric human settlement or frequent use."
      }
    ],
    
    topActivities: [
      "Trekking through scenic Ambukuthi hills with panoramic views",
      "Observing some of the oldest examples of rock art in India",
      "Learning about ancient cultures, tools, and symbolic representation through the carvings",
      "Photography of ancient carvings and scenic landscapes",
      "Historical and archaeological exploration"
    ],
    
    localCuisine: "Traditional Wayanad cuisine featuring local tribal and Malabar dishes. Enjoy traditional meals with local herbs, bamboo rice, and fresh vegetables from the hills.",
    
    festivalsCulture: [
      "Local tribal festivals showcasing ancient traditions",
      "Archaeological and historical exhibitions",
      "Cultural events celebrating the region's prehistoric heritage"
    ],
    
    travelTips: [
      "Wear comfortable trekking shoes for the 45-minute uphill trek",
      "Carry water and light snacks for the climb",
      "Hire local guides for better understanding of the carvings",
      "Visit early morning to avoid crowds and heat",
      "Respect the archaeological site and avoid touching the carvings"
    ],
    
    nearbyAttractions: [
      "Sulthan Bathery town",
      "Wayanad Wildlife Sanctuary",
      "Other historical sites in Wayanad",
      "Tea and coffee plantations in the region"
    ],
    
    howToReach: {
      air: "Kozhikode International Airport (approximately 100 km) and Kannur International Airport (around 110 km)",
      rail: "Kozhikode and Mysore railway stations",
      road: "Edakkal Caves are about 10 km from Sulthan Bathery town. Visitors trek roughly 45 minutes uphill via steps and forest path to reach the caves. Jeep services are available for part of the ascent from local tourism offices."
    },
    
    climate: "Hill station climate"
  }

  ];

  // Find the place by ID
  const place = allPlaces.find(p => p.id === placeId) || allPlaces[0];

  // Sample package data
  const packageData = {
    "Munnar Tea Plantations Tour": { duration: "3 Days", price: "7,999" },
    "Complete Kerala Experience": { duration: "7 Days", price: "18,999" },
    "Kerala Honeymoon Special": { duration: "5 Days", price: "12,999" },
    "Kerala Backwaters & Beaches": { duration: "4 Days", price: "9,999" },
    "Kerala Wildlife Adventure": { duration: "4 Days", price: "10,999" },
    "Kerala Cultural Heritage": { duration: "3 Days", price: "6,999" },
    "Luxury Kerala Experience": { duration: "5 Days", price: "15,999" },
    "Wayanad Adventure Tour": { duration: "4 Days", price: "8,999" },
    "Vagamon Hill Retreat": { duration: "3 Days", price: "6,499" },
    "Waterfall Adventure Tour": { duration: "3 Days", price: "7,499" },
    "Beach & Culture Tour": { duration: "4 Days", price: "9,499" },
    "Nature & Heritage Tour": { duration: "4 Days", price: "8,999" },
    "Historic Kerala Tour": { duration: "3 Days", price: "6,999" },
    "Cultural Kerala Tour": { duration: "3 Days", price: "7,499" },
    "Backwater Village Experience": { duration: "2 Days", price: "4,999" },
    "Beach & Backwater Tour": { duration: "3 Days", price: "7,999" },
    "Capital City Tour": { duration: "2 Days", price: "5,499" },
    "Northern Kerala Tour": { duration: "4 Days", price: "9,999" },
    "Backwater Gateway Tour": { duration: "3 Days", price: "7,499" },
    "Mountain Adventure Tour": { duration: "4 Days", price: "9,499" },
    "Wildlife Sanctuary Tour": { duration: "2 Days", price: "5,999" },
    "Educational Tour": { duration: "1 Day", price: "2,999" },
    "Village Tourism": { duration: "2 Days", price: "4,499" },
    "Rainforest Adventure": { duration: "2 Days", price: "5,499" },
    "Historical Tour": { duration: "2 Days", price: "4,999" }
  };

  // Phone numbers
  const phoneNumbers = [
    { number: "+919028803309", display: "+91 9028803309" },
    { number: "+919146385636", display: "+91 9146385636" }
  ];

  const openContactModal = (type) => {
    setModalType(type);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setModalType('');
  };

  const makeCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
    closeContactModal();
  };

  const openWhatsApp = (phoneNumber) => {
    const message = `Hello! I'm interested in ${modalType === 'book' ? 'booking a tour package' : modalType === 'customize' ? 'customizing a trip' : 'getting more information'} for ${place.name}. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeContactModal();
  };

  // Get modal title based on type
  const getModalTitle = () => {
    switch (modalType) {
      case 'book':
        return 'Book Your Tour';
      case 'customize':
        return 'Customize Your Trip';
      case 'call':
        return 'Call for Details';
      default:
        return 'Contact Us';
    }
  };

  // Get modal description based on type
  const getModalDescription = () => {
    switch (modalType) {
      case 'book':
        return 'Choose your preferred contact method to book this amazing tour package:';
      case 'customize':
        return 'Let us create your perfect itinerary. Contact us to customize your trip:';
      case 'call':
        return 'Get detailed information about this destination. Contact us:';
      default:
        return 'Choose your preferred contact method:';
    }
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">{place.overview}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Best Time to Visit</h3>
                <p className="text-gray-700">{place.bestSeason}</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Climate</h3>
                <p className="text-gray-700">{place.climate}</p>
              </div>
            </div>

            {place.howToReach && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How to Reach</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {place.howToReach.air && (
                    <div>
                      <h4 className="font-semibold mb-2">By Air</h4>
                      <p className="text-gray-700 text-sm">{place.howToReach.air}</p>
                    </div>
                  )}
                  {place.howToReach.rail && (
                    <div>
                      <h4 className="font-semibold mb-2">By Rail</h4>
                      <p className="text-gray-700 text-sm">{place.howToReach.rail}</p>
                    </div>
                  )}
                  {place.howToReach.road && (
                    <div>
                      <h4 className="font-semibold mb-2">By Road</h4>
                      <p className="text-gray-700 text-sm">{place.howToReach.road}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'attractions':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Key Attractions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {place.keyAttractions.map((attraction, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition duration-300">
                  <h4 className="text-xl font-semibold mb-3 text-emerald-700">{attraction.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Top Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.topActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cuisine':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Local Cuisine</h3>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg">{place.localCuisine}</p>
            </div>
          </div>
        );

      case 'culture':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Festivals & Culture</h3>
            <div className="bg-purple-50 p-6 rounded-lg">
              {Array.isArray(place.festivalsCulture) ? (
                <ul className="space-y-3">
                  {place.festivalsCulture.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed">{place.festivalsCulture}</p>
              )}
            </div>
          </div>
        );

      case 'tips':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Travel Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.travelTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                  <span className="text-blue-500 mt-1">•</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>

            {place.nearbyAttractions && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Nearby Attractions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {place.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <span className="text-emerald-500">•</span>
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead 
        title={`${place.name} Kerala - Complete Travel Guide | Omkar Tour and Travels`}
        description={`Visit ${place.name} - ${place.desc}. Book ${place.tours}+ tour packages starting from ₹4,999. Best time to visit: ${place.bestSeason}`}
        keywords={`${place.name}, ${place.name} Kerala, ${place.name} tour packages, ${place.name} tourism`}
      />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-emerald-500/30 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{getModalTitle()}</h3>
              <button 
                onClick={closeContactModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              {getModalDescription()}
            </p>
            
            <div className="space-y-4">
              {phoneNumbers.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-400 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-800">{item.display}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => makeCall(item.number)}
                        className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openWhatsApp(item.number)}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Available on Call & WhatsApp
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">
                We'll help you plan your perfect {place.name} experience
              </p>
              <button
                onClick={closeContactModal}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Place Header */}
      <section className="relative h-96 bg-gray-900">
        <img
          src={place.images[selectedImage]}
          alt={`${place.name} - Kerala Tourism`}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/places"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{place.name}</h1>
            <p className="text-xl max-w-3xl">{place.desc}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="bg-white/20 px-3 py-1 rounded-full">Rating: {place.rating}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Tours: {place.tours}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Distance: {place.distance}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Place Details */}
      <section className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            {place.images && place.images.length > 1 && (
              <div className="bg-white shadow-lg p-6 mb-8">
                <div className="flex flex-col space-y-4">
                  {/* Main Image */}
                  <div className="overflow-hidden">
                    <img
                      src={place.images[selectedImage]}
                      alt={`${place.name} view ${selectedImage + 1}`}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {place.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition duration-200 ${
                          selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${place.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto -mb-px">
                  {['overview', 'attractions', 'activities', 'cuisine', 'culture', 'tips'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-shrink-0 px-6 py-4 border-b-2 font-medium text-sm transition duration-200 ${
                        activeTab === tab
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Sidebar - Packages */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-center">Available Tour Packages</h3>
              <div className="space-y-4 mb-6">
                {place.packages.map((pkg, index) => (
                  <div key={index} className="border border-gray-200 p-4 hover:border-emerald-500 transition duration-300">
                    <h4 className="font-semibold text-gray-800">{pkg}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">{packageData[pkg]?.duration || "Custom"}</span>
                      <span className="text-emerald-600 font-bold">₹{packageData[pkg]?.price || "Custom"}</span>
                    </div>
                    <button
                      onClick={() => openContactModal('book')}
                      className="w-full bg-emerald-500 text-white py-2 font-semibold hover:bg-emerald-600 transition duration-300 flex items-center justify-center mt-3 text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-3">
                <button
                  onClick={() => openContactModal('customize')}
                  className="w-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
                >
                  Customize Your Trip
                </button>
                <button
                  onClick={() => openContactModal('call')}
                  className="w-full bg-emerald-500 text-white py-3 font-semibold hover:bg-emerald-600 transition duration-300 flex items-center justify-center"
                >
                  Call for Details
                </button>
              </div>

              {/* Quick Facts */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-emerald-400 mr-3"></span>
                  Expert Local Guides
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-emerald-400 mr-3"></span>
                  Best Price Guarantee
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-emerald-400 mr-3"></span>
                  24/7 Customer Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SinglePlacePage;