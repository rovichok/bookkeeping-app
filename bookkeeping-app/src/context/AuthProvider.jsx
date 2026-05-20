import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from "../apiConfig";

// Backend endpoints for checking session and logging out
// const AUTH_ME_URL = "https://localhost:7239/api/auth/me";
// const LOGOUT_URL = "https://localhost:7239/api/auth/logout";
const AUTH_ME_URL = `${API_BASE_URL}/api/auth/me`;
const LOGOUT_URL = `${API_BASE_URL}/api/auth/logout`;

export function AuthProvider({ children }) {
  // tracks if the user is currently logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // tracks if we've finished the initial "handshake" with the backend
  const [authChecked, setAuthChecked] = useState(false);

  // Checks the backend to see if the browser's HttpOnly cookie is still valid
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(AUTH_ME_URL, {
        credentials: "include", // essential to send the cookie to the server
      });

      // If response is 200 OK, the user is authenticated
      setIsAuthenticated(response.ok);
    } catch {
      // If the network request fails, assume the user is logged out
      setIsAuthenticated(false);
    } finally {
      // mark the check as finished so the UI can stop showing "loading"
      setAuthChecked(true);
    }
  }, []);

  // Updates local state immediately after a successful login call
  const login = useCallback(() => {
    setIsAuthenticated(true);
    setAuthChecked(true);
  }, []);

  // Tells the backend to destroy the cookie and resets local state
  const logout = useCallback(async () => {
    try {
      await fetch(LOGOUT_URL, {
        method: "POST", // POST is safer for actions that change state
        credentials: "include", // tells browser which cookie to send/clear
      });
    } finally {
      // Always reset local state to false, even if the server request fails
      setIsAuthenticated(false);
      setAuthChecked(true);
    }
  }, []);

  // Run the checkAuth function automatically as soon as the app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Wraps all variables into one object, memoized for better performance
  const value = useMemo(
    () => ({
      isAuthenticated,
      authChecked,
      login,
      logout,
      checkAuth,
    }),
    [isAuthenticated, authChecked, login, logout, checkAuth],
  );

  // Provides the auth data to any component inside the <AuthProvider> tree
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
