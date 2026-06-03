"use client";
import React from 'react'
import Image from "next/image";

import location from "@/images/location.svg";
import Link from 'next/link';

const page = () => {

    const trackBookingClick = (name, url) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "cta_click",
            button_name: name,
            destination: "external_booking",
            link_url: url,
            page: window.location.pathname,
            section: "booking_cta",
        });
    };

    return (
        <div className="book-now-page pt-80">
            <section className="booking-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h3 className="sec-head medium sm-head">
                                Breakout® <span> Escape Room Experience </span>
                            </h3>

                        </div>
                    </div>
                    <div className="row row-booking justify-content-center mb-40">
                        <div className="col-lg-9 col-12">
                            <div className="book-box-item">
                                <div className="book-box-icon">
                                    <Image
                                        src={location}
                                        width={100}
                                        height={100}
                                        alt="enc"
                                    />
                                    <h4 className="sec-head h3 mb-0">
                                        Koramangala
                                    </h4>
                                </div>

                                <Link href="https://book.breakout.in/breakout-in/blr-koramangala"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="main-btn"
                                    onClick={() =>
                                        trackBookingClick(
                                            "Book Now - koramangala",
                                            "https://book.breakout.in/breakout-in/blr-koramangala"
                                        )
                                    }
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className="book-box-item">
                                <div className="book-box-icon">
                                    <Image
                                        src={location}
                                        width={100}
                                        height={100}
                                        alt="enc"
                                    />
                                    <h4 className="sec-head h3 mb-0">
                                        Whitefield
                                    </h4>
                                </div>

                                <Link
                                    href="https://book.breakout.in/breakout-in/blr-whitefield"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="main-btn"
                                    onClick={() =>
                                        trackBookingClick(
                                            "Book Now - Whitefield",
                                            "https://book.breakout.in/breakout-in/blr-whitefield"
                                        )
                                    }
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className="book-box-item">
                                <div className="book-box-icon">
                                    <Image
                                        src={location}
                                        width={100}
                                        height={100}
                                        alt="enc"
                                    />
                                    <h4 className="sec-head h3 mb-0">
                                        JP Nagar
                                    </h4>
                                </div>

                                <Link href="https://book.breakout.in/breakout-in/blr-jp-nagar" className="main-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() =>
                                        trackBookingClick(
                                          "Book Now - jp-nagar",
                                          "https://book.breakout.in/breakout-in/blr-jp-nagar"
                                        )
                                      }
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page
