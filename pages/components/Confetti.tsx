import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function ConfettiComponent() {
  const { width, height } = useWindowSize();
  return (
  <Confetti 
  width={width}
  numberOfPieces={200} 
  tweenDuration={15000}
  height={height} />
  );
}
