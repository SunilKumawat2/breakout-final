// "use client";
// import React, { useRef } from "react";
// import swiperPrev from "@/images/chev-left.svg";
// import swiperNext from "@/images/chev-right.svg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css/navigation";
// import "swiper/css";
// import "swiper/css/pagination";
// import Image from "next/image";

// const timeSlots = [
//   "11:00am",
//   "11:30am",
//   "12:00pm",
//   "12:30pm",
//   "1:00pm",
//   "1:30pm",
//   "2:00pm",
//   "2:30pm",
//   "3:00pm",
//   "3:30pm",
//   "4:00pm",
//   "4:30pm",
//   "5:00pm",
//   "5:30pm",
//   "6:00pm",
// ];

// const SlotPicker = ({
//   slots = timeSlots,
//   selected,
//   onSelect,
//   availableSlots,
//   handleSelect,
//   selectedSlotTime,
// }) => {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   return (
//     <div
//       style={{
//         background: "#232323",
//         borderRadius: "20px",
//         padding: "20px 0",
//         display: "flex",
//         alignItems: "center",
//         overflow: "hidden",
//         width: "100%",
//         maxWidth: "100%",
//         margin: "0 auto",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//       }}
//     >
//       <button
//         ref={prevRef}
//         style={{
//           background: "none",
//           border: "none",
//           color: "#fff",
//           fontSize: 18,
//           padding: "0 16px",
//           cursor: "pointer",
//           outline: "none",
//           width: "20px",
//           height: "20px",
//         }}
//         aria-label="Scroll left"
//       >
//         <Image src={swiperPrev} alt="Previous" />
//       </button>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <Swiper
//           modules={[Navigation]}
//           slidesPerView="auto"
//           spaceBetween={16}
//           onInit={(swiper) => {
//             swiper.params.navigation.prevEl = prevRef.current;
//             swiper.params.navigation.nextEl = nextRef.current;
//             swiper.navigation.init();
//             swiper.navigation.update();
//           }}
//           style={{ flex: 1 }}
//         >
//           {availableSlots.map((slot, idx) => (
//             <SwiperSlide key={idx} style={{ width: 90 }}>
//               <button
//                 onClick={() => handleSelect(slot)}
//                 style={{
//                   width: 90,
//                   padding: "10px 0",
//                   borderRadius: "12px",
//                   background:
//                     selectedSlotTime?.slotId === slot?.slotId
//                       ? "rgba(255, 174, 0, 0.18)"
//                       : "rgba(255,255,255,0.06)",
//                   border:
//                     selectedSlotTime?.slotId === slot?.slotId
//                       ? "2px solid #FFAE00"
//                       : "2px solid rgba(255,255,255,0.1)",
//                   color: "#fff",
//                   fontSize: 15,
//                   fontWeight: 500,
//                   cursor: "pointer",
//                   transition: "0.2s",
//                 }}
//               >
//                 {slot?.time}
//               </button>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//        {/* RIGHT ARROW */}
//        <button
//         ref={nextRef}
//         style={{
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           padding: "0 10px",
//           display: "flex",
//           alignItems: "center",
//         }}
//         aria-label="Next slots"
//       >
//         <Image src={swiperNext} alt="Next" />
//       </button>
//       </div>
//       <button
//         ref={nextRef}
//         style={{
//           background: "none",
//           border: "none",
//           color: "#888",
//           fontSize: 18,
//           padding: "0 16px",
//           cursor: "pointer",
//           outline: "none",
//         }}
//         aria-label="Scroll right"
//       >
//         {/* <FaChevronRight /> */}
//       </button>
//       <style jsx>{`
//         /* Hide Swiper scrollbar if any */
//         :global(.swiper-scrollbar) {
//           display: none !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SlotPicker;
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";

import "swiper/css";

const SlotPicker = ({
  availableSlots = [],
  handleSelect,
  selectedSlotTime,
}) => {
  const swiperRef = useRef(null);

  return (
    <div
      style={{
        background: "#232323",
        borderRadius: "20px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        style={arrowStyle}
        aria-label="Previous slots"
      >
        <Image src={swiperPrev} alt="Previous" />
      </button>

      {/* SWIPER */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {availableSlots.map((slot, idx) => (
            <SwiperSlide key={idx} style={{ width: 90 }}>
              <button
                onClick={() => handleSelect(slot)}
                style={{
                  width: 90,
                  padding: "10px 0",
                  borderRadius: "12px",
                  background:
                    selectedSlotTime?.slotId === slot?.slotId
                      ? "rgba(255,174,0,0.18)"
                      : "rgba(255,255,255,0.06)",
                  border:
                    selectedSlotTime?.slotId === slot?.slotId
                      ? "2px solid #FFAE00"
                      : "2px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {slot?.time}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        style={arrowStyle}
        aria-label="Next slots"
      >
        <Image src={swiperNext} alt="Next" />
      </button>
    </div>
  );
};

const arrowStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default SlotPicker;
