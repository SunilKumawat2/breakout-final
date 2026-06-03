"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Extract phrases from the first <span>...</span>
function extractPhrasesFromHeading(template) {
  const match = template?.match(/<span>(.*?)<\/span>/);
  if (match && match[1]) {
    // Split by pipe, trim, filter out empty
    return match[1]
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

// Split heading into before, span, after
function splitHeadingTemplate(template) {
  const match = template?.match(/^(.*)<span>(.*?)<\/span>(.*)$/s);
  if (match) {
    return {
      before: match[1],
      after: match[3],
    };
  }
  return {
    before: template,
    after: "",
  };
}

// React component for animated heading, renders <h3>
function WordByWordAnimation({ headingTemplate,className="" }) {
  const phrasesList = extractPhrasesFromHeading(headingTemplate);
  const animatedPhrases = phrasesList.length > 0 ? phrasesList : [];

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);

  useEffect(() => {
    if (!animatedPhrases.length) return;
    const timeout = setTimeout(() => {
      setCurrentPhraseIdx((idx) => (idx + 1) % animatedPhrases.length);
    }, 1800);
    return () => clearTimeout(timeout);
  }, [currentPhraseIdx, animatedPhrases]);

  const { before, after } = splitHeadingTemplate(headingTemplate || "");

  const phraseKey = animatedPhrases[currentPhraseIdx] || "";

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // If no animated phrases, just render the whole heading as html
  if (!animatedPhrases.length) {
    return (
      <h3
        className={`${className}`}
        dangerouslySetInnerHTML={{ __html: headingTemplate || "" }}
      />
    );
  }

  // Otherwise, render animated <span> in place of <span>
  return (
    <h3
      className={`sec-head ${className}`}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Render before text/HTML */}
      {before && (
        <div
          style={{ display: "inline" }}
          dangerouslySetInnerHTML={{ __html: before }}
        />
      )}
      <span
        style={{ display: "inline-block", minWidth: 60, position: "relative" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phraseKey}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              whiteSpace: "nowrap",
            }}
          >
            {phraseKey}
          </motion.span>
        </AnimatePresence>
        {/* To keep the span's width stable, render invisible phrase */}
        <span style={{ visibility: "hidden", display: "inline-block" }}>
          {animatedPhrases.reduce((a, b) => (b.length > a.length ? b : a), "")}
        </span>
      </span>
      {/* Render after text/HTML */}
      {after && <span dangerouslySetInnerHTML={{ __html: after }} />}
    </h3>
  );
}

export default WordByWordAnimation;
