import React, { useState, useEffect } from "react";
import { Button, Slick } from "../../components";
import { useWindowDimension } from "../../hooks";
const Lookbook = () => {
  const { width } = useWindowDimension();

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    reponsive();
  }, [width]);
  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 1024) {
      setMobile(false);
    }
  };

  return (
    <section className="py-6">
      <Slick vertical={false} isDot={false} isArrow={true} autoPlay={true}>
        <div>
          <div
            style={{
              backgroundImage: mobile
                ? "url(https://sss-dashboard.leanservices.work/upload/8-2022/1659691236552.jpeg)"
                : "url(https://sss-dashboard.leanservices.work/upload/8-2022/1659693131631.jpeg)",
            }}
            className="portrait relative sm:ribbon"
          >
            {/* <div className="w-3/4 sm:w-1/3 absolute flex flex-col justify-start items-start text-secondary left-0 bottom-0 sm:left-auto sm:bottom-auto sm:top-0 sm:right-0 p-10">
              <h1 className="uppercase">SUMMER BREAK</h1>
              <p className="text-left my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                aliquam ducimus ad consectetur eum aperiam.
              </p>
              <Button className="py-3 px-8 text-lg">GET IT NOW</Button>
            </div> */}
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundImage: mobile
                ? "url(https://sss-dashboard.leanservices.work/upload/7-2022/1658916028569.jpeg)"
                : "url(https://sss-dashboard.leanservices.work/upload/7-2022/1658974488678.jpeg)",
            }}
            className="portrait relative sm:ribbon"
          >
            {/* <div className="w-3/4 sm:w-1/3 absolute flex flex-col justify-start items-start text-secondary left-0 bottom-0 p-10  sm:left-auto sm:bottom-auto sm:top-0 sm:right-0">
              <h1 className="uppercase">SUMMER BREAK</h1>
              <p className="text-left my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                aliquam ducimus ad consectetur eum aperiam.
              </p>
              <Button className="py-4 px-8 text-lg">GET IT NOW</Button>
            </div> */}
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundImage: mobile
                ? "url(https://sss-dashboard.leanservices.work/upload/6-2022/1654695502845.jpeg)"
                : "url(https://sss-dashboard.leanservices.work/upload/6-2022/1654695472615.jpeg)",
            }}
            className="portrait relative sm:ribbon"
          >
            {/* <div className="w-3/4 sm:w-1/3 absolute flex flex-col justify-start items-start text-secondary left-0 bottom-0 p-10  sm:left-auto sm:bottom-auto sm:top-0 sm:right-0">
              <h1 className="uppercase">warm your day up</h1>
              <p className="text-left my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                aliquam ducimus ad consectetur eum aperiam.
              </p>
              <Button className="py-4 px-8 text-lg">GET IT NOW</Button>
            </div> */}
          </div>
        </div>
      </Slick>
    </section>
  );
};

export default Lookbook;
