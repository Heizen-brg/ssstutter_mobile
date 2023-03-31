import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useConfetti } from "../context/ConfettiContext";
const Confetti = () => {
  const { getInstance, show } = useConfetti();
  return (
    <>
      {show && (
        <div className="absolute z-50 top-0 left-0 w-full h-full">
          <ReactCanvasConfetti
            refConfetti={getInstance}
            className="pointer-events-none w-full h-full"
          />
        </div>
      )}
    </>
  );
};

export default Confetti;
