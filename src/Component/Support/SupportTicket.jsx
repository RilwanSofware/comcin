import React, { useState } from "react";
import { TbReceipt2 } from "react-icons/tb";

export default function SupportTicket() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Unified data with mixed statuses
  const tickets = [
    ...Array(5).fill({
      name: "TCK-1001",
      amount: "Unable to login",
      dueDate: "10 JULY 2025",
      status: "Pending",
    }),
    ...Array(5).fill({
      name: "TCK-1002",
      amount: "Issue with payment",
      dueDate: "12 JULY 2025",
      status: "Resolved",
    }),
    ...Array(4).fill({
      name: "TCK-1003",
      amount: "Wrong info in profile",
      dueDate: "08 JULY 2025",
      status: "Cancelled",
    }),
  ];

  // --- Search, Sort, Paginate ---
  const filteredTickets = tickets.filter((ticket) =>
    ticket.amount.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOption === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const paginatedTickets = sortedTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-[#E9EEEA] p-4 pt-3">
            <div>
              <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
                My Support Tickets
              </h3>
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
            <div className="h-[400px] overflow-y-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#E7F3E9] sticky top-0 z-10">
                  <tr>
                    <TableHeader>Ticket ID</TableHeader>
                    <TableHeader>Subject</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedTickets.length ? (
                    paginatedTickets.map((ticket, index) => (
                      <TableRow key={index} ticket={ticket} />
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

const TableRow = ({ ticket }) => {
  const statusColor =
    {
      Resolved: "text-[#0A8625]",
      Pending: "text-[#F3AB11]",
      Cancelled: "text-[#B20B0B]",
    }[ticket.status] || "text-gray-500";

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
        {ticket.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
        {ticket.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
        {ticket.dueDate}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor}`}
      >
        {ticket.status}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="px-4 py-2 bg-white border border-[#0A8625] text-[#0A8625] rounded transition-colors">
          View
        </button>
      </td>
    </tr>
  );
};
