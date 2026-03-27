import React, { useState } from "react";
import { Link } from 'react-router-dom';

const PopularPlaces = ({ id = "places" }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Complete places data with all 24 destinations and correct images
  const allPlaces = [
     {
      id: "munnar",
      name: "MUNNAR",
      desc: "Arguably the best hill station in South India with tea-clad hill tops and valleys.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.8",
      tours: "12",
      highlights: ["Tea Plantations", "Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Anamudi Peak"],
      bestSeason: "October to March",
      distance: "110 km from Kochi",
      packages: ["Munnar Tea Plantations Tour", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      longDescription: "Munnar is a picturesque hill station in Kerala's Idukki district, celebrated for its sprawling tea plantations, mist-covered mountains, pleasant climate, and colonial heritage. It was once the summer resort of the British government and remains a top escape for nature lovers and adventure seekers.",
      climate: "Cool and pleasant throughout the year, with temperatures ranging from 5°C to 25°C"
    },
    {
      id: "alleppey",
      name: "ALLEPPEY",
      desc: "The rare water world aptly called Venice of the East with beautiful green paddy pastures.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/alleppey_o4rtdm.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/alleppey_o4rtdm.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330511/Allappy_3_ktn290.jpg"
      ],
      rating: "4.9",
      tours: "8",
      highlights: ["Houseboat Cruise", "Backwaters", "Alleppey Beach", "Vembanad Lake", "Punnamada Lake"],
      bestSeason: "September to March",
      distance: "75 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      longDescription: "Alleppey, also known as Alappuzha, is a charming coastal town in Kerala famous for its serene backwaters, sprawling canals, lagoons, and lush green paddy fields. Known as the 'Venice of the East', it offers unmatched houseboat cruise experiences.",
      climate: "Tropical climate with moderate temperatures ranging from 22°C to 35°C"
    },
    {
      id: "kochi",
      name: "KOCHI",
      desc: "The commercial capital of Kerala blending Portuguese, Dutch, and British colonial influences.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490476/premium_photo-1697729597066-7b3d09b6dab7_oxwkpb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg"
      ],
      rating: "4.5",
      tours: "7",
      highlights: ["Fort Kochi", "Chinese Fishing Nets", "Jewish Synagogue", "Kathakali Dance", "Marine Drive"],
      bestSeason: "Year Round",
      distance: "0 km (Starting Point)",
      packages: ["Kerala Cultural Heritage", "Complete Kerala Experience"],
      longDescription: "Kochi, also known as Cochin, is a vibrant port city on Kerala's southwest coast, renowned for its unique blend of colonial history, diverse cultures, and natural beauty. Nicknamed the 'Queen of the Arabian Sea'.",
      climate: "Tropical climate with moderate temperatures year-round"
    },
    {
      id: "wayanad",
      name: "WAYANAD",
      desc: "Mystical wilderness and tribal heritage in the northern hills of Kerala.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/wayanad_wj1ce1.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/wayanad_wj1ce1.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.7",
      tours: "9",
      highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak", "Wayanad Wildlife Sanctuary", "Pookode Lake"],
      bestSeason: "October to May",
      distance: "250 km from Kochi",
      packages: ["Wayanad Adventure Tour", "Complete Kerala Experience"],
      longDescription: "Wayanad is a beautiful hill district in northern Kerala, renowned for its lush green forests, misty mountains, spice plantations, waterfalls, and rich tribal culture. Nestled within the Western Ghats.",
      climate: "Pleasant climate with temperatures ranging from 17°C to 30°C"
    },
    {
      id: "thekkady",
      name: "THEKKADY",
      desc: "Home to Periyar Wildlife Sanctuary, offering thrilling jungle experiences and spice plantations.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
      ],
      rating: "4.6",
      tours: "9",
      highlights: ["Periyar Wildlife Sanctuary", "Spice Plantations", "Bamboo Rafting", "Elephant Ride", "Boat Cruise"],
      bestSeason: "September to May",
      distance: "110 km from Kochi",
      packages: ["Kerala Wildlife Adventure", "Complete Kerala Experience", "Munnar Tea Plantations Tour"],
      longDescription: "Thekkady is home to the Periyar Wildlife Sanctuary, one of India's most fascinating natural wildlife reserves. Spread across 777 sq km, known for dense evergreen forests and diverse wildlife.",
      climate: "Pleasant climate with temperatures ranging from 15°C to 30°C"
    },
    {
      id: "kumarakom",
      name: "KUMARAKOM",
      desc: "A picturesque backwater destination with luxurious resorts and serene Vembanad Lake views.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumarakom-Kumarakom-Bird-Sanctuary-2_tksq4a.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumarakom-Kumarakom-Bird-Sanctuary-2_tksq4a.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759490668/Kumarkom_f7plnd.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg"
      ],
      rating: "4.8",
      tours: "4",
      highlights: ["Vembanad Lake", "Bird Sanctuary", "Luxury Resorts", "Houseboat Stays", "Backwaters"],
      bestSeason: "November to February",
      distance: "65 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Luxury Kerala Experience"],
      longDescription: "Kumarakom is a peaceful village situated on the banks of Vembanad Lake, Kerala's largest freshwater lake. Known for its tranquil backwaters, lush greenery, and bird sanctuary.",
      climate: "Tropical climate with moderate temperatures"
    },
    {
      id: "kovalam",
      name: "KOVALAM",
      desc: "Experience beach life with friendly tides, sun ups and sun downs - the best beach to unwind.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kovalam_tkrqfh.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Kovalam_tkrqfh.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-2_vutkfm.jpg"
      ],
      rating: "4.7",
      tours: "6",
      highlights: ["Lighthouse Beach", "Hawa Beach", "Water Sports", "Ayurvedic Massage", "Sunset Views"],
      bestSeason: "October to March",
      distance: "200 km from Kochi",
      packages: ["Kerala Backwaters & Beaches", "Complete Kerala Experience", "Kerala Honeymoon Special"],
      longDescription: "Kovalam is a picturesque coastal town near Thiruvananthapuram, famous for its crescent-shaped beaches lined with palm trees and vibrant cultural life. Known as the 'Grove of Coconut Trees'.",
      climate: "Tropical coastal climate with temperatures between 24°C to 32°C"
    },
    {
      id: "vagamon",
      name: "VAGAMON",
      desc: "The Queen of Mist and Tranquility with rolling green meadows and pine forests.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193267/Vagamon_xgcm4m.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193267/Vagamon_xgcm4m.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.4",
      tours: "3",
      highlights: ["Pine Forest", "Vagamon Meadows", "Kurisumala Church", "Paragliding", "Thangal Para"],
      bestSeason: "September to March",
      distance: "100 km from Kochi",
      packages: ["Vagamon Hill Retreat", "Adventure Kerala Tour"],
      longDescription: "Vagamon is a tranquil hill station in Idukki district, renowned for rolling green meadows, dense pine forests, tea gardens, and cool climate. Often called the 'Queen of the Mist'.",
      climate: "Cool climate with temperatures ranging from 10°C to 25°C"
    },
    {
      id: "athirappilly",
      name: "ATHIRAPPILLY",
      desc: "The Niagara of South India - Kerala's largest waterfall in lush tropical forests.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Athirappilly_Waterfalls__pnmbmo.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Athirappilly_Waterfalls__pnmbmo.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
      ],
      rating: "4.6",
      tours: "5",
      highlights: ["Athirappilly Waterfalls", "Vazhachal Waterfalls", "Butterfly Garden", "Sholayar Dam", "Wildlife Spotting"],
      bestSeason: "October to May",
      distance: "78 km from Kochi",
      packages: ["Waterfall Adventure Tour", "Nature & Wildlife Kerala"],
      longDescription: "Athirappilly Waterfalls is the largest waterfall in Kerala, standing at about 80 feet high on the Chalakudy River. A breathtaking natural spectacle often called the 'Niagara of South India'.",
      climate: "Tropical climate with moderate temperatures"
    },
    {
      id: "varkala",
      name: "VARKALA",
      desc: "Coastal cliffs and spiritual serenity with dramatic red sandstone cliffs overlooking the Arabian Sea.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/varkala_1_zcdenb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193266/varkala_1_zcdenb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_2_jzvrhh.jpg"
      ],
      rating: "4.5",
      tours: "4",
      highlights: ["Varkala Beach", "Janardhana Swamy Temple", "Varkala Cliff", "Kappil Lake", "Ayurvedic Treatments"],
      bestSeason: "October to March",
      distance: "180 km from Kochi",
      packages: ["Beach & Culture Tour", "Kerala Coastal Experience"],
      longDescription: "Varkala is a charming coastal town known for its dramatic red sandstone cliffs overlooking the Arabian Sea. Combines beautiful beaches with spiritual sites for relaxation and adventure.",
      climate: "Tropical coastal climate"
    },
    {
      id: "palakkad",
      name: "PALAKKAD",
      desc: "The Gateway of Kerala's Natural and Cultural Heritage with vast paddy fields and ancient forts.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Palakkad_kava54.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Palakkad_kava54.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.3",
      tours: "5",
      highlights: ["Malampuzha Dam", "Palakkad Fort", "Parambikulam Sanctuary", "Silent Valley", "Nelliyampathy Hills"],
      bestSeason: "November to February",
      distance: "100 km from Kochi",
      packages: ["Nature & Heritage Tour", "Complete Kerala Experience"],
      longDescription: "Palakkad, known as the 'Granary of Kerala', combines lush green landscapes, ancient forts, hill stations, and rich biodiversity at the foothills of the Western Ghats.",
      climate: "Pleasant climate with moderate temperatures"
    },
    {
      id: "bekal",
      name: "BEKAL",
      desc: "Historic Fort and Seaside Serenity - Kerala's largest and best-preserved fort by the Arabian Sea.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/bekal3_nq1ce8.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/bekal3_nq1ce8.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
      ],
      rating: "4.4",
      tours: "3",
      highlights: ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Kodi Cliff", "Theyyam Performances"],
      bestSeason: "October to March",
      distance: "350 km from Kochi",
      packages: ["Historic Kerala Tour", "Coastal Heritage Experience"],
      longDescription: "Bekal is best known for its majestic Bekal Fort - the largest and best-preserved fort in Kerala. The fort rises dramatically by the Arabian Sea, showcasing military architecture and scenic beauty.",
      climate: "Coastal climate with pleasant temperatures"
    },
    {
      id: "thrissur",
      name: "THRISSUR",
      desc: "Kerala's Cultural Capital rich in heritage, festivals, temples, and natural beauty.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488067/padmanabha-swamy2_bgsb1c.png"
      ],
      rating: "4.5",
      tours: "6",
      highlights: ["Vadakkunnathan Temple", "Athirappilly Waterfalls", "Guruvayur Temple", "Thrissur Pooram", "Kerala Kalamandalam"],
      bestSeason: "October to March",
      distance: "50 km from Kochi",
      packages: ["Cultural Kerala Tour", "Temple Trail Experience"],
      longDescription: "Thrissur, known as the cultural capital of Kerala, is rich in heritage, festivals, temples, and natural beauty. Famous for its grand religious celebrations and classical arts.",
      climate: "Tropical climate with moderate temperatures"
    },
    {
      id: "munroe-island",
      name: "MUNROE ISLAND",
      desc: "Tranquil Backwater Gem - cluster of eight small islands at the confluence of Ashtamudi Lake.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munroe-island-_j6vwln.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munroe-island-_j6vwln.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
      ],
      rating: "4.3",
      tours: "2",
      highlights: ["Backwater Canals", "Coir Making Units", "Village Life", "Dutch Church", "Bird Watching"],
      bestSeason: "October to February",
      distance: "25 km from Kollam",
      packages: ["Backwater Village Experience", "Eco-Tourism Kerala"],
      longDescription: "Munroe Island is a cluster of eight small inland islands at the confluence of Ashtamudi Lake and Kallada River. A picturesque blend of peaceful backwaters, lush greenery, and traditional village life.",
      climate: "Tropical climate with high humidity"
    },
    {
      id: "poovar",
      name: "POOVAR",
      desc: "Where River, Lake, and Sea Meet - golden sandy beaches and tranquil backwaters.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Poovar_gvqskq.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Poovar_gvqskq.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_2_jzvrhh.jpg"
      ],
      rating: "4.4",
      tours: "3",
      highlights: ["Poovar Beach", "Backwaters", "Mangrove Forests", "Poovar Island", "Sunset Cruises"],
      bestSeason: "August to March",
      distance: "35 km from Trivandrum",
      packages: ["Beach & Backwater Tour", "Kerala Coastal Retreat"],
      longDescription: "Poovar is a picturesque fishing village featuring the confluence of Arabian Sea, Neyyar River, and backwaters. Known as the 'Stream of Flowers', it offers golden sandy beaches and mangrove forests.",
      climate: "Tropical coastal climate"
    },
    {
      id: "thiruvananthapuram",
      name: "TRIVANDRUM",
      desc: "Kerala's Capital of Culture and Nature blending ancient traditions with modern infrastructure.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Thiruvananthapuram_Trivandrum_sgwysg.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/Thiruvananthapuram_Trivandrum_sgwysg.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488067/padmanabha-swamy2_bgsb1c.png"
      ],
      rating: "4.5",
      tours: "8",
      highlights: ["Padmanabhaswamy Temple", "Napier Museum", "Kovalam Beach", "Neyyar Sanctuary", "Agasthyarkoodam"],
      bestSeason: "October to March",
      distance: "200 km from Kochi",
      packages: ["Capital City Tour", "Cultural Heritage Experience"],
      longDescription: "Thiruvananthapuram, commonly known as Trivandrum, is Kerala's bustling capital city blending ancient traditions, modern infrastructure, and rich cultural heritage. Gateway to southern Kerala attractions.",
      climate: "Tropical climate with coastal influence"
    },
    {
      id: "kannur",
      name: "KANNUR",
      desc: "The Land of Beaches, Forts, and Culture with pristine beaches and Theyyam festivals.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/Kannur_jy8wax.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/Kannur_jy8wax.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_1_pq79i9.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488545/Samudra-Beach_2_jzvrhh.jpg"
      ],
      rating: "4.4",
      tours: "4",
      highlights: ["St. Angelo Fort", "Muzhappilangad Beach", "Arakkal Museum", "Theyyam Festival", "Kavvayi Backwaters"],
      bestSeason: "October to March",
      distance: "250 km from Kochi",
      packages: ["Northern Kerala Tour", "Cultural & Beach Experience"],
      longDescription: "Kannur is renowned for its pristine beaches, historic forts, rich cultural festivals like Theyyam, and lush mangrove forests. Offers a blend of natural beauty and historical significance.",
      climate: "Tropical coastal climate"
    },
    {
      id: "kollam",
      name: "KOLLAM",
      desc: "Gateway to Kerala's Backwaters and Heritage with historic sites and Ashtamudi Lake.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/-kollam-_bsqsgx.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193261/-kollam-_bsqsgx.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
      ],
      rating: "4.3",
      tours: "5",
      highlights: ["Ashtamudi Lake", "Jatayu Earth Center", "Thangassery Lighthouse", "Palaruvi Waterfalls", "Thenmala Eco-tourism"],
      bestSeason: "October to March",
      distance: "150 km from Kochi",
      packages: ["Backwater Gateway Tour", "Eco-Tourism Experience"],
      longDescription: "Kollam, historically known as Quilon, is recognized for its role in ancient spice trade. Blessed with intricate backwaters like Ashtamudi Lake, it offers natural beauty and historic sites.",
      climate: "Tropical coastal climate"
    },
    {
      id: "idukki",
      name: "IDUKKI",
      desc: "Kerala's Mountainous Spice Garden and Wildlife Haven with highest peaks and dense forests.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Idukki_qn2nbg.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193263/Idukki_qn2nbg.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.6",
      tours: "7",
      highlights: ["Idukki Arch Dam", "Periyar Sanctuary", "Meesapulimala", "Anamudi Peak", "Spice Plantations"],
      bestSeason: "October to May",
      distance: "120 km from Kochi",
      packages: ["Mountain Adventure Tour", "Wildlife & Spice Experience"],
      longDescription: "Idukki is renowned for its mountainous terrain, dense forests, spice plantations, and serene hill stations. Part of Western Ghats with some of the highest peaks in South India.",
      climate: "Cool mountain climate"
    },
    {
      id: "chinnar",
      name: "CHINNAR",
      desc: "Kerala's Unique Dry Forest Reserve with endangered species and diverse wildlife.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Chinnar_Wildlife_Sanctuary_k2e4bb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Chinnar_Wildlife_Sanctuary_k2e4bb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487813/periyar_lake_1_flz8vu.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487815/periyar_lake_3_ojjgtd.jpg"
      ],
      rating: "4.2",
      tours: "2",
      highlights: ["Grizzled Giant Squirrel", "Thoovanam Waterfalls", "Wildlife Safaris", "Bird Watching", "Trekking"],
      bestSeason: "October to November",
      distance: "150 km from Kochi",
      packages: ["Wildlife Sanctuary Tour", "Nature & Adventure"],
      longDescription: "Chinnar Wildlife Sanctuary features dry thorn scrub forests in the rain shadow region of Western Ghats. Home to endangered species and unique rehabilitation center for Indian star tortoise.",
      climate: "Dry forest climate"
    },
    {
      id: "kalamassery",
      name: "KALAMASSERY",
      desc: "Industrial and Educational Hub of Kochi with urban infrastructure and academic excellence.",
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
      longDescription: "Kalamassery is a prominent industrial and residential locality in Kochi metropolitan area, known for its blend of urban infrastructure and academic excellence. Hosts major companies and institutions.",
      climate: "Urban tropical climate"
    },
    {
      id: "kumbalangi",
      name: "KUMBALANGI",
      desc: "India's First Model Fishing Village and Eco-Tourism Haven with sustainable tourism.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumbalangi-_vgkqik.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/Kumbalangi-_vgkqik.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_2_sfyek2.jpg"
      ],
      rating: "4.3",
      tours: "2",
      highlights: ["Chinese Fishing Nets", "Mangrove Forests", "Sea Sparkle", "Crab Catching", "Village Life"],
      bestSeason: "November to February",
      distance: "15 km from Kochi",
      packages: ["Village Tourism", "Eco-Tourism Experience"],
      longDescription: "Kumbalangi is India's first model eco-tourism village, showcasing sustainable tourism alongside traditional fishing lifestyles. Surrounded by tranquil backwaters and lush mangrove forests.",
      climate: "Coastal tropical climate"
    },
    {
      id: "silent-valley",
      name: "SILENT VALLEY",
      desc: "The Last Undisturbed Rainforest of Kerala with pristine tropical evergreen forests.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/silentvalley-_chdrlb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/silentvalley-_chdrlb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.5",
      tours: "2",
      highlights: ["Lion-tailed Macaque", "Watchtower", "Kunthi River", "Evergreen Forests", "Wildlife Safari"],
      bestSeason: "December to April",
      distance: "75 km from Palakkad",
      packages: ["Rainforest Adventure", "Wildlife Conservation Tour"],
      longDescription: "Silent Valley National Park is renowned for its pristine tropical evergreen rainforest, rich biodiversity, and as one of the last substantial tracts of virgin rainforest in Western Ghats.",
      climate: "Rainforest climate"
    },
    {
      id: "edakkal-caves",
      name: "EDAKKAL CAVES",
      desc: "Ancient Rock Art and Prehistoric Heritage with carvings dating back over 6,000 years.",
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Edakkal_Caves_scfq2n.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/Edakkal_Caves_scfq2n.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_1_jrixag.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759476405/tea_2_rmqxfj.jpg"
      ],
      rating: "4.4",
      tours: "3",
      highlights: ["Prehistoric Carvings", "Rock Shelters", "Ancient Petroglyphs", "Trekking", "Historical Exploration"],
      bestSeason: "October to May",
      distance: "10 km from Sulthan Bathery",
      packages: ["Historical Tour", "Archaeological Experience"],
      longDescription: "Edakkal Caves are natural rock shelters with pictorial writings and carvings dating back over 6,000 years to Neolithic period. Provide earliest evidences of human civilization in Kerala.",
      climate: "Hill station climate"
    }
  ];

  const placesToShow = showAll ? allPlaces : allPlaces.slice(0, 6);

  return (
    <section id="places" className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-6">
      <div className="text-center mb-5 md:mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
          Top Destinations
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-1 md:mb-6 tracking-wider uppercase">
          {showAll ? 'All Kerala Destinations' : 'Most Popular Places'}
        </h2>
        <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
          Kerala is a rare place adorned with beautiful landscapes, hill stations, water bodies and everything a traveler would love to explore.
        </p>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {placesToShow.map((place) => (
          <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <span className="text-amber-500 text-sm">⭐</span>
                <span className="text-gray-800 font-semibold text-sm">{place.rating}</span>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-light text-gray-800 mb-2">{place.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{place.desc}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-emerald-600 font-semibold text-sm">
                  {place.tours} tours available
                </span>
                <Link 
                  to={`/place/${place.id}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
                >
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All / Show Less Button */}
      {allPlaces.length > 6 && (
        <div className="text-center mt-8 md:mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            {showAll ? 'Show Less' : `Explore All ${allPlaces.length} Destinations`}
            <svg 
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Destination Categories */}
      <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg md:rounded-xl p-3 md:p-6 border border-emerald-100">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
            <span className="text-white text-sm md:text-lg">🏔️</span>
          </div>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">Hill Stations</h3>
          <p className="text-xs md:text-sm text-gray-600">Munnar, Wayanad, Vagamon</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg md:rounded-xl p-3 md:p-6 border border-blue-100">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
            <span className="text-white text-sm md:text-lg">🚤</span>
          </div>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">Backwaters</h3>
          <p className="text-xs md:text-sm text-gray-600">Alleppey, Kumarakom, Kumbalangi</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg md:rounded-xl p-3 md:p-6 border border-amber-100">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
            <span className="text-white text-sm md:text-lg">🏖️</span>
          </div>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">Beaches</h3>
          <p className="text-xs md:text-sm text-gray-600">Kovalam, Varkala, Kannur</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg md:rounded-xl p-3 md:p-6 border border-purple-100">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
            <span className="text-white text-sm md:text-lg">🕌</span>
          </div>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">Culture</h3>
          <p className="text-xs md:text-sm text-gray-600">Kochi, Thrissur, Trivandrum</p>
        </div>
      </div>


      {/* Stats Section */}
  
    </section>
  );
};

export default PopularPlaces;