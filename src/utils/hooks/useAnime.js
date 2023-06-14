// import { responseMessageHandler } from "../../libs";
import useSWR from "swr";
// import { ToastNotify } from "../../component/reusables/helpers/ToastNotify";
import { getAnimeUrl } from "../apiUrls/anime.request";
import useToggle from "./useToggle";
import useApiRequest from "./useApiRequest";

const useAnime = (pageNumber) => {
  const makeRequest = useApiRequest();
  const [gettingCategories, toggleGettingCategories] = useToggle();

  const fetchAnime = async () => {
    // toggleGettingCategories();
    try {
      const { data } = await makeRequest.get(getAnimeUrl(pageNumber));
      // toggleGettingCategories();
      return data;
    } catch (error) {
      // toggleGettingCategories();
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
  };
};

export default useAnime;
