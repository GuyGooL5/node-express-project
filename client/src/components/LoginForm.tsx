import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Button,
  CardActions,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "./LoadingButton";

export interface LoginFormData {
  username: string;
  password: string;
}
interface LoginFormProps {
  control: Control<LoginFormData>;
  isValid?: boolean;
  loading?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onRegister: () => void;
}

const LoginForm = ({
  control,
  isValid,
  loading = false,
  onSubmit,
  onRegister,
}: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((x) => !x);

  return (
    <StyledPaper elevation={4}>
      <form onSubmit={onSubmit}>
        <Stack direction="column" gap={2}>
          <Typography variant="h5">Hi, welcome back! ✋</Typography>
          <Controller
            name="username"
            control={control}
            render={({ fieldState: { error } }) => (
              <TextField
                label="Username"
                {...control.register("username")}
                helperText={error?.message ?? " "}
                error={!!error}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ fieldState: { error } }) => (
              <TextField
                label="Password"
                {...control.register("password")}
                helperText={error?.message ?? " "}
                error={!!error}
                type={isPasswordVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <CardActions>
          <LoadingButton
            loading={loading}
            disabled={!isValid}
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
          <Button type="submit" onClick={onRegister}>
            Register
          </Button>
        </CardActions>
      </form>
    </StyledPaper>
  );
};
export default LoginForm;

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)};
`;
