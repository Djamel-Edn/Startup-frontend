import { ProjectMember } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
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
      let errorMessage = `API request failed with status ${response.status}`;
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
        errorDetails = text;
        console.error("fetchWithAuth: Error response body (non-JSON)", text.substring(0, 100) + "..."); 
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
      console.error("fetchWithAuth: Expected JSON but received text", text.substring(0, 100) + "...");
      throw new Error(`Expected JSON response but received: ${text.substring(0, 100) + "..."}`);
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

  try {
    const data = await fetchWithAuth("/users/");
    if (!Array.isArray(data)) {
      console.error("getAllUsers: Expected an array but received", data);
      throw new Error("Invalid response format: Expected an array of users");
    }

    const users = data as ProjectMember[];
    const invalidUsers = users.filter(
      (user) =>
        !user ||
        typeof user.id !== "string" ||
        typeof user.email !== "string" ||
        typeof user.firstName !== "string" ||
        typeof user.lastName !== "string"
    );

    if (invalidUsers.length > 0) {
      console.error("getAllUsers: Found invalid user objects in response", invalidUsers);
      throw new Error("Invalid user data: Some users do not match the expected format");
    }

    console.debug("getAllUsers: Successfully fetched users", users);
    return users;
  } catch (error) {
    console.error("getAllUsers: Failed to fetch users", {
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    throw error;
  }
};

export { fetchWithAuth };