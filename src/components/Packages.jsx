"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import cross from "@/images/cross.svg";
import check from "@/images/check.svg";
import Link from "next/link";
import keyImg from "@/images/key.svg";
import { CommonModal } from "@/components/CommonModal";
import { useRouter } from "next/navigation";


const Packages = ({ packages, hasEventImg = false,pagecategory="", category = "", data = {}, className = "" }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [modalType, setModalType] = useState("both");
  // ✅ SAVE CATEGORY IN SESSION STORAGE
  useEffect(() => {
    if (category) {
      sessionStorage.setItem("selected_category", category);
    }
  }, [category]);

  console.log("data_data_data", category);

  const renderCol = (col) => {
    // Check for special Yes:n or No:n syntax
    let match = /^(\s*(Yes|No)\s*):\s*(\d+)\s*$/i.exec(col);
    if (match) {
      const type = match[2].toLowerCase();
      const count = parseInt(match[3]);
      return (
        <div className="package-row-cell">
          {Array.from({ length: count }).map((_, idx) =>
            type === "yes" ? (
              <Image key={idx} className="yes-icon" src={check} alt="Red Carpet" />
            ) : (
              <Image key={idx} src={cross} alt="Red Carpet" />
            )
          )}
        </div>
      );
    }
    if (col === "Yes") {
      return (
        <div className="package-row-cell">
          <Image src={check} alt="Red Carpet" className="yes-icon" />
        </div>
      );
    }
    if (col === "No") {
      return (
        <div className="package-row-cell">
          <Image src={cross} alt="Red Carpet" />
        </div>
      );
    }

    return (
      <div className="package-row-cell">
        <h3 dangerouslySetInnerHTML={{ __html: col }}></h3>
      </div>
    );
  };

  // const renderButton = (col) => {
  //   return (
  //     <div className="package-row-cell">
  //       <Link href={col || "#"} className="main-btn " target="_blank">
  //         <span>Know More</span>
  //       </Link>
  //     </div>
  //   );
  // };
  const renderButton = () => {
    return (
      <div className="package-row-cell">
        <button
          className="main-btn"
          onClick={() => {
            router.push("/corporate/unwind#breakout-form");
          }}
        >
          <span>Know More</span>
        </button>
      </div>
    );
  };

  let gridCol = "";

  switch (packages?.pricing?.columns?.length) {
    case 1:
      gridCol = "1.3fr 1fr 1fr 1fr";
      break;
    case 2:
      gridCol = "1.3fr 1fr 1fr";
      break;
    case 3:
      gridCol = "1.3fr 1fr 1fr 1fr";
      break;
    case 4:
      gridCol = "1.3fr 1fr 1fr 1fr 1fr";
      break;
    case 5:
      gridCol = "1.3fr 1fr 1fr 1fr 1fr";
      break;

    default:
      gridCol = "1.3fr 1fr 1fr 1fr";
      break;
  }

  const modifiedNote = packages?.note
    ?.replace(
      "Click here",
      `<span class="open-compare" style="cursor:pointer; text-decoration:underline;">Click here</span>`
    )
    ?.replace(
      "Quote Calculator",
      `<span class="open-quote" style="cursor:pointer; text-decoration:underline;">Quote Calculator</span>`
    );


  return (
    <section className={`section-padding ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="sec-head medium sm-head" dangerouslySetInnerHTML={{ __html: packages?.heading || "Packages", }}></h3>
            {packages?.description && (
              <p className="para" dangerouslySetInnerHTML={{ __html: packages?.description }}></p>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-package-container">
            {/* <--------- New Package Conatainer-----------> */}
            <div className="package-container mobile-only">
              {packages?.pricing?.columns?.length > 0 && (
                <div
                  className={`package-header mt-0`}
                  style={{ gridTemplateColumns: gridCol }}
                >
                  <div className="package-header-cell w-100 d-flex">
                    {hasEventImg ? (
                      <Image src={keyImg} width={80} height={80} alt={"key"} />
                    ) : (
                      <h3>Event Flow</h3>
                    )}
                  </div>

                </div>
              )}
              {packages?.pricing?.rows?.length > 0 && (
                <div className="package-body">
                  {packages?.pricing?.rows?.map((row, index) => {
                    if (row?.feature == "buttons") {
                      return (
                        <div
                          className="package-row"
                          key={index}
                          style={{ gridTemplateColumns: gridCol }}
                        >
                          <div className="package-row-cell w-100 d-block">
                            <h3></h3>
                          </div>
                          {/* {row?.col0 &&
                            row?.col0 != "" &&
                            renderButton(row?.col0)}
                          {row?.col1 &&
                            row?.col1 != "" &&
                            renderButton(row?.col1)}
                          {row?.col2 &&
                            row?.col2 != "" &&
                            renderButton(row?.col2)}
                          {row?.col3 &&
                            row?.col3 != "" &&
                            renderButton(row?.col3)}
                          {row?.col4 &&
                            row?.col4 != "" &&
                            renderButton(row?.col4)} */}
                        </div>
                      );
                    }
                    return (
                      <div
                        className="package-row"
                        key={index}
                        style={{ gridTemplateColumns: gridCol }}
                      >
                        <div className="package-row-cell w-100 d-block">
                          <h3
                            dangerouslySetInnerHTML={{ __html: row?.feature }}
                          ></h3>
                        </div>
                      </div>

                    );
                  })}
                </div>
              )}
            </div>
            <div className="package-container">
              {packages?.pricing?.columns?.length > 0 && (
                <div
                  className={`package-header mt-0`}
                  style={{ gridTemplateColumns: gridCol }}
                >
                  <div className="package-header-cell">
                    {hasEventImg ? (
                      <Image src={keyImg} width={80} height={80} alt={"key"} />
                    ) : (
                      <h3>Event Flow</h3>
                    )}
                  </div>
                  {packages?.pricing?.columns?.map((col, index) => (
                    <div className="package-header-cell" key={index}>
                      {col?.image && (
                        <Image
                          src={col?.image}
                          width={40}
                          height={40}
                          alt={col?.title}
                          className="mb-2"
                        />
                      )}
                      <h3 dangerouslySetInnerHTML={{ __html: col?.title }}></h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: col?.duration }}
                      ></p>
                    </div>
                  ))}
                </div>
              )}
              {packages?.pricing?.rows?.length > 0 && (
                <div className="package-body">
                  {packages?.pricing?.rows?.map((row, index) => {
                    if (row?.feature == "buttons") {
                      return (
                        <div
                          className="package-row"
                          key={index}
                          style={{ gridTemplateColumns: gridCol }}
                        >
                          <div className="package-row-cell">
                            <h3></h3>
                          </div>
                          {row?.col0 &&
                            row?.col0 != "" &&
                            renderButton(row?.col0)}
                          {row?.col1 &&
                            row?.col1 != "" &&
                            renderButton(row?.col1)}
                          {row?.col2 &&
                            row?.col2 != "" &&
                            renderButton(row?.col2)}
                          {row?.col3 &&
                            row?.col3 != "" &&
                            renderButton(row?.col3)}
                          {row?.col4 &&
                            row?.col4 != "" &&
                            renderButton(row?.col4)}
                        </div>
                      );
                    }
                    return (
                      <div
                        className="package-row"
                        key={index}
                        style={{ gridTemplateColumns: gridCol }}
                      >
                        <div className="package-row-cell">
                          <h3
                            dangerouslySetInnerHTML={{ __html: row?.feature }}
                          ></h3>
                        </div>
                        {row?.col0 && row?.col0 != "" && renderCol(row?.col0)}
                        {row?.col1 && row?.col1 != "" && renderCol(row?.col1)}
                        {row?.col2 && row?.col2 != "" && renderCol(row?.col2)}
                        {row?.col3 && row?.col3 != "" && renderCol(row?.col3)}
                        {row?.col4 && row?.col4 != "" && renderCol(row?.col4)}
                      </div>

                    );
                  })}
                </div>
              )}
            </div>

          </div>
          <div className="package-yellow-text">
            {packages?.note && (
              // <p
              //   className="yellow-text para mb-0"
              //   dangerouslySetInnerHTML={{ __html: packages?.note }}
              //   onClick={() => setShow(true)}
              //   style={{ cursor: "pointer" }}
              // ></p>
              <p
                className="yellow-text para mb-0"
                dangerouslySetInnerHTML={{ __html: modifiedNote }}
                onClick={(e) => {
                  if (e.target.classList.contains("open-compare")) {
                    setModalType("both");
                    setShow(true);
                  }
                  if (e.target.classList.contains("open-quote")) {
                    setModalType("quote");
                    setShow(true);
                  }
                }}
              ></p>

            )}
            {/* {
                (category == "birthday" || category == "corporate") && (
                  <Link
                    href="#"
                    className="main-btn dark-btn"
                    onClick={() => setShow1(true)}
                  >
                    <span>T&C Apply</span>
                  </Link>
                )
              } */}

            <Link
              href="#"
              className="main-btn dark-btn"
              onClick={() => setShow1(true)}
            >
              <span>T&C Apply</span>
            </Link>


          </div>
        </div>
      </div>
      {
        data && Object.keys(data)?.length > 0 ? (
          <CommonModal show={show1} handleClose={() => setShow1(false)}>
            <div className="esc-modal-content">
              <h3 className="sec-head h3 yellow-text">{data?.title}</h3>
              <p className="para mt-4 sm" dangerouslySetInnerHTML={{
                __html: data?.content
              }} />


              {/* <Link href={"#"} className="main-btn">
        <span>Book Now</span>
      </Link> */}
            </div>
          </CommonModal>
        ) : (
          <CommonModal show={show1} handleClose={() => setShow1(false)}>
            <div className="esc-modal-content">
              <h3 className="sec-head h3 yellow-text">Terms and Conditions</h3>
              <p className="para mt-4 sm">
                <strong>1. Booking Confirmation Requirement:</strong> To ensure
                entry to your escape room experience, a booking confirmation email
                is mandatory. If you have not received this email after payment,
                please contact our support team for assistance. Without the
                confirmation, entry cannot be guaranteed, but we will do our best to
                accommodate you based on availability or issue a refund if
                necessary.
                <br />
                <br />
                <strong>2. Arrival Time:</strong> All team members must arrive at
                least 20 minutes before the scheduled slot time to allow for form
                filling, considering the 3 Ps: Parking time, Peeing time, and the
                Painful Bangalore traffic.  <br />
                <br />
                <strong>3. Liability Form:</strong> A liability form must be
                completed at the facility. Incomplete forms will result in denial of
                entry by the Game Master, except for individuals aged 13 years and
                below.  <br />
                <br />
                <strong>4. Game Time Reduction:</strong> If you are late for the
                experience, your game time will be cut short accordingly.  <br />
                <br />
                <strong>5. Entry Restriction:</strong> If you arrive after your slot
                timing, entry will be restricted to prevent delays for subsequent
                teams. However, if you arrive within 10 minutes of your slot time,
                we will make every effort to accommodate you.  <br />
                <br />
                <strong>6. No Cancellation and Refund Policy:</strong> Please note
                that we have a strict no-cancellation and no-refund policy for
                bookings.
              </p>
              {/* <Link href={"#"} className="main-btn">
        <span>Book Now</span>
      </Link> */}
            </div>
          </CommonModal>
        )
      }


      <CommonModal show={show} handleClose={() => setShow(false)}>
        <div className="esc-modal-content">
          <h3 className="sec-head h3 yellow-text">Get a Quote</h3>
          <p className="para mt-4">
            Get an Instant Quote for Your Package –{" "}
            <Link
              href={`/resources/quiz/quote-calculator?category="birthday"?content=${category}`}
              className=" yellow-text"
            >
              <span>Click Here</span>
            </Link>
          </p>
          {modalType == "both" && (
            <p className="para mt-4">
              Download Comparative Packages PDF –{" "}
              {
                category == "birthday-party" && (
              <a
                href="https://breakout.bvmwebsolutions.com/package-pdfs/Birthday_Package_PDF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-text"
              >
                <span>Click Here</span>
              </a>
                )
              }
                {
                category == "bachelor-package" && (
              <a
                href="https://breakout.bvmwebsolutions.com/package-pdfs/Breakout_Bachelorette_Package.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-text"
              >
                <span>Click Here</span>
              </a>
                )
              }
               {
                category == "farewell-package" && (
              <a
                href="https://breakout.bvmwebsolutions.com/package-pdfs/Breakout_Farewell_package_No_Price.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-text"
              >
                <span>Click Here</span>
              </a>
                )
              }
                 {
                category == "corporate-package" && (
              <a
                href="https://breakout.bvmwebsolutions.com/package-pdfs/Corporate_Package_PDF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-text"
              >
                <span>Click Here</span>
              </a>
                )
              }
              {
                category == "couple-package" && (
              <a
                href="https://breakout.bvmwebsolutions.com/package-pdfs/Breakout_couple_brochure_Packages_No_price.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-text"
              >
                <span>Click Here</span>
              </a>
                )
              }
            </p>
          )}
        </div>
      </CommonModal>
    </section>
  );
};

export default Packages;
