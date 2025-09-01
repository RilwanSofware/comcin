import { useGetMembersQuery } from "../../services/membersApi";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useGetSingleNewsQuery } from "@/services/admin-dashboard/dashboard";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function NewsComponent() {
  const { data, isLoading, error } = useGetMembersQuery();

  const mockMembers = Array(15).fill({
    type: "Up Coming Event",
    title: "Strengthening Microfinance Institutions in Nigeria",
    description:
      "Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities.",
    author: "Author Name",
    date: "28 Jun 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80",
    typeColor: "bg-green-600",
  });

  const displayNews = data?.news || mockMembers;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  const filteredNews = displayNews.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section id="members" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Search & Filter Row */}

        <div className="bg-white px-4 py-3 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Total Members */}
          <div className="text-base text-[#0A8625] font-semibold">
            {filteredNews.length} News and Annoucement
          </div>

          {/* Search + Filter */}
          <div className="flex gap-2 w-full md:w-auto">
            {/* Search input */}
            <div className="flex w-full md:w-72 border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full focus:outline-none text-sm"
              />
            </div>

            {/* Filter button */}
            <button className="px-4 py-2 bg-[#F3F5F4] text-[#0A8625] rounded-md flex items-center justify-center border border-gray-300">
              <IoFilter size={18} />
              <span className="ml-1 text-sm hidden md:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Members Grid */}
        {isLoading ? (
          <div className="text-center">Loading members...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedNews.map((item, idx) => (
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
        )}

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-3 rounded-lg border border-[#E9EEEA]">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
                currentPage === 1
                  ? "bg-white text-[#B9B9B9] cursor-not-allowed"
                  : "bg-white text-[#0A8625] border border-[#0A8625]"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-white text-[#B9B9B9] cursor-not-allowed"
                  : "bg-white text-[#0A8625] border border-[#0A8625]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
