"use client";
import React from "react";
import Image from "next/image";
import esc from "@/images/esc1.jpg";
import age from "@/images/age.svg";
import people from "@/images/people.svg";
import up from "@/images/up.svg";
import coupon from "@/images/coupon.svg";
import { useRouter } from "next/navigation";

const EscapeRoomCard = ({ room, hasVirtual = false,virtual_games=false }) => {
  const router = useRouter();
console.log("EscapeRoomCard_EscapeRoomCard",room)
  if (!room) return null;

    // ✅ HIDE Code Breakers when virtual_games is true
    if (virtual_games && room?.slug == "code-breakers") {
      return null;
    }

  return (
    <div id="escape-rooms-section"
      className="esc-card"
      style={{ cursor: "pointer" }}
      // onClick={() =>
      //   router.push(
      //     `/${hasVirtual ? "virtual" : "escape-rooms"}/${
      //       room?.slug || "murder-mystery"
      //     }`
      //   )
      // }
      onClick={() => {
        // ✅ GTM event fire
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "cta_click",
          room_name: room?.title || "unknown",
          room_slug: room?.slug,
          page: window.location.pathname,
          section: "escape_rooms_listing",
        });
      
        // ✅ Navigation
        router.push(
          `/${hasVirtual ? "virtual" : "escape-rooms"}/${
            room?.slug || "murder-mystery"
          }`
        );
      }}
    >
      <div className="esc-card-img">
        {room?.bannersection?.image && (
          <Image
            src={room?.bannersection?.image}
            className="w-100 "
            width={700}
            height={700}
            alt="hm-text-bg"
          />
        )}
      </div>
      <div className="esc-card-content">
        <h3>{room?.title || "Murder Mystery"}</h3>
        <div className="bt">
          <ul>
            {!hasVirtual && (
              <li>
                <span style={{ fontSize: "18px", color: "#FFAE00" }}>Age</span>
                <span>{room?.bannersection?.age_group || "Age 10+"}</span>
              </li>
            )}
            <li>
              <Image src={people} className="w-100 h-auto" alt="people" />
              <span>{room?.bannersection?.min_team || room?.bannersection?.capacity}</span>
            </li>
            <li>
              <Image src={up} className="w-100 h-auto" alt="people" />
              <span>{`${room?.bannersection?.success_rate}%` || "60%"}</span>
            </li>
          </ul>
          <Image src={coupon} className=" h-auto" alt="coupon" />
        </div>
      </div>
    </div>
  );
};

export default EscapeRoomCard;
