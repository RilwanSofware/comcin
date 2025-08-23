import { FaRegEdit, FaSearch } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import CreateTestimonialsModal from "./CreateTestimonialsModal";

// Status color styles
const statusStyles = {
  pending: "bg-[#FFEDD5] text-[#9A3412]",
  published: "bg-[#DCFCE7] text-[#166534]",
};

export default function TestimonialsTable({ testimonialData }) {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Use API data
  const allTestimonials = Array.isArray(testimonialData?.data)
    ? testimonialData.data.map((item) => ({
        author: item.author_name,
        email: item.author_email,
        review: item.description,
        rating: item.rating,
        status: item.status,
        date: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "",
        createdAt: item.created_at, // keep original for filtering
        id: item.id,
      }))
    : [];

  // Filtering logic
  const filteredTestimonials = allTestimonials.filter((item) => {
    const searchMatch =
      item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.review?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter
      ? item.status?.toLowerCase() === statusFilter.toLowerCase()
      : true;

    // Date filter
    const createdDate = item.createdAt ? new Date(item.createdAt) : null;
    const startMatch = startDate ? createdDate >= new Date(startDate) : true;
    const endMatch = endDate ? createdDate <= new Date(endDate) : true;

    return searchMatch && statusMatch && startMatch && endMatch;
  });

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const paginatedData = filteredTestimonials.slice(
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
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by author or review..."
              className="pl-9 pr-3 py-2 text-sm border rounded w-full"
            />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <select
              className="border px-2 py-2 text-sm rounded text-gray-700"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
            <input
              type="date"
              className="border px-2 py-2 text-sm rounded"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
            />
            <input
              type="date"
              className="border px-2 py-2 text-sm rounded"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="bg-[#0A8625] text-white px-4 py-2 rounded text-sm"
              onClick={() => setCurrentPage(1)}
              type="button"
            >
              Filter
            </button>
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
                  <span>{item.author}</span>
                  <span>{item.email}</span>
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
                <td className="px-4 py-3">
                  <span
                    className={`p-1 px-4 rounded font-semibold ${
                      statusStyles[item.status?.toLowerCase()] || ""
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
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
          Showing {paginatedData.length} of {filteredTestimonials.length}{" "}
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
