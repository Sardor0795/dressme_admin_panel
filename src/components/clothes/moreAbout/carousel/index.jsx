import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div>
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        className="mb-[10px]"
        outline={false}
      >
        <div className="w-[350px] h-[377px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <div className="w-[350px] h-[377px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://neemlondon.com/cdn/shop/products/Zqm_Tsh_Dar_001_533x.jpg"
            alt=""
          />
        </div>
        <div className="w-[350px] h-[377px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <div className="w-[350px] h-[377px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://images.ctfassets.net/1zbm708fksg8/7MNcFHDWzrzhPmVOYgstrm/c9ed3cdffa298abd5257f7155825e9eb/Shirts.jpg"
            alt=""
          />
        </div>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
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
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <div className="w-[110px] h-[73px] rounded-lg overflow-hidden cursor-pointer">
          <img
            className="object-fill rounded-lg"
            src="https://images.ctfassets.net/1zbm708fksg8/7MNcFHDWzrzhPmVOYgstrm/c9ed3cdffa298abd5257f7155825e9eb/Shirts.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
