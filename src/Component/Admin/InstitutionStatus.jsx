export default function InstitutionStatus({ status, statusValue }) {
  const statuses = [
    {
      label: "Active Members",
      count: statusValue?.active_members,
      percent: status?.active_members_percentage,
      color: "bg-[#22C55E]",
    },
    {
      label: "Pending Approval",
      count: statusValue?.pending_applications,
      percent: status?.pending_approvals_percentage,
      color: "bg-[#F97316]",
    },
    {
      label: "Under Review",
      count: statusValue?.pending_applications,
      percent: status?.under_review_percentage,
      color: "bg-[#3B82F6]",
    },
    {
      label: "Suspended",
      count: statusValue?.pending_applications,
      percent: status?.suspended_members_percentage,
      color: "bg-[#EF4444]",
    },
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
