import React, { useState } from "react";
import { ReactComponent as Menu } from "../../../assets/svg/menu.svg";
import img from "../../../assets/img/random.png";

const data = [
  {
    name: "Naruto",
    episodes: 700,
  },
  {
    name: "Bleach",
    episodes: 30,
  },
  {
    name: "Demon Slayer",
    episodes: 160,
  },
];

const WatchedComponent = ({ title }) => {
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
          <div className="bg-gray-100
          ' px-3 rounded-r-3xl">
            {data?.map((x, index) => (
              <div
                className="px-3 py-5 rounded-lg border-b border-gray-300 mt-3"
                key={index}
              >
                <div className="flex justify-between">
                  <div className="flex  gap-2">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="text-sm font-normal">{x?.name}</div>
                      <div className="text-[10px]">{x?.episodes} episodes</div>
                      <div className="text-[10px] mt-2">1 day ago</div>
                    </div>
                  </div>
                  <div className="relative">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchedComponent;
