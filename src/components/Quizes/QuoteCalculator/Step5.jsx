import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useGlobalContext } from "@/context/GlobalContext";
import api from "@/app/helpers/api";
import QuizResult from "../FindingPartyQuiz/QuizResult";

const forOptions = [
  { value: "kids", label: "Kids ( 5 - 10 yrs )" },
  { value: "teen", label: "Teen ( 10 - 18 yrs)" },
  { value: "adults", label: "Adults ( 18+ yrs)" },
];

const participantsOptions = [
  { value: "1-25", label: "1 - 25" },
  { value: "26-50", label: "26 - 50" },
  { value: "51-100", label: "51 - 100" },
  { value: "101-200", label: "101 - 200" },
  { value: "200+", label: "200+" },
];

const Step5 = ({ setIsResult }) => {
  const { finderQuizValues, updateFinderQuizValue } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: finderQuizValues.step5.value?.name || "",
      forWhom: finderQuizValues.step5.value?.forWhom || null,
      phone: finderQuizValues.step5.value?.phone || "",
      participants: finderQuizValues.step5.value?.participants || null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      forWhom: Yup.object().nullable().required("Please select an option"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      participants: Yup.object()
        .nullable()
        .required("Please select participants count"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setIsResult(true);
      const sendData = {
        name: values.name,
        forWhom: values.forWhom.value,
        phone: values.phone,
        participants: values.participants.value,
        capacityMin: finderQuizValues.step1.value?.split("-")[0] || "",
        capacityMax: finderQuizValues.step1.value?.split("-")[1] || "",
        experienceLookingFor: finderQuizValues.step2.value?.join(",") || "",
        suitableTime: finderQuizValues.step3.value || "",
        experienceType: finderQuizValues.step4.value || "",
      };
      console.log("sendData", sendData);
      // return;
      const res = await api.get("/venues", {
        params: {
          ...sendData,
        },
      });

      setVenues(res.data.data);
      console.log("res_setVenues", res);
      setLoading(false);
    },
    enableReinitialize: true,
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "20px",
      padding: "8px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 0.3)",
      },
      input: {
        color: "#FFFFFF",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
      color: state.isFocused ? "#FFAE00" : "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(255, 174, 0, 0.1)",
        color: "#FFAE00",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
  };

  if (venues) {
    return <QuizResult venues={venues} />;
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div
          className="spinner-border text-warning"
          role="status"
          aria-label="Loading"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <section className="hm-contact-sec quiz-form-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec-head medium">
                Enter Details to <span>Know Budget</span>
              </h2>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-lg-12">
              <div className="hm-con-form-card">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row align-items-center justify-content-between mt-4">
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }
                          />
                        </div>
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <div
                            className="select-group"
                            style={{ width: "100%" }}
                          >
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="For ?"
                              name="forWhom"
                              value={formik.values.forWhom}
                              onChange={(option) =>
                                formik.setFieldValue("forWhom", option)
                              }
                              onBlur={() =>
                                formik.setFieldTouched("forWhom", true)
                              }
                              styles={{
                                ...customStyles,
                                control: (base, state) => ({
                                  ...customStyles.control(base, state),
                                  padding: "15px 20px",
                                }),
                              }}
                              options={forOptions}
                            />
                            {/* <span className="select-arrow">
                            <Image src={selDrop} alt="arrowdown" />
                          </span> */}
                          </div>
                        </div>
                        {formik.touched.forWhom && formik.errors.forWhom && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.forWhom}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.touched.phone && formik.errors.phone
                                ? "is-invalid"
                                : ""
                            }
                          />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <div
                            className="select-group"
                            style={{ width: "100%" }}
                          >
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="Participants Count"
                              name="participants"
                              value={formik.values.participants}
                              onChange={(option) =>
                                formik.setFieldValue("participants", option)
                              }
                              onBlur={() =>
                                formik.setFieldTouched("participants", true)
                              }
                              styles={{
                                ...customStyles,
                                control: (base, state) => ({
                                  ...customStyles.control(base, state),
                                  padding: "15px 20px",
                                }),
                              }}
                              options={participantsOptions}
                            />
                            {/* <span className="select-arrow">
                            <Image src={selDrop} alt="arrowdown" />
                          </span> */}
                          </div>
                        </div>
                        {formik.touched.participants &&
                          formik.errors.participants && (
                            <div className="invalid-feedback d-block">
                              {formik.errors.participants}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="main-btn">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step5;
