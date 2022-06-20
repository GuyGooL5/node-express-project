import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { LoginResponse } from "$/api/login";
import { setJWTHeader } from "$/config/backendAPI";
import LocalStorage from "$/utils/LocalStorage";

export type User = LoginResponse["user"];
export type Token = LoginResponse["token"];

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  setToken: (token: Token | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const initalValue: AuthContextData = {
  isAuthenticated: false,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
};

const Context = createContext(initalValue);

setJWTHeader(LocalStorage.getItem("token"));

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const setToken = useCallback((token: Token | null) => {
    setJWTHeader(token);
    if (token) LocalStorage.setItem("token", token);
    else LocalStorage.removeItem("token");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken, setUser]);

  return (
    <Context.Provider
      value={{ setToken, user, setUser, isAuthenticated: !!user, logout }}
    >
      {children}
    </Context.Provider>
  );
};

const useAuth = () => useContext(Context);

export { AuthContextProvider, useAuth };
