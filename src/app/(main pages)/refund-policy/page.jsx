"use client";
// import React, { useEffect } from "react";
import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";

// export async function getData() {
//   try {
//     const data = await api.get(`/refund-policy`);
//     console.log("data privacy", data?.data?.data);
//     return data?.data?.data;
//   } catch (error) {
//     console.error("Error fetching privacy policy:", error);
//     return null;
//   }
// }

const page = () => {
  // const data = await getData();
  const { getrefundpolicy, loading } = useGlobalContext();

  console.log("siteSettings", getrefundpolicy);
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
                  __html: getrefundpolicy?.heading || "Refund Policy",
                }}
              />
              <div
                className="main-con pt-80 para"
                dangerouslySetInnerHTML={{
                  __html: getrefundpolicy?.content || "Refund Policy",
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
