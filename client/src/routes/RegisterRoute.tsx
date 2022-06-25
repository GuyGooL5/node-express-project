import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";

import routes from "$/config/routes";

import api from "$/api";

import { useAuth } from "$/context/AuthContext";

import RegisterForm, { RegisterFormData } from "$/components/RegisterForm";
import registerFormSchema from "$/schemas/registerFormSchema";
import { RegisterResponse } from "$/api/register";

const RegisterRoute = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
    mode: "onSubmit",
  });
  const isFormValid = Object.keys(errors).length === 0;

  const navigate = useNavigate();
  const goToLogin = () => navigate(routes.LOGIN);

  const { setToken, setUser } = useAuth();

  const { mutate, isLoading } = useMutation<RegisterResponse, unknown, RegisterFormData>(
    "register",
    (data) => api.register(data),
    {
      onSuccess: (data) => {
        setToken(data.token);
        setUser(data.user);
      },
    }
  );
  const submitHandler = (formData: RegisterFormData) => mutate(formData);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <RegisterForm
        control={control}
        isValid={isFormValid}
        loading={isLoading}
        onSubmit={handleSubmit(submitHandler)}
        onLogin={goToLogin}
      />
    </Container>
  );
};

export default RegisterRoute;
