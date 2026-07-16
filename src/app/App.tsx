import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

// Using Vite's relative path resolution
// @ts-ignore
import logoPlaceholder from "../imports/foodify_logo.png";
// @ts-ignore
import asset1 from "../imports/asset_1.png";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplashText, setFadeSplashText] = useState(false);
  const [slideSplashPanel, setSlideSplashPanel] = useState(false);

  useEffect(() => {
    // 1. Fade out the splash text after 1.5 seconds
    const textTimer = setTimeout(() => {
      setFadeSplashText(true);
    }, 1500);

    // 2. Slide up the splash panel after 2.1 seconds
    const panelTimer = setTimeout(() => {
      setSlideSplashPanel(true);
    }, 2100);

    // 3. Unmount splash component completely after transition completes (3.1 seconds)
    const unmountTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3100);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(panelTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-white text-black" style={{ fontFamily: "'Syne', sans-serif" }}>

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div
          className={`fixed inset-0 bg-[#d00504] z-50 flex items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${slideSplashPanel ? "translate-y-[-100%]" : "translate-y-0"
            }`}
        >
          <div
            className={`text-center px-6 transition-all duration-[800ms] ease-out ${fadeSplashText ? "opacity-0 translate-y-[-20px] scale-95" : "opacity-100 translate-y-0 scale-100 animate-reveal-text"
              }`}
          >
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight text-black font-serif italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              One Platform. <span className="text-white not-italic font-sans font-white">Many Opportunities.</span>
            </h1>
            <div className="w-16 h-[2px] bg-[#d00504] mx-auto mt-6 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* HEADER WITH SMALLER PADDING, THINNER BORDER, AND COMPACT BRAND SIZES */}
      <header className="w-full px-6 py-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-[#d00504] bg-white animate-fade-in-down">

        {/* 1:1 Logo and Text Group */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logoPlaceholder}
            alt="Foodify Logo Icon"
            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl"
          />
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Akzidenz-Grotesk', 'Helvetica Neue', Arial, sans-serif" }}
          >
            <span className="text-[#d00504]">foodify</span>
            <span className="text-black">.ph</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
          <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 font-semibold text-gray-800 text-sm tracking-wide uppercase">
            <a href="#" className="hover:text-[#d00504] transition-colors">Home</a>
            <a href="#" className="hover:text-[#d00504] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#d00504] transition-colors">Be our supplier</a>
            <a href="#" className="hover:text-[#d00504] transition-colors">Catalogs</a>
            <a href="#" className="hover:text-[#d00504] transition-colors">FAQs</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {/* HERO SECTION - ORIGINAL GRID LAYOUT WITH ANIMATIONS */}
        <section className="px-6 py-16 md:px-12 lg:px-24 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">

          {/* Left Column: Text & Buttons (7/12 Width) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-in-up">

            {/* Main Headings */}
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-5xl md:text-7xl font-bold text-[#d00504] uppercase leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                ONE PLATFORM.
              </h2>
              <h3 className="text-4xl md:text-5xl text-[#d00504] italic leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Many Opportunities.
              </h3>
            </div>

            {/* Description Card */}
            <div className="mt-4 flex flex-col gap-3 max-w-xl">
              <h4 className="text-2xl font-bold text-[#d00504] uppercase tracking-wider">
                Welcome!
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Foodify connects food businesses with a network of resellers who sell your food across social media every order prepaid through a secure wallet. This is not a food app. It's a sales system.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-start gap-4 w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
              <button className="bg-[#d00504] text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#d00504] hover:bg-white hover:text-[#d00504] flex items-center justify-center cursor-pointer">
                BOOK A FREE DEMO
              </button>
              <button className="bg-white text-[#d00504] px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#d00504] hover:bg-[#d00504] hover:text-white flex items-center justify-center cursor-pointer">
                BECOME A RESELLER
              </button>
            </div>

          </div>

          {/* Right Column: 1:1 Showcase Image (5/12 Width) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end animate-fade-in-up delay-200">
            <img
              src={asset1}
              alt="Foodify Showcase"
              className="w-full max-w-md aspect-square object-cover rounded-2xl"
            />
          </div>

        </section>

        {/* ABOUT US SECTION */}
        <section className="bg-[#d00504] text-white px-6 py-20 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold border-b border-white/30 pb-4 inline-block w-fit mx-auto md:mx-0">
              About Us
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-medium">
              Foodify is a food commerce platform that empowers aspiring food entrepreneurs, home-based cooks, and local businesses to sell their products online with ease. Whether you're starting without your own kitchen or expanding an existing food business, Foodify provides the tools to manage orders, payments, and deliveries in one convenient platform.
            </p>
          </div>
        </section>

        {/* BRANDS / LOGOS SECTION */}
        <section className="px-6 py-20 flex justify-center gap-8 md:gap-16 items-center flex-wrap bg-white">
          {/* 1:1 Logo Placeholders */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#d00504] flex items-center justify-center text-[#d00504] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <span className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>€</span>
            </div>
          ))}
        </section>

      </main>

      {/* FOOTER & CONTACT */}
      <footer className="w-full bg-[#c00000] text-white select-none">
        {/* Main Footer Area */}
        <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 flex flex-col md:flex-row justify-end items-center gap-8 md:gap-12">

          {/* Contact Us Title */}
          <div className="text-4xl md:text-[2.5rem] font-bold leading-[1.1] text-center md:text-right">
            Contact<br className="hidden md:inline" /> Us
          </div>

          {/* Contact Details */}
          <ul className="list-none p-0 m-0 flex flex-col gap-3 font-sans">
            {/* Phone */}
            <li className="flex items-center gap-4 text-sm md:text-[0.95rem] font-bold">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <Phone className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug">091234556788</span>
            </li>

            {/* Email */}
            <li className="flex items-center gap-4 text-sm md:text-[0.95rem] font-bold">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <Mail className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug">support@foodify.com</span>
            </li>

            {/* Address */}
            <li className="flex items-center gap-4 text-sm md:text-[0.95rem] font-bold">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <MapPin className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug text-left">
                62 G. Lazaro Rd, Dalandanan,<br />Valenzuela City, 1444,
              </span>
            </li>
          </ul>

        </div>

        {/* Copyright Bar */}
        <div className="bg-[#c00000] border-t-4 border-white py-4 text-center text-sm font-normal tracking-wide">
          &copy; 2026 Foodify. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}