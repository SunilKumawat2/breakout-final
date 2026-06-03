"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import DatePicker from "./DatePicker";
import privacyIcon from "@/images/privacy-icon.svg";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";

const LOCATION_OPTIONS = [
  { value: "Koramangala", label: "Koramangala" },
  { value: "whitefield", label: "Whitefield" },
  { value: "JP Nagar", label: "JP Nagar" },
];

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^[0-9]{10,13}$/.test(values.phone)) {
    errors.phone = "Phone number should be 10-13 digits";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.location) {
    errors.location = "Required";
  }
  return errors;
}

const BirthdayGetInTouch = ({
  img,
  className = "",
  privacyLine = false,
  noTextBottom = false,
  textData,
  atOptions = LOCATION_OPTIONS,
  page_type
}) => {
  const [submitStatus, setSubmitStatus] = useState(null);
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

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     phone: "",
  //     email: "",
  //     applyX: false,
  //     date: null,
  //     location: null,
  //   },
  //   validate,
  //   onSubmit: async (values, { resetForm }) => {
  //     setSubmitStatus(null);
  //     const sendData = {
  //       ...values,
  //       location: values.location?.value ?? "",
  //       // date: values.date ? values.date.toISOString() : null,
  //       date: values.date ? formatDate(values.date) : "",
  //       page: page,
  //     };
  //     try {
  //       await axios.post("/api/contactFormClickup", JSON.stringify(sendData));
  //       setSubmitStatus("success");
  //       toast.success("Thank you! We'll be in touch soon.", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //       resetForm();
  //     } catch (err) {
  //       setSubmitStatus("error");
  //       toast.error("Something went wrong. Please try again.", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   },
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     phone: "",
  //     email: "",
  //     applyX: false,
  //     date: null,
  //     location: null,
  //   },
  //   validate,

  //   onSubmit: async (values, { resetForm }) => {
  //     setSubmitStatus(null);

  //     const sendData = {
  //       ...values,
  //       location: values.location?.value ?? "",
  //       date: values.date ? formatDate(values.date) : "",
  //       page: page,
  //     };

  //     try {
  //       await axios.post("/api/contactFormClickup", JSON.stringify(sendData));

  //       // ✅ 🔥 GTM EVENT (ADD THIS)
  //       window.dataLayer = window.dataLayer || [];
  //       window.dataLayer.push({
  //         event: "form_submit",
  //         form_name: "corporate_contact_form", // 👈 unique name
  //         page: page,
  //         location: values.location?.value ?? "",
  //         applyX: values.applyX,
  //         has_date: !!values.date,
  //       });

  //       setSubmitStatus("success");

  //       toast.success("Thank you! We'll be in touch soon.", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //       });

  //       resetForm();

  //     } catch (err) {
  //       setSubmitStatus("error");

  //       toast.error("Something went wrong. Please try again.", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //       });
  //     }
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      applyX: false,
      date: null,
      location: null,
    },

    validate,

    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus(null);

      // ========================= GET UTM DATA =========================
      const utmData =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("utm_data") || "{}")
          : {};

      const sendData = {
        name: values.name,
        whatsappNumber: values.phone,
        email: values.email,
        location: values.location?.value ?? "",
        date: values.date ? formatDate(values.date) : "",
        applyX: values.applyX,
        page: page,

        // ========================= UTM DATA =========================
        utm_source: utmData?.source || "",
        utm_medium: utmData?.medium || "",
        utm_campaign: utmData?.campaign || "",
        utm_term: utmData?.term || "",
        utm_content: utmData?.content || "",
      };

      try {

        // ========================= CLICKUP API =========================
        await axios.post("/api/addToClickupCorporate", JSON.stringify(sendData));

        // ========================= WATI API  =========================
        {
          page_type == "corporate" && (
            await axios.post("/api/wati", {
              phone: values.phone,
              name: values.name,
              email: values.email,
              location: values.location?.value ?? "",
              date: values.date ? formatDate(values.date) : "",
              applyX: values.applyX
                ? "Apply for Breakout X"
                : "",

              // ========================= UTM DATA =========================
              utm_source: utmData?.source || "",
              utm_medium: utmData?.medium || "",
              utm_campaign: utmData?.campaign || "",
            })
          )
        }


        // ========================= MAILCHIMP API =========================
        await axios.post("/api/mailchimp", {
          name: values.name,
          phone: values.phone,
          email: values.email,
          location: values.location?.value ?? "",
          tag: "corporate", // dynamic tag


          // ========================= UTM DATA =========================
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",
        });


        // =========================  GTM EVENT  =========================
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: "form_submit",
          form_name: "birthday_contact_form",
          page: page,
          location: values.location?.value ?? "",
          applyX: values.applyX,
          has_date: !!values.date,

          // ========================= UTM DATA =========================
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",

          // ========================= WEB VITAL STYLE TRACKING =========================
          form_load_time: performance.now(),
        });

        // ========================= META PIXEL EVENT =========================
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Birthday Contact Form",
            location: values.location?.value ?? "",
            utm_source: utmData?.source || "",
            utm_campaign: utmData?.campaign || "",
          });
        }

        setSubmitStatus("success");

        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
        });

        resetForm();

      } catch (err) {

        console.log("ERROR:", err);

        setSubmitStatus("error");

        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
        });
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
    <section className={`section-padding ${img ? "pb-0" : ""} ${className}`} id="book-now">
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
            <div className="bday-form-card">
              <form
                className="form-field"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="row align-items-end">
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          name="phone"
                          placeholder="Phone Number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            "form-control" +
                            (formik.touched.phone && formik.errors.phone
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Add your E-mail ID"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            "form-control" +
                            (formik.touched.email && formik.errors.email
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="cus-check">
                          <input
                            id="check"
                            type="checkbox"
                            name="applyX"
                            checked={formik.values.applyX}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="check" className="form-label">
                            <span>Apply for Breakout X</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-8 col-12">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">
                        Select a date
                      </label>
                      <DatePicker
                        id="date"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        minDate={new Date()}
                        maxDate={formik.values.date || null}
                        placeholderText="Select a date"
                        className={
                          "form-control" +
                          (formik.touched.date && formik.errors.date
                            ? " is-invalid"
                            : "")
                        }
                        onBlur={() => formik.setFieldTouched("date", true)}
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div> */}
                  {/* ================= CALENDAR ================= */}
                  <div className="col-lg-8 col-12">
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
                      <label htmlFor="location" className="form-label">
                        At
                      </label>
                      <div className="input-group sel-group">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Select an option"
                          name="location"
                          inputId="location"
                          styles={{
                            ...customStyles,
                            control: (base, state) => ({
                              ...customStyles.control(base, state),
                              paddingLeft: "35px",
                            }),
                          }}
                          options={atOptions}
                          value={formik.values.location}
                          onChange={(option) =>
                            formik.setFieldValue("location", option)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("location", true)
                          }
                        />
                      </div>
                      {formik.touched.location && formik.errors.location && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-12">
                    <div className="mt-4">
                      <button
                        className="main-btn"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <span className="text-white">
                          {formik.isSubmitting
                            ? "Booking…"
                            : submitStatus === "success"
                              ? "Submitted!"
                              : submitStatus === "error"
                                ? "Try Again"
                                : "Submit Form"}
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* {submitStatus === "success" && (
                    <div className="col-lg-12 text-center mt-3">
                      <span className="text-success">
                        Thank you! We'll be in touch soon.
                      </span>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="col-lg-12 text-center mt-3">
                      <span className="text-danger">
                        Something went wrong. Please try again.
                      </span>
                    </div>
                  )} */}
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
        {noTextBottom && textData && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row text-center justify-content-center">
                <div className="col-lg-9 col-12">
                  <h3
                    className="sec-head medium mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.heading }}
                  ></h3>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.content }}
                  ></p>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.description1 }}
                  ></p>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.description2 }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {img && <Image src={img} alt="illus" className="illus-image" />}
    </section>
  );
};

export default BirthdayGetInTouch;
