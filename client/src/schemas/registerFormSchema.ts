import * as yup from "yup";
import { SchemaOf } from "yup";

import { RegisterFormData } from "$/components/RegisterForm";
import { MaritalStatus } from "$/config/constants";

const registerFormSchema: SchemaOf<RegisterFormData> = yup.object().shape({
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
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at least 6 characters")
    .test(
      "regex-uppercase",
      "Password must contain at least 1 uppercase letter",
      (value = "") => /[A-Z]/.test(value)
    )
    .test(
      "regex-lowercase",
      "Password must contain at least 1 lowercase letter",
      (value = "") => /[a-z]/.test(value)
    )
    .test(
      "regex-number",
      "Password must contain at least 1 number",
      (value = "") => /\d/.test(value)
    )
    .test(
      "regex-special",
      "Password must contain at least 1 special character",
      (value = "") => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    ),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthday: yup.date().required(),
  maritalStatus: yup
    .mixed<MaritalStatus>()
    .required()
    .oneOf(
      [
        MaritalStatus.Single,
        MaritalStatus.Married,
        MaritalStatus.Divorced,
        MaritalStatus.Widowed,
      ],
      "Marital status is invalid"
    ),
});

export default registerFormSchema;
