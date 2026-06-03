"use client";
import React, { useState, useEffect, useRef } from "react";
import VenueCard from "@/components/VenueCard";
import VenueInner from "@/components/VenueInner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "@/helpers/api";

const QuizResult = ({ venues }) => {
  const swiperRefs = useRef({});
  const sliderRefs = useRef({});
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedVenueDetails, setSelectedVenueDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVenueCardsDetails = async (slug, venue) => {
    setSelectedVenue(venue); // highlight card
    setLoading(true);

    try {
      const res = await api.get(`/venue/${slug}`);
      setSelectedVenueDetails(res?.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (venues && venues.length > 0) {
      const firstVenue = venues[0];

      // already selected na ho tabhi run kare
      if (!selectedVenue) {
        fetchVenueCardsDetails(firstVenue?.slug, firstVenue);
      }
    }
  }, [venues]);

  const handleVenueRedirect = (slug, venue) => {
    if (!slug) return;

    // first fetch selected venue details
    fetchVenueCardsDetails(slug, venue);

    // then scroll to venue details section below
    setTimeout(() => {
      const detailsSection = document.getElementById("venue-details-section");

      if (detailsSection) {
        detailsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500); // small delay so data loads first
  };

  const handlerefresh = () => {
    window.location.reload();
  };
  return (
    <section className="venue-res-sec">
      <div
        className="tp-ven mb-5"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <h3 className="sec-head medium">
          <span>Party Venues</span> For You
        </h3> */}
        {/* <button className="main-btn sm" onClick={handlerefresh}>
          <span>Retake Quiz</span>
        </button> */}
        <h5 className="m-4"> Disclaimer: We have provided estimated lower and upper
          ranges based on the minimum and maximum guest sizes.
          These are only approximations</h5>
      </div>
      <div className="row row-gap-25">
        {venues && venues.length > 0 ? (
          venues?.map((venue, index) => (
            <div className="col-lg-3 col-12" key={index}>
              <div onClick={() =>
                handleVenueRedirect(venue?.slug, venue)
              }>
                <VenueCard
                  venue={venue}
                  clickable
                  selectedVenue={selectedVenue}
                  onClick={() =>
                    fetchVenueCardsDetails(venue?.slug, venue)
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="sec-head medium-20 text-center">
              No venues found for your search
            </p>
          </div>
        )}
      </div>

      {selectedVenue && (
        <div id="venue-details-section" className="mt-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Swiper slidesPerView={1} spaceBetween={10} allowTouchMove={false}
              onSwiper={(swiper) => {
                swiperRefs.current = swiper;
              }}
              key={`${selectedVenueDetails?.id || "default"}`}>
              {selectedVenueDetails ? (
                <SwiperSlide key={selectedVenueDetails?.id}>
                  <VenueInner venue={selectedVenueDetails} />
                </SwiperSlide>
              ) : null}
            </Swiper>
          )}
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button onClick={handlerefresh} className="main-btn">
          <span>Return to venue finder</span>
        </button>
      </div>

    </section>
  );
};

export default QuizResult;
