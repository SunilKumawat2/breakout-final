import React from "react";
import Image from "next/image";
import bnInv1 from "@/images/bn-inv1.svg";
import bnInv2 from "@/images/bn-inv2.svg";
import bnInv3 from "@/images/bn-inv3.svg";
import GReviewSlider from "../GReviewSlider";
import star from "@/images/star.svg";
import starStroke from "@/images/star-stroke.svg";
import halfStar from "@/images/half-star.svg"; // add this

const ReviewWidget = ({ data, className = "" }) => {
console.log("ReviewWidget_ReviewWidget",data?.review_rating)


const renderStars = () => {
  const stars = [];
  const rating = Number(data?.review_rating) || 4;

  for (let i = 1; i <= 5; i++) {
    let icon;

    if (i <= Math.floor(rating)) {
      icon = star; // full star
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      icon = halfStar; // half star
    } else {
      icon = starStroke; // empty
    }

    stars.push(
      <li key={i}>
        <Image src={icon} alt="star" width={16} height={16} />
      </li>
    );
  }

  return stars;
};

  return (
    <section className={`b-inv-g-review-widget sec-padding-top ${className}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12">
            <h3 className="sec-head medium text-center">
              <span>Unwind</span> and <span>Enjoy</span> with Breakout
            </h3>
          </div>
          <div className="col-lg-8 col-12 mt-4">
            <div className="row row-gap-25">
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv1} alt="bg" />
                  <p className="sec-head book-20">
                    Escape <br className="d-sm-block d-none" /> Room Fun
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv2} alt="bg" />
                  <p className="sec-head book-20">
                    Exciting
                    <br className="d-sm-block d-none" /> Birthdays
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv3} alt="bg" />
                  <p className="sec-head book-20">Corporate Team Outing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12 pt-80">
            <GReviewSlider data={data?.googlereviews} />
            <p className="sec-head medium-20 mb-3 text-center mt-40">{data?.review_text ? data?.review_text : " 7.8k+ people loved our events!"}</p>
            <ul className="rating px-0 d-flex justify-content-center gap-1">{renderStars()}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewWidget;
