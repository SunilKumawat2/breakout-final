// "use client";
// import React, { useState, useEffect } from "react";
// import InnerPageBanner from "@/components/InnerPageBanner";
// import Image from "next/image";
// import enc from "@/images/enc.svg";
// import mBox from "@/images/m-box.png";
// import HmTextSec from "@/components/home/HmTextSec";
// import icon1 from "@/images/icon1.svg";
// import icon2 from "@/images/icon2.svg";
// import icon3 from "@/images/icon3.svg";
// import icon4 from "@/images/icon4.svg";
// import illus3 from "@/images/illus3.svg";
// import hmIllus from "@/images/bottom-illus.svg";
// import LogoSec from "@/components/LogoSec";
// import EscapeRoomCard from "@/components/EscapeRoomCard";
// import CounterBox from "@/components/CounterBox";
// import VisitLocations from "@/components/VisitLocations";
// import PeakExpSec from "@/components/PeakExpSec";
// import BlogSlider from "@/components/BlogSlider";
// import HomeContact from "@/components/home/HomeContact";
// import locIcon from "@/images/loc-icon.svg";
// import ReserveASlot from "@/components/ReserveASlot";
// import fdImg1 from "@/images/fd-img1.png";
// import Link from "next/link";
// import wh from "@/images/wh.svg";
// import locPlace from "@/images/loc-place.svg";
// import BirthdayBanner from "@/components/BirthdayBanner";
// import bdayIllus from "@/images/bday-illus.svg";

// import bdayImg1 from "@/images/bday1.jpg";
// import bdayImg2 from "@/images/bday2.jpg";
// import bdayImg3 from "@/images/bday3.jpg";
// import bdayImg4 from "@/images/bday4.jpg";
// import bdayImg5 from "@/images/bday5.jpg";
// import bdayImg6 from "@/images/bday6.jpg";

// import partyillus from "@/images/party-illus.svg";
// import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
// import PartySlider from "@/components/PartySlider";
// import ReadyToGoPlans from "@/components/ReadyToGoPlans";
// import Videotestimonials from "@/components/Videotestimonials";
// import FaqSection from "@/components/FaqSection";

// import nightIllus from "@/images/night-illus.svg";

// import bdayBanner from "@/images/bday-banner1.jpg";
// import PartyExpertCon from "@/components/PartyExpertCon";

// import api from "@/helpers/api";
// import TrustedSection from "@/components/TrustedSection";
// import GReviewSlider from "@/components/GReviewSlider";
// import PhotographicStyledImage from "@/components/PhotographicStyledImage";

// import { useParams } from "next/navigation";

// import linkIcon from "@/images/link-icon.svg";
// import whatsappIcon from "@/images/whatsapp-icon.svg";
// import instaIcon from "@/images/insta-icon.svg";
// import xIcon from "@/images/x-ixon.svg";
// import SigngleBlog from "@/views/blogs/SigngleBlog";
// import BirthdayBlog from "@/views/blogs/BirthdayBlog";

// import { useSearchParams } from "next/navigation";
// const page = () => {
//   const [blogData, setBlogData] = useState(null);
//   console.log("sfghsdgfhsdgfj",blogData)
//   const { id } = useParams();
//   console.log("sdbsdjfsjdfjdsfjsdjfjsdf_id_id",id)
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");
//   console.log("type value:", type);
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       var url = `/blog/${id}`;
//       if (type == "birthday") {
//         url = `/blog/${id}`;
//       }
//       const res = await api.get(url);
//       setBlogData(res.data.data);
//     };
//     fetchBlogData();
//   }, [id, type]);

//   return (
//     <>
//       {type === "birthday" && blogData && <BirthdayBlog blogData={blogData} id={id}/>}
//       {type !== "birthday" && blogData && <SigngleBlog blogData={blogData} />}
//     </>
//   );
// };

// export default page;

"use client";

import React, { useState, useEffect } from "react";
import api from "@/helpers/api";
import { useParams, useSearchParams } from "next/navigation";

import SigngleBlog from "@/views/blogs/SigngleBlog";
import BirthdayBlog from "@/views/blogs/BirthdayBlog";

const Page = () => {
  const [blogData, setBlogData] = useState(null);
console.log("sdnfkhsdfgsjdgfjsh",blogData)
  // get dynamic id from url
  const params = useParams();
  const id = params?.id;

  // get query param
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  console.log("Blog ID:", id);
  console.log("Blog Type:", type);

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem("blog_slug", id);
    }, 1500);
  
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem("category", "seo");
    }, 1500);
  
    return () => clearTimeout(timer);
  }, ["seo"]);

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        let url = `/blog/${id}`;

        if (type == "seo") {
          url = `/blog/${id}`;
        }

        const res = await api.get(url);

        setBlogData(res?.data?.data || null);
      } catch (error) {
        console.error("Blog API Error:", error);
      }
    };

    fetchBlogData();
  }, [id, type]);

  // loading state
  // if (!blogData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {type == "seo" ? (
        <BirthdayBlog blogData={blogData} id={id} />
      ) : (
        <SigngleBlog blogData={blogData} id={id}/>
      )}
    </>
  );
};

export default Page;