import React, { createContext, useContext, useState } from "react";

export const SearchAnimeContext = createContext();

const SearchAnimeContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState("");
  return (
    <SearchAnimeContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchAnimeContext.Provider>
  );
};

export const useSearchAnimeContext = () => useContext(SearchAnimeContext);

export default SearchAnimeContextProvider;
