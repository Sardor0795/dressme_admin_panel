import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ height }) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div>
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        className="mb-[10px] w-full"
        outline={false}
        arrows={false}
      >
        <div
          className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`}
        >
          <img
            className="object-cover rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div
          className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`}
        >
          <img
            className="object-cover rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div
          className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`}
        >
          <img
            className="object-cover rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div
          className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`}
        >
          <img
            className="object-cover rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        arrows={false}
        focusOnSelect={true}
      >
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
