"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Image from "next/image";
import Step5 from "./Step5";
import partyQuizIllus from "@/images/party-quiz-illus.png";
import { useSearchParams } from "next/navigation";

const CostCalculator = () => {
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const blog_id = searchParams.get("blog_id")
  const resourceName = searchParams.get("name")
  const resourceType = searchParams.get("type")
  console.log("searchParams_content", content);
  const [currentStep, setCurrentStep] = useState(1);
  console.log("jsdfsdgfdsjjffs", currentStep)
  const [isResult, setIsResult] = useState(false);
  const totalSteps = 5; // Adjust based on your needs

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

  // const renderStep = (step) => {
  //   switch (step) {
  //     case 1:
  //       return <Step1 />;
  //     case 2:
  //       return <Step2 />;
  //     case 3:
  //       return <Step3 />;
  //     case 4:
  //       return <Step4 />;
  //     case 5:
  //       return <Step5 setIsResult={setIsResult} />;
  //     default:
  //       return <Step1 />;
  //   }
  // };
  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            goToResult={() => setCurrentStep(2)}
            content={content}
            blog_id={blog_id}
            resourceType={resourceType}
            resourceName={resourceName}
          />
        );

      case 2:
        return <Step5 setIsResult={setIsResult} blog_id={blog_id} resourceType={resourceType}
          resourceName={resourceName} />;

      default:
        return (
          <Step1
            goToResult={() => setCurrentStep(2)}
            content={content}
            blog_id={blog_id}
          />
        );
    }
  };
  return (
    <div className="black-gr-div">
      <section className="party-finding-quiz pt-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {/* {currentStep == 5 ? (
                <>
                  {!isResult && (
                    <>
                      <h3 className="sec-head medium">
                        We’re doing the math for you
                      </h3>
                      <p className="sec-head medium-20 mt-3">
                        You’re just <span>1 step away</span>
                      </p>
                    </>
                  )}
                </>
              ) : (
                <h3 className="sec-head medium">
                  Estimate Your<span> Party Budget</span>
                </h3>
              )} */}
              {isResult ? (
                <>
                  <h2 className="sec-head">
                    Your Ideal Budget is
                    {/* <span>Result</span> */}
                  </h2>
                  {/* <h2 className="sec-head medium">
                  <span>Rs {10000}</span>
                </h2> */}
                </>
              ) : currentStep == 2 ? (
                <>
                  <h3 className="sec-head medium">
                    We’re doing the math for you
                  </h3>
                  <p className="sec-head medium-20 mt-3">
                    You’re just <span>1 step away</span>
                  </p>
                </>
              ) : (
                <h3 className="sec-head medium mt-5">
                  Estimate Your<span> Party Budget</span>
                </h3>
              )}
            </div>
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
            </div>
          </div>
        </div>
      </section>
      <Image src={partyQuizIllus} alt="black-gr" className="w-100 h-auto" />
    </div>
  );
};

export default CostCalculator;
