import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API = import.meta.env.VITE_API;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result);
    setToken(result.token);
  };

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.text();
    if (!response.ok) throw Error(result);
    setToken(result);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
