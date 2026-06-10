// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useGlobalContext } from "@/context/GlobalContext";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import arrowPrev from "@/images/chev-left.svg";
// import arrowNext from "@/images/chev-right.svg";
// import calenderIcon from "@/images/calendar-btn.svg";
// import Image from "next/image";

// const Step1 = ({ category,goToResult }) => {
//   const { updateQuoteCalculatorValue, quoteCalculatorValues,
//      quotecalculatorquiz } =
//     useGlobalContext();
//     const questions = Array.isArray(quotecalculatorquiz?.questions)
//     ? quotecalculatorquiz.questions
//     : [];
//   const [currentStep, setCurrentStep] = useState(0);

//   const question = questions[currentStep];
//   const options = question?.options || [];
//   const type = question?.type;
//   const range = question?.range;

//   const totalSteps = questions.length;

//   const [checkboxValues, setCheckboxValues] = useState([]);
//   const [rangeValue, setRangeValue] = useState(0);

//   const selectedValue =
//   question?.id
//     ? quoteCalculatorValues?.[`step${question.id}`]?.value
//     : null;
//   /* ================= CALENDAR LOGIC ================= */
//   const today = new Date();
//   const [year, setYear] = useState(today.getFullYear());
//   const [month, setMonth] = useState(today.getMonth());
//   const [startIndex, setStartIndex] = useState(0);
//   const [days, setDays] = useState([]);
//   const [showMonthYear, setShowMonthYear] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const sliderStyles = `
//   .custom-range-slider {
//     --slider-bg: #2D3030;
//     --slider-track-bg: #474A4A;
//     --slider-thumb-bg: #ffb32c;
//     --slider-thumb-border: #ffb32c;
//     --slider-thumb-size: 24px;
//     --slider-thumb-shadow: 0 2px 8px rgba(0,0,0,0.15);
//     --slider-track-height: 8px;
//     width: 100%;
//     padding: 0;
//     margin-bottom: 8px;
//   }

//   .range-slider {
//     background: #2D3030;
//     padding: 10px 0;
//     border-radius: 10px !important;
//   }

//   .range-slider__range {
//     background: transparent !important;
//     height: var(--slider-track-height);
//     border-radius: 6px;
//     border: 1px solid #ffb32c;
//   }

//   .range-slider__thumb {
//     background: #ffb32c !important;
//     border: 2px solid var(--slider-thumb-border);
//     box-shadow: var(--slider-thumb-shadow);
//     width: var(--slider-thumb-size);
//     height: var(--slider-thumb-size);
//     top: 50%;
//     transform: translateY(-50%);
//   }

//   .range-slider__thumb[data-active="true"] {
//     box-shadow: 0 0 0 4px rgba(255,179,44,0.2);
//   }
// `;

//   /* ---------------- RESET RANGE WHEN QUESTION CHANGES ---------------- */

//   //   useEffect(() => {
//   //   if (category) {
//   //     fetchcostcalcultorquiz(category);
//   //   }
//   // }, [category]);

//   useEffect(() => {
//     setCheckboxValues([]);
//   }, [question]);

//   useEffect(() => {
//     if (type === "range") {
//       setRangeValue(range?.min || 0);
//     }
//   }, [question]);

//   // useEffect(() => {
//   //   if (typeof window === "undefined") return;

//   //   const refreshed = sessionStorage.getItem("page_refreshed");

//   //   if (refreshed === null) {
//   //     sessionStorage.setItem("page_refreshed", "1");

//   //     setTimeout(() => {
//   //       window.location.reload();
//   //     }, 1000);
//   //   }
//   // }, []);
//   /* ---------------- NEXT / PREV ---------------- */

//   const handleNext = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       // last question finished
//       if (goToResult) {
//         goToResult();
//       }
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   /* ---------------- RADIO ---------------- */

//   const handleRadioChange = (e) => {
//     updateQuoteCalculatorValue(`step${question?.id}`, e.target.value, null);
//   };

//   /* ---------------- CHECKBOX ---------------- */

//   const handleCheckboxChange = (e) => {
//     const value = e.target.value;

//     const updated = checkboxValues.includes(value)
//       ? checkboxValues.filter((v) => v !== value)
//       : [...checkboxValues, value];

//     setCheckboxValues(updated);

//     updateQuoteCalculatorValue(`step${question?.id}`, updated, null);
//   };

//   /* ---------------- DATE ---------------- */

//   const handleDateChange = (e) => {
//     updateQuoteCalculatorValue(`step${question?.id}`, e.target.value, null);
//   };

