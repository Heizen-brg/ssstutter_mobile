import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader, Slick } from "../../components";
import { useApi, useWindowDimension, useLinkDrag } from "../../hooks";
import cmsServices from "../../services/cms.service";
const Banner = () => {
  const getBannerApi = useApi(cmsServices.getBannerList);
  const { width } = useWindowDimension();
  const { clickLink, dragLink } = useLinkDrag();
  const [banners, setBanners] = useState([]);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    reponsive();
  }, [width]);

  useEffect(() => {
    getBannerList();
  }, []);

  useEffect(() => {
    if (getBannerApi.data !== null) setBanners(getBannerApi.data);
  }, [getBannerApi.data]);
  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  };
  const getBannerList = () => {
    getBannerApi.request({ type: "major" });
  };

  return (
    <section className="px-4 sm:p-20 sm:pt-0">
      <div className="relative sm:grid sm:grid-cols-3 sm:gap-4">
        <div className="sm:col-span-2">
          <Slick
            isDot={false}
            vertical={false}
            isArrow={true}
            loop={true}
            autoPlay={true}
            perView={1}
          >
            {getBannerApi.loading && <Loader />}
            {(banners || []).map((banner, index) => (
              <div key={index}>
                <Link
                  onClick={clickLink}
                  onMouseDown={dragLink}
                  to={banner.link}
                  style={{
                    backgroundImage: `url(https://sss-dashboard.leanservices.work${
                      mobile ? banner.mobile_img : banner.img
                    }.jpeg)`,
                  }}
                  className="portrait sm:square "
                ></Link>
              </div>
            ))}
          </Slick>
        </div>
        {!mobile && (
          <div className="flex flex-col sm:grid sm:grid-rows-2 sm:grid-cols-1 sm:col-span-1 justify-center p-10 sm:p-0 gap-5 absolute sm:static top-0 left-0 w-full h-full">
            <Link
              to="/c/for-him"
              className="sm:square sm:relative sm:bg-[url(https://sss-dashboard.leanservices.work/upload/5-2022/1652146098356.jpeg)]"
            >
              {/* <h1 className="uppercase bg-secondary px-5 py-2 text-center sm:absolute sm:w-1/2 top-1/2 sm:-translate-y-1/2 right-0">
                  for him
                </h1> */}
            </Link>
            <Link
              to="/c/for-her"
              className="sm:square sm:relative sm:bg-[url(https://sss-dashboard.leanservices.work/upload/5-2022/1652146086904.jpeg)]"
            >
              {/* <h1 className="uppercase bg-secondary px-5 py-2 text-center sm:absolute sm:w-1/2 top-1/2 sm:-translate-y-1/2 right-0">
                  for her
                </h1> */}
            </Link>
          </div>
        )}
      </div>
      {/* <div className="snap-y snap-mandatory overflow-scroll h-[500px] sm:h-[650px] ">
     {(banners || []).map((banner, index) => (
          <div key={index} className="mb-3 snap-start">
            <div className="relative sm:grid sm:grid-cols-3 sm:gap-4">
              <Link
                to={banner.link}
                style={{
                  backgroundImage: `url(https://sss-dashboard.leanservices.work${
                    mobile ? banner.mobile_img : banner.img
                  }.jpeg)`,
                }}
                className="portrait sm:square sm:col-span-2"
              ></Link>
              {!mobile && (
                <div className="flex flex-col sm:grid sm:grid-rows-2 sm:grid-cols-1 sm:col-span-1 justify-center p-10 sm:p-0 gap-5 absolute sm:static top-0 left-0 w-full h-full">
                  <Link
                    to="/c/for-him"
                    className="sm:square sm:relative sm:bg-[url(https://sss-dashboard.leanservices.work/upload/5-2022/1652146098356.jpeg)]"
                  ></Link>
                  <Link
                    to="/c/for-her"
                    className="sm:square sm:relative sm:bg-[url(https://sss-dashboard.leanservices.work/upload/5-2022/1652146086904.jpeg)]"
                  ></Link>
                </div>
              )}
            </div>
          </div>
        ))}
     </div> */}
    </section>
  );
};
export default Banner;

{
  /* <h1 className="uppercase bg-secondary px-5 py-2 text-center sm:absolute sm:w-1/2 top-1/2 sm:-translate-y-1/2 right-0">
for her
</h1> */
}
