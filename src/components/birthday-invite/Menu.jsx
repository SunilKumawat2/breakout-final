import React from "react";
import veg from "@/images/veg.svg";
import nonveg from "@/images/non-veg.svg";
import Image from "next/image";

const Menu = ({ data, className = "" }) => {
  const img = (color) => {
    if (color == "red") {
      return nonveg;
    } else if (color == "green") {
      return veg;
    }
    return veg;
  };
  return (
    <div className={`sec-padding-top ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="sec-head medium mb-5"
              dangerouslySetInnerHTML={{
                __html: data?.heading,
              }}
            >
              {/* What’s on the <span>Menu?</span> */}
            </h3>
          </div>
        </div>
        <div className="row justify-content-between row-gap-25 pb-5 mt-5">
          {data?.cards?.map((item, index) => (
            <div className="col-lg-6 col-12" key={index}>
              <div className="menu-item">
                {item.color && <Image src={img(item.color)} alt="veg" />}
                <h3
                  className="sec-head medium-20 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: item.heading,
                  }}
                >
                  {/* Pasta in Red Sauce */}
                </h3>
                <p
                  className="sec-head book-20"
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                >
                  {/* Lorem ipsum dolor sit amet consectetur. */}
                </p>
                <p className="para">
                  <span>Allergens: </span>
                  {item?.note && item?.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center pt-80">
          <div className="col-lg-10 text-center col-12">
            <h3
              className="sec-head medium-20 mb-3"
              dangerouslySetInnerHTML={{
                __html: data?.description1,
              }}
            >
              {/* Allergies & <span>Dietary Restriction</span> */}
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: data?.description2,
              }}
            >
              {/* Please contact your party coordinator on whatsapp or call for any
              queries on allergens */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
