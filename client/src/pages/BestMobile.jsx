import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Mousewheel } from "swiper/modules";

import { asset43, asset48, asset51, asset53, asset54, asset4 } from "../assets";

export default function BestMobile() {
  return (
    <>
      <Swiper
        navigation={true}
        direction={"horizontal"}
        mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation, Mousewheel]}
        className="mySwiper  w-[80%] "
      >
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset4}
              alt=""
              className="w-52  h-36 rounded-2xl  bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">Invest in Real Estate</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset54}
              alt=""
              className="w-52  h-36 rounded-2xl  bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">plots/Land</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset48}
              alt=""
              className="w-52 h-36 rounded-2xl  bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">Buying commercial spaces</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset51}
              alt=""
              className="w-52  h-36 rounded-2xl bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">Personal Room</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset53}
              alt=""
              className="w-52 h-36 rounded-2xl  bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">Office Location</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" px-2 ">
            <img
              src={asset43}
              alt=""
              className="w-52  h-36 rounded-2xl bg-cover mx-auto mt-2  "
            />
          </div>
          <h2 className="mt-2">Lease commercial spaces</h2>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
