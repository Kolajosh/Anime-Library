import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../../../assets/img/random.png";
import parse from "html-react-parser";

const TopRatedBox = ({sortedAnimeTrendList}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mx-auto">
      <Slider {...settings}>
        {sortedAnimeTrendList.map((item, index) => (
          <div key={index} className="">
            <div className="items-center grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="w-full h-96 transform rounded-xl overflow-hidden col-span-1">
                <div
                  className="w-full h-full absolute inset-0"
                  style={{
                    background: "url(blob-url-here)",
                    backgroundSize: "cover",
                  }}
                />
                <img
                  className="object-cover w-full h-full"
                  src={item?.coverImage?.extraLarge}
                  alt="rated"
                />
              </div>
              <div className=" font-inter space-y-2 col-span-2">
                <div className="text-6xl text-gray-700 font-slackSide font-bold">
                  {index + 1}
                </div>
                <div className="text-lg text-gray-700 font-semibold">
                  {item?.title?.english}
                </div>
                <div className="text-xs text-gray-500">
                  Episodes: {item.episodes}
                </div>
                <div className="text-xs text-gray-500">
                  Description: {parse(item.description)}
                </div>
                {/* <div className="text-xs text-gray-500 italic">
                  Rating: {item.rankings[0]?.context}
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopRatedBox;
