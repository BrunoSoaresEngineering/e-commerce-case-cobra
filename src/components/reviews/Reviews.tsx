import Image from 'next/image';
import ReviewGrid from './Review-grid';
import sideImage from '../../../public/what-people-are-buying.png';

type ReviewsProps = {
  reviews: {
    id: string,
    imgSrc: string
  }[]
}

function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="relative max-w-3xl">
      <Image
        src={sideImage}
        alt=""
        aria-hidden="true"
        className="absolute select-none hidden xl:block -left-52 top-1/3"
      />
      <ReviewGrid reviews={reviews} />
    </div>
  );
}
export default Reviews;
