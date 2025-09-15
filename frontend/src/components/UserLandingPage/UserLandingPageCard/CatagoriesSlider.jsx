"use client";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const CatagoriesSlider = () => {
  return (
    <div>
        <h1 className="text-center text-5xl font-bold common-text mt-24">Browse Catagories</h1>
      <div className="lg:w-4xl mx-auto mt-14">
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            769: {
              slidesPerView: 3,
              slidesPerGroup: 2,
            },
          }}
          scrollbar={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/catagory_slides/1.png"
                width={400}
                height={400}
                alt="slide_Image"
                className="w-full h-auto"
              />
              <p className="absolute bottom-4 left-0 w-full  text-white text-center text-2xl py-2">
                Fashion
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative ml-4">
              <Image
                src="/catagory_slides/2.png"
                width={400}
                height={400}
                alt="slide_Image"
                className="w-full h-auto"
              />
              <p className="absolute bottom-4 left-0 w-full  text-white text-center text-2xl py-2">
                Travels
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative ml-4">
              <Image
                src="/catagory_slides/3.png"
                width={400}
                height={400}
                alt="slide_Image"
                className="w-full h-auto"
              />
              <p className="absolute bottom-4 left-0 w-full  text-white text-center text-2xl py-2">
                Home & Lifestyle
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative ml-4">
              <Image
                src="/catagory_slides/4.png"
                width={400}
                height={400}
                alt="slide_Image"
                className="w-full h-auto"
              />
              <p className="absolute bottom-4 left-0 w-full  text-white text-center text-2xl py-2">
                Finance
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CatagoriesSlider;
