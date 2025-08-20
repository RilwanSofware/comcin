import React from "react";
import { Link } from "react-router-dom";

export default function PendingLevies({ levies }) {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4 p-4 pb-2 border-b border-[#E9EEEA]">
        <div className="">
          <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
            Pending Levies
          </h3>
          <p className="text-[#B20B0B] text-sm">
            {levies.length} Total Pending Levies
          </p>
        </div>
        <Link
        to="/dashboard/finacials"
         className="border bg-white border-[#0A8625] z-10 px-4 py-2 rounded text-xs font-bold text-[#0A8625] ">
          View all
        </Link>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#E7F3E9] rounded-lg">
            <tr>
              <TableHeader>LEVY NAME</TableHeader>
              <TableHeader>AMOUNT (N)</TableHeader>
              <TableHeader>DUE DATE</TableHeader>
              <TableHeader>STATUS</TableHeader>
              <TableHeader>ACTION</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {levies.map((levy, index) => (
              <TableRow key={index} levy={levy} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableRow = ({ levy }) => (
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
    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
      {levy.status}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <button className="px-4 py-2 bg-[#0A8625] text-white rounded hover:bg-green-700 transition-colors">
        Pay Now
      </button>
    </td>
  </tr>
);
