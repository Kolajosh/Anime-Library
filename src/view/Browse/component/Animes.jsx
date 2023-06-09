import React, { useState } from "react";
import classNames from "classnames";
import CenterModal from "../../../components/Modal/CenterModal";
import { Button } from "../../../components/Button/Button";
import useToggle from "../../../utils/hooks/useToggle";
import parse from "html-react-parser";
import useApiRequest from "../../../utils/hooks/useApiRequest";
import {
  addToCurrentlyWatchingListUrl,
  addToWatchedListUrl,
  addToWatchListUrl,
} from "../../../utils/apiUrls/user.request";
import { ToastNotify } from "../../../components/reusables/helpers/ToastNotify";
import { responseMessageHandler } from "../../../utils/libs";
import PageLoader from "../../../components/PageLoader";

const Animes = ({ sortedAnimeList, pages, handleNext }) => {
  console.log(sortedAnimeList);
  const makeRequest = useApiRequest();
  const userId = localStorage?.getItem("id");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animeIndex, setAnimeIndex] = useState(null);
  const [modal, toggleModal] = useToggle();
  const [loading, toggleLoading] = useToggle();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // funtion to add anime to watching
  const handleAddToBookmark = async (anime) => {
    toggleLoading();
    const payload = {
      userId: userId,
      media: { ...anime },
    };
    try {
      const response = await makeRequest.post(addToWatchListUrl, payload);
      console.log(response);
      if (response?.status === 200) {
        ToastNotify({
          type: "success",
          message: "Anime added to watching",
          position: "top-right",
        });
      }
      toggleLoading();
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: responseMessageHandler({ error }),
        position: "top-right",
      });
    }
  };

  // funtion to add anime to watched
  const handleAddToWatched = async (anime) => {
    toggleLoading();
    const payload = {
      userId: userId,
      media: { ...anime },
    };
    try {
      const response = await makeRequest.post(addToWatchedListUrl, payload);
      console.log(response);
      if (response?.status === 200) {
        ToastNotify({
          type: "success",
          message: "Anime added to watched list",
          position: "top-right",
        });
      }
      toggleLoading();
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: responseMessageHandler({ error }),
        position: "top-right",
      });
    }
  };

  // funtion to add anime to currently watching
  const handleAddToCurrentlyWatching = async (anime) => {
    toggleLoading();
    const payload = {
      userId: userId,
      media: { ...anime },
    };
    try {
      const response = await makeRequest.post(
        addToCurrentlyWatchingListUrl,
        payload
      );
      console.log(response);
      if (response?.status === 200) {
        ToastNotify({
          type: "success",
          message: "Anime added to currently watching list",
          position: "top-right",
        });
      }
      toggleLoading();
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: responseMessageHandler({ error }),
        position: "top-right",
      });
    }
  };

  return (
    <div className="font-inter">
      {loading && <PageLoader message={"Adding"} />}
      <div className="mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedAnimeList?.map((anime, index) => (
          <div key={index}>
            <div
              className="relative text-center cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setAnimeIndex(index);
                toggleModal();
              }}
            >
              <div>
                <img
                  src={anime?.coverImage?.extraLarge}
                  className="w-full h-96 object-cover"
                  alt=""
                />
                <div
                  className={classNames(
                    "absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300",
                    {
                      "opacity-0": hoveredIndex === index,
                      "opacity-100": hoveredIndex !== index,
                    }
                  )}
                >
                  <div className="bg-black h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                    <p className="text-white text-lg font-bold text-center">
                      {anime?.title?.romaji}
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    "absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300",
                    {
                      "opacity-100": hoveredIndex === index,
                      "opacity-0": hoveredIndex !== index,
                    }
                  )}
                >
                  <div className="bg-black relative h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                    <p className="text-white text-[10px] font-light text-center truncate">
                      {anime?.description === null
                        ? anime?.description
                        : parse(anime?.description)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="flex gap-5 justify-center font-inter text-xs items-center mt-3">
        <div className="font-bold cursor-pointer border-2 rounded-xl p-3 hover:bg-cyan-500">
          Previous
        </div>
        <div className="font-light">
          <span>{pages?.pageInfo?.currentPage}</span> of{" "}
          <span>{pages?.pageInfo?.lastPage}</span>
        </div>
        <div
          onClick={handleNext}
          className="font-bold border-2 rounded-xl p-3 hover:bg-cyan-500 cursor-pointer"
        >
          Next
        </div>
      </div>

      {/* anime details modal */}
      {modal && (
        <CenterModal
          handleClose={toggleModal}
          title={sortedAnimeList[animeIndex]?.title?.romaji}
        >
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative">
                <img
                  src={sortedAnimeList[animeIndex]?.coverImage?.extraLarge}
                  className="w-full h-auto object-cover col-span-1"
                  alt=""
                />
                <div className="relative">
                  <div
                    onClick={() =>
                      handleAddToCurrentlyWatching(sortedAnimeList[animeIndex])
                    }
                  >
                    <Button
                      containerVariant="w-full mt-3 h-10 rounded-md flex justify-center"
                      labelText="Add to Watching"
                      buttonVariant="primary"
                    />
                  </div>
                  <div
                    onClick={() =>
                      handleAddToBookmark(sortedAnimeList[animeIndex])
                    }
                  >
                    <Button
                      containerVariant="w-full mt-3 h-10 rounded-md flex justify-center"
                      labelText="Bookmark"
                      buttonVariant="secondary"
                    />
                  </div>
                </div>
              </div>
              <div className="font-verdana space-y-5 col-span-2">
                <div>
                  <div className="font-semibold">Description</div>
                  <div className="text-sm font-light font-inter">
                    {sortedAnimeList[animeIndex]?.description === null
                      ? sortedAnimeList[animeIndex]?.description
                      : parse(sortedAnimeList[animeIndex]?.description)}
                    <br />
                    <span>Already watched?</span>
                    <div
                      onClick={() =>
                        handleAddToWatched(sortedAnimeList[animeIndex])
                      }
                      className="mt-2"
                    >
                      <Button
                        labelText="Add to Watched"
                        buttonVariant="secondary"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Status</div>
                  <div className="text-sm font-light font-inter">
                    {sortedAnimeList[animeIndex]?.status}
                  </div>
                  <div className="text-sm font-inter font-light">
                    <span className="font-semibold">Air Date</span>:{" "}
                    {sortedAnimeList[animeIndex]?.startDate?.year}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Episodes</div>
                  <div className="text-sm font-light font-inter">
                    {sortedAnimeList[animeIndex]?.episodes}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Genres</div>
                  <div>
                    {sortedAnimeList[animeIndex]?.genres?.map((x, index) => (
                      <span
                        className="text-sm font-light font-inter"
                        key={index}
                      >
                        {x}{" "}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <a
                    className="text-red-500 font-inter font-semibold text-xs"
                    href={sortedAnimeList[0]?.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View more Details ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CenterModal>
      )}
    </div>
  );
};

export default Animes;
