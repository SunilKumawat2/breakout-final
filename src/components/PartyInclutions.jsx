"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import PartyCard from "./PartyCard";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import Image from "next/image";

const PartyInclutions = ({ data }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={4}
              loop={true}
              navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2.5,
                },
                992: {
                  slidesPerView: 3.5,
                },
                1400: {
                  slidesPerView: 3.5,
                },
              }}
              className="blog-swiper"
            >
              {data?.images?.length > 0 &&
                data?.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PartyCard data={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="button-prev custom-prev go-plan">
              <Image src={swiperPrev} alt="Previous" />
            </div>

            <div className="button-next custom-next go-plan">
              <Image src={swiperNext} alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="sec-head medium-20">
              {/* <span>{data?.note}</span> */}
              <span  dangerouslySetInnerHTML={{
                      __html: data?.note,
                    }}/>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartyInclutions;
