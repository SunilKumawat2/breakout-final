// "use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const InnerPageBanner = dynamic(() => import("@/components/InnerPageBanner"));
const HmTextSec = dynamic(() => import("@/components/home/HmTextSec"));
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const EscapeRoomCard = dynamic(() => import("@/components/EscapeRoomCard"));
const HomeContact = dynamic(() => import("@/components/home/HomeContact"));
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
const OurLocationSec = dynamic(() => import("@/components/OurLocationSec"));
const GReviewSlider = dynamic(() => import("@/components/GReviewSlider"));
import SmoothScrolling from "@/components/SmoothScroll";
import illus3 from "@/images/illus3.svg";
import illus from "@/images/contact-bottom-illus.svg";
import hmIllus from "@/images/bottom-illus.svg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import api from "@/app/helpers/api";

// SSR data fetching
import { notFound } from "next/navigation";
import { Modal } from "react-bootstrap";

export async function getData(id) {
  try {
    const [roomsRes, brands] = await Promise.all([
      api.get(`/landing/${id}`),
      api.get(`/logos/brands`),
    ]);
    return {
      rooms: roomsRes.data.data,
      brands: brands.data.data,
    };
  } catch (error) {
    notFound();
  }
}

// Next.js 13/14/15 SSR page
const Page = async ({ params }) => {
  const { id } = await params;
  const { rooms, brands } = await getData(id);
  const escapeRoomsExtreme =
    rooms?.escapeRooms?.filter((room) => {
      try {
        const tags = JSON.parse(room?.tag || "[]");
        return tags.includes("Extreme");
      } catch {
        return false;
      }
    }) || [];

  const escapeRoomsUltra =
    rooms?.escapeRooms?.filter((room) => {
      try {
        const tags = JSON.parse(room?.tag || "[]");
        return tags.includes("Ultra");
      } catch {
        return false;
      }
    }) || [];
  return (
    <>
      <Header />
      <SmoothScrolling>
        {/* {JSON.stringify(rooms)} */}
        {rooms?.bannersection && (
          <InnerPageBanner banner={rooms?.bannersection} bdayInner={true} />
        )}
        <div className="black-gr-div">
          {rooms?.countersection && (
            <TrustedSection className="sec-padding-top pb-0" data={rooms?.countersection} />
          )}
          {rooms?.contentsection && (
            <HmTextSec className="sec-padding-top pb-0" text={rooms?.contentsection?.content} />
          )}
          {rooms?.imagescardsection && (
            <section className="sec-padding-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h3
                      className="sec-head medium sm-head"
                      dangerouslySetInnerHTML={{
                        __html: rooms?.imagescardsection?.heading,
                      }}
                    />
                    <div className="row row-gap-25 mt-5">
                      {rooms?.imagescardsection?.images?.length > 0 &&
                        rooms?.imagescardsection?.images.map((item, index) => (
                          <div className="col-lg-3 col-12" key={index}>
                            <div className="box-item">
                              <div className="box-item-icon">
                                {item?.image && (
                                  <Image
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    alt="enc"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                              <div className="box-item-content">
                                <h4 className="sec-head medium-20 mb-0">
                                  {item?.heading}
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <Image src={hmIllus} alt="illus3" className="illus-image" loading="lazy" />
        </div>
        <div className="black-gr-div">
          {rooms?.idealforsection && rooms?.idealforsection?.heading !== "" && (
            <section className="sec-padding-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h3
                      className="sec-head medium sm-head"
                      dangerouslySetInnerHTML={{
                        __html: rooms?.idealforsection?.heading,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  {rooms?.idealforsection?.images?.map((item, index) => (
                    <div className="col-lg-3 col-12" key={index}>
                      <div className="location-card">
                        <div className="location-card-img">
                          {item.image && item.image != "" && (
                            <Image
                              src={item.image}
                              width={500}
                              height={500}
                              alt={item.heading}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="location-card-content">
                          <h3>{item.heading}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {brands && brands?.length > 0 && (
            <LogoSec
              title="<span>Brands</span> Hosted"
              logos={brands}
              link={false}
              className="pb-0"
            />
          )}

          <section className="sec-padding-top esc-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  {
                    id == "things-to-do-jp-nagar" ? (
                      <h3 className="sec-head medium sm-head">
                        <span>Escape Rooms</span> in JP Nagar
                      </h3>
                    ) : id == "things-to-do-whitefield" ? (
                      <h3 className="sec-head medium sm-head">
                        <span>Escape Rooms</span> in Whitefield
                      </h3>
                    ) : id == "things-to-do-in-bangalore" ? (
                      <h3 className="sec-head medium sm-head">
                        <span>Escape Rooms</span> in Bangalore
                      </h3>
                    ) : id == "mystery-games-bangalore" ? (
                      <h3 className="sec-head medium sm-head">
                        <span>Mystery Experiences</span> in Bangalore
                      </h3>
                    ) : id == "escape-room-bangalore" ? (
                      <h3 className="sec-head medium sm-head">
                        <span>Escape Rooms</span> in Bangalore
                      </h3>
                    ) : (
                      <h3 className="sec-head medium sm-head">
                        <span>Escape Rooms</span> in Koramangala
                      </h3>
                    )
                  }
                </div>
              </div>
              {
                (id != "things-to-do-in-bangalore" &&
                  id != "things-to-do-jp-nagar" &&
                  id != "things-to-do-whitefield" &&
                  id != "mystery-games-bangalore" &&
                  id != "escape-room-bangalore")
                && (
                  <>
                    {escapeRoomsExtreme && escapeRoomsExtreme?.length > 0 && (
                      <div>
                        <div className="row row-booking">
                          <div className="col-12">
                            <h3 className="sec-head medium mb-0 sm-head text-center">
                              At <span>Extreme</span>
                            </h3>
                          </div>
                          {/* {escapeRoomsExtreme?.map((room, index) => (
                            <div className="col-lg-4 col-12"
                              key={index}>
                              <EscapeRoomCard room={room} />
                            </div>
                          ))} */}
                          {escapeRoomsExtreme
                            ?.filter((room) => {
                              // Apply only for Koramangala
                              if (id == "things-to-do-koramangala") {
                                return (
                                  room?.slug != "hostage" &&
                                  room?.slug != "classified" &&
                                  room?.slug != "bomb-defusal" &&
                                  room?.slug != "prison-break"
                                );
                              }

                              // Other locations show all rooms
                              return true;
                            })
                            ?.map((room, index) => (
                              <div className="col-lg-4 col-12" key={index}>
                                <EscapeRoomCard room={room} />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    {escapeRoomsUltra && escapeRoomsUltra?.length > 0 && (
                      <div className="pt-80">
                        <div className="row row-booking">
                          <div className="col-12">
                            <h3 className="sec-head medium mb-0 sm-head text-center">
                              At <span>Ultra</span>
                            </h3>
                          </div>
                          {escapeRoomsUltra?.map((room, index) => (
                            <div className="col-lg-4 col-12" key={index}>
                              <EscapeRoomCard room={room} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )
              }


              {
                (id == "things-to-do-in-bangalore" || id == "things-to-do-jp-nagar"
                  || id == "things-to-do-whitefield" || id == "mystery-games-bangalore"
                  || id == "escape-room-bangalore") && (
                  <div className="row row-gap-25">

                    {rooms?.escapeRooms?.map((room, index) => (
                      <div className="col-lg-4 col-12" key={index}>
                        <EscapeRoomCard room={room} />
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </section>
          {rooms?.cardsection &&
            rooms?.cardsection?.length > 0 &&
            rooms?.cardsection[0]?.heading !== "" && (
              <section className="card-sec section-padding pb-0">
                <div className="container">
                  <div className="cpr-card-container">
                    <div className="row row-gap-25">
                      {rooms?.cardsection?.map((item, index) => (
                        <div className="col-lg-6" key={index}>
                          <div className="cpr-col cpr-left">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                alt="cpr-card"
                                width={500}
                                height={500}
                                loading="lazy"
                              />
                            )}
                            <h3
                              className="sec-head medium-20 sm-head"
                              dangerouslySetInnerHTML={{
                                __html: item?.heading,
                              }}
                            />
                            <p
                              className="sec-para"
                              dangerouslySetInnerHTML={{
                                __html: item?.content ? item?.content : item?.description,
                              }}
                            />
                            {/* <button className="main-btn link-btn">
                              <span>Know More</span>
                            </button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          <Image src={illus3} alt="illus3" className="illus-image" loading="lazy" />
        </div>
        {/* <section className="section-padding counter-sec pb-0">
          <div className="container">
            <div className="row">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-12" key={index}>
                  <CounterBox />
                </div>
              ))}
            </div>
          </div>
        
        </section> */}

        <div className="black-gr-div">
          {
            id == "things-to-do-jp-nagar" ? (
              <OurLocationSec
                className="sec-padding-top"
                title="Choose a <span>Location</span>"
                slug="jp-nagar"
              />
            ) : id == "things-to-do-whitefield" ? (
              <OurLocationSec
                className="sec-padding-top"
                title="Choose a <span>Location</span>"
                slug="whitefield"
              />
            ) : (
              <OurLocationSec
                className="sec-padding-top"
                title="Choose a <span>Location</span>"
                slug=""
              />
            )
          }

          {rooms?.faqsection && rooms?.faqsection?.length > 0 && (
            <FaqSection className="section-padding pb-0" data={rooms?.faqsection} />
          )}

          {rooms?.videotestimonials && (
            <Videotestimonials data={rooms?.videotestimonials} />
          )}
          {rooms?.googlereviews && rooms?.googlereviews?.length > 0 && (
            <div className="pt-80">
              <GReviewSlider commonStars={false} data={rooms?.googlereviews} />
            </div>
          )}
          <LogoSec className="pt-80 pb-0"
            title={"<span>In the</span> News"}
            logo={rooms?.brandLogo}
            link={true}
          />
          <HomeContact img={illus} page_name="landing" noTextBottom={false} page_type="escape_room" />
        </div>

        {/* <PeakExpSec /> */}
        {/* </div> */}
      </SmoothScrolling>
      <Footer />
    </>
  );
};

export default Page;
