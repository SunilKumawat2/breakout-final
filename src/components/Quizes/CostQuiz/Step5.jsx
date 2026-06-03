import CostQuizForm from "@/components/CostQuizForm";
import React from "react";

const Step5 = ({ setIsResult, blog_id, resourceType, resourceName }) => {
  return (
    <>
      {/* <QuizForm setIsResult={setIsResult} /> */}
      <CostQuizForm setIsResult={setIsResult} blog_id={blog_id} resourceType={resourceType}
        resourceName={resourceName} />
    </>
  );
};

export default Step5;
