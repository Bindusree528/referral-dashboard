export const formatDate = (dateString) => {
  return dateString.replaceAll("-", "/");
};

export const formatProfit = (amount) => {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  ).format(amount);
};