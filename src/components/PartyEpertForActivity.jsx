import React from "react";
import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";
import Link from "next/link";
import Image from "next/image";

const PartyEpertForActivity = ({ title }) => {
  return (
    <section className="hm-contact-sec section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head medium"
              dangerouslySetInnerHTML={{
                __html: title || "Running<span> Out of Time? </span>",
              }}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="hm-con-form-card">
              <div className="row align-items-center justify-content-between">
                {/* <div className="col-lg-5 col-12">
                  <h3 className="sec-head medium">
                    Talk with <span>an Expert</span>
                  </h3>
                  <p className="para">
                    Let us plan the perfect party for you. Contact us for
                    details.
                  </p>
                </div> */}
                <div className="col-lg-12 col-12">
                  {/* <div className="hm-con-form-card-head">
                    
                    
                  </div> */}
                  <div className="hm-con-form-card-head justify-content-center">
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={whicon} alt="hmimg5" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919876543210">
                          <Image src={phicon} alt="hmimg5" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919876543210">
                          <span>+91 9876543210</span>
                        </Link>
                      </li>
                    </ul>

                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link href="mailto:Breakout@gmail.com">
                          <Image src={mailicon} alt="hmimg5" />
                        </Link>
                      </li>
                      <li>
                        <Link href="mailto:Breakout@gmail.com">
                          <span>Breakout@gmail.com</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-wrap d-flex gap-2 mt-4 align-items-center justify-content-center">
                    <Link href="tel:+919876543210" className="main-btn ">
                      <span>Call Now</span>
                    </Link>
                    <Link
                      href="https://www.facebook.com/EscapeRoom.co.uk"
                      className="main-btn dark-btn yellow-text white-border"
                      target="_blank"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "cta_click",
                          button_name: "Book a call",
                          destination: "facebook",
                          link_url: "https://www.facebook.com/EscapeRoom.co.uk",
                          page: window.location.pathname,
                        });
                      }}
                    >
                      <span>Book a call</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartyEpertForActivity;
