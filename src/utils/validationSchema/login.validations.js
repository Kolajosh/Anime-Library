import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please provide your password"),
});
