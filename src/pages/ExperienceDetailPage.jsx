import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ExperienceDetailPage = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [showNumbers, setShowNumbers] = useState(false);

  // Unified data structure with all the provided information
  const experiencesData = {
    ayurveda: {
      title: "Ayurveda",
      subtitle: "The Ancient Healing Science",
      heroImage: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770797/udvartana_khwlq6.jpg",
      description: "Experience the ancient healing science of Ayurveda in its birthplace - Kerala, where wellness meets tradition",
      overview: "Ayurveda, the 5,000-year-old natural healing system of India, finds its most authentic expression in Kerala. This ancient science of life focuses on holistic wellness through natural treatments, herbal medicines, and lifestyle practices that harmonize body, mind, and spirit.",
      
      items: [
        {
          title: "Abhyanga",
          description: "Abhyanga is a traditional Ayurvedic full-body massage using warm, herbal oils applied with gentle, rhythmic strokes. It deeply nourishes the skin, improves blood circulation, and induces a sense of relaxation by calming the nervous system. This massage supports detoxification through lymphatic drainage and helps to balance the body's doshas (bio-energies). Abhyanga is often recommended for stress relief, muscle relaxation, and maintaining overall health and wellness. It is considered a core part of Ayurveda's holistic healing practices.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761563459/abhyanga-treatment_zdjqbr.jpg",
          imageTitle: "Abhyanga Massage",
          imageDescription: "Traditional full-body oil massage for detoxification and rejuvenation",
          benefits: ["Stress relief and muscle relaxation", "Improved blood circulation", "Lymphatic drainage and detoxification", "Dosha balancing and rejuvenation", "Overall health and wellness maintenance"],
          duration: "60-90 minutes",
          bestFor: "Stress relief, muscle relaxation, and overall wellness"
        },
        {
          title: "Shirodhara",
          description: "Shirodhara is a relaxing Ayurvedic therapy where warm herbal oil is gently poured in a steady stream over the forehead, particularly on the 'third eye' area. This treatment calms the mind, relieves stress, anxiety, and insomnia, and promotes mental clarity. It also helps balance the nervous system and enhances overall brain function. Shirodhara is often used in conjunction with other Ayurvedic therapies to support emotional well-being and rejuvenation. It is a signature therapy in Kerala's traditional healing practices.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/shirodhara_t8shj8.jpg",
          imageTitle: "Shirodhara Therapy",
          imageDescription: "Continuous oil flow therapy for deep mental relaxation",
          benefits: ["Mental relaxation and stress relief", "Improved sleep quality", "Enhanced mental clarity", "Nervous system balance", "Emotional well-being support"],
          duration: "45-60 minutes",
          bestFor: "Stress, anxiety, insomnia, and mental wellness"
        },
        {
          title: "Pizhichil",
          description: "Pizhichil is a unique Kerala Ayurvedic therapy where warm, medicated herbal oil is continuously poured over the entire body while gentle massage is given. This treatment deeply relaxes the muscles, nourishes the skin, and helps relieve joint and nerve pain. Pizhichil is especially effective for conditions like arthritis, muscle stiffness, and neurological disorders. It enhances circulation and aids in detoxifying the body through the skin. Often called the 'oil bath,' Pizhichil is a signature rejuvenation treatment in Kerala's traditional healing.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/pizhichil_rba8ox.png",
          imageTitle: "Pizhichil Treatment",
          imageDescription: "Royal treatment with warm oil bath for complete body rejuvenation",
          benefits: ["Muscle and joint pain relief", "Deep tissue nourishment", "Neurological disorder management", "Complete body rejuvenation", "Improved circulation and detoxification"],
          duration: "60-90 minutes",
          bestFor: "Arthritis, muscle stiffness, neurological disorders, and rejuvenation"
        },
        {
          title: "Udvartana",
          description: "Udvartana is a traditional Ayurvedic massage where the body is vigorously massaged with herbal powders or pastes, using upward strokes. This therapy is known for detoxifying the skin, stimulating the lymphatic system, and improving circulation. Udvartana is especially recommended for those seeking weight loss, cellulite reduction, skin exfoliation, and enhanced muscle tone. The procedure helps in removing toxins, revitalizing the senses, and promoting a glowing complexion. It is often paired with herbal steam baths for deeper detoxification and rejuvenation.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770797/udvartana_khwlq6.jpg",
          imageTitle: "Udvartana Therapy",
          imageDescription: "Herbal powder massage for detoxification and rejuvenation",
          benefits: ["Weight management", "Skin detoxification", "Improved circulation", "Cellulite reduction", "Muscle tone enhancement"],
          duration: "45-60 minutes",
          bestFor: "Weight loss, cellulite reduction, and skin revitalization"
        },
        {
          title: "Kizhi",
          description: "Kizhi is a traditional Ayurvedic massage therapy from Kerala that involves the use of warm herbal poultices or bundles. These bundles, filled with medicinal herbs, are heated and gently pressed or massaged over the body to relieve pain, inflammation, and muscle stiffness. There are different types of Kizhi, such as Elakizhi (herbal leaves) and Njavarakizhi (medicated rice), each providing unique therapeutic benefits. This treatment helps improve circulation, detoxify tissues, and relax the muscles deeply. Kizhi is widely used for rejuvenation and managing chronic conditions like arthritis and muscular disorders.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761563440/Kizhi_ha8mf3.jpg",
          imageTitle: "Kizhi Treatment",
          imageDescription: "Warm herbal poultice massage for pain relief and muscle relaxation",
          benefits: ["Pain and inflammation relief", "Improved circulation", "Muscle relaxation", "Tissue detoxification", "Chronic condition management"],
          duration: "60-75 minutes",
          bestFor: "Chronic pain, arthritis, and muscular disorders"
        },
        {
          title: "Nasya",
          description: "Nasya is an ancient Ayurvedic therapy that involves administering medicinal oils or herbal extracts through the nostrils. It targets the head, sinuses, and respiratory system by cleansing, purifying, and nourishing these areas. Nasya is effective in relieving sinus congestion, headaches, migraines, and neurological issues. It also promotes mental clarity, reduces stress and anxiety, and supports healthy hair growth by improving scalp circulation. This therapy helps balance the doshas, especially Kapha and Vata, contributing to overall wellness and mental calmness.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761563932/nasya-a_ynunkt.png",
          imageTitle: "Nasya Therapy",
          imageDescription: "Nasal administration of herbal medicines for sinus and respiratory health",
          benefits: ["Sinus and respiratory health", "Headache and migraine relief", "Mental clarity", "Scalp and hair health", "Stress and anxiety reduction"],
          duration: "30-45 minutes",
          bestFor: "Respiratory issues, headaches, and mental wellness"
        },
        {
          title: "Kati Basti",
          description: "Kati Basti is a specialized Ayurvedic therapy focused on treating the lower back region. It involves creating a dough ring on the lower back, which is filled with warm, medicated herbal oil. The oil is retained within this ring for 30 to 40 minutes, allowing deep penetration to soothe muscles, reduce pain, and relieve stiffness. This therapy is highly effective in treating chronic lower back pain, muscle spasms, sciatica, and degenerative spinal conditions. Kati Basti also improves blood circulation, nourishes the spinal tissues, and enhances flexibility and overall well-being of the back area.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761563406/-Kati-Basti-_ldqcfz.jpg",
          imageTitle: "Kati Basti Therapy",
          imageDescription: "Specialized lower back treatment with warm medicated oil",
          benefits: ["Lower back pain relief", "Spinal health improvement", "Muscle relaxation", "Enhanced flexibility", "Circulation improvement"],
          duration: "45-60 minutes",
          bestFor: "Chronic back pain, sciatica, and spinal issues"
        },
        {
          title: "Marma Massage",
          description: "Marma Massage is an ancient Ayurvedic therapy that focuses on stimulating specific vital energy points in the body called Marma points. These 107 points are junctions where muscles, nerves, bones, and vessels converge and are considered crucial for the flow of life energy or prana. By gently massaging these points, Marma Massage helps to unblock energy pathways, promote healing, reduce pain, and restore physical and mental balance. It can relieve stress, improve circulation, enhance immune function, and support emotional release. Marma Massage combines deep anatomical knowledge with subtle energy work and is rooted in Kerala's traditional healing practices linked to the ancient martial art of Kalaripayattu.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761563423/marma_vffvp6.jpg",
          imageTitle: "Marma Massage",
          imageDescription: "Energy point stimulation for holistic healing and balance",
          benefits: ["Energy pathway unblocking", "Stress relief and pain reduction", "Improved circulation", "Enhanced immune function", "Emotional balance"],
          duration: "60-75 minutes",
          bestFor: "Energy balancing, stress relief, and holistic healing"
        }
      ]
    },
    artforms: {
      title: "Artforms",
      subtitle: "Traditional Arts & Cultural Performances",
      heroImage: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770809/theyyam_fnnirr.jpg",
      description: "Discover Kerala's rich tradition of classical and folk arts preserved through centuries of cultural heritage",
      overview: "Kerala's cultural landscape is adorned with diverse art forms ranging from majestic classical dances to vibrant folk arts. Each performance tells a story of tradition, devotion, and artistic excellence that has been passed down through generations.",
      
      items: [
        {
          title: "Kathakali",
          description: "Kathakali is a classical dance-drama from Kerala, known for its vibrant costumes, elaborate face makeup, and expressive hand gestures. It combines dance, music, and acting to tell stories from Indian epics like the Ramayana and Mahabharata. Performers use intricate facial expressions and body movements to convey emotions and narratives without speaking. The dance is traditionally performed by men, even for female roles, with each character's costume and makeup symbolizing their nature, such as heroes or demons. Kathakali's music features traditional Kerala percussion instruments like the chenda and maddalam. It originated in the 17th century and is deeply rooted in Kerala's temple and royal court traditions. Today, it is a celebrated art form and cultural symbol of Kerala, performed at festivals and special events.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770792/Kathakali_-_tpwnmq.jpg",
          imageTitle: "Kathakali Performance",
          imageDescription: "Classical dance-drama with elaborate makeup and costumes",
          features: ["Vibrant costumes and makeup", "Expressive hand gestures", "Traditional percussion music", "Epic mythological stories", "Male performers for all roles"],
          duration: "2-4 hours",
          significance: "Cultural symbol of Kerala's temple traditions"
        },
        {
          title: "Theyyam",
          description: "Theyyam is a traditional ritual dance form of Kerala, especially popular in the North Malabar region. It is considered a dance of the gods, combining dance, music, and mime to honor heroes and ancestral spirits. Performers undergo elaborate makeup and wear vibrant costumes and towering headgear to represent deities. The dance takes place in temples or sacred groves, often between December and April. Each Theyyam has a unique style and story, with over 400 different forms. It is both a religious and cultural event, where the performer is believed to embody the divine during the ritual. Theyyam showcases Kerala's rich tribal heritage and spiritual beliefs.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770799/Theyyam_txgzaj.png",
          imageTitle: "Theyyam Ritual",
          imageDescription: "Ancient ritual dance form connecting divine and mortal realms",
          features: ["Divine embodiment", "Elaborate costumes and makeup", "Ritualistic performance", "Tribal heritage", "Over 400 unique forms"],
          duration: "Varies by type",
          significance: "Bridge between human and spiritual worlds"
        },
        {
          title: "Mohiniyattam",
          description: "Mohiniyattam is a classical dance form from Kerala, known as the 'dance of the enchantress.' It features graceful, swaying movements and subtle facial expressions, emphasizing feminine beauty and lasya style. Traditionally performed by women, it tells stories of love and devotion, often inspired by Hindu mythology. The dancer wears a white costume with golden borders, symbolizing simplicity and elegance. Its music is based on Carnatic and Kerala's indigenous Sopanam styles, enhancing the delicate movements. Mohiniyattam is celebrated for its slow, rhythmic pace, fluidity, and emotive gestures. It is a significant cultural treasure of Kerala, performed in temples and cultural festivals.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770794/Mohiniyattam_sku3q6.jpg",
          imageTitle: "Mohiniyattam Dance",
          imageDescription: "Graceful dance form known as the dance of the enchantress",
          features: ["Graceful movements", "Feminine expression", "White and gold costumes", "Sopanam music style", "Love and devotion themes"],
          duration: "1-2 hours",
          significance: "Elegant representation of Kerala's classical arts"
        },
        {
          title: "Kalaripayattu",
          description: "Kalaripayattu is one of the oldest martial arts in the world, originating in Kerala over 3,000 years ago. It is a scientifically structured discipline that includes strikes, kicks, grappling, weaponry, and healing techniques. The word 'Kalari' means training space, and 'Payattu' means fight or practice. According to legend, Sage Parashurama, the creator of Kerala, established Kalaripayattu to help locals defend themselves. The martial art is known for graceful, animal-inspired movements and the use of weapons like swords, spears, and the flexible Urumi. Traditionally, it was practiced in special training halls called Kalaris and was an important part of Kerala's warrior culture. Today, Kalaripayattu is revived globally as both a fighting art and a healing discipline.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/Kalaripayattu_kymjit.png",
          imageTitle: "Kalaripayattu Martial Art",
          imageDescription: "Ancient martial art with weapon training and healing techniques",
          features: ["Ancient martial techniques", "Weapon training", "Healing methods", "Animal-inspired movements", "3,000-year heritage"],
          duration: "Training programs vary",
          significance: "Oldest surviving martial art system"
        },
        {
          title: "Kutiyattam",
          description: "Kutiyattam is one of the oldest classical Sanskrit theatre forms, originating in Kerala over 2,000 years ago. It combines ancient Sanskrit drama with local theatrical traditions and is recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity. Kutiyattam performances are traditionally held in temple theatres called Koothambalams, featuring elaborately choreographed gestures, facial expressions, and stylized acting. The art requires rigorous training lasting over a decade, emphasizing detailed expression of emotions through subtle body and eye movements. Traditionally, male actors of the Chakyar caste play the roles, while female roles are performed by Nangiar women. Performances can be very long, sometimes lasting up to 40 days for a full play. Kutiyattam preserves ancient theatrical techniques and cultural heritage, making it a unique and sacred art form in Kerala.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/Koodiyattam-featured-image_bnxlci.png",
          imageTitle: "Kutiyattam Performance",
          imageDescription: "Ancient Sanskrit theatre tradition, UNESCO heritage art",
          features: ["UNESCO heritage art", "Sanskrit theatre", "Elaborate gestures and expressions", "Temple theatre performances", "Rigorous training required"],
          duration: "Can last up to 40 days",
          significance: "Ancient Sanskrit theatre tradition recognized by UNESCO"
        },
        {
          title: "Ottamthullal",
          description: "Ottamthullal is a traditional performing art form from Kerala, created in the 18th century by the famous poet Kunchan Nambiar. It combines dance, recitation, and humor to present stories, often satirizing social issues and human foibles. The performer wears colorful costumes and green face makeup, similar to Kathakali but simpler and more approachable. Ottamthullal is typically a solo performance, where the artist narrates verses in Malayalam with expressive gestures and lively movements. Accompanied by percussion instruments and a singer who repeats the lines, this art form effectively entertains and educates audiences. Known as the 'poor man's Kathakali,' it remains popular at temple festivals and cultural events in Kerala. Its witty commentary often challenges social norms with playful criticism.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770791/960px-Ottamthullal_kerala_gskyz1.jpg",
          imageTitle: "Ottamthullal Performance",
          imageDescription: "Satirical solo performance with social commentary",
          features: ["Social satire", "Solo performance", "Colorful costumes", "Malayalam narration", "Humorous storytelling"],
          duration: "30-60 minutes",
          significance: "Social commentary through art"
        },
        {
          title: "Padayani",
          description: "Padayani is a traditional ritualistic folk dance form performed in temples of central Kerala, dedicated to Goddess Bhadrakali. It is a vibrant combination of music, dance, theatre, satire, elaborate masks, and paintings. The name Padayani means 'row of warriors,' and the dance is believed to have roots in ancient martial arts, symbolizing a warrior's formation. The performances are held during festival seasons, usually from mid-December to mid-May, and involve dramatic enactments to appease the goddess and ensure good harvests. Dancers wear large, colorful masks made from natural materials like areca palm leaves. Padayani rituals include rhythmic percussion, expressive dances, and social satire, reflecting the deep cultural and spiritual heritage of Kerala. It is regarded as a symbolic act of purification and community devotion.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770794/padayani-dance3_re5gwp.jpg",
          imageTitle: "Padayani Dance",
          imageDescription: "Ritual folk dance with elaborate masks and vibrant performances",
          features: ["Elaborate masks", "Ritualistic performance", "Warrior symbolism", "Social satire", "Community devotion"],
          duration: "Festival seasons (Dec-May)",
          significance: "Purification and community devotion ritual"
        },
        {
          title: "Thiruvathirakali",
          description: "Thiruvathirakali, also known as Kaikottikali, is a traditional group dance performed by women in Kerala, especially during the festival of Onam and the Thiruvathira celebration. Dancers form a circle around a lit lamp, clapping their hands rhythmically in coordination with songs that often praise deities like Lord Shiva, Parvati, Ganesha, and Saraswati. Women wear elegant Kerala attire called Mundu Neriyathu and adorn their hair with jasmine flowers and sacred herbs. The dance combines graceful footwork, rhythmic hand clapping, and subtle body movements, creating a harmonious and devotional atmosphere. Thiruvathirakali is closely connected to rituals promoting marital bliss, prosperity, and spiritual devotion. Traditionally performed through the night, the dance is both a cultural expression and a celebration of feminine grace and energy. It remains a cherished art form that strengthens community bonds and preserves Kerala's rich heritage.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770798/Thiruvathirakkali_u12e97.jpg",
          imageTitle: "Thiruvathirakali Dance",
          imageDescription: "Graceful circular dance celebrating feminine energy",
          features: ["Circular formation", "Group synchronization", "Traditional attire", "Devotional themes", "Feminine grace celebration"],
          duration: "1-2 hours",
          significance: "Celebration of feminine grace and energy"
        },
        {
          title: "Pulikali",
          description: "Pulikali, also known as the Tiger Dance, is a vibrant folk art form from Kerala practiced mainly during the Onam festival. Performers paint their bodies with tiger-like stripes in shades of yellow, red, and black, creating a striking visual effect. They dance to the rhythmic beats of traditional percussion instruments such as the thakil and chenda. The dance symbolizes courage, bravery, and the spirit of battle, reflecting Kerala's cultural heritage. The performers, called Pulikalikkar, undergo extensive preparation, including body painting and fasting, to achieve the authentic tiger look. Pulikali is especially popular in Thrissur, where grand processions and performances attract thousands of spectators during Onam celebrations. It remains a lively manifestation of Kerala's rich tribal and folk traditions, celebrated with enthusiasm and community participation.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/Pulikali_pzfhy3.jpg",
          imageTitle: "Pulikali Tiger Dance",
          imageDescription: "Vibrant tiger dance during Onam celebrations",
          features: ["Tiger body painting", "Energetic movements", "Percussion accompaniment", "Festive celebration", "Courage symbolism"],
          duration: "2-3 hours",
          significance: "Expression of courage and community spirit"
        },
        {
          title: "Margamkali",
          description: "Margamkali is a traditional Christian folk dance from Kerala, practiced mainly by the Syrian Christian community, especially the Knanaya subgroup. It commemorates the life and missionary work of St. Thomas the Apostle, who is believed to have brought Christianity to Kerala. The dance involves about twelve performers who form a circle around a traditional lamp called Nilavilakku, symbolizing Christ and his disciples. Dancers wear traditional white attire with gold or red borders and sometimes adorn peacock feathers on their heads, inspired by the legend of St. Thomas arriving on a peacock. The performance combines graceful hand and foot movements synchronized with singing, using small cymbals as musical accompaniment. Margamkali reflects devotion and cultural identity and is performed at weddings, church festivals, and cultural events. It has evolved into a widely respected art form enjoyed across Kerala, transcending religious and social boundaries.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/Margamkali_au4gup.jpg",
          imageTitle: "Margamkali",
          imageDescription: "Traditional Syrian Christian dance with lamp",
          features: ["Christian folk dance", "Circular formation", "Peacock feather adornments", "St. Thomas commemoration", "Cultural identity expression"],
          duration: "1-2 hours",
          significance: "Syrian Christian cultural heritage"
        }
      ]
    },
    events: {
      title: "Events & Festivals",
      subtitle: "Cultural Celebrations Through the Year",
      heroImage: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770797/vishu-celebration_pj21b6.png",
      description: "Immerse yourself in Kerala's vibrant festivals and cultural events that showcase the state's rich heritage",
      overview: "Kerala's festival calendar is packed with colorful celebrations that showcase the state's rich cultural heritage and religious harmony. From grand temple festivals to harvest celebrations, each event is a spectacular display of tradition, music, and community spirit.",
      
      items: [
        {
          title: "Onam",
          description: "Onam is Kerala's most celebrated and vibrant harvest festival. It marks the legendary homecoming of King Mahabali, a symbol of prosperity, equality, and cultural unity. The festival spans ten days, filled with colorful activities like boat races, floral arrangements called Pookkalam, traditional dances, and grand feasts (Onam Sadhya). It is celebrated with great enthusiasm by people of all communities, showcasing Kerala's rich cultural heritage. Onam typically occurs in August or September and is a time for family gatherings, joyful celebrations, and paying homage to nature's bounty.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/onam_12_n17zjz.png",
          imageTitle: "Onam Festival",
          imageDescription: "Harvest festival with flower carpets and traditional feast",
          highlights: ["Pookkalam flower carpets", "Snake boat races", "Onam Sadhya feast", "Traditional dances", "King Mahabali homecoming"],
          duration: "10 days",
          time: "August-September"
        },
        {
          title: "Thrissur Pooram",
          description: "Thrissur Pooram is Kerala's grandest and most spectacular temple festival, held annually at the Vadakkunnathan Temple in Thrissur. Celebrated in the Malayalam month of Medam (April-May), it brings together ten temples in a magnificent cultural procession. The festival is renowned for its striking display of decorated elephants, lively traditional percussion ensembles like Ilanjithara Melam, and the vibrant Kudamattam ritual, where colorful parasols are rhythmically exchanged atop elephants. Initiated over 200 years ago by Maharaja Sakthan Thampuran to unite local temples, Thrissur Pooram attracts over a million visitors each year. The festival culminates in a dazzling fireworks display, making it a grand celebration of Kerala's rich heritage and community spirit.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thrissur_Pooram_e8qjxs.jpg",
          imageTitle: "Thrissur Pooram",
          imageDescription: "Grand temple festival with decorated elephants and percussion",
          highlights: ["Decorated elephants", "Percussion ensembles", "Kudamattam ritual", "Fireworks display", "Million+ visitors"],
          duration: "1 day main event",
          time: "April-May"
        },
        {
          title: "Vishu",
          description: "Vishu is Kerala's traditional New Year festival, celebrated with joy and hope for prosperity. It marks the beginning of the Malayalam month of Medam and the start of the harvest season. The highlight is the Vishu Kani, an auspicious arrangement of items like rice, fruits, gold coins, and the bright yellow Konna flowers, set for the first sight on the festival morning. Vishu Kaineettam, where elders give money to younger family members, is an important tradition symbolizing blessings and good fortune. Families prepare a grand feast called Vishu Sadya featuring traditional Kerala dishes. The day is also celebrated with prayers, bursting of firecrackers, and visits to temples. Vishu embodies new beginnings, family bonding, and gratitude for nature's abundance.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770797/vishu-celebration_pj21b6.png",
          imageTitle: "Vishu Celebration",
          imageDescription: "Kerala's New Year festival with Vishukkani and fireworks",
          highlights: ["Vishu Kani arrangement", "Vishu Kaineettam", "Traditional feast", "Family gatherings", "New Year celebrations"],
          duration: "1 day",
          time: "April"
        },
        {
          title: "Theyyam Festival",
          description: "Theyyam Festival is a spectacular ritualistic celebration held in various temples across North Kerala, particularly in Kannur and Kasargod districts. This vibrant festival features the ancient ritual dance form of Theyyam, where performers transform into deities through elaborate makeup, costumes, and spiritual rituals. The festival typically runs from December to April, with each temple hosting specific Theyyam performances on designated days. Devotees and tourists flock to witness these divine performances, believed to bring blessings and prosperity. The festival showcases over 400 different types of Theyyam, each with unique costumes, music, and mythological stories. It's a profound cultural experience that blends art, spirituality, and tradition, offering a glimpse into Kerala's ancient tribal heritage and religious practices.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770799/Theyyam_txgzaj.png",
          imageTitle: "Theyyam Festival",
          imageDescription: "Divine ritual performances during Theyyam season",
          highlights: ["Ancient ritual performances", "Divine transformations", "Elaborate costumes and makeup", "Over 400 Theyyam varieties", "Spiritual blessings"],
          duration: "December to April",
          time: "December-April"
        },
        {
          title: "Attukal Pongala",
          description: "Attukal Pongala is an annual 10-day festival celebrated at the Attukal Bhagavathi Temple in Thiruvananthapuram, Kerala. It is famous for being the largest gathering of women for a religious purpose in the world. On the ninth day, millions of women from diverse communities cook a special sweet dish called Pongala in earthen pots as an offering to the goddess Attukalamma. The festival symbolizes feminine power, devotion, and unity, with women coming together irrespective of caste or creed. The ritual is deeply spiritual and culturally significant, involving prayers, music, and community harmony. Attukal Pongala has earned a place in the Guinness World Records for its massive participation. It showcases Kerala's rich heritage and highlights women's empowerment and faith.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770791/Attukal_Pongala_bws6he.jpg",
          imageTitle: "Attukal Pongala",
          imageDescription: "Women's festival creating world's largest gathering",
          highlights: ["Women's gathering", "Pongala offering", "Community harmony", "Spiritual devotion", "Guinness World Record"],
          duration: "10 days",
          time: "February-March"
        },
        {
          title: "Makaravilakku",
          description: "Makaravilakku is a significant annual festival celebrated at the Sabarimala Ayyappa Temple in Kerala. It coincides with Makara Sankranti and marks the culmination of a 41-day pilgrimage by millions of devotees. The festival is renowned for the divine light called Makara Jyothi, seen thrice on the Ponnambalamedu hill near the temple. The sacred procession of Thiruvabharanam, Lord Ayyappa's gold ornaments, from the Pandalam Palace to Sabarimala is a major highlight. Devotees chant 'Swamiye Saranam Ayyappa' in unison during the celebrations, expressing their devotion. Makaravilakku symbolizes faith, hope, and spiritual renewal, attracting pilgrims from all over India. It also greatly boosts Kerala's spiritual tourism and local economy.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/Makaravilakku_o763yr.png",
          imageTitle: "Makaravilakku",
          imageDescription: "Sacred festival at Sabarimala temple",
          highlights: ["Makara Jyothi", "Pilgrimage completion", "Sacred procession", "Spiritual devotion", "41-day pilgrimage"],
          duration: "Festival day",
          time: "January"
        },
        {
          title: "Arattu Festival",
          description: "Arattu Festival is a significant religious festival celebrated in Kerala, especially at the Sree Padmanabhaswamy Temple in Thiruvananthapuram and Janardhan Swami Temple in Varkala. The word 'Arattu' means a holy bath, marking the ceremonial bathing of the deity's idol in a sacred water body like a river or sea. The festival usually lasts for ten days and is held twice a year, during March-April and October-November. It features grand processions with decorated elephants, traditional music, cultural performances like Kathakali dance, and vibrant rituals. The event begins with flag hoisting and concludes with the sacred bath of the deity on the last day. The procession is led by royal family members or temple dignitaries, adding to the festival's grandeur. Arattu celebrates Kerala's deep spiritual heritage and community devotion.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770791/arattu_p3rb8i.png",
          imageTitle: "Arattu Festival",
          imageDescription: "Holy bath festival with grand processions",
          highlights: ["Holy bath ritual", "Decorated elephants", "Cultural performances", "Royal processions", "Twice yearly celebration"],
          duration: "10 days",
          time: "March-April & October-November"
        },
        {
          title: "Karkidaka Vavu Bali",
          description: "Karkidaka Vavu Bali is a sacred Hindu ritual observed in Kerala during the new moon day of the Malayalam month Karkidakam (July-August). It is performed to honor and remember deceased ancestors, seeking peace and liberation (moksha) for their souls. Devotees gather at riverbanks, temple ponds, and beaches early in the morning to perform the Bali Tharpanam ritual, offering rice balls, sesame seeds, and sacred water. The ritual fosters a deep connection between the living and the departed, reinforcing family bonds and spiritual continuity. It coincides with Kerala's monsoon season, symbolizing renewal and protection. Karkidaka Vavu is a solemn occasion marked by prayers, fasting, and a sense of community devotion. It remains an essential part of Kerala's cultural and religious heritage.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770791/Attukal_Pongala_bws6he.jpg",
          imageTitle: "Karkidaka Vavu Bali",
          imageDescription: "Ancestral ritual during monsoon season",
          highlights: ["Ancestral honoring", "Riverbank rituals", "Family bonding", "Spiritual continuity", "Monsoon symbolism"],
          duration: "1 day",
          time: "July-August"
        },
        {
          title: "Snake Boat Races (Vallam Kali)",
          description: "Snake Boat Races, locally called Vallam Kali, are traditional boat races held in Kerala's backwaters, especially during the Onam festival season from July to September. The highlight of Vallam Kali is the race of the Chundan Vallam or snake boats, which are long, slender boats around 30 to 40 meters in length, with up to 128 paddlers rowing in unison. These races have historic origins dating back to the 13th century, originally used for naval exercises during feudal wars. Today, they symbolize Kerala's rich maritime culture, community spirit, and synchronized teamwork. The boat races are accompanied by traditional boat songs called Vanchipattu, enhancing the festive atmosphere. Major events include the Nehru Trophy Boat Race in Alappuzha and the Aranmula Uthrattadi Vallamkali on the Pamba river. Vallam Kali draws large crowds and tourists, showcasing Kerala's cultural pride and heritage on vibrant waterways.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/Snake_Boat_Races_Vallam_Kali_iko5qt.png",
          imageTitle: "Snake Boat Race",
          imageDescription: "Traditional boat race competition on serene backwaters",
          highlights: ["Chundan Vallam boats", "Synchronized rowing", "Traditional boat songs", "Community participation", "13th century origins"],
          duration: "Race day events",
          time: "July-September"
        },
        {
          title: "Christmas",
          description: "Christmas in Kerala is a joyous festival celebrated with a unique blend of religious and cultural traditions. Homes, churches, and streets are adorned with bright stars, twinkling lights, and nativity cribs depicting the birth of Jesus Christ. Families gather for midnight Mass, singing carols and participating in festive prayers. The celebrations include a grand feast featuring traditional Kerala dishes like appam, stew, and plum cake. Communities come alive with vibrant decorations, carol singing, and cultural events. Kerala also hosts lively Christmas markets and beach celebrations that bring locals and tourists together. The festival embodies warmth, togetherness, and a spirit of giving, making Christmas a heartfelt celebration across the state.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770792/Christmas_k7z16s.jpg",
          imageTitle: "Christmas Celebration",
          imageDescription: "Festive celebrations across Kerala's churches",
          highlights: ["Church decorations", "Midnight Mass", "Traditional feast", "Community celebrations", "Beach festivities"],
          duration: "Christmas week",
          time: "December"
        }
      ]
    },
    cuisine: {
      title: "Cuisine",
      subtitle: "Authentic Kerala Flavors & Culinary Heritage",
      heroImage: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thalassery_Biryani_m0jz6r.jpg",
      description: "Savor the authentic flavors of Kerala's diverse culinary heritage influenced by its geography and history",
      overview: "Kerala cuisine is a delightful blend of flavors influenced by its coastal geography, spice trade history, and cultural diversity. From spicy seafood to vegetarian delicacies, each dish tells a story of the land and its people.",
      
      items: [
        {
          title: "Puttu and Kadala Curry",
          description: "Puttu and Kadala Curry is a beloved traditional breakfast in Kerala. Puttu is made by steaming layers of coarsely ground rice flour and grated coconut in a cylindrical mold, resulting in soft and aromatic rice cakes. Kadala Curry is a spicy, flavorful curry made with black chickpeas cooked in a rich blend of spices, onions, tomatoes, garlic, and coconut, often tempered with mustard seeds and curry leaves in coconut oil. The combination offers a perfect balance of mildness from puttu and the robust taste of kadala curry. It is nutritious, providing carbohydrates and protein, and is commonly enjoyed with banana or papad on the side. This dish is simple to prepare yet deeply satisfying, embodying Kerala's culinary tradition. It is a go-to meal across households and is cherished for its rich flavors and comforting texture. Puttu and Kadala Curry is a must-try for anyone wanting a true taste of Kerala breakfast culture.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770795/Puttu_and_Kadala_Curry_frdnyy.jpg",
          imageTitle: "Puttu and Kadala Curry",
          imageDescription: "Steamed rice cake with spicy chickpea curry",
          ingredients: ["Rice flour", "Grated coconut", "Black chickpeas", "Kerala spices", "Coconut oil"],
          serving: "Breakfast",
          taste: "Mild puttu with spicy curry"
        },
        {
          title: "Appam with Stew",
          description: "Appam with Stew is a classic Kerala breakfast loved for its perfect blend of flavors and textures. Appam is a soft, lacy pancake made from fermented rice batter and coconut milk, featuring a fluffy center and crispy edges. The vegetable stew, also called Ishtu, is a mildly spiced curry cooked in a rich coconut milk base with vegetables like potatoes, carrots, and beans. The stew is flavored with fragrant spices such as cinnamon, cloves, cardamom, and curry leaves, tempered in coconut oil for an authentic aroma. This combination offers a balance of creamy and delicate tastes, with the stew complementing the lightness of appam beautifully. It's traditionally enjoyed during festivals and special occasions but is also a popular everyday meal. Appam and Stew provide a wholesome, comforting, and nourishing experience reflecting Kerala's culinary heritage. The dish is often served hot and paired with fried bananas or chutneys for added taste.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770791/Appam_with_Stew_sl4yr6.png",
          imageTitle: "Appam with Stew",
          imageDescription: "Lacy rice pancakes with vegetable stew",
          ingredients: ["Rice batter", "Coconut milk", "Mixed vegetables", "Mild spices", "Coconut oil"],
          serving: "Breakfast",
          taste: "Soft appam with creamy stew"
        },
        {
          title: "Karimeen Pollichathu",
          description: "Karimeen Pollichathu is a popular Kerala dish featuring pearl spot fish marinated with a blend of spices. The fish is coated with a masala made from onions, tomatoes, ginger, garlic, and coconut milk, giving it a rich and aromatic flavor. It is then wrapped in banana leaves, which infuse the fish with a unique, smoky aroma during cooking. The wrapped fish is pan-fried or grilled until tender and infused with the spices. Traditionally, coconut oil is used in the cooking process to enhance the authentic taste. This dish is a favorite in Kerala's cuisine, known for its delicate balance of spicy, tangy, and creamy textures. It is often served with rice or as a special delicacy during festive occasions and gatherings.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1761289736/Karimeen_Pollichathu_1_nvp0ii.jpg",
          imageTitle: "Karimeen Pollichathu",
          imageDescription: "Pearl spot fish grilled in banana leaves",
          ingredients: ["Pearl spot fish", "Banana leaves", "Spice blend", "Coconut oil", "Coconut milk"],
          serving: "Lunch/Dinner",
          taste: "Spicy and aromatic"
        },
        {
          title: "Malabar Parotta with Beef Curry",
          description: "Malabar Parotta with Beef Curry is a beloved Kerala dish known for its rich flavors and textures. Malabar Parotta is a flaky, layered flatbread made from refined flour, kneaded to a soft dough, and cooked on a hot griddle until golden and crisp. Its characteristic layers are achieved by rolling, folding, and repeatedly pressing the dough. Beef Curry from Kerala is a spicy, aromatic preparation cooked with a blend of local spices, coconut oil, onions, tomatoes, and sometimes coconut milk, creating a thick, flavorful gravy. The tender beef pieces absorb the robust spices, making it rich and hearty. Together, the soft, flaky Malabar Parotta perfectly complements the spicy, savory beef curry. This combination is a favorite during special occasions and everyday meals alike. It highlights Kerala's love for hearty, spice-infused food and showcases the culinary diversity of the Malabar region.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770794/malabar-paratha-165616695016x9_lenh3t.jpg",
          imageTitle: "Malabar Parotta",
          imageDescription: "Flaky layered flatbread perfect with curries",
          ingredients: ["Refined flour", "Beef", "Malabar spices", "Coconut oil", "Coconut milk"],
          serving: "Lunch/Dinner",
          taste: "Flaky bread with spicy curry"
        },
        {
          title: "Kerala Prawn Curry",
          description: "Kerala Prawn Curry is a flavorful, aromatic dish made with fresh prawns cooked in a spiced coconut milk gravy. The prawns are first marinated with turmeric, garlic, and ginger for enhanced taste. The curry base is prepared by sautéing mustard seeds, curry leaves, onions, and spices like red chili powder and coriander. Tamarind or kokum is often added to give the curry a subtle tanginess. Coconut milk is poured in to create a creamy, rich sauce that balances the spices perfectly. The prawns cook quickly in the curry until tender and infused with the flavors. This curry is usually served hot with steamed rice or appam. It is a staple in Kerala cuisine, cherished for its blend of spicy, tangy, and creamy elements.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/keralan_prawn_curry_45390_16x9_fzqql5.jpg",
          imageTitle: "Kerala Prawn Curry",
          imageDescription: "Spicy prawn preparation in coconut gravy",
          ingredients: ["Fresh prawns", "Coconut milk", "Tamarind", "Kerala spices", "Coconut oil"],
          serving: "Lunch/Dinner",
          taste: "Spicy, tangy, and creamy"
        },
        {
          title: "Thalassery Biryani",
          description: "Thalassery Biryani is a signature rice dish from the Malabar region of Kerala, known for its distinct aroma and delicate flavor. It is made using Jeerakasala or Kaima rice, which has a unique aroma and fluffy texture. The biryani incorporates a mild yet flavorful chicken masala cooked with onions, ginger, garlic, green chilies, tomatoes, and a blend of traditional Malabar spices. The chicken is marinated with yogurt and lime juice to tenderize and enhance the flavors. The rice and chicken masala are layered and cooked together using the dum method, sealing in the flavors. Cashews, raisins, and fried onions are added for extra richness and a subtle sweetness. Thalassery Biryani is typically served with side dishes like cucumber raita and chili pickle. It is a celebratory dish served during festivals, weddings, and special occasions, highly cherished for its balanced taste and fragrant spices.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770796/Thalassery_Biryani_m0jz6r.jpg",
          imageTitle: "Thalassery Biryani",
          imageDescription: "Aromatic rice dish with Malabar spices and meat",
          ingredients: ["Jeerakasala rice", "Chicken", "Malabar spices", "Cashews & raisins", "Yogurt marinade"],
          serving: "Lunch/Dinner",
          taste: "Aromatic and flavorful"
        },
        {
          title: "Erissery",
          description: "Erissery is a traditional Kerala dish made with yellow pumpkin, black-eyed peas, coconut, and spices. The pumpkin is peeled, cubed, and cooked with soaked cowpeas until both are soft. A ground coconut mixture with cumin, green chilies, and turmeric is prepared and added to the cooked pumpkin and beans. The dish is seasoned with a tempering of mustard seeds, red chilies, curry leaves, and coconut oil, which is then poured over the curry. It's a mildly spiced, slightly sweet, and aromatic curry, often served as part of a festive meal or on special occasions. Erissery is known for its wholesome taste and balanced flavors, perfect with rice. It is a popular dish during Onam and other traditional Kerala feasts.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770792/Erissery_djbvcj.jpg",
          imageTitle: "Erissery",
          imageDescription: "Pumpkin and bean curry with coconut",
          ingredients: ["Yellow pumpkin", "Black-eyed peas", "Coconut", "Spices", "Coconut oil"],
          serving: "Lunch/Dinner",
          taste: "Mildly spiced and slightly sweet"
        },
        {
          title: "Idli Sambar",
          description: "Idli Sambar is a popular South Indian breakfast combination, especially favored in Kerala. Idli are soft, steamed rice cakes made from fermented rice and urad dal batter. Sambar is a lentil-based vegetable stew flavored with tamarind, mustard seeds, curry leaves, and a special blend of spices called sambar powder. Vegetables like drumsticks, carrots, beans, and tomatoes are commonly used in the sambar. The dal (lentils) is cooked until soft and mixed with tamarind water and the sautéed spices. The sambar is tempered with mustard seeds, dry red chilies, and asafoetida in coconut oil for aroma. Idli and sambar together provide a nutritious, balanced meal with carbohydrates, protein, and fiber. This dish is comforting, light, and widely enjoyed during breakfast or snacks.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770792/idli_nm5o8h.jpg",
          imageTitle: "Idli Sambar",
          imageDescription: "Soft steamed rice cakes with lentil stew",
          ingredients: ["Rice", "Urad dal", "Mixed vegetables", "Sambar spices", "Tamarind"],
          serving: "Breakfast",
          taste: "Soft idli with spicy sambar"
        },
        {
          title: "Ada Pradhaman",
          description: "Ada Pradhaman is a rich and creamy Kerala dessert made from rice ada (rice flakes), jaggery, and coconut milk. The rice ada is soaked, then sautéed in ghee with cashews, raisins, and coconut pieces. Jaggery syrup is added to the cooked ada and simmered until thickened. Coconut milk—both thick and thin—is poured in during cooking to give a silky texture. Flavored with cardamom and garnished with fried nuts, it is a popular festive dish, especially during Onam. The result is a luscious, mildly sweet payasam with fragrant spices and crunchy toppings.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770794/pepper-delight-ada-pradhaman-2_wkym90.jpg",
          imageTitle: "Ada Pradhaman",
          imageDescription: "Sweet payasam with rice flakes and jaggery",
          ingredients: ["Rice ada", "Jaggery", "Coconut milk", "Cardamom", "Cashews & raisins"],
          serving: "Dessert",
          taste: "Sweet and creamy"
        },
        {
          title: "Kappa and Meen Curry",
          description: "Kappa and Meen Curry is a classic Kerala combination of boiled tapioca (kappa) and spicy fish curry (meen curry). Tapioca is peeled, cut, and boiled until soft, then mashed and mixed with grated coconut, turmeric, cumin, and curry leaves for added flavor. The fish curry is made with fresh fish cooked in a tangy and spicy gravy using tamarind, chili powder, mustard seeds, fenugreek, curry leaves, and sometimes coconut milk. The curry is rich, aromatic, and full of traditional Kerala spices. This pair is widely loved for its balance of starchy, creamy tapioca and fiery, tangy fish curry. It is a staple comfort food in Kerala and enjoyed with great enthusiasm during meals. The dish reflects Kerala's coastal culinary heritage and the use of locally sourced ingredients.",
          image: "https://res.cloudinary.com/dl2gcscfa/image/upload/v1759770793/Kappa_and_Meen_Curry_pzbfnx.png",
          imageTitle: "Kappa and Meen Curry",
          imageDescription: "Tapioca with spicy fish curry - Kerala staple",
          ingredients: ["Tapioca", "Fresh fish", "Coconut", "Spices", "Tamarind"],
          serving: "Lunch/Dinner",
          taste: "Creamy tapioca with spicy fish curry"
        }
      ]
    }
  };

  const experience = experiencesData[experienceId];

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Experience Not Found</h1>
          <p className="text-gray-600 mb-8">The experience you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => navigate("/experiences")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Back to Experiences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-10 md:mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-teal-800 to-blue-900 overflow-hidden">
        <div className="pt-20 pb-16">
          <div className="absolute inset-0">
            <img
              src={experience.heroImage}
              alt={experience.title}
              className="w-full h-full object-cover opacity-30 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <button
                onClick={() => navigate("/")}
                className="flex items-center text-emerald-200 hover:text-white mb-6 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Experiences
              </button>
              
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {experience.title}
                </h1>
                <div className="w-20 h-1 bg-emerald-400 mb-4"></div>
                <p className="text-xl text-emerald-100 mb-2 font-light">
                  {experience.subtitle}
                </p>
                <p className="text-lg text-emerald-50 opacity-90 leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">About {experience.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {experience.overview}
                </p>
              </div>
            </div>

            {/* Preview Images */}
            <div className="grid grid-cols-2 gap-4">
              {experience.items.slice(0, 4).map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-50 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageTitle}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.imageDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section with Alternating Layout */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Discover {experience.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the comprehensive details of each aspect with authentic information and visuals
            </p>
          </div>
          
          <div className="space-y-16">
            {experience.items.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                } lg:flex`}
              >
                {/* Image Section */}
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                    
                    {/* Dynamic content based on category */}
                    {item.benefits && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-emerald-700 mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.features && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-emerald-700 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {item.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.highlights && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-emerald-700 mb-3">Highlights:</h4>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.ingredients && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-emerald-700 mb-3">Main Ingredients:</h4>
                        <ul className="space-y-2">
                          {item.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      {item.duration && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Duration</h4>
                          <p className="text-gray-600">{item.duration}</p>
                        </div>
                      )}
                      {item.bestFor && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Best For</h4>
                          <p className="text-gray-600">{item.bestFor}</p>
                        </div>
                      )}
                      {item.time && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Time</h4>
                          <p className="text-gray-600">{item.time}</p>
                        </div>
                      )}
                      {item.serving && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Serving</h4>
                          <p className="text-gray-600">{item.serving}</p>
                        </div>
                      )}
                      {item.taste && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Taste Profile</h4>
                          <p className="text-gray-600">{item.taste}</p>
                        </div>
                      )}
                      {item.significance && (
                        <div>
                          <h4 className="font-semibold text-gray-700 text-sm">Significance</h4>
                          <p className="text-gray-600">{item.significance}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Experience Kerala's {experience.title}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Let our experts craft your perfect journey with authentic local insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Call Now Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Call Now</h3>
              <p className="text-gray-600 mb-4">Speak directly with our experts</p>
              
              {!showNumbers ? (
                <button
                  onClick={() => setShowNumbers(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Call Now</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-col space-y-2">
                    <a 
                      href="tel:+919028803309" 
                      className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      +91 90288 03309
                    </a>
                    <a 
                      href="tel:+919048403309" 
                      className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      +91 90484 03309
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* WhatsApp Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick responses and instant support</p>
              
              <div className="space-y-3">
                <a
                  href="https://wa.me/919028803309?text=Hi! I'm interested in experiencing Kerala's culture and would like more information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">WhatsApp +91 90288 03309</span>
                </a>
                <a
                  href="https://wa.me/919048403309?text=Hi! I'm interested in experiencing Kerala's culture and would like more information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">WhatsApp +91 90484 03309</span>
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            24/7 available for queries
          </p>
        </div>
      </section>
    </div>
  );
};

export default ExperienceDetailPage;