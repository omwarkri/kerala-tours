import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from "./components/common/Navigation";
import HomePage from "./pages/HomePage";
import AllPackagesPage from "./pages/AllPackagesPage";
import SinglePackagePage from "./pages/SinglePackagePage";
import AllPlacesPage from "./pages/AllPlacesPage";
import SinglePlacePage from "./pages/SinglePlacePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import KeralaExperiences from "./components/HomePage/KerlaExperiances";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
// import AdminPage from "./pages/AdminPage";
// ScrollToTop component that will scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
};

// Alternative version with instant scroll (without smooth animation)
// const ScrollToTopInstant = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-800 bg-white pt-18">
        <ScrollToTop /> {/* Add this line */}
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<AllPackagesPage />} />
          <Route path="/package/:packageId" element={<SinglePackagePage />} />
          <Route path="/places" element={<AllPlacesPage />} />
          <Route path="/place/:placeId" element={<SinglePlacePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/experiance" element={<KeralaExperiences />} />
          <Route path="/experiences/:experienceId" element={<ExperienceDetailPage />} />

             {/* <Route path="/admin" element={<AdminPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;