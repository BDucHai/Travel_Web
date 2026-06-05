// utils/session.js

export const setSession = (user) => {
  const expiry = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; 
  const data = { user, expiry };
  localStorage.setItem("session", JSON.stringify(data));
};

export const getSession = () => {
  const data = JSON.parse(localStorage.getItem("session"));
  if (!data) return null;
  if (new Date().getTime() > data.expiry) {
    localStorage.removeItem("session");
    return null;
  }
  return data.user;
};

export const clearSession = () => {
  localStorage.removeItem("session");
};
