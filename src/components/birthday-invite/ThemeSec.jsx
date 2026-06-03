import React from "react";
import Image from "next/image";

const ThemeSec = ({ data, className = "" }) => {
  return (
    <section className={`pt-80 pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="b-theme-con">
              <p className="sec-head book-20">We’re hosting a</p>
              <h3
                className="sec-head medium"
                dangerouslySetInnerHTML={{
                  __html: data?.heading2,
                }}
              >
                {/* <span>Harry Potter</span> themed party! */}
              </h3>
              <p
                className="para mt-4"
                dangerouslySetInnerHTML={{
                  __html: data?.description2,
                }}
              >
                {/* Get ready to immerse yourself in a world of fun, adventure, and
                excitement as we bring to life the theme. */}
              </p>
              <h3 className="sec-head medium mt-5">
                Add to the <span>fun with outfits</span>
              </h3>
              <p className="para mt-4">
                Be creative and dress the part with our requested color scheme
              </p>
              <div className="b-theme-colors">
                {data?.outfitscolors?.map((item, index) => (
                  <div className="b-theme-color-card" key={index}>
                    <span
                      className="b-theme-color"
                      style={{ backgroundColor: item.color_code }}
                    ></span>
                    <p
                      className="para"
                      dangerouslySetInnerHTML={{
                        __html: item.color_name,
                      }}
                    >
                      {/* Shades of
                      <span>Red</span> */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="b-theme-img-wrapper">
              <div className="b-theme-img">
                {data?.image2 && (
                  <Image
                    src={data?.image2}
                    width={500}
                    height={500}
                    alt="theme"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeSec;