//   /* ---------------- RANGE ---------------- */

//   const handleSliderInput = (value) => {
//     const val = value[1];
//     setRangeValue(val);

//     updateQuoteCalculatorValue(`step${question?.id}`, val, null);
//   };

//   /* ---------------- FIX STEP IF API STEP IS INVALID ---------------- */

//   const stepValue =
//   range && range.step > range.max - range.min
//     ? Math.ceil((range.max - range.min) / 5)
//     : range?.step || 1;

//   /* ---------------- DYNAMIC LABELS ---------------- */

//   const labels = range
//     ? [
//       range.min,
//       Math.round(range.max * 0.25),
//       Math.round(range.max * 0.5),
//       Math.round(range.max * 0.75),
//       range.max,
//     ]
//     : [];

//   /* ---------------- ANIMATION ---------------- */

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };


//   useEffect(() => {
//     const totalDays = new Date(year, month + 1, 0).getDate();
//     const arr = Array.from({ length: totalDays }, (_, i) => i + 1);
//     setDays(arr);

//     if (
//       year === today.getFullYear() &&
//       month === today.getMonth()
//     ) {
//       setStartIndex(today.getDate() - 1);
//     } else {
//       setStartIndex(0);
//     }
//   }, [year, month]);

//   const daysToShow = isMobile ? 5 : 7;

//   const visibleDays = days.slice(startIndex, startIndex + daysToShow);

//   const nextDays = () => {
//     if (startIndex + daysToShow < days.length) {
//       setStartIndex(startIndex + daysToShow);
//     }
//   };

//   const prevDays = () => {
//     if (startIndex - daysToShow >= 0) {
//       setStartIndex(startIndex - daysToShow);
//     }
//   };

//   const formatDate = (date) => {
//     const y = date.getFullYear();
//     const m = String(date.getMonth() + 1).padStart(2, "0");
//     const d = String(date.getDate()).padStart(2, "0");
//     return `${y}-${m}-${d}`;
//   };


//   const handleDateSelect = (day) => {
//     const dateObj = new Date(year, month, day);

//     setSelectedDate(dateObj);

//     const formatted = formatDate(dateObj);

//     updateQuoteCalculatorValue(`step${question?.id}`, formatted, null);
//   };

//   const isPastDate = (day) => {
//     const checkDate = new Date(year, month, day);
//     checkDate.setHours(0, 0, 0, 0);

//     const todayDate = new Date();
//     todayDate.setHours(0, 0, 0, 0);

//     return checkDate < todayDate;
//   };

//   // if (!questions.length) {
//   //   return <div>Loading...</div>;
//   // }


//   return (
//     <motion.div
//       className="quiz-step"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {
//         question?.id && (
//           <motion.h2 className="sec-head medium" variants={itemVariants}>
//             <span>Q{question?.id}:</span> {question?.text}
//           </motion.h2>
//         )
//       }

//       <div className="quiz-options">
//         <motion.div className="row row-gap-25" variants={containerVariants}>


//           {type === "radio" &&
//             options.map((opt) => (
//               <motion.div
//                 className="col-lg-6 col-12"
//                 variants={itemVariants}
//                 key={opt.id}
//               >
//                 <div className="quiz-option">
//                   <input
//                     type="radio"
//                     className="form-check-input"
//                     name={`quiz-${question?.id}`}
//                     id={opt.id}
//                     value={opt.value}
//                     checked={selectedValue === opt.value}
//                     onChange={handleRadioChange}
//                   />
//                   <label htmlFor={opt.id}>
//                     <span>{opt.label || opt.value}</span>
//                   </label>
//                 </div>
//               </motion.div>
//             ))}


//           {type === "checkbox" &&
//             options.map((opt) => (
//               <motion.div
//                 className="col-lg-6 col-12"
//                 variants={itemVariants}
//                 key={opt.id}
//               >
//                 <div className="quiz-option">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id={opt.id}
//                     value={opt.value}
//                     checked={checkboxValues.includes(opt.value)}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor={opt.id}>
//                     <span>{opt.label || opt.value}</span>
//                   </label>
//                 </div>
//               </motion.div>
//             ))}


//           {type === "date" && (
//             <motion.div variants={itemVariants} className="col-lg-6 col-12">

//               <div className="col-lg-12 col-12">
//                 <div className="calendar-wrapper">
//                   <div className="calendar-header">
//                     <div
//                       className="month-year-select mb-3"
//                     >
//                       <span>
//                         {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
//                       </span>
//                       <span>
//                         {isMobile && (
//                           <div
//                             className="calender-btn"
//                             onClick={() => setShowMonthYear(!showMonthYear)}
//                           >
//                             <Image src={calenderIcon} alt="Calender Icon" />
//                           </div>
//                         )

