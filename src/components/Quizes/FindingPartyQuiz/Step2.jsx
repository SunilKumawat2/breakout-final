import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import qIcon from "@/images/q-icon.svg";
import { useGlobalContext } from "@/context/GlobalContext";

// Options based on the image provided
const options = [
  {
    id: "adventure-entertainment",
    label: "Adventure & Entertainment",
  },
  {
    id: "restaurants-cafes",
    label: "Restaurants/ Cafes",
  },
  {
    id: "nature-relaxation",
    label: "Nature & Relaxation",
  },
  {
    id: "shopping",
    label: "Shopping",
    note: "",
  },
];

const Step2 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step2 (may be null or array)
  const selectedValues = Array.isArray(finderQuizValues?.step2?.value)
    ? finderQuizValues.step2.value
    : [];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    let newValues;
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }
    updateFinderQuizValue("step2", newValues, null);
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
        <span>Q2:</span> What kind of experience are you looking for?
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
                  type="checkbox"
                  name="quiz-option"
                  id={opt.id}
                  value={opt.label}
                  checked={selectedValues.includes(opt.label)}
                  onChange={handleChange}
                />
                <label htmlFor={opt.id}>
                  <Image src={qIcon} alt={opt.id} />
                  <span>
                    {opt.label}
                    {opt.note && (
                      <span
                        style={{
                          fontSize: "0.85em",
                          color: "#888",
                          marginLeft: 4,
                        }}
                      >
                        {opt.note}
                      </span>
                    )}
                  </span>
                </label>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step2;
