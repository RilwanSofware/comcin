import { FaRegEdit, FaSearch } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import CreateNewsModal from "../News/CreateNewsModal";
import CreateTestimonialsModal from "./CreateTestimonialsModal";

export default function TestimonialsTable() {
  const allTestimonials = [
    {
      author: "Lagos State Cooperative Federation",
      email: "ola@test.com",
      review: "Great service and very supportive team.",
      rating: 4,
      status: "Pending Review",
      date: "1/31/2024",
    },
    {
      author: "First City Microfinance Bank",
      email: "ola@test.com",

      review: "Smooth process, I was impressed.",
      rating: 5,
      status: "Published",
      date: "2/01/2024",
    },
    {
      author: "Abuja Municipal Thrift Society",
      email: "ola@test.com",

      review: "Helpful platform, but room for improvement.",
      rating: 3,
      status: "Published",
      date: "2/02/2024",
    },
    {
      author: "Kano Farmers Cooperative Union",
      email: "ola@test.com",

      review: "Easy to use and reliable.",
      rating: 4,
      status: "Pending Review",
      date: "2/03/2024",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // "create" or "edit"
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);
  const paginatedData = allTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (item) => {
    setMode("edit");
    setSelectedTestimonial(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.author}"?`)) {
      console.log("Deleted:", item);
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-[#1E1E1E] text-xl font-medium font-maven">
          Testimonials
        </h2>
      </div>

      {/* Filters */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="relative w-96">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by author or review..."
              className="pl-9 pr-3 py-2 text-sm border rounded w-full"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 bg-[#E7F3E9]">
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Review</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="flex flex-col px-4 py-3 font-medium text-gray-800">
                  <span className="font-medium text-gray-800">
                    {item.author}
                  </span>
                  <span className="font-medium text-gray-800">
                    {item.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{item.review}</td>
                <td className="px-4 py-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < item.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[#0A8625] text-sm"
                  >
                    <HiOutlineEye className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:scale-110"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
        <span>
          Showing {paginatedData.length} of {allTestimonials.length}{" "}
          testimonials
        </span>
        <div className="flex gap-1 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded text-sm"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === i + 1
                  ? "bg-[#16A34A] text-white"
                  : "text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border rounded text-sm"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTestimonialsModal
          onClose={() => setShowModal(false)}
          mode={mode}
          initialData={selectedTestimonial}
        />
      )}
    </div>
  );
}
