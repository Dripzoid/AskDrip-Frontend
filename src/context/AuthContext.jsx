import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    authStatus,
    setAuthStatus,
  ] = useState("checking");

  const isAuthenticated =
    authStatus ===
    "authenticated";

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession =
    async () => {
      try {
        const response =
          await getCurrentUser();

        setUser(
          response.data.user
        );

        setAuthStatus(
          "authenticated"
        );
      } catch (error) {
        setUser(null);

        if (
          error.response
            ?.status === 401
        ) {
          setAuthStatus(
            "unauthenticated"
          );
        } else {
          setAuthStatus(
            "error"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  const login = async (
    email,
    password
  ) => {
    const response =
      await loginUser(
        email,
        password
      );

    setUser(
      response.data.user
    );

    setAuthStatus(
      "authenticated"
    );

    return response.data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );
    } finally {
      setUser(null);

      setAuthStatus(
        "unauthenticated"
      );
    }
  };

  const refreshUser =
    async () => {
      try {
        const response =
          await getCurrentUser();

        setUser(
          response.data.user
        );

        setAuthStatus(
          "authenticated"
        );

        return response.data.user;
      } catch (error) {
        setUser(null);

        if (
          error.response
            ?.status === 401
        ) {
          setAuthStatus(
            "unauthenticated"
          );
        } else {
          setAuthStatus(
            "error"
          );
        }

        return null;
      }
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        loading,
        setLoading,

        isAuthenticated,

        authStatus,

        login,
        logout,

        refreshUser,

        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}