import { addJWTHeader, removeJWTHeader } from "$/config/backendClient";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import JwtManager from "../../utils/JwtManager";

interface AuthContext {
  user: string | null;
  setToken: Dispatch<string | null>;
  setUser: Dispatch<SetStateAction<string | null>>;
  signOut: () => void;
}

const initalState: AuthContext = {
  setUser: (user) => user,
  setToken: () => {},
  signOut: () => {},
  user: null,
};

const Context = createContext<AuthContext>(initalState);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(initalState.user);

  const [token, setToken] = useState(JwtManager.get());

  useEffect(() => {
    if (token) {
      JwtManager.set(token);
      addJWTHeader(token);
    } else {
      JwtManager.delete();
      removeJWTHeader();
      setUser(null);
    }
  }, [token]);

  const signOut = useCallback(() => setToken(null), [setToken]);

  return (
    <Context.Provider value={{ user, setUser, signOut, setToken }}>
      {children}
    </Context.Provider>
  );
};

export default AuthContextProvider;

const useAuth = () => useContext(Context);

export { useAuth };
