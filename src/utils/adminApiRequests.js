import { authenticateUser, getCookie } from "./cookieHandler";
//  Set Headers
const headers = new Headers();
headers.append("Content-Type", "application/json");

const setHeaders = () => {
  const headers = new Headers();
  const cookie = getCookie("token");

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${cookie}`);

  return headers;
};

const devAPI = "http://localhost:5050/api";

// const API_BASE_URL = devAPI;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || devAPI;

// Handle fetch request with abort signaling
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

//_____________________________________________________________________________________________________
// API REQUESTS
// Users
//_____________________________________________________________________________________________________

export const getAccountUsers = async (user, signal) => {
  const url = new URL(`${API_BASE_URL}/account/admin/users`);
  // console.log("url", url);

  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: user }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const getUser = async (user, signal) => {
  const url = new URL(`${API_BASE_URL}/users/user${user}`);
  // console.log("url", url);

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, {});
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Checklists
//_____________________________________________________________________________________________________

export const getChecklists = async (params, signal) => {
  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  console.log("params", params);

  // If there are params fetch from route with query
  if (params.users === "any") {
    const url = new URL(
      `${API_BASE_URL}/account/admin/checklists?account=${params.account}&group=${params.users}&page=${params.page}`
    );
    return await fetchJson(url, options, []);
  }
  //   else {
  //     const url = new URL(
  //       `${API_BASE_URL}/checklists?account=${params.account}&user=${params.users}&page=${params.page}`
  //     );
  //     return await fetchJson(url, options, []);
  //   }
};

export const getCount = async (params, signal) => {
  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  // console.log("params", params);

  // If there are params fetch from route with query
  if (params.users === "any") {
    const url = new URL(
      `${API_BASE_URL}/checklists/count?account=${params.account}&group=${params.users}&page=${params.page}&count=${params.count}`
    );
    return await fetchJson(url, options, []);
  } else {
    const url = new URL(
      `${API_BASE_URL}/checklists/count?account=${params.account}&user=${params.users}&page=${params.page}`
    );
    return await fetchJson(url, options, []);
  }
};

export const readChecklist = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/checklists/${params}`);

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const generateChecklistCSV = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/account/admin/checklists/download/csv`);

  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: params }),
    signal,
  };

  return await fetchJson(url, options, []);
};
