import { useState } from "react";
import {
  FaCheckCircle,
  FaRegClock,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import EditUserModals from "./EditUserModals";

export default function AdminUsersTable({
  allUsers,
  currentPage,
  itemsPerPage,
  handlePageChange,
  setCurrentPage,
  refetch,
}) {
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  console.log(allUsers, "allusers");

  const usersArray = Array.isArray(allUsers?.data) ? allUsers.data : [];

  const filteredUsers = usersArray.filter((p) => {
    const searchMatch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter ? p.type === typeFilter : true;
    const categoryMatch = categoryFilter ? p.category === categoryFilter : true;
    const statusMatch = statusFilter ? p.status === statusFilter : true;
    return searchMatch && typeMatch && categoryMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg pb-2">
      {/* Title */}
      <div className="flex gap-4 px-4 pb-2 pt-4 border-b">
        <h2 className="font-maven font-medium">Users List</h2>
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
              <option value="Paid">Active</option>
              <option value="Pending">Inactive</option>
              <option value="Overdue">Suspended</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 bg-[#E7F3E9]">
            <th className="px-4 py-2"> Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Last Activity</th>
            <th className="px-4 py-2">Created on</th>
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
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500">{item.email}</span>
                    <span className="text-sm text-gray-500 uppercase">
                      {item.state}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">{item.role}</span>
                </td>
                <td className="px-4 py-3 capitalize">{item.lastActivity}</td>
                <td className="px-4 py-3">{item.createdOn}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedUser(item)}
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
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} Admin Users
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
      {selectedUser && (
        <EditUserModals
          user={selectedUser}
          refetch={refetch}
          onClose={() => setSelectedUser(null)}
        />
      )}{" "}
    </div>
  );
}
