import { FaSearch } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

export default function AdminFinanceTable() {
  const allPayments = [
    {
      institutionName: "Lagos State Cooperative Federation",
      type: "Cooperative Society",
      recordId: "ID:TXN-2024-001",
      paymentType: "Annual Levy",
      method: "Bank Transfer",
      status: "Paid",
      amount: "450",
      category: "state",
      date: "1/31/2024",
    },
    {
      institutionName: "First City Microfinance Bank",
      type: "Microfinance Bank",
      recordId: "ID:TXN-2024-001",
      paymentType: "Annual Levy",
      method: "Bank Transfer",
      status: "Pending",
      amount: "450",
      category: "state",
      date: "2/01/2024",
    },
    {
      institutionName: "Abuja Municipal Thrift Society",
      paymentType: "Annual Levy",
      method: "Bank Transfer",
      type: "Cooperative Society",
      recordId: "ID:TXN-2024-001",
      status: "Overdue",
      amount: "450",
      category: "state",
      date: "2/02/2024",
    },
    {
      institutionName: "Kano Farmers Cooperative Union",
      paymentType: "Annual Levy",
      method: "Bank Transfer",
      type: "Cooperative Society",
      recordId: "ID:TXN-2024-001",
      status: "Failed",
      amount: "450",
      category: "state",
      date: "2/03/2024",
    },
  ];

  const invoiceList = [
    {
      title: "South south Team Bonding",
      type: "Cooperative Society",
      assignedTo: "Jane Doe",
      amount: "₦50,000",
      status: "Pending",
      duration: "30 days",
    },
    {
      title: "South south Team Bonding",
      type: "Cooperative Society",
      assignedTo: "John Smith",
      amount: "₦35,000",
      status: "Paid",
      duration: "15 days",
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredPayments =
    activeTab === "pending"
      ? allPayments.filter((p) => p.status === "Pending")
      : allPayments;

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
    <div className="bg-white rounded-lg pb-4">
      {/* Tabs & Create Invoice Button */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 text-sm ${
              activeTab === "all"
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "text-gray-600"
            }`}
          >
            All Payments
          </button>
          <button
            onClick={() => setActiveTab("invoice")}
            className={`pb-2 text-sm ${
              activeTab === "invoice"
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "text-gray-600"
            }`}
          >
            Invoice
          </button>
        </div>

        {activeTab === "invoice" && (
          <button className="flex items-center gap-2 bg-[#0A8625] text-white px-4 py-2 rounded text-sm">
            <FiPlusCircle />
            Create Invoice
          </button>
        )}
      </div>

      {/* Filters Shared */}
      {["all", "invoice"].includes(activeTab) && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="relative w-96">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder={
                  activeTab === "all"
                    ? "Search by institution name or registration number..."
                    : "Search invoice title or assignee..."
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
      )}

      {/* Table Area */}
      <div className="overflow-x-auto">
        {activeTab === "all" ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 bg-[#E7F3E9]">
                <th className="px-4 py-2">Institution Details</th>
                <th className="px-4 py-2">Payment Information</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Dates</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {item.institutionName}
                      </span>
                      <span className="text-xs text-gray-500">{item.type}</span>
                      <span className="text-xs text-gray-500">
                        {item.recordId}
                      </span>
                    </div>
                  </td>
                  <td className="flex flex-col px-4 py-3">
                    <span className="font-medium text-gray-800">
                      {item.paymentType}
                    </span>
                    <span className="text-xs text-gray-500">{item.method}</span>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.amount}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[#0A8625] text-sm">
                      <HiOutlineEye className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 bg-[#E7F3E9]">
                <th className="px-4 py-2">Invoice Title</th>
                <th className="px-4 py-2">Assigned To</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {invoice.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {invoice.type}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">{invoice.type}</td>
                  <td className="px-4 py-3">{invoice.amount}</td>
                  <td className="px-4 py-3">{invoice.status}</td>
                  <td className="px-4 py-3">{invoice.duration}</td>
                  <td className="px-4 py-3">
                    <button className="text-[#0A8625] text-sm">
                      <HiOutlineEye className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination (only for payments) */}
      {activeTab === "all" && (
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
      )}
    </div>
  );
}
