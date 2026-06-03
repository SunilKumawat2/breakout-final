import React from "react";
import Image from "next/image";
import gIcon from "@/images/g-icon.svg";
import star from "@/images/star.svg";
import starStroke from "@/images/star-stroke.svg";

const GReviewCard = ({ name, stars, heading, description }) => {
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

  return (
    <div className="g-review-card">
      <div className="top-part mb-4">
        <div className="left-part">
          <h3
            className="sec-head medium-20"
            dangerouslySetInnerHTML={{
              __html: heading,
            }}
          >
            {/* "Amazing experience! */}
          </h3>
          <p
            className="sec-head book-20"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          >
            {/* "Amazing experience! */}
          </p>
        </div>
        <Image src={gIcon} alt="review" />
      </div>
      <div className="bottom-part" style={{ justifyContent: "center" }}>
        <div
          className="rating-part"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: name,
            }}
          >
            {/* Anita Desai */}
          </p>
          <ul className="rating">{renderStars(parseInt(stars))}</ul>
        </div>
      </div>
    </div>
  );
};

export default GReviewCard;
