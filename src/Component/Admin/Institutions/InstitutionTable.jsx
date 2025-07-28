import {
    FaCheckCircle,
    FaRegClock,
    FaInfoCircle,
    FaSearch,
  } from "react-icons/fa";
  import { HiOutlineEye } from "react-icons/hi";
  import { MdCancel } from "react-icons/md";
  import { useState } from "react";
  
  export default function InstitutionTable() {
    const allPayments = [
      {
        institutionName: "Lagos State Cooperative",
        type: "Cooperative Society",
        recordId: "COOP/LAG/2024/156",
        email: "admin@test.com",
        status: "Paid",
        state: "lagos",
        category: "state",
        submissionDate: "1/31/2024",
      },
      {
        institutionName: "Zenith MFB",
        type: "Microfinance Bank",
        recordId: "MFB/LAG/2024/157",
        email: "zenith@test.com",
        status: "Pending",
        state: "lagos",
        category: "state",
        submissionDate: "2/01/2024",
      },
      {
        institutionName: "Heritage Coop",
        email: "heritage@test.com",
        type: "Cooperative Society",
        recordId: "COOP/LAG/2024/158",
        status: "Overdue",
        state: "lagos",
        category: "state",
        submissionDate: "2/02/2024",
      },
      {
        institutionName: "ABC Society",
        email: "abc@test.com",
        type: "Cooperative Society",
        recordId: "COOP/LAG/2024/159",
        status: "Failed",
        state: "lagos",
        category: "federal",
        submissionDate: "2/03/2024",
      },
    ];
  
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  
    // Filter logic
    const filteredPayments = allPayments.filter((p) => {
      const searchMatch =
        p.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.recordId.toLowerCase().includes(searchTerm.toLowerCase());
  
      const typeMatch = typeFilter ? p.type === typeFilter : true;
      const categoryMatch = categoryFilter ? p.category === categoryFilter : true;
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
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Failed">Failed</option>
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
                        {item.institutionName}
                      </span>
                      <span className="text-xs text-gray-500">{item.email}</span>
                      <span className="text-xs text-gray-500">
                        {item.recordId}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-800">{item.type}</span>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.state}</td>
                  <td className="px-4 py-3 capitalize">{item.category}</td>
                  <td className="px-4 py-3">{item.submissionDate}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[#0A8625] text-sm">
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
      </div>
    );
  }
  