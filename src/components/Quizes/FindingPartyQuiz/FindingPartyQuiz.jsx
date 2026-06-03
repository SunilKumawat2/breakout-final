"use client";
import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import partyQuizIllus from "@/images/party-quiz-illus.png";
import Image from "next/image";
import Step5 from "./Step5";
import { useSearchParams } from "next/navigation";

const FindingPartyQuiz = () => {
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const resource = searchParams.get("resource")
  const resourceName = searchParams.get("name")
  const resourceType = searchParams.get("type")
  const blog_id = searchParams.get("blog_id")
  console.log("searchParams_content", resourceName);
  const [currentStep, setCurrentStep] = useState(1);
  console.log("skjdfksdhfksdf", currentStep)
  const [isResult, setIsResult] = useState(false);
  const totalSteps = 5; // Adjust based on your needsz
  const [totalVenues, setTotalVenues] = useState(0);

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

  useEffect(() => {
    const storedTotal = sessionStorage.getItem("Total_venues");

    if (storedTotal) {
      setTotalVenues(Number(storedTotal)); // 👈 store in state
    }
  }, []);

  const fetchVenues = async () => {
    try {
      const rawAnswers = JSON.parse(
        sessionStorage.getItem("step1_raw") || "{}"
      );

      if (!rawAnswers || Object.keys(rawAnswers).length === 0) return;

      const queryParams = {
        page: 1,
        limit: 30,

        price: getValidValue(rawAnswers?.price),
        capacity: getValidValue(rawAnswers?.capacity),
        suitable_time: getValidValue(rawAnswers?.suitable_time),
        experience_type: getValidValue(rawAnswers?.experience_type),
        experience_looking_for: getValidValue(rawAnswers?.experience_looking_for),
        allow_for_hours_option: getValidValue(rawAnswers?.allow_for_hours_option),
        area: getValidValue(rawAnswers?.area),
        budget_range: getValidValue(rawAnswers?.budget_range),
      };
console.log("queryParams",queryParams)
      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([_, v]) => v !== undefined && v !== null && v !== ""
        )
      );

      // const queryString = new URLSearchParams(cleanParams).toString();

      const params = new URLSearchParams();

      Object.entries(cleanParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null && v !== "") {
              params.append(key, v);
            }
          });
        } else {
          params.append(key, value);
        }
      });

      const queryString = params.toString();
      console.log("AUTO VENUES QUERY 👉", queryString);

      const res = await api.get(`/venues?${queryString}`);

      console.log("AUTO VENUES RESPONSE 👉", res.data);
      if (res?.data) {
        sessionStorage.setItem("Total_venues", res?.data?.total)
      }

    } catch (err) {
      console.log("Auto venues error", err);
    }
  };

  useEffect(() => {
    fetchVenues(); // 🔥 first API call on page load
  }, []);


  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            goToResult={() => setCurrentStep(2)}
            content={content}
            resource={resource}
            blog_id={blog_id}
            resourceName={resourceName}
            resourceType={resourceType}
          />
        );

      case 2:
        return <Step5 setIsResult={setIsResult} 
        resource={resource}
         blog_id={blog_id} resourceName={resourceName} resourceType={resourceType}/>;

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
      <section className="party-finding-quiz sec-padding-top">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {/* {currentStep == 2 ? (
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
                  Finding <span>Party Venue Quiz</span>
                </h3>
              )} */}
              {isResult ? (
                <h3 className="sec-head medium">
                  Your <span>Budget-friendly</span> Venues
                </h3>
              ) : currentStep == 2 ? (
                // <>
                //   <h3 className="sec-head medium">
                //     We found  <span>{totalVenues} venues</span> that fit your budget
                //   </h3>
                //   <p className="sec-head medium-20 mt-3">
                //     You’re just <span>1 step away</span>
                //   </p>
                // </>
                null
              ) : (
                <h3 className="sec-head medium">
                  Find Venues<span> Within Your Budget</span>
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
      <Image src={partyQuizIllus} alt="black-gr" className="illus-image" />
    </div>
  );
};

export default FindingPartyQuiz;
