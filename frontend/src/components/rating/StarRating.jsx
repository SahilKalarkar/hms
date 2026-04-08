// frontend/src/components/rating/StarRating.jsx
import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const StarRating = ({ rating = 4.5, size = 16 }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center">
            {stars.map((star) => (
                <span key={star} className="ml-1">
                    {star <= Math.floor(rating) ? (
                        <StarFilled className={`text-yellow-400! text-${size}`} />
                    ) : star - 0.5 <= rating ? (
                        <StarFilled className={`text-yellow-300! text-${size}`} />
                    ) : (
                        <StarOutlined className="text-gray-300! text-${size}" />
                    )}
                </span>
            ))}
            <span className="ml-2 text-sm text-slate-600 font-medium">({rating})</span>
        </div>
    );
};

export default StarRating;