import React from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import useAnime from "../../utils/hooks/useAnime";
import Animes from "./component/Animes";

const Browse = () => {
  const { gettingAnime, sortedAnimeList, error, mutate } = useAnime(1);
  console.log(sortedAnimeList);

  return (
    <div>
      <DashboardWrapper>
        <div className="my-5 font-inter">
          <div className="mx-10 font-semibold text-sm mb-5">
            Browse anime 🔎
          </div>
          <div>
            <Animes sortedAnimeList={sortedAnimeList} />
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Browse;
