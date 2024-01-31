/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NoImg } from "../../../../assets/icon";

export default function Carousel({ data, height }) {

   const [modalOfCarsouel, setModalOfCarsouel] = useState(false)

  function handleClickCarosuel() {
    setModalOfCarsouel(true)
  }

  console.log(data,'data');

  return (
    <div>
      
      <div className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`} >
       {data?.photos && data.photos.length ?
       (
          <img
            className="object-cover rounded-lg"
            src={data?.photos[0]?.url_photo}
            alt=""
          />
        ):(
        <span className="w-full h-full flex items-center justify-center">
          <NoImg/>
        </span>
       )
       }
      </div> 
      <div className="w-full flex items-center h-fit md:mt-3">
        { data?.photos?.length > 1 ? (
          data?.photos?.map( item => {
            return(
              <button 
                type="button"
                onClick={()=> {
                  handleClickCarosuel()
                  // setModalId(item?.id)
                }}
                className="w-[110px] h-fit border border-red rounded-lg overflow-hidden">
                <img
                  key={item?.id}
                  className="object-cover rounded-lg"
                  src={item?.url_photo}
                  alt=""
                />
              </button>
            )
          })
        ) : (
        <div className="w-full flex items-center justify-between gap-x-2">
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg />
            </span>
          </button>
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg />
            </span>
          </button>
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg width="" height=""/>
            </span>
          </button>
        </div>
        )
        }
      </div> 
    </div>
  );
}
