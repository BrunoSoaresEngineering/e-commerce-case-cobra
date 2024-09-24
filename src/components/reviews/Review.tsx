import { getRandomInt } from "@/lib/utils";
import Phone from "../Phone";

type Props = {
  imgSrc: string
}

const POSSIBLE_ANIMATION_DELAYS = [
  '0s',
  '0.1s',
  '0.2s',
  '0.3s',
  '0.4s',
  '0.5s',
]

function getAnimationDelay() {
  return POSSIBLE_ANIMATION_DELAYS[getRandomInt(POSSIBLE_ANIMATION_DELAYS.length)];
}

function Review({ imgSrc }: Props) {
  return (
    <div
      className="animate-fade-in rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5"
      style={{ animationDelay: getAnimationDelay() }}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}
export default Review;
