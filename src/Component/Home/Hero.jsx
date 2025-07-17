// Hero.jsx
import Header from "../Header";
import bgImage from "../../assets/Bakground.png";
import featureImage from "../../assets/africa.png";
import partnerBadge from "../../assets/partner-badge.png";
import { useEffect, useRef } from "react";
import { BsShieldLock, BsStarFill } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import ropeTexture from "../../assets/rope.png";

export default function Hero() {
  const sliderRef = useRef(null);
  const partnerLogos = [
    featureImage,
    featureImage,
    featureImage,
    featureImage,
    featureImage,
    featureImage,
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;
    let position = 0;
    const speed = 1; // Adjust speed here

    const animate = () => {
      position -= speed;
      if (position <= -slider.scrollWidth / 2) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="relative min-h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-8 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="container relative mx-auto px-4 pt-32 pb-20 z-10 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - text content */}
          <div className="text-left">
            {/* Trusted by institutions count */}
            <div className="mb-6">
              <p className="inline-flex gap-2 bg-white items-center rounded-full p-2 text-green-500 font-normal text-base">
                <BsShieldLock />
                Trusted by 287+ Financial Institutions
              </p>
            </div>

            {/* Main heading with line breaks */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-maven font-bold mb-6 text-white leading-tight">
              Empowering
              <br />
              Nigeria's
              <br />
              <span className="relative inline-block p-2">
                {/* Rope background */}
                <div
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center z-0"
                  style={{
                    backgroundImage: `url(${ropeTexture})`,
                    backgroundSize: "100% 100%",
                    transform: "scale(1)",
                  }}
                ></div>
                <span className="relative z-10">Microfinance</span>
              </span>
              <br />
              Future
            </h1>

            {/* Description paragraph */}
            <p className="text-base mb-8 text-white max-w-md">
              Join the Coalition of Microlending and Cooperative Institutions in
              Nigeria – fostering trust, accountability, and growth across the
              nation.
            </p>

            {/* Buttons with arrow icon */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-white text-green-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Become a Member
              </button>
              <button className="flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-green-700 transition-colors">
                View Members Directory
                <GoArrowRight />
              </button>
            </div>

            {/* Rating section - removed since not in design */}
            <div className="flex items-center gap-4">
              {/* Partner badge image */}
              <img
                src={partnerBadge}
                alt="Trusted Partner Badge"
                className="h-12 w-auto object-contain"
              />

              {/* Star rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} className="text-yellow-400 text-lg" />
                ))}
                <span className="text-white ml-2 text-sm font-medium">
                  Trusted Partner
                </span>
              </div>
            </div>
          </div>

          {/* Right column - image and logo slider */}
          <div className="relative">
            {/* Main image box */}
            <div className="bg-white p-2 rounded-lg shadow-xl overflow-hidden">
              <img
                src={featureImage}
                alt="Microfinance in Nigeria"
                className="w-full h-auto rounded-lg"
              />
              {/* Continuous logo slider */}
              <div className="mt-6 bg-white/90 p-4 overflow-hidden">
                <div className="relative h-16 w-full overflow-hidden">
                  <div
                    ref={sliderRef}
                    className="absolute flex items-center space-x-8 whitespace-nowrap"
                  >
                    {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                      <img
                        key={index}
                        src={logo}
                        alt="Partner"
                        className="h-12 object-contain"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
