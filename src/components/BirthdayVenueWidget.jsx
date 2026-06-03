// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Select from "react-select";
// import VenueCard from "./VenueCard";
// import { useGlobalContext } from "@/context/GlobalContext";
// import { Accordion } from "react-bootstrap";
// import arrow from "@/images/acc-plus.svg";
// import minus from "@/images/acc-minus.svg";
// import Image from "next/image";
// import api from "@/app/helpers/api";
// import VenueInner from "./VenueInner";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// const BirthdayVenueWidget = () => {
//   const { venueCategories } = useGlobalContext();
//   const [venueCards, setVenueCards] = useState(null);
//   console.log("venueCards_venueCards_venueCards",venueCards)
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   // Store refs for each Swiper instance (one per Accordion item)
//   const swiperRefs = useRef({});

//   useEffect(() => {
//     const fetchVenueCards = async () => {
//       const response = await api.get("/birthdayblogfaqs");
//       const data = await response.data;
//       setVenueCards(data?.data);
//     };
//     fetchVenueCards();
//   }, []);

//   // When selectedVenue changes, slide to that venue in the correct Swiper
//   useEffect(() => {
//     if (!selectedVenue || !venueCards) return;
//     // Find which Accordion (venueCards) contains the selectedVenue
//     for (let i = 0; i < venueCards.length; i++) {
//       const venues = venueCards[i]?.venues || [];
//       const idx = venues.findIndex((v) => v.id === selectedVenue.id);
//       if (idx !== -1 && swiperRefs.current[i]) {
//         swiperRefs.current[i].slideTo(idx, 300);
//         break;
//       }
//     }
//   }, [selectedVenue, venueCards]);

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       background: "rgba(243, 244, 244, 0.1)",
//       borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
//       borderRadius: "20px",
//       padding: "8px",
//       color: "#FFFFFF",
//       cursor: "pointer",
//       "&:hover": {
//         borderColor: "rgba(255, 174, 0, 0.3)",
//       },
//       input: {
//         color: "#FFFFFF",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       background: "#272727",
//       borderRadius: "10px",
//       zIndex: 9999,
//     }),
//     option: (base, state) => ({
//       ...base,
//       background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
//       color: state.isFocused ? "#FFAE00" : "#FFFFFF",
//       cursor: "pointer",
//       "&:hover": {
//         background: "rgba(255, 174, 0, 0.1)",
//         color: "#FFAE00",
//       },
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#FFFFFF",
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "rgba(255, 255, 255, 0.5)",
//     }),
//   };
//   return (
//     <section className="section-padding">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="birthday-venue-widget">
//               <h3 className="sec-head text-center sm-head medium ">
//                 <span>Best Party Places in Bangalore</span>
//               </h3>
//             </div>
//             <div className="b-flt-wrap mt-5 d-none">
//               <div className="b-flt-item">
//                 <label htmlFor="category" className="form-label">
//                   Category
//                 </label>
//                 <Select
//                   className="basic-single"
//                   classNamePrefix="select"
//                   placeholder="Select an option"
//                   name="color"
//                   styles={{
//                     ...customStyles,
//                     control: (base, state) => ({
//                       ...customStyles.control(base, state),
//                       paddingLeft: "35px",
//                     }),
//                   }}
//                   options={venueCategories?.map((category) => ({
//                     value: category?.category,
//                     label: category?.category,
//                   }))}
//                 />
//               </div>
//               <div className="b-flt-item">
//                 <label htmlFor="Location" className="form-label">
//                   Location
//                 </label>
//                 <Select
//                   className="basic-single"
//                   classNamePrefix="select"
//                   placeholder="Select an option"
//                   name="color"
//                   styles={{
//                     ...customStyles,
//                     control: (base, state) => ({
//                       ...customStyles.control(base, state),
//                       paddingLeft: "35px",
//                     }),
//                   }}
//                   options={[
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                   ]}
//                 />
//               </div>
//               <div className="b-flt-item">
//                 <label htmlFor="Capacity" className="form-label">
//                   Capacity
//                 </label>
//                 <Select
//                   className="basic-single"
//                   classNamePrefix="select"
//                   placeholder="Select an option"
//                   name="color"
//                   styles={{
//                     ...customStyles,
//                     control: (base, state) => ({
//                       ...customStyles.control(base, state),
//                       paddingLeft: "35px",
//                     }),
//                   }}
//                   options={[
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                   ]}
//                 />
//               </div>
//               <div className="b-flt-item">
//                 <label htmlFor="Party Type" className="form-label">
//                   Party Type
//                 </label>
//                 <Select
//                   className="basic-single"
//                   classNamePrefix="select"
//                   placeholder="Select an option"
//                   name="color"
//                   styles={{
//                     ...customStyles,
//                     control: (base, state) => ({
//                       ...customStyles.control(base, state),
//                       paddingLeft: "35px",
//                     }),
//                   }}
//                   options={[
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                     { value: "Koramangala", label: "Koramangala" },
//                   ]}
//                 />
//               </div>
//             </div>
//             {venueCards && venueCards?.length > 0 && (
//               <Accordion className="b-venue-cards-accordion mt-5 acc">
//                 {venueCards?.map((venue, accIndex) => (
//                   <Accordion.Item eventKey={accIndex} key={accIndex}>
//                     <Accordion.Header>
//                       <span>{venue?.question}</span>
//                       <Image src={arrow} className="acc-arrow" alt="arrow" />
//                       <Image src={minus} className="acc-minus" alt="arrow" />
//                     </Accordion.Header>
//                     <Accordion.Body>
//                       <div className="b-venue-cards">
//                         <div className="row row-gap-25">
//                           {venue?.venues?.map((venueItem, vIndex) => (
//                             <div className="col-lg-3 col-12" key={vIndex}>
//                               <VenueCard
//                                 venue={venueItem}
//                                 setSelectedVenue={setSelectedVenue}
//                                 selectedVenue={selectedVenue}
//                                 clickable={true}
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="venue-card-slider">
//                         <Swiper
//                           slidesPerView={1}
//                           spaceBetween={10}
//                           onSwiper={(swiper) => {
//                             swiperRefs.current[accIndex] = swiper;
//                           }}
//                         >
//                           {venue?.venues?.length > 0 &&
//                             venue?.venues?.map((venueItem, vIndex) => (
//                               <SwiperSlide key={vIndex}>
//                                 <VenueInner venue={venueItem} />
//                               </SwiperSlide>
//                             ))}
//                         </Swiper>
//                       </div>
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 ))}
//               </Accordion>
//             )}
//           </div>
//         </div>

