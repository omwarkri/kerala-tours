import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../common/SEOHead";

const Hero = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize video with proper muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, []);

  // Auto unmute on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && videoRef.current) {
        setHasInteracted(true);
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().catch(console.error);
      }
    };

    if (!hasInteracted) {
      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("scroll", handleFirstInteraction);
      window.addEventListener("touchstart", handleFirstInteraction);
    }

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // Ensure video plays after mute/unmute
      videoRef.current.play().catch(console.error);
    }
  };

  const handleSoundOn = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setHasInteracted(true);
      videoRef.current.play().catch(console.error);
    }
    setShowAudioControls(false);
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
    setShowAudioControls(false);
  };

  const toggleAudioControls = () => {
    setShowAudioControls(!showAudioControls);
  };

  // Close audio controls when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAudioControls && !event.target.closest('.audio-controls-container')) {
        setShowAudioControls(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAudioControls]);

  return (
    <header className="relative h-screen overflow-hidden">
      <SEOHead
        title="Kerala Tour Packages | Omkar Tour and Travels - Best Kerala Tourism"
        description="Experience God's Own Country with Omkar Tour and Travels. 5000+ happy customers, best price guarantee. Book your Kerala tour package today!"
        keywords="Kerala tour packages, Kerala tourism, Munnar tour, Alleppey houseboat, Kerala travel agency"
      />

      {/* Video Background with Overlay */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/ddw1upvx3/image/upload/v1759595324/my_uploads_food/Screenshot_2025-10-04_at_9.57.38_PM_o93eru.png"
          className="absolute top-0 left-0 w-full h-[calc(100%+50px)] object-cover scale-105"
          style={{ transition: "none" }}
        >
          <source
            src="https://res.cloudinary.com/ddw1upvx3/video/upload/v1759594216/This_is_Kerala_-_God_s_Own_Country___Drone_shots___4K___online-video-cutter.com_b1ensd.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
      </div>

      {/* Audio Controls */}
      <div className="audio-controls-container absolute bottom-6 right-6 z-20 flex flex-col items-end space-y-2">
        {/* Main Audio Toggle Button */}
        <button
          onClick={toggleMute}
          className="bg-black/70 text-white p-3 rounded-full shadow-lg hover:bg-black/90 backdrop-blur-sm transition-all duration-300 border border-white/20 hover:scale-110 hover:border-white/40"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <span className="text-lg">🔇</span>
          ) : (
            <span className="text-lg">🔊</span>
          )}
        </button>

        {/* Extended Audio Controls */}
        {showAudioControls && (
          <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <div className="text-white text-sm font-semibold mb-2 text-center border-b border-white/20 pb-2">
                Audio Settings
              </div>
              
              <button
                onClick={handleSoundOn}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] ${
                  !isMuted 
                    ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <span className="text-base">🔊</span>
                <span className="text-sm font-medium">Sound On</span>
              </button>

              <button
                onClick={handleMute}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] ${
                  isMuted 
                    ? 'bg-rose-600 text-white shadow-lg scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <span className="text-base">🔇</span>
                <span className="text-sm font-medium">Mute</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audio Status Indicator */}
      {!isMuted && (
        <div className="absolute top-6 right-6 z-20 animate-pulse">
          <div className="bg-emerald-600/90 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center space-x-2 border border-emerald-400/50 shadow-lg">
            <span className="text-sm">🔊</span>
            <span>Sound On</span>
          </div>
        </div>
      )}

      {/* Content - Moved down using pt-32 (or adjust as needed) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pt-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white -mb-1 leading-tight tracking-widest uppercase">
  DISCOVER THE MAGIC OF 
  <span className="text-white pl-2 ">
     GOD'S OWN COUNTRY
  </span>
</h1>

          {/* Logo */}
        {/* Logo */}
<div className="mb-3 transform hover:scale-105 transition-transform duration-500">
  <img
    className="w-32 md:w-48 lg:w-[300px] border-b border-white mx-auto drop-shadow-2xl"
    src="https://res.cloudinary.com/dl2gcscfa/image/upload/v1760938190/kerla-logo-2__1_-removebg-preview_qgevi3.png"
    alt="Kerala - God's Own Country"
  />
  
</div>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl mt-6 text-amber-50 mb-8 leading-relaxed max-w-3xl mx-auto font-serif italic tracking-wide drop-shadow-md">
  A journey through rich culture and living traditions. From green hills and peaceful tea gardens to calm backwaters and sandy beaches, Kerala is full of natural beauty and colorful art.
</p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <a
              href="/#packages"
              className="px-8 py-4  rounded-xl font-bold text-lg text-white hover:from-emerald-600 hover:to-cyan-600 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 border-2 border-emerald-400/50 transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              View Tour Packages
              <span className="ml-2">→</span>
            </a>
            
         
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
     

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </header>
  );
};

export default Hero;