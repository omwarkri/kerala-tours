import React from "react";
// import { Link } from 'react-router-dom';
import SEOHead from "../components/common/SEOHead";
import Footer from "../components/common/Footer";
import TourPackageCard from "../components/packages/TourPackageCard";
// import { getAllPackages } from "../data/packagesData";

const AllPackagesPage = () => {
  const sampleReviews = [
    {
      id: 1,
      name: "Pranit",
      rating: 5,
      date: "2025-04-15",
      comment: "Amazing experience! The houseboat stay was absolutely magical. The food was delicious and the staff was very helpful. Will definitely recommend to friends and family.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh",
      rating: 4,
      date: "2024-12-10",
      comment: "Great package overall. The backwater cruise was peaceful and scenic. Only suggestion would be to include more meal options. Otherwise, excellent value for money.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anita",
      rating: 5,
      date: "2024-12-08",
      comment: "Perfect family vacation! The kids loved the boat ride and we enjoyed the serene environment. The tour guide was knowledgeable and made our trip memorable.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Michael",
      rating: 4,
      date: "2024-12-05",
      comment: "Beautiful locations and well-organized itinerary. The accommodation was comfortable and the transportation was punctual. Good experience overall.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Sneha",
      rating: 5,
      date: "2024-12-01",
      comment: "Absolutely loved every moment! The sunset views were breathtaking and the cultural experiences were authentic. Omkar Tours made everything so smooth and hassle-free.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Vikram",
      rating: 4,
      date: "2024-11-28",
      comment: "Value for money package. The destinations were well-chosen and the timing was perfect. The driver was professional and the vehicle was comfortable.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Direct package data (same structure as AllPackagesPage)
  const allPackages = [
    {
      id: "kerala-classic",
      name: "Kerala Classic Tour",
      duration: "04 Nights / 05 Days",
      destination: "Kochi, Munnar, Thekkady, Alleppey",
      places: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
      bestSeason: "Sep - May",
      price: 18999,
      originalPrice: 22999,
      discount: "17% Off",
      rating: 4.7,
      reviews: 95,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg"
      ],
      description: "Classic Kerala experience covering hill stations, wildlife, and backwaters.",
      highlights: [
        "Day 1: Arrival in Kochi and drive to Munnar, stopping on the way to visit waterfalls.",
        "Day 2: Visit Munnar's verdant tea hills, wander Blossom hydel Park, and take in the stunning vistas from Top Station.",
        "Day 3: Head to Thekkady – explore fragrant spice plantations and enjoy a traditional cultural show",
        "Day 4: Relax with a houseboat cruise through Alleppey's backwaters, complete with authentic Kerala meals",
        "Day 5: Departure from Kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Arrival & Drive to Munnar", 
          description: "Arrive in Kochi and begin your drive to Munnar, a scenic hill station known for its tea gardens. On the way, take a break to visit the beautiful Cheeyappara and Valara waterfalls, surrounded by lush greenery." 
        },
        { 
          day: "Day 2", 
          title: "Munnar Exploration", 
          description: "Visit the Rose Garden and Tea Museum to learn about tea and enjoy the beautiful flowers. Explore the Botanical Garden and stop by Mattupatti Dam and Echo Point for great views. Discover Eravikulam National Park, home to rare animals like the Nilgiri Tahr. End your day relaxing at Hydel Park surrounded by tea gardens." 
        },
        { 
          day: "Day 3", 
          title: "Thekkady Adventure", 
          description: "Travel to Thekkady and embark on a wildlife boat safari in Periyar National Park, spotting elephants, deer, and birds on the lake. Visit a spice plantation to see and learn about the local spices. Enjoy a cultural show that showcases Kerala's traditional arts. For thrill seekers, try an off-road jeep safari and experience the excitement of a zipline ride through the forest. This day is a perfect mix of nature, culture, and adventure." 
        },
        { 
          day: "Day 4", 
          title: "Alleppey Backwaters", 
          description: "Enjoy a houseboat cruise in Alleppey, gliding through the calm backwaters surrounded by lush greenery. Savor traditional Kerala meals served fresh on board during the cruise. Explore scenic spots like Alleppey Beach and beautiful local gardens. Relax and experience the peaceful village life along the waterways." 
        },
        { 
          day: "Day 5", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "essence-of-kerala",
      name: "Essence of Kerala Tour",
      duration: "05 Nights / 06 Days",
      destination: "Kochi, Munnar, Thekkady, Alleppey",
      places: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
      bestSeason: "Sep - May",
      price: 21999,
      originalPrice: 25999,
      discount: "15% Off",
      rating: 4.8,
      reviews: 120,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg"
      ],
      description: "Experience the true essence of Kerala through its diverse landscapes and culture.",
      highlights: [
        "Day 1: Arrive in Kochi and proceed to Munnar by road, with stops along the way to admire the scenic waterfalls.",
        "Day 2: Full day in Munnar – discover the Tea Museum, cruising Mattupetty Dam, and the echo-filled Echo Point",
        "Day 3: Transfer to Thekkady and enjoy a wildlife boat safari at Periyar Lake, spotting elephants, deer, and birds.",
        "Day 4: Transfer to Alleppey and check in to your houseboat for a relaxing backwater cruise",
        "Day 5: Drive to Kochi - Visit Fort Cochin, admire the iconic Chinese Fishing Nets, and explore the lively Jew Town market.",
        "Day 6: Departure from Kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Arrival & Munnar Transfer", 
          description: "Arrive in Kochi and drive to Munnar, stopping to admire the scenic Cheeyappara and Valara waterfalls along the way. The journey takes about 4 hours through beautiful hills and tea plantations." 
        },
        { 
          day: "Day 2", 
          title: "Munnar Sightseeing", 
          description: "Munnar offers a variety of attractions: a vibrant rose garden, the informative Tea Museum, a honey bee hive, and a lush botanical garden. You can also visit the Matupatti Dam, Echo Point, and the rich Erivikulam National Park, along with scenic tea gardens and the Blossom Hydel Park." 
        },
        { 
          day: "Day 3", 
          title: "Thekkady Wildlife", 
          description: "Transfer to Thekkady and enjoy a thrilling wildlife boat safari at Periyar Lake. Visit the fragrant spice plantations and learn about aromatic spices. Experience an exciting off-road jeep safari and an adventurous zipline ride. End the day with a traditional cultural show showcasing Kerala's heritage." 
        },
        { 
          day: "Day 4", 
          title: "Alleppey Backwaters", 
          description: "Enjoy a relaxing houseboat cruise in Alleppey with traditional Kerala meals prepared on board. Experience the tranquil backwaters and scenic village views. Optionally visit Alleppey beach or explore nearby gardens for a peaceful retreat." 
        },
        { 
          day: "Day 5", 
          title: "Kochi Heritage", 
          description: "Drive to Kochi and explore Fort Kochi's colonial charm with visits to the Dutch Palace and historic St. Francis Church. Discover the vibrant Jew Town market and watch the iconic Chinese Fishing Nets in action. End the day with a relaxing walk along Marine Drive." 
        },
        { 
          day: "Day 6", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "heart-of-kerala",
      name: "Heart of Kerala Tour",
      duration: "06 Nights / 07 Days",
      destination: "Kochi, Munnar, Thekkady, Alleppey",
      places: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
      bestSeason: "Sep - May",
      price: 24999,
      originalPrice: 28999,
      discount: "14% Off",
      rating: 4.8,
      reviews: 150,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759487637/backwater_1_b007co.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg"
      ],
      description: "Comprehensive Kerala tour covering cultural, natural, and backwater experiences.",
      highlights: [
        "Day 1: After arriving in Kochi and settling in, you can visit Fort Kochi, Chinese Fishing Nets, and enjoy the Kathakali show in the evening.",
        "Day 2: Explore Kochi's charm – Mattancherry Palace (Dutch Palace), Jew Town, St. Francis Church, Marine Drive",
        "Day 3: Journey to Munnar with stops at scenic waterfalls en route",
        "Day 4: Full day in Munnar – discover the Tea Museum, cruising Mattupetty Dam, and the echo-filled Echo Point",
        "Day 5: Head to Thekkady – explore fragrant spice plantations and enjoy a traditional cultural show",
        "Day 6: Relax with a houseboat cruise through Alleppey's backwaters, complete with authentic Kerala meals",
        "Day 7: Departure from Kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Kochi Arrival & Cultural Experience", 
          description: "After arriving in Kochi and settling in, explore the historic Fort Kochi area with its colonial architecture and quaint streets. Visit the iconic Chinese Fishing Nets along the waterfront for an unforgettable photo opportunity. Spend the evening watching a traditional Kathakali dance performance, immersing yourself in Kerala's rich cultural heritage. This plan offers a perfect blend of sightseeing and cultural experience to start your trip." 
        },
        { 
          day: "Day 2", 
          title: "Kochi Heritage Tour", 
          description: "Discover Kochi's heritage by visiting Mattancherry Palace, also known as the Dutch Palace, famous for its Kerala murals and traditional architecture. Wander through Jew Town, exploring vibrant markets and the Paradesi Synagogue. Visit St. Francis Church, India's oldest European church, rich in history. End the day with a relaxing stroll along Marine Drive, enjoying scenic backwaters and sunset views." 
        },
        { 
          day: "Day 3", 
          title: "Scenic Drive to Munnar", 
          description: "Drive to Munnar from Kochi, approximately 127 km taking around 3.5 to 4 hours. En route, visit the picturesque Cheeyappara and Valara waterfalls, enjoying the serene cascades and lush greenery before continuing to the cool hill station of Munnar for arrival and overnight stay." 
        },
        { 
          day: "Day 4", 
          title: "Munnar Exploration", 
          description: "Explore Munnar's beautiful attractions starting with the Rose Garden and Tea Museum. Visit the Honey Bee Park and Botanical Garden to experience nature's wonders. Enjoy scenic views at Mattupetty Dam and Echo Point. End the day with a visit to Eravikulam National Park, tea gardens, and Blossom Hydel Park for a perfect blend of nature and tranquility." 
        },
        { 
          day: "Day 5", 
          title: "Thekkady Adventure", 
          description: "Travel to Thekkady and visit a spice plantation to experience the rich aroma and variety of local spices. Enjoy a boat cruise on Periyar Lake to spot wildlife and soak in the tranquil surroundings. Opt for adventurous activities like off-road jeep safari and thrilling zipline rides. End the day with a cultural show showcasing traditional Kerala arts and dance." 
        },
        { 
          day: "Day 6", 
          title: "Alleppey Backwaters", 
          description: "Enjoy a serene houseboat cruise in Alleppey, drifting through the tranquil backwaters. Savor traditional Kerala meals prepared onboard, featuring local delicacies. Experience the peaceful ride while taking in the lush landscapes. Optionally, explore Alleppey beach and gardens during your visit." 
        },
        { 
          day: "Day 7", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay", "Cultural Shows"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "heritage-pathways",
      name: "Heritage Pathways of Kerala",
      duration: "07 Nights / 08 Days",
      destination: "Kochi, Munnar, Thekkady, Kumarakom, Alleppey",
      places: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
      bestSeason: "Sep - May",
      price: 27999,
      originalPrice: 31999,
      discount: "12% Off",
      rating: 4.9,
      reviews: 130,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193262/kochi_wr3gbb.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg"
      ],
      description: "Explore Kerala's rich heritage through temples, palaces, and cultural sites.",
      highlights: [
        "Day 1: After arriving in Kochi and settling in, you can visit Fort Kochi, Chinese Fishing Nets, and enjoy the Kathakali show in the evening.",
        "Day 2: Explore Kochi's charm – Mattancherry Palace (Dutch Palace), Jew Town, St. Francis Church, Marine Drive",
        "Day 3: Set out for Munnar with a scenic stop at Waterfalls.",
        "Day 4: Visit Munnar's verdant tea hills, wander Blossom Park, and take in the stunning vistas from Top Station.",
        "Day 5: Move on to Thekkady to experience a boat safari amidst wildlife along Periyar Lake.",
        "Day 6: Continue to Kumarakom for tranquil backwaters and birdwatching at the sanctuary.",
        "Day 7: Drift along palm-fringed canals on a houseboat from Kumarakom to Alleppey.",
        "Day 8: Complete your travels in Kochi, departing with unforgettable Kerala memories."
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Kochi Cultural Start", 
          description: "After arriving in Kochi and settling in, explore the historic Fort Kochi area with its colonial architecture and quaint streets. Visit the iconic Chinese Fishing Nets along the waterfront for an unforgettable photo opportunity. Spend the evening watching a traditional Kathakali dance performance, immersing yourself in Kerala's rich cultural heritage. This plan offers a perfect blend of sightseeing and cultural experience to start your trip." 
        },
        { 
          day: "Day 2", 
          title: "Kochi Heritage", 
          description: "Discover Kochi's heritage by visiting Mattancherry Palace, also known as the Dutch Palace, famous for its Kerala murals and traditional architecture. Wander through Jew Town, exploring vibrant markets and the Paradesi Synagogue. Visit St. Francis Church, India's oldest European church, rich in history. End the day with a relaxing stroll along Marine Drive, enjoying scenic backwaters and sunset views." 
        },
        { 
          day: "Day 3", 
          title: "Munnar Journey", 
          description: "Drive from Kochi to Munnar, famous for its cool hills and tea gardens. On the way, stop to see Cheeyappara Waterfalls, a beautiful seven-step waterfall close to the road, and Valara Waterfalls, known for its lush green surroundings and scenic views. Spend some time enjoying the natural beauty before continuing to Munnar." 
        },
        { 
          day: "Day 4", 
          title: "Munnar Nature", 
          description: "Explore Munnar's beautiful spots including the Rose Garden and the Tea Museum. Visit the Honey Tea plantation and enjoy nature at the Botanical Garden. Stop by Mattupetty Dam and Echo Point to see stunning views. Don't miss Eravikulam National Park and spend time in Hydel Park surrounded by tea gardens." 
        },
        { 
          day: "Day 5", 
          title: "Thekkady Wildlife", 
          description: "Travel to Thekkady and enjoy a boat safari in the wildlife sanctuary. Visit a spice plantation to learn about local spices and their uses. Experience a cultural show featuring traditional art forms. For adventure, try an off-road jeep safari and zipline ride in the area." 
        },
        { 
          day: "Day 6", 
          title: "Kumarakom Serenity", 
          description: "Travel to Kumarakom and enjoy a peaceful cruise through the backwaters, surrounded by lush greenery and calm waters. Visit the Kumarakom Bird Sanctuary, home to many colorful and rare birds. Explore the natural beauty and relax in this serene part of Kerala." 
        },
        { 
          day: "Day 7", 
          title: "Houseboat Experience", 
          description: "Enjoy a relaxing houseboat cruise from Kumarakom to Alleppey through the serene backwaters. Experience scenic views of villages, paddy fields, and lush greenery. Savor traditional Kerala meals served on board and unwind in the peaceful surroundings as you gently glide along the waterways." 
        },
        { 
          day: "Day 8", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay", "Wildlife Safari"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "grand-kerala",
      name: "Grand Kerala Tour",
      duration: "09 Nights / 10 Days",
      destination: "Thrissur, Munnar, Thekkady, Kovalam, Trivandrum, Alleppey, Kochi",
      places: ["Thrissur", "Munnar", "Thekkady", "Kovalam", "Trivandrum", "Alleppey", "Kochi"],
      bestSeason: "Sep - May",
      price: 38999,
      originalPrice: 44999,
      discount: "13% Off",
      rating: 4.9,
      reviews: 180,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg"
      ],
      description: "The ultimate Kerala experience covering temples, hills, beaches, and backwaters.",
      highlights: [
        "Day 1: Arrive in Thrissur and visit the revered Guruvayurappan Temple, then proceed to Munnar with scenic waterfall stops en route.",
        "Day 2: Full day in Munnar – discover the Tea Museum, cruising Mattupetty Dam, and the echo-filled Echo Point",
        "Day 3: Transfer to Thekkady and enjoy a wildlife boat safari and a visit to the spice plantations.",
        "Day 4: Full day in Thekkady Kathakali and martial arts shows, along with off-road jeep safari and zipline experience.",
        "Day 5: Transfer to Kovalam Beach to unwind, enjoy the serene sunset, and spend a relaxing overnight stay by the sea.",
        "Day 6: Proceed to Trivandrum and visit Padmanabhaswamy Temple & Raja Ravi Varma Palace.",
        "Day 7: Head to Alleppey, stopping en route to Varkala Beach and Ambalappuzha Temple.",
        "Day 8: Enjoy a full day sightseeing at Alleppey Beach and gardens, followed by overnight stay on houseboat.",
        "Day 9: Transfer to Kochi for a full day of sightseeing, exploring top attractions like Fort Kochi, Chinese fishing nets and Marine Drive.",
        "Day 10: Departure from kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Temple & Hills", 
          description: "Arrive in Thrissur and visit the revered Guruvayurappan Temple, which opens at 3:00 AM and hosts several rituals throughout the day. After the spiritual experience, proceed towards Munnar, stopping to admire the scenic Cheeyappara and Valara waterfalls en route. Continue the drive to Munnar and enjoy an overnight stay amidst lush tea plantations and cool mountain air." 
        },
        { 
          day: "Day 2", 
          title: "Munnar Exploration", 
          description: "Spend a full day in Munnar visiting the beautiful Rose Garden and the Tea Museum to learn about tea production. Explore the Honey Tree, Botanical Garden, Mattupetty Dam, Mattupetty Echo Point, and the Eravikulam National Park, home to diverse wildlife. End your day with visits to the scenic tea gardens and Hydel Park for a refreshing nature experience." 
        },
        { 
          day: "Day 3", 
          title: "Thekkady Wildlife", 
          description: "Transfer to Thekkady and enjoy a wildlife boat safari on Periyar Lake, spotting animals in their natural habitats. Visit the spice plantations to explore and learn about Kerala's famous spices such as cardamom, pepper, and cinnamon. End the day soaking in the serene atmosphere and rich natural beauty of Thekkady." 
        },
        { 
          day: "Day 4", 
          title: "Cultural Thekkady", 
          description: "Enjoy a full day in Thekkady witnessing the mesmerizing Kathakali dance shows held in the evening, showcasing epic Hindu mythological stories through intricate costumes and expressive gestures. Experience the ancient martial art Kalaripayattu, featuring dynamic combat techniques and weapon displays. Add adventure with an off-road jeep safari through forests and a thrilling zipline ride for panoramic views of Thekkady's lush landscape." 
        },
        { 
          day: "Day 5", 
          title: "Kovalam Beaches", 
          description: "Transfer to Kovalam Beach to unwind and enjoy the serene sunset. Spend the day exploring the three crescent-shaped beaches—Lighthouse, Hawah, and Samudra—offering sunbathing, swimming, and thrilling water sports like parasailing. Relax with Ayurvedic massages or take a peaceful stroll along the beaches before a relaxing overnight stay." 
        },
        { 
          day: "Day 6", 
          title: "Trivandrum Heritage", 
          description: "Proceed to Trivandrum and visit the magnificent Padmanabhaswamy Temple, a sacred Hindu temple dedicated to Lord Vishnu with over 5000 years of spiritual history. Then explore the Raja Ravi Varma Palace, known for its art and royal heritage, offering insight into Kerala's cultural past." 
        },
        { 
          day: "Day 7", 
          title: "Coastal Journey", 
          description: "Head to Alleppey with en route stops at Varkala Beach, known for its dramatic red cliffs, serene sandy stretches, and spiritual atmosphere. Visit the Ambalappuzha Temple, famous for its traditional Kerala architecture and the sweet palpayasam offering. Continue the journey to Alleppey for an overnight stay." 
        },
        
        { 
          day: "Day 8", 
          title: "Alleppey Experience", 
          description: "Spend the day exploring Alleppey Beach with its long palm-fringed coastline and historic lighthouse. Visit the nearby gardens for a leisurely stroll and enjoy the scenic beauty of the backwaters. End the day with an enchanting overnight stay on a traditional houseboat, cruising through the peaceful canals and lagoons." 
        },
        { 
          day: "Day 9", 
          title: "Kochi Sightseeing", 
          description: "Transfer to Kochi for a full day of sightseeing, exploring Fort Kochi's colonial charm and Dutch Palace's royal heritage. Visit Jew Town and St. Francis Church, the oldest European church in India. Witness the iconic Chinese Fishing Nets and enjoy a scenic walk along Marine Drive. Experience the rich history and vibrant culture of Kochi in one day." 
        },
        { 
          day: "Day 10", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay", "Cultural Shows", "Adventure Activities"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "majestic-madurai",
      name: "Majestic Madurai Tour",
      duration: "05 Nights / 06 Days",
      destination: "Madurai, Rameswaram, Kanyakumari, Trivandrum",
      places: ["Madurai", "Rameswaram", "Kanyakumari", "Trivandrum"],
      bestSeason: "Year Round",
      price: 22999,
      originalPrice: 26999,
      discount: "15% Off",
      rating: 4.7,
      reviews: 110,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg"
      ],
      description: "Explore the cultural and spiritual heart of Tamil Nadu with beach extensions.",
      highlights: [
        "Day 1: Arrive in Madurai at 6:35 PM, transfer to hotel and relax for the evening.",
        "Day 2: Explore Madurai's rich culture - Meenakshi Temple, Thirumalai Nayak Palace, Gandhi Memorial Museum, Alagar Koil Temple, and Thiruparankundram Murugan Temple",
        "Day 3: Transfer to Rameswaram - Pamban Beach, APJ Abdul Kalam Gallery, see Dhanushkodi ruins, visit the India-Sri Lanka border, and the famous Rameshwaram Temple",
        "Day 4: Check in at hotel in Kanyakumari - Vivekananda Rock via boat, Handimandapam, Kanyakumari Devi Temple (sunset by auto, Rs 20 approx.), enjoy shopping",
        "Day 5: Transfer to Trivandrum - Kovalam Beach and Padmanabhaswamy Temple",
        "Day 6: Departure from Trivandrum"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Madurai Arrival", 
          description: "Arrive in Madurai at 6:35 PM and transfer to your hotel to relax after your journey. Spend the evening unwinding and acclimatizing to the local atmosphere. Enjoy a leisurely dinner at the hotel or nearby." 
        },
        { 
          day: "Day 2", 
          title: "Madurai Heritage", 
          description: "Explore Madurai's cultural heritage with visits to the magnificent Meenakshi Temple and the grand Thirumalai Nayak Palace. Discover historical insights at the Gandhi Memorial Museum and the serene Alagar Koil Temple. Experience spirituality at the hilltop Thiruparankundram Murugan Temple. Conclude the day with a relaxing evening of shopping in Madurai's vibrant markets." 
        },
        { 
          day: "Day 3", 
          title: "Rameswaram Spiritual", 
          description: "Transfer to Rameswaram and explore Pamban Beach, APJ Abdul Kalam Gallery, and the historic Dhanushkodi ruins. Visit the India-Sri Lanka border and the sacred Rameshwaram Temple, renowned for its spiritual and architectural significance. Enjoy dinner in Rameswaram before beginning a night journey from 9:30 PM to 4:30 AM. Relax and prepare for the next day's adventures." 
        },
        { 
          day: "Day 4", 
          title: "Kanyakumari Experience", 
          description: "Check in at a hotel with a stunning sunrise view in Kanyakumari, then take a boat to visit Vivekananda Rock. Explore Handimandapam and visit the Kanyakumari Devi Temple, enjoying the sunset with a brief auto ride costing about Rs 20. Spend the evening shopping, followed by dinner with a voucher before returning to the hotel." 
        },
        { 
          day: "Day 5", 
          title: "Trivandrum & Beaches", 
          description: "Transfer to Trivandrum, visit the scenic Kovalam Beach, and explore the majestic Padmanabhaswamy Temple. The temple offers morning darshan slots starting from 3:15 AM to 12:00 PM and evening darshan till 7:20 PM. Experience the temple's unique blend of Kerala and Dravidian architecture and spiritual ambiance. Enjoy an evening or early morning visit before ending the day." 
        },
        { 
          day: "Day 6", 
          title: "Departure", 
          description: "Depart from Trivandrum via International Airport or nearby Trivandrum Central Railway Station, both just 5 km apart for easy access. Convenient transport options ensure a smooth end to your trip." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Boat Rides"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "kerala-kanyakumari-explorer",
      name: "Kerala & Kanyakumari Explorer Tour",
      duration: "03 Nights / 04 Days",
      destination: "Trivandrum, Kovalam, Kanyakumari",
      places: ["Trivandrum", "Kovalam", "Kanyakumari"],
      bestSeason: "Year Round",
      price: 15999,
      originalPrice: 18999,
      discount: "16% Off",
      rating: 4.6,
      reviews: 85,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg"
      ],
      description: "Explore the spiritual and coastal beauty of Trivandrum and Kanyakumari.",
      highlights: [
        "Day 1: Arrive in Trivandrum at 6:05 PM, transfer to hotel and relax for the evening.",
        "Day 2: Visit Padmanabhaswamy Temple, Raja Ravi Varma Palace and move to kovalam beach",
        "Day 3: Check in at hotel in Kanyakumari - Kanyakumari Devi Temple, Sunrise/Sunset, Triveni Sangam, Vivekananda Rock via boat, Gandhi Mandapam, Raja Thiruvallur staute, enjoy shopping",
        "Day 4: Departure from Trivandrum"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Arrival in Trivandrum", 
          description: "Arrive in Trivandrum at 6:05 PM, transfer to your hotel, and unwind after travel. Spend a relaxing evening at the hotel or explore some calm local spots nearby to get a feel for the city's serene atmosphere." 
        },
        { 
          day: "Day 2", 
          title: "Trivandrum Spiritual & Coastal", 
          description: "Visit Sree Padmanabhaswamy Temple, open from 3:15 AM to 12 PM and again from 5 PM to 7:20 PM, allowing time for peaceful darshan. Then explore Raja Ravi Varma Palace, showcasing exquisite art and heritage. End your day relaxing at scenic Kovalam Beach, enjoying the sunset and tranquil atmosphere. This plan offers a fulfilling blend of spirituality, culture, and leisure." 
        },
        { 
          day: "Day 3", 
          title: "Kanyakumari Experience", 
          description: "Check in at your hotel in Kanyakumari, then visit the Kanyakumari Devi Temple and enjoy the sunrise or sunset at the beach. Explore the Triveni Sangam, followed by a boat trip to the Vivekananda Rock Memorial and the nearby Raja Thiruvalluvar Statue. End the day with a visit to Gandhi Mandapam and enjoy local shopping." 
        },
        { 
          day: "Day 4", 
          title: "Departure", 
          description: "Check out from your hotel and transfer to Trivandrum International Airport (TRV) or Trivandrum Central Railway Station." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Boat Ride"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "kerala-tamilnadu-spiritual",
      name: "Kerala & Tamil Nadu Spiritual Journey",
      duration: "07 Nights / 08 Days",
      destination: "Madurai, Thoothukudi, Tirunelveli, Kanyakumari, Trivandrum, Kochi",
      places: ["Madurai", "Thoothukudi", "Tirunelveli", "Kanyakumari", "Trivandrum", "Kochi"],
      bestSeason: "Year Round",
      price: 32999,
      originalPrice: 37999,
      discount: "13% Off",
      rating: 4.8,
      reviews: 95,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759489125/Guruvayoor_Temple_1_ofddy3.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488068/padmanabha-swamy1_kebsa2.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759488360/kovalam-1_trhrck.jpg"
      ],
      description: "Comprehensive spiritual journey through Tamil Nadu and Kerala's sacred sites.",
      highlights: [
        "Day 1: Arrive in Madurai at 6:35 PM, transfer to hotel and relax for the evening.",
        "Day 2: Explore Madurai's rich culture - Meenakshi Temple, Thirumalai Nayak Palace, Gandhi Memorial Museum, Alagar Koil Temple, and Thiruparankundram Murugan Temple",
        "Day 3: Transfer to Thoothukudi (150 km/2.5 hrs), visit Our Lady of Snows Basilica and Thiruchendur Murugan Temple, enjoy evening shopping.",
        "Day 4: Proceed to Tirunelveli, visit Arulmigu Nellaiyappar Temple, Arulmigu Sri Venkatachalapathi Temple Krishnapuram, Rajagopalaswamy Temple, Mela Thiruvenkatanathapuram Temple, Keezha Thiruvenkatanathapuram Temple",
        "Day 5: Check in at hotel in Kanyakumari - Vivekananda Rock via boat, Gandhi Mandapam, Kanyakumari Devi Temple & enjoy shopping",
        "Day 6: Transfer to Thiruvananthapuram, Sree Padmanabhaswamy Temple, Attukal Bhagavathy Temple, Pazhavangadi Maha Ganapathy temple, Karikkakom Sree Chamundi Temple, Sree Udiyanoor Devi Temple",
        "Day 7: Travel to Kochi en route visiting Ambalappuzha Sree Krishna Swamy Temple, then explore Mattancherry Palace (Dutch Palace), Jew Town, St. Francis Church",
        "Day 8: Departure from Kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Madurai Arrival", 
          description: "On Day 1, arrive in Madurai by 6:35 PM and proceed to your hotel for a restful evening. Take this time to relax and acclimatize after your journey. Prepare for the exciting experiences awaiting you in the city on the following day." 
        },
        { 
          day: "Day 2", 
          title: "Madurai Heritage", 
          description: "Day 2 includes visits to the Meenakshi Temple, Thirumalai Nayak Palace, Gandhi Memorial Museum, Alagar Koil Temple, and Thiruparankundram Murugan Temple. These sites showcase Madurai's rich cultural and religious history. The Gandhi Memorial Museum highlights India's freedom struggle. The day offers a deep dive into local heritage and spirituality." 
        },
        { 
          day: "Day 3", 
          title: "Thoothukudi Spiritual", 
          description: "Day 3 begins with a transfer to Thoothukudi, covering about 150 km. Visit the famous Our Lady of Snows Basilica and the revered Thiruchendur Murugan Temple. End your day with some leisurely evening shopping in Thoothukudi. This day blends cultural exploration with local experiences." 
        },
        { 
          day: "Day 4", 
          title: "Tirunelveli Temples", 
          description: "Day 4 begins with a transfer to Tirunelveli. Visit the Arulmigu Nellaiyappar Temple, known for its Dravidian architecture and spiritual significance. Explore the Arulmigu Sri Venkatachalapathi Temple Krishnapuram, a historic Vishnu temple. Also visit the Rajagopalaswamy Temple, famous for its ancient heritage, along with Mela Thiruvenkatanathapuram Temple and Keezha Thiruvenkatanathapuram Temple. This day offers a deep cultural and religious experience in Tirunelveli." 
        },
        { 
          day: "Day 5", 
          title: "Kanyakumari Coastal", 
          description: "Day 5 includes check-in at your hotel in Kanyakumari. Visit the iconic Vivekananda Rock via boat, open from 8 AM to 4 PM. Explore the Gandhi Mandapam and Kanyakumari Devi Temple. End your day with shopping in the local markets, enjoying the vibrant atmosphere of the coastal town." 
        },
        { 
          day: "Day 6", 
          title: "Trivandrum Temple Tour", 
          description: "Day 6 involves transfer to Thiruvananthapuram with visits to the famous Sree Padmanabhaswamy Temple, a historic and architecturally unique temple dedicated to Lord Vishnu. Also visit Attukal Bhagavathy Temple, Pazhavangadi Maha Ganapathy Temple, Karikkakom Sree Chamundi Temple, and Sree Udiyanoor Devi Temple. This day offers a rich spiritual and cultural experience in Kerala's capital city." 
        },
        { 
          day: "Day 7", 
          title: "Kochi Heritage", 
          description: "Day 7 includes visiting Ambalappuzha Sree Krishna Swamy Temple en route to Kochi. In Kochi, explore the historic Mattancherry Palace featuring Kerala-style architecture and vibrant murals. Visit Jew Town, known for its unique cultural heritage. End the day with a visit to St. Francis Church, one of India's oldest European churches." 
        },
        { 
          day: "Day 8", 
          title: "Departure", 
          description: "Day 8: Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala & Tamil Nadu stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Boat Rides", "Temple Entries"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    },
    {
      id: "kerala-honeymoon-tour",
      name: "Kerala Honeymoon Tour",
      duration: "06 Nights / 07 Days",
      destination: "Kochi, Munnar, Thekkady, Alleppey",
      places: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
      bestSeason: "Sep - May",
      price: 26999,
      originalPrice: 30999,
      discount: "13% Off",
      rating: 4.9,
      reviews: 200,
      image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
      images: [
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759330510/Allappy_1_qziygx.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193264/munnar_mycc44.jpg",
        "https://res.cloudinary.com/dl2gcscfa/image/upload/v1760193265/thekkady-tour-01_otzv8q.jpg"
      ],
      description: "Romantic Kerala getaway perfect for honeymooners and couples.",
      highlights: [
        "Day 1: After arriving in Kochi and settling in, you can visit Fort Kochi, Chinese Fishing Nets, and enjoy the Kathakali show in the evening.",
        "Day 2: Explore Kochi's charm – Mattancherry Palace (Dutch Palace), Jew Town, St. Francis Church, Marine Drive",
        "Day 3: Journey to Munnar with stops at scenic waterfalls en route",
        "Day 4: Full day in Munnar – discover the Tea Museum, cruising Mattupetty Dam, and the echo-filled Echo Point",
        "Day 5: Head to Thekkady – explore fragrant spice plantations and enjoy a traditional cultural show",
        "Day 6: Relax with a houseboat cruise through Alleppey's backwaters, complete with authentic Kerala meals",
        "Day 7: Departure from Kochi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Kochi Romantic Start", 
          description: "After arriving in Kochi and settling in, explore the historic Fort Kochi area with its colonial architecture and quaint streets. Visit the iconic Chinese Fishing Nets along the waterfront for an unforgettable photo opportunity. Spend the evening watching a traditional Kathakali dance performance, immersing yourself in Kerala's rich cultural heritage. This plan offers a perfect blend of sightseeing and cultural experience to start your trip." 
        },
        { 
          day: "Day 2", 
          title: "Kochi Heritage", 
          description: "Discover Kochi's heritage by visiting Mattancherry Palace, also known as the Dutch Palace, famous for its Kerala murals and traditional architecture. Wander through Jew Town, exploring vibrant markets and the Paradesi Synagogue. Visit St. Francis Church, India's oldest European church, rich in history. End the day with a relaxing stroll along Marine Drive, enjoying scenic backwaters and sunset views." 
        },
        { 
          day: "Day 3", 
          title: "Scenic Munnar Journey", 
          description: "Drive to Munnar from Kochi, approximately 127 km taking around 3.5 to 4 hours. En route, visit the picturesque Cheeyappara and Valara waterfalls, enjoying the serene cascades and lush greenery before continuing to the cool hill station of Munnar for arrival and overnight stay." 
        },
        { 
          day: "Day 4", 
          title: "Munnar Nature", 
          description: "Explore Munnar's beautiful attractions starting with the Rose Garden and Tea Museum. Visit the Honey Bee Park and Botanical Garden to experience nature's wonders. Enjoy scenic views at Mattupetty Dam and Echo Point. End the day with a visit to Eravikulam National Park, tea gardens, and Blossom Hydel Park for a perfect blend of nature and tranquility." 
        },
        { 
          day: "Day 5", 
          title: "Thekkady Spice & Culture", 
          description: "Travel to Thekkady and visit a spice plantation to experience the rich aroma and variety of local spices. Enjoy a boat cruise on Periyar Lake to spot wildlife and soak in the tranquil surroundings. Opt for adventurous activities like off-road jeep safari and thrilling zipline rides. End the day with a cultural show showcasing traditional Kerala arts and dance." 
        },
        { 
          day: "Day 6", 
          title: "Alleppey Backwaters", 
          description: "Enjoy a serene houseboat cruise in Alleppey, drifting through the tranquil backwaters. Savor traditional Kerala meals prepared onboard, featuring local delicacies. Experience the peaceful ride while taking in the lush landscapes. Optionally, explore Alleppey beach and gardens during your visit." 
        },
        { 
          day: "Day 7", 
          title: "Departure", 
          description: "Departure from Kochi with transfer to the airport or railway station as per your travel schedule. Wishing a safe and pleasant journey from Kochi! May your travels be smooth and memories from Kerala stay with you forever." 
        }
      ],
      inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing", "Houseboat Stay", "Cultural Shows", "Romantic Decorations"],
      exclusions: ["Flights", "Personal expenses", "Travel insurance"]
    }

  ];



  return (
    <div className="pt-20 min-h-screen py-8">
      <SEOHead 
        title="All Kerala Tour Packages | Omkar Tour and Travels - Best Deals 2025"
        description="Browse all Kerala tour packages from Omkar Tour and Travels. Backwaters, beaches, tea plantations, wildlife & cultural tours. Best price guarantee. Book your dream Kerala vacation today!"
        keywords="Kerala tour packages, Kerala backwaters, Alleppey houseboat, Munnar tea estates, Kerala beaches, wildlife tours, cultural packages, honeymoon packages Kerala"
      />
      
      <section className="max-w-7xl mx-auto py-8  md:py-16">
        <div className="text-center mb-8 ">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
            🏆 {allPackages.length}+ Curated Packages
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-6 tracking-wider uppercase">Kerala Tour Packages</h1>
         <p className="text-md md:text-xl text-gray-500 max-w-3xl mx-auto">
  Your perfect Kerala awaits. From misty hills to serene backwaters - let us craft your dream vacation.
</p>
        </div>

        {/* Package Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600 mb-2">{allPackages.length}+</div>
            <div className="text-sm text-gray-600">Tour Packages</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600 mb-2">4.8⭐</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600 mb-2">5000+</div>
            <div className="text-sm text-gray-600">Happy Travelers</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600 mb-2">13+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>

        {/* Package Filters */}
        {/* <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition duration-300 shadow-md">
            All Packages
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition duration-300">
            Backwaters
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition duration-300">
            Tea Estates
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition duration-300">
            Beaches
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition duration-300">
            Wildlife
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition duration-300">
            Cultural
          </button>
        </div> */}

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allPackages.map((pkg) => (
            <TourPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Package Categories Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-emerald-100 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚤</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Backwaters</h3>
            <p className="text-gray-600 text-sm">Serene houseboat cruises through palm-fringed canals</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-emerald-100 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Tea Plantations</h3>
            <p className="text-gray-600 text-sm">Misty hills and tea estate experiences in Munnar</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-emerald-100 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏖️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Beaches</h3>
            <p className="text-gray-600 text-sm">Golden sands and water sports at Kovalam & Alleppey</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-emerald-100 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕌</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Culture</h3>
            <p className="text-gray-600 text-sm">Ancient temples and traditional experiences</p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Omkar Tour and Travels?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">Get the best value with our price match guarantee and exclusive deals.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Local Guides</h3>
              <p className="text-gray-600">Experience Kerala with knowledgeable local guides and authentic insights.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support throughout your journey in Kerala.</p>
            </div>
          </div>
        </div>

        {/* Custom Package CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Perfect Package?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto text-lg">
            We specialize in creating customized Kerala tours that match your preferences, budget, and schedule. 
            Let us design your dream vacation in God's Own Country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919028803309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition duration-300 shadow-lg"
            >
              💬 Get Custom Quote on WhatsApp
            </a>
            <a
              href="tel:+919028803309"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition duration-300"
            >
              📞 Call for Customization
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllPackagesPage;