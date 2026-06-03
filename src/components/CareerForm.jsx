"use client";
import React, { useState } from "react";
import Image from "next/image";
import privacyIcon from "@/images/privacy-icon.svg";
import illus from "@/images/contact-bottom-illus.svg";
import illus4 from "@/images/illus4.svg";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const ROLE_OPTIONS = [
  { value: "Game Master", label: "Game Master" },
  { value: "Data Audit", label: "Data Audit" },
  { value: "Facility Incharge", label: "Facility Incharge" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
];

const LOOKING_FOR_OPTIONS = [
  { value: "full time internship", label: "Full Time Internship" },
  { value: "part time internship", label: "Part Time Internship" },
  { value: "full time", label: "Full Time" },
  { value: "part time", label: "Part Time" },
];

const CareerForm = ({
  img,
  privacyLine = true,
  noTextBottom = true,
  noImage = false,
  textData,
  home = false,
}) => {
  const defaultData = {
    heading: "Join Breakout: Launch Your Career Adventure",
    description1:
      "Be part of India's leading escape room experience. Contribute, grow, and collaborate in a dynamic team that's redefining fun!",
    description2:
      "We are always on the lookout for passionate & innovative minds. If you love working with people and challenges, submit your application below.",
  };

  const router = useRouter();
  const page = usePathname();

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0)",
      borderRadius: "0px",
      border: "none",
      borderBottom: `1px solid ${state.isFocused ? "#FFAE00" : "rgba(255, 255, 255, 1)"
        }`,
      padding: "15px 0px",
      outline: "none",
      boxShadow: "none",
      color: "#FFFFFF",
      cursor: "pointer",
      fontSize: "20px",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 1)",
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

  const data = textData || defaultData;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      role: null,
      lookingFor: null,
      experience: "",
      interest: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email address"),
      role: Yup.object().nullable().required("Please select a role"),
      lookingFor: Yup.object().nullable().required("Please select an option"),
      experience: Yup.string().matches(
        /^[0-9]*$/,
        "Enter a valid number (0 if no experience)"
      ),
      interest: Yup.string().required("Please tell us why you are interested"),
    }),

    onSubmit: async (values, { resetForm }) => {

      setLoading(true);
      setSubmitSuccess(false);
    
      try {
    
        // =========================
        // FIRST API (OPTIONAL)
        // =========================
    
        const formData = new FormData();
    
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("role", values.role.value);
        formData.append("lookingFor", values.lookingFor.value);
        formData.append("experience", values.experience || "");
        formData.append("interest", values.interest);
    
        if (resumeFile) {
          formData.append("resume", resumeFile);
        }
    
        formData.append("page", page);
    
        const careerRes = await axios.post(
          "/api/careerForm",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        console.log("CAREER FORM:", careerRes.data);
    
        // =========================
        // CLICKUP API
        // =========================
    
        await axios.post("/api/addToClickupCareer", {
          name: values.name,
          phone: values.phone,
          email: values.email,
    
          role: values.role.value,
          lookingFor: values.lookingFor.value,
          experience: values.experience || "",
          interest: values.interest,
    
          page,
    
          // IF YOUR careerForm API RETURNS FILE URL
          resumeUrl:
            careerRes?.data?.fileUrl ||
            careerRes?.data?.resumeUrl ||
            "",
        });
    
        // =========================
        // GTM
        // =========================
    
        window.dataLayer = window.dataLayer || [];
    
        window.dataLayer.push({
          event: "career_form_submit",
          form_name: "career_form",
          page: page,
          role: values.role?.value,
          looking_for: values.lookingFor?.value,
          experience: values.experience || "0",
          has_resume: !!resumeFile,
        });
    
        // =========================
        // SUCCESS
        // =========================
    
        setSubmitSuccess(true);
    
        toast.success(
          "Thank you for applying! We'll get in touch soon.",
          {
            position: "bottom-center",
            autoClose: 3000,
          }
        );
    
        resetForm();
        setResumeFile(null);
    
      } catch (error) {
    
        console.log(
          "CAREER FORM ERROR:",
          error
        );
    
        setSubmitSuccess(false);
    
        toast.error(
          "Submission failed. Please try again.",
          {
            position: "bottom-center",
          }
        );
    
      } finally {
    
        setLoading(false);
    
      }
    },
  });

  // Form JSX
  return (
    <section className="hm-contact-sec section-padding pb-0" id="career-form">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head medium">
              Launch Your <span>Career at Breakout®</span>
            </h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="hm-con-form-card">
              <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                encType="multipart/form-data"
              >
                <div className="row align-items-start justify-content-between mt-4">
                  <div className="col-lg-12 col-12">
                    {/* Name */}
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          className={
                            "form-control" +
                            (formik.touched.name && formik.errors.name
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    {/* Phone */}
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Phone Number"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          className={
                            "form-control" +
                            (formik.touched.phone && formik.errors.phone
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                    {/* Email */}
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          className={
                            "form-control" +
                            (formik.touched.email && formik.errors.email
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                    {/* Role Select */}
                    <div className="form-group">
                      <div className="input-group sel-group">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Select Role"
                          name="role"
                          styles={customStyles}
                          value={formik.values.role}
                          onChange={(selected) =>
                            formik.setFieldValue("role", selected)
                          }
                          onBlur={() => formik.setFieldTouched("role", true)}
                          options={ROLE_OPTIONS}
                        />
                      </div>
                      {formik.touched.role && formik.errors.role && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.role}
                        </div>
                      )}
                    </div>
                    {/* Looking For Select */}
                    <div className="form-group">
                      <div className="input-group sel-group">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="What are you looking for?"
                          name="lookingFor"
                          styles={customStyles}
                          value={formik.values.lookingFor}
                          onChange={(selected) =>
                            formik.setFieldValue("lookingFor", selected)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("lookingFor", true)
                          }
                          options={LOOKING_FOR_OPTIONS}
                        />
                      </div>
                      {formik.touched.lookingFor &&
                        formik.errors.lookingFor && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.lookingFor}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-12">
                    {/* Years of Experience */}
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Relevant Years of Experience (if any)"
                          name="experience"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.experience}
                          className={
                            "form-control" +
                            (formik.touched.experience &&
                              formik.errors.experience
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.experience &&
                        formik.errors.experience && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.experience}
                          </div>
                        )}
                    </div>
                    {/* Interest - Briefly tell us ... */}
                    <div className="form-group">
                      <div className="input-group">
                        <textarea
                          placeholder="Briefly tell us why you are interested in joining"
                          rows={4}
                          name="interest"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.interest}
                          className={
                            "form-control" +
                            (formik.touched.interest && formik.errors.interest
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.interest && formik.errors.interest && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.interest}
                        </div>
                      )}
                    </div>
                    {/* Resume Upload */}
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          className="form-control"
                          onChange={(e) => {
                            setResumeFile(
                              e.target.files && e.target.files.length > 0
                                ? e.target.files[0]
                                : null
                            );
                          }}
                        />
                      </div>
                      <small
                        className="form-text text-muted"
                        style={{ color: "#999" }}
                      >
                        Upload your resume (PDF, DOC, DOCX)
                      </small>
                    </div>
                    <button
                      className="main-btn"
                      type="submit"
                      disabled={loading}
                      style={{ minWidth: "180px" }}
                    >
                      {loading ? (
                        <span>
                          <span
                            className="spinner-border spinner-border-sm me-1"
                            style={{ color: "#FFAE00" }}
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </span>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                    {/* Submission success */}
                    {submitSuccess && (
                      <div
                        className="alert alert-success mt-3"
                        role="alert"
                        style={{ fontSize: "16px" }}
                      >
                        Thank you! We'll be in touch soon.
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            {privacyLine && (
              <p className="privacy-line d-flex align-items-center gap-2 mt-4">
                <Image src={privacyIcon} alt="privacy-icon" />
                <span style={{ color: "#feaa00" }}>
                  We value your trust and safeguard your privacy at every step.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;
