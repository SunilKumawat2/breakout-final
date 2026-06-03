"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/app/helpers/api";
import QuizResult from "./QuizResult";
import axios from "axios";

const Step3 = ({
  participants,
  selectedDate,
  setEstimatedQuote,
  category,
  content,
  resourceName,
  resourceType
}) => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState(null);
  const [packageTrigger, setPackageTrigger] = useState(false);
  console.log("Step3_Step3", category)
  // ✅ FINAL CATEGORY
  const finalCategory =
    content && content !== "null"
      ? content
      : typeof window !== "undefined"
        ? sessionStorage.getItem("selected_category")
        : "";

  const isCouplePackage =
    finalCategory?.toLowerCase() === "couple-package";

  const isBirthdayPackage =
    finalCategory?.toLowerCase() === "birthday-party";

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      consultation: false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Enter valid phone"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      // ✅ Checkbox validation added
      // consultation: Yup.boolean()
      //   .oneOf(
      //     [true],
      //     "Please check the consultation checkbox to continue"
      //   )
      //   .required("This field is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      try {
        // =========================
        // ✅ SESSION STORAGE
        // =========================
        const step1Data =
          typeof window !== "undefined"
            ? JSON.parse(sessionStorage.getItem("step1_data") || "{}")
            : {};

        const quizDetails = [
          {
            question: "How many participants will be there?",
            answer: step1Data?.participants?.toString() || "",
          },
          {
            question: "When is your party?",
            answer: step1Data?.selectedDate || "",
          },
        ];

        // =========================
        // ✅ DATE FORMAT
        // =========================
        const formattedDate = selectedDate
          ? `${String(selectedDate.getDate()).padStart(2, "0")}-${String(
            selectedDate.getMonth() + 1
          ).padStart(2, "0")}-${selectedDate.getFullYear()}`
          : "";

        const bookingData = {
          participants,
          date: formattedDate,
          name: values.name,
          phone: values.phone,
          email: values.email,
          category: finalCategory,
        };

        // =========================
        // ✅ FETCH PACKAGES
        // =========================
        const res = await api.get(
          `/pricing-packages?category=${finalCategory}`
        );

        const allPackages = res?.data?.data || [];

        // =========================
        // 🔥 CALCULATE PACKAGES
        // =========================
        const calculatedPackages = (isCouplePackage
          ? allPackages
          : allPackages.filter(
            (pkg) =>
              participants >= pkg.mincapacity &&
              participants <= pkg.maxcapacity
          )
        ).map((pkg) => {
          let total = 0;
          let complimentaryTotal = 0;

          const updatedAttributes = pkg.attributes.map((attr) => {
            const price = Number(attr.price);

            let finalPrice =
              attr.type === "variable" && !isCouplePackage
                ? price * participants
                : price;

            total += finalPrice;

            if (isBirthdayPackage && attr.complimentary) {
              complimentaryTotal += finalPrice;
            }

            return { ...attr, finalPrice };
          });

          const offerPrice = isBirthdayPackage
            ? total - complimentaryTotal
            : total;

          return {
            ...pkg,
            attributes: updatedAttributes,
            totalAmount: total,
            offerAmount: offerPrice,
            complimentaryAmount: complimentaryTotal,
          };
        });

        // =========================
        // ✅ FINAL RESPONSE
        // =========================
        const finalResponse = calculatedPackages.map((pkg) => ({
          suggested_package: pkg.name,
          estimated_cost: pkg.offerAmount || pkg.totalAmount,
          package_details: {
            activities: pkg.attributes.map((attr) => ({
              name: attr.name,
              price: attr.finalPrice?.toString(),
            })),
          },
        }));

        // =========================
        // ✅ MAIN PAYLOAD
        // =========================
        const payload = {
          resource_id: 0,
          category: finalCategory,
          user_name: values.name,
          user_email: values.email,
          user_phone_number: values.phone,
          free_consultation_flag: values.consultation,
          quiz_detail: quizDetails,
          final_response: finalResponse,
        };

        console.log("FINAL PAYLOAD", payload);

        // =========================
        // ✅ API CALLS
        // =========================
        await api.post("/quote-estimator/submit", payload);

        // await axios.post(
        //   "/api/addToClickupResource",
        //   JSON.stringify(bookingData)
        // );

        /* ================= CLICKUP RESOURCE API ================= */

        try {
          console.log("CLICKUP RESOURCE START");
          const clickupResourceRes = await axios.post(
            "/api/addToClickupResource",
            {
              name: values.name,
              whatsappNumber: values.phone,
              email: values.email,
              resourceId: 0,
              page: window.location.href,
              lookingFor: finalCategory || "",
              attendees_count: participants?.toString() || "",
              date: formattedDate || "",
              category: finalCategory || "",

              consultation: values.consultation
                ? "Would you like a free consultation with a party expert, with no obligation? - Yes"
                : "Would you like a free consultation with a party expert, with no obligation? - No",
            }
          );

          console.log(
            "CLICKUP RESOURCE SUCCESS",
            clickupResourceRes.data
          );

        } catch (clickupResourceErr) {
          console.log(
            "ClickUp Resource Error:",
            clickupResourceErr
          );

        }

        /* ================= WATI API ================= */

        try {
          console.log("WATI START");
          const watiRes = await axios.post(
            "/api/resources_wati",
            {
              name: values.name,
              phone: values.phone,
              page_type: "quote_estimator",
              looking_for: finalCategory || "",
              attendees_count: participants?.toString() || "",
              event_date: formattedDate || "",
              category: finalCategory || "",
              consultation:
                values.consultation ? "Yes" : "No",
            }
          );

          console.log("WATI SUCCESS", watiRes.data);
        } catch (watiErr) {
          console.log("WATI Error:", watiErr);

        }

        /* ================= MAILCHIMP API ================= */

        try {
          console.log("MAILCHIMP START");
          const mailchimpRes = await axios.post(
            "/api/resources_mailchimp",
            {
              name: values.name,
              phone: values.phone,
              email: values.email,
              tags: "resource",

              merge_fields: {
                PHONE: values.phone,

                CATEGORY: finalCategory || "",

                PARTICIPANTS:
                  participants?.toString() || "",

                CONSULTATION:
                  values.consultation ? "Yes" : "No",
              },
            }
          );

          console.log(
            "MAILCHIMP SUCCESS",
            mailchimpRes.data
          );

        } catch (mailchimpErr) {

          console.log("Mailchimp Error:", mailchimpErr);

        }

        // =========================
        // ✅ UI UPDATE
        // =========================
        setPackages(calculatedPackages);
        setPackageTrigger(true);

        if (calculatedPackages.length > 0) {
          setEstimatedQuote(calculatedPackages[0].offerAmount);
        }

      } catch (err) {
        console.error("Submit Error:", err);
      }

      setLoading(false);
    },
  });

  // =========================
  // ✅ RESULT SCREEN
  // =========================
  if (packageTrigger) {
    return (
      <QuizResult
        packages={packages}
        category={category}
        capacity={participants}
      />
    );
  }

  // =========================
  // ✅ LOADING
  // =========================
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  // ✅ FORM UI
  return (
    <section className="hm-contact-sec quiz-form-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head medium">
              Enter Details to <span>Unlock Quote</span>
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
                        <input type="text" name="name" placeholder="Name"
                          value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className={formik.touched.name && formik.errors.name ? "is-invalid" : ""} />
                      </div>
                      {formik.touched.name && formik.errors.name && (<div className="invalid-feedback d-block">
                        {formik.errors.name} </div>)} </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" name="phone" placeholder="Phone Number"
                          value={formik.values.phone} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} className={formik.touched.phone &&
                            formik.errors.phone ? "is-invalid" : ""} />
                      </div>
                      {formik.touched.phone && formik.errors.phone && (<div className="invalid-feedback d-block">
                        {formik.errors.phone} </div>)}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }
                        />
                      </div>

                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group form-check mt-2">
                      <input
                        type="checkbox"
                        id="consultation"
                        name="consultation"
                        className={`form-check-input ${formik.touched.consultation && formik.errors.consultation
                          ? "is-invalid"
                          : ""
                          }`}
                        checked={formik.values.consultation || false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="consultation"
                      >
                        Would you like a free consultation with a party expert,
                        with no obligation?
                      </label>

                      {/* {formik.touched.consultation &&
                        formik.errors.consultation && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.consultation}
                          </div>
                        )} */}
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
    </section>);
};

export default Step3;