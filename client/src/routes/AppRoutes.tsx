import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import authUser from "$/api/authUser";
import Navbar from "$/components/Navbar/Navbar";
import { useAuth } from "$/context/AuthContext/AuthContext";

import Footer from "$/components/Footer";

import ChangePasswordRoute from "./ChangePasswordRoute/ChangePasswordRoute";
import ClientsRoute from "./ClientsRoute/ClientsRoute";
import LoginRoute from "./LoginRoute/LoginRoute";
import RegisterRoute from "./RegisterRoute/RegisterRoute";

const HomeLayout: React.FC = ({ children }) => (
  <>
    <Navbar />
    <Outlet />
    {children}
    <Footer />
  </>
);

const AppRoutes: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser, setToken } = useAuth();

  const userFallback = (fallback: JSX.Element, exists: JSX.Element) =>
    user ? exists : fallback;

  useEffect(() => {
    setLoading(true);
    authUser()
      .then((response) => {
        setUser(response.user);
        setToken(response.token);
      })
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <LinearProgress />
  ) : (
    <Routes>
      <Route
        path="*"
        element={userFallback(<Navigate to="/login" />, <HomeLayout />)}
      >
        <Route path="changePassword" element={<ChangePasswordRoute />} />
        <Route path="clients/*" element={<ClientsRoute />} />
      </Route>

      <Route
        path="/login"
        element={userFallback(<LoginRoute />, <Navigate to="/" />)}
      />
      <Route
        path="/register"
        element={userFallback(<RegisterRoute />, <Navigate to="/" />)}
      />
    </Routes>
  );
};
export default AppRoutes;
