export default function InstitutionStatus() {
  const statuses = [
    { label: "Active Members", count: 189, percent: 65, color: "bg-[#22C55E]" },
    {
      label: "Pending Approval",
      count: 23,
      percent: 15,
      color: "bg-[#F97316]",
    },
    { label: "Under Review", count: 18, percent: 12, color: "bg-[#3B82F6]" },
    { label: "Suspended", count: 17, percent: 8, color: "bg-[#EF4444]" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-[0_1px_2px_0_#0000000D]">
      <h3 className="font-medium text-gray-700 mb-3">Institution Status</h3>

      {/* List of labels and counts */}
      <ul className="space-y-2 text-sm mb-6">
        {statuses.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              {item.label}
            </span>
            <span className="font-semibold">
              {item.count}
              <span className="text-xs font-normal text-gray-500 ml-1">
                ({item.percent}%)
              </span>
            </span>{" "}
          </li>
        ))}
      </ul>

      {/* Progress bars for each status */}
      <div className="space-y-4">
        {statuses.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center text-sm text-gray-700 mb-1 px-1">
              <span className="font-medium">{item.label}</span>
              <span className="text-xs font-normal">{item.percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
