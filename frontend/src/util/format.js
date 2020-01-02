export const formatDecimal = value => {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{1})(\d{2}$)/, '$1,$2');
  return value;
};
