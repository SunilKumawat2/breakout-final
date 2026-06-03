"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import OurLocationSec from "@/components/OurLocationSec";
const InnerPageBanner = dynamic(() => import("@/components/InnerPageBanner"));
const HmTextSec = dynamic(() => import("@/components/home/HmTextSec"));
const LogoSec = dynamic(() => import("@/components/LogoSec"));
const BlogSlider = dynamic(() => import("@/components/BlogSlider"));
import connectIllus from "@/images/connect-illus.svg";
import corpIllus from "@/images/money-illus.svg";
const Videotestimonials = dynamic(() => import("@/components/Videotestimonials"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
const PartyExpertCon = dynamic(() => import("@/components/PartyExpertCon"));
const AddOnsSlider = dynamic(() => import("@/components/AddOnsSlider"));
import peopleIllus from "@/images/contact-bottom-illus.svg";
import api from "@/helpers/api";
const GReviewSlider = dynamic(() => import("@/components/GReviewSlider"));
const TrustedSection = dynamic(() => import("@/components/TrustedSection"));
const PhotographicStyledImage = dynamic(() => import("@/components/PhotographicStyledImage"));
const ConnectContact = dynamic(() => import("@/components/ConnectContact"));
import Head from "next/head";

const page = () => {
  const router = useRouter();
  const page_type="corporate_L_N_D"
  const [corporate, setCorporate] = useState(null);
  const [brandLogos, setBrandLogos] = useState(null);
  const [innerList, setInnerList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show1, setShow1] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    const fetchCorporate = async () => {
      try {
        const [corporateRes, brandRes, innerRes] = await Promise.allSettled([
          api.get("corporate-ld-archive"),
          api.get("logos/brands"),
          api.get("corporate-ld-inner-list"),
        ]);
    
        if (corporateRes.status == "fulfilled") {
          setCorporate(corporateRes.value?.data?.data || null);
        }
    
        if (brandRes.status == "fulfilled") {
          setBrandLogos(brandRes.value?.data?.data || []);
        }
    
        if (innerRes.status == "fulfilled") {
          setInnerList(innerRes.value?.data?.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCorporate();
  }, []);



  // const handleFreeConsultationCardClick = (item) => {
  //   if (item.heading === "Free Consultation with Expert") {
  //     const section = document.getElementById("get-in-touch");
  //     section?.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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
      try {
        await submitResourceForm(values);

        // ✅ 🔥 ADD THIS (GTM EVENT)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit",
          form_name: "resource_form",
          user_email: values.email,
        });

        resetForm();
      } catch (error) {
        console.error("Form submission failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFreeConsultationCardClick = (item) => {
    const cleanHeading = item?.heading?.replace(/<[^>]*>/g, "");

    if (cleanHeading === "Free Consultation with Expert") {
      const section = document.getElementById("get-in-touch");
      section?.scrollIntoView({ behavior: "smooth" });
    }
    else if (cleanHeading.includes("Ebook")) {
      let link = "";

      if (cleanHeading == "Ebook - Why 88% of Training Fails") {
        link = "https://breakout.bvmwebsolutions.com/package-pdfs/Why_of_Training_Fails_And_How_to_Break_the_Cycle.pdf";
      }
      else if (cleanHeading == "Ebook - Exposing L&D’s Biggest Failures") {
        link = "https://breakout.bvmwebsolutions.com/package-pdfs/eBook_The_Illusion_of_Progress_Exposing_L&D_Biggest_Failures.pdf";
      }

      setSelectedLink(link);
      setShow1(true);
    }
    else if (cleanHeading == "Discovery Quiz") {
      router.push("/corporate/connect-l-n-d/discovery_quiz"); // ✅ navigation
    }
  };

  const submitResourceForm = async (values) => {
    try {
      toast.success("Form submitted successfully");

      setShow1(false);

      setTimeout(() => {
        if (selectedLink) {
          window.open(selectedLink, "_blank"); // ✅ open ebook
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
          href="https://breakout.in/corporate/connect-l-n-d"
        />
      </Head>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {corporate && corporate?.bannersection && (
              <InnerPageBanner banner={corporate?.bannersection} bdayInner={true} />
            )}
            <LogoSec
              className="pt-80"
              title="Brands that <span>loved M.A.G.I.C</span>"
              logos={brandLogos}
              link={false}
            />
            {corporate && corporate?.contentsection && (
              <HmTextSec text={corporate?.contentsection?.content} />
            )}

            <section className="">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="bday-text-wrap">
                      <p
                        className="underline-big-text"
                        dangerouslySetInnerHTML={{
                          __html: corporate?.contentsection?.note,
                        }}
                      />

                    </div>
                    {corporate?.contentsection?.footer && (
                      <p
                        className="sec-head medium-20 mt-5  "
                        dangerouslySetInnerHTML={{
                          __html: corporate.contentsection.footer,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="black-gr-div">
              {/* {corporate && corporate?.contentsection && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head"
                    dangerouslySetInnerHTML={{
                      __html: corporate?.contentsection?.heading,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )} */}

              {corporate &&
                corporate?.googlereviews &&
                corporate?.googlereviews?.length > 0 && (
                  <div className="section-padding pb-0">
                    <GReviewSlider
                      commonStars={false}
                      data={corporate?.googlereviews}
                    />
                  </div>
                )}

              {corporate && corporate?.countersection && (
                <TrustedSection className="pb-0" data={corporate?.countersection} />
              )}

              {/* 
        <section className="section-padding bday-count-sec pb-0">
          <div className="container">
            <div className="row row-gap-25">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-6" key={index}>
                  <CounterBox key={index} bday={false} />
                </div>
              ))}
            </div>
          </div>
        </section> */}

              {/* <PartyExpertCon /> */}

              <Image src={connectIllus} className={"illus-image"} alt="bday" />
            </div>

            <div className="black-gr-div">
              {innerList && innerList?.length > 0 && (
                <section className="sec-padding-top bday-sec">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html:
                              "<span>What problem</span> would you like to solve?",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row row-gap-25">
                      {/* {JSON.stringify(innerList)} */}
                      {innerList &&
                        innerList?.length > 0 &&
                        innerList?.map((bd, index) => (
                          <div className="col-lg-4 col-12" key={index}>
                            <Link
                              href={`/corporate/connect-l-n-d/${bd?.slug}`}
                              className="location-card"
                              onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                  event: "cta_click",
                                  button_name: bd?.title,
                                  destination: `/corporate/connect-l-n-d/${bd?.slug}`,
                                  page: window.location.pathname,
                                  section: "corporate_connect_lnd",
                                });
                              }}
                            >
                              <div className="location-card-img">
                                {bd?.bannersection?.image && (
                                  <Image
                                    src={bd?.bannersection?.image}
                                    alt={bd?.bannersection?.heading}
                                    width={700}
                                    height={700}
                                  />
                                )}
                              </div>

                              <div className="location-card-content">
                                <h3 dangerouslySetInnerHTML={{ __html: bd.title }} />
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}
              {corporate && corporate?.slidersection && (
                <AddOnsSlider className="pb-0 section-padding" data={corporate?.slidersection}
                  onClick={()=>sessionStorage.setItem("page_type", page_type)} />
              )}
              <PartyExpertCon title="<span>Add MAGIC</span> to your workplace" />

              <Image src={corpIllus} alt="illus3" className="illus-image" />
            </div>
            <div className="black-gr-div">
              {corporate?.keyresourcessection && (
                <section className="sec-padding-top">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head sm-head medium"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.keyresourcessection?.heading,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row row-gap-25">
                          {corporate?.keyresourcessection?.images &&
                            corporate?.keyresourcessection?.images?.length > 0 &&
                            corporate?.keyresourcessection?.images?.map(
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

              {/* <PartyExpertCon /> */}

              {corporate && corporate?.imagesection && (
                <>
                  <section className="section-padding pb-0">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <h3
                            className="sec-head sm-head medium"
                            dangerouslySetInnerHTML={{
                              __html: "<span>Capturing</span> Happiness",
                            }}
                          ></h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="photographic-styled-image-container">
                          {corporate?.imagesection?.image1 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image1}
                            />
                          )}
                          {corporate?.imagesection?.image2 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image2}
                            />
                          )}
                          {corporate?.imagesection?.image3 && (
                            <PhotographicStyledImage
                              image={corporate?.imagesection?.image3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {corporate &&
                corporate?.videotestimonials &&
                corporate?.videotestimonials?.length > 0 && (
                  <Videotestimonials data={corporate?.videotestimonials} />
                )}
              <OurLocationSec className="section-padding" title="Our <span>Locations</span>" />
              <FaqSection data={corporate?.faqsection} />
              <div id="get-in-touch">
                <ConnectContact
                  noTextBottom={false}
                  privacyLine={true}
                  noImage={true}
                  page_type="corporate_L_N_D"
                />
              </div>

              <BlogSlider className="pb-0" />
              <LogoSec className="pb-0 pt-80" title="In The <span>News</span>" />
              {corporate && corporate?.footersection && (
                <section className="section-padding pb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h3
                          className="sec-head medium sm-head"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.footersection?.heading,
                          }}
                        />
                        <div
                          className="para medium-20 mt-3"
                          dangerouslySetInnerHTML={{
                            __html: corporate?.footersection?.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <Image src={peopleIllus} className={"illus-image"} alt="bday" />
            </div>
          </>
        )
      }
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
