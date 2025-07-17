import React, { useState } from "react";
import { TbReceipt2 } from "react-icons/tb";

export default function Finacials() {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const pendingLevies = Array(14).fill({
    name: "Annual Membership Levy",
    amount: 5000,
    dueDate: "15 JUNE 2025",
    status: "UNPAID",
  });

  const paidLevies = Array(6).fill({
    name: "Development Fee",
    amount: 3000,
    dueDate: "02 MARCH 2025",
    status: "PAID",
  });

  const levies = activeTab === "pending" ? pendingLevies : paidLevies;

  // --- Search, Sort, Paginate ---
  const filteredLevies = levies.filter((levy) =>
    levy.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedLevies = [...filteredLevies].sort((a, b) => {
    if (sortOption === "amount") return b.amount - a.amount;
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOption === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedLevies.length / itemsPerPage);
  const paginatedLevies = sortedLevies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setSortOption("newest");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex gap-5 items-center mb-4 px-4">
          <TbReceipt2 className="text-2xl" />
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Finacials
          </h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg">
          <div className="border-b border-[#E9EEEA] px-4 pt-4">
            <div className="flex gap-6">
              {["pending", "paid"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-sm font-medium ${
                    activeTab === tab
                      ? "text-[#0A8625] border-b-2 border-[#0A8625]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === "pending" ? "Pending Levies" : "Paid Levies"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-[#E9EEEA] p-4 pt-3">
            <div>
              <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
                {activeTab === "pending" ? "Pending Levies" : "Paid Levies"}
              </h3>
              <p
                className={`text-sm ${
                  activeTab === "pending" ? "text-[#B20B0B]" : "text-[#0A8625]"
                }`}
              >
                {filteredLevies.length} Total{" "}
                {activeTab === "pending" ? "Pending" : "Paid"} Levies
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                className="border border-[#E9EEEA] rounded px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#0A8625]"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-[#E9EEEA] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A8625]"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="amount">Sort by: Amount</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-4">
            <div className="h-[400px] overflow-y-auto rounded-lg border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#E7F3E9] sticky top-0 z-10">
                  <tr>
                    <TableHeader>LEVY NAME</TableHeader>
                    <TableHeader>AMOUNT (N)</TableHeader>
                    <TableHeader>DUE DATE</TableHeader>
                    <TableHeader>STATUS</TableHeader>
                    <TableHeader>ACTION</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedLevies.length ? (
                    paginatedLevies.map((levy, index) => (
                      <TableRow key={index} levy={levy} activeTab={activeTab} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 pb-4">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-30"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableRow = ({ levy, activeTab }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
      {levy.name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
      {levy.amount}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
      {levy.dueDate}
    </td>
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
        levy.status === "UNPAID" ? "text-red-600" : "text-green-600"
      }`}
    >
      {levy.status}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      {activeTab === "pending" ? (
        <button className="px-4 py-2 bg-[#0A8625] text-white rounded hover:bg-green-700 transition-colors">
          Pay Now
        </button>
      ) : (
        <span className="text-xs text-gray-400">Paid</span>
      )}
    </td>
  </tr>
);
