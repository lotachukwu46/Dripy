"use client"; // This must be a client component

import { createContext, useContext, useEffect } from "react";

// 1. Create the context
const ThemeContext = createContext({});

// 2. Create a custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 3. Create the provider component
export default function ThemeProvider({ children, userLeague }) {
  // Determine the theme based on the user's league
  // This league could come from your auth store (Zustand) or user profile
  const currentTheme = userLeague || "bronze"; // Default to bronze if no league

  // 4. Effect to apply the data-theme attribute to the document element
  useEffect(() => {
    const root = document.documentElement; // <html> element
    root.setAttribute("data-theme", currentTheme);
  }, [currentTheme]); // Re-run when the theme changes

  // 5. Provide the theme value to the context
  const value = {
    theme: currentTheme,
    // You can add a function to manually change theme here later if needed
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
