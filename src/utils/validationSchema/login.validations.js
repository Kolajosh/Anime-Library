import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please provide your password"),
});

export const RegisterValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please provide your password"),
  password2: Yup.string().required("Please confirm your password"),
  firstName: Yup.string().required("Please enter your First name"),
  lastName: Yup.string().required("Please enter your Last name"),
});
