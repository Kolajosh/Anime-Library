// import { Typography } from "@mui/material";
import { useFormik } from "formik";
import "../Login//Login.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import vid1 from "../../assets/mp4/bg.mp4";
import PageLoader from "../../components/PageLoader";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { TextField } from "../../components/reusables/TextField";
import { registerUrl } from "../../utils/apiUrls/auth.request";
import useApiRequest from "../../utils/hooks/useApiRequest";
import useToggle from "../../utils/hooks/useToggle";
import { RegisterValidationSchema } from "../../utils/validationSchema/login.validations";
import { responseMessageHandler } from "../../utils/libs";

const Register = () => {
  const navigate = useNavigate();
  const makeRequest = useApiRequest();
  const [loading, toggleLoading] = useToggle();
  const [accountCreated, toggleAccountCreated] = useToggle();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
    },

    onSubmit: async (values) => {
      toggleLoading();
      const payload = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        password: values?.password,
      };
      try {
        const response = await makeRequest.post(registerUrl, payload);
        console.log(response);
        if (response?.status === 200) {
          toggleLoading();
          ToastNotify({
            type: "success",
            message: "Account Created Successfully, Proceed to login",
            position: "top-right",
          });
          toggleAccountCreated();
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        toggleLoading();
        ToastNotify({
          type: "error",
          message: responseMessageHandler({ error }),
          position: "top-right",
        });
      }
    },

    validationSchema: RegisterValidationSchema,
  });

  const {
    values,
    isValid,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
    dirty,
    touched,
  } = formik;

  return (
    <div className="flex items-center w-full font-poppins justify-evenly min-h-screen">
      {loading && <PageLoader message={"Creating your profile"} />}
      {accountCreated && (
        <PageLoader message="Account Created 😋, Redirecting you to login" />
      )}
      {/* left section */}
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="flex-1 mx-5 sm:mx-10 py-20"
      >
        <div className="px-5 lg:px-20">
          <div className="mb-5">LOGO</div>
          <div className="font-poppins font-bold text-xl md:text-4xl">
            Register
          </div>
          <form onSubmit={handleSubmit} className="">
            {/* Names */}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
              <div className="mt-2">
                <TextField
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeHolder="e.g Naruto"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values?.firstName}
                  hasError={errors?.firstName && touched?.firstName}
                  error={errors?.firstName}
                />
              </div>
              <div className="mt-2">
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeHolder="E.g Uzumaki"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values?.lastName}
                  hasError={errors?.lastName && touched?.lastName}
                  error={errors?.lastName}
                />
              </div>
            </div>

            {/* email */}
            <div className="col-span-full mb-2">
              <TextField
                label="Email"
                type="email"
                name="email"
                placeHolder="E.g. uzumaki@konoha.com"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values?.email}
                hasError={errors?.email && touched?.email}
                error={errors?.email}
              />
            </div>

            {/* password */}
            <div className=" col-span-full mb-2">
              <TextField
                label="Password"
                type="password"
                name="password"
                placeHolder="Input password here"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values?.password}
                hasError={errors?.password && touched?.password}
                error={errors?.password}
              />
            </div>

            {/* confirm password */}
            <div className=" col-span-full mb-2">
              <TextField
                label="Confirm Password"
                type="password"
                name="password2"
                placeHolder="Input Password again"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values?.password2}
                hasError={errors?.password2 && touched?.password2}
                error={errors?.password2}
              />
              <span className="text-[10px] text-red-500">
                {values?.password !== values?.password2 &&
                  "Passwords don't match"}
              </span>
            </div>

            {/* button */}
            <div className="col-span-full font-inter mt-5">
              <button
                type="button"
                className={`px-5 py-3 text-white rounded-md w-full ${
                  !(dirty && isValid) || values?.password !== values?.password2
                    ? "bg-cyan-200 cursor-not-allowed"
                    : "bg-cyan-500"
                }`}
                onClick={handleSubmit}
                disabled={
                  !(dirty && isValid) || values?.password !== values?.password2
                }
              >
                Register
              </button>

              <div
                onClick={() => navigate("/")}
                className="font-normal text-sm text-center mt-3 cursor-pointer text-cyan-500"
              >
                Have an account? 😁
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* right section */}
      <div
        data-aos="fade-left"
        data-aos-duration="1500"
        data-aos-easing="ease-in-sine"
        className="hidden lg:block flex-1 "
      >
        <video className="video" src={vid1} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default Register;
