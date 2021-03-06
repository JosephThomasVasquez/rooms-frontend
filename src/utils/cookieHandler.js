import cookie from "js-cookie";

// Set cookie
export const setCookie = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, { expires: 1 });
  }
};

// Remove cookie
export const removeCookie = (key) => {
  if (window !== undefined) {
    cookie.remove(key);
  }
};

// Get cookie
export const getCookie = (key) => {
  if (window !== undefined) {
    return cookie.get(key);
  }
};

// Set localStorage cookie
export const setLocalStorageCookie = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove localStorage cookie
export const removeLocalStorageCookie = (key) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

// Authenticate user - set localStorage and cookie
export const authenticateUser = (response, next) => {
  //   console.log("Authenticate sign in response", response);
  setCookie("token", response.token);
  setLocalStorageCookie("user", response);
  next();
};

// Check if token and user exists
export const isAuthenticated = () => {
  if (window !== undefined) {
    const verifyCookie = getCookie("token");
    // console.log("verifyCookie:", verifyCookie);

    if (verifyCookie) {
      const user = localStorage.getItem("user");

      if (user) {
        // console.log("Check if authenticated", user);
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
