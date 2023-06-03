// import { Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import vid1 from "../../assets/mp4/bg.mp4";
import { TextField } from "../../components/reusables/TextField";
import { LoginValidationSchema } from "../../utils/validationSchema/login.validations";
import "../Login//Login.css";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
    },

    onSubmit: async (values) => {
      console.log(values);
    },

    validationSchema: LoginValidationSchema,
  });

  const {
    values,
    isValid,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
    dirty,
    hasError,
    touched,
  } = formik;

  return (
    <div className="flex items-center w-full font-poppins justify-evenly min-h-screen">
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
            </div>

            {/* button */}
            <div className="col-span-full mt-5">
              <button
                type="button"
                className={`px-5 bg-cyan-500 py-3 text-white rounded-md w-full ${
                  !(dirty && isValid) && "cursor-not-allowed bg-cyan-200"
                }`}
                onClick={handleSubmit}
                disabled={!(dirty && isValid)}
              >
                Register
              </button>
              <div
                onClick={() => navigate("/")}
                className="font-normal text-xs text-center mt-3 cursor-pointer text-cyan-500"
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
