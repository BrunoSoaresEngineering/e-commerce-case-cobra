'use client';

import { useEffect, useRef, useState } from "react";
import Review from "./Review";

type ReviewColumnProps = {
  reviews: {
    id: string,
    imgSrc: string
  }[],
  msPerPixel?: number
}

function ReviewColumn({ reviews, msPerPixel = 0 }: ReviewColumnProps) {
  const [columnHeight, setColumnHeight] = useState(0);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => { 
    if (!columnRef.current) {
      return;
    }

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    })

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  return (
    <div
      ref={columnRef}
      className="animate-marquee space-y-8"
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, index) => (
        <Review
          key={`${review.id}-${index}`}
          imgSrc={review.imgSrc}
        />
      ))}
    </div>
  );
}

export default ReviewColumn;
