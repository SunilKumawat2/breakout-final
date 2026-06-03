"use client";
import React, { useEffect, useRef, useState } from "react";
import hmIllus from "@/images/bottom-illus.svg";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

const HmTextlocationkoramangala = ({ text,className = "", home = false }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!text || !textRef.current) return;
  
    gsap.registerPlugin(ScrollTrigger);
  
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        let html = textRef.current.innerHTML;
        textRef.current.innerHTML = html;
  
        const spans = textRef.current.getElementsByTagName("span");
        for (let span of spans) {
          span.classList.add("yellow-text");
        }
  
        const splitText = new SplitType(textRef.current, {
          types: "chars",
          tagName: "span",
        });
  
        gsap.from(splitText.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",   // more forgiving
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
        });
  
        ScrollTrigger.refresh();
      }, textRef);
  
      return () => ctx.revert();
    }, 500); // 🔥 KEY FIX (wait for layout)
  
    return () => clearTimeout(timer);
  }, [text]);

  // return (
  //   <div>
  //     <h3>Testing</h3>
  //   </div>
  // );

  return (
    <section
      className={`hm-text-sec text-illus-sec section-padding ${
        home ? "pb-0" : "",className
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
          home && <Image src={hmIllus} className='illus-image' alt='hm-text-bg' />
        } */}
    </section>
  );
};

export default HmTextlocationkoramangala;
