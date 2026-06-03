"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import privacyIcon from "@/images/privacy-icon.svg";
import illus from "@/images/contact-bottom-illus.svg";
import illus4 from "@/images/illus-party-bottom.svg";
import DatePicker from "@/components/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import selectDrop from "@/images/select-drop.svg";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";

const IWantToOptions = [
  {
    value: "Host a Birthday Party",
    label: "Host a Birthday Party",
    clickupId: "e86b91ed-6a60-4fdc-a9ee-ed433c7024d7",
  },
  {
    value: "Host a Bachelor(ette) Party",
    label: "Host a Bachelor(ette) Party",
    clickupId: "aba16fdf-3f71-4e4b-ac75-10761d6370e9",
  },
  {
    value: "Host a Bachelorette’s Party",
    label: "Host a Bachelorette’s Party",
    clickupId: "58ed4b08-4bb9-402f-9deb-b229a3402bfe",
  },
  {
    value: "Host a Farewell Party",
    label: "Host a Farewell Party",
    clickupId: "a2374420-ceaf-41c4-a60c-06ee99954077",
  },
];
const AtOptions = [
  {
    value: "Koramangala",
    label: "Koramangala",
    clickupId: "c8855921-430a-4ae0-9726-67327a81d464",
  },
  {
    value: "J P Nagar",
    label: "J P Nagar",
    clickupId: "65d716ad-1656-4d18-9aca-ae3c3ade27d9",
  },
  {
    value: "Whitefield",
    label: "Whitefield",
    clickupId: "a9295c1d-062b-4e2a-b084-9c3a5d05551b",
  },
];
const ForOptions = [
  {
    value: "Toddlers",
    label: "Toddlers",
    clickupId: "6d24f1b7-0e80-46cc-b22c-b8bbfcc908df",
  },
  {
    value: "Kids",
    label: "Kids",
    clickupId: "20596368-a3f6-4f3d-8eee-836797b34386",
  },
  {
    value: "Tweens",
    label: "Tweens",
    clickupId: "003b874c-7439-4678-991a-291aeb396645",
  },
  {
    value: "Teens",
    label: "Teens",
    clickupId: "4b2dd850-b074-43ad-8aab-e4d238cfc438",
  },
  {
    value: "Friends / Family",
    label: "Friends / Family",
    clickupId: "10335030-1e64-488d-9220-76790fd1fa13",
  },
  {
    value: "Love",
    label: "Love",
    clickupId: "3c6f4b94-dba1-45e2-b03c-0c396a1aa6b6",
  },
];

