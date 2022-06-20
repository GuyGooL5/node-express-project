import { useState } from "react";
import { Control } from "react-hook-form";
import { Button, CardActions, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "./LoadingButton";
import { MaritalStatus } from "$/config/constants";
import ControlledSelectField from "./ControlledSelectField";
import ControlledTextField from "./ControlledTextField";

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
        <Stack direction="column" gap={2}>
          <Typography variant="h5">Hi, welcome back! ✋</Typography>
          <ControlledTextField name="idNumber" control={control} label="ID Number" required />
          <ControlledTextField
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
          <ControlledTextField name="firstName" control={control} label="First Name" required />
          <ControlledTextField name="lastName" control={control} label="Last Name" required />
          {/* // TODO: Add Date Picker */}
          <ControlledTextField
            name="birthday"
            control={control}
            label="Birthday"
            type="date"
            required
          />
          <ControlledSelectField
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
              <Typography variant="body1" fontWeight={700}>
                {option}
              </Typography>
            )}
          />
        </Stack>
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