//       </div>

//     </section>
//   );
// };

// export default BirthdayVenueWidget;


"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import VenueCard from "./VenueCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import Image from "next/image";
import api from "@/app/helpers/api";
import VenueInner from "./VenueInner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BirthdayVenueWidget = ({ blogData = {}, className = "",page_type=""}) => {

  const headerRefs = useRef({});
  const itemRefs = useRef({});
  const swiperRefs = useRef({});
  const sliderRefs = useRef({});
  const isUserAction = useRef(false);
  const { venueCategories, venueCapacity } = useGlobalContext();
  
  console.log("BirthdayVenueWidget_page_type", page_type);
  const [venueCards, setVenueCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVenueDetails, setSelectedVenueDetails] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [venuesCardsCategory,setVenuesCardsCategory] = useState([])
  console.log("jksdfhkjsdhfjsdfh",venuesCardsCategory)
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  const sortedCapacity = [...(venueCapacity || [])].sort((a, b) => {
    const getMin = (val) => {
      if (val.includes("+")) return parseInt(val); // "100+" → 100
      return parseInt(val.split("-")[0]); // "51-100" → 51
    };

    return getMin(a) - getMin(b);
  });

  // Fetch venues
  const fetchVenueCards = async () => {
    if (!blogData?.id) return;

    setLoading(true);
    try {
      let query = "";

      const params = new URLSearchParams();

      if (selectedCategory) {
        params.append("venue_category", selectedCategory);
      }

      if (selectedCapacity) {
        params.append(
          "venue_capacity_range_option",
          selectedCapacity
        );
      }

      if (params.toString()) {
        query = `?${params.toString()}`;
      }

      const response = await api.get(
        `/blog-venue-groups/${blogData?.id}${query}`
      );

      console.log("API Venue Data:", response?.data);
      setVenuesCardsCategory(response?.data)
      setVenueCards(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching venue cards:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ❌ skip initial load
    if (!isUserAction.current) return;
    const index = Number(activeAccordion);

    if (
      activeAccordion !== null &&
      sliderRefs.current[index]
    ) {
      requestAnimationFrame(() => {
        sliderRefs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
    // reset flag after scroll
    isUserAction.current = false;
  }, [selectedVenueDetails, selectedVenue, selectedItem, activeAccordion]);


  useEffect(() => {
    fetchVenueCards();
  }, [blogData?.id, selectedCategory, selectedCapacity]);

  const fetchVenueCardsDetails = async (slug) => {
    setLoading(true);
    try {
      const response = await api.get(`/venue/${slug}`);
      console.log("API Venue Data:", response?.data?.data);
      setSelectedVenueDetails(response?.data?.data);
    } catch (err) {
      console.error("Error fetching venue details:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (venueCards?.length > 0) {
      const lastIndex = venueCards.length - 1;
      const lastAccordion = venueCards[lastIndex];
      const firstVenue = lastAccordion?.venues?.[0];
      const firstItem = lastAccordion?.items?.[0];
      setActiveAccordion(String(lastIndex));
      isUserAction.current = false;

      if (firstVenue) {
        setSelectedVenue(firstVenue);
        fetchVenueCardsDetails(firstVenue?.slug);
      } else if (firstItem) {
        setSelectedVenue(firstItem);
        setSelectedVenueDetails(null);
      }
    }
  }, [venueCards]);

  // Slide + scroll safely
  useEffect(() => {
    if (!selectedVenue || activeAccordion === null) return;
    const accIndex = Number(activeAccordion);
    const venues = venueCards[accIndex]?.venues || [];
    const slideIndex = venues.findIndex(
      (v) => v.id === selectedVenue.id
    );
    if (slideIndex === -1) return;
    const runWhenReady = () => {
      const swiper = swiperRefs.current[accIndex];
      const sliderEl = sliderRefs.current[accIndex];

      if (!swiper || !sliderEl) {
        requestAnimationFrame(runWhenReady);
        return;
      }

      swiper.slideTo(slideIndex, 0);
      // sliderEl.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      // });
    };

    requestAnimationFrame(runWhenReady);
  }, [selectedVenue, activeAccordion, venueCards]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "20px",
      padding: "8px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 0.3)",
      },
      input: {
        color: "#FFFFFF",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
      color: state.isFocused ? "#FFAE00" : "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(255, 174, 0, 0.1)",
        color: "#FFAE00",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
  };

  return (
    <section className={`section-padding ${className}`}>
      {venueCards?.length > 0 && (
        <div className="container">
          <h3 className="sec-head text-center sm-head medium">
            <span>Best Party Places in Bangalore</span>
          </h3>
          <div className="b-flt-wrap mt-5">
            <div className="b-flt-item">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Select
                data-lenis-prevent
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select an option"
                name="color"
                styles={{
                  ...customStyles,
                  control: (base, state) => ({
                    ...customStyles.control(base, state),
                    paddingLeft: "35px",
                  }),
                }}
                options={venuesCardsCategory?.categories?.map((category) => ({
                  value: category,
                  label: category,
                }))}
                onChange={(option) => setSelectedCategory(option?.value)}
              />
            </div>
            {/* <div className="b-flt-item">
            <label htmlFor="Location" className="form-label">
              Location
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select an option"
              name="color"
              styles={{
                ...customStyles,
                control: (base, state) => ({
                  ...customStyles.control(base, state),
                  paddingLeft: "35px",
                }),
              }}
              options={[
                { value: "Koramangala", label: "Koramangala" },
                { value: "Koramangala", label: "Koramangala" },
                { value: "Koramangala", label: "Koramangala" },
              ]}
            />
          </div> */}
            <div className="b-flt-item">
              <label htmlFor="Capacity" className="form-label">
                Capacity
              </label>
              {/* <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select an option"
                name="color"
                styles={{
                  ...customStyles,
                  control: (base, state) => ({
                    ...customStyles.control(base, state),
                    paddingLeft: "35px",
                  }),
                }}
                options={venueCapacity?.map((category) => ({
                  value: category,
                  label: category,
                }))}
                onChange={(option) => setSelectedCapacity(option?.value)}
              /> */}
              <Select
               data-lenis-prevent
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select an option"
                name="capacity"
                styles={{
                  ...customStyles,
                  control: (base, state) => ({
                    ...customStyles.control(base, state),
                    paddingLeft: "35px",
                  }),
                }}
                options={sortedCapacity.map((category) => ({
                  value: category,
                  label: category,
                }))}
                onChange={(option) => setSelectedCapacity(option?.value)}
              />
            </div>
            {/* <div className="b-flt-item">
            <label htmlFor="Party Type" className="form-label">
              Party Type
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select an option"
              name="color"
              styles={{
                ...customStyles,
                control: (base, state) => ({
                  ...customStyles.control(base, state),
                  paddingLeft: "35px",
                }),
              }}
              options={[
                { value: "Koramangala", label: "Koramangala" },
                { value: "Koramangala", label: "Koramangala" },
                { value: "Koramangala", label: "Koramangala" },
              ]}
            />
          </div> */}
          </div>
          <Accordion
            className="b-venue-cards-accordion mt-5 acc"
            activeKey={activeAccordion}
            // onSelect={(key) => setActiveAccordion(key)}
            // onSelect={(key) => {
            //   isUserAction.current = true; // ✅

            //   setActiveAccordion(key);

            //   const index = Number(key);
            //   const selectedAccordion = venueCards[index];

            //   const firstVenue = selectedAccordion?.venues?.[0];
            //   const firstItem = selectedAccordion?.items?.[0];

            //   setSelectedVenue(null);
            //   setSelectedVenueDetails(null);

            //   if (firstVenue) {
            //     setSelectedVenue(firstVenue);
            //     fetchVenueCardsDetails(firstVenue?.slug);
            //   } else if (firstItem) {
            //     setSelectedVenue(null);
            //     setSelectedVenueDetails(null);

            //     setSelectedItem({
            //       ...firstItem,
            //       id: `item-${index}-0`,
            //     });
            //   }
            // }}
            onSelect={(key) => {
              isUserAction.current = true;
              setActiveAccordion(key);
            
              const index = Number(key);
              const selectedAccordion = venueCards[index];
            
              const firstVenue = selectedAccordion?.venues?.[0];
              const firstItem = selectedAccordion?.items?.[0];
            
              // reset
              setSelectedVenue(null);
              setSelectedVenueDetails(null);
              setSelectedItem(null);
            
              // ✅ set first card active
              if (firstVenue) {
                setSelectedVenue(firstVenue);
                fetchVenueCardsDetails(firstVenue?.slug);
              } else if (firstItem) {
                setSelectedItem({
                  ...firstItem,
                  id: `item-${index}-0`,
                });
              }
            
              // ✅ scroll after animation
              setTimeout(() => {
                const el = itemRefs.current[index];
                if (!el) return;
            
                const rect = el.getBoundingClientRect();
            
                const y =
                  rect.top +
                  window.pageYOffset -
                  80; // adjust if needed
            
                window.scrollTo({
                  top: y,
                  behavior: "smooth",
                });
              }, 300);
            }}
          >
            {venueCards?.map((venue, accIndex) => (
              <Accordion.Item
              eventKey={String(accIndex)}
              key={accIndex}
              ref={(el) => (itemRefs.current[accIndex] = el)}
              >
                <Accordion.Header
                  ref={(el) => (headerRefs.current[accIndex] = el)}
                  onClick={(e) => {
                    e.currentTarget.blur();
                  }}
                >
                  <span>{venue?.heading}</span>
                  <Image src={arrow} className="acc-arrow" alt="" />
                  <Image src={minus} className="acc-minus" alt="" />
                </Accordion.Header>

                <Accordion.Body>
                  <div className="b-venue-cards">
                    <div className="row row-gap-25">
                      {venue?.venues?.map((venueItem, vIndex) => (
                        <div className="col-lg-3 col-12" key={vIndex}>
                          <VenueCard
                            venue={venueItem}
                            clickable
                            selectedVenue={selectedVenue}
                            // onClick={() => {
                            //   isUserAction.current = true; // ✅ mark user action

                            //   setActiveAccordion(String(accIndex));

                            //   setSelectedVenue(null);
                            //   setSelectedVenueDetails(null);

                            //   requestAnimationFrame(() => {
                            //     setSelectedVenue({ ...venueItem });
                            //     fetchVenueCardsDetails(venueItem?.slug);
                            //   });
                            // }}
                            onClick={() => {
                              isUserAction.current = true; // ✅ mark user action

                              setActiveAccordion(String(accIndex));

                              // reset old data
                              setSelectedVenue(null);
                              setSelectedVenueDetails(null);

                              requestAnimationFrame(() => {
                                setSelectedVenue({ ...venueItem });
                                setSelectedItem(null);

                                // fetch details for below section
                                fetchVenueCardsDetails(venueItem?.slug);

                                // ✅ scroll to venue details section below
                                setTimeout(() => {
                                  const detailsSection = sliderRefs.current[accIndex];

                                  if (detailsSection) {
                                    detailsSection.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }, 500);
                              });
                            }}
                          />
                        </div>
                      ))}
                      {venue?.items?.map((item, i) => {
                        const itemWithId = {
                          ...item,
                          id: `item-${accIndex}-${i}`,
                        };

                        return (
                          <div className="col-lg-3 col-12" key={i}>
                            <VenueCard
                              item={itemWithId}
                              clickable
                              selectedVenue={selectedVenue}
                              selectedItem={selectedItem}
                              onClick={() => {
                                isUserAction.current = true;

                                setActiveAccordion(String(accIndex));

                                setSelectedVenue(null);
                                setSelectedVenueDetails(null);

                                requestAnimationFrame(() => {
                                  setSelectedItem(itemWithId);
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="venue-card-slider"
                    ref={(el) => (sliderRefs.current[accIndex] = el)}
                  >
                    <Swiper
                      key={`${activeAccordion}-${selectedVenue?.id || "default"}`}
                      slidesPerView={1}
                      spaceBetween={10}
                      onSwiper={(swiper) => {
                        swiperRefs.current[accIndex] = swiper;
                      }}
                      allowTouchMove={false} // 🔥 IMPORTANT
                    >
                      {selectedVenueDetails ? (
                        // ✅ Full venue details API response (for venue cards)
                        <SwiperSlide key={`selected-${selectedVenueDetails?.id}`}>
                          <VenueInner
                            key={`selected-${selectedVenueDetails?.id}`}
                            venue={selectedVenueDetails}
                            page_type={page_type}
                          />
                        </SwiperSlide>

                      ) : selectedItem ? (
                        // ✅ Selected item card details (for items cards)
                        <SwiperSlide
                          key={`selected-item-${selectedItem?.id || selectedItem?.image_id}`}
                        >
                          <VenueInner
                            key={`selected-item-${selectedItem?.id || selectedItem?.image_id}`}
                            venue={selectedItem}
                            page_type={page_type}
                          />
                        </SwiperSlide>

                      ) : venue?.venues?.length > 0 ? (
                        // ✅ Default venue cards render
                        venue.venues.map((venueItem) => (
                          <SwiperSlide key={`venue-${venueItem?.id}`}>
                            <VenueInner
                              key={`venue-${venueItem?.id}`}
                              venue={venueItem}
                              page_type={page_type}
                            />
                          </SwiperSlide>
                        ))

                      ) : venue?.items?.length > 0 ? (
                        // ✅ Default items cards render
                        venue.items.map((item, i) => {
                          const itemWithId = {
                            ...item,
                            id: `item-${accIndex}-${i}`,
                          };

                          return (
                            <SwiperSlide key={`item-${itemWithId.id}`}>
                              <VenueInner
                                key={`item-${itemWithId.id}`}
                                venue={itemWithId}
                                page_type={page_type}
                              />
                            </SwiperSlide>
                          );
                        })

                      ) : null}
                    </Swiper>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  );
};

export default BirthdayVenueWidget;
