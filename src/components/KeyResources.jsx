import React, { useState } from 'react'
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Image from "next/image";

const KeyResources = (data = {}) => {
    const [show1, setShow1] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    console.log("KeyResources_KeyResources", data?.data)
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

        if (cleanHeading == "Free Consultation with Expert") {
            const section = document.getElementById("get-in-touch");
            section?.scrollIntoView({ behavior: "smooth" });
        }
        else if (cleanHeading.includes("Ebook")) {

            let link = "";

            if (cleanHeading == "Ebook - Why 88% of Training Fails") {
                link = "https://1drv.ms/b/c/033f28a2603d05d2/IQBMuwcPxoSpRLSMZOUTNQbkAZ5gYVsaWqjJ2puTzVDgrbI?e=8ce5YQ";
            }
            else if (cleanHeading == "Ebook - Exposing L&D’s Biggest Failures") {
                link = "https://1drv.ms/b/c/033f28a2603d05d2/IQALhxqdOD3vSqqg-OajZ9_NAaXFzWRLWLPkFaiCnx0n93U?e=pPK76A2";
            }

            setSelectedLink(link); // ✅ store link
            setShow1(true);        // ✅ open modal
        }
    };

    const submitResourceForm = async (values) => {
        try {
            console.log(values);

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
            <div className="black-gr-div">
                {data?.data && (
                    <section className="sec-padding-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h3
                                        className="sec-head sm-head medium"
                                        dangerouslySetInnerHTML={{
                                            __html: data?.data?.heading,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row row-gap-25">
                                        {data?.data?.images &&
                                            data?.data?.images?.length > 0 &&
                                            data?.data?.images?.map(
                                                (item, index) => (
                                                    <div className="col-lg-3 col-12" key={index}>
                                                        <div className="blog-card" onClick={() => handleFreeConsultationCardClick(item)}>
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
    )
}

export default KeyResources
