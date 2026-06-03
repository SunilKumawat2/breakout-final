"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";
import selDrop from "@/images/sel-drop.svg";
import illus from "@/images/contact-bottom-illus.svg";
import illus4 from "@/images/illus4.svg";
import privacyIcon from "@/images/privacy-icon.svg";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
// const defaultLookingForOptions = [
//   { value: "Birthdays", label: "Birthdays" },
//   { value: "Corporate", label: "Corporate" },
//   { value: "Escape Rooms", label: "Escape Rooms" },
//   { value: "Farewells", label: "Farewells" },
//   { value: "Bachelor(ette)", label: "Bachelor(ette)" },
//   // { value: "Things to do", label: "Things to go" },
//   { value: "Virtual", label: "Virtual" },
//   { value: "Others", label: "Others" },
// ];
const landingOptions = [
  { value: "Birthdays", label: "Birthdays" },
  { value: "Corporate", label: "Corporate" },
  { value: "Escape Rooms", label: "Escape Rooms" },
  { value: "Farewells", label: "Farewells" },
  { value: "Bachelor(ette)", label: "Bachelor(ette)" },
  { value: "Virtual", label: "Virtual" },
  { value: "Things to do", label: "Things to go" },
  { value: "Others", label: "Others" },
];

const defaultOptions = [
  { value: "Birthdays", label: "Birthdays" },
  { value: "Corporate", label: "Corporate" },
  { value: "Escape Rooms", label: "Escape Rooms" },
  { value: "Farewells", label: "Farewells" },
  { value: "Bachelor(ette)", label: "Bachelor(ette)" },
  { value: "Virtual", label: "Virtual" },
  { value: "Others", label: "Others" },
];

