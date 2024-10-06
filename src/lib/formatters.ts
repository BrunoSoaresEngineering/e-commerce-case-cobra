const NUMBER_FORMATTER = new Intl.NumberFormat('pt-PT');

function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-PT', {
  currency: 'EUR',
  style: 'currency',
});

function formatCurrency(price: number) {
  return CURRENCY_FORMATTER.format(price);
}

export {
  formatNumber,
  formatCurrency,
};
