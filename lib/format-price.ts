export function formatPrice(currency: string, amount: string) {
  const symbol = currency === "GHS" ? "₵" : currency;
  const num = parseFloat(amount);
  return `${symbol}${num.toLocaleString("en-GH", { minimumFractionDigits: num % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
