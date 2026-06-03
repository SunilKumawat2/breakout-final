"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

const dummyVenues = [
  {
    id: 1,
    name: "Venue One",
    image: "https://via.placeholder.com/300x200?text=Venue+1",
    location: "Koramangala",
  },
  {
    id: 2,
    name: "Venue Two",
    image: "https://via.placeholder.com/300x200?text=Venue+2",
    location: "Indiranagar",
  },
  {
    id: 3,
    name: "Venue Three",
    image: "https://via.placeholder.com/300x200?text=Venue+3",
    location: "MG Road",
  },
  {
    id: 4,
    name: "Venue Four",
    image: "https://via.placeholder.com/300x200?text=Venue+4",
    location: "HSR Layout",
  },
];

const VenueInnerSlider = ({ venues = dummyVenues }) => {
  return (
    <div className="venue-inner-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {venues.map((venue) => (
          <SwiperSlide key={venue.id}>{/* <Vin */}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VenueInnerSlider;
