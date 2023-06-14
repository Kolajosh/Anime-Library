// import { responseMessageHandler } from "../../libs";
import useSWR from "swr";
// import { ToastNotify } from "../../component/reusables/helpers/ToastNotify";
import { getAnimeUrl, getTrendingAnimeUrl } from "../apiUrls/anime.request";
import useToggle from "./useToggle";
import useApiRequest from "./useApiRequest";

const useTrendingAnime = () => {
  const makeRequest = useApiRequest();
  const [gettingCategories, toggleGettingCategories] = useToggle();

  const fetchTrendingAnime = async () => {
    // toggleGettingCategories();
    try {
      const { data } = await makeRequest.get(getTrendingAnimeUrl);
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
  } = useSWR(getTrendingAnimeUrl, fetchTrendingAnime);

  const sortedAnimeTrendList = categories?.data?.page?.media;
  const pages = categories?.data?.page;

  return {
    getTrendingAnime: fetchTrendingAnime,
    gettingTrendingAnime: isLoading,
    sortedAnimeTrendList,
    error,
    mutate,
  };
};

export default useTrendingAnime;
