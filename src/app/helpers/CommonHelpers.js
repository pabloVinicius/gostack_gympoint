export const haveAtLeastOneParameter = (fields, body) => {
  const parameters = body ? Object.keys(body) : [];
  const intersection = fields.filter(el => parameters.includes(el));

  return intersection.length > 0;
};
