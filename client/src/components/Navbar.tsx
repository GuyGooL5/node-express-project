import { useState } from "react";
import { useAuth } from "$/context/AuthContext";
import {
  BrightnessAuto,
  BrightnessHigh,
  Logout,
  ModeNight,
  SvgIconComponent,
} from "@mui/icons-material";
import { AppBar, Button, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useThemeContext } from "$/context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} textAlign="start">
            Costs Management
          </Typography>
          <ThemeToggle />

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

const themeIcons = {
  light: BrightnessHigh,
  dark: ModeNight,
  system: BrightnessAuto,
};

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const registerSelectTheme = (_theme: "dark" | "light" | "system") => () => {
    setTheme(_theme);
    handleClose();
  };

  const Icon = themeIcons[theme];

  return (
    <>
      <Button onClick={handleClick} startIcon={<Icon />} color="inherit">
        Theme
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <IconMenuItem onClick={registerSelectTheme("light")} Icon={themeIcons.light} text="Light" />
        <IconMenuItem onClick={registerSelectTheme("dark")} Icon={themeIcons.dark} text="Dark" />
        <IconMenuItem
          onClick={registerSelectTheme("system")}
          Icon={themeIcons.system}
          text="System"
        />
      </Menu>
    </>
  );
};

interface IconMenuItemProps {
  onClick: () => void;
  Icon: SvgIconComponent;
  text: string;
}

const IconMenuItem = ({ Icon, onClick, text }: IconMenuItemProps) => (
  <MenuItem onClick={onClick}>
    <Stack direction="row" alignItems="center" gap={1}>
      <Icon color="primary" />
      <Typography variant="body1" color="primary">
        {text}
      </Typography>
    </Stack>
  </MenuItem>
);
