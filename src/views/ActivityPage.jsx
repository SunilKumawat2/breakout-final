"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const BigVideoPlayer = dynamic(
  () => import("@/components/BigVideoPlayer"),
  { ssr: false }
);
const FaqSection = dynamic( () => import("@/components/FaqSection"));
const VisitLocations = dynamic(() => import("@/components/VisitLocations"));
const GlobalReviewWidget = dynamic( () => import("@/components/GlobalReviewWidget"));
const Banner = dynamic(() => import("@/components/activities/Banner"));
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"));
const ConnectContact = dynamic(() => import("@/components/ConnectContact"));
import loc1 from "@/images/koramangala.jpg";
import loc2 from "@/images/jp-nagar.jpg";
import loc3 from "@/images/whitefield.jpg";
import api from "@/app/helpers/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import activityIllus from "@/images/activity-illus.svg";
import activity2Illus from "@/images/activity2-illus.svg";
import activity3Illus from "@/images/activity3-illus.svg";
import { useRouter } from "next/navigation";

const ActivityPage = () => {
  const { id } = useParams();
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [room, setRoom] = useState(null);
  // const searchParams = useSearchParams();
  // const page_type = searchParams.get("page_type");

  const [pageType, setPageType] = useState("");
useEffect(() => {
  const storedPageType = sessionStorage.getItem("page_type");
  if (storedPageType) {
    setPageType(storedPageType);
  }
}, []);

  useEffect(() => {
    const fetchEscapeRooms = async () => {
      const res = await api.get(`/escaperooms`);
      setEscapeRooms(res.data.data);
    };
    fetchEscapeRooms();

    const fetchEscapeRoom = async () => {
      const res = await api.get(`/activity/${id}`);
      setRoom(res.data.data);
    };
    fetchEscapeRoom();
  }, [id]);

  const locations = [
    {
      name: "Koramangala",
      image: loc1,
    },
    {
      name: "JP Nagar",
      image: loc2,
    },
    {
      name: "Whitefield",
      image: loc3,
    },
  ];

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToEscapeRooms");

    if (shouldScroll === "true" && escapeRooms?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms");
      }, 500);
    }
  }, [escapeRooms]);
  return (
    <>
      <div className="black-gr-div">
        {room?.bannersection && <Banner room={room} />}
        {room?.bannersection?.video_trailer != "" && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <BigVideoPlayer
                    room={room}
                    video={room?.bannersection?.video_trailer}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        <Image src={activityIllus} className="illus-image" alt="hm-text-bg" />
      </div>
      <div className="black-gr-div">
        {room?.contentsection?.heading && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <h2 className="sec-head sm-head yellow medium">
                    <span>{room?.contentsection?.heading}</span>
                  </h2>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: room?.contentsection?.content || "",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
        )}
        <PartyExpertCon className="pt-80" data="views_activities" />
        {/* <ReserveASlot room={room?.pricingsection} /> */}

        {room?.imagesection && (
          <GlobalReviewWidget className="section-padding pb-0"
            data={room?.imagesection}
            reviews={room?.googlereviews}
          />
        )}
        {room?.faqsection && <FaqSection className="section-padding pb-0" data={room?.faqsection} />}
        <Image src={activity2Illus} className="illus-image" alt="illus3" />
      </div>
      {/* <FaqSection /> */}
      <div className="black-gr-div">
        {
          room?.imagescardsection?.images?.length > 0 && (
            <section className="section-padding esc-section pb-0">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center col-12">
                    <h2 className="sec-head sm-head medium">
                      Other <span>Experiences</span>
                    </h2>
                  </div>
                </div>
                <div className="row row-gap-25" id="escape-rooms-section">
                  {room?.imagescardsection &&
                    room?.imagescardsection?.images?.map((room, index) => (
                      <div className="col-lg-4 col-12" onClick={() => sessionStorage.setItem("scrollToEscapeRooms", true)} key={index}>
                        {/* <EscapeRoomCard room={room} />
                         */}
                        <div
                          id="escape-rooms-section"
                          className="location-card"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // ✅ GTM event fire
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              event: "cta_click",
                              room_name: room?.heading || "unknown",
                              room_slug: room?.slug,
                              page: window.location.pathname,
                              section: "escape_rooms_listing",
                            });

                            // ✅ Navigate after event
                            window.open(room?.link, "_blank");
                          }}
                        >
                          <div className="location-card-img">
                            {room?.image && (
                              <Image
                                src={room?.image}
                                className="w-100"
                                width={700}
                                height={700}
                                alt="hm-text-bg"
                              />
                            )}
                          </div>
                          <div className="location-card-content">
                            <h3>{room?.heading || "Murder Mystery"}</h3>
                            {/* <div className="bt">
                              <ul>
                                {!hasVirtual && (
                                  <li>
                                    <span style={{ fontSize: "18px", color: "#FFAE00" }}>Age</span>
                                    <span>{room?.bannersection?.age_group || "Age 10+"}</span>
                                  </li>
                                )}
                                <li>
                                  <Image src={people} className="w-100 h-auto" alt="people" />
                                  <span>{room?.bannersection?.min_team || room?.bannersection?.capacity}</span>
                                </li>
                                <li>
                                  <Image src={up} className="w-100 h-auto" alt="people" />
                                  <span>{`${room?.bannersection?.success_rate}%` || "60%"}</span>
                                </li>
                              </ul>
                              <Image src={coupon} className=" h-auto" alt="coupon" />
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>

          )
        }
        <VisitLocations className="section-padding pb-0" isVirtual={false} />
        {/* <PartyExpertCon /> */}
        {/* <PartyEpertForActivity
          title={"<span>Running Out of Time?</span> Talk to a Party Expert Now"}
        /> */}
        <ConnectContact
          noTextBottom={false}
          privacyLine={true}
          noImage={true}
          page_type={pageType}
        />
        <Image src={activity3Illus} className="illus-image" alt="illus3" />
      </div>
    </>
  );
};

export default ActivityPage;
