import React from "react";
import { motion } from "framer-motion";
import DatePicker from "@/components/DatePicker";
import { useGlobalContext } from "@/context/GlobalContext";

const Step2 = () => {
  const { updateQuoteCalculatorValue, quoteCalculatorValues } =
    useGlobalContext();

  // Get current value for step2 (may be null or a date string)
  const selectedDate = quoteCalculatorValues?.step2?.value
    ? new Date(quoteCalculatorValues.step2.value)
    : null;

  const handleDateChange = (date) => {
    // Save as ISO string for consistency
    updateQuoteCalculatorValue("step2", date ? date.toISOString() : null, null);
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
    <>
      <motion.div
        className="quiz-step"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 className="sec-head medium" variants={itemVariants}>
          <span>Q2:</span> Select your preferred date
        </motion.h2>
        <div className="quiz-options" style={{ maxWidth: 350 }}>
          <motion.div variants={itemVariants}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              minDate={new Date()}
              isClearable
              showPopperArrow={false}
              wrapperClassName="w-100"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Step2;
