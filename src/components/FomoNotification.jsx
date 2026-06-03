"use client";

import { useEffect, useState } from "react";

const notifications = [
  {
    type: "booking",
    title: "New Booking",
    message: "Rahul from Bangalore booked Prison Break",
    time: "2 minutes ago",
    icon: "🎯",
  },
  {
    type: "lead",
    title: "Lead Form Enquiry",
    message: "Priya submitted a corporate enquiry",
    time: "5 minutes ago",
    icon: "📩",
  },
  {
    type: "review",
    title: "Google Review",
    message: "⭐⭐⭐⭐⭐ 'Amazing experience!'",
    time: "10 minutes ago",
    icon: "⭐",
  },
  {
    type: "stats",
    title: "Live Stats",
    message: "18 people booked in the last hour",
    time: "Just now",
    icon: "🔥",
  },
  {
    type: "booking",
    title: "Escape Room Booking",
    message: "Someone booked The Heist Room",
    time: "1 minute ago",
    icon: "🎮",
  },
];

export default function FomoNotification() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const random =
        notifications[Math.floor(Math.random() * notifications.length)];

      setCurrent(random);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000);
    };

    showNotification();

    const interval = setInterval(() => {
      showNotification();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  if (!current) return null;

  return (
    <div
      className={`fomo-notify-box ${
        visible
          ? "opacity-100"
          : "opacity-0"
      }`}
    >
      <div className="fomo-box-div">
          <div className="icon">
            {current.icon}
          </div>

          <div className="text">
            <h4>
              {current.title}
            </h4>

            <p>
              {current.message}
            </p>

            <span>
              {current.time}
            </span>
          </div>
      </div>
    </div>
  );
}