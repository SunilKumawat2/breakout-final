"use client";
import React, { useState, useEffect } from "react";
import InnerPageBanner from "@/components/InnerPageBanner";
import Image from "next/image";
import enc from "@/images/enc.svg";
import mBox from "@/images/m-box.png";
import HmTextSec from "@/components/home/HmTextSec";
import icon1 from "@/images/icon1.svg";
import icon2 from "@/images/icon2.svg";
import icon3 from "@/images/icon3.svg";
import icon4 from "@/images/icon4.svg";
import illus3 from "@/images/illus3.svg";
import hmIllus from "@/images/bottom-illus.svg";
import LogoSec from "@/components/LogoSec";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import CounterBox from "@/components/CounterBox";
import VisitLocations from "@/components/VisitLocations";
import PeakExpSec from "@/components/PeakExpSec";
import BlogSlider from "@/components/BlogSlider";
import HomeContact from "@/components/home/HomeContact";
import TrustedSection from "@/components/TrustedSection";
import ReviewWidget from "@/components/birthday-invite/ReviewWidget";
import GlobalReviewWidget from "@/components/GlobalReviewWidget";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import api from "@/app/helpers/api";
import virtualIllus from "@/images/virtual-illus.svg";
import PartyExpertCon from "@/components/PartyExpertCon";
import Packages from "@/components/Packages";
import virtualIllus1 from "@/images/virtual-illus1.svg";
import StripGallery from "@/components/StripGallery";
import GReviewSlider from "@/components/GReviewSlider";
import virtualIllus2 from "@/images/virtual-illus2.svg";
import { useRouter } from "next/navigation";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [escapeRooms, setEscapeRooms] = useState(null);
  const router = useRouter();

  const lookingForOptions = [
    { value: "Virtual", label: "Virtual" },
    { value: "In a Breakout Centre", label: "In a Breakout Centre" },
    { value: "In a Resort", label: "In a Resort" },
    { value: "In our Office", label: "In our Office" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/virtual-escaperoom");
      setRooms(res.data.data);
    };

    const fetchEscapeRooms = async () => {
      const res = await api.get("/virtual-games");
      setEscapeRooms(res.data.data);
    };

    fetchData();
    fetchEscapeRooms();
  }, []);

  const hmText =
    "In a typical escape room, your team is <span>locked in a themed room</span> You have a <span>set time.</span> You must <span>find clues,</span> solve puzzles To <span>escape</span> from the locked room.";

  return (
    <>
      {rooms?.bannersection && (
        <InnerPageBanner banner={rooms?.bannersection} bdayInner={true} />
      )}
      <div className="black-gr-div">
        {rooms?.contentsection && (
          <>
            <HmTextSec text={rooms?.contentsection?.content} />
            <div className="container">
              <div className="bday-text-wrap">
                <p
                  className="underline-big-text"
                  // onClick={() => router.push("/founder-message/corporate-page")}
                  style={{ cursor: "pointer" }}
                  dangerouslySetInnerHTML={{
                    __html: rooms?.contentsection?.note,
                  }}
                ></p>
              </div>
            </div>
          </>
        )}
        {rooms?.countersection && (
          <TrustedSection data={rooms?.countersection} />
        )}
        {rooms?.iconsection && (
          <section className="section-padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html: rooms?.iconsection?.heading,
                    }}
                  />
                  <div className="box-grid-6 mt-5">
                    {rooms?.iconsection?.icons?.length > 0 &&
                      rooms?.iconsection?.icons.map((item, index) => (
                        <div className="box-grid-item" key={index}>
                          <div className="box-item">
                            <div
                              className="box-item-icon"
                              data-text={index + 1}
                            >
                              {item?.image && (
                                <Image
                                  src={item.image}
                                  width={100}
                                  height={100}
                                  alt="enc"
                                />
                              )}
                            </div>
                            <div className="box-item-content">
                              <h4 className="sec-head medium-20 mb-0">
                                {item?.heading}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <PartyExpertCon />

        <Image
          src={virtualIllus}
          alt="illus3"
          className="illus-3 w-100 h-auto"
        />
      </div>
      <div className="black-gr-div">
        <section className="section-padding esc-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head medium sm-head">
                  Virtual <span>Escape Rooms</span>
                </h3>
              </div>
            </div>
            <div className="row row-gap-25 mt-5">
              {escapeRooms &&
                escapeRooms
                  .filter((room) => room.slug !== "code-breakers")
                  .map((room, index) => (
                    <div className="col-lg-4 col-12" key={index}>
                      <EscapeRoomCard hasVirtual={true} room={room} />
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {rooms?.addonsection && (
          <section className="section-padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head mb-5"
                    dangerouslySetInnerHTML={{
                      __html: rooms?.addonsection?.heading,
                    }}
                  />
                </div>
              </div>
              <div className="row row-gap-25 justify-content-center">
                {rooms?.addonsection?.icons?.length > 0 &&
                  rooms?.addonsection?.icons.map((item, index) => (
                    <div className="col-lg-3 col-12" key={index}>
                      <div
                        className="location-card "
                        onClick={() => router.push(item.link)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="location-card-img">
                          {item.image && item.image != "" && (
                            <Image
                              src={item.image}
                              width={500}
                              height={500}
                              alt={item.heading}
                            />
                          )}
                        </div>
                        <div className="location-card-content">
                          <h3
                            dangerouslySetInnerHTML={{ __html: item.heading }}
                          ></h3>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {rooms?.packagesection && (
          <Packages hasEventImg={true} packages={rooms?.packagesection} />
        )}

        <Image
          src={virtualIllus1}
          alt="illus3"
          className="illus-3 w-100 h-auto"
        />
      </div>

      <div className="black-gr-div">
        {rooms?.gallery_images && rooms?.gallery_images?.length > 0 && (
          <section className="section-padding">
            <div className="" style={{ overflow: "hidden" }}>
              <div className="row">
                <div className="col-lg-12">
                  <StripGallery images={rooms?.gallery_images} />
                </div>
              </div>
            </div>
          </section>
        )}
        {rooms?.googlereviews && rooms?.googlereviews?.length > 0 && (
          <GReviewSlider commonStars={false} data={rooms?.googlereviews} />
        )}

        {rooms?.videotestimonials && (
          <Videotestimonials data={rooms?.videotestimonials} />
        )}
        {rooms?.faqsection && rooms?.faqsection?.length > 0 && (
          <FaqSection data={rooms?.faqsection} />
        )}
        <BlogSlider />
        {/* <HomeContact
          img={virtualIllus2}
          textData={rooms?.footersection}
          LookingForOptions={lookingForOptions}
        /> */}
        {rooms?.footersection && (
          <BirthdayGetInTouch
            img={virtualIllus2}
            textData={rooms?.footersection}
            noTextBottom={true}
            atOptions={lookingForOptions}
            privacyLine={true}
          />
        )}
      </div>

      {/* <PeakExpSec /> */}
      {/* </div> */}
    </>
  );
};

export default page;
