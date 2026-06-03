"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import venueImg1 from "@/images/venue1.jpg";

// Example images, replace with your own or pass as props
const dummyImages = [venueImg1, venueImg1, venueImg1];

const VenueImgSlider = ({ images = dummyImages }) => {
  return (
    <div className="venue-inner-img-slider">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{ borderRadius: "20px", overflow: "hidden" }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="venue-inner-img-slider-item">
              <Image
                src={img}
                alt={`Venue image ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 600px"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VenueImgSlider;
