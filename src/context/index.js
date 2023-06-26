import React from "react";
import SearchAnimeContextProvider from "./SearchAnime";

const ContentGroupProvider = ({ children }) => {
  <SearchAnimeContextProvider>{children}</SearchAnimeContextProvider>;
};

export default ContentGroupProvider;
