"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/virtual-game/Banner";
import BigVideoPlayer from "@/components/BigVideoPlayer";
import hmIllus from "@/images/bottom-illus.svg";
import illus2 from "@/images/contact-bottom-illus.svg";
import illus3 from "@/images/illus3.svg";
import ReserveASlot from "@/components/ReserveASlot";
import FaqSection from "@/components/FaqSection";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import loc1 from "@/images/koramangala.jpg";
import loc2 from "@/images/jp-nagar.jpg";
import loc3 from "@/images/whitefield.jpg";
import LocationCard from "@/components/LocationCard";
import HomeContact from "@/components/home/HomeContact";
import VisitLocations from "@/components/VisitLocations";
import { CommonModal } from "@/components/CommonModal";
import GlobalReviewWidget from "@/components/GlobalReviewWidget";
import api from "@/app/helpers/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PartyExpertCon from "@/components/PartyExpertCon";
import GReviewSlider from "@/components/GReviewSlider";
import BreadCrumbs from "@/components/BreadCrumbs";
import illus4 from "@/images/illus4.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";

const page = () => {
  const { id } = useParams();
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [room, setRoom] = useState(null);

  const lookingForOptions = [
    { value: "Virtual", label: "Virtual" },
    { value: "In a Breakout Centre", label: "In a Breakout Centre" },
    { value: "In a Resort", label: "In a Resort" },
    { value: "In our Office", label: "In our Office" },
  ];

  useEffect(() => {
    const fetchEscapeRooms = async () => {
      const res = await api.get(`/virtual-games`);
      const filtered = res.data.data.filter((room) => room.slug !== id);
      setEscapeRooms(filtered);
    };
    fetchEscapeRooms();

    const fetchEscapeRoom = async () => {
      const res = await api.get(`/virtual-games/${id}`);
      setRoom(res.data.data);
    };
    fetchEscapeRoom();
  }, [id]);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", link: "/" },
      { label: "Virtual Games", link: "/virtual-game" },
      { label: room?.title, link: `/virtual-game/${id}` },
    ]);
  }, [room]);

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
  return (
    <>
      <div className="black-gr-div">
        {breadcrumbs.length > 0 && <BreadCrumbs breadcrumbs={breadcrumbs} />}
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
        <Image src={hmIllus} className="w-100 h-auto" alt="hm-text-bg" />
      </div>
      <div className="black-gr-div">
        <PartyExpertCon />
        {room?.googlereviews && room?.googlereviews.length > 0 && (
          <GReviewSlider commonStars={false} data={room?.googlereviews} />
        )}
        {/* <ReserveASlot room={room?.pricingsection} /> */}
        {room?.faqsection && room?.faqsection.length > 0 && (
          <FaqSection data={room?.faqsection} />
        )}
        <Image src={illus3} className="w-100 h-auto" alt="illus3" />
      </div>

      {/* <FaqSection /> */}
      <div className="black-gr-div">
        {escapeRooms && escapeRooms.length > 0 && (
          <section className="section-padding esc-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center col-12">
                  <h2 className="sec-head sm-head medium">
                    Other <span>Escape Rooms</span>
                  </h2>
                </div>
              </div>
              <div className="row mt-5 row-gap-25">
                {escapeRooms &&
                  escapeRooms.map((room, index) => (
                    <div className="col-lg-4 col-12" key={index}>
                      <EscapeRoomCard room={room} hasVirtual={true} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* <HomeContact noTextBottom={false} /> */}
        {/* {room?.footersection && ( */}
        <BirthdayGetInTouch
          img={illus4}
          textData={room?.footersection}
          noTextBottom={true}
          atOptions={lookingForOptions}
          privacyLine={true}
        />
        {/* )} */}
      </div>
    </>
  );
};

export default page;
