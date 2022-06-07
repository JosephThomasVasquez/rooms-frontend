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
// Checklists
//_____________________________________________________________________________________________________

export const getChecklists = async (params, signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklists`);
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
  // console.log(url);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: checklist }),
    signal,
  };

  return await fetchJson(url, options, {});
};

//_____________________________________________________________________________________________________
// API REQUESTS
// Checklist Templates
//_____________________________________________________________________________________________________

export const getTemplates = async (signal) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/checklist-templates`);
  const options = {
    method: "GET",
    headers,
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
