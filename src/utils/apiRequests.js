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
