const NUMBER_FORMATTER = new Intl.NumberFormat('pt-PT');

function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export {
  formatNumber,
};
