const currencyFormatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
	return currencyFormatter.format(amount);
}
