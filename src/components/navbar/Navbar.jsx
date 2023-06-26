import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchBox from "../../view/DashBoard/components/SearchBox";
import { ReactComponent as ToggleMenu } from "../../assets/svg/bars.svg";
import { ReactComponent as Close } from "../../assets/svg/Close.svg";
import useToggle from "../../utils/hooks/useToggle";
import { ReactComponent as Search } from "../../assets/svg/search.svg";
import { useSearchAnimeContext } from "../../context/SearchAnime";
import useSearchAnime from "../../utils/hooks/useSearchAnime";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useSearchAnimeContext();
  const { sortedSearchList, error, mutate } = useSearchAnime(searchParams);
  const location = useLocation();
  const [activeTab1, setActiveTab1] = useState(false);
  const [activeTab2, setActiveTab2] = useState(false);
  const [activeTab3, setActiveTab3] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dropdown, showDropdown] = useToggle();

  const firstName = localStorage.getItem("firstName");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchParams(value);
  };

  const handleClick = () => {
    mutate();
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveTab1(true);
    }
    if (location.pathname === "/browse/page/:pageNumber") {
      setActiveTab2(true);
    }
    if (location.pathname === "/vendors") {
      setActiveTab3(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="w-full flex font-poppins text-[10px] md:text-xs justify-between items-center px-10 py-4">
        {/* logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center cursor-pointer font-bold text-lg md:text-2xl"
        >
          Anime Library
        </div>

        {/* nav links */}
        <div className="md:flex hidden font-inter text-nav-item-inactive text-black items-center gap-5">
          <div className={`${activeTab1 && "text-nav-item-active font-bold"}`}>
            <NavLink to={"/dashboard"}>Boards</NavLink>
          </div>
          <div className={`${activeTab2 && "text-nav-item-active font-bold"}`}>
            <NavLink to={`/browse/page/${1}`}>Browse(Beta)</NavLink>
          </div>
        </div>

        {/* search box */}
        <div className="">
          {location?.pathname !== "/browse/search" && (
            <div
              onClick={() => navigate("/browse/search")}
              className="cursor-pointer"
            >
              <Search />
            </div>
          )}

          {location?.pathname === "/browse/search" && (
            <SearchBox
              onChange={handleChange}
              handleClick={handleClick}
              setSearchParams={setSearchParams}
            />
          )}
        </div>

        {/* profile management */}
        <div className="md:flex hidden font-inter text-black items-center text-alat-im-black gap-6">
          <div>{/* <NotificationIcon /> */}</div>
          <div className="relative  flex items-center gap-1">
            {/* <AccountIcon /> */}
            <span className="cursor-pointer" onClick={() => showDropdown()}>
              Hi, {firstName}
            </span>
            {dropdown && (
              <div className="absolute mt-20 rounded-xl shadow p-3 -ml-3">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* toggle menu */}
        <div className="relative block md:hidden">
          <div onClick={toggleMenu} className="cursor-pointer">
            {menu ? <Close /> : <ToggleMenu />}
          </div>
        </div>
      </div>

      <div>
        <div
          className={`bg-white shadow text-sm ${
            menu ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          {menu && (
            <div>
              <div
                className={`${
                  activeTab1 && "text-nav-item-active font-bold"
                } px-10 py-3`}
              >
                <NavLink to={"/dashboard"}>Boards</NavLink>
              </div>
              <div
                className={`${
                  activeTab2 && "text-nav-item-active font-bold"
                } px-10 py-3`}
              >
                <NavLink to={`/browse/page/${1}`}>Browse(Beta)</NavLink>
              </div>
              <div
                className={`${
                  activeTab3 && "text-nav-item-active font-bold"
                } px-10 py-3`}
              >
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
