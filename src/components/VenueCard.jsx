// import React, { useState } from "react";
// import Image from "next/image";
// import venueImg from "@/images/venue.jpg";
// import rupeeIcon from "@/images/rupee-icon.svg";
// import strokeStarIcon from "@/images/stroke-star-icon.svg";
// import publicIcon from "@/images/public-icon.svg";
// import { Modal, Button } from "react-bootstrap";
// import VenueInner from "./VenueInner";
// import { useRouter } from "next/navigation";

// const VenueCard = ({ venue, setSelectedVenue, selectedVenue, clickable }) => {
//   const router = useRouter();
//   const [show, setShow] = useState(false);
//   console.log("venue", venue);

//   const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);
//   const handleShow = () => {
//     if (clickable) {
//       setSelectedVenue(venue);
//       return;
//     }
//     router.push(`/resources/venue/${venue?.slug}`);
//   };

//   return (
//     <>
//       <article
//         className={`venue-card ${
//           clickable && selectedVenue?.id === venue?.id ? "selected" : ""
//         }`}
//         onClick={handleShow}
//       >
//         <div className="venue-card-img">
//           {venue.image && (
//             <Image
//               src={venue.image}
//               alt="venue-card-img"
//               width={300}
//               height={300}
//             />
//           )}
//         </div>
//         <div className="venue-card-content">
//           <h3 className="venue-card-title">{venue?.name}</h3>
//           <div className="venue-card-info">
//             <div className="venue-card-info-item">
//               <Image src={rupeeIcon} alt="location-icon" />
//               <span>{venue?.price}</span>
//             </div>
//             <div className="venue-card-info-item">
//               <Image src={strokeStarIcon} alt="location-icon" />
//               <span>{venue?.rating}</span>
//             </div>
//             <div className="venue-card-info-item">
//               <Image src={publicIcon} alt="location-icon" />
//               <span>{venue?.capacity}</span>
//             </div>
//           </div>
//         </div>
//       </article>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         size="xl"
//         className="venue-modal"
//         centered
//       >
//         <Modal.Body>
//           <VenueInner handleClose={handleClose} />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default VenueCard;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import rupeeIcon from "@/images/rupee-icon.svg";
import strokeStarIcon from "@/images/stroke-star-icon.svg";
import publicIcon from "@/images/public-icon.svg";
import { Modal } from "react-bootstrap";
import VenueInner from "./VenueInner";
import { useRouter } from "next/navigation";

const VenueCard = ({
  venue,
  item,
  clickable,
  selectedVenue,
  selectedItem,
  onClick,
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const isItem = !!item;
  const data = isItem ? item : venue;

  const handleClick = () => {
    if (clickable) {
      onClick?.();
      return;
    }

    // if (!isItem) {
    //   router.push(`/resources/venue/${venue?.slug}`);
    // }
  };

  return (
    <>
      <article
        // className={`venue-card ${clickable && selectedVenue?.id === venue?.id
        //   ? "selected"
        //   : ""
        //   }`}
        className={`venue-card ${
          clickable &&
          (
            (isItem &&
              selectedItem?.id == item?.id) ||
        
            (!isItem &&
              selectedVenue?.id == venue?.id)
          )
            ? "selected"
            : ""
        }`}
        onClick={handleClick}
      >
        {/* ✅ IMAGE */}
        <div className="venue-card-img">
          {(data?.image ||
            data?.coverimage ||
            data?.image_url) && (
              <Image
                src={
                  data?.image ||
                  data?.coverimage ||
                  data?.image_url
                }
                alt={data?.name || data?.title}
                width={300}
                height={300}
              />
            )}
          {
            data?.is_featured && (
              <span className="tag">
                Featured
              </span>
            )
          }
        </div>

        {/* ✅ CONTENT */}
        <div className="venue-card-content">
          <h3 className="venue-card-title">
            {data?.name || data?.title}
          </h3>

          {/* ❌ Hide this for items */}
          {!isItem && (
            <div className="venue-card-info">
              <div className="venue-card-info-item">
                <Image src={rupeeIcon} alt="" />
                <span>
                  {venue?.price
                    ? venue.price
                    : venue?.price_min == 0 && venue?.price_max == 0
                      ? venue?.price_text
                      : `${venue?.price_min} - ${venue?.price_max}`}
                </span>
              </div>
              <div className="d-flex gap-5">
                <div className="venue-card-info-item">
                  <Image src={strokeStarIcon} alt="" />
                  <span>{venue?.rating}</span>
                </div>

                <div className="venue-card-info-item">
                  <Image src={publicIcon} alt="" />
                  <span>
                    {venue?.capacity ||
                      `${venue?.capacity_min} - ${venue?.capacity_max}`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered
        className="venue-modal"
      >
        <Modal.Body>
          <VenueInner handleClose={() => setShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VenueCard;
