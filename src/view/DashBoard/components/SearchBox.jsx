import React from "react";

const SearchBox = ({ value, onChange }) => {
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
        className="px-4 py-2 border bg-gray-300 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm placeholder-gray-400"
        placeholder="Search..."
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.447 11.764l4.612 4.612a1 1 0 01-1.414 1.414l-4.612-4.612a8 8 0 111.414-1.414zm-4.766.292a5 5 0 111.415-1.414 5 5 0 01-1.415 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBox;
