import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";

import routes from "$/config/routes";

import api from "$/api";
import { LoginResponse } from "$/api/login";

import { useAuth } from "$/context/AuthContext";
import LoginForm, { LoginFormData } from "$/components/LoginForm";
import loginFormSchema from "$/schemas/loginFormSchema";

const LoginRoute = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
    mode: "onSubmit",
  });
  const isFormValid = Object.keys(errors).length === 0;

  const navigate = useNavigate();
  const goToRegister = () => navigate(routes.REGISTER);

  const { setToken, setUser } = useAuth();

  const { mutate, isLoading } = useMutation<LoginResponse, unknown, LoginFormData>(
    "login",
    ({ idNumber, password }) => api.login(idNumber, password),
    {
      onSuccess: (data) => {
        setToken(data.token);
        setUser(data.user);
      },
    }
  );

  const submitHandler = (formData: LoginFormData) => mutate(formData);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <LoginForm
        control={control}
        isValid={isFormValid}
        loading={isLoading}
        onSubmit={handleSubmit(submitHandler)}
        onRegister={goToRegister}
      />
    </Container>
  );
};

export default LoginRoute;