//                         }
//                       </span>
//                     </div>
//                   </div>

//                   <div className="calendar-days-outer">
//                     <div className="calendar-days">
//                       <div className="arrow" onClick={prevDays} disabled={startIndex === 0}>
//                         <Image src={arrowPrev} alt="Previous" />
//                       </div>

//                       {visibleDays.map((day) => {
//                         const past = isPastDate(day);

//                         return (
//                           <div
//                             key={day}
//                             onClick={() => {
//                               if (!past) handleDateSelect(day);
//                             }}
//                             className={`day ${past ? "disabled" : ""} ${selectedDate &&
//                               selectedDate.getDate() === day &&
//                               selectedDate.getMonth() === month &&
//                               selectedDate.getFullYear() === year
//                               ? "active"
//                               : ""
//                               }`}
//                           >
//                             {day}
//                           </div>
//                         );
//                       })}


//                       <div
//                         className={`arrow ${startIndex + 7 >= days.length ? "disabled" : ""} `}
//                         onClick={nextDays}
//                         disabled={startIndex + 7 >= days.length}
//                       >
//                         <Image src={arrowNext} alt="Next" />
//                       </div>
//                       {!isMobile && (
//                         <div
//                           className="calender-btn"
//                           onClick={() => setShowMonthYear(!showMonthYear)}
//                         >
//                           <Image src={calenderIcon} alt="Calender Icon" />
//                         </div>
//                       )
//                       }
//                     </div>

//                     {showMonthYear && (
//                       <div className="month-year-dropdown">
//                         <div className="months">
//                           {Array.from({ length: 12 }).map((_, i) => (
//                             <div
//                               key={i}
//                               className={`option ${month === i ? "active" : ""}`}
//                               onClick={() => {
//                                 setMonth(i);
//                                 setShowMonthYear(false);
//                               }}
//                             >
//                               {new Date(0, i).toLocaleString("default", { month: "long" })}
//                             </div>
//                           ))}
//                         </div>

//                         <div className="years">
//                           {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].map((y) => (
//                             <div
//                               key={y}
//                               className={`option ${year === y ? "active" : ""}`}
//                               onClick={() => {
//                                 setYear(y);
//                                 setShowMonthYear(false);
//                               }}
//                             >
//                               {y}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}


//           {type === "range" && (
//             <>
//               <style>{sliderStyles}</style>
//               <motion.div
//                 className="range-selector-wrapper custom-range-slider col-lg-12"
//                 variants={itemVariants}
//               >
//                 <div style={{ width: "100%", margin: "20px 0" }}>
//                   <RangeSlider
//                     className="single-thumb"
//                     min={range?.min || 0}
//                     max={range?.max || 100}
//                     step={stepValue}
//                     value={[range?.min || 0, rangeValue]}
//                     thumbsDisabled={[true, false]}
//                     rangeSlideDisabled={true}
//                     onInput={handleSliderInput}
//                   />
//                 </div>


//                 <div
//                   className="range-values"
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: "10px",
//                   }}
//                 >
//                   {labels.map((label) => {
//                     const isActive = rangeValue === label;

//                     return (
//                       <span
//                         key={label}
//                         style={{
//                           fontWeight: isActive ? "bold" : "normal",
//                           color: isActive ? "#000" : "#888",
//                         }}
//                       >
//                         {label}
//                       </span>
//                     );
//                   })}
//                 </div>

//                 <span
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "1.2em",
//                     marginTop: "10px",
//                     display: "block",
//                   }}
//                 >
//                   {range?.prefix} {rangeValue} {range?.suffix}
//                 </span>
//               </motion.div>
//             </>
//           )}

//           {type === "select" &&
//             options.map((opt) => (
//               <motion.div
//                 className="col-lg-6 col-12"
//                 variants={itemVariants}
//                 key={opt.id}
//               >
//                 <div className="quiz-option">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id={opt.id}
//                     value={opt.value}
//                     checked={checkboxValues.includes(opt.value)}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor={opt.id}>
//                     <span>{opt.label || opt.value}</span>
//                   </label>
//                 </div>
//               </motion.div>
//             ))}
//         </motion.div>
//       </div>

//       {/* NAVIGATION */}
//       {
//         question && (
//           <div className="quiz-navigation" style={{ marginTop: "30px" }}>
//             <button
//               onClick={handlePrev}
//               disabled={currentStep === 0}
//               className="main-btn dark-btn wide-sm"
//             >
//               <span>Previous</span>
//             </button>

