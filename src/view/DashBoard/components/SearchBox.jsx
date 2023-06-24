import React from "react";
import { ReactComponent as Search } from "../../../assets/svg/search.svg";

const SearchBox = ({ value, onChange, handleClick }) => {
  const handleIconClick = () => {
    // Handle the click event for the search icon
    console.log("Search icon clicked");
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="px-4 py-2 border bg-gray-300 border-gray-500 rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm placeholder:text-xs placeholder-gray-400"
        placeholder="Search Anime..."
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
        <Search />
      </div>
    </div>
  );
};

export default SearchBox;
