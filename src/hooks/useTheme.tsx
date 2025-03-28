
import { createContext, useContext, ReactNode } from "react";

// Context tanpa perubahan tema
const ThemeContext = createContext({
  theme: "light",
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
