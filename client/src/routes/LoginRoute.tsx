import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container } from "@mui/material";

import LoginForm, { LoginFormData } from "$/components/LoginForm";
import routes from "$/config/routes";
import { useMutation } from "react-query";
import api from "$/api";
import { LoginResponse } from "$/api/login";
import { useAuth } from "$/context/AuthContext";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must be at most 20 characters")
    .test(
      "regex",
      "Username must contain only lowercase letters, numbers, and underscores",
      (value) => /^[a-z0-9_]+$/.test(value ?? "")
    ),
  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
});

const LoginRoute = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });
  const isFormValid = Object.keys(errors).length === 0;

  const navigate = useNavigate();
  const goToRegister = () => navigate(routes.REGISTER);

  const { setToken, setUser } = useAuth();

  const { mutate, isLoading } = useMutation<
    LoginResponse,
    unknown,
    LoginFormData
  >("login", ({ username, password }) => api.login(username, password), {
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
    },
  });

  const submitHandler = (formData: LoginFormData) => mutate(formData);

  return (
    <Container maxWidth="sm">
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
