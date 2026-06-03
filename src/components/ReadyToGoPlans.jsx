"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
// import swiperPrev from "@/images/swiper-prev.svg";
// import swiperNext from "@/images/swiper-next.svg";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";

const ReadyToGoPlans = ({ data, className = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [active, setActive] = useState(null);
  let data1 = data;
  if (data) {
    data1 = data;
  } else {
    data1 = [
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
    ];
  }
  const totalSlides = data1?.images?.length || 0;
  return (
    <section className={`blog-slider-sec section-padding arrows-diff ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{
                __html: data1?.heading || "Ready to go Plans",
              }}
            ></h2>
            {data1?.description && (
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: data1?.description }}
              ></p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="blog-slider">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                centeredSlides={true}
                slidesPerView={1.3}
                spaceBetween={20}
                loop={true}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3.5 },
                  1400: { slidesPerView: 4.5 },
                }}
                className="blog-swiper"
              >
                {data1 &&
                  data1?.images?.length > 0 &&
                  data1?.images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      {/* <div className='ready-card'>
                                    <div className='ready-card-img'>
                                        {
                                            item.image && (
                                                <Image src={item.image} alt="blog" />
                                            )
                                        }
                                    </div>
                                    <div className='ready-card-content'>
                                        <h3>{item.title}</h3>
                                        <p className='para'>{item.desc}</p>
                                    </div>
                                </div> */}
                      <div
                        className={`blog-card click-anim-card ${active === index ? "active" : ""
                          }`}
                        onMouseEnter={() => setActive(index)}
                        onMouseLeave={() => setActive(!index)}
                      >
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
                          <p className="para">
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. */}
                            {
                              item?.description
                            }
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div ref={prevRef} className="swiper-button-prev custom-prev go-plan">
                <Image src={swiperPrev} alt="prev" />
              </div>

              <div ref={nextRef} className="swiper-button-next custom-next go-plan">
                <Image src={swiperNext} alt="next" />
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ReadyToGoPlans;
