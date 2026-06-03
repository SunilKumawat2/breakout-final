"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import selDrop from "@/images/sel-drop.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useGlobalContext } from "@/context/GlobalContext";
import api from "@/helpers/api";
import { toast } from "react-toastify";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";
import QuizResult from "./Quizes/CostQuiz/QuizResult";
import axios from "axios";

const forOptions = [
  { value: "kids", label: "Kids ( 5 - 10 yrs )" },
  { value: "teen", label: "Teen ( 10 - 18 yrs)" },
  { value: "adults", label: "Adults ( 18+ yrs)" },
];

const participantsOptions = [
  { value: "1-25", label: "1 - 25" },
  { value: "26-50", label: "26 - 50" },
  { value: "51-100", label: "51 - 100" },
  { value: "101-200", label: "101 - 200" },
  { value: "200+", label: "200+" },
];

const QuizForm = ({
  home = false,
  img,
  privacyLine = true,
  noTextBottom = true,
  noImage = false,
  textData,
  setIsResult,
  resource,
  blog_id,
  resourceType,
  resourceName
}) => {
  const { finderQuizValues, updateFinderQuizValue, quizresposesubmit } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState(null);
  const [venues_price, setVenuesPrice] = useState(null);
  console.log("quiz_form", venues)
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [blogSlug, setBlogSlug] = useState(null);

  const IGNORE_VALUES = [
    "Budget not a constraint",
    "Open to All Locations",
    "No preference",
    "I am Flexible"
  ];

  const getValidValue = (item) => {
    if (!item || !item.value) return "";

    if (Array.isArray(item.value)) {
      return item.value.filter(v => !IGNORE_VALUES.includes(v));
    }

    if (IGNORE_VALUES.includes(item.value)) return "";

    return item.value;
  };

  const formik = useFormik({
    initialValues: {
      name: finderQuizValues.step5.value?.name || "",
      forWhom: finderQuizValues.step5.value?.forWhom || null,
      phone: finderQuizValues.step5.value?.phone || "",
      participants: finderQuizValues.step5.value?.participants || null,
      expected_date: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      forWhom: Yup.object().nullable().required("Please select an option"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      participants: Yup.object()
        .nullable()
        .required("Please select participants count"),
    }),

    onSubmit: async (values) => {
      try {

        /* ================= GET RAW ANSWERS FIRST ================= */
        const rawAnswers = JSON.parse(
          sessionStorage.getItem("step1_raw") || "{}"
        );

        console.log("RAW ANSWERS 👉", rawAnswers);

        /* ================= FIRST API ================= */
        const bookingData = {
          resource_id: resource,
          quiz_id: sessionStorage.getItem("quiz_id"),

          respondent_name: values.name,
          respondent_email: "",
          respondent_phone: values.phone,

          event_date: values.expected_date
            ? new Date(values.expected_date).toISOString()
            : new Date().toISOString(),

          other_details: {
            event_for: values.forWhom?.value || "",
            participant_count: values.participants?.value || "",
          },

          answers: Object.values(rawAnswers).map((item) => ({
            question_id: item.question_id,

            answer_text:
              item.type == "input"
                ? String(item.value)
                : "",

            option_ids:
              item.type == "input"
                ? []
                : item.option_ids || [],
          })),

        };

        console.log("FINAL PAYLOAD 👉", bookingData);

        await quizresposesubmit(bookingData);

        /* ================= CLICKUP API ================= */
        try {

          console.log("CLICKUP START");

          const clickupRes = await axios.post("/api/addToClickupResource", {
            name: values.name,
            whatsappNumber: values.phone,
            email: "",
            resourceId: resource,
            lookingFor: values.forWhom?.label || "",
            attendees_count: values.participants?.label || "",
            date: values.expected_date || "",
            resourceType: resourceType,
            resourceName: resourceName,
            page: window.location.href, 
            quiz_id: sessionStorage.getItem("quiz_id"),
            blog_id: blog_id || "",
          });

          console.log("CLICKUP SUCCESS", clickupRes.data);

        } catch (clickErr) {
          console.log("ClickUp Error:", clickErr);
        }

        /* ================= WATI API ================= */
        try {

          console.log("WATI START");

          const watiRes = await axios.post("/api/resources_wati", {
            name: values.name,
            phone: values.phone,

            page_type: "resources_page",

            looking_for: values.forWhom?.label || "",
            attendees_count: values.participants?.label || "",

            event_date: values.expected_date || "",

            quiz_id: sessionStorage.getItem("quiz_id"),
            blog_id: blog_id || "",
          });

          console.log("WATI SUCCESS", watiRes.data);

        } catch (watiErr) {
          console.log("WATI Error:", watiErr);
        }

        /* ================= MAILCHIMP API ================= */
        // try {

        //   console.log("MAILCHIMP START");

        //   const mailchimpRes = await axios.post("/api/mailchimp_resource", {
        //     name: values.name,
        //     phone: values.phone,
        //     email: "",

        //     tags: [
        //       "Cost Quiz",
        //       values.forWhom?.label || "",
        //     ],

        //     merge_fields: {
        //       PHONE: values.phone,
        //       FORWHOM: values.forWhom?.label || "",
        //       PARTICIPANTS: values.participants?.label || "",
        //     }
        //   });

        //   console.log("MAILCHIMP SUCCESS", mailchimpRes.data);

        // } catch (mailchimpErr) {
        //   console.log("Mailchimp Error:", mailchimpErr);
        // }

        /* ================= SECOND API (VENUES) ================= */

        const queryParams = {
          page: 1,
          limit: 200,

          price: getValidValue(rawAnswers?.budget),
          capacity: getValidValue(rawAnswers?.capacity),
          area: getValidValue(rawAnswers?.area),
          suitable_time: getValidValue(rawAnswers?.suitable_time),
          experience_type: getValidValue(rawAnswers?.experience_type),

          experience_looking_for: getValidValue(rawAnswers?.experience_looking_for),

          budget_range: getValidValue(rawAnswers?.budget_range),

          allow_for_hours_option: getValidValue(rawAnswers?.allow_for_hours_option),
          blog_id: blog_id
        };

        // 🔥 remove empty values
        const cleanParams = Object.fromEntries(
          Object.entries(queryParams).filter(
            ([_, v]) => v !== undefined && v !== null && v !== ""
          )
        );

        const queryString = new URLSearchParams(cleanParams).toString();

        console.log("VENUES QUERY 👉", queryString);

        const venuesRes = await api.get(`/venues?${queryString}`);

        console.log("VENUES RESPONSE 👉", venuesRes.data);

        setVenues(venuesRes?.data?.data || []);
        setVenuesPrice(venuesRes?.data)
        // ✅ ADD THIS
        if (setIsResult) {
          setIsResult(true);
        }
        /* ================= CLEAR SESSION STORAGE ================= */
        sessionStorage.removeItem("step1_raw");
        toast.success("Form submitted & venues fetched 🚀");

      } catch (error) {
        console.log("Submit Error:", error);
        toast.error("Something went wrong ❌");
      }
    },

    enableReinitialize: true,
  });



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

  useEffect(() => {
    setBlogSlug(sessionStorage.getItem("blog_slug"));
  }, []);

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

    const formatted = formatDate(dateObj);

    formik.setFieldValue("expected_date", formatted);
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };

  const rawAnswers = JSON.parse(
    sessionStorage.getItem("step1_raw") || "{}"
  );

  console.log("Raw Answers:", rawAnswers);

  if (venues) {
    return <QuizResult venues={venues} venues_price={venues_price} />;
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div
          className="spinner-border text-warning"
          role="status"
          aria-label="Loading"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="hm-contact-sec quiz-form-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head medium mt-5">
              Enter Details to <span>Know Budget</span>
            </h2>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-lg-12">
            <div className="hm-con-form-card">
              <form onSubmit={formik.handleSubmit}>
                <div className="row align-items-center justify-content-between mt-4">
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
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
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
                        <div className="select-group" style={{ width: "100%" }}>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="For ?"
                            name="forWhom"
                            value={formik.values.forWhom}
                            onChange={(option) =>
                              formik.setFieldValue("forWhom", option)
                            }
                            onBlur={() =>
                              formik.setFieldTouched("forWhom", true)
                            }
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                padding: "15px 20px",
                              }),
                            }}
                            options={forOptions}
                          />
                          {/* <span className="select-arrow">
                            <Image src={selDrop} alt="arrowdown" />
                          </span> */}
                        </div>
                      </div>
                      {formik.touched.forWhom && formik.errors.forWhom && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.forWhom}
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
                            formik.touched.phone && formik.errors.phone
                              ? "is-invalid"
                              : ""
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
                        <div className="select-group" style={{ width: "100%" }}>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Participants Count"
                            name="participants"
                            value={formik.values.participants}
                            onChange={(option) =>
                              formik.setFieldValue("participants", option)
                            }
                            onBlur={() =>
                              formik.setFieldTouched("participants", true)
                            }
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                padding: "15px 20px",
                              }),
                            }}
                            options={participantsOptions}
                          />
                          {/* <span className="select-arrow">
                            <Image src={selDrop} alt="arrowdown" />
                          </span> */}
                        </div>
                      </div>
                      {formik.touched.participants &&
                        formik.errors.participants && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.participants}
                          </div>
                        )}
                    </div>
                  </div>
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
                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="main-btn">
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizForm;
