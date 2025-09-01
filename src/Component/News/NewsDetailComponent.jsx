import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { useGetSingleNewsQuery } from "@/services/admin-dashboard/dashboard";
import { useGetMembersQuery } from "@/services/membersApi";
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");


export default function NewsDetailComponent() {
  const { data, isLoading, error } = useGetMembersQuery();
  const { slug } = useParams();
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const newIndex = currentIndex > 0 ? currentIndex - 1 : newsItems.length - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < newsItems.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  const newsItem = data?.news?.find((item) => slug === slugify(item.title));
  const relatedNewsItem = data?.news?.filter(
    (item) => slug !== slugify(item.title)
  );
  //   const newsItem = {
  //     type: "Up Coming Event",
  //     typeColor: "bg-[#0A8625]",
  //     title: "Strengthening Microfinance Collaboration in Nigeria",
  //     author: "Author Name",
  //     date: "28 Jun 2025",
  //     readTime: "7 min read",
  //     image:
  //       "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80",
  //     body: `The Coalition of Microlending and Cooperative Institutions in Nigeria (COMCIN) held a strategic forum aimed at enhancing collaboration and compliance across grassroots financial institutions. The event, which took place at the COMCIN Secretariat in Abuja, brought together over 100 delegates from across Nigeria.

  // Speakers emphasized the importance of ethical lending practices, transparency, and digital adoption. The forum also highlighted upcoming regulatory changes and provided members with resources for aligning operations to new standards.

  // “COMCIN is committed to building a strong and unified voice for the microlending sector in Nigeria,” said Mrs. Ngozi Adeyemi, the Executive Chair.

  // Key Takeaways:
  // • Unified compliance reporting for member institutions
  // • Introduction of the COMCIN Digital Membership Portal
  // • Partnership opportunities with fintech providers

  // Members are encouraged to log into their dashboards to download event materials and access training resources. COMCIN remains focused on empowering institutions with tools to drive financial inclusion at scale.`,
  //   };

  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Type Tag */}
        <div
          className={`${newsItem.typeColor} text-white px-4 py-2 mb-4 rounded-md text-sm font-semibold w-fit`}
        >
          {newsItem.type}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between pt-4 border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="w-8 h-8 text-gray-500" />
            </div>
            <div className="flex flex-col space-x-3 text-sm text-[#1E1E1E]">
              {newsItem.author || "Admin COMCIN"}
              <div className="flex items-center space-x-1">
                <span>{new Date(newsItem.created_at).toDateString()}</span> .
                <span>{newsItem.readTime || "5 min read"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold my-6 leading-tight font-maven text-[#1E1E1E]">
          {newsItem.title}
        </h1>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <img
            src={
              newsItem.image
                ? `https://backend.comcin.com.ng/${newsItem.image}`
                : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80"
            }
            alt={newsItem.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Body */}
        <div className="space-y-4 text-[#686868] text-base leading-relaxed">
          {newsItem?.content.split("\n").map((para, i) => (
            <p key={i}>
              {para.startsWith("•") ? (
                <span className="ml-4">• {para.slice(1).trim()}</span>
              ) : (
                para
              )}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        {/* <div className="mt-10">
          <button className="flex items-center gap-2 bg-[#0A8625] text-white font-medium px-6 py-3 rounded-md hover:bg-green-700 transition">
            Register for Event <HiArrowRight className="text-xl" />
          </button>
        </div> */}
      </div>
      <div className="container mx-auto px-4 max-w-5xl mt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-maven text-4xl font-bold text-[#1E1E1E] mb-4">
              Other Related News & <br /> Announcements
            </h2>
          </div>

          <div className="hidden md:flex space-x-4">
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
            {relatedNewsItem.map((item) => (
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
      </div>
    </section>
  );
}
