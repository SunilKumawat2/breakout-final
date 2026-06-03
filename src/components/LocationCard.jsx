import React from "react";
import Image from "next/image";
import Link from "next/link";

const LocationCard = ({ location, isVirtual = false }) => {
  const href = isVirtual
  ? "/virtual"
  : `/${location.slug}`;
  return (
    // <Link href={`/location/${location.slug}`} className="location-card">
    //   <div className="location-card-img">
    //     {location.image && location.image != "" && (
    //       <Image
    //         src={location.image}
    //         width={500}
    //         height={500}
    //         alt={location.title}
    //       />
    //     )}
    //   </div>
    //   <div className="location-card-content">
    //     <h3>{location.title}</h3>
    //   </div>
    // </Link>
    <Link href={href} className="location-card">
    <div className="location-card-img">
      {location.image && location.image !== "" && (
        <Image
          src={location.image}
          width={500}
          height={500}
          alt={location.title}
        />
      )}
    </div>
    <div className="location-card-content">
      <h3>{location.title}</h3>
    </div>
  </Link>
  );
};

export default LocationCard;
