import { useAuth } from "$/context/AuthContext";
import { Logout } from "@mui/icons-material";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} textAlign="start">
            Costs Management
          </Typography>
          {user && (
            <Button onClick={logout} color="inherit" startIcon={<Logout />}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
