import React from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import PageLoader from "../../components/PageLoader";
import Spinner from "../../components/Spinner";
import { useSearchAnimeContext } from "../../context/SearchAnime";
import useSearchAnime from "../../utils/hooks/useSearchAnime";
import Animes from "../Browse/component/Animes";

const Search = () => {
  const { searchParams, setSearchParams } = useSearchAnimeContext();
  const { sortedSearchList, pages, searchingAnime, error, mutate } =
    useSearchAnime(searchParams);

  console.log(sortedSearchList);
  return (
    <div>
      <DashboardWrapper>
        <div className="my-5 font-inter">
          <div className="mx-10 font-semibold text-sm mb-5">
            Search anime 🔎
          </div>
          <div>
            {searchingAnime ? (
              <center>
                <Spinner />
              </center>
            ) : (
              <Animes
                //   handleNext={handleNext}
                //   handlePrev={handlePrev}
                sortedAnimeList={sortedSearchList}
                pages={pages}
              />
            )}
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Search;
