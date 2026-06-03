"use client";

import React, { useState } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import DatePicker from "./DatePicker";
import bx1 from "@/images/bx1.svg";
import bx2 from "@/images/bx2.svg";
import bx3 from "@/images/bx3.svg";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const locationOptions = [
  { value: "Koramangala", label: "Koramangala" },
  { value: "Whitefield", label: "Whitefield" },
  { value: "JP Nagar", label: "JP Nagar" },
];

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Name is required";
  if (!values.phone) errors.phone = "Phone Number is required";
  else if (!/^\d{10}$/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Invalid phone number";
  if (!values.email) errors.email = "Email is required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
    errors.email = "Invalid email address";
  if (!values.date) errors.date = "Date is required";
  if (!values.location) errors.location = "Location is required";
  return errors;
};

const BirthdayGetInTouch = ({ img,className="" }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const page = usePathname();

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

  const data = [
    {
      title: "Expert Hosts",
      image: bx1,
    },
    {
      title: "Flawless Execution",
      image: bx2,
    },
    {
      title: "Premium, Private Events",
      image: bx3,
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      applyX: false,
      date: null,
      location: null,
    },
    validate,
  
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus(null);
  
      const sendData = {
        name: values.name,
        whatsappNumber: values.phone, // FIXED
        email: values.email,
        date: values.date ? values.date.toISOString() : null,
        page: page,
      
        at: values.location?.value ?? "", // FIXED (location → at)
      
        iWantTo: values.applyX ? "Breakout X" : "", // optional mapping
      };
  
      try {
        await axios.post("/api/addToClickupCorporateGoPremium", JSON.stringify(sendData));
  
        // ✅ 🔥 GTM TRACKING (ADD THIS)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit",
          form_name: "contact_form_v2",
          page: page,
          location: values.location?.value ?? "",
          applyX: values.applyX,
          has_date: !!values.date,
        });
  
        setSubmitStatus("success");
  
        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
        });
  
        resetForm();
  
      } catch (err) {
        setSubmitStatus("error");
  
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    },
  });

  return (
    <section className={`section-padding ${img ? "pb-0" : ""} ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2 className="sec-head sm-head medium">
                <span>Go Premium With Breakout X</span>
              </h2>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="bday-form-card style-2">
              <div className="row row-gap-25 mb-4">
                <div className="col-lg-6 col-12">
                  <p className="para">
                    Created for building successful relationship, Business
                    relationship driving impactful collaborations or hosting
                    business leaders.
                  </p>
                </div>
                <div className="col-lg-6 col-12">
                  <p className="para">
                    Submit the Lead form for Breakout X to check eligibility for
                    breakout guarantee
                  </p>
                </div>
              </div>
              <div className="row row-gap-25 mb-5">
                {data.map((item, index) => (
                  <div className="col-lg-4 col-md-6 col-12" key={index}>
                    <div className="bx-card-wrap">
                      <div className="bx-card-img">
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <div className="bx-card-content">
                        <h3>{item.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="form-field"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="row align-items-end row-gap-25">
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
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Add your E-mail ID"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="cus-check">
                          <input
                            type="checkbox"
                            id="applyX"
                            name="applyX"
                            checked={formik.values.applyX}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="applyX" className="form-label">
                            <span>Apply for Breakout X</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-12">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">
                        Select a date
                      </label>
                      <DatePicker
                        id="date"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        minDate={new Date()}
                        maxDate={formik.values.date || null}
                        placeholderText="Select a date"
                        className={
                          "form-control" +
                          (formik.touched.date && formik.errors.date
                            ? " is-invalid"
                            : "")
                        }
                        onBlur={() => formik.setFieldTouched("date", true)}
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-12">
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        For
                      </label>
                      <div className="input-group sel-group">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Select an option"
                          name="location"
                          inputId="location"
                          styles={{
                            ...customStyles,
                            control: (base, state) => ({
                              ...customStyles.control(base, state),
                              paddingLeft: "35px",
                            }),
                          }}
                          options={locationOptions}
                          value={formik.values.location}
                          onChange={(option) =>
                            formik.setFieldValue("location", option)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("location", true)
                          }
                        />
                      </div>
                      {formik.touched.location && formik.errors.location && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 col-12">
                    <div className="">
                      <button
                        className="main-btn dark-btn"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <span className="yellow-text">
                          {formik.isSubmitting ? "Booking..." : "Book a call"}
                        </span>
                      </button>
                      {/* {submitStatus === "success" && (
                        <div className="text-success mt-2">
                          Your form has been submitted!
                        </div>
                      )} */}
                      {/* {submitStatus === "error" && (
                        <div className="text-danger mt-2">
                          Something went wrong. Please try again.
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {img && <Image src={img} alt="illus" className="illus-image" />}
    </section>
  );
};

export default BirthdayGetInTouch;
