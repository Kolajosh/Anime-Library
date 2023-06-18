import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../../../assets/img/random.png";
import parse from "html-react-parser";

const TopRatedBox = ({ sortedAnimeTrendList }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: false,
    nextArrow: false,
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="w-full mx-auto">
      <Slider {...settings}>
        {sortedAnimeTrendList?.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="h-96 relative">
              <img
                className="object-cover w-full h-full"
                src={item?.coverImage?.extraLarge}
                alt="rated"
              />
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                  hoverIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="bg-black h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                  <p className="text-white text-lg font-bold text-center">
                    {item?.title?.english}
                  </p>
                </div>
              </div>
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                  hoverIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-black h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                  <p className="text-white text-[10px] font-light text-center">
                    {parse(item?.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopRatedBox;
