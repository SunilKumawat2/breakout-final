import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import qIcon from "@/images/q-icon.svg";
import { useGlobalContext } from "@/context/GlobalContext";

// Options based on the image provided
const options = [
  {
    id: "indoor",
    label: "Indoor",
  },
  {
    id: "outdoor",
    label: "Outdoor",
  },
  {
    id: "no-preference",
    label: "No Preference",
  },
];

const Step3 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step3 (may be null)
  const selectedValue = finderQuizValues?.step4?.value || null;

  const handleChange = (e) => {
    updateFinderQuizValue("step4", e.target.value, null);
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
        <span>Q3:</span> What time of day do you prefer for your outing?
      </motion.h2>
      <div className="quiz-options">
        <motion.div className="row row-gap-25" variants={containerVariants}>
          {options.map((opt) => (
            <motion.div
              className="col-lg-4 col-12"
              variants={itemVariants}
              key={opt.id}
            >
              <div className="quiz-option">
                <input
                  type="radio"
                  name="quiz-option-step4"
                  id={opt.id}
                  value={opt.label}
                  checked={selectedValue === opt.label}
                  onChange={handleChange}
                />
                <label htmlFor={opt.id}>
                  {/* <Image src={qIcon} alt={opt.id} /> */}
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

export default Step3;
