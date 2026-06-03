import QuizForm from "@/components/QuizForm";
import React from "react";

const Step5 = ({ setIsResult, resource, blog_id, resourceName,resourceType }) => {
  console.log("step_5_resource={resource}", resource)
  return (
    <>
      <QuizForm setIsResult={setIsResult}
        resource={resource} blog_id={blog_id} resourceName={resourceName} resourceType={resourceType} />
    </>
  );
};

export default Step5;
