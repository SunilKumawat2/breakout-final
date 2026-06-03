'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      className="image-slider"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="slider-img">
            {
                image && (
                <Image 
                    src={image}
                    alt={`slide-${index + 1}`}
                    className="w-100 h-auto"
                />
                ) 
            }
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider
