import { FaCheckCircle, FaRegClock, FaInfoCircle } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

export default function PaymentOverview({ transactions }) {
  const payments = [
    {
      institution: "Lagos State Cooperative",
      memberType: "Federal Member",
      taxId: 12345,
      paymentType: "Bank Transfer",

      type: "Annual Levy",
      status: "Paid",
      paid: "1/15/2024",
      due: "1/31/2024",
    },
    {
      institution: "First City Microfinance Bank",
      memberType: "National Member",
      taxId: 145,
      paymentType: "Online Payment",

      type: "Membership Fee",
      status: "Pending",
      due: "2/15/2024",
    },
    {
      institution: "Abuja Municipal Thrift",
      memberType: "National Member",
      paymentType: "Bank Draft",
      type: "Registration Fee",
      taxId: 125,

      status: "Overdue",
      due: "1/20/2024",
    },
    {
      institution: "Abuja Municipal Thrift",
      memberType: "National Member",
      paymentType: "Bank Draft",
      type: "Registration Fee",
      taxId: 125,

      status: "Failed",
      due: "1/20/2024",
    },
  ];

  return (
    <div className="bg-white rounded-lg pb-2">
      <div className="flex border-b p-4 justify-between items-center">
        <h3 className="text-xl font-maven font-medium text-[#1E1E1E]">
          Payment Overview
        </h3>
        <button className="text-sm text-green-700 hover:underline">
          View All Payment
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 bg-[#E7F3E9]">
            <th className="px-4 py-2">Institution</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {item.institution}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.memberType}
                  </span>
                  <span className="text-xs text-gray-500">{item.taxId}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.type}</span>
                  <span className="text-xs text-gray-500">
                    {item.paymentType}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${
                    item.status === "Paid"
                      ? "bg-[#DCFCE7] text-[#166534]"
                      : item.status === "Pending"
                      ? "bg-[#FEF9C3] text-[#854D0E]"
                      : item.status === "Overdue"
                      ? "bg-[#FEE2E2] text-[#991B1B]"
                      : "bg-[#F3F4F6] text-[#1F2937]"
                  }`}
                >
                  {item.status === "Paid" && (
                    <FaCheckCircle className="text-sm" />
                  )}
                  {item.status === "Pending" && (
                    <FaRegClock className="text-sm" />
                  )}
                  {item.status === "Overdue" && (
                    <FaInfoCircle className="text-sm" />
                  )}
                  {item.status === "Failed" && <MdCancel className="text-sm" />}
                  {item.status}
                </span>
              </td>

              <td>{item.paid ? `Paid: ${item.paid}` : `Due: ${item.due}`}</td>
              <td className="px-4 py-3 text-center">
                <button className="text-green-600 text-sm">
                  <HiOutlineEye className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
