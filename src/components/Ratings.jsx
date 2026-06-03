import React from "react";
import { filledStar, halfFilledStar, emptyStar } from "@/icons";

const Ratings = ({ rating = 4.5, size = 32, spacing = 5 }) => {
  const getStarTypes = (rating) => {
    const stars = [];
    let r = Number(rating);
    for (let i = 1; i <= 5; i++) {
      if (r >= i) {
        stars.push("full");
      } else if (r >= i - 0.5) {
        stars.push("half");
      } else {
        stars.push("empty");
      }
    }
    return stars;
  };

  return (
    <div className="ratings-stars">
      {getStarTypes(rating).map((type, idx) =>
        type === "full"
          ? filledStar({ size, spacing, key: idx })
          : type === "half"
          ? halfFilledStar({ size, spacing, key: idx })
          : emptyStar({ size, spacing, key: idx })
      )}
    </div>
  );
};

export default Ratings;
