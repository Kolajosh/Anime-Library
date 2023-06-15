import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchBox from "../../view/DashBoard/components/SearchBox";

const Navbar = () => {
  const location = useLocation();
  const [activeTab1, setActiveTab1] = useState(false);
  const [activeTab2, setActiveTab2] = useState(false);
  const [activeTab3, setActiveTab3] = useState(false);

  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveTab1(true);
    }
    if (location.pathname === "/browse") {
      setActiveTab2(true);
    }
    if (location.pathname === "/vendors") {
      setActiveTab3(true);
    }
  }, []);

  return (
    <div className="flex font-poppins text-sm justify-between px-10 py-4">
      {/* logo */}
      <div className="flex items-center font-bold text-2xl">Anime Library</div>

      {/* nav links */}
      <div className="flex font-inter text-nav-item-inactive text-black items-center gap-5">
        <div className={`${activeTab1 && "text-nav-item-active font-bold"}`}>
          <NavLink to={"/dashboard"}>Boards</NavLink>
        </div>
        <div className={`${activeTab2 && "text-nav-item-active font-bold"}`}>
          <NavLink to={"/browse"}>Browse</NavLink>
        </div>
        <div className={`${activeTab3 && "text-nav-item-active font-bold"}`}>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </div>
      </div>

      <div>
        <SearchBox />
      </div>

      {/* profile management */}
      <div className="flex font-inter text-black items-center text-alat-im-black gap-6">
        <div>{/* <NotificationIcon /> */}</div>
        <div className="flex items-center gap-1">
          {/* <AccountIcon /> */}
          <span>Hi, {firstName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
