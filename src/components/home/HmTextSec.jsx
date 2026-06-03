"use client";
import React, { useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

const HmTextSecBk = ({ text,className = "", home = false }) => {
  const textRef = useRef(null);
  const formattedText = text.replace(/\n/g, "<br/>");

  useEffect(() => {
    // console.log("Rendered textRef:", textRef.current?.innerHTML);
    // return;
    if (!text || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let timeoutId;

    if (textRef.current) {
      // 1️⃣ Clean and flatten innerHTML
      let html = textRef.current.innerHTML;

      // html = html
      //   .replace(/<\/span>\s*<span>/g, " ")
      //   .replace(/<br\s*\/?>/g, "<br>")
      //   .replace(/<span[^>]*>/g, "")
      //   .replace(/<\/span>/g, "")
      //   .replace(/\s{2,}/g, " ");

      textRef.current.innerHTML = html;
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
        // console.log("splitText:", textRef.current, splitText);

        gsap.from(splitText.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 55%",
            end: "bottom 50%",
            scrub: 0.2,
            markers: false,
          },

          color: "#363838",

          stagger: 0.05,
        });
        // });
      }, 1500);
    }

    return () => {
      // if (timeoutId) clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // splitText.revert();
    };
  }, [text]);

  // return (
  //   <div>
  //     <h3>Testing</h3>
  //   </div>
  // );

  return (
    <section
      className={`hm-text-sec text-illus-sec ${
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
                dangerouslySetInnerHTML={{ __html: formattedText }}
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
