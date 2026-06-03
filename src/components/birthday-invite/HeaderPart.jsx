import React from "react";
import Image from "next/image";
import calender from "@/images/calender.svg";
import clock from "@/images/clock.svg";
import location from "@/images/location.svg";
import hanger from "@/images/hanger.svg";
import baloon from "@/images/baloon.svg";
import Link from "next/link";
import moment from "moment";
const HeaderPart = ({ data, className = "" }) => {
  const formatedDate = data?.date
    ? moment(data.date).format("DD MMMM YYYY")
    : "";

  return (
    <header className={`b-inv-header pt-80 ${className}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="b-inv-header-content text-center">
              <Image src={baloon} alt="baloon" />
              <Image src={baloon} alt="baloon" />
              <h1 className="sec-head not-bold">
                It’s <span>{data?.title}</span> Birthday
              </h1>
              <p className="sec-head book-20">{data?.description}</p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-lg-7 col-12">
            <div className="b-inv-header-con2">
              <h3
                className="sec-head medium"
                dangerouslySetInnerHTML={{
                  __html: data?.section1?.heading,
                }}
              >
                {/* Aarav is <span>turning 5</span> this year! */}
              </h3>
              <div className="b-inv-icons mt-5">
                <div className="b-inv-icon-wrapper">
                  <Image src={calender} alt="calender" />
                  <p>{data?.date}</p>
                </div>
                <div className="b-inv-icon-wrapper">
                  <Image src={clock} alt="clock" />
                  <p>{data?.time}</p>
                </div>
                <div className="b-inv-icon-wrapper">
                  <Image src={location} alt="location" />
                  <p>{data?.location}</p>
                </div>
                <div className="b-inv-icon-wrapper">
                  <Image src={hanger} alt="hanger" />
                  <p>{data?.party_theme}</p>
                </div>
              </div>
            </div>
            <p
              className="sec-head book-20 mt-5"
              dangerouslySetInnerHTML={{
                __html: data?.section1?.description,
              }}
            >
              {/* We’re <span>expecting your presence</span> to make this day
              memorable. */}
            </p>
            <Link href="#rsvp" className="main-btn wide-sm">
              <span>{data?.section1?.cta_label}</span>
            </Link>
          </div>
          <div className="col-lg-4 offset-lg-1 col-12">
            <div className="b-person-card">
              <div className="b-person">
                {data?.section1?.image && (
                  <Image
                    src={data?.section1?.image}
                    alt="person"
                    width={500}
                    height={500}
                  />
                )}
                {/* <Image src={person} alt="person" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPart;