//             <button
//               onClick={handleNext}
//               className="main-btn wide-sm"
//             >
//               <span>{currentStep === totalSteps - 1 ? "Finish" : "Next"}</span>
//             </button>
//           </div>
//         )
//       }
//     </motion.div>
//   );
// };

// export default Step1;

// "use client";
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import qIcon from "@/images/q-icon.svg";
// import { useGlobalContext } from "@/context/GlobalContext";

// const options = [
//   { id: "quiz-option-1", label: "1 - 25", value: "1-25" },
//   { id: "quiz-option-2", label: "26 - 50", value: "26-50" },
//   { id: "quiz-option-3", label: "51 - 100", value: "51-100" },
//   { id: "quiz-option-4", label: "100+", value: "100+" },
// ];

// const Step1 = () => {
//   const { updateQuoteCalculatorValue, quoteCalculatorValues, quotecalculatorquiz} = useGlobalContext();

//   // Get current value for step1 (may be null)
//   const selectedValue = quoteCalculatorValues?.step1?.value || null;

//   const handleChange = (e) => {
//     updateQuoteCalculatorValue("step1", e.target.value, null);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="quiz-step"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.h2 className="sec-head medium" variants={itemVariants}>
//         <span>Q{quotecalculatorquiz?.questions[0]?.id}:</span> {quotecalculatorquiz?.questions[0]?.text}
//       </motion.h2>
//       <div className="quiz-options">
//         <motion.div className="row row-gap-25" variants={containerVariants}>
//           {options.map((opt) => (
//             <motion.div
//               className="col-lg-6 col-12"
//               variants={itemVariants}
//               key={opt.id}
//             >
//               <div className="quiz-option">
//                 <input
//                   type="radio"
//                   name="quiz-option"
//                   id={opt.id}
//                   value={opt.value}
//                   checked={selectedValue === opt.value}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor={opt.id}>
//                   <span>{opt.label}</span>
//                 </label>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Step1;


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
import api from "@/helpers/api";

