import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import useTrendingAnime from "../../utils/hooks/useTrendingAnime";
import useUserAnimeList from "../../utils/hooks/useUserAnimeList";
import SearchBox from "./components/SearchBox";
import TopRatedBox from "./components/TopRatedBox";
import ToWatchList from "./components/ToWatchList";
import WatchedComponent from "./components/WatchedComponent";
import WatchList from "./components/WatchList";
import { genre } from "./constatnts";

const Dashboard = () => {
  const { sortedAnimeTrendList, gettingTrendingAnime } = useTrendingAnime();
  const [selectedValue, setSelectedValue] = useState("Watch List");

  const userId = localStorage.getItem("id");

  const { watchList, watched, watching } = useUserAnimeList(userId);

  console.log(watchList);
  console.log(watched);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  console.log(selectedValue);

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
              <WatchList watching={watching} title="Currently Watching 😴..." />
            </div>
            <div className="col-span-2">
              <WatchedComponent watched={watched} title="Watched 👀..." />
            </div>
            <div className="col-span-2">
              <ToWatchList watchList={watchList} title="Bookmarks 👀..." />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Dashboard;
