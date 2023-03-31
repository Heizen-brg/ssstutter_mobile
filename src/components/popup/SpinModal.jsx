import React, { useEffect, useRef, useState, useCallback } from "react";

import Button from "../Button";
import { Winwheel } from "@yavko/winwheel-esm";
import { useConfetti } from "../../context/ConfettiContext";
import { useNavigate } from "react-router-dom";
import Confetti from "../../plugin/Confetti";
const SpinModal = () => {
  const navigate = useNavigate();
  const { fire, setShow } = useConfetti();
  const [disable, setDisable] = useState(false);
  const [reward, setReward] = useState(null);
  const [numSegments, setNumSegments] = useState(8);
  const [segmentNumber, setSegmentNumber] = useState({
    1: 40,
    2: 200,
    3: 200,
    4: 35,
    5: 20,
    6: 10,
    7: 3,
    8: 1,
  });

  useEffect(() => {
    if (!reward) initWheel();
    if (reward) navigate("/");
  }, [reward]);

  const initWheel = () => {
    window.winwheel = new Winwheel({
      canvasId: "wheel",
      numSegments: numSegments,
      responsive: true,
      drawText: false,
      drawMode: "segmentImage",
      segments: [
        {
          text: "Voucher giảm 15% mua hàng website lần sau",
          image: "/img/wheel/7.png",
        },
        {
          text: "Voucher giảm 10% mua hàng website lần sau",
          image: "/img/wheel/6.png",
        },
        {
          image: "/img/wheel/5.png",
          text: "Voucher giảm 5%",
        },
        {
          image: "/img/wheel/4.png",
          text: "Túi bút",
        },
        {
          text: "Túi tote bag",
          image: "/img/wheel/3.png",
        },
        {
          text: "Boxer",
          image: "/img/wheel/2.png",
        },
        {
          text: "Smart pants",
          image: "/img/wheel/1.png",
        },
        {
          text: "Man shirt",
          image: "/img/wheel/0.png",
        },
      ],
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 10,
        callbackFinished: alertPrize,
      },
    });
  };

  const alertPrize = (indicatedSegment) => {
    setTimeout(() => {
      fire();
    }, 500);
    setShow(true);
    setReward(indicatedSegment.text);
  };
  const initSpin = () => {
    setDisable(true);
    let a = Object.keys(segmentNumber).reduce((total, current) => {
      return [...total, ...Array(segmentNumber[current]).fill(current)];
    }, []);
    let random = a[Math.floor(Math.random() * a.length)];
    let stopAt = window.winwheel.getRandomForSegment(random);
    window.winwheel.animation.stopAngle = stopAt;
    window.winwheel.startAnimation();
  };

  return (
    <div>
      {!reward && (
        <div className="p-4 bg-[url(https://sss-dashboard.leanservices.work/upload/9-2022/1662626882664.jpeg)]">
          <h1 className="uppercase text-center text-white">
            Vòng quay may mắn
          </h1>
          <div>
            <div className="relative flex justify-center items-center">
              <img
                className="absolute top-1 sm:top-4 w-6 "
                src="/img/wheel/kim.png"
              />
              <img
                className="absolute w-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/img/wheel/center.png"
              />
              <canvas
                id="wheel"
                width="450"
                height="450"
                data-responsiveminwidth="180"
                data-responsivescaleheight="true"
                data-responsivemargin="50"
              >
                Canvas not supported, use another browser.
              </canvas>
            </div>
            <div className="w-full flex justify-center">
              <Button
                className="!bg-transparent w-2/3 sm:w-1/3 disabled:opacity-10"
                disabled={disable}
                onClick={initSpin}
              >
                <img className="w-full" src="/img/wheel/button.png" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {reward && (
        <div className="relative sm:grid sm:grid-cols-[500px] place-content-center">
          <Confetti />
          <div className="bg-[url(https://sss-dashboard.leanservices.work/upload/9-2022/1662630998889.jpeg)] square">
            <h1 className="absolute text-xl text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 uppercase text-center">
              {reward}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinModal;
