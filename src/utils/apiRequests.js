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

const API_BASE_URL = devAPI;
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || devAPI;

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

export const loginUser = async (user, signal) => {
  const url = new URL(`${API_BASE_URL}/users/login`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    withCredentials: true,
    signal,
  };

  return await fetchJson(url, options, {});
};

export const signupUser = async (user, signal) => {
  const url = new URL(`${API_BASE_URL}/users`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    withCredentials: true,
    signal,
  };

  return await fetchJson(url, options, {});
};

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
// Rooms
//_____________________________________________________________________________________________________

export const getRooms = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/rooms?user=${params}`);

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, []);
};

export const createRoom = async (room, signal) => {
  const url = new URL(`${API_BASE_URL}/rooms`);

  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: room }),
    signal,
  };

  return await fetchJson(url, options, []);
};

export const readRoom = async (roomId, signal) => {
  const url = new URL(`${API_BASE_URL}/rooms/${roomId}`);

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateRoom = async (room, signal) => {
  const url = new URL(`${API_BASE_URL}/rooms/${room.id}`);

  const options = {
    method: "PUT",
    headers: setHeaders(),
    body: JSON.stringify({ data: room }),
    signal,
  };

  return await fetchJson(url, options, {});
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Buildings
//_____________________________________________________________________________________________________

export const getBuildings = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/buildings`);
  if (params) {
    // Append params to the url
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }

  return await fetchJson(url, { headers: setHeaders(), signal }, []);
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Checklists
//_____________________________________________________________________________________________________

export const searchChecklists = async (params, signal) => {
  const url = `${API_BASE_URL}/checklists?search=${params}`;

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, []);
};

export const getChecklists = async (params, signal) => {
  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  // If there are params fetch from route with query
  if (params.users === "any") {
    const url = new URL(
      `${API_BASE_URL}/checklists?account=${params.account}&group=${params.users}&page=${params.page}`
    );
    return await fetchJson(url, options, []);
  } else {
    const url = new URL(
      `${API_BASE_URL}/checklists?account=${params.account}&user=${params.users}&page=${params.page}`
    );
    return await fetchJson(url, options, []);
  }
};

export const getCount = async (params, signal) => {
  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  // If there are params fetch from route with query
  if (params.users === "any") {
    const url = new URL(
      `${API_BASE_URL}/checklists/count?account=${params.account}&group=${params.users}&page=${params.page}&count=${params.count}`
    );
    return await fetchJson(url, options, []);
  } else {
    const url = new URL(
      `${API_BASE_URL}/checklists/count?account=${params.account}&user=${params.users}&page=${params.page}&count=${params.count}`
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

export const createChecklist = async (newChecklist, signal) => {
  const url = new URL(`${API_BASE_URL}/checklists`);

  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: newChecklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateChecklist = async (checklist, signal) => {
  const url = new URL(`${API_BASE_URL}/checklists/${checklist.id}`);

  const options = {
    method: "PUT",
    headers: setHeaders(),
    body: JSON.stringify({ data: checklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateChecklistComplete = async (checklist, signal) => {
  const url = new URL(`${API_BASE_URL}/checklists/${checklist.id}`);

  const options = {
    method: "PUT",
    headers: setHeaders(),
    body: JSON.stringify({ data: checklist }),
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

//_____________________________________________________________________________________________________
// API REQUESTS
// Checklist Templates
//_____________________________________________________________________________________________________

export const getTemplates = async (user, signal) => {
  const url = new URL(`${API_BASE_URL}/checklist-templates/accountTemplates`);
  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: user }),
    signal,
  };

  return await fetchJson(url, options, []);
};

export const createTemplate = async (template, signal) => {
  const url = new URL(`${API_BASE_URL}/checklist-templates`);

  const options = {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ data: template }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const readTemplate = async (templateId, signal) => {
  const url = new URL(`${API_BASE_URL}/checklist-templates/${templateId}`);

  const options = {
    method: "GET",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateTemplate = async (template, signal) => {
  const url = new URL(
    `${API_BASE_URL}/checklist-templates/update/${template.id}`
  );

  const options = {
    method: "PUT",
    headers: setHeaders(),
    body: JSON.stringify({ data: template }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const deleteTemplate = async (template, signal) => {
  const url = new URL(`${API_BASE_URL}/checklist-templates/${template.id}`);

  const options = {
    method: "DELETE",
    headers: setHeaders(),
    signal,
  };

  return await fetchJson(url, options, {});
};
