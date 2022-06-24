import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Button,
  CardActions,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "./LoadingButton";
import { MaritalStatus } from "$/config/constants";
import ControlledSelectField from "./ControlledSelectField";
import ControlledTextField from "./ControlledTextField";
import { DatePicker } from "@mui/x-date-pickers";

export interface RegisterFormData {
  idNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  maritalStatus: MaritalStatus;
}

interface RegisterFormProps {
  control: Control<RegisterFormData>;
  isValid?: boolean;
  loading?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onLogin: () => void;
}

const RegisterForm = ({
  control,
  isValid,
  loading = false,
  onSubmit,
  onLogin,
}: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((x) => !x);

  return (
    <StyledPaper elevation={4}>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Hi, welcome back! ✋</Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              fullWidth
              name="idNumber"
              control={control}
              label="ID Number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              fullWidth
              name="password"
              control={control}
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              fullWidth
              name="firstName"
              control={control}
              label="First Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              fullWidth
              name="lastName"
              control={control}
              label="Last Name"
              required
            />
          </Grid>
          {/* // TODO: Add Date Picker */}
          <Grid item xs={4}>
            <Controller
              name="birthday"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <DatePicker
                  label="Birthday"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => (
                    <TextField required {...params} error={!!error} helperText={error?.message} />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <ControlledSelectField
              fullWidth
              name="maritalStatus"
              control={control}
              label="Marital Status"
              required
              options={[
                MaritalStatus.Divorced,
                MaritalStatus.Married,
                MaritalStatus.Single,
                MaritalStatus.Widowed,
              ]}
              optionRenderMap={(option) => (
                <Typography variant="body1" fontWeight={200} textAlign="start">
                  {uppercaseFirstLetter(option)}
                </Typography>
              )}
            />
          </Grid>
        </Grid>
        <CardActions>
          <LoadingButton loading={loading} disabled={!isValid} type="submit" variant="contained">
            Register
          </LoadingButton>
          <Button type="submit" onClick={onLogin}>
            Login
          </Button>
        </CardActions>
      </form>
    </StyledPaper>
  );
};
export default RegisterForm;

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const uppercaseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
