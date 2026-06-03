import React from "react";
import Image from "next/image";
import cross from "@/images/cross.svg";
import check from "@/images/check.svg";
import Link from "next/link";
import PartyExpertCon from "@/components/PartyExpertCon";

const Packages = ({ packages, category, capacity }) => {

  const handlerefresh = () => {
    window.location.reload();
  };
  console.log("category_category", category)
  // ✅ Go back to previous page (last page where user came from)
  const handleKnowMore = () => {
    window.history.back();
  };

  const formatPrice = (value) => {
    if (!value) return 0;
    return Number(value).toLocaleString("en-IN");
  };

  const sortedPackages = [...(packages || [])].sort((a, b) => {
    const priceA = Number(a?.offerAmount || a?.totalAmount || 0);
    const priceB = Number(b?.offerAmount || b?.totalAmount || 0);
  
    return priceB - priceA; // Highest to Lowest
  });

  if (category === "birthday" && capacity < 8) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec-head medium">
                There is no package available for this event
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-padding pt-0 pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              {packages && packages?.length > 0 ? (
                <div className="package-container">
                  <div
                    className="package-header"
                    style={{ gridTemplateColumns: "1fr 0.7fr" }}
                  >
                    <div className="package-header-cell">
                      <h3 className="mb-0 text-center">Packages</h3>
                    </div>
                    <div className="package-header-cell">
                      <h3 className="mb-0">Pricing</h3>
                    </div>


                  </div>

                  <div className="package-body">
                    {sortedPackages?.map((item, index) => (
                      <div
                        className="package-row"
                        style={{ gridTemplateColumns: "1fr 0.7fr" }}
                        key={index}
                      >
                        <div className="package-row-cell">
                          <h3>{item?.name}</h3>
                        </div>
                        <div className="package-row-cell">
                          {/* <p className="sec-head medium-20 mb-0">
                            <span>₹</span> {item?.totalAmount}
                          </p> */}
                          <div>
                            {/* 🔥 OFFER PRICE */}
                            {/* <p className="sec-head medium-20 mb-0">
                              <span>₹</span> {item?.offerAmount || item?.totalAmount}
                            </p> */}
                            <p className="sec-head medium-20 mb-0">
                              <span>₹</span> {formatPrice(item?.offerAmount || item?.totalAmount)}
                            </p>

                            {/* 🔥 ORIGINAL PRICE (cut) */}
                            {item?.offerAmount && item?.offerAmount !== item?.totalAmount && (
                              // <p
                              //   style={{
                              //     textDecoration: "line-through",
                              //     opacity: 0.6,
                              //     fontSize: "14px",
                              //     margin: 0,
                              //   }}
                              // >
                              //   ₹{item?.totalAmount}
                              // </p>
                              <p
                                style={{
                                  textDecoration: "line-through",
                                  opacity: 0.6,
                                  fontSize: "14px",
                                  margin: 0,
                                }}
                              >
                                ₹{formatPrice(item?.totalAmount)}
                              </p>
                            )}

                            {/* 🔥 YOU SAVE */}
                            {item?.complimentaryAmount > 0 && (
                              // <p
                              //   style={{
                              //     color: "#28a745",
                              //     fontSize: "13px",
                              //     margin: 0,
                              //     fontWeight: "500",
                              //   }}
                              // >
                              //   You save ₹{item?.complimentaryAmount}
                              // </p>
                              <p
                                style={{
                                  color: "#28a745",
                                  fontSize: "13px",
                                  margin: 0,
                                  fontWeight: "500",
                                }}
                              >
                                You save ₹{formatPrice(item?.complimentaryAmount)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {
                    category == '"birthday"?content=corporate-package' && (
                      <h5 className="mt-3">Prices are indicative and including GST. T&C apply.</h5>
                    )
                  }
                  {
                    category == '"birthday"?content=birthday-party' && (
                      <h5 className="mt-3">Celebrate with an exclusive private party experience — just for you and your guests. Prices are indicative. GST extra. T&C apply.</h5>
                    )
                  }
                  {
                    category == '"birthday"?content=bachelor-package' && (
                      <h5 className="mt-3">Celebrate with an exclusive private party experience — just for you and your guests. Prices are indicative. GST extra. T&C apply.</h5>
                    )
                  }
                  {
                    category == '"birthday"?content=farewell-package' && (
                      <h5 className="mt-3">Celebrate with an exclusive private party experience — just for you and your guests. Prices are indicative. GST extra. T&C apply.</h5>
                    )
                  }
                  {
                    category == '"birthday"?content=couple-package' && (
                      <h5 className="mt-3">An exclusive private experience for couples — no other participants will be grouped with you. Indicative pricing. GST extra. T&C apply.</h5>
                    )
                  }
                  <div className="col-12 d-flex gap-4 mt-40 justify-content-center">
                    <button className="main-btn sm" onClick={handlerefresh}>
                      <span>Retake Quiz</span>
                    </button>
                    <button className="main-btn sm" onClick={handleKnowMore}>
                      <span>Know More</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="package-container">
                  <div className="package-header py-5">
                    <h3 className="mb-0 text-center sec-head medium-20">
                      {/* No packages found
                       */}
                      Enjoy our immersive escape rooms—and if you're looking for something more,
                      just reach out to a party expert!
                      <span className="m-2">
                        <a
                          href="https://breakout.bvmwebsolutions.com/package-pdfs/Breakout_Escape_Room_booklet.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: "pointer", textDecoration: "underline" }}
                        >
                          Click here
                        </a>
                      </span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {
        category == '"birthday"?content=corporate-package' ? (
          <PartyExpertCon className="pt-80" data="corporate" />

        ) : (
          <PartyExpertCon className="pt-80" data="birthday" />

        )
      }
      <section className="sec-padding-top text-center pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec-head medium">

                <span>Out of Budget?</span> Try out our crazy escape rooms!
              </h2>
            </div>
            <Link href="/escape-rooms" className="center main-btn mt-3">
              <span>{"Escape Rooms"}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Packages;
