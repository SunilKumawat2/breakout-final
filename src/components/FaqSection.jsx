


"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import faqStar from "@/images/faq-star.svg";

const FaqSection = ({ data, openIndex, onFaqChange, className = "" }) => {
  const faqRef = useRef(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);

  const dummyFaqItems = [];
console.log("FaqSection_FaqSection",openIndex)
  const faqItems =
    data?.length > 0
      ? data.map((item, index) => ({
          eventKey: index.toString(),
          question: item.question,
          answer: item.answer,
        }))
      : dummyFaqItems;

  /* ========================= PROGRAMMATIC OPEN (Reserve slot case) ========================= */
  useEffect(() => {
    if (
      openIndex !== null &&
      openIndex !== undefined &&
      faqItems[openIndex]
    ) {
      setShowAll(true);
      setActiveKey(openIndex.toString());
      setShouldAutoScroll(true);
  
      // ✅ RESET PARENT IMMEDIATELY
      onFaqChange?.(null);
    }
  }, [openIndex]);

  /* ========================= SCROLL ONLY WHEN REQUIRED ========================= */
  useEffect(() => {
    if (shouldAutoScroll && faqRef.current) {
      setTimeout(() => {
        faqRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setShouldAutoScroll(false);
      }, 300);
    }
  }, [shouldAutoScroll]);

  const shouldShowReadMore = faqItems.length > 4;
  const visibleFaqs =
    shouldShowReadMore && !showAll ? faqItems.slice(0, 4) : faqItems;

  return (
    <section ref={faqRef} className={`faq-sec ${className}`}>
      {
        visibleFaqs?.length > 0 && (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center position-relative">
              <Image src={faqStar} alt="faq-bg" className="faq-star" />
              <h2 className="sec-head sm-head medium">
                FAQs for <span>Your Adventure</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12 col-12 mt-4">
            <Accordion
              className="acc"
              activeKey={activeKey}
              onSelect={(key) => {
                setActiveKey((prev) => (prev === key ? null : key));
                // onFaqChange?.(key !== null ? Number(key) : null);
              }}
            >
              {visibleFaqs?.map((item, index) => {
                const key = index.toString();
                return (
                  <Accordion.Item key={key} eventKey={key}>
                    <Accordion.Header>
                      <span>{item.question}</span>
                      <Image src={arrow} className="acc-arrow" alt="arrow" />
                      <Image src={minus} className="acc-minus" alt="minus" />
                    </Accordion.Header>

                    <Accordion.Body>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>

            {shouldShowReadMore && (
              <button
                className="main-btn dark-btn mt-4"
                onClick={() => setShowAll((prev) => !prev)}
              >
                <span>{showAll ? "Read less" : "Read more"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
        )
      }
    </section>
  );
};

export default FaqSection;
