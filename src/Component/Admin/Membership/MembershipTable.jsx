import {
  FaCheckCircle,
  FaRegClock,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import ApplicationModal from "./ApplicationModal";
import { statusStyles } from "@/utils";

export default function MembershipTable({ data, refetch }) {
  const [activeTab, setActiveTab] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applications =
    activeTab === "pending"
      ? data?.pending_applications || []
      : data?.all_applications || [];

  // Filtering logic
  const filteredApplications = applications.filter((item) => {
    // Search by institution name or registration number
    const searchMatch =
      item.institution_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.registration_number?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const statusMatch = statusFilter
      ? item.status?.toLowerCase() === statusFilter.toLowerCase()
      : true;

    // Date filter
    const createdDate = item.created_at
      ? new Date(item.created_at)
      : null;
    const startMatch = startDate ? createdDate >= new Date(startDate) : true;
    const endMatch = endDate ? createdDate <= new Date(endDate) : true;

    return searchMatch && statusMatch && startMatch && endMatch;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedData = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApplicationModal = (item) => {
    setSelectedApplication(item);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg pb-2">
      {/* Toggle Tabs */}
      <div className="flex gap-4 px-4 pt-4 border-b">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 text-sm ${
            activeTab === "pending"
              ? "border-b-2 border-green-600 text-green-600 font-medium"
              : "text-gray-600"
          }`}
        >
          Pending Applications
        </button>
        <button
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          className={`pb-2 text-sm ${
            activeTab === "all"
              ? "border-b-2 border-green-600 text-green-600 font-medium"
              : "text-gray-600"
          }`}
        >
          All Applications
        </button>
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
              placeholder="Search by institution name or registration number..."
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
              <option value="Approved">Approved</option>
              <option value="Rejected">Reject</option>
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
          {paginatedData.map((item, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {item.institution_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {" "}
                    {item.user?.email}
                  </span>
                  <span className="text-xs text-gray-500">
                    {" "}
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
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className={`px-4 py-3`}>
                <span
                  className={`p-1 px-4 rounded ${ 
                    statusStyles[item.status?.toLowerCase()] || ""
                  } `}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleApplicationModal(item)}
                  className="text-[#0A8625] text-sm"
                >
                  <HiOutlineEye className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Summary */}
      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of{" "}
          {filteredApplications.length} applications
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
        <ApplicationModal
          onClose={() => setShowModal(false)}
          initialData={selectedApplication}
          refetch={refetch}
        />
      )}
    </div>
  );
}