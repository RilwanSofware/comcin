// Utility function
export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0]) // take first letter of each word
    .join("")
    .toUpperCase();
};


export const statusStyles = {
  pending: "bg-[#FFEDD5] text-[#9A3412]",
  approved: "bg-[#DCFCE7] text-[#166534]",
  rejected: "bg-[#FEE2E2] text-[#991B1B]",
};