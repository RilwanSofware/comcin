import {
  FaCheckCircle,
  FaRegClock,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import ViewIntituition from "./ViewIntituition";

export default function InstitutionTable({ membersList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedInstituition, setSelectedInstituition] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const handleView = (item) => {
    setSelectedInstituition(item);
    setShowModal(true);
  };
  // Filter logic
  const filteredPayments = membersList.filter((p) => {
    const searchMatch =
      p.institution_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.registration_number.toLowerCase().includes(searchTerm.toLowerCase());

    const typeMatch = typeFilter ? p.institution_type === typeFilter : true;
    const categoryMatch = categoryFilter
      ? p.category_type === categoryFilter
      : true;
    const statusMatch = statusFilter ? p.status === statusFilter : true;

    return searchMatch && typeMatch && categoryMatch && statusMatch;
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

  return (
    <div className="bg-white rounded-lg pb-2">
      {/* Title */}
      <div className="flex gap-4 px-4 pb-2 pt-4 border-b">
        <h2 className="font-maven font-medium">Members List</h2>
      </div>

      {/* Filters */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {/* Search */}
          <div className="relative w-96">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by institution name or registration number..."
              className="pl-9 pr-3 py-2 text-sm border rounded w-full"
            />
          </div>

          {/* Select Filters */}
          <div className="flex gap-2 items-center flex-wrap">
            <select
              className="border px-2 py-2 text-sm rounded text-gray-700"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Institution Type</option>
              <option value="Cooperative Society">Cooperative Society</option>
              <option value="Microfinance Bank">Microfinance Bank</option>
            </select>

            <select
              className="border px-2 py-2 text-sm rounded text-gray-700"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="state">State</option>
              <option value="federal">Federal</option>
            </select>

            <select
              className="border px-2 py-2 text-sm rounded text-gray-700"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 bg-[#E7F3E9]">
            <th className="px-4 py-2">Institution Name</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Submission Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.institution_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.user?.email}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.registration_number}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {item.institution_type}
                  </span>
                </td>
                <td className="px-4 py-3 capitalize">{item.operating_state}</td>
                <td className="px-4 py-3 capitalize">{item.category_type}</td>
                <td className="px-4 py-3">
                  {" "}
                  {new Date(item.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleView(item)}
                    className="text-[#0A8625] text-sm"
                  >
                    <HiOutlineEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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
        <ViewIntituition
          initialData={selectedInstituition}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
