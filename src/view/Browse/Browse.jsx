import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import PageLoader from "../../components/PageLoader";
import useAnime from "../../utils/hooks/useAnime";
import Animes from "./component/Animes";

const Browse = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const { gettingAnime, sortedAnimeList, pages, mutate } =
    useAnime(pageNumber);
  console.log(sortedAnimeList);

  const handleNext = () => {
    const nextPageIndex = pageIndex + 1;
    setPageIndex(nextPageIndex);
    navigate(`/browse/page/${nextPageIndex}`);
  };

  const handlePrev = () => {
    const nextPageIndex = pageIndex - 1;
    setPageIndex(nextPageIndex);
    navigate(`/browse/page/${nextPageIndex}`);
  };

  useEffect(() => {
    mutate();
  }, [pageIndex, mutate]);

  return (
    <div>
      {gettingAnime && <PageLoader message="Fetching Anime" />}
      <DashboardWrapper>
        <div className="my-5 font-inter">
          <div className="mx-10 font-semibold text-sm mb-5">
            Browse anime 🔎
          </div>
          <div>
            <Animes
              handleNext={handleNext}
              handlePrev={handlePrev}
              sortedAnimeList={sortedAnimeList}
              pages={pages}
            />
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Browse;
