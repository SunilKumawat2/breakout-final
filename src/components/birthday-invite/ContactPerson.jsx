import React from "react";
import Image from "next/image";
import Link from "next/link";
import contactPerson from "@/images/contact-person.png";
import phone from "@/images/phone-icon.svg";
const ContactPerson = ({ data, className = "" }) => {
  return (
    <section className={`contact-person section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="contact-person-content">
              <div className="row row-gap-25 align-items-center justify-content-between">
                <div className="col-lg-3 col-12">
                  <div className="contact-person-img">
                    {data?.image && (
                      <Image
                        src={data?.image}
                        alt="contact-person"
                        width={500}
                        height={500}
                      />
                    )}
                    {/* <Image src={contactPerson} alt="contact-person" /> */}
                  </div>
                </div>
                <div className="col-lg-8 col-12">
                  <p className="sec-head book-20">Your Party Coordinator</p>
                  <div className="d-flex gap-4 align-items-start">
                    <h3 className="sec-head medium">
                      <span>{data?.name}</span>
                    </h3>
                    <Link
                      href={`tel:${data?.phone || "#"}`}
                      className="ph-linkk"
                    >
                      <Image src={phone} alt="whatsapp" />
                      <span>{data?.phone}</span>
                    </Link>
                  </div>
                  <p className="para mt-1 mb-2">
                    {data?.name} will host the event for you.
                  </p>
                  <p className="para">
                    Contact us on call or whatsapp for any queries or
                    assistance.
                  </p>
                  {data?.whatsapp_group_link && (
                    <Link
                      href={data?.whatsapp_group_link || "#"}
                      className="main-btn wide-sm mt-4"
                    >
                      <span>Join WhatsApp Group</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPerson;
