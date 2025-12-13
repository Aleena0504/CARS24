import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Load theme from localStorage or default dark
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply theme to <body> & save in localStorage
  useEffect(() => {
    document.body.className = theme;  // "dark" or "light"
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle button action
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      
    </ThemeContext.Provider>
  );
}
