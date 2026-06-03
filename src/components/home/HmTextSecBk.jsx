"use client";
import React, { useEffect, useRef, useState } from "react";
import hmIllus from "@/images/bottom-illus.svg";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

const HmTextSecBk = ({ text, home = false }) => {
  const textRef = useRef(null);

  useEffect(() => {
    console.log("Rendered textRef:", textRef.current?.innerHTML);
    // return;
    if (!text || !textRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let timeoutId;

    if (textRef.current) {
      const spans = textRef.current.getElementsByTagName("span");
      for (let span of spans) {
        span.classList.add("yellow-text");
      }

      timeoutId = setTimeout(() => {
        // requestAnimationFrame(() => {
        const splitText = new SplitType(textRef.current, {
          types: "chars",
          tagName: "span",
        });
        console.log("splitText:", textRef.current, splitText);

        gsap.from(splitText.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            end: "bottom 50%",

            markers: true,
          },

          color: "#363838",

          stagger: 0.05,
        });
        // });
      }, 3000);
    }

    return () => {
      // if (timeoutId) clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text]);

  // return (
  //   <div>
  //     <h3>Testing</h3>
  //   </div>
  // );

  return (
    <section
      className={`hm-text-sec text-illus-sec section-padding ${
        home ? "pb-0" : ""
      }`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12">
            {text && (
              <div
                ref={textRef}
                className="big-text"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>
        </div>
      </div>
      {/* {
          home && <Image src={hmIllus} className='w-100 h-auto' alt='hm-text-bg' />
        } */}
    </section>
  );
};

export default HmTextSecBk;
