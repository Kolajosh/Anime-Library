import React, { useState } from "react";
import { ReactComponent as Menu } from "../../../assets/svg/menu.svg";

const ToWatchList = ({
  title,
  watchList,
  onDrop,
  onDragOver,
  onDragStart,
  isDragging,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEdit = (name) => {
    console.log(`Editing ${name}`);
    // Implement your edit logic here
  };

  const handleDelete = (name) => {
    console.log(`Deleting ${name}`);
    // Implement your delete logic here
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
              watchList?.length === 0 && "flex items-center justify-center"
            } border-2 border-dashed h-96 overflow-scroll p-5 border-gray-200 mt-5 rounded-3xl`}
          >
            {watchList?.length === 0 ? (
              <div className="text-xs">
                <div>No anime added 🙈</div>
              </div>
            ) : (
              <>
                {watchList?.map((x, index) => (
                  <div
                    onDragStart={(event) => onDragStart(event, x, "bookmark")}
                    className={`border hover:cursor-grab ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    } rounded-xl mb-3 border-gray-100`}
                    draggable
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
                              onClick={() => handleEdit(x?.name)}
                            >
                              Edit
                            </div>
                            <div
                              className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleDelete(x?.name)}
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

export default ToWatchList;
