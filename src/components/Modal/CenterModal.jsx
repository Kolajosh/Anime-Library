import React from "react";
// import { PrimaryButton } from "../Buttons";
import { ReactComponent as PendingIcon } from "../../assets/svg/error-icon.svg";
import { ReactComponent as Close } from "../../assets/svg/Close.svg";

const CenterModal = ({
  icon = <PendingIcon />,
  title,
  subTitle,
  children,
  info,
  handleClick,
  handleClose,
  handleClick2,
  showCloseIcon,
  width = "90%"
}) => {
  return (
    <div
      onClick={handleClose}
      className="fixed font-inter top-0 left-0 flex justify-center items-center w-full h-full bg-black/80 p-5 z-50 overflow-scroll backdrop-filter backdrop-blur-sm"
    >
      <center className="flex justify-center items-center w-full">
        <div
          className={`h-auto w-[${width}] bg-white fixed border z-5000 rounded-md py-2 overflow-y-auto`}
          style={{ maxHeight: "80vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-6 my-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-left text-alat-im-black">
                {title}
              </p>
              <div className="cursor-pointer" onClick={handleClose}>
                <Close />
              </div>
            </div>
            <p className="text-[10px] font-normal text-left pt-0.5 text-nav-item-inactive">
              {subTitle}
            </p>
            <p className="text-xs text-lib-alat-black text-left">{info}</p>
            <div className="mt-6 py-2 text-left">{children}</div>
          </div>
          {/* <div className="px-4 py-2"></div> */}
        </div>
      </center>
    </div>
  );
};

export default CenterModal;
