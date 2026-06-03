import React from "react";
import Image from "next/image";
import fillStarIcon from "@/images/fill-star.svg";
import halfFillStarIcon from "@/images/half-fill-star.svg";
import unfillStarIcon from "@/images/unfill-star.svg";
import Link from "next/link";
import VenueImgSlider from "./VenueImgSlider";

import clockIcon from "@/images/cl.svg";
import moneyIcon from "@/images/rupee.svg";
import phoneIcon from "@/images/ph.svg";
import locIcon from "@/images/loc-y.svg";
import webIcon from "@/images/web.svg";
import bdayblogIllus from "@/images/bdayblog-illus.svg";
import locY from "@/images/loc-y.svg";
import GReviewSlider from "./GReviewSlider";
import PartyGetInTouch from "./PartyGetInTouch";
import HomeContact from "./home/HomeContact";

const VenueInner = ({ venue,noImage=false,page_type=""}) => {
  console.log(
    "page_type_page_type",
    page_type || "NO_PAGE_TYPE"
  );


  const isItem = !!venue?.title;
  const images = isItem
    ? [venue?.image_url] // item case
    : Array.isArray(venue?.images)
      ? venue.images
      : [];
  // const parsedContent = Array.isArray(venue?.content)
  //   ? venue.content
  //   : [];
  const parsedContent = isItem
    ? [venue?.description] // item case
    : Array.isArray(venue?.content)
      ? venue.content
      : [];
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(<Image src={fillStarIcon} alt="star-icon" key={i} />);
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <Image src={halfFillStarIcon} alt="half-star-icon" key={i} />
        );
      } else {
        // Empty star
        stars.push(
          <Image src={unfillStarIcon} alt="unfill-star-icon" key={i} />
        );
      }
    }
    return stars;
  };

  return (
    <div className="venue-inner-container">
      <div className="top-area">
        <div className="l-part">
          {/* <h3>{venue?.name}</h3> */}
          <h3>{isItem ? venue?.title : venue?.name}</h3>
          {
            venue?.rating && (
              <div className="stars-container">
                <div className="rating-stars">{renderStars(venue?.rating)}</div>
                <span className="h6 mb-0 ms-2" style={{ fontWeight: "700" }}>
                  {/* {venue?.rating}/5  */}
                  {venue?.rating_text}
                </span>
              </div>
            )
          }
        </div>
        <div className="r-part text-end">
          {
            venue?.location_name && (
              <div className="loc-con">
                <Image src={locY} alt="loc-y" />
                <span style={{ fontWeight: "700", fontSize: "16px" }}>{venue?.location_name}</span>
              </div>
            )
          }
          {venue?.google_map && (
            <Link href={venue?.google_map} target="_blank" className="main-btn ms-auto">
              <span>View on Google Map</span>
            </Link>
          )}
        </div>
      </div>
      {images.length > 0 && <VenueImgSlider images={images} />}
      <div className="bottom-area">
        {
          !isItem && (
            <div className="">
              <div className="row ">
                {
                  venue?.hours_open && (
                    <div className="col-lg-6 col-12">
                      <div className="venue-inner-item-list">
                        <Image src={clockIcon} alt="venue-inner-item-list" />
                        <span>{venue?.hours_open}</span>
                      </div>
                      {
                    venue?.phone && (
                      <div className="venue-inner-item-list">
                        <Image src={phoneIcon} alt="venue-inner-item-list" />
                        <span>{venue?.phone}</span>
                      </div>
                    )
                  }

                  
                  {
                    venue?.website && (
                      <div className="venue-inner-item-list">
                        <Image src={webIcon} alt="venue-inner-item-list" />
                        <span>{venue?.website}</span>
                      </div>
                    )
                  }
                    </div>
                  )
                }
                {/* {
                  venue?.price_min || venue?.price_max || venue?.price_text && ( */}
                <div className="col-lg-6 col-12">
                  <div className="venue-inner-item-list">
                    <Image src={moneyIcon} alt="venue-inner-item-list" />
                    <span>
                      {venue?.price_min == 0 && venue?.price_max == 0
                        ? venue?.price_text
                        : `Starts from ₹${venue?.price_min} to ₹${venue?.price_max}`}
                    </span>
                  </div>
                  {
                    venue?.address && (
                      <div className="venue-inner-item-list">
                        <Image src={locY} alt="venue-inner-item-list" />
                        <span>{venue?.address}</span>
                      </div>
                    )
                  }
                </div>
                {/* )
                } */}
              </div>
            </div>
          )
        }
        {parsedContent?.map((html, index) => (
          <div className="content-box bullet-list" key={index + 1}>
            <div className="row row-gap-25" >
              <div className="col-lg-12 col-12">
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: html }}
                />

              </div>

            </div>
          </div>
        ))}
        {
          venue?.is_breakout && (
            <>
              <div className="pt-80">
                {venue?.googlereviews && venue?.googlereviews.length > 0 && (
                  <GReviewSlider reviews={venue?.googlereviews} data={venue?.googlereviews} />
                )}
              </div>
            </>
          )
        }
         {
          venue?.is_breakout && (
            <div className="pt-80">
               {/* <PartyGetInTouch
                className="py-0"
                img={bdayblogIllus}
                data={venue?.footersection}
                noTextBottom={false}
                privacyLine={true}
                noImage={true}
                type="birthday"
                />  */}
                 <HomeContact page_name="home" textData={venue?.footersection}
                  noImage = {true} noTextBottom={false} page_type={page_type}/>
            </div>
          )
        } 
        {/* {
          venue?.is_breakout && (
                <HomeContact page_name="home" textData={venue?.footersection}
                 noImage = {true} noTextBottom={false}/>
          )
        } */}
      </div>

    </div>
  );
};

export default VenueInner;
