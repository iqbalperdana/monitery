const formatNumberToCurrencyString = (number: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export { formatNumberToCurrencyString };
