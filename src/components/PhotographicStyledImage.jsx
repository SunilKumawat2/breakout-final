import React from "react";
import Image from "next/image";

const PhotographicStyledImage = ({ image = null }) => {
  return (
    <div className="photographic-styled-image">
      <div className="outer">
        <div className="image-container">
          {image && <Image src={image} width={800} height={800} alt={""} />}
        </div>
      </div>
    </div>
  );
};

export default PhotographicStyledImage;
