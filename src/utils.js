// Utility function
export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0]) // take first letter of each word
    .join("")
    .toUpperCase();
};
