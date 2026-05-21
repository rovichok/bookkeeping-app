import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from "../apiConfig";

const AUTH_ME_URL = `${API_BASE_URL}/api/auth/me`;
const LOGOUT_URL = `${API_BASE_URL}/api/auth/logout`;

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const resetAuthState = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const checkAuth = useCallback(
    async (signal) => {
      try {
        setError(null);

        const response = await fetch(AUTH_ME_URL, {
          method: "GET",
          credentials: "include",
          signal,
        });

        // Normal case: user is not logged in or cookie expired
        if (response.status === 401) {
          resetAuthState();
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify authentication.");
        }

        const result = await response.json();

        setUser(result.data ?? result);
        setIsAuthenticated(true);
      } catch (err) {
        if (err.name === "AbortError") return;

        resetAuthState();
        setError(err.message || "Authentication check failed.");
      } finally {
        setAuthChecked(true);
      }
    },
    [resetAuthState],
  );

  const login = useCallback(
    async (userData = null) => {
      setError(null);

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        setAuthChecked(true);
        return;
      }

      // Useful because your login response only says: { message: "Logged in" }
      await checkAuth();
    },
    [checkAuth],
  );

  const logout = useCallback(async () => {
    try {
      setError(null);

      await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      resetAuthState();
      setAuthChecked(true);
    }
  }, [resetAuthState]);

  useEffect(() => {
    const controller = new AbortController();

    checkAuth(controller.signal);

    return () => controller.abort();
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authChecked,
      user,
      error,
      login,
      logout,
      checkAuth,
    }),
    [isAuthenticated, authChecked, user, error, login, logout, checkAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
