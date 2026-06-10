import React, { useEffect, useRef, useState } from "react";
import VenueCard from "@/components/VenueCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "@/helpers/api";
import VenueInner from "@/components/VenueInner";

const QuizResult = ({ venues, venues_price }) => {
  const swiperRefs = useRef({});
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
  console.log("quiz_result", venues_price)
  return (
    <section className="venue-res-sec">
      <div
        className="tp-ven mb-40"
        style={{
          // display: "flex",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {/* <h1 className="sec-head text-center">
          <span>Rs {venues_price?.budget_min} - {venues_price?.budget_max}</span>
        </h1> */}
        <h1 className="sec-head text-center">
          <span>
            ₹ {venues_price?.budget_min?.toLocaleString("en-IN")} –{" "}
            {venues_price?.budget_max?.toLocaleString("en-IN")} / person
          </span>
        </h1>
        <h3 className="sec-head medium">
          Your <span>Budget-friendly</span> Venues

        </h3>
        {/* <button className="main-btn sm mx-auto" onClick={handlerefresh}>
          <span>Retake Quiz</span>
        </button> */}
        <h5 className="m-4"> Disclaimer: We have provided estimated lower and upper
          ranges based on the minimum and maximum guest sizes.
          These are only approximations</h5>
      </div>
      <div className="row row-gap-25">
        {venues && venues.length > 0 ? (
          venues?.map((venue, index) => (
            <div className="col-lg-3 col-12" key={index} onClick={() =>
              handleVenueRedirect(venue?.slug, venue)
            }>
              <VenueCard venue={venue}
                clickable
                selectedVenue={selectedVenue}
                onClick={() =>
                  fetchVenueCardsDetails(venue?.slug, venue)
                } />
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
                  <VenueInner noImage={true} venue={selectedVenueDetails}
                    page_type="resources_page" />
                </SwiperSlide>
              ) : null}
            </Swiper>
          )}
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button onClick={handlerefresh} className="main-btn">
          <span>Return to cost calculator</span>
        </button>
      </div>
    </section>
  );
};

export default QuizResult;
