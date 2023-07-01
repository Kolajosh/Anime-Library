import React, { useState } from "react";
import { ReactComponent as Menu } from "../../../assets/svg/menu.svg";
import { ToastNotify } from "../../../components/reusables/helpers/ToastNotify";
import {
  moveWatchedtoBookmarkUrl,
  moveWatchedtoWatching,
} from "../../../utils/apiUrls/user.request";
import useApiRequest from "../../../utils/hooks/useApiRequest";
import useUserAnimeList from "../../../utils/hooks/useUserAnimeList";
import { responseMessageHandler } from "../../../utils/libs";

const WatchedComponent = ({
  title,
  watched,
  onDragOver,
  onDrop,
  onDragStart,
  isDragging,
}) => {
  const userId = localStorage.getItem("id");
  const makeRequest = useApiRequest();

  const [activeIndex, setActiveIndex] = useState(null);
  const { mutate } = useUserAnimeList(userId);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMoveToWatching = async (datapayload) => {
    const payload = {
      ...datapayload,
    };
    try {
      const response = await makeRequest.post(moveWatchedtoWatching, payload);
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
  };

  const handleMoveToBookmarks = async (datapayload) => {
    const payload = {
      ...datapayload,
    };
    try {
      const response = await makeRequest.post(
        moveWatchedtoBookmarkUrl,
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
  };

  return (
    <>
      <div className="font-inter">
        <div>
          <span className="font-semibold text-sm">{title}</span>
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`${
              watched?.length === 0 && "flex items-center justify-center"
            } border-2 border-dashed h-96 overflow-scroll p-5 border-gray-200 mt-5 rounded-3xl`}
          >
            {" "}
            {watched?.length === 0 ? (
              <div className="text-xs">
                <div>No anime added 🙈</div>
              </div>
            ) : (
              <>
                {watched?.map((x, index) => (
                  <div
                    className={`border hover:cursor-grab ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    } rounded-xl mb-3 border-gray-100`}
                    draggable
                    onDragStart={(event) => onDragStart(event, x, "watched")}
                    key={index}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <div className="w-20 h-20 overflow-hidden">
                          <img
                            className="w-full rounded-l-xl h-full object-cover"
                            src={x?.coverUrl}
                            alt=""
                          />
                        </div>
                        <div className="my-auto">
                          <div className="text-[10px] font-semibold">
                            {x?.title}
                          </div>
                          <div className="text-[10px] font-light">
                            {x?.episodes} episodes
                          </div>
                          <div className="text-[10px] mt-2">1 day ago</div>
                        </div>
                      </div>
                      <div className="relative my-auto">
                        <div
                          className="cursor-pointer"
                          onClick={() => toggleSubMenu(index)}
                        >
                          <Menu />
                        </div>
                        {activeIndex === index && (
                          <div className="absolute text-xs z-10 right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                            <div
                              className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleMoveToWatching({
                                  animeId: x?.id,
                                  userId: x?.userId,
                                })
                              }
                            >
                              Edit
                            </div>
                            <div
                              className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleMoveToBookmarks({
                                  animeId: x?.id,
                                  userId: x?.userId,
                                })
                              }
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchedComponent;
