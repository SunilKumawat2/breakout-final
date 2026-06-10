"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import SlotPicker from "./SlotPicker";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";
import { CommonModal } from "@/components/CommonModal";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";
import axios from "axios";

const ReserveASlot = ({ room, page_name, data = {}, onOpenFaq, className = "", }) => {
  const {
    availableSlots,
    fetchAvailableSlots,
    fetchThirdPartyGames,
    fetchThirdPartyLocations,
    loading,
    errors,
    thirdPartyLocations,
    thirdPartyGames,
    bookASlot,
  } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationOption, setSelectedLocationOption] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [hasSlotsFetched, setHasSlotsFetched] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchThirdPartyLocations();
  }, []);

  useEffect(() => {
  }, [thirdPartyLocations]);

  const handleLocationSelect = async (e) => {
    setSelectedLocation(e.value);
    setSelectedLocationOption(e);
    const games = await fetchThirdPartyGames(e.value);
  };

  const handleGameSelect = (e) => {
    setSelectedGame(e ? e.map((game) => game.value) : []);
  };



  useEffect(() => {
    const fetchSlots = async () => {
      if (
        !selectedLocation ||
        !selectedGame ||
        !selectedStartDate
      ) {
        return;
      }
      setHasSlotsFetched(true);
      setSlotsLoading(true);
      const slots = await fetchAvailableSlots(
        selectedLocation,
        selectedGame,
        selectedStartDate,
        // selectedEndDate
      );
      setSlotsLoading(false);
    };
    fetchSlots();
  }, [selectedLocation, selectedGame, selectedStartDate]);

  const safePageName =
    typeof page_name === "string"
      ? page_name
      : Array.isArray(page_name)
        ? page_name[0]
        : "";

  const formattedPageName = safePageName
    ? safePageName.replace(/-/g, " ").toLowerCase()
    : "";

  const filteredLocations = formattedPageName
    ? thirdPartyLocations?.filter((loc) =>
      loc.locationName
        ?.toLowerCase()
        .includes(formattedPageName)
    )
    : thirdPartyLocations;



  useEffect(() => {
    if (!formattedPageName || !thirdPartyLocations?.length) return;

    const matchedLocation = thirdPartyLocations.find((loc) =>
      loc.locationName
        ?.toLowerCase()
        .includes(formattedPageName)
    );

    if (matchedLocation) {
      const option = {
        value: matchedLocation.locationId,
        label: matchedLocation.locationName,
      };

      setSelectedLocationOption(option);
      setSelectedLocation(matchedLocation.locationId);
      fetchThirdPartyGames(matchedLocation.locationId);
    }
  }, [formattedPageName, thirdPartyLocations]);




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
    multiValue: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 174, 0, 0.18)",
      borderRadius: "12px",
      color: "#FFAE00",
      fontWeight: 500,
      padding: "2px 6px",
      margin: "2px 4px",
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#FFAE00",
      fontWeight: 500,
      padding: "0 4px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#FFAE00",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "rgba(255, 174, 0, 0.3)",
        color: "#fff",
      },
    }),
  };

  const datePickerCustomStyles = {
    className: "form-control",
    calendarClassName: "custom-datepicker",
    dayClassName: (date) => "custom-day",
    wrapperClassName: "datePicker",
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlotTime(slot);
  };


  const handleBookNow = async () => {
    if (bookingLoading) return;

    setBookingLoading(true);

    const trimmedFirstName = firstName?.trim();
    const trimmedLastName = lastName?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setBookingLoading(false);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      toast.error("Please enter a valid 10-digit phone number");
      setBookingLoading(false);
      return;
    }

    const bookingData = {
      customerFirstName: trimmedFirstName,
      customerLastName: trimmedLastName,
      customerEmail: trimmedEmail,
      customerPhone: trimmedPhone,
      slotId: selectedSlotTime?.slotId,
      locationId: selectedLocation,
      gameId: selectedGame?.[0],
    };

    try {
      const response = await bookASlot(bookingData);

      if (response?.bookingId) {
        // toast.success("Booking successful");

        // ✅ 🔥 GTM CONVERSION EVENT
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "booking_success",
          event_type: "conversion",
          booking_id: response.bookingId,
          user_email: trimmedEmail,
          location_id: selectedLocation,
          game_id: selectedGame?.[0],
        });

        // ================= RESET FORM =================
        // setFirstName("");
        // setLastName("");
        // setEmail("");
        // setPhone("");

        // setSelectedLocation(null);
        // setSelectedLocationOption(null);
        // setSelectedGame([]);
        // setSelectedSlotTime(null);
        // setHasSlotsFetched(false);
        // setSelectedDate(null);

        setCartId(response.bookingId);
        setShowIframe(true);

      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredSlots = availableSlots?.filter(
    (slot) => slot.isAvailable === true
  );

  useEffect(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const arr = Array.from({ length: totalDays }, (_, i) => i + 1);
    setDays(arr);

    if (
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      setStartIndex(today.getDate() - 1);
    } else {
      setStartIndex(0);
    }
  }, [year, month]);

  const daysToShow = isMobile ? 5 : 7;
  const visibleDays = days.slice(startIndex, startIndex + daysToShow);

  const nextDays = () => {
    if (startIndex + 7 < days.length) {
      setStartIndex(startIndex + daysToShow);
    }
  };

  const prevDays = () => {
    if (startIndex - 7 >= 0) {
      setStartIndex(startIndex - daysToShow);
    }
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };


  // const handleDateSelect = (day) => {
  //   const dateObj = new Date(year, month, day);
  //   setSelectedDate(dateObj);
  //   setSelectedStartDate(dateObj);
  //   // formik.setFieldValue("date", dateObj);
  // };

  const handleDateSelect = (day) => {
    const dateObj = new Date(year, month, day);
    const formattedDate = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
    setSelectedDate(dateObj);
    setSelectedStartDate(formattedDate);  
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return checkDate < todayDate;
  };

  const handleIframeClose = async () => {
    try {
      const response = await axios.post("/api/release-seats", {
        locationId: selectedLocation,
        bookingId: cartId,
      });
  
      console.log("Release API Response:", response.data);
    } catch (error) {
      console.error("Release API Error:", error);
    } finally {
      setShowIframe(false);
    }
  };

  return (
    <section className={`section-padding ${className}`} >
      {
        data && Object.keys(data)?.length > 0 ? (
          <CommonModal show={show} handleClose={() => setShow(false)}>
            <div className="esc-modal-content">
              <h3 className="sec-head h3 yellow-text">{data?.title}</h3>
              <p className="para mt-4 sm" dangerouslySetInnerHTML={{
                __html: data?.content
              }} />


              {/* <Link href={"#"} className="main-btn">
        <span>Book Now</span>
      </Link> */}
            </div>
          </CommonModal>
        ) : (
          <CommonModal show={show} handleClose={() => setShow(false)}>
            <div className="esc-modal-content">
              <h3 className="sec-head h3 yellow-text">Terms and Conditions</h3>
              <p className="para mt-4 sm">
                <strong>1. Booking Confirmation Requirement:</strong> To ensure
                entry to your escape room experience, a booking confirmation email
                is mandatory. If you have not received this email after payment,
                please contact our support team for assistance. Without the
                confirmation, entry cannot be guaranteed, but we will do our best to
                accommodate you based on availability or issue a refund if
                necessary.
                <br />
                <br />
                <strong>2. Arrival Time:</strong> All team members must arrive at
                least 20 minutes before the scheduled slot time to allow for form
                filling, considering the 3 Ps: Parking time, Peeing time, and the
                Painful Bangalore traffic.  <br />
                <br />
                <strong>3. Liability Form:</strong> A liability form must be
                completed at the facility. Incomplete forms will result in denial of
                entry by the Game Master, except for individuals aged 13 years and
                below.  <br />
                <br />
                <strong>4. Game Time Reduction:</strong> If you are late for the
                experience, your game time will be cut short accordingly.  <br />
                <br />
                <strong>5. Entry Restriction:</strong> If you arrive after your slot
                timing, entry will be restricted to prevent delays for subsequent
                teams. However, if you arrive within 10 minutes of your slot time,
                we will make every effort to accommodate you.  <br />
                <br />
                <strong>6. No Cancellation and Refund Policy:</strong> Please note
                that we have a strict no-cancellation and no-refund policy for
                bookings.
              </p>
              {/* <Link href={"#"} className="main-btn">
              <span>Book Now</span>
            </Link> */}
            </div>
          </CommonModal>
        )
      }

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2
                className="sec-head sm-head medium"
                dangerouslySetInnerHTML={{
                  __html: room?.heading,
                }}
              >
                {/* Reserve <span>a Slot</span> */}
              </h2>
            </div>
          </div>
          <div className="col-12">
            <p className="para">Pricing</p>
            <div className="cus-card pick-card mt-0">
              <div className="row row-gap-25">
                {room?.pricing?.[0] && (
                  <div className="col-lg-4 col-6 text-center">
                    <h3 dangerouslySetInnerHTML={{ __html: room.pricing[0].day_range, }}></h3>

                    <p className="para">
                      {room.pricing[0].price23}
                      <br />
                      {room.pricing[0].price46}
                    </p>
                  </div>
                )}

                {room?.pricing?.[1] && (
                  <div className={`col-lg-4 col-6 text-center ${isMobile ? "border-0" : ""}`}>
                    <h3 dangerouslySetInnerHTML={{ __html: room.pricing[1].day_range, }}></h3>

                    <p className="para">
                      {room.pricing[1].price23}
                      <br />
                      {room.pricing[1].price46}
                    </p>
                  </div>
                )}
                {isMobile && (
                  <>
                    {room?.pricing?.[0] && (
                      <div className="col-lg-4 col-6 text-center">
                        <h3 dangerouslySetInnerHTML={{ __html: room.pricing[0].day_range, }}></h3>

                        <p className="para">
                          {room.pricing[0].price23}
                        </p>
                        <p className="para">
                          {room.pricing[0].price46}
                        </p>
                      </div>
                    )}
                  </>
                )
                }

                {room?.pricing?.[2] && (
                  <div className="col-lg-4 col-6 text-center">
                    <h3 dangerouslySetInnerHTML={{ __html: room.pricing[2].day_range, }}></h3>

                    <p className="para">
                      {room.pricing[2].price23}
                      <br />
                      {room.pricing[2].price46}
                    </p>
                  </div>
                )}
              </div>
              <p className="para mt-5 mb-0" id="book-now">
                {room?.note}{" "}
                <span
                  className="yellow-text"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                  onClick={() => onOpenFaq(3)}
                >
                  Check eligibility Criteria
                </span>
              </p>

              <p className="para">
                Kids Pricing.{" "}
                <span
                  className="yellow-text"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                  onClick={() => onOpenFaq(4)}   // ← index 4
                >
                  Check here
                </span>
              </p>

            </div>
            <button
              className="main-btn mt-4 dark-btn sm"
              onClick={() => setShow(true)}
            >
              <span className="yellow-text" >T&C applied*</span>
            </button>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleBookNow();
            }} className="form-field mt-5" >
              <div className="row">
                <div className="col-lg-4 col-12">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Choose a Location & Booking
                    </label>
                    <div className="input-group sel-group">
                      <Image src={loc} alt="loc" />
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select an option"
                        value={selectedLocationOption}
                        styles={{
                          ...customStyles,
                          control: (base, state) => ({
                            ...customStyles.control(base, state),
                            paddingLeft: "35px",
                          }),
                        }}
                        onChange={(e) => {
                          handleLocationSelect(e);
                        }}
                        options={
                          filteredLocations?.length > 0
                            ? filteredLocations.map((location) => ({
                              value: location.locationId,
                              label: location.locationName,
                            }))
                            : []
                        }
                      />


                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Choose a Game
                    </label>
                    <div className="input-group sel-group">
                      <Select
                        isMulti
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select an option"
                        name="color"
                        styles={{
                          ...customStyles,
                          control: (base, state) => ({
                            ...customStyles.control(base, state),
                          }),
                        }}
                        onChange={(e) => {
                          handleGameSelect(e);
                        }}
                        options={
                          thirdPartyGames?.length > 0 && thirdPartyGames
                            ? thirdPartyGames?.map((game) => ({
                              value: game.gameId,
                              label: game.gameName,
                            }))
                            : []
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* ================= CALENDAR ================= */}
                <div className="col-12 mb-4 mt-3">
                  <div className="calendar-wrapper">
                    <div className="calendar-header">
                      <div
                        className="month-year-select mb-3"
                      // onClick={() => setShowMonthYear(!showMonthYear)}
                      >
                        <span>
                          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
                        </span>
                        <span>
                          {isMobile && (
                            <div
                              className="calender-btn"
                              onClick={() => setShowMonthYear(!showMonthYear)}
                            >
                              {/* › */}
                              <Image src={calenderIcon} alt="Calender Icon" />
                            </div>
                          )

                          }
                        </span>
                        {/* <Image src={selectDrop} alt="arrow" /> */}
                      </div>
                    </div>

                    <div className="calendar-days-outer">
                      <div className="calendar-days">
                        <div className="arrow" onClick={prevDays} disabled={startIndex === 0}>
                          {/* ‹ */}
                          <Image src={arrowPrev} alt="Previous" />
                        </div>

                        {visibleDays.map((day) => {
                          const past = isPastDate(day);

                          return (
                            <div
                              key={day}
                              onClick={() => {
                                if (!past) handleDateSelect(day);
                              }}
                              className={`day ${past ? "disabled" : ""} ${selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() === month &&
                                selectedDate.getFullYear() === year
                                ? "active"
                                : ""
                                }`}
                            >
                              {day}
                            </div>
                          );
                        })}


                        <div
                          className={`arrow ${startIndex + 7 >= days.length ? "disabled" : ""} `}
                          onClick={nextDays}
                          disabled={startIndex + 7 >= days.length}
                        >
                          {/* › */}
                          <Image src={arrowNext} alt="Next" />
                        </div>
                        {!isMobile && (
                          <div
                            className="calender-btn"
                            onClick={() => setShowMonthYear(!showMonthYear)}
                          >
                            {/* › */}
                            <Image src={calenderIcon} alt="Calender Icon" />
                          </div>
                        )

                        }

                      </div>

                      {showMonthYear && (
                        <div className="month-year-dropdown">
                          <div className="months">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                className={`option ${month === i ? "active" : ""}`}
                                onClick={() => {
                                  setMonth(i);
                                  setShowMonthYear(false);
                                }}
                              >
                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                              </div>
                            ))}
                          </div>

                          <div className="years">
                            {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].map((y) => (
                              <div
                                key={y}
                                className={`option ${year === y ? "active" : ""}`}
                                onClick={() => {
                                  setYear(y);
                                  setShowMonthYear(false);
                                }}
                              >
                                {y}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
                {/* ============= Slot Picker ============== */}
                <div className="col-lg-12 col-12">
                  <div className="">
                    {slotsLoading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : filteredSlots?.length > 0 ? (
                      <SlotPicker
                        handleSelect={handleSlotSelect}
                        selectedSlotTime={selectedSlotTime}
                        availableSlots={filteredSlots}
                      />
                    ) : !hasSlotsFetched ? (
                      <div className="text-center py-5">
                        <p>Please select a location, game, date</p>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p>No slots available</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="main-btn mt-4 sm"
                    disabled={bookingLoading}
                  >
                    <span className="">
                      {bookingLoading ? "Booking..." : "Book Now"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CommonModal show={showIframe} 
      // handleClose={() => setShowIframe(false)}
      handleClose={handleIframeClose}
       onReleaseSeats={true}>
        <div style={{ width: "100%", height: "75vh" }}>
          {/* {cartId && ( */}
          <iframe
            src={`https://book.breakout.in/embed/book?cartId=${cartId}`}
            width="100%"
            height="100%"
            frameBorder="0"
          />
          {/* )} */}
        </div>
      </CommonModal>
    </section>
  );
};

export default ReserveASlot;
