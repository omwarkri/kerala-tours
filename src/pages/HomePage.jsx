import React from "react";
import Hero from "../components/HomePage/Hero";
import TourPackages from "../components/HomePage/TourPackages";
import PopularPlaces from "../components/HomePage/PopularPlaces";
// import WhyChooseUs from "../components/HomePage/WhyChooseUs";
import KeralaExperiences from "../components/HomePage/KerlaExperiances";
import FAQ from "../components/HomePage/FAQ";

import AboutUsSection from "../components/common/AboutUsSection";
import ContactSection from "./ContactPage";

// import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      <Hero />
      <main>
        
        <TourPackages />
        <PopularPlaces />
        <KeralaExperiences/>
        {/* <WhyChooseUs /> */}
        <FAQ />
        <AboutUsSection/>
        <ContactSection />
      </main>
    </div>
  );
};

export default HomePage;