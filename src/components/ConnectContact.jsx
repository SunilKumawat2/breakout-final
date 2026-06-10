"use client";
import React, { useState } from "react";
import Image from "next/image";
import illus from "@/images/contact-bottom-illus.svg";
import illus4 from "@/images/illus4.svg";
import privacyIcon from "@/images/privacy-icon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const ConnectContact = ({
  home = false,
  img,
  privacyLine = true,
  noTextBottom = true,
  noImage = false,
  textData,
  className = "",
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
console.log("corporate_corporate_12332323423",page_type)
  const data = textData || defaultData;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
    }),

    // onSubmit: async (values, { resetForm }) => {
    //   setLoading(true);

    //   try {
    //     const sendData = {
    //       name: values.name,
    //       email: values.email,
    //       phone: values.phone,
    //       page: page,
    //     };

    //     await axios.post("/api/contactFormClickup", JSON.stringify(sendData));

    //     // ✅ 🔥 GTM TRACKING (ADD THIS)
    //     window.dataLayer = window.dataLayer || [];
    //     window.dataLayer.push({
    //       event: "form_submit",
    //       form_name: "simple_contact_form",
    //       page: page,
    //       user_email: values.email,
    //       phone: values.phone,
    //     });

    //     toast.success("Thank you! We'll be in touch soon.", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //     });

    //     resetForm();

    //   } catch (error) {
    //     // optional error handling
    //   } finally {
    //     setLoading(false);
    //   }
    // },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      // ========================= GET UTM DATA =========================
      const utmData =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("utm_data") || "{}")
          : {};

      try {

        const sendData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          page: page,

          // ========================= UTM DATA =========================
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",
          utm_term: utmData?.term || "",
          utm_content: utmData?.content || "",
        };

        // ========================= CLICKUP API =========================
        await axios.post("/api/addToClickupConnectLND", JSON.stringify(sendData));

        // ========================= WATI API =========================
        {
          page_type == "corporate_L_N_D" && (
            await axios.post("/api/corporate_lnd_wati", {
              phone: values.phone,
              name: values.name,
              email: values.email,


              // ========================= UTM DATA =========================
              utm_source: utmData?.source || "",
              utm_medium: utmData?.medium || "",
              utm_campaign: utmData?.campaign || "",
            })
          )
        }
        {
          page_type == "corporate" && (
            await axios.post("/api/wati", {
              phone: values.phone,
              name: values.name,
              email: values.email,

              // ========================= UTM DATA =========================
              utm_source: utmData?.source || "",
              utm_medium: utmData?.medium || "",
              utm_campaign: utmData?.campaign || "",
            })
          )
        }

        await axios.post("/api/corporate_lnd_mailchimp", {
          name: values.name,
          phone: values.phone,
          email: values.email,

          // ========================= UTM DATA =========================
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",
        });

        // ========================= GTM EVENT =========================
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: "form_submit",
          form_name: "simple_contact_form",
          page: page,
          user_email: values.email,
          phone: values.phone,
          tag: "landd", // dynamic tag

          // ========================= UTM DATA =========================
          utm_source: utmData?.source || "",
          utm_medium: utmData?.medium || "",
          utm_campaign: utmData?.campaign || "",
          utm_term: utmData?.term || "",
          utm_content: utmData?.content || "",

          // ========================= PERFORMANCE =========================
          form_load_time: performance.now(),
        });

        // ========================= META PIXEL EVENT =========================
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Get In Touch",
            email: values.email,

            // ========================= UTM DATA =========================
            utm_source: utmData?.source || "",
            utm_campaign: utmData?.campaign || "",
          });
        }

        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
        });

        resetForm();

      } catch (error) {

        console.log("ERROR:", error);

        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
        });

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className={`hm-contact-sec section-padding pb-0 ${className}`} id="book-now">
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
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="row justify-content-between">
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
                  </div>
                  <div className="col-lg-5 col-12">
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

                  </div>
                  <div className="col-12 mt-4">
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
        <section className="section-padding pb-0">
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
              className="hm-contact-illus"
              style={{ marginBottom: "-1px" }}
            />
          )
        ) : (
          <Image
            src={img}
            alt="illus"
            className="hm-contact-illus"
            style={{ marginBottom: "-1px" }}
          />
        )
      ) : null}
    </section>
  );
};

export default ConnectContact;
