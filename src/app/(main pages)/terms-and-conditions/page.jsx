"use client";
import { useGlobalContext } from "@/context/GlobalContext";
// import React, { useEffect } from "react";
import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
// import api from "@/helpers/api";

// export async function getData() {
//   try {
//     const data = await api.get(`/terms-of-service`);
//     return data?.data?.data;
//   } catch (error) {
//     console.error("Error fetching privacy policy:", error);
//     return null;
//   }
// }

const page =  () => {
  // const data = await getData();
  const { gettermservies, loading } = useGlobalContext();

  console.log("siteSettings", gettermservies);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await api.get(`/privacy-policy`);
  //       console.log("data privacy", data?.data?.data);
  //     };
  //     fetchData();
  //   }, []);
  return (
    <div className="pt-80">
      <div className="black-gr-div">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1
                className="sec-head medium sm-head mb-0 text-center yellow-text"
                dangerouslySetInnerHTML={{
                  __html: gettermservies?.heading || "Terms of Service",
                }}
              />
              <div
                className="main-con pt-80 para privacy-content"
                dangerouslySetInnerHTML={{
                  __html: gettermservies?.content || "Terms of Service",
                }}
              />
            </div>
          </div>
        </div>
        <Image src={tsIllus} alt="privacy-policy" className="illus-image" />
      </div>
    </div>
  );
};

export default page;
