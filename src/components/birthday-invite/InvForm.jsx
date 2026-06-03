import React from "react";
import Image from "next/image";
import cale from "@/images/cale.svg";
import time from "@/images/time.svg";
import loc from "@/images/loc.svg";
import selDrop from "@/images/sel-drop.svg";
import minusBtn from "@/images/minus-btn.svg";
import plusBtn from "@/images/plus-btn.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "@/app/helpers/api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvForm = ({ inviteId }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    attendance: Yup.string().required("Please select attendance"),
    kidsAttending: Yup.number().min(0).required("Number of kids is required"),
    adultsAttending: Yup.number()
      .min(1)
      .required("At least one adult must attend"),
    // lookingFor: Yup.string().required("Please select age group"),
  });

  const initialValues = {
    name: "",
    attendance: "attending",
    kidsAttending: 0,
    adultsAttending: 1,
    lookingFor: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      kids: values.kidsAttending,
      adults: values.adultsAttending,
      agegroup: values.lookingFor,
      isattending: values.attendance === "attending" ? "1" : "0",
      name: values.name,
      secret: inviteId,
    };
    try {
      await api.post(`/invite/contact`, data);
      resetForm();
      toast.success("RSVP submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast.error("Failed to submit RSVP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="sec-head medium text-center">
              Mark your <span>Presence</span>
            </h3>
            <ul className="pres-wrapper">
              <li>
                <Image src={cale} className="w-100 h-auto" alt="bg" />
                <span>4 February, 2025</span>
              </li>
              <li>
                <Image src={time} className="w-100 h-auto" alt="bg" />
                <span>10:00 AM</span>
              </li>
              <li>
                <Image src={loc} className="w-100 h-auto" alt="bg" />
                <span>Breakout, Koramangala</span>
              </li>
            </ul>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="d-flex align-items-center gap-4 justify-content-center">
                    <div className="radio-group d-flex align-items-center gap-4 justify-content-center">
                      <label className="radio-label b-radio">
                        <Field
                          type="radio"
                          name="attendance"
                          value="attending"
                          checked={values.attendance === "attending"}
                        />
                        <span className="main-btn dark-btn wide-sm">
                          I'll Be There
                        </span>
                      </label>
                      <label className="radio-label b-radio">
                        <Field
                          type="radio"
                          name="attendance"
                          value="not-attending"
                          checked={values.attendance === "not-attending"}
                        />
                        <span className="main-btn dark-btn wide-sm">
                          Sorry, Can't Make It
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="b-inv-form mt-5">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="input-group">
                            <Field name="name">
                              {({ field }) => (
                                <input {...field} placeholder="Name" />
                              )}
                            </Field>
                            {errors.name && touched.name && (
                              <div className="error">{errors.name}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="counter-wrapper">
                              <label>Kids Attending</label>
                              <div className="counter">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      "kidsAttending",
                                      Math.max(0, values.kidsAttending - 1)
                                    )
                                  }
                                >
                                  <Image src={minusBtn} alt="minus" />
                                </button>
                                <span>{values.kidsAttending}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      "kidsAttending",
                                      values.kidsAttending + 1
                                    )
                                  }
                                >
                                  <Image src={plusBtn} alt="plus" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="counter-wrapper">
                              <label>Adults Attending</label>
                              <div className="counter">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      "adultsAttending",
                                      Math.max(1, values.adultsAttending - 1)
                                    )
                                  }
                                >
                                  <Image src={minusBtn} alt="minus" />
                                </button>
                                <span>{values.adultsAttending}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      "adultsAttending",
                                      values.adultsAttending + 1
                                    )
                                  }
                                >
                                  <Image src={plusBtn} alt="plus" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="sec-head book-16 mt-3 mb-0">
                            <span>
                              An adult has to stay with the kids throughout the
                              party
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="select-group">
                              <Field as="select" name="lookingFor">
                                <option value="">Age Group of Kids</option>
                                <option value="0-2">0-2 years</option>
                                <option value="3-5">3-5 years</option>
                                <option value="6-10">6-10 years</option>
                                <option value="above10">Above 10 years</option>
                              </Field>
                              <Image src={selDrop} alt="arrowdown" />
                            </div>
                            {errors.lookingFor && touched.lookingFor && (
                              <div className="error">{errors.lookingFor}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="main-btn wide-sm center"
                          disabled={isSubmitting}
                        >
                          <span>
                            {isSubmitting
                              ? "Submitting..."
                              : "Accept the Invite"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvForm;
