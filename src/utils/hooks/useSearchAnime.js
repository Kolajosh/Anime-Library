import React from "react";
import useSWR from "swr";
import { searchAnimeUrl } from "../apiUrls/anime.request";
import useApiRequest from "./useApiRequest";

const useSearchAnime = (param) => {
  const makeRequest = useApiRequest();

  const searchAnime = async () => {
    try {
      const { data } = await makeRequest.post(searchAnimeUrl(param));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const {
    data: categories = [],
    error,
    mutate,
    isLoading,
  } = useSWR([param, makeRequest], searchAnime);

  const sortedSearchList = categories?.data?.page?.media;
  const pages = categories?.data?.page;
  return {
    searchAnime: searchAnime,
    searchingAnime: isLoading,
    sortedSearchList,
    pages,
    error,
    mutate,
  };
};

export default useSearchAnime;