const Step1 = ({ goToResult, setParticipants, selectedDate, setSelectedDate, content,resourceName,resourceType }) => {
  const { updateQuoteCalculatorValue, quoteCalculatorValues, quotecalculatorquiz } =
    useGlobalContext();

  const questions = quotecalculatorquiz?.questions || [];
  const [currentStep, setCurrentStep] = useState(0);
  const finalCategory =
  content && content != "null"
    ? content
    : (typeof window != "undefined"
        ? sessionStorage.getItem("selected_category")
        : "");
  const isCouplePackage = finalCategory?.toLowerCase() == "couple-package";
  const question = questions?.[currentStep] || null; 
  const options = Array.isArray(question?.options) ? question.options : [];
  const range = question?.range || {}; // SAFE FIX

  const totalSteps = 2;
console.log("content_step1",content)
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [rangeValue, setRangeValue] = useState(range?.min ?? 0); // SAFE FIX

 

  const selectedValue =
    quoteCalculatorValues?.[`step${question?.id}`]?.value || null;
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pricingData, setPricingData] = useState(null);
  const [localSelectedDate, setLocalSelectedDate] = useState(null);
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
    if (isCouplePackage) {
      setCurrentStep(1); // skip slider
    }
  }, [isCouplePackage]);

  // useEffect(() => {
  //   const fetchPricingPackages = async () => {
  //     try {
  //       const res = await api.get(`/pricing-packages?category=${content}`);
  //       const quizData = res?.data?.data;


  //       setPricingData(quizData || []);
  //     } catch (error) {
  //       console.error("Error fetching quiz:", error);
  //     }
  //   };

  //   fetchPricingPackages();
  // }, []);
  useEffect(() => {
    const fetchPricingPackages = async () => {
      try {
        const finalCategory =
          content && content !== "null"
            ? content
            : (typeof window !== "undefined"
                ? sessionStorage.getItem("selected_category")
                : "");
  
        const res = await api.get(
          `/pricing-packages?category=${finalCategory}`
        );
  
        const quizData = res?.data?.data;
        setPricingData(quizData || []);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
  
    fetchPricingPackages();
  }, [content]);
  /* ---------------- RESET RANGE WHEN QUESTION CHANGES ---------------- */

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
  /* ---------------- NEXT / PREV ---------------- */

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      goToResult && goToResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* ---------------- RADIO ---------------- */

  const handleRadioChange = (e) => {
    updateQuoteCalculatorValue(`step${question?.id}`, e.target.value, null);
  };

  /* ---------------- CHECKBOX ---------------- */

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    const updated = checkboxValues.includes(value)
      ? checkboxValues.filter((v) => v !== value)
      : [...checkboxValues, value];

    setCheckboxValues(updated);

    updateQuoteCalculatorValue(`step${question?.id}`, updated, null);
  };

  /* ---------------- DATE ---------------- */

  const handleDateChange = (e) => {
    updateQuoteCalculatorValue(`step${question?.id}`, e.target.value, null);
  };

  /* ---------------- RANGE ---------------- */

  const handleSliderInput = (value) => {
    const val = value[1];
    setRangeValue(val);
    setParticipants(val);
  
    // ✅ SAVE TO SESSION
    if (typeof window !== "undefined") {
      const existing =
        JSON.parse(sessionStorage.getItem("step1_data")) || {};
  
      sessionStorage.setItem(
        "step1_data",
        JSON.stringify({
          ...existing,
          participants: val,
        })
      );
    }
  };



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

  const visibleDays = Array.isArray(days)
    ? days.slice(startIndex, startIndex + daysToShow)
    : []; // SAFE FIX

  const nextDays = () => {
    if (startIndex + daysToShow < (days?.length || 0)) { // SAFE FIX
      setStartIndex(startIndex + daysToShow);
    }
  };

  const prevDays = () => {
    if (startIndex - daysToShow >= 0) { // SAFE FIX
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
  
    setLocalSelectedDate(dateObj);
    setSelectedDate(dateObj);
  
    const formatted = formatDate(dateObj);
  
    // ✅ SAVE TO SESSION
    if (typeof window != "undefined") {
      const existing =
        JSON.parse(sessionStorage.getItem("step1_data")) || {};
  
      sessionStorage.setItem(
        "step1_data",
        JSON.stringify({
          ...existing,
          selectedDate: formatted,
        })
      );
    }
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
      {
        currentStep == 0 && !isCouplePackage && (
          <motion.h2 className="sec-head medium" variants={itemVariants}>
            <span>Q1:</span> How many participants will be there?
          </motion.h2>
        )
      }

      {
        currentStep == 1 && (
          <motion.h2 className="sec-head medium" variants={itemVariants}>
            <span>Q1:</span> When is your party?
          </motion.h2>
        )
      }

      <div className="quiz-options">
        {/* STEP 1 → RANGE */}
        {currentStep == 0 && !isCouplePackage && (
          <>
            <style>{sliderStyles}</style>
            <motion.div
              className="range-selector-wrapper custom-range-slider col-lg-12"
              variants={itemVariants}
            >
              <div style={{ width: "100%", margin: "20px 0" }}>
                <RangeSlider
                  className="single-thumb"
                  min={0}                // ✅ fixed
                  // max={50} 
                  max={75}                // ✅ fixed
                  value={[0, rangeValue]} // ✅ important
                  thumbsDisabled={[true, false]}
                  rangeSlideDisabled={true}
                  onInput={handleSliderInput}
                />
              </div>

              {/* ONLY SELECTED VALUE */}
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                  {rangeValue}
                </span>
              </div>
            </motion.div>
          </>
        )}

        {/* STEP 2 → DATE */}
        {currentStep == 1 && (
          <motion.div variants={itemVariants} className="col-lg-6 col-12">
            {/* <input
             type="date"
             className="form-control"
             placeholder={question?.placeholder}
             onChange={handleDateChange}
           /> */}
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
                    <div className="arrow" onClick={prevDays} disabled={startIndex == 0}>
                      {/* ‹ */}
                      <Image src={arrowPrev} alt="Previous" />
                    </div>

                    {visibleDays?.map((day) => { // SAFE FIX{visibleDays.map((day) => {
                      const past = isPastDate(day);

                      return (
                        <div
                          key={day}
                          onClick={() => {
                            if (!past) handleDateSelect(day);
                          }}
                          className={`day ${past ? "disabled" : ""} ${localSelectedDate &&
                              localSelectedDate.getDate() === day &&
                              localSelectedDate.getMonth() === month &&
                              localSelectedDate.getFullYear() === year
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
                      disabled={startIndex + daysToShow >= (days?.length || 0)}
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
          </motion.div>
        )}
        <motion.div className="row row-gap-25" variants={containerVariants}>
          {/* DATE */}

        </motion.div>
      </div>

      {/* NAVIGATION */}

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

    </motion.div>
  );
};

export default Step1;