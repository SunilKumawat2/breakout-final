"use client";
import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import partyQuizIllus from "@/images/party-quiz-illus.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const QuoteCalculator = ({ category }) => {
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const resourceName = searchParams.get("resourceName");
  const resourceType = searchParams.get("resourceType");
  const [participants, setParticipants] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log("searchParams_content", category);
  const [currentStep, setCurrentStep] = useState(1);
  console.log("sjfgjsdfsdfsfsfjsdgf", currentStep)
  const [isResult, setIsResult] = useState(false);
  const totalSteps = category === "couple" ? 2 : 3;
  const [estimatedQuote, setEstimatedQuote] = useState(0);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    setCurrentStep(1);
  }, []);

  // const renderStep = (step) => {

  //   switch (step) {
  //     case 1:
  //       return (
  //         <Step1
  //           category={category}
  //           goToResult={() => setCurrentStep(2)}
  //         />
  //       );

  //     case 2:
  //       return (
  //         <Step3
  //           setEstimatedQuote={setEstimatedQuote}
  //           category={category}
  //         />
  //       );

  //     default:
  //       return (
  //         <Step1
  //           category={category}
  //           goToResult={() => setCurrentStep(2)}
  //         />
  //       );
  //   }
  // };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            goToResult={() => setCurrentStep(2)}
            content={content}
            resourceName={resourceName}
            resourceType={resourceType}
            setParticipants={setParticipants}
            setSelectedDate={setSelectedDate}
          />
        );

      case 2:
        return <Step3
          setIsResult={setIsResult}
          participants={participants}
          selectedDate={selectedDate}
          resourceName={resourceName}
          resourceType={resourceType}
          setEstimatedQuote={setEstimatedQuote}
          category={category}
          content={content}
          />;

      default:
        return (
          <Step1
            goToResult={() => setCurrentStep(2)}
            content={content}
          />
        );
    }
  };


  const renderHeader = () => {
    if (estimatedQuote > 0) {
      return (
        <h3 className="sec-head medium">
          Your Estimated Quote is <br />
          {/* <span>₹ {estimatedQuote}</span> */}
        </h3>
      );
    }
    if (currentStep === totalSteps) {
      if (!isResult) {
        return (
          <>
            <h3 className="sec-head medium">Curating packages just for you!</h3>
            <p className="sec-head medium-20 mt-3">
              You’re just <span>1 step away</span>
            </p>
          </>
        );
      } else {
        return (
          <h3 className="sec-head medium">
            <span>Get a Quote</span> for your party at Breakout
          </h3>
        );
      }
    } else {
      return (
        <h3 className="sec-head medium">
          <span>Get a Quote</span> for your party at Breakout
        </h3>
      );
    }
  };
  return (
    <div className="black-gr-div">
      <section className="party-finding-quiz sec-padding-top">
        <div className="container">
          <div className="row y">
            <div className="col-12 text-center">{renderHeader()}</div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="quiz-container">
                <div className="quiz-content">{renderStep(currentStep)}</div>
                {/* {currentStep < totalSteps && (
                  <div className="quiz-navigation">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 1}
                      className="main-btn dark-btn wide-sm"
                    >
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentStep === totalSteps}
                      className="main-btn wide-sm"
                    >
                      <span>Next</span>
                    </button>
                  </div>
                )} */}
              </div>
              {/* Datepicker component previously added */}
            </div>
          </div>
        </div>
      </section>
      <Image src={partyQuizIllus} alt="black-gr" className="illus-image" />
    </div>
  );
};

export default QuoteCalculator;
