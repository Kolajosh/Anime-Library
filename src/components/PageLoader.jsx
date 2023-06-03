import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Circle from "../assets/svg/circle.svg";
// import AlatLogo from "../assets/svg/alat-loader-logo.svg";

const PageLoader = ({ message }) => {
  useEffect(() => {
    const { body } = document;

    body.classList.add("overflow-hidden");
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-95 p-5 z-[9999999] overflow-hidden backdrop-filter backdrop-blur-sm"
      style={{ margin: 0 }}
    >
      <center className="z-10">
        <div className="flex justify-center items-center w-42 h-42 relative mb-4">
          <img
            src={Circle}
            className="w-24 animate-spin max-w-full"
            alt="circle"
          />
          {/* <img
            src={AlatLogo}
            className="w-20 animate-pulse absolute max-w-full"
            alt="logo"
          /> */}
        </div>
        <p className="text-white text-base loading-dot">{message}</p>
      </center>
    </div>
  );
};

PageLoader.defaultProps = {
  message: "Please wait",
};

PageLoader.propTypes = {
  message: PropTypes.string,
};

export default PageLoader;
