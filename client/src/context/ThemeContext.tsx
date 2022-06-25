import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { LoginResponse } from "$/api/login";
import LocalStorage from "$/utils/LocalStorage";
import { colors, createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

export type User = LoginResponse["user"];
export type Token = LoginResponse["token"];

type ThemeType = "light" | "dark" | "system";

interface ThemeContextData {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const initalValue: ThemeContextData = {
  theme: LocalStorage.getItem("theme") || "system",
  setTheme: () => {},
};

const Context = createContext(initalValue);

const lightTheme = createTheme({
  palette: {
    primary: {
      main: colors.indigo[600],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.indigo[300],
    },
  },
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>(LocalStorage.getItem("theme") || "system");

  const defaultDark = useMediaQuery("(prefers-color-scheme: dark)");

  const handleSetTheme = useCallback(
    (_theme: ThemeType) => {
      setTheme(_theme);
      LocalStorage.setItem("theme", _theme);
    },
    [setTheme]
  );

  const activeTheme = useMemo(() => {
    switch (theme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      case "system":
      default:
        return defaultDark ? darkTheme : lightTheme;
    }
  }, [theme, defaultDark]);

  return (
    <Context.Provider value={{ theme, setTheme: handleSetTheme }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

const useThemeContext = () => useContext(Context);

export { ThemeContextProvider, useThemeContext };
