// import { responseMessageHandler } from "../../libs";
import useSWR from "swr";
// import { ToastNotify } from "../../component/reusables/helpers/ToastNotify";
import { getAnimeUrl } from "../apiUrls/anime.request";
import useToggle from "./useToggle";
import useApiRequest from "./useApiRequest";
import { useState } from "react";

const useAnime = (pageNumber) => {
  const makeRequest = useApiRequest();
  const [gettingCategories, toggleGettingCategories] = useToggle();
  const [authorized, setAuthorized] = useState();

  const fetchAnime = async () => {
    try {
      const { data } = await makeRequest.get(getAnimeUrl(pageNumber));
      return data;
    } catch (error) {
      console.log(error?.response?.status);
      if (error?.response?.status === 401) {
        setAuthorized(false);
      }
      throw error;
    }
  };

  const {
    data: categories = [],
    error,
    mutate,
    isLoading,
  } = useSWR([pageNumber, makeRequest], fetchAnime);

  const sortedAnimeList = categories?.data?.page?.media;
  const pages = categories?.data?.page;

  return {
    getAnime: fetchAnime,
    gettingAnime: isLoading,
    sortedAnimeList,
    error,
    mutate,
    auth: authorized,
  };
};

export default useAnime;
