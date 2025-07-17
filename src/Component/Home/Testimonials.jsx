import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import bgImage from "../../assets/Background.png";

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const testimonials = [
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
      author: "Author Name",
      date: "28 Jun 2025",
      readTime: "7 min read",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const updateScrollState = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );

      const progress =
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100;
      setScrollProgress(progress || 0);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      updateScrollState();
    }

    return () => {
      if (container) container.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const cardWidth = container.children[0].clientWidth + 16;
      container.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="mb-6">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="container mx-auto bg-cover bg-center px-8 max-w-7xl rounded-2xl py-16"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-maven text-4xl font-bold text-white mb-4">
              What Our Members Say
            </h2>
            <p className="text-base text-white max-w-md">
              Our streamlined application process ensures that qualified
              institutions can quickly become part of our growing coalition.
            </p>
          </div>

          {/* Arrows */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border border-white transition-colors duration-200 group ${
                canScrollLeft
                  ? "bg-white text-green-700"
                  : "bg-white/20 text-white/40 cursor-not-allowed"
              }`}
              aria-label="Previous"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border border-white transition-colors duration-200 group ${
                canScrollRight
                  ? "bg-white text-green-700"
                  : "bg-white/20 text-white/40 cursor-not-allowed"
              }`}
              aria-label="Next"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar (top) */}
        <div className="h-0.5 bg-[#BDCEFA] mb-6 mx-2 md:mx-6 relative">
          <div
            className="h-full bg-[#040F2C] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-2 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[300px] max-w-xs md:min-w-[360px] bg-white text-gray-800 rounded-2xl p-4 shadow-md"
              >
                {/* Header */}
                <div className="flex justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold">{item.author}</p>
                      <p className="text-xs text-gray-500">
                        {item.date} • {item.readTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 space-x-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar (bottom) */}
        <div className="h-0.5 bg-[#BDCEFA] mt-6 mx-2 md:mx-6 relative">
          <div
            className="h-full bg-[#040F2C] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}
