export const handleDateChange = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
    dateObj.getHours()
  ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
};
