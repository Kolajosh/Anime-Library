import React from "react";
import { SWRConfig } from "swr";
import useApiRequest from "../utils/hooks/useApiRequest";

const SwrProvider = ({ children }) => {
  const makeRequest = useApiRequest();
  const fetcher = (url, headers) =>
    makeRequest.get(url, headers).then((res) => res.data);

  const swrOptions = {
    dedupingInterval: 10000,
    errorRetryCount: 2,
    fetcher,
    focusThrottleInterval: 10000,
    onErrorRetry: (error) => {
      if (
        error?.status === 401 ||
        error?.status === 500 ||
        error?.status === 400
      ) {
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
    refreshInterval: 0.75 * 60 * 1000,
    refreshWhenHidden: true,
    revalidateOnFocus: false,
  };

  //   if (isAuthenticated && user?.token && !isTokenExpired(user?.token)) {
  return <SWRConfig value={swrOptions}>{children}</SWRConfig>;
  //   }

  //   return <>{children}</>;
};

export default SwrProvider;
