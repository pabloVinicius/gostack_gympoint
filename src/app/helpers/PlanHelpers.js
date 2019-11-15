export const convertCentsToMoney = (value, decimal = ',', thousand = '.') =>
  `${parseFloat(value / 100)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('.', '%')
    .replace(',', thousand)
    .replace('%', decimal)}`;
