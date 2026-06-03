"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/helpers/api";

const Step1 = ({ goToResult, content, resource }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  console.log("sjfgjsdgfjsgdfj_resource_Step1", resource)
  const question = questions[currentStep];
  const text = question?.question_text;
  const type = question?.question_type;
  const options = question?.options || [];

  const totalSteps = questions.length;
  const [rangeValue, setRangeValue] = useState(0);
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);



  const sliderStyles = `
  .custom-range-slider {
    --slider-bg: #2D3030;
    --slider-track-bg: #474A4A;
    --slider-thumb-bg: #ffb32c;
    --slider-thumb-border: #ffb32c;
    --slider-thumb-size: 24px;
    --slider-thumb-shadow: 0 2px 8px rgba(0,0,0,0.15);
    --slider-track-height: 8px;
    width: 100%;
    padding: 0;
    margin-bottom: 8px;
  }

  .range-slider {
    background: #2D3030;
    padding: 10px 0;
    border-radius: 10px !important;
  }

  .range-slider__range {
    background: transparent !important;
    height: var(--slider-track-height);
    border-radius: 6px;
    border: 1px solid #ffb32c;
  }

  .range-slider__thumb {
    background: #ffb32c !important;
    border: 2px solid var(--slider-thumb-border);
    box-shadow: var(--slider-thumb-shadow);
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    top: 50%;
    transform: translateY(-50%);
  }

  .range-slider__thumb[data-active="true"] {
    box-shadow: 0 0 0 4px rgba(255,179,44,0.2);
  }
`;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${content}`);
        const quizData = res?.data?.data;
        console.log("fetchQuiz_fetchQuiz", res?.data)
        if (res?.data) {
          sessionStorage.setItem("quiz_id", res?.data?.data?.id)
        }
        setQuestions(quizData?.questions || []);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (content) {
      fetchQuiz();
    }
  }, [content]);

  /* ---------------- RESET RANGE WHEN QUESTION CHANGES ---------------- */

  useEffect(() => {
    if (range) {
      setRangeValue(range.min);
    }
  }, [question]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const refreshed = sessionStorage.getItem("page_refreshed");

    if (refreshed === null) {
      sessionStorage.setItem("page_refreshed", "1");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("step1_raw");

    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, []);

  const getRangeConfig = (question) => {
    if (!question) return null;

    if (question.question_type === "input") {
      return {
        min: 1,
        max: 101, // ✅ change from 1000 → 100
        step: 1,
        prefix: "",
        suffix: "people",
      };
    }

    return null;
  };
  const range = getRangeConfig(question);

  const formatValue = (val, max) => {
    if (val === max) return "100+"; // 101 → 100+
    return val;
  };

  /* ---------------- NEXT / PREV ---------------- */

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      goToResult(); // last step
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAnswer = (value, optionId = null) => {
    const key = question?.match_to_venue_column || question?.id;
  
    // ✅ convert value for input type
    let finalValue = value;
  
    if (question?.question_type === "input") {
      const range = getRangeConfig(question);
  
      if (value === range?.max) {
        finalValue = "100+"; // 👈 IMPORTANT FIX
      }
    }
  
    const updatedAnswers = {
      ...answers,
      [key]: {
        question_id: question.id,
        value: finalValue, // ✅ use converted value
        option_ids: optionId
          ? Array.isArray(optionId)
            ? optionId
            : [optionId]
          : [],
        type: question.question_type,
      },
    };
  
    console.log("👉 Final Value (Saved):", finalValue);
  
    setAnswers(updatedAnswers);
  
    sessionStorage.setItem(
      "step1_raw",
      JSON.stringify(updatedAnswers)
    );
    console.log("Selected Values:", updatedAnswers);
console.log("Selected Values_123:", JSON.parse(sessionStorage.getItem("step1_raw")));
  };

  /* ---------------- RADIO ---------------- */

  const handleRadioChange = (e) => {
    updateFinderQuizValue(`step${question?.id}`, e.target.value, null);
  };

  /* ---------------- CHECKBOX ---------------- */



  /* ---------------- DATE ---------------- */

  const handleDateChange = (e) => {
    updateFinderQuizValue(`step${question?.id}`, e.target.value, null);
  };

  /* ---------------- RANGE ---------------- */

  const handleSliderInput = (value) => {
    const val = value[1];
    setRangeValue(val);
    handleAnswer(val); // 🔥 important
  };


  const stepValue = 1;
  const labels = [];


  /* ---------------- ANIMATION ---------------- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };


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

    updateFinderQuizValue(`step${question?.id}`, formatted, null);
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };


  return (
    <motion.div
      className="quiz-step"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* QUESTION */}
      {
        question?.id && (
          <motion.h2 className="sec-head medium" variants={itemVariants}>
            <span>Q{currentStep + 1}:</span> {text}
          </motion.h2>
        )
      }

      <div className="quiz-options">
        <motion.div className="row row-gap-25" variants={containerVariants}>
          {/* CHECKBOX */}
          {type == "checkbox" &&
            options.map((opt) => {
              const key = question?.match_to_venue_column || question?.id;
              const selected = answers[key]?.value || [];

              return (
                <motion.div
                  className="col-lg-6 col-12"
                  variants={itemVariants}
                  key={opt.id}
                >
                  <div className="quiz-option">
                    <input
                    className="form-check-input"
                      type="checkbox"
                      name={`q-${question.id}`}
                      id={`opt-${opt.id}`}
                      value={opt.value}
                      checked={selected.includes(opt.value)}
                      onChange={(e) => {
                        const key = question?.match_to_venue_column || question?.id; // ✅ FIX

                        const value = e.target.value;
                        const id = opt.id;

                        const selected = answers[key]?.value || [];
                        const selectedIds = answers[key]?.option_ids || [];

                        let updatedValues, updatedIds;

                        if (selected.includes(value)) {
                          updatedValues = selected.filter((v) => v !== value);
                          updatedIds = selectedIds.filter((i) => i !== id);
                        } else {
                          updatedValues = [...selected, value];
                          updatedIds = [...selectedIds, id];
                        }

                        handleAnswer(updatedValues, updatedIds);
                      }}
                    />

                    <label htmlFor={`opt-${opt.id}`}>
                      <span>{opt.option_text}</span>
                    </label>
                  </div>
                </motion.div>
              );
            })}

          {/* RADIO */}
          {type == "radio" &&
            options.map((opt) => {
              const key = question?.match_to_venue_column || question?.id;
              const selectedValue = answers[key]?.value || "";

              return (
                <motion.div
                  className="col-lg-6 col-12"
                  variants={itemVariants}
                  key={opt.id}
                >
                  <div className="quiz-option">
                    <input
                     className="form-check-input"
                      type="radio"
                      name={`q-${question.id}`}
                      id={`opt-${opt.id}`}
                      value={opt.value}
                      checked={selectedValue === opt.value}
                      onChange={() => handleAnswer(opt.value, opt.id)}
                    />
                    <label htmlFor={`opt-${opt.id}`}>
                      <span>
                        {opt.option_text}
                        {opt.note && (
                          <span
                            style={{
                              fontSize: "0.85em",
                              color: "#888",
                              marginLeft: 8,
                            }}
                          >
                            ({opt.note})
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                </motion.div>
              );
            })}

          {/* INPUT (Number / Range style) */}
          {type == "input" && (
            <div className="quiz-option">
              <>
                <style>{sliderStyles}</style>
                <motion.div
                  className="range-selector-wrapper custom-range-slider col-lg-12"
                  variants={itemVariants}
                >
                  <div style={{ width: "100%", margin: "20px 0" }}>
                    <RangeSlider
                      className="single-thumb"
                      value={[range.min, rangeValue]}
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      onInput={handleSliderInput}
                    />
                  </div>
                  <div
                    className="range-values"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    {labels.map((label) => {
                      const isActive = rangeValue === label;

                      return (
                        <span
                          key={label}
                          style={{
                            fontWeight: isActive ? "bold" : "normal",
                            color: isActive ? "#000" : "#888",
                          }}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>

                  {/* CURRENT VALUE */}

                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      marginTop: "10px",
                      display: "block",
                    }}
                  >
                     {range?.prefix} {formatValue(rangeValue, range.max)} {range?.suffix}
                  </span>
                </motion.div>
              </>
            </div>
          )}
        </motion.div>
      </div>

      {/* NAVIGATION */}
      {
        question && (
          <div className="quiz-navigation" style={{ marginTop: "30px" }}>
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="main-btn dark-btn wide-sm"
            >
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="main-btn wide-sm"
            >
              <span>{currentStep === totalSteps - 1 ? "Finish" : "Next"}</span>
            </button>
          </div>
        )
      }
    </motion.div>
  );
};

export default Step1;