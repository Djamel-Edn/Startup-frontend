import { ProjectMember, Workshop } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authToken");
  console.log("fetchWithAuth: Using Url", url);
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  console.debug("fetchWithAuth: Initiating request", {
    url: `${API_BASE_URL}${url}`,
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    console.debug("fetchWithAuth: Received response", {
      url: `${API_BASE_URL}${url}`,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status} ${response.statusText}`;
      let errorDetails: any = null;

      if (isJson) {
        try {
          errorDetails = await response.json();
          console.error("fetchWithAuth: Error response body (JSON)", errorDetails);
          if (response.status === 401) {
            console.warn("fetchWithAuth: Unauthorized (401) - Clearing localStorage and redirecting to login");
            localStorage.clear();
            window.location.href = "/login";
          }
          errorMessage = errorDetails.message || errorMessage;
        } catch (parseError) {
          console.error("fetchWithAuth: Failed to parse error response as JSON", parseError);
        }
      } else {
        const text = await response.text();
        errorDetails = text || "(empty response)";
        console.error("fetchWithAuth: Error response body (non-JSON)", text || "(empty response)");
        if (text.includes("<html")) {
          errorMessage = `Received HTML response instead of JSON. Possible wrong endpoint or server error. Status: ${response.status}`;
        } else {
          errorMessage = text || errorMessage;
        }
      }

      throw new Error(errorMessage);
    }

    if (isJson) {
      const data = await response.json();
      console.debug("fetchWithAuth: Successfully parsed JSON response", data);
      return data;
    } else {
      const text = await response.text();
      console.error("fetchWithAuth: Expected JSON but received", {
        contentType,
        body: text || "(empty response)",
      });
      throw new Error(
        `Expected JSON response but received ${contentType || "no content-type"}: ${
          text || "(empty response)"
        }`
      );
    }
  } catch (error) {
    console.error("fetchWithAuth: Request failed", {
      url: `${API_BASE_URL}${url}`,
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    throw error;
  }
};

export const updateUserPassword = async (email: string, currentPassword: string, newPassword: string) => {
  return fetchWithAuth('/users/password', {
    method: 'PATCH',
    body: JSON.stringify({ email, currentPassword, newPassword }),
  });
};

export const getUserByEmail = async (email: string): Promise<ProjectMember> => {
  return fetchWithAuth(`/email/${email}`);
};

export const updateUserProfile = async (profileData: { firstName?: string; lastName?: string; bio?: string }) => {
  return fetchWithAuth('/profile', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
};

export const generatePasswordResetToken = async (email: string) => {
  return fetchWithAuth('/reset-token', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const validateResetToken = async (email: string, token: string) => {
  return fetchWithAuth('/validate-reset-token', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
  });
};

export const verifyUser = async (email: string, token: string) => {
  return fetchWithAuth('/verify-user', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
  });
};

export const updateUserRole = async (userId: string, role: string) => {
  return fetchWithAuth(`/role/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

export const deleteUser = async (userId: string) => {
  return fetchWithAuth(`/${userId}`, {
    method: 'DELETE',
  });
};

export const getAllUsers = async (): Promise<ProjectMember[]> => {
  const logPrefix = `[${new Date().toISOString()}] getAllUsers`;
  try {
    console.log(`${logPrefix}: Fetching all users`);
    const users = await fetchWithAuth(`/users`);

    return users;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch users`, {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw new Error("Invalid user data: Some users do not match the expected format");
  }
};

export const getPastWorkshops = async (): Promise<Workshop[]> => {
  const logPrefix = `[${new Date().toISOString()}] getPastWorkshops`;

  try {
    console.debug(`${logPrefix}: Fetching past workshops`);

    const response = await fetch(`${API_BASE_URL}/workshops/past`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.debug(`${logPrefix}: Successfully fetched past workshops`, {
      workshopCount: Array.isArray(data) ? data.length : 0,
    });

    return Array.isArray(data) ? data as Workshop[] : [];
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch past workshops`, {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return [];
  }
};

export { fetchWithAuth };