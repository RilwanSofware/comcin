import React, { useState } from "react";
import { TbReceipt2 } from "react-icons/tb";
import { useGetMemberDashboardFinacialsQuery } from "@/services/members/dashboardmember";
import Loader from "@/Component/Loader";

export default function Financials() {
  const { data, isLoading } = useGetMemberDashboardFinacialsQuery();
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <Loader />;

  // ✅ Pick correct list from API
  const levies =
    activeTab === "pending" ? data?.pending_charges || [] : data?.paid_charges || [];

  // --- Search, Sort, Paginate ---
  const filteredLevies = levies.filter((levy) =>
    levy.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedLevies = [...filteredLevies].sort((a, b) => {
    if (sortOption === "amount") return b.amount - a.amount;
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
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
            Financials
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

          {/* Table */}
          <div className="overflow-x-auto p-4">
            <div className="h-[400px] overflow-y-auto rounded-lg border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#E7F3E9] sticky top-0 z-10">
                  <tr>
                    <TableHeader>LEVY NAME</TableHeader>
                    <TableHeader>AMOUNT (₦)</TableHeader>
                    <TableHeader>DUE DATE</TableHeader>
                    <TableHeader>STATUS</TableHeader>
                    <TableHeader>ACTION</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedLevies.length ? (
                    paginatedLevies.map((levy) => (
                      <TableRow key={levy.id} levy={levy} activeTab={activeTab} />
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
      {levy.title}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
      ₦{levy.amount}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]">
      {new Date(levy.due_date).toLocaleDateString()}
    </td>
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
        levy.status === "unpaid" ? "text-red-600" : "text-green-600"
      }`}
    >
      {levy.status.toUpperCase()}
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
