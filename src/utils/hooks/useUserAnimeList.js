import useSWR from "swr";
import { getUserListUrl } from "../apiUrls/user.request";
import useApiRequest from "./useApiRequest";

const useUserAnimeList = (userId) => {
  const makeRequest = useApiRequest();

  const fetchList = async () => {
    try {
      const { data } = await makeRequest.get(getUserListUrl(userId));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const {
    data: userList = [],
    error,
    mutate,
    isLoading,
  } = useSWR([userId, makeRequest], fetchList);

  const watchList = userList?.data?.watchList;
  const watched = userList?.data?.watched;
  const watching = userList?.data?.watching;

  return {
    getUserList: fetchList,
    gettingList: isLoading,
    watchList,
    watched,
    watching,
    error,
    mutate,
  };
};

export default useUserAnimeList;
