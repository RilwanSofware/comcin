import { useGetMembersQuery } from "../../services/membersApi";
import { IoFilter } from "react-icons/io5";
import memberImage from "../../assets/member.png";
import category from "../../assets/neat.png";
import { useState } from "react";

export default function MembersComponent() {
  const { data, isLoading } = useGetMembersQuery();

  const displayMembers = data?.members || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 8;
  const filteredMembers = displayMembers.filter((member) =>
    member.institution_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
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
            {filteredMembers.length} Members
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden transition duration-300 relative group"
              >
                <div className="relative h-50 w-full p-2">
                  <img
                    src={memberImage}
                    alt="group"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <img
                    src={
                      member.institution_logo
                        ? `https://backend.comcin.com.ng/${member.institution_logo}`
                        : memberImage
                    }
                    alt="logo"
                    className="absolute -bottom-8 left-4 w-16 h-16 bg-white p-1 rounded-full border shadow-md z-10"
                  />
                </div>

                <div className="mt-4 pt-8 pb-20 px-4 text-left">
                  <h3 className="text-base font-semibold text-gray-800 leading-tight">
                    {member.institution_name}
                  </h3>
                </div>

                {/* Hover Card */}
                <div
                  className="absolute -bottom-1 left-0 w-full h-2/3 bg-green-700 text-white rounded-lg 
                  translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                  transition-all duration-500 ease-in-out z-20 flex flex-col justify-center 
                  items-start px-4 text-right pointer-events-none"
                >
                  <img
                    src={
                      member.institution_logo
                        ? `https://backend.comcin.com.ng/${member.institution_logo}`
                        : memberImage
                    }
                    alt="logo"
                    className="w-12 h-12 mb-2 bg-white p-1 rounded-full border shadow-md"
                  />
                  <p className="text-sm font-semibold">
                    {member.institution_name}
                  </p>
                  <div className="space-y-1 w-full text-xs">
                    <div className="flex">
                      <span className="min-w-[90px] text-left">
                        Membership:
                      </span>
                      <span className="font-bold text-left">Active</span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[90px] text-left">Joined:</span>
                      <span className="font-bold text-left">Jan 2023</span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[90px] text-left">State:</span>
                      <span className="font-bold text-left">Lagos</span>
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
