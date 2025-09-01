import { FaRegEdit, FaSearch } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import CreateNewsModal from "./CreateNewsModal";
import {
  useCreateContentMutation,
  useDeleteContentMutation,
  useGetContentQuery,
} from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function NewsTable() {
  const { data, refetch } = useGetContentQuery();
  const [deleteContent] = useDeleteContentMutation();

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // "create" or "edit"
  const [selectedNews, setSelectedNews] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = data || [];

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

  const handleCreate = () => {
    setMode("create");
    setSelectedNews(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setMode("edit");
    setSelectedNews(item);
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        const res = await deleteContent(item.id);
        toast.success("News deleted successfully");
        console.log(res, "Delete Response");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4">
      {/* Tabs & Create Invoice Button */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-[#1E1E1E] text-xl font-medium font-maven">
          News & Announcements{" "}
        </h2>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#0A8625] text-white px-4 py-2 rounded text-sm"
        >
          <FiPlusCircle />
          Create News
        </button>
      </div>

      {/* Filters Shared */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="relative w-96">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={
                "Search by institution name or registration number..."
              }
              className="pl-9 pr-3 py-2 text-sm border rounded w-full"
            />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <select className="border px-2 py-2 text-sm rounded text-gray-700">
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Failed">Failed</option>
            </select>

            <select className="border px-2 py-2 text-sm rounded text-gray-700">
              <option value="">All Payment Type</option>
              <option value="Annual Levy">Annual Levy</option>
              <option value="Registration Fee">Registration Fee</option>
            </select>

            <input type="date" className="border px-2 py-2 text-sm rounded" />
            <input type="date" className="border px-2 py-2 text-sm rounded" />
            <button className="bg-[#0A8625] text-white px-4 py-2 rounded text-sm">
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
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </td>
                <td className="flex flex-col px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">
                  {new Date(item.created_at).toDateString()}
                </td>
                <td className="px-4 py-3 flex justify-start gap-3">
                  {/* <button className="text-[#0A8625] text-sm">
                    <HiOutlineEye className="text-xl" />
                  </button> */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:scale-110"
                  >
                    <FaRegEdit className="text-xl" />
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

      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
        <span>
          Showing 1 to {filteredPayments.length} of {filteredPayments.length}{" "}
          applications
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
        <CreateNewsModal
          onClose={() => setShowModal(false)}
          mode={mode}
          initialData={selectedNews}
          refetch={refetch}
        />
      )}
    </div>
  );
}
