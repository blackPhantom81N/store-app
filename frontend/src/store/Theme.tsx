import { createContext, FC, ReactNode, useState } from "react";

interface ThemeContextType {
  backgroundTheme: string;
  setBackgroundTheme: (color: string) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultThemeContext: ThemeContextType = {
  backgroundTheme: "#f0f0f0",
  setBackgroundTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [backgroundTheme, setBackgroundTheme] = useState<string>("#0e1736");

  return (
    <ThemeContext.Provider value={{ backgroundTheme, setBackgroundTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
