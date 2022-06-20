import { useAuth } from "$/context/AuthContext";
import { Button } from "@mui/material";

interface HomeRouteProps {}

const HomeRoute = () => {
  const { logout } = useAuth();

  return (
    <div>
      <div>Home Route</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomeRoute;
