'use client';

import { useInView } from 'framer-motion';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { getNumberOfGridColumns, splitArray } from '@/lib/utils';
import ReviewColumn from './Review-column';

type Reviews = {
  id: string,
  imgSrc: string
}

type ReviewGridProps = {
  reviews: Reviews[]
}

const MS_PER_PIXEL_ODD_COLUMNS = 10;
const MS_PER_PIXEL_EVEN_COLUMNS = 15;

function ReviewGrid({ reviews }: ReviewGridProps) {
  const [numColumns, setNumColumns] = useState<number>(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const columns = useMemo(
    () => splitArray(reviews, numColumns),
    [numColumns, reviews],
  );
  const isInView = useInView(gridRef, {
    amount: 0.4,
    once: true,
  });

  useEffect(() => {
    if (!gridRef.current) {
      return () => {};
    }

    const resizeObserver = new window.ResizeObserver(() => {
      setNumColumns(getNumberOfGridColumns(gridRef.current));
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="relative mt-16 h-[50rem] max-h-[150vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100 z-10 pointer-events-none"
      />

      {isInView ? columns.map((column, index) => (
        <ReviewColumn
          // eslint-disable-next-line react/no-array-index-key
          key={`hero-grid-${index}`}
          reviews={column}
          msPerPixel={index % 2 === 0 ? MS_PER_PIXEL_ODD_COLUMNS : MS_PER_PIXEL_EVEN_COLUMNS}
        />
      )) : (
        null
      )}

      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100 z-10 pointer-events-none"
      />
    </div>
  );
}

export default ReviewGrid;
