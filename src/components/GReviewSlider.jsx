"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GReviewCard from "./GReviewCard";
import Image from "next/image";
import swiperPrev from "@/images/swiper-prev.svg";
import swiperNext from "@/images/swiper-next.svg";
import star from "@/images/star.svg";
import starStroke from "@/images/star-stroke.svg";


const GReviewSlider = ({ commonStars = true, data, className = "", }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i}>
          <Image src={i <= rating ? star : starStroke} alt="star" />
        </li>
      );
    }
    return stars;
  };

  const dummyData = [
    {
      name: "John Doe",
      stars: "4",
      heading: "Great Experience",
      description: "Had an amazing time with friends!",
    },
    {
      name: "Jane Smith",
      stars: "5",
      heading: "Fantastic Event",
      description: "Best birthday party ever!",
    },
    {
      name: "Mike Johnson",
      stars: "4",
      heading: "Wonderful Time",
      description: "Highly recommended!",
    },
  ];

  const reviews = data?.length > 0 ? data : dummyData;

  return (
    <div className="container">
      <section className={`g-review-slider position-relative ${className}`}>
        <div className="row">
          <div className="col-lg-12">
            <div className="g-review-swiper">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                pagination={{ clickable: true }}

                // ❌ REMOVE this
                // navigation={{
                //   prevEl: prevRef.current,
                //   nextEl: nextRef.current,
                // }}

                // ❌ REMOVE this
                // onBeforeInit={(swiper) => {
                //   swiper.params.navigation.prevEl = prevRef.current;
                //   swiper.params.navigation.nextEl = nextRef.current;
                // }}

                // ✅ ADD THIS
                navigation={true}

                breakpoints={{
                  0: { slidesPerView: 1 },
                  992: { slidesPerView: 2 },
                }}
                className="blog-swiper"

                // ✅ ADD THIS (IMPORTANT FIX)
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    if (!swiper || !swiper.params) return;

                    if (!swiper.params.navigation) {
                      swiper.params.navigation = {};
                    }

                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;

                    if (swiper.navigation) {
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  }, 0);
                }}
              >

                {reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <GReviewCard
                      name={review?.name}
                      stars={review?.stars}
                      heading={review?.heading}
                      description={review?.description}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div ref={prevRef} className="swiper-button-prev">
                <Image src={swiperPrev} alt="prev" />
              </div>

              <div ref={nextRef} className="swiper-button-next">
                <Image src={swiperNext} alt="next" />
              </div>

            </div>
          </div>
        </div>
        {/* {commonStars && (
          <div className="row">
            <p className="sec-head book-20 text-center mb-2 mt-5">
              7.8k+ people loved our events!
            </p>
            <ul className="rating d-flex align-items-center justify-content-center gap-2">
              {renderStars(4)}
            </ul>
          </div>
        )} */}
      </section>
    </div>

  );
};

export default GReviewSlider;
