import React from "react";
import Navbar from "../navbar/Navbar";
import ReactSuspenceWrapper from "./ReactSuspenseWrapper";

const DashboardWrapper = ({ children }) => {
  return (
    <ReactSuspenceWrapper>
      <div className="bg-white min-h-screen pb-20 overflow-hidden">
        <div className="container-fluid 2xl:container mx-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </ReactSuspenceWrapper>
  );
};

export default DashboardWrapper;
