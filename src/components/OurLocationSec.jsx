"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import locPlace from "@/images/loc-place.svg";
import wh from "@/images/wh.svg";
import Link from "next/link";
import Select from "react-select";
import { useGlobalContext } from "@/context/GlobalContext";
import api from "@/helpers/api";
import LocBefore from "@/images/loc-before.svg";

const OurLocationSec = ({ title, slug = null, locationTitle = "", className = "", }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationData, setLocationData] = useState(slug || null);
  const { escaperoomLocations } = useGlobalContext();
  const { siteSettings, loading } = useGlobalContext();

  console.log("siteSettings", siteSettings);
  useEffect(() => {
    if (escaperoomLocations) {
      setLocationOptions(
        escaperoomLocations?.map((item) => ({
          value: item?.slug,
          label: item?.title,
        }))
      );
      setSelectedLocation(slug || escaperoomLocations[0]?.slug);
      console.log("locationOptions", escaperoomLocations);
    }
  }, [escaperoomLocations, slug]);

  useEffect(() => {
    // const slugToFetch = slug || selectedLocation;
    if (selectedLocation) {
      const fetchLocation = async () => {
        const res = await api.get(`/escaperoom-location/${selectedLocation}`);
        console.log("banner section", res.data.data);
        setLocationData(res.data?.data?.locationdetails);
        console.log("setLocationData_setLocationData", res)
      };
      fetchLocation();
    }
  }, [selectedLocation]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "50px",
      padding: "8px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 0.3)",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
      color: state.isFocused ? "#FFAE00" : "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(255, 174, 0, 0.1)",
        color: "#FFAE00",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
      paddingLeft: "20px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
  };

  return (
    <section className={`loc-det-sec ${className}`} >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <h3
              className="sec-head medium text-center"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h3>
          </div>
          {locationOptions.length > 0 && (
            <div className="col-lg-4 col-12">
              <div className="loc-selector">
                <Select
                  value={
                    selectedLocation
                      ? locationOptions?.find(
                        (item) => item?.value === selectedLocation
                      )
                      : null
                  }
                  onChange={(e) => setSelectedLocation(e?.value)}
                  options={locationOptions}
                  styles={customStyles}
                  placeholder=" Select Location"
                />
                <Image src={LocBefore} alt="loc-before" />
              </div>
            </div>
          )}
          <div className="col-12">
            <div className="loc-det-box mt-0">
              <div className="row row-gap-25">
                <div className="col-lg-6 col-12">
                  <div className="loc-left">
                    <h3 className="sec-head medium-20 yellow-text">Timings</h3>
                    <p
                      className="para d-flex align-items-center justify-content-between"
                      dangerouslySetInnerHTML={{
                        __html: locationData?.timings,
                      }}
                    ></p>
                    <h3 className="sec-head medium-20 yellow-text">
                      Event Space
                    </h3>
                    {locationData?.eventspaces?.length > 0 &&
                      locationData?.eventspaces?.map((item, index) => (
                        <p
                          className="para"
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: `${item?.space_name} ${item?.style} ${item?.capacity} `,
                          }}
                        ></p>
                      ))}

                    <h3 className="sec-head medium-20 yellow-text">
                      Parking Information
                    </h3>
                    <p
                      className="para"
                      dangerouslySetInnerHTML={{
                        __html: locationData?.parking_info,
                      }}
                    ></p>
                    {locationData?.parking_video_link !== "" && (
                      <p className="para">
                        <Link
                          href={locationData?.parking_video_link || "#"}
                          className="link-btn"
                          target="_blank"
                        >
                          View Parking Video
                        </Link>{" "}
                        for detailed guidance.
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="loc-right">
                    <h3 className="sec-head medium-20 yellow-text">
                      Location:
                    </h3>
                    <p
                      className="para"
                      dangerouslySetInnerHTML={{
                        __html: locationData?.address,
                      }}
                    ></p>
                    <Link
                      href={`https://wa.me/${siteSettings?.whatsappNumber}?text=I want to book a slot at ${locationTitle}`}
                      className="wh-wrap"
                      target="_blank"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "cta_click",
                          button_name: "WhatsApp Contact",
                          action_type: "whatsapp_click",
                          link_url: `https://wa.me/${siteSettings?.whatsappNumber}`,
                          location: locationTitle,
                          page: window.location.pathname,
                          section: "whatsapp_cta",
                        });
                      }}
                    >
                      <Image src={wh} alt="" />
                      <span>Contact Us</span>
                    </Link>
                    <div className="loc-map-wrap">
                      {locationData?.map_location_url !== "" ? (
                        <iframe
                          key={locationData?.map_location_url} // Force remount when src changes
                          src={locationData?.map_location_url || "#"}
                          width={600}
                          height={450}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      ) : (
                        <>
                          <Image src={locPlace} alt="" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocationSec;
