"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import qIcon from "@/images/q-icon.svg";
import { useGlobalContext } from "@/context/GlobalContext";

const options = [
  { id: "quiz-option-1", label: "1 - 25", value: "1-25" },
  { id: "quiz-option-2", label: "26 - 50", value: "26-50" },
  { id: "quiz-option-3", label: "51 - 100", value: "51-100" },
  { id: "quiz-option-4", label: "100+", value: "100+" },
];

const Step1 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step1 (may be null)
  const selectedValue = finderQuizValues?.step1?.value || null;

  const handleChange = (e) => {
    updateFinderQuizValue("step1", e.target.value, null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="quiz-step"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="sec-head medium" variants={itemVariants}>
        <span>Q1:</span> How many people are joining you?
      </motion.h2>
      <div className="quiz-options">
        <motion.div className="row row-gap-25" variants={containerVariants}>
          {options.map((opt) => (
            <motion.div
              className="col-lg-6 col-12"
              variants={itemVariants}
              key={opt.id}
            >
              <div className="quiz-option">
                <input
                  type="radio"
                  name="quiz-option"
                  id={opt.id}
                  value={opt.value}
                  checked={selectedValue === opt.value}
                  onChange={handleChange}
                />
                <label htmlFor={opt.id}>
                  <span>{opt.label}</span>
                </label>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1;
