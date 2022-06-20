import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useQuery } from "react-query";

import { useAuth } from "$/context/AuthContext";

import api from "$/api";

import LoginRoute from "./LoginRoute";
import HomeRoute from "./HomeRoute";
import RegisterRoute from "./RegisterRoute";

const AppRouter = () => {
  const { isAuthenticated, setToken, setUser } = useAuth();

  const { isLoading } = useQuery(["auth"], api.auth, {
    cacheTime: 1,
    retry: 1,
    retryOnMount: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              !isAuthenticated ? <Navigate to="/login" /> : <HomeRoute />
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginRoute />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterRoute />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
