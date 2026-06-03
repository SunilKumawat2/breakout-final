"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import bd1 from "@/images/bd1.jpg";
import bd2 from "@/images/bd2.jpg";
import bd3 from "@/images/bd3.jpg";
import bd4 from "@/images/bd4.jpg";
import bd5 from "@/images/bd5.jpg";
import bd6 from "@/images/bd6.jpg";
import bd7 from "@/images/bd7.jpg";
import Link from "next/link";
import Rectangle_771 from "@/images/Rectangle 771.png";
import Rectangle4 from "@/images/Rectangle4.png";
import Rectangle1 from "@/images/Rectangle1.png";
import BrochureDownloadForm from "./BrochureDownloadForm";
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "@/app/helpers/api";
import { useRouter } from "next/navigation";
import axios from "axios";

const FullSliderSec = ({ data,blog_id,
  hasCardLinks = false,
  showModal,
  className="",
  setShowModal,
  selectedResourceId,
  setSelectedResourceId }) => {
  let data1 = "";
  console.log("data1_data1", blog_id)
  if (data1) {
    data1 = data;
  } else {
    data1 = {
      // images: [
      //   {
      //     image: bd1,
      //     heading: "Custom Tailored Experiences",
      //   },
      //   {
      //     image: bd2,
      //     heading: "Custom Tailored Experiences",
      //   },
      //   {
      //     image: bd3,
      //     heading: "Custom Tailored Experiences",
      //   },
      // ],
      description: "Try out these seven resources that we’ve created for you to plan the perfect birthday party for your loved ones. ",
      heading: "7 Valuable Resources to help you plan the party",
      icons: [
        {
          heading: "Party Planning Template",
          image: "https://breakout.bvmwebsolutions.com/https://breakout.bvmwebsolutions.com/uploads/images/party_a3cd163f-cf17-405b-9575-256d10c59fae.jpeg",
          link: "#"
        }
        , {
          heading: "Ebook",
          image: null,
          link: "https://1drv.ms/b/c/033f28a2603d05d2/IQD0muffutStQ4k0IlgvEXloAWci224sAK0HWWSMyr4mgCo?e=393vcE"
        },
        {
          heading: "Venue Discovery Quiz",
          image: Rectangle_771,
          link: "/resources/quiz/party-finding"
        }
        , {
          heading: "Party Calculator",
          image: Rectangle4,
          link: "/resources/quiz/quote-calculator"
        }
        ,
        {
          heading: "Party Planning Template",
          image: Rectangle1,
          link: "#"
        }, {
          heading: "Ebook",
          image: null,
          link: "https://1drv.ms/b/c/033f28a2603d05d2/IQD0muffutStQ4k0IlgvEXloAWci224sAK0HWWSMyr4mgCo?e=393vcE"
        }
      ]

    };
  }

  const router = useRouter();
  const comibne = [...(data1?.icons || []), ...(data?.icons || [])]
  console.log("comibne_comibne", comibne)

  // const submitResourceForm = async (values) => {
  //   try {
  //     const payload = {
  //       user_name: values.name,
  //       user_phone_number: values.phone,
  //       resource_id: selectedResourceId,
  //       event_date: new Date().toISOString(),
  //       other_details: {
  //         email: values.email,
  //         // source: "resource_modal"
  //       }
  //     };
  //     try {
  //       await fetch("/api/addToClickup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: values.name,
  //           phone: values.phone,
  //           email: values.email,
  //           resourceId: selectedResourceId,
  //         }),
  //       });
  //     } catch (err) {
  //       console.log("ClickUp Error:", err);
  //       // ❗ Fail ho jaye tab bhi main flow continue karega
  //     }

  //     // ==== DOWNLOAD API CALL =========
  //     const res = await api.post("/download-resource", payload);
  //     const data = res?.data;

  //     if (!data?.status) {
  //       throw new Error(data?.message || "Something went wrong");
  //     }

  //     toast.success("Download started 🚀");

  //     const fileUrl = data?.data?.content;

  //     // =========================
  //     // ✅ 3. OPEN FILE / LINK
  //     // =========================
  //     setTimeout(() => {
  //       if (fileUrl) {
  //         window.open(fileUrl, "_blank");
  //       }
  //     }, 1500);

  //     // =========================
  //     // ✅ 4. CLOSE MODAL
  //     // =========================
  //     setShowModal(false);

  //   } catch (error) {
  //     console.log("Error:", error);

  //     toast.error(
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Something went wrong ❌"
  //     );
  //   }
  // };

  const submitResourceForm = async (values) => {
    try {
      const payload = {
        user_name: values.name,
        user_phone_number: values.phone,
        resource_id: selectedResourceId,
        event_date: new Date().toISOString(),
        other_details: {
          email: values.email,
          // source: "resource_modal"
        }
      };
  
      // ===== CLICKUP API =====
      try {
        await fetch("/api/addToClickupResourceCard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            whatsappNumber: values.phone,
            email: values.email,
            resourceId: selectedResourceId,
          }),
        });
      } catch (err) {
        console.log("ClickUp Error:", err);
      }
  
      // ===== WATI API =====
      try {
        await axios.post("/api/resources_wati", {
          name: values.name,
          phone: values.phone,
          email: values.email || "",
          resource_id: selectedResourceId,
        });
      } catch (watiErr) {
        console.log("WATI Error:", watiErr);
      }

      // ===== MAILCHIMP API =====
      try {
        await axios.post("/api/resources_mailchimp", {
          name: values.name,
          phone: values.phone,
          email: values.email || "",
          resource_id: selectedResourceId,
          tag:"resources"
        });
      } catch (mailErr) {
        console.log("Mailchimp Error:", mailErr);
      }
  
      // ===== DOWNLOAD API =====
      const res = await api.post("/download-resource", payload);
  
      const data = res?.data;
  
      if (!data?.status) {
        throw new Error(data?.message || "Something went wrong");
      }
  
      toast.success("Download started 🚀");
  
      const fileUrl = data?.data?.content;
  
      // ===== OPEN FILE =====
      setTimeout(() => {
        if (fileUrl) {
          window.open(fileUrl, "_blank");
        }
      }, 1500);
  
      // ===== CLOSE MODAL =====
      setShowModal(false);
  
    } catch (error) {
      console.log("Error:", error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong ❌"
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]{10}$/, "Enter valid phone number"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {

      await submitResourceForm(values);

      setSubmitting(false);
      resetForm();

    },
  });


  return (
    <section className={`blog-slider-sec section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium yellow-text"
              dangerouslySetInnerHTML={{
                __html:
                  data?.group_heading ||
                  "<span>7 Valuable Resources to help you plan the party</span>",
              }}
            ></h2>

            <p
              className="para"
              dangerouslySetInnerHTML={{
                __html:
                  data?.group_sub_heading ||
                  "Try out these seven resources that we’ve created for you to plan the perfect birthday party for your loved ones. ",
              }}
            ></p>
          </div>
        </div>
      </div>
      <div className="row pt-80">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={4}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                640: {
                  slidesPerView: 1.5,
                },
                992: {
                  slidesPerView: 3.5,
                },
                1400: {
                  slidesPerView: 4.8,
                },
              }}
              className="blog-swiper"
            >
              {
                data?.items?.length > 0 &&
                data?.items
                  ?.filter(
                    (item) =>
                      item?.resource_type?.trim().toLowerCase() !=
                      "breakout quote estimator"
                  )
                  ?.map((item, index) => (
                    <SwiperSlide key={index}>
                      {hasCardLinks ? (
                        <div
                          className="blog-card"
                          onClick={() => {
                            const type = item?.resource_type?.trim().toLowerCase();

                            // ✅ Venue Finder
                            if (type == "venue finder") {
                              router.push(
                                `/resources/quiz/party-finding?id=${item?.id}&name=${encodeURIComponent(
                                  item?.resource_name
                                )}&content=${item?.content}&blog_id=${blog_id}`
                              );
                              return;
                            }

                            // ✅ Cost Calculator
                            if (type == "cost calculator") {
                              router.push(
                                `/resources/quiz/cost-calculator?id=${item?.id}&name=${encodeURIComponent(
                                  item?.resource_name
                                )}&content=${item?.content}&blog_id=${blog_id}`
                              );
                              return;
                            }

                            // ✅ Default (modal)
                            setSelectedResourceId(item?.id);
                            setShowModal(true);
                          }}
                        >
                          <div className="blog-card-img">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                width={500}
                                height={500}
                                alt="blog"
                              />
                            )}
                          </div>

                          <div className="blog-card-content">
                            <h3
                              dangerouslySetInnerHTML={{
                                __html: item?.resource_name,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="blog-card">
                          <div className="blog-card-img">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                width={500}
                                height={500}
                                alt="blog"
                              />
                            )}
                          </div>

                          <div className="blog-card-content">
                            <h3
                              dangerouslySetInnerHTML={{
                                __html: item?.heading,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  ))
              }
            </Swiper>
          </div>
        </div>
      </div>
      <CommonModal show={showModal} handleClose={() => setShowModal(false)}>
        <div className="esc-modal-content">
          <form
            className="form-field mt-4"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="row">

              {/* NAME */}
              <div className="col-lg-12">
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

              {/* PHONE */}
              <div className="col-lg-12">
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

              {/* EMAIL */}
              <div className="col-lg-12">
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

              {/* BUTTON */}
              <div className="col-lg-12">
                <button
                  className="main-btn w-100"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <span>
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </CommonModal>
    </section>
  );
};

export default FullSliderSec;
