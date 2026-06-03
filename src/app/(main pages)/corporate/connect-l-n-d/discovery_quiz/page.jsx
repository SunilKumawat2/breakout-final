"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import partyQuizIllus from "@/images/party-quiz-illus.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Page = () => {
    const page_type = "corporate_L_N_D";
    const router = useRouter();
    const { updateFinderQuizValue, finderQuizValues } = useGlobalContext();

    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [currentStep, setCurrentStep] = useState(1);

    const quizQuestions = [
        {
            step: "step1",
            question:
                "How often do your employee training programs actually lead to measurable behavioral change at work?",
            options: [
                "Almost never — we complete programs but see little difference afterward.",
                "Sometimes — a few participants apply it for a while, then fade back.",
                "Often — results show up but aren’t consistent.",
                "Always — our L&D delivers long-term, visible transformation.",
            ],
        },
        {
            step: "step2",
            question:
                "Which of these pain points hits closest to home for your L&D efforts?",
            options: [
                "Low engagement — employees treat training as a checkbox task.",
                "Poor ROI — skills learned rarely make it to the workplace.",
                "Short-lived enthusiasm — training fades within days.",
                "Cultural disconnect — teams struggle to align with company values.",
            ],
        },
        {
            step: "step3",
            question:
                "If you could redesign your ideal L&D experience, what would it feel like?",
            options: [
                "Immersive — employees are hooked, learning through challenges and play.",
                "Measurable — clear impact on performance, culture, and retention.",
                "Lasting — transformation that sticks beyond the session.",
                "All of the above — a fun, ROI-driven, mindset-based revolution!",
            ],
        },
        {
            step: "step4",
            question:
                "Would you be open to exploring how Breakout®’s M.A.G.I.C. framework could turn your training challenges into measurable growth?",
            options: [
                "Yes — I’m ready to experience gamified transformation!",
                "Maybe — I’d love to see how it compares with our current programs.",
                "Not yet — but I’m curious to learn how it works.",
            ],
        },
    ];

    const totalSteps = quizQuestions.length;
    const currentData = quizQuestions[currentStep - 1];

    const selectedValues = Array.isArray(
        finderQuizValues?.[currentData.step]?.value
    )
        ? finderQuizValues[currentData.step].value
        : [];

    const handleChange = (e) => {
        const { value, checked } = e.target;

        let newValues = checked
            ? [...selectedValues, value]
            : selectedValues.filter((v) => v !== value);

        updateFinderQuizValue(currentData.step, newValues, null);
    };

    const handleNext = () => {
        if (currentStep === totalSteps) {
            setShowForm(true); // ✅ IMPORTANT
            return;
        }

        setCurrentStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    // ✅ FORM VALIDATION
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),

            phone: Yup.string()
                .required("Phone number is required")
                .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),

            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
        }),

        onSubmit: async (values) => {
            try {

                console.log("Quiz:", finderQuizValues);
                console.log("Form:", values);

                // ========================= GET UTM DATA =========================
                const utmData =
                    typeof window !== "undefined"
                        ? JSON.parse(sessionStorage.getItem("utm_data") || "{}")
                        : {};

                // ========================= SEND DATA =========================
                const sendData = {
                    name: values.name,
                    phone: values.phone,
                    email: values.email,

                    // ========================= UTM DATA =========================
                    utm_source: utmData?.source || "",
                    utm_medium: utmData?.medium || "",
                    utm_campaign: utmData?.campaign || "",
                };

                // ========================= CLICKUP API =========================
                try {

                    const clickupRes = await axios.post(
                        "/api/addToClickupConnectLND",
                        sendData
                    );

                    console.log("CLICKUP SUCCESS:", clickupRes.data);

                } catch (clickupErr) {

                    console.log("CLICKUP ERROR:", clickupErr);

                }

                // ========================= WATI API =========================
                try {

                    if (page_type === "corporate_L_N_D") {

                        const watiRes = await axios.post(
                            "/api/corporate_lnd_wati",
                            {
                                phone: values.phone,
                                name: values.name,
                                email: values.email,

                                // ========================= UTM DATA =========================
                                utm_source: utmData?.source || "",
                                utm_medium: utmData?.medium || "",
                                utm_campaign: utmData?.campaign || "",
                            }
                        );

                        console.log("WATI LND SUCCESS:", watiRes.data);

                    }

                } catch (watiErr) {

                    console.log("WATI ERROR:", watiErr);

                }

                // ========================= MAILCHIMP API =========================
                try {

                    const mailchimpRes = await axios.post(
                        "/api/corporate_lnd_mailchimp",
                        {
                            name: values.name,
                            phone: values.phone,
                            email: values.email,

                            // ========================= UTM DATA =========================
                            utm_source: utmData?.source || "",
                            utm_medium: utmData?.medium || "",
                            utm_campaign: utmData?.campaign || "",

                            tags: "corporate_lnd",
                        }
                    );

                    console.log(
                        "MAILCHIMP SUCCESS:",
                        mailchimpRes.data
                    );

                } catch (mailchimpErr) {

                    console.log(
                        "MAILCHIMP ERROR:",
                        mailchimpErr
                    );

                }

                // ========================= SUCCESS =========================
                setSubmitted(true);

                setTimeout(() => {
                    router.push("/corporate/connect-l-n-d");
                }, 3000);

                setTimeout(() => {
                    window.location.reload();
                }, 4000);

            } catch (err) {

                console.log("SUBMIT ERROR:", err);

            }
        },
    });

    return (
        <div className="pt-80 black-gr-div">
            <h3 className="sec-head medium text-center">
                Discovery <span>Quiz</span>
            </h3>

            <motion.div className="quiz-step container">
                {!showForm ? (
                    <>
                        {/* ✅ QUIZ */}
                        <h2 className="sec-head medium mt-3 mb-3">
                            <span>Q{currentStep}:</span> {currentData.question}
                        </h2>

                        <div className="quiz-options">
                            <div className="row row-gap-25">
                                {currentData.options.map((opt, i) => (
                                    <div
                                        className="col-lg-6 col-12"
                                        key={`${currentData.step}-${i}`}
                                    >
                                        <div className="quiz-option">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`${currentData.step}-${i}`}
                                                value={opt}
                                                checked={selectedValues.includes(opt)}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={`${currentData.step}-${i}`}>
                                                <span>{opt}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quiz-navigation">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 1}
                                className="main-btn dark-btn wide-sm"
                            >
                                <span>Previous</span>
                            </button>

                            <button onClick={handleNext} className="main-btn wide-sm">
                                <span>
                                    {currentStep === totalSteps ? "Finish" : "Next"}
                                </span>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* FORM */}
                        <h2 className="sec-head medium mb-3">
                            Get Your Personalized L&D Transformation Insights
                        </h2>

                        {!submitted ? (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row align-items-center justify-content-between mt-4">

                                    {/* NAME */}
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                                                        }`}
                                                />
                                            </div>
                                            {formik.touched.name && formik.errors.name && (
                                                <div className="invalid-feedback d-block">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* PHONE */}
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
                                                        }`}
                                                />
                                            </div>
                                            {formik.touched.phone && formik.errors.phone && (
                                                <div className="invalid-feedback d-block">
                                                    {formik.errors.phone}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* EMAIL */}
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                                                        }`}
                                                />
                                            </div>
                                            {formik.touched.email && formik.errors.email && (
                                                <div className="invalid-feedback d-block">
                                                    {formik.errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BUTTON */}
                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="main-btn">
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <p className="mt-3" style={{ color: "green" }}>
                                ✅ Thank you! Our event expert will reach out to you shortly.
                            </p>
                        )}
                    </>
                )}
            </motion.div>

            <Image src={partyQuizIllus} alt="illus" className="illus-image" />
        </div>
    );
};

export default Page;