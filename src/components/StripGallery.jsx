import React from "react";
import Image from "next/image";
import strip from "@/images/strip.svg";

const StripGallery = ({ images }) => {
  return (
    <div className="strip-gallery">
      <div className="strip-wrapper">
        {[1, 2].map(
          () =>
            images &&
            images.length > 0 &&
            images.map((item, index) => (
              <div className="strip-photo" key={index}>
                <Image
                  src={strip}
                  className="photo-strip strip-1"
                  alt="strip"
                />
                <Image
                  src={strip}
                  className="photo-strip strip-2"
                  alt="strip"
                />
                <Image
                  src={item}
                  className="photo"
                  width={800}
                  height={800}
                  alt="strip"
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default StripGallery;
