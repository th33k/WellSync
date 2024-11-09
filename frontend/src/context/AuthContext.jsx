import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      setUser({ token, userId });

      return response.data;
    } catch (error) {
      console.error("Registration error in AuthContext:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const { token, userId } = response.data;

    localStorage.setItem("token", token);
    setUser({ token, userId });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
