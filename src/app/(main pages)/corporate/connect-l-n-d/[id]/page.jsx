"use client";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import Banner from "@/components/escape-room/Banner";
import api from "@/app/helpers/api";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import marketingIllus from "@/images/marketing-illus.svg";
import Link from "next/link";
const ConnectContact = dynamic(() => import("@/components/ConnectContact"));
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Head from "next/head";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [activities, setActivities] = useState(null);
  const [show1, setShow1] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchEscapeRooms = async () => {
      const res = await api.get(`/escaperooms`);
      setEscapeRooms(res.data.data);
    };
    fetchEscapeRooms();

    const fetchEscapeRoom = async () => {
      const res = await api.get(`/corporate-ld-inner/${id}`);
      setRoom(res.data.data);
    };
    fetchEscapeRoom();

    const fetchActivities = async () => {
      const res = await api.get(`/activity-listing`);
      setActivities(res.data.data);
    };
    fetchActivities();
  }, [id]);

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

  const handleFreeConsultationCardClick = (item) => {
    const cleanHeading = item?.heading?.replace(/<[^>]*>/g, "");
    if (cleanHeading == "Free Consultation With Expert") {
      const section = document.getElementById("get-in-touch");
      section?.scrollIntoView({ behavior: "smooth" });
    }
    else if (cleanHeading.includes("Ebook")) {
      let link = "";

      if (cleanHeading == "Ebook - Why 88% of Training Fails") {
        link = "https://breakout.bvmwebsolutions.com/public/assets/package-pdfs/Why_of_Training_Fails_And_How_to_Break_the_Cycle.pdf";
      } 
      else if (cleanHeading == "Ebook - Exposing L&D’s Biggest Failures") {
        link = "https://breakout.bvmwebsolutions.com/public/assets/package-pdfs/eBook _ The_Illusion_of_Progress_ Exposing_L&D_Biggest_Failures.pdf";
      }
      setSelectedLink(link);
      setShow1(true);
    }
    else if (cleanHeading == "Discovery Quiz") {
      router.push(`/corporate/connect-l-n-d/${id}/discovery_quiz`); // ✅ navigation
    }
  };

  const submitResourceForm = async (values) => {
    try {
      toast.success("Form submitted successfully");
      setShow1(false);
      setTimeout(() => {
        if (selectedLink) {
          window.open(selectedLink, "_blank"); 
        }
      }, 800);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <Head>
        <link
          rel="canonical"
          href={`https://breakout.in/corporate/connect-l-n-d/${id}`}
        />
      </Head>
      <div className="black-gr-div">
        {room?.bannersection && <Banner corporate={true} room={room} />}

        {room?.contentsection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: room?.contentsection?.content,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {room && room?.imagecardsection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb-40">
                  <div
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.imagecardsection?.heading,
                    }}
                  />
                  <div
                    className="para mt-4"
                    dangerouslySetInnerHTML={{
                      __html: room?.imagecardsection?.description,
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4 row-gap-25">
                {/* {JSON.stringify(activities)} */}
                {room &&
                  room.imagecardsection.images?.length > 0 &&
                  room.imagecardsection.images?.map((item, index) => {
                    return (
                      <div className="col-lg-4 col-12" key={index}>
                        <Link
                          href={`${item?.link}`}
                          target="_blank"
                          className="location-card text-sm"
                          onClick={() => {
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              event: "cta_click",
                              button_name: item?.title,
                              destination: `/activities/${item?.slug}`,
                              page: window.location.pathname,
                              section: "activities_cards",
                            });
                          }}
                        >
                          <div className="location-card-img">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                alt={item?.title || "activities"}
                                width={500}
                                height={500}
                              />
                            )}
                          </div>

                          <div className="location-card-content">
                            <h3 className="sec-head sm-head medium">
                              {item?.heading}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {room && room?.pointssection && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.pointssection?.heading,
                    }}
                  />
                  <div
                    className="para mt-4"
                    dangerouslySetInnerHTML={{
                      __html: room?.pointssection?.description,
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                {room?.pointssection?.points &&
                  room?.pointssection?.points?.length > 0 && (
                    <ul className="point-list-img">
                      {room?.pointssection?.points?.map((item, index) => {
                        return (
                          <li className="point-item" key={index}>
                            <div className="point-item-content d-flex align-items-center
                             gap-2 ">
                              {item?.image && (
                                <Image
                                  src={item?.image}
                                  alt={item?.heading}
                                  width={30}
                                  height={30}
                                />
                              )}
                              <h3 className="sec-head medium-20 mb-0">
                                <span>{item?.heading}</span>
                              </h3>
                            </div>
                            <p
                              className="para mt-3"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
            </div>
          </section>
        )}

        {/* <HomeContact
          noTextBottom={false}
          noTextTop={true}
          noImage={true}
          privacyLine={true}
        /> */}
        <div id="get-in-touch">
        <ConnectContact
          noTextBottom={false}
          noTextTop={true}
          privacyLine={true}
          noImage={true}
        />
        </div>
        {room?.keyresourcessection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.keyresourcessection?.heading,
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row row-gap-25">
                    {room?.keyresourcessection?.images &&
                      room?.keyresourcessection?.images?.length > 0 &&
                      room?.keyresourcessection?.images?.map(
                        (item, index) => (
                          <div className="col-lg-3 col-12" key={index}>
                            <div className="blog-card"
                              onClick={() => handleFreeConsultationCardClick(item)}>
                              <div className="blog-card-img">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt={item.heading}
                                    width={500}
                                    height={500}
                                  />
                                )}
                              </div>
                              <div className="blog-card-content">
                                <h3 style={{ fontSize: "16px", }}
                                  dangerouslySetInnerHTML={{
                                    __html: item.heading,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


        <Image src={marketingIllus} className="illus-image" alt="hm-text-bg" />
      </div>

      <CommonModal show={show1} handleClose={() => setShow1(false)}>
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
    </>
  );
};

export default page;
