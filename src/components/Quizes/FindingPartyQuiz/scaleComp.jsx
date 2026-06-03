"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

// Custom styles for the slider to match the provided image
const sliderStyles = `
  .custom-range-slider {
    --slider-bg: #2D3030;
    --slider-track-bg: #474A4A;
    --slider-thumb-bg: #ffb32c;
    --slider-thumb-border: #ffb32c;
    --slider-thumb-size: 24px;
    --slider-thumb-shadow: 0 2px 8px rgba(0,0,0,0.15);
    --slider-track-height: 8px;
    --slider-tick-color: #aaa;
    --slider-label-color: #fff;
    width: 100%;
    padding: 0 0px;
    margin-bottom: 8px;
  }
    
    .range-slider > div:nth-child(2) {
    transform: translateX(-100%) translateY(-50%);
    }
  .range-slider, .range-slider__range{
    padding: 10px 0px;
    border-radius: 10px !important;
  }
    .range-slider{
    background: #2D3030;
    }
  .custom-range-slider .range-slider__range {
    background: var(--slider-track-bg);
    height: var(--slider-track-height);
    border-radius: 6px;
    border: 1px solid #ffb32c;
  }
  .custom-range-slider .range-slider__thumb {
    background: var(--slider-thumb-bg);
    border: 2px solid var(--slider-thumb-border);
    box-shadow: var(--slider-thumb-shadow);
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
  .custom-range-slider .range-slider__thumb[data-active="true"] {
    box-shadow: 0 0 0 4px rgba(255,179,44,0.2);
  }
  .custom-range-slider .range-slider__range {
    background: var(--slider-track-bg);
  }
  .custom-range-slider .range-slider__track {
    background: var(--slider-bg);
    height: var(--slider-track-height);
    border-radius: 6px;
  }
  .custom-range-slider .range-slider__range {
    background: var(--slider-track-bg);
  }
  .custom-range-slider .range-slider__thumb {
    z-index: 2;
  }
  .custom-range-slider .range-slider__range {
    z-index: 1;
  }
  .custom-range-slider .range-slider__track {
    z-index: 0;
  }
  .custom-range-slider .range-slider__range {
    background: var(--slider-track-bg);
  }
  .custom-range-slider .range-slider__thumb {
    transition: box-shadow 0.2s;
  }
  .custom-range-slider .range-slider__range {
    background: var(--slider-track-bg);
  }
  .custom-range-slider .range-slider__track {
    background: var(--slider-bg);
  }
  .custom-range-slider .range-slider__thumb {
    background: var(--slider-thumb-bg);
    border: 2px solid var(--slider-thumb-border);
  }
  .custom-range-slider .range-slider__thumb:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255,179,44,0.2);
  }
    
`;

const Step3 = () => {
  // Range: 1 to 10, default [2, 4]
  const [value, setValue] = useState([2, 4]);

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
      <style>{sliderStyles}</style>
      <motion.div
        className="quiz-step"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 className="sec-head medium" variants={itemVariants}>
          <span>#3</span> What’s your budget for this event?
        </motion.h2>
        <motion.div className="quiz-options" variants={containerVariants}>
          <motion.div
            className="range-selector-wrapper custom-range-slider"
            variants={itemVariants}
          >
            <div style={{ width: "100%", margin: "20px 0" }}>
              <RangeSlider
                id="quiz-range"
                min={0}
                max={80}
                step={5}
                value={value}
                onInput={setValue}
                thumbsDisabled={[false, false]}
                rangeSlideDisabled={true}
                className="quiz-range"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div
              className="range-values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {[0, 20, 40, 60, 80].map((label, idx, arr) => {
                // Highlight if any part of the range covers this label
                // (i.e., label is within [value[0], value[1]])
                const isActive = value[0] <= label && label <= value[1];
                return (
                  <span key={label} className={isActive ? "active" : ""}>
                    {label}
                  </span>
                );
              })}
            </div>
            <span>
              {value[0]} - {value[1]}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Step3;
