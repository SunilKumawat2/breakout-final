"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";
import axios from "axios";

const ResourceCard = ({ blog, blog_id,blog_type,blog_name }) => {

  const router = useRouter();
  const [show1, setShow1] = useState(false);
 console.log("blog_blog_blog",blog_type)
  const submitResourceForm = async (values) => {
    try {
      const payload = {
        user_name: values.name,
        user_phone_number: values.phone,
        resource_id: blog?.id,
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
            resourceId: blog?.id,
            resourceName: blog_name,
            resourceType: blog_type,
            pageUrl: window.location.href,
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
          resource_id: blog?.id,
        });
      } catch (watiErr) {
        console.log("WATI Error:", watiErr);
      }

      // ===== MAILCHIMP API =====
      try {
        await axios.post("/api/resources_mailchimp", {
          name: values.name,
          email: values.email,
          phone: values.phone,
          resource_id: blog?.id,
          tag: "resources"
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
      setShow1(false);

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

  if (!blog) return null;

  return (
    <>
      {/* CARD */}
      <article
        className="blog-card"
        // onClick={() => setShow1(true)}
        onClick={() => {
          const type = blog?.type?.trim().toLowerCase();

          if (type == "venue finder") {
            router.push(
              `/resources/quiz/party-finding?id=${blog?.id}&name=${encodeURIComponent(blog?.name)}&type=${encodeURIComponent(blog?.type)}&content=${blog?.content}&resource=${blog?.id}&blog_id=${blog_id}`
            );
            return;
          }

          if (type == "cost calculator") {
            router.push(
              `/resources/quiz/cost-calculator?id=${blog?.id}&name=${encodeURIComponent(blog?.name)}&type=${encodeURIComponent(blog?.type)}&content=${blog?.content}&resource=${blog?.id}&blog_id=${blog_id}`
            );
            return;
          }

          if (type == "breakout quote estimator") {
            router.push(
              `/resources/quiz/quote-calculator?category=birthday?id=${blog?.id}&name=${encodeURIComponent(blog?.name)}&type=${encodeURIComponent(blog?.type)}&content=${blog?.content}&resource=${blog?.id}`
            );
            return;
          }

          // normal modal
          setShow1(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="blog-card-img">
          {blog?.image && (
            <Image src={blog.image} width={700} height={700} alt="blog" />
          )}
        </div>

        <div className="blog-card-content">
          <p>{blog?.name}</p>
        </div>
      </article>

      {/* MODAL */}
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

export default ResourceCard;