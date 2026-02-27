import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API = import.meta.env.VITE_API;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);

      const fetchUser = async () => {
        try {
          const response = await fetch(`${API}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        } finally {
          setUserLoading(false);
        }
      };

      fetchUser();
    } else {
      sessionStorage.removeItem("token");
      setUser(null);
      setUserLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error);
    setToken(result.token);
  };

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result);
    setToken(result.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, userLoading, login, register, logout, API }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
