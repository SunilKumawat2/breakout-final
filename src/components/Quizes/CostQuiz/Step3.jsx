import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";

// Budget options
const options = [
  {
    id: "budget-friendly",
    label: "Budget-friendly",
    note: "₹0 - ₹699 per person",
    value: "budget-friendly",
  },
  {
    id: "mid-range",
    label: "Mid-range",
    note: "₹700 - ₹1999 per person",
    value: "mid-range",
  },
  {
    id: "premium",
    label: "Premium",
    note: "₹2000+ per person",
    value: "premium",
  },
  {
    id: "flexible",
    label: "Budget not a constraint",
    note: "I am Flexible",
    value: "budget-not-constraint",
  },
];

const Step3 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step3 (may be null)
  const selectedValue = finderQuizValues?.step3?.value || null;
  const budgetNotConstraint =
    finderQuizValues?.step3?.budgetNotConstraint || false;

  // Handle radio change
  const handleChange = (e) => {
    updateFinderQuizValue("step3", e.target.value, {
      budgetNotConstraint: false,
    });
  };

  // Handle checkbox change
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      updateFinderQuizValue("step3", null, { budgetNotConstraint: true });
    } else {
      updateFinderQuizValue("step3", null, { budgetNotConstraint: false });
    }
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
        <span>Q3:</span> What is your budget range for this experience?
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
                  name="quiz-option-step3"
                  id={opt.id}
                  value={opt.value}
                  checked={selectedValue === opt.value && !budgetNotConstraint}
                  onChange={handleChange}
                  disabled={budgetNotConstraint}
                />
                <label htmlFor={opt.id}>
                  <span>
                    {opt.label}
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
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step3;
