// components/RecentApplications.jsx
export default function RecentApplications() {
  const applications = [
    {
      name: "Zenith Microfinance Bank",
      email: "Zenith@test.com",
      type: "Microfinance Institution",
      status: "Pending Review",
      date: "15 Jun 2025",
    },
    {
      name: "Unity Cooperative Society",
      email: "Zenith@test.com",

      type: "Cooperative Society",
      status: "Under Verification",
      date: "13 Jun 2025",
    },
    {
      name: "First City Microfinance",
      email: "Zenith@test.com",

      type: "Microfinance Institution",
      status: "Approved",
      date: "10 Jun 2025",
    },
    {
      name: "Lagos State Cooperative",
      email: "Zenith@test.com",

      type: "Cooperative Society",
      status: "Pending Review",
      date: "27 July 2025",
    },
  ];

  return (
    <div className="bg-white rounded-lg pb-2">
      <div className="flex border-b p-4 justify-between items-center">
        <h3 className="text-xl font-maven font-medium text-[#1E1E1E]">
          Recent Application
        </h3>
        <button className="text-sm text-green-700 hover:underline">
          View All
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
          {applications.map((item, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.email}</span>
                </div>
              </td>

              <td className="px-4 py-3">{item.type}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending Review"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3">
                <button className="text-green-600 text-sm hover:underline">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
