import React, { useState } from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import {
  moveBookmarktoWatched,
  moveBookmarktoWatching,
  moveWatchedtoBookmarkUrl,
  moveWatchedtoWatching,
  moveWatchingtoBookmark,
  moveWatchingtoWatchedUrl,
} from "../../utils/apiUrls/user.request";
import useApiRequest from "../../utils/hooks/useApiRequest";
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

  const userId = localStorage.getItem("id");

  const { watchList, watched, watching, mutate } = useUserAnimeList(userId);

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
    </div>
  );
};

export default Dashboard;
