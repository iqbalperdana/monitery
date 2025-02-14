const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDate(date);
};

export { formatDate, formatDateString };
