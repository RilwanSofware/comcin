import { FaRegEdit, FaSearch } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import CreateNewsModal from "../News/CreateNewsModal";
import SupportRequestModal from "./SupportRequestModal";
import { useGetAdminSupportQuery } from "@/services/admin-dashboard/dashboard";

// Status color styles
const statusStyles = {
  pending: "bg-[#FFEDD5] text-[#9A3412]",
  resolved: "bg-[#DCFCE7] text-[#166534]",
  cancelled: "bg-[#FEE2E2] text-[#991B1B]",
};

export default function SupportTable({ supportData }) {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedSupport, setSelectedSupport] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filtering logic
  const filteredPayments = (supportData?.data || []).filter((item) => {
    // Search by name, user_id, or message
    const searchMatch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_id?.toString().includes(searchTerm) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const statusMatch = statusFilter
      ? item.status?.toLowerCase() === statusFilter.toLowerCase()
      : true;

    // Date filter
    const createdDate = item.created_at ? new Date(item.created_at) : null;
    const startMatch = startDate ? createdDate >= new Date(startDate) : true;
    const endMatch = endDate ? createdDate <= new Date(endDate) : true;

    return searchMatch && statusMatch && startMatch && endMatch;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedData = filteredPayments.slice(
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
    setSelectedSupport(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      console.log("Deleted:", item);
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4">
      {/* Tabs & Create Invoice Button */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-[#1E1E1E] text-xl font-medium font-maven">
          Supports Management
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
              placeholder="Search by name, user ID or message..."
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
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Cancelled">Cancelled</option>
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

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 bg-[#E7F3E9]">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="px-4 py-3 flex flex-col">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="font-medium text-gray-800">
                    #{item.user_id}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {item.message}
                  </span>
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
                <td className="px-4 py-3">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-3 flex justify-start gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[#0A8625] text-sm"
                  >
                    <HiOutlineEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} applications
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

      {showModal && (
        <SupportRequestModal
          onClose={() => setShowModal(false)}
          mode={mode}
          initialData={selectedSupport}
        />
      )}
    </div>
  );
}