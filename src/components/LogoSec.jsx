"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import lg1 from "@/images/lg1.svg";
import lg2 from "@/images/lg2.svg";
import lg3 from "@/images/lg3.svg";
import lg4 from "@/images/lg4.svg";
import lg5 from "@/images/lg5.svg";
import lg6 from "@/images/lg6.svg";
import lg7 from "@/images/lg7.svg";
import lg8 from "@/images/lg8.svg";
import lg9 from "@/images/lg9.svg";
import lg10 from "@/images/lg10.svg";
import lg11 from "@/images/lg11.svg";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";

const LogoSec = ({ title, logos = null, className = "", link = true }) => {
  const { newsLogo } = useGlobalContext();
  const [data, setData] = useState(null);
  console.log("setData_setData_setData",data)
  const [animationDuration, setAnimationDuration] = useState(85);
  useEffect(() => {
    if (logos) {
      setData(logos);

      // Dynamically set animation duration based on number of logos
      // Default: 33s for 11 logos. Adjust proportionally.
      if (logos && Array.isArray(logos) && logos.length > 0) {
        const baseLogoCount = 11;
        const baseDuration = 85;
        const duration = Math.max(
          10,
          Math.round((logos.length / baseLogoCount) * baseDuration)
        );
        setAnimationDuration(duration);
      }
    } else {
      setData(newsLogo);
    }
  }, [logos]);

  // const logos = [lg1, lg2, lg3, lg4, lg5, lg6, lg7, lg8, lg9, lg10, lg11];
  const repeat = 10;
  return (
    <section className={`logo-sec section-padding ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center col-12">
            <h2
              className="sec-head medium sm-head mb-0"
              dangerouslySetInnerHTML={{
                __html: title || "Featured <span>in</span>",
              }}
            />
          </div>
        </div>
      </div>
      <div className="logo-slider-wrapper">
        <div
          className={`logo-slider-inner `}
          style={{ animationDuration: `${animationDuration}s` }}
        >
          {Array.from(
            { length: repeat },
            (_, index) =>
              data &&
              data?.length > 0 &&
              data?.map((logo, index) =>
                link ? (
                  <Link
                    href={logo?.link || "#"}
                    key={index}
                    className="logo-slider-item"
                    target={logo?.link ? "_blank" : "_self"}
                  >
                    <Image
                      src={logo?.image}
                      alt={logo?.name}
                      key={index}
                      width={100}
                      height={100}
                    />
                  </Link>
                ) : (
                  <div key={index} className="logo-slider-item">
                    <Image
                      src={logo?.image}
                      alt={logo?.name}
                      key={index}
                      width={100}
                      height={100}
                    />
                  </div>
                )
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default LogoSec;
