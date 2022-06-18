import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Stack,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import Logo from "$/components/Logo";
import PasswordField from "$/components/PasswordField";

import { useAuth } from "$/context/AuthContext/AuthContext";

import login from "$/api/login";
import authUser from "$/api/authUser";

import JwtManager from "$/utils/JwtManager";
import LoadingButton from "$/components/LoadingButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const res = await authUser();
      setUser(res.user);
    } catch (err: any) {
      setError(`${err?.error}`);
    }
  };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSumbit();
  };

  const onSumbit = async () => {
    setError("");
    setLoading(true);
    try {
      const { token } = await login(username, password);
      JwtManager.set(token);
      authenticate();
    } catch (e: any) {
      setError(`${e?.error}`);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => navigate("/register");

  return (
    <form onSubmit={submit}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Logo height={64} />
          <Typography variant="h3" color="primary">
            Hi, welcome back!
          </Typography>
          <TextField
            fullWidth
            required
            variant="standard"
            label="ID Number"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordField
            fullWidth
            required
            variant="standard"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="row" spacing={1}>
            <LoadingButton loading={loading} variant="contained" type="submit">
              Login
            </LoadingButton>
            <Button
              disabled={loading}
              variant="outlined"
              onClick={navigateToRegister}
            >
              Sign-up
            </Button>
          </Stack>
        </Stack>
        <Snackbar
          open={!!error}
          message={error}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          onClose={() => setError("")}
          action={
            <Button variant="text" onClick={() => setError("")}>
              Dismiss
            </Button>
          }
        />
      </Container>
    </form>
  );
}
