"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import bd1 from "@/images/bd1.jpg";
import bd2 from "@/images/bd2.jpg";
import bd3 from "@/images/bd3.jpg";
import bd4 from "@/images/bd4.jpg";
import bd5 from "@/images/bd5.jpg";
import bd6 from "@/images/bd6.jpg";
import bd7 from "@/images/bd7.jpg";
import Link from "next/link";
import placeHolder from "@/images/blog-img.jpg";

const GamificationSlider = () => {
  const data = [
    {
      image: placeHolder,
      title: "Alchemist&apos;s Workshop",
    },
    {
      image: placeHolder,
      title: "The Einstein Effect",
    },
    {
      image: placeHolder,
      title: "Casino de Facto",
    },
    {
      image: placeHolder,
      title: "Timely Tuning",
    },
    {
      image: placeHolder,
      title: "Culinary Cohesion",
    },
    {
      image: placeHolder,
      title: "Shared Value",
    },
  ];
  return (
    <section className="blog-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head sm-head medium">
              Real-Life Scenarios For <span>Gamification</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={4}
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
                  slidesPerView: 4.5,
                },
              }}
              className="blog-swiper"
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="blog-card">
                    <div className="blog-card-img">
                      <Image src={item.image} alt="blog" />
                    </div>
                    <div className="blog-card-content">
                      <p
                        className="para"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSlider;
