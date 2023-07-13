import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import CenterModal from "../../components/Modal/CenterModal";
import PageLoader from "../../components/PageLoader";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { reissueToken } from "../../utils/apiUrls/auth.request";
import {
  moveBookmarktoWatched,
  moveBookmarktoWatching,
  moveWatchedtoBookmarkUrl,
  moveWatchedtoWatching,
  moveWatchingtoBookmark,
  moveWatchingtoWatchedUrl,
} from "../../utils/apiUrls/user.request";
import useApiRequest from "../../utils/hooks/useApiRequest";
import useToggle from "../../utils/hooks/useToggle";
import useTrendingAnime from "../../utils/hooks/useTrendingAnime";
import useUserAnimeList from "../../utils/hooks/useUserAnimeList";
import { responseMessageHandler } from "../../utils/libs";
import TopRatedBox from "./components/TopRatedBox";
import ToWatchList from "./components/ToWatchList";
import WatchedComponent from "./components/WatchedComponent";
import WatchList from "./components/WatchList";

const Dashboard = () => {
  const makeRequest = useApiRequest();
  const { sortedAnimeTrendList } = useTrendingAnime();
  const [type, setType] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, toggleLoading] = useToggle();

  const userId = localStorage.getItem("id");

  const refreshToken = async () => {
    toggleLoading();
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const payload = {
        accessToken: token,
        refreshToken: refreshToken,
      };
      const response = await makeRequest.post(reissueToken, payload);
      if (response?.status === 200) {
        localStorage.setItem("accessToken", response?.data?.data);
        ToastNotify({
          type: "success",
          message: "Success",
          position: "top-right",
        });
      }
      toggleLoading();
      console.log(response);
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: responseMessageHandler({ error }),
        position: "top-right",
      });
    }
  };

  const { watchList, watched, watching, userAnimeListError, mutate } =
    useUserAnimeList(userId);

  const handleDragStart = (event, x, type) => {
    event.dataTransfer.setData("card", JSON.stringify(x));
    setIsDragging(true);
    setType(type);
    console.log(type);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropWatched = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const card = JSON.parse(event.dataTransfer.getData("card"));
    // Do something with the dropped card in the watched component

    if (type !== "watched") {
      try {
        const payload = {
          animeId: card?.id,
          userId: card?.userId,
        };
        const response = await makeRequest.post(
          type === "watching"
            ? moveWatchingtoWatchedUrl
            : type === "bookmark" && moveBookmarktoWatched,
          payload
        );
        if (response?.status === 200) {
          ToastNotify({
            message: "Moved",
            type: "success",
            position: "top-right",
          });
          mutate();
        }
      } catch (error) {
        ToastNotify({
          message: responseMessageHandler({ error }),
          type: "error",
          position: "top-right",
        });
      }
    }

    console.log("Dropped card:", card);
  };

  const handleDropBookmark = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const card = JSON.parse(event.dataTransfer.getData("card"));
    // Do something with the dropped card in the watched component

    if (type !== "bookmark") {
      try {
        const payload = {
          animeId: card?.id,
          userId: card?.userId,
        };
        const response = await makeRequest.post(
          type === "watching"
            ? moveWatchingtoBookmark
            : type === "watched" && moveWatchedtoBookmarkUrl,
          payload
        );
        if (response?.status === 200) {
          ToastNotify({
            message: "Moved",
            type: "success",
            position: "top-right",
          });
          mutate();
        }
      } catch (error) {
        ToastNotify({
          message: responseMessageHandler({ error }),
          type: "error",
          position: "top-right",
        });
      }
    }

    console.log("Dropped card:", card);
  };

  const handleDropWatching = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const card = JSON.parse(event.dataTransfer.getData("card"));
    // Do something with the dropped card in the watched component

    if (type !== "watching") {
      try {
        const payload = {
          animeId: card?.id,
          userId: card?.userId,
        };
        const response = await makeRequest.post(
          type === "bookmark"
            ? moveBookmarktoWatching
            : type === "watched" && moveWatchedtoWatching,
          payload
        );
        if (response?.status === 200) {
          ToastNotify({
            message: "Moved",
            type: "success",
            position: "top-right",
          });
          mutate();
        }
      } catch (error) {
        ToastNotify({
          message: responseMessageHandler({ error }),
          type: "error",
          position: "top-right",
        });
      }
    }
  };

  return (
    <div>
      <DashboardWrapper>
        {loading && <PageLoader message="Refreshing" />}
        <div className="my-5 font-inter">
          {/* <div className="font-bold text-xl mb-5">Anime Library 👒</div> */}
          <div className="mx-10 font-semibold text-sm mb-5">
            Top rated anime 🔥
          </div>
          <div className="mb-5">
            <TopRatedBox sortedAnimeTrendList={sortedAnimeTrendList} />
          </div>
          <div className="mx-10 mb-5 mt-10 font-inter text-xs"></div>

          <div className="mx-10 grid grid-cols-1 md:grid-cols-6 gap-5 mt-5">
            <div className="col-span-2">
              <WatchList
                watching={watching}
                onDragStart={handleDragStart}
                onDrop={handleDropWatching}
                onDragOver={handleDragOver}
                isDragging={isDragging}
                title="Currently Watching 😴..."
              />
            </div>
            <div className="col-span-2">
              <WatchedComponent
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDropWatched}
                watched={watched}
                isDragging={isDragging}
                title="Watched 👀..."
              />
            </div>
            <div className="col-span-2">
              <ToWatchList
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDropBookmark}
                watchList={watchList}
                isDragging={isDragging}
                title="Bookmarks 👀..."
              />
            </div>
          </div>
        </div>
      </DashboardWrapper>
      {userAnimeListError?.response?.status === 401 && (
        <CenterModal title="Session" width="50%">
          <div className="font-normal text-sm font-inter mb-3 text-center">
            Your session has expired
          </div>
          <div className="flex justify-center gap-5">
            <div onClick={() => refreshToken()}>
              <Button labelText="Refresh Session" />
            </div>
            <div
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <Button buttonVariant="secondary" labelText="Logout" />
            </div>
          </div>
        </CenterModal>
      )}
    </div>
  );
};

export default Dashboard;
