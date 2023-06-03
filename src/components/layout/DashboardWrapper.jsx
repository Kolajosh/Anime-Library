import React from "react";
import Navbar from "../navbar/Navbar";
import ReactSuspenceWrapper from "./ReactSuspenseWrapper";

const DashboardWrapper = ({ children }) => {
  return (
    <ReactSuspenceWrapper>
      <div className="bg-white min-h-screen w-full pb-20 overflow-scroll">
        <div className="container-fluid 2xl:container mx-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </ReactSuspenceWrapper>
  );
};

export default DashboardWrapper;
