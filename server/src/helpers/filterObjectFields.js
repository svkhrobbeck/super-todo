const filterObjectFields = (data, ...keys) => {
  const obj = JSON.parse(JSON.stringify(data));
  keys.forEach(key => delete obj[key]);

  return obj;
};

export default filterObjectFields;
