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
const PartySlider = ({ data }) => {
  let data1 = data;
  if (data) {
    data1 = data;
  } else {
    data1 = [
      {
        image: bd1,
        title: "Return Gifts",
      },
      {
        image: bd2,
        title: "Photos & Videos",
      },
      {
        image: bd3,
        title: "Party Fun",
      },
      {
        image: bd4,
        title: "Surprises",
      },
      {
        image: bd5,
        title: "Mysteries",
      },
      {
        image: bd6,
        title: "Cakes",
      },
      {
        image: bd7,
        title: "Delectable Treats",
      },
    ];
  }
  return (
    <section className="blog-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{ __html: data1?.heading }}
            ></h2>
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
                  slidesPerView: 3.8,
                },
              }}
              className="blog-swiper"
            >
              {data1?.images &&
                data1?.images.length > 0 &&
                data1?.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="blog-card">
                      <div className="blog-card-img">
                        {item.image && (
                          <Image
                            src={item.image}
                            width={500}
                            height={500}
                            alt="blog"
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item.heading }}
                        ></h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <p className="mt-5 para yellow-text" style={{ fontSize: "18px" }}>
              Our Parties our carbon-neutral.{" "}
              <Link
                href="/"
                className="yellow-text"
                style={{ textDecoration: "underline", fontStyle: "italic" }}
              >
                Know how.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartySlider;
