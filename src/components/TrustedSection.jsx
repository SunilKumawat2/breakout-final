"use client";
import React, { useEffect, useRef, useState } from "react";
import Ratings from "./Ratings";
import Image from "next/image";
import Happy from "@/images/happy.svg";
import Theme from "@/images/theme.svg";
import Player from "@/images/players.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Helper to split number and suffix (e.g. "10.5k +" => {num: 10.5, suffix: "k +"})
function parseCount(countStr) {
  // Match number (with optional decimal) at the start, then the rest as suffix
  const match = countStr.match(/^([\d,.]+)(.*)$/);
  if (!match) return { num: 0, suffix: "" };
  // Remove commas for parsing
  const num = parseFloat(match[1].replace(/,/g, ""));
  const suffix = match[2] || "";
  return { num, suffix };
}

const defaultData = {
  counterheading: "Trusted by ‘000’s",
  counterrating: "Rated 4.8/5 on Google!",
  countersec: [
    {
      description: "Themes",
      image: Theme,
      count: "9",
    },
    {
      description: "Happy Teams",
      image: Happy,
      count: "62k +",
    },
    {
      description: "Hosted Players",
      image: Player,
      count: "234k+",
    },
  ],
};

// Counter component with GSAP countup animation
const AnimatedCount = ({ count, id }) => {
  const spanRef = useRef(null);
  const { num, suffix } = parseCount(count);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Always show 0 initially
    if (spanRef.current) {
      spanRef.current.textContent = num % 1 !== 0 ? "0.0" : "0";
    }

    let ctx = gsap.context(() => {
      let obj = { val: 0 };
      let decimalPlaces =
        num % 1 !== 0 ? num.toString().split(".")[1]?.length || 0 : 0;

      ScrollTrigger.create({
        trigger: spanRef.current,
        start: "-50% 70%",
        markers: false,
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: num,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (spanRef.current) {
                // Format with decimals if needed, else as integer
                spanRef.current.textContent =
                  decimalPlaces > 0
                    ? obj.val.toFixed(decimalPlaces)
                    : Math.floor(obj.val);
              }
            },
          });
        },
      });
    }, spanRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, [num]);

  return (
    <span>
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  );
};



const TrustedSection = ({ data = defaultData, removeHeading = false, className = "" }) => {


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <section className={`section-padding trust-sec ${className}`}>
      <div className="container">
        {data?.heading && !removeHeading && (
          <div className="row">
            <div className="col-lg-12 text-center">
              <h3
                className="sec-head medium mb-5 text-center sm-head"
                dangerouslySetInnerHTML={{ __html: data?.heading }}
              />
            </div>
          </div>
        )}
        <div className="row align-items-center">
          <div className="col-lg-4 col-12">
            <h3
              className="sec-head medium"
              dangerouslySetInnerHTML={{ __html: data?.counterheading }}
            />
            {!isMobile && (
              <div className="desktop-ratings">
                <Ratings rating={data?.counterrating} />
                <p className="mt-3 mb-0">
                  Rated {data?.counterrating}/5 on Google!
                </p>
              </div>
            )}
          </div>
          <div className="col-lg-8 col-12">
            <div className="row row-gap-25">
              {data?.countersec?.length > 0 &&
                data?.countersec.map((item, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <div className="counter-box with-icon">
                      <div className="top">
                        {item?.image && (
                          <Image
                            src={item?.image}
                            width={50}
                            height={50}
                            alt={item?.description}
                          />
                        )}
                        <h4>
                          <AnimatedCount
                            count={item?.count}
                            id={`counter-${index}`}
                          />
                        </h4>
                      </div>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                ))}
            </div>
            {isMobile && (
              <div className="mobile-ratings">
                <Ratings rating={data?.counterrating} />
                <p className="mt-3 mb-0">
                  Rated {data?.counterrating}/5 on Google!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
