export const setCookie = (name, value, expireDays = 1) => {
  const cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  const days = Date.now() + expireDays * 1000 * 60 * 60 * 24;

  const expirationDate = new Date(days).toUTCString();
  const expiration = `; expires=${expirationDate}`;

  document.cookie = `${cookie}${expiration}; path=/`;
};

export const getCookie = (key, all = false) => {
  const cookies = document.cookie.split(" ");
  const obj = {};

  cookies.forEach(cookie => {
    const [key, value] = cookie.split("=");
    obj[key] = value?.trim();
  });

  if (all) return obj;
  return obj[key] || null;
};