const HomeContact = ({
  page_name,
  home = false,
  img,
  className = "",
  privacyLine = true,
  noTextBottom = true,
  noImage = false,
  textData,
  page_type
}) => {

  const defaultData = {
    heading: "Best Escape Room in Bangalore for Ultimate Thrills",
    description1:
      "Step into a world of mystery and adventure at Breakout®, the top-rated escape room in Bangalore.",
    description2:
      "Solve mind-bending puzzles, uncover hidden clues, and experience immersive storytelling for an unforgettable challenge. Book your escape today!",
  };

  const router = useRouter();
  const page = usePathname();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const options =
    page_name == "landing" ? landingOptions : defaultOptions;
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
      lookingFor: null,
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      lookingFor: Yup.object().nullable().required("Please select an option"),
      message: Yup.string().required("Message is required"),
    }),
    // onSubmit: async (values, { resetForm }) => {
    //   setLoading(true);
    //   setSubmitSuccess(false);
    //   try {
    //     const sendData = {
    //       name: values.name,
    //       phone: values.phone,
    //       lookingFor: values.lookingFor.value,
    //       message: values.message,
    //       page: page,
    //     };
    //     await axios.post("/api/contactFormClickup", JSON.stringify(sendData));
    //     setSubmitSuccess(true);
    //     toast.success("Thank you! We'll be in touch soon.", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //     });
    //     resetForm();
    //   } catch (error) {
    //     // you may want to handle errors here
    //     setSubmitSuccess(false);
    //   } finally {
    //     setLoading(false);
    //   }
    // },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSubmitSuccess(false);

      // ========================= UTM DATA =========================
      const utmData =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("utm_data") || "{}")
          : {};

      try {
        const sendData = {
          name: values.name,
          whatsappNumber: values.phone,
          lookingFor: values.lookingFor.value,
          message: values.message,
          page: page,

          // ========================= UTM FIELDS =========================
          utm_source: utmData?.utm_source || "",
          utm_medium: utmData?.utm_medium || "",
          utm_campaign: utmData?.utm_campaign || "",
          utm_term: utmData?.utm_term || "",
          utm_content: utmData?.utm_content || "",
        };

        // ✅ 1. ClickUp API
        {
          page_type == "escape_room" && (
            await axios.post("/api/addToClickupEscapeRoom", sendData)
          )
        }
        if (["parties", "birthdays", "farewells", "bachelor(ette)", "couples", "birthday"]?.includes(page_type)) {
          await axios.post("/api/addToClickupParties", sendData)
        }

        {
          page_type == "corporate" && (
            await axios.post("/api/addToClickupCorporate", sendData)
          )
        }


        // ✅ 2. WATI API
        {
          page_type == "escape_room" && (
            await axios.post("/api/escape_room_wati", {
              phone: values.phone,
              name: values.name,
              lookingFor: values.lookingFor.value,
              message: values.message,


              // ========================= UTM =========================
              utm_source: utmData?.utm_source || "",
              utm_medium: utmData?.utm_medium || "",
              utm_campaign: utmData?.utm_campaign || "",
              utm_term: utmData?.utm_term || "",
              utm_content: utmData?.utm_content || "",
            })
          )
        }

        //  Parties Wati
        if (
          ["parties", "birthdays", "farewells", "bachelor(ette)", "couples", "birthday"]?.includes(page_type)
        ) {
          await axios.post("/api/party_wati", {
            phone: values.phone,
            name: values.name,
            lookingFor: values.lookingFor.value,
            message: values.message,

            // ========================= UTM =========================
            utm_source: utmData?.utm_source || "",
            utm_medium: utmData?.utm_medium || "",
            utm_campaign: utmData?.utm_campaign || "",
            utm_term: utmData?.utm_term || "",
            utm_content: utmData?.utm_content || "",
          });
        }

        // ✅ 2.Corporate WATI API
        {
          page_type == "corporate" && (
            await axios.post("/api/wati", {
              phone: values.phone,
              name: values.name,
              lookingFor: values.lookingFor.value,
              message: values.message,


              // ========================= UTM =========================
              utm_source: utmData?.utm_source || "",
              utm_medium: utmData?.utm_medium || "",
              utm_campaign: utmData?.utm_campaign || "",
              utm_term: utmData?.utm_term || "",
              utm_content: utmData?.utm_content || "",
            })
          )
        }

        // ========================= GTM EVENT =========================
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: "form_submit",
          form_name: "escape_room_contact_form",
          page: page,
          looking_for: values.lookingFor.value,

          // ========================= UTM =========================
          utm_source: utmData?.utm_source || "",
          utm_medium: utmData?.utm_medium || "",
          utm_campaign: utmData?.utm_campaign || "",
        });

        setSubmitSuccess(true);

        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
        });

        resetForm();

      } catch (error) {
        console.error("Error:", error);
        setSubmitSuccess(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className={`hm-contact-sec section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head medium">
              Get in <span>Touch Now.</span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="hm-con-form-card">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-5 col-12">
                  <div className="hm-con-form-card-head">
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link href="mailto:info@breakout.in">
                          <Image src={mailicon} alt="hmimg5" />
                        </Link>
                      </li>
                    </ul>
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link href="mailto:info@breakout.in">
                          <span>info@breakout.in</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-5 col-12">
                  <div className="hm-con-form-card-head">
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link
                          href="https://wa.me/919742386781"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={whicon} alt="WhatsApp" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919742386781">
                          <Image src={phicon} alt="hmimg5" />
                        </Link>
                      </li>
                    </ul>
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link href="tel:+919742386781">
                          <span>+91 9742386781</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="row align-items-center justify-content-between mt-4">
                  <div className="col-lg-5 col-12">
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
                    <div className="form-group">
                      <div className="input-group sel-group">
                        {/* <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="What are you looking for"
                          name="lookingFor"
                          styles={{
                            ...customStyles,
                            control: (base, state) => ({
                              ...customStyles.control(base, state),
                            }),
                          }}
                          value={formik.values.lookingFor}
                          onChange={(selectedOption) =>
                            formik.setFieldValue("lookingFor", selectedOption)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("lookingFor", true)
                          }
                          options={options}
                        /> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="What are you looking for"
                          name="lookingFor"
                          styles={{
                            ...customStyles,
                            menuPortal: (base) => ({
                              ...base,
                              zIndex: 9999,
                            }),
                          }}
                          menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                          menuPosition="fixed"
                          value={formik.values.lookingFor}
                          onChange={(selectedOption) =>
                            formik.setFieldValue("lookingFor", selectedOption)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("lookingFor", true)
                          }
                          options={options}
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
                  <div className="col-lg-5 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <textarea
                          placeholder="Message"
                          rows={4}
                          name="message"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          className={
                            "form-control" +
                            (formik.touched.message && formik.errors.message
                              ? " is-invalid"
                              : "")
                          }
                        ></textarea>
                      </div>
                      {formik.touched.message && formik.errors.message && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.message}
                        </div>
                      )}
                    </div>
                    <button
                      className="main-btn"
                      type="submit"
                      disabled={loading}
                      style={{ minWidth: "150px" }}
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
                        <span>Submit Form</span>
                      )}
                    </button>
                    {/* {submitSuccess && (
                      <div
                        className="alert alert-success mt-3"
                        role="alert"
                        style={{ fontSize: "16px" }}
                      >
                        Thank you! We'll be in touch soon.
                      </div>
                    )} */}
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
      {noTextBottom && (
        <section className="section-padding pb-0 exp-sec">
          <div className="container">
            <div className="row text-center justify-content-center">
              <div className="col-lg-9 col-12">
                <h3
                  className="sec-head medium mb-4"
                  dangerouslySetInnerHTML={{ __html: data?.heading }}
                />
                <p
                  className="para mb-4"
                  dangerouslySetInnerHTML={{ __html: data?.description1 }}
                />
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description2 }}
                />
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {!noImage ? (
        !img ? (
          home ? (
            <Image
              src={illus}
              alt="illus"
              className="hm-contact-illus"
              style={{ marginBottom: "-1px" }}
            />
          ) : (
            <Image
              src={illus4}
              alt="illus"
              className="hm-contact-illus "
              style={{ marginBottom: "-1px" }}
            />
          )
        ) : (
          <Image
            src={img}
            alt="illus"
            className="hm-contact-illus "
            style={{ marginBottom: "-1px" }}
          />
        )
      ) : null}
    </section>
  );
};

export default HomeContact;
