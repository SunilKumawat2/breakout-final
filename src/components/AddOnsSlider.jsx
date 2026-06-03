"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import cv1 from "@/images/cv1.jpg";
import cv2 from "@/images/cv2.jpg";
import cv3 from "@/images/cv3.jpg";
import cv4 from "@/images/cv4.jpg";
import cv5 from "@/images/cv5.jpg";
import cv6 from "@/images/cv6.jpg";
// import swiperPrev from "@/images/swiper-prev.svg";
// import swiperNext from "@/images/swiper-next.svg";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import Link from "next/link";
import api from "@/app/helpers/api";

const AddOnsSlider = ({ data, className = "", page_type }) => {
  const [activities, setActivities] = useState(null);
  console.log("activities_activities_activities", data)
  const addOns = [
    {
      image: cv1,
      title: "Success Decors",
    },
    {
      image: cv2,
      title: "Hi-Tea",
    },
    {
      image: cv3,
      title: "Lunch / Dinner Buffet",
    },
    {
      image: cv4,
      title: "Hi-Tea",
    },
    {
      image: cv5,
      title: "Karaoke",
    },
    {
      image: cv6,
      title: "Photography",
    },
  ];

  const fetchActivities = async () => {
    const res = await api.get(`/activity-listing`);
    setActivities(res.data.data);
  };

  useEffect(() => {
    fetchActivities();
  }, [])
  return (
    <section className={`blog-slider-sec ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium mb-0"
              dangerouslySetInnerHTML={{ __html: data?.heading }}
            />
            {data?.description && (
              <p
                className="para medium-20 mt-3"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="row mt-40">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".add-button-next",
                prevEl: ".add-button-prev",
              }}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
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
                  slidesPerView: 4.3,
                },
              }}
              className="blog-swiper"
            >
              {/* {data?.images &&
                data?.images?.length > 0 &&
                data?.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    {
                      item?.blog_link ? (
                    <Link href={item.blog_link ? item.blog_link : ""} target="_blank" className="blog-card" >
                      <div className="blog-card-img">
                        {item.image && (
                          <Image
                            src={item.image}
                            width={500}
                            height={500}
                            alt={item.heading}
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item.heading }}
                        />
                      </div>
                    </Link>
                      ):(
<div className="blog-card">
<div className="blog-card-img">
                        {item.image && (
                          <Image
                            src={item.image}
                            width={500}
                            height={500}
                            alt={item.heading}
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item.heading }}
                        />
                      </div>
</div>
                      )
                    }
                  </SwiperSlide>
                ))} */}

              {data?.images &&
                data?.images?.length > 0 &&
                data?.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    {/* <Link href={`${item?.link}`}  className="blog-card" > */}
                    <Link
                     href={item?.blog_link ?? item?.link}
                      // target="_blank"
                      className="blog-card"
                      onClick={() => {
                        sessionStorage.setItem("page_type", page_type);
                      }}
                    >
                      <div className="blog-card-img">
                        {item?.image && (
                          <Image
                            src={item?.image}
                            alt={item?.heading}
                            width={500}
                            height={500}
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item?.heading }}
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="add-button-prev custom-prev go-plan">
              <Image src={swiperPrev} alt="Previous" />
            </div>

            <div className="add-button-next custom-next go-plan">
              <Image src={swiperNext} alt="Next" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOnsSlider;
