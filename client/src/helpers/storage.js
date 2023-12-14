const storage = {
  get(key, isSession = false) {
    if (isSession) return JSON.parse(sessionStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, value, isSession = false) {
    if (isSession) return sessionStorage.setItem(key, JSON.stringify(value));
    return localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key, isSession = false) {
    if (isSession) sessionStorage.removeItem(key);
    else localStorage.removeItem(key);
  },
  clear(isSession = false) {
    if (isSession) sessionStorage.clear();
    else localStorage.clear();
  },
};

export default storage;
