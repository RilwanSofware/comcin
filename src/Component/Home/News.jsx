import { useGetMembersQuery } from "@/services/membersApi";
import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function News() {
  const { data, isLoading, error } = useGetMembersQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16;
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : data?.news.length - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex =
      currentIndex < data?.news.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id="news" className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-maven text-4xl font-bold [text-[#1E1E1E] mb-4">
              News & Announcements
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Stay updated with the latest developments in the Nigerian
              microfinance sector and COMCIN activities.
            </p>
          </div>

          <div className="hidden md:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full border border-green-600 bg-white hover:bg-gray-50 transition-colors duration-200 group"
              aria-label="Previous news item"
            >
              <FaChevronLeft className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white"
              aria-label="Next news item"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data?.news?.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full md:w-[400px] snap-start"
              >
                <div className="bg-white pb-5 rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 group h-full">
                  <div className="h-48 p-2 overflow-hidden">
                    <img
                      src={
                        item.image
                          ? `https://backend.comcin.com.ng/${item.image}`
                          : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80"
                      }
                      alt={item.title}
                      className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="px-2 mt-4 pr-6">
                    <span
                      className={`${
                        item.typeColor || "bg-green-600"
                      } text-white px-3 py-1 my-3 rounded-md text-sm font-medium`}
                    >
                      {item.category}
                    </span>
                    <Link to={`/news/${slugify(item.title)}`}>
                      <h3 className="text-xl font-bold text-gray-900 my-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                        {item.title.split(" ").slice(0, 2).join(" ")}...
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaUser className="w-8 h-8 text-gray-500" />
                        </div>
                        <div className="flex flex-col space-x-3 text-sm text-[#1E1E1E]">
                          {item.author || "Admin COMCIN"}
                          <div className="flex items-center space-x-1">
                            <span>
                              {new Date(item.created_at)?.toDateString()}
                            </span>{" "}
                            .<span>{item.readTime || "5 min read"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <Link
            to={"/news"}
            className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            View All News{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}
