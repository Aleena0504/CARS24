import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const signup = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    return { success: true };
  };

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    setUser(savedUser);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
