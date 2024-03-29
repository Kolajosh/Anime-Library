// import { Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import vid1 from "../../assets/mp4/bg.mp4";
import PageLoader from "../../components/PageLoader";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { TextField } from "../../components/reusables/TextField";
import { loginUrl } from "../../utils/apiUrls/auth.request";
import useApiRequest from "../../utils/hooks/useApiRequest";
import useToggle from "../../utils/hooks/useToggle";
import { responseMessageHandler } from "../../utils/libs";
import { LoginValidationSchema } from "../../utils/validationSchema/login.validations";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const makeRequest = useApiRequest();
  const [loading, toggleLoading] = useToggle();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      toggleLoading();
      const payload = {
        email: values?.email,
        password: values?.password,
      };
      try {
        const response = await makeRequest.post(loginUrl, payload);
        toggleLoading();
        console.log(response?.data?.data);
        if (response?.status === 200) {
          ToastNotify({
            type: "success",
            message: responseMessageHandler({ response }),
            position: "top-right",
          });
          localStorage.setItem(
            "accessToken",
            response?.data?.data?.accessToken
          );
          localStorage.setItem("id", response?.data?.data?.id);
          localStorage.setItem("email", response?.data?.data?.email);
          localStorage.setItem(
            "refreshToken",
            response?.data?.data?.refreshToken
          );
          localStorage.setItem("firstName", response?.data?.data?.firstName);
          navigate("/dashboard");
        }
      } catch (error) {
        toggleLoading();
        ToastNotify({
          type: "error",
          message: responseMessageHandler({ error }),
          position: "top-right",
        });
      }
      // navigate("/dashboard");
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
    touched,
  } = formik;

  return (
    <div className="flex w-full items-center font-poppins justify-evenly min-h-screen">
      {loading && <PageLoader message="Crossing the Grand Line" />}
      {/* left section */}
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="flex-1 mx-5 sm:mx-10 my-20"
      >
        <div className="px-5 lg:px-20">
          <div className="mb-5">LOGO</div>
          <div className="font-poppins font-bold text-xl md:text-4xl">
            Login
          </div>
          <div className="font-poppins mt-3 font-normal text-lg md:text-xl">
            Hasashiburi dana Mughiwara 👒
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="mt-5 col-span-full">
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

            <div className="col-span-full">
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

            <div className="col-span-full">
              <div className="text-sm mb-2 text-right text-cyan-500 font-normal">
                Forgot Password?
              </div>
              <button
                type="button"
                className={`px-5 bg-cyan-500 py-3 text-white rounded-md w-full ${
                  !(dirty && isValid) && "cursor-not-allowed bg-cyan-100"
                }`}
                onClick={handleSubmit}
                disabled={!(dirty && isValid)}
              >
                Login
              </button>
              <div
                onClick={() => navigate("/register")}
                className="font-normal text-sm text-center mt-2 cursor-pointer text-cyan-500"
              >
                Don't have an account? 😒
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

export default Login;
