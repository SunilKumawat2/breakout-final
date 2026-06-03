import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";

// Location options
const options = [
  {
    id: "koramangala-indiranagar",
    label: "Koramangala / Indiranagar",
    value: "Koramangala / Indiranagar",
  },
  {
    id: "jayanagar-jp-nagar",
    label: "Jayanagar / JP Nagar",
    value: "Jayanagar / JP Nagar",
  },
  {
    id: "electronic-city-sarjapur",
    label: "Electronic City / Sarjapur",
    value: "Electronic City / Sarjapur",
  },
  {
    id: "airport-manyata",
    label: "Airport / Manyata Tech Park",
    value: "Airport / Manyata Tech Park",
  },
  {
    id: "whitefield-marathahalli",
    label: "Whitefield / Marathahalli",
    value: "Whitefield / Marathahalli",
  },
  {
    id: "all-locations",
    label: "Open to All Locations",
    value: "all-locations",
  },
];

const Step4 = () => {
  const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

  // Get current value for step4 (may be null or array)
  const selectedValues = finderQuizValues?.step4?.value || [];
  const openToAll = finderQuizValues?.step4?.openToAll || false;

  // Handle checkbox change for multiple locations
  const handleChange = (e) => {
    const { value, checked } = e.target;
    let newValues = Array.isArray(selectedValues) ? [...selectedValues] : [];
    if (checked) {
      if (!newValues.includes(value)) {
        newValues.push(value);
      }
    } else {
      newValues = newValues.filter((v) => v !== value);
    }
    updateFinderQuizValue("step4", newValues, { openToAll });
  };

  // Handle "Open to All Locations" checkbox
  const handleOpenToAll = (e) => {
    const checked = e.target.checked;
    if (checked) {
      // If open to all, clear other selections
      updateFinderQuizValue("step4", [], { openToAll: true });
    } else {
      updateFinderQuizValue("step4", selectedValues, { openToAll: false });
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
        <span>Q4:</span> I am looking to host a party in and around
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
                  name="quiz-location-option"
                  id={opt.id}
                  value={opt.value}
                  checked={
                    Array.isArray(selectedValues) &&
                    selectedValues.includes(opt.value) &&
                    !openToAll
                  }
                  onChange={handleChange}
                  disabled={openToAll}
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

export default Step4;
