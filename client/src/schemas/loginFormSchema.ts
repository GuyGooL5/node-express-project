import { LoginFormData } from "$/components/LoginForm";
import * as yup from "yup";
import { SchemaOf } from "yup";

const loginFormSchema: SchemaOf<LoginFormData> = yup.object().shape({
  idNumber: yup
    .string()
    .required()
    .test("regex", "ID Number must include numbers only", (value = "") =>
      /^\d+$/.test(value)
    )
    .length(9, "ID number must be 9 digits"),

  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

export default loginFormSchema;
