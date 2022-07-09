//  Set Headers
const headers = new Headers();
headers.append("Content-Type", "application/json");

const REACT_APP_API_BASE_URL = "http://localhost:5050/api";

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
  const url = new URL(`${REACT_APP_API_BASE_URL}/users/login`);
  // console.log(url);
  // headers.append(
  //   "Authorization",
  //   `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhbXlvb2hAYWFoYXNhaHMuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTQ4Mzc5NjYsImV4cCI6MTY1NDgzODAyNn0.2X_0cL2MoylZaSkMdIhDxPhKWqOyBqN5ptnRIL9UrWA"}`
  // );

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
  const url = new URL(`${REACT_APP_API_BASE_URL}/users`);

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
  const url = new URL(`${REACT_APP_API_BASE_URL}/account/admin/users`);
  // console.log("url", url);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const getUser = async (user, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/users/user${user}`);
  // console.log("url", url);

  const options = {
    method: "GET",
    headers,
    signal,
  };

  return await fetchJson(url, options, {});
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Rooms
//_____________________________________________________________________________________________________

export const getRooms = async (params, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/rooms`);
  if (params) {
    // Append params to the url
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }

  return await fetchJson(url, { headers, signal }, []);
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Buildings
//_____________________________________________________________________________________________________

export const getBuildings = async (params, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/buildings`);
  if (params) {
    // Append params to the url
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }

  return await fetchJson(url, { headers, signal }, []);
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Checklists
//_____________________________________________________________________________________________________

export const getChecklists = async (params, signal) => {
  // console.log("params:", params);

  const options = {
    method: "GET",
    headers,
    signal,
  };

  // If there are params fetch from route with query
  if (params.users === "any") {
    const url = new URL(
      `${REACT_APP_API_BASE_URL}/checklists?account=${params.account}&group=${params.users}`
    );
    return await fetchJson(url, options, []);
  } else {
    const url = new URL(
      `${REACT_APP_API_BASE_URL}/checklists?account=${params.account}&user=${params.users}`
    );
    return await fetchJson(url, options, []);
  }

  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists`);

  return await fetchJson(url, options, []);
};

export const readChecklist = async (params, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists/${params}`);
  // console.log(url);

  const options = {
    method: "GET",
    headers,
    signal,
  };

  return await fetchJson(url, options, {});
};

export const createChecklist = async (newChecklist, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists`);
  // console.log(url);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: newChecklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateChecklist = async (checklist, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists/${checklist.id}`);
  // console.log('API cehcklist id', url);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: checklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateChecklistComplete = async (checklist, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists/${checklist.id}`);
  // console.log('API cehcklist id', url);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: checklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const generateChecklistCSV = async (params, signal) => {
  // console.log("params:", params);
  const url = new URL(
    `${REACT_APP_API_BASE_URL}/account/admin/checklists/download/csv`
  );

  const options = {
    method: "POST",
    headers,
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
  const url = new URL(
    `${REACT_APP_API_BASE_URL}/checklist-templates/accountTemplates`
  );
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    signal,
  };

  return await fetchJson(url, options, []);
};

export const createTemplate = async (template, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklist-templates`);
  // console.log(url);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: template }),
    signal,
  };

  return await fetchJson(url, options, {});
};

export const readTemplate = async (templateId, signal) => {
  const url = new URL(
    `${REACT_APP_API_BASE_URL}/checklist-templates/${templateId}`
  );
  // console.log(url);

  const options = {
    method: "GET",
    headers,
    signal,
  };

  return await fetchJson(url, options, {});
};

export const updateTemplate = async (template, signal) => {
  const url = new URL(
    `${REACT_APP_API_BASE_URL}/checklist-templates/update/${template.id}`
  );
  // console.log(url);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: template }),
    signal,
  };

  return await fetchJson(url, options, {});
};
