"use client";
import React from "react";
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
import locIcon from "@/images/loc-icon.svg";
import ReserveASlot from "@/components/ReserveASlot";
import fdImg1 from "@/images/fd-img1.png";
import Link from "next/link";
import wh from "@/images/wh.svg";
import locPlace from "@/images/loc-place.svg";
import BirthdayBanner from "@/components/BirthdayBanner";
import bdayIllus from "@/images/bday-illus.svg";

import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";

import corpIllus from "@/images/corp-illus.svg";

import c1 from "@/images/c1.jpg";
import c2 from "@/images/c2.jpg";
import c3 from "@/images/c3.jpg";
import c4 from "@/images/c4.jpg";
import c5 from "@/images/c5.jpg";
import c6 from "@/images/c6.jpg";
import partyillus from "@/images/party-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import PartySlider from "@/components/PartySlider";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import nightIllus from "@/images/night-illus.svg";

import bdayBanner from "@/images/kid-banner.jpg";

import cic1 from "@/images/cic1.svg";
import cic2 from "@/images/cic2.svg";
import cic3 from "@/images/cic3.svg";
import cic4 from "@/images/cic4.svg";
import cic5 from "@/images/cic5.svg";

import moneyIllus from "@/images/money-illus.svg";

import Packages from "@/components/Packages";

import PartyExpertCon from "@/components/PartyExpertCon";

import movieIllus from "@/images/movie-illus.svg";
import OurLocationSec from "@/components/OurLocationSec";
import coupleIllus from "@/images/couple-illus.svg";
import loveIllus from "@/images/love-illus.svg";
import AddOnsSlider from "@/components/AddOnsSlider";
import BreakoutXForm from "@/components/BreakoutXForm";
import peopleIllus from "@/images/people-illus.svg";
import trophyIllus from "@/images/trophy-illus.svg";
import bulbIllus from "@/images/bulb-illus.svg";

import DownloadBrochureForm from "@/components/DownloadBrochureForm";
import Wheel from "@/svgs/Wheel";
import ProgrameFaq from "@/components/ProgrameFaq";
import wristIllus from "@/images/wrist-illus.svg";
import GamificationSlider from "@/components/GamificationSlider";
import cameraIllus from "@/images/camera-illus.svg";
import { useEffect, useState } from "react";
import api from "@/app/helpers/api";

const page = () => {
  const [connectLnD, setConnectLnD] = useState(null);

  useEffect(() => {
    const fetchConnectLnD = async () => {
      const response = await api.get("/corporate-ld-archive");
      setConnectLnD(response?.data?.data);
    };
    fetchConnectLnD();
  }, []);

  const banner = {
    title: "THE NEW METHOD OF LEARNING",
    subTitle: "Using An Award-Winning <span>M.A.G.I.C Framework</span>",
  };

  const hmText =
    '<span>Elevate your game</span> with our mindset-based programs. <br class="d-sm-block d-none" />Now <span>Enhance Effectiveness</span>, Boost Sales, & 2X Growth.<br class="d-sm-block d-none" />Only Guaranteed Programs to deliver tangible results.<br class="d-sm-block d-none" />So, Translate Potential 2 Performance now.  ';

  const escRooms = [
    {
      image: c1,
      title: "Escape Rooms",
    },
    {
      image: c2,
      title: "Detective Job",
    },
    {
      image: c3,
      title: "Let Loose",
    },
    {
      image: c4,
      title: "Unwind",
    },
    {
      image: c5,
      title: "Scavenger Treasure",
    },
    {
      image: c6,
      title: "Bomb Defusal",
    },
  ];

  const whyChoose = [
    {
      icon: cic1,
      title: "Engages all Hierarchies",
    },
    {
      icon: cic2,
      title: "Unique Experiences",
    },
    {
      icon: cic3,
      title: "Premium Offerings",
    },
    {
      icon: cic4,
      title: "Breakout® X Guarantees ",
    },
    {
      icon: cic5,
      title: "Seamless Execution",
    },
  ];

  return (
    <>
      {connectLnD && connectLnD?.bannersection && (
        <InnerPageBanner banner={connectLnD?.bannersection} />
      )}

      <div className="black-gr-div">
        <section className="section-padding pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head">
                  These programs <br className="d-none d-lg-block" />{" "}
                  <span>Are gamified</span>
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding namecard-sec pt-0 ">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(3)].map((_, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <div className="namecard-box">
                    <div className="top-box">
                      <div className="pf">
                        {/* <Image src={mBox} alt="m-box" className='w-100 h-auto' /> */}
                      </div>
                      <h3 className="sec-head medium-20">Xoxo xox xo</h3>
                    </div>
                    <p className="para">
                      Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox
                      xo...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HmTextSec text={hmText} />
        <div className="container">
          <div className="bday-text-wrap">
            <p className="underline-big-text">Founders Message</p>
          </div>
        </div>

        <section className="section-padding bday-count-sec pb-0">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-6" key={index}>
                  <CounterBox key={index} bday={false} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Image src={bulbIllus} className={"w-100 h-auto"} alt="bday" />
      </div>

      <div className="black-gr-div">
        <DownloadBrochureForm />
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head medium sm-head">
                  M.A.G.I.C <span>Learning</span>
                </h3>
              </div>
            </div>
            <div className="row mt-5 justify-content-center row-gap-25">
              <div className="col-lg-8 col-12">
                <div className="wheel-svg">
                  <Wheel />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgrameFaq />

        <Image src={wristIllus} alt="illus3" className="illus-3 w-100 h-auto" />
      </div>
      <div className="black-gr-div">
        <PartyExpertCon className="pt-80" data="connect_lnd"/>
        <GamificationSlider />
        <section className="section-padding  ph-frame-section">
          <div className="container">
            <div className="row">
              {[1, 2, 3].map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <div className="ph-frame-card">
                    <div className="ph-frame-card-img">
                      <div className="ph-frame-card-img-inner">
                        {/* <Image src={hmIllus} className='w-100 h-auto' alt='hm-text-bg' /> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Videotestimonials />
        <Image src={moneyIllus} className={"w-100 h-auto "} alt="bday" />
      </div>
      <div className="black-gr-div">
        <FaqSection />

        <BlogSlider />
        <LogoSec />
        <BirthdayGetInTouch img={cameraIllus} />
      </div>
    </>
  );
};

export default page;