const PartyGetInTouch = ({
  img,
  privacyLine = false,
  noTextBottom = true,
  data,
  home = false,
  noImage = false,
  className = ""
  , type
}) => {
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const page = usePathname();
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  console.log("type_type_type", type)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "30px",
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
    menuPortal: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 999999,
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 999999,
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

  const datePickerCustomStyles = {
    className: "form-control",
    calendarClassName: "custom-datepicker",
    dayClassName: (date) => "custom-day",
    wrapperClassName: "datePicker",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      whatsappNumber: "",
      date: null,
      iWantTo: null,
      at: null,
      // forCount: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      whatsappNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      date: Yup.date().required("Please select a date").nullable(false),
      iWantTo: Yup.object().nullable().required("Please select an option"),
      at: Yup.object().nullable().required("Please select a location"),
      forCount: Yup.object().nullable(),
    }),
    // onSubmit: async (values, { resetForm }) => {
    //   setLoading(true);
    //   setSubmitSuccess(false);
    //   try {
    //     const sendData = {
    //       name: values.name,
    //       whatsappNumber: values.whatsappNumber,
    //       // date: values.date ? values.date.toISOString().split("T")[0] : "",
    //       date: values.date ? formatDate(values.date) : "",
    //       iWantTo: values.iWantTo.value,
    //       at: values.at.value,
    //       forCount: values.forCount ? values.forCount.value : null,
    //       page: page,
    //     };
    //     await axios.post("/api/contactFormClickup", JSON.stringify(sendData));
    //     setSubmitSuccess(true);
    //     toast.success("Thank you! We'll be in touch soon.", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //     });
    //     resetForm();
    //   } catch (error) {
    //     setSubmitSuccess(false);
    //   } finally {
    //     setLoading(false);
    //   }
    // },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSubmitSuccess(false);

      // ✅ GET UTM DATA FROM SESSION STORAGE
      let utmData = null;

      if (typeof window !== "undefined") {
        try {
          utmData = JSON.parse(
            sessionStorage.getItem("utm_data")
          );
        } catch (error) {
          console.error("UTM parse error:", error);
        }
      }

      try {
        const sendData = {
          name: values.name,
          whatsappNumber: values.whatsappNumber,
          date: values.date ? formatDate(values.date) : "",
          iWantTo: values.iWantTo?.clickupId,
          at: values.at?.clickupId,
          forCount: values.forCount?.clickupId,
          page: page,

          // ✅ UTM TRACKING
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",
        };
        // ✅ CLICKUP
        await axios.post("/api/addToClickupParties", JSON.stringify(sendData));

        // ✅ WATI
        {
          type == "birthday" && (
            await axios.post("/api/party_wati", {
              phone: values.whatsappNumber,
              name: values.name,
            })
          )
        }

        // ✅ GTM / GA4 EVENT TRACKING
        if (typeof window != "undefined") {
          window.dataLayer = window.dataLayer || [];

          window.dataLayer.push({
            event: "lead_generated",
            form_name: "Get In Touch Form",
            page: page,
            name: values.name,
            phone: values.whatsappNumber,
            utm_source: utmData?.source || "",
            utm_medium: utmData?.medium || "",
            utm_campaign: utmData?.campaign || "",
          });
        }

        setSubmitSuccess(true);

        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        resetForm();

      } catch (error) {
        console.error(error);
        setSubmitSuccess(false);
      } finally {
        setLoading(false);
      }
    },
  });





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


  const handleDateSelect = (day) => {
    const dateObj = new Date(year, month, day);
    setSelectedDate(dateObj);
    formik.setFieldValue("date", dateObj);
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };




  return (
    <section className={`section-padding pb-0 ${img ? "pb-0" : ""} ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2 className="sec-head sm-head medium">
                Get in <span>touch now.</span>
              </h2>
            </div>
          </div>
          <div className="col-12">
            <div className="bday-form-card party">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="form-field ">
                  <div className="row align-items-end row-gap-25">
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={
                              "form-control" +
                              (formik.touched.name && formik.errors.name
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </div>
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Phone Number"
                            name="whatsappNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.whatsappNumber}
                            className={
                              "form-control" +
                              (formik.touched.whatsappNumber && formik.errors.whatsappNumber
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </div>
                        {formik.touched.whatsappNumber && formik.errors.whatsappNumber && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.whatsappNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-lg-9 col-12">
                      <label htmlFor="date" className="form-label">
                        Select a date
                      </label>
                      <DatePicker
                        id="date"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        minDate={new Date()}
                        maxDate={selectedEndDate || null}
                        placeholderText="Select a date"
                        className={
                          "form-control" +
                          (formik.touched.date && formik.errors.date
                            ? " is-invalid"
                            : "")
                        }
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.date}
                        </div>
                      )}
                    </div> */}
                    {/* ================= CALENDAR ================= */}
                    <div className="col-lg-12 col-12">
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
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="iWantTo" className="form-label">
                          I want to...
                        </label>
                        <div className="input-group sel-group" onClick={(e) => e.stopPropagation()}>
                          <Select
                            data-lenis-prevent
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="iWantTo"
                            styles={customStyles}
                            options={IWantToOptions}
                            value={formik.values.iWantTo}
                            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                            menuPosition="fixed"
                            onChange={(option) =>
                              formik.setFieldValue("iWantTo", option)
                            }
                            onMenuOpen={() => console.log("OPENING")} // debug
                            onMenuClose={() => console.log("CLOSING")}
                            menuShouldBlockScroll={true}
                            menuShouldScrollIntoView={false}
                          />
                        </div>
                        {formik.touched.iWantTo && formik.errors.iWantTo && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.iWantTo}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="at" className="form-label">
                          At
                        </label>
                        <div className="input-group sel-group">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="at"
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                paddingLeft: "35px",
                              }),
                            }}
                            options={AtOptions}
                            value={formik.values.at} // ✅ direct
                            menuPortalTarget={typeof window !== "undefined"
                              ? document.body : null}
                            menuPosition="fixed"
                            onChange={(option) => {
                              formik.setFieldValue("at", option);
                              formik.setFieldTouched("at", true); // ✅ ADD THIS
                            }}
                            menuShouldBlockScroll={true}
                            menuShouldScrollIntoView={false}
                          // onBlur={() => formik.setFieldTouched("at", true)}
                          />
                        </div>
                        {formik.touched.at && formik.errors.at && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.at}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="forCount" className="form-label">
                          For
                        </label>
                        <div className="input-group sel-group">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="forCount"
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                paddingLeft: "35px",
                              }),
                            }}
                            options={ForOptions}
                            value={formik.values.forCount} // ✅ direct
                            menuPortalTarget={typeof window !== "undefined"
                              ? document.body : null}
                            menuPosition="fixed"
                            onChange={(option) => formik.setFieldValue("forCount", option)}
                            onBlur={() => formik.setFieldTouched("forCount", true)}
                            menuShouldBlockScroll={true}
                            menuShouldScrollIntoView={false}
                          />
                        </div>
                        {/* {formik.touched.forCount && formik.errors.forCount && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.forCount}
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className="col-lg-12 col-12">
                      <div className="">
                        <button
                          className="main-btn"
                          type="submit"
                          disabled={loading}
                        >
                          <span className="">
                            {loading ? "Booking..." : "Submit form"}
                          </span>
                        </button>
                        {/* {submitSuccess && (
                          <div className="alert alert-success mt-3">
                            Thank you! We’ll get in touch soon.
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {privacyLine && (
          <p className="privacy-line d-flex align-items-center gap-2 mt-4">
            <Image src={privacyIcon} alt="privacy-icon" />
            <span style={{ color: "#feaa00" }}>
              We value your trust and safeguard your privacy at every step.
            </span>
          </p>
        )}
      </div>

      {noTextBottom && (
        <section className="section-padding pb-0">
          <div className="container">
            <div className="row text-center justify-content-center">
              <div className="col-lg-9 col-12">
                <h3
                  className="sec-head medium mb-4"
                  dangerouslySetInnerHTML={{ __html: data?.heading }}
                />
                <p
                  className="para mb-4"
                  dangerouslySetInnerHTML={{
                    __html: data?.description1 || data?.content,
                  }}
                />
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description2 }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {!noImage ? (
        !img ? (
          home ? (
            <Image
              src={illus}
              alt="illus"
              className="hm-contact-illus"
              style={{ marginBottom: "-1px" }}
            />
          ) : (
            <Image
              src={illus4}
              alt="illus"
              className="hm-contact-illus"
              style={{ marginBottom: "-1px" }}
            />
          )
        ) : (
          <Image
            src={img}
            alt="illus"
            className="hm-contact-illus"
            style={{ marginBottom: "-1px" }}
          />
        )
      ) : null}
    </section>
  );
};

export default PartyGetInTouch;
