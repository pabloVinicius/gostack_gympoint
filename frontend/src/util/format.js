export const formatDecimal = value => {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{1})(\d{2}$)/, '$1,$2');
  console.log('value retorned', value);
  return value;
};

export const formatNumberToString = value => {
  return parseFloat(value).toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatStringToNumber = value => {
  return parseFloat(value.replace(',', '.'));
};
