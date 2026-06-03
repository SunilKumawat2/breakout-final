"use client";

import React from "react";
import Image from "next/image";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import bIcon from "@/images/b-icon.svg";

const FaqSection = ({ data, className = "" }) => {
  const faqItems = [
    {
      eventKey: "0",
      icon: bIcon,
      time: "2:00 pm",
      header: "Arrival and Welcome",
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
    },
    {
      eventKey: "1",
      icon: bIcon,
      time: "2:00 pm",
      header: "Arrival and Welcome",
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
    },
    {
      eventKey: "2",
      icon: bIcon,
      time: "2:00 pm",
      header: "Arrival and Welcome",
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
    },
  ];

  return (
    <section className={`section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2
                className="sec-head mb-0 sm-head medium"
                dangerouslySetInnerHTML={{
                  __html: data?.heading,
                }}
              >
                {/* <span>What’s Happening</span> When? */}
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center pt-80">
          <div className="col-lg-9 col-12">
            <Accordion className="acc activity-chart-faq">
              {data?.cards.map((item, index) => (
                <div className="outer-div" key={index+1}>
                  {item.image && (
                      <Image
                        className="item-img"
                        src={item?.image}
                        width={80}
                        height={80}
                        alt="illus"
                      />
                    )}
                     <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>
                    
                    <div className="acc-header">
                      <div className="acc-header-con">
                        <p className="mb-0 text-white">{item?.time}</p>
                        <span className="yellow-text">{item?.heading}</span>
                      </div>
                      <Image src={arrow} className="acc-arrow" alt="arrow" />
                      <Image src={minus} className="acc-minus" alt="arrow" />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  >
                    {/* {item.body} */}
                  </Accordion.Body>
                </Accordion.Item>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
