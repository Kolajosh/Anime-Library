import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import useTrendingAnime from "../../utils/hooks/useTrendingAnime";
import SearchBox from "./components/SearchBox";
import TopRatedBox from "./components/TopRatedBox";
import WatchedComponent from "./components/WatchedComponent";
import { genre } from "./constatnts";

const Dashboard = () => {
  const { sortedAnimeTrendList, gettingTrendingAnime } = useTrendingAnime();
  console.log(sortedAnimeTrendList);
  const [selectedValue, setSelectedValue] = useState("Watch List");

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
          <div className="mx-10 mb-5 mt-10 font-inter text-xs">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className=" bg-transparent border-b border-black py-2 px-3 text-xs leading-tight focus:outline-none focus:border-blue-500"
            >
              <option className="py-1" value="Watch List">
                Watch List
              </option>
              <option className="py-1" value="Watching">
                Watching
              </option>
              <option className="py-1" value="Watched">
                Watched
              </option>
            </select>
          </div>

          <div className="mx-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="col-span-2">
              {selectedValue === "Watch List" && (
                <WatchedComponent title="Watch List 😴..." />
              )}
              {selectedValue === "Watching" && (
                <WatchedComponent title="Watching 👀..." />
              )}
              {selectedValue === "Watched" && (
                <WatchedComponent title="Watched 🔥..." />
              )}
            </div>
            <div className="col-span-2">
              <div>
                <span className="font-semibold text-sm">
                  Discover Popular Categories
                </span>
                <div className="flex flex-wrap gap-4 mt-5 text-xs font-light text-gray-500">
                  {genre?.map((x, index) => (
                    <>
                      <div
                        key={index}
                        className="px-4 cursor-pointer hover:bg-cyan-300 py-2 bg-white shadow-lg rounded-3xl"
                      >
                        {x?.name}
                      </div>
                    </>
                  ))}
                  <button className="bg-cyan-600 px-4 py-2 text-white rounded-3xl">
                    {"View all >"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Dashboard;
