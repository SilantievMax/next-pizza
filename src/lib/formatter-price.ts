export const formatterPrice = (number: number): string => {
  const formatter = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol' });

  return formatter.format(number);
};
