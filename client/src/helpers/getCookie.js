const getCookie = key => {
  const cookies = document.cookie.split(" ");
  const obj = {};

  cookies.forEach(cookie => {
    const [key, value] = cookie.split("=");
    obj[key] = value;
  });

  return obj[key] || null;
};
