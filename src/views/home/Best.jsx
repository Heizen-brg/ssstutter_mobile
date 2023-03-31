import React, { useEffect, useState } from "react";
import { _products } from "/src/share/data";
import { CONFIG } from "../../config";
import { useApi, useLinkDrag, useWindowDimension } from "../../hooks";
import { Slick, Loader } from "../../components";
import cmsServices from "../../services/cms.service";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
const Best = () => {
  const getNewArrivalApi = useApi(cmsServices.getNewArrival);
  const [newArrival, setNewArrival] = useState([]);
  const [mobile, setMobile] = useState(false);

  const { width } = useWindowDimension();
  const { clickLink, dragLink } = useLinkDrag();
  useEffect(() => {
    getNewItem();
  }, []);
  useEffect(() => {
    reponsive();
  }, [width]);

  useEffect(() => {
    if (getNewArrivalApi.data !== null) {
      setNewArrival(getNewArrivalApi.data);
    }
  }, [getNewArrivalApi.data]);

  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  };
  const getNewItem = () => {
    getNewArrivalApi.request({ type: "new_arrivals" });
  };

  return (
    <section className="px-4 py-6 sm:px-20">
      <div className="py-4 sm:p-16 flex items-center">
        <h1 className="uppercase font-medium sm:text-2xl">best seller</h1>
        <hr className="w-1/3 sm:w-1/6 ml-5 bg-primary-500 border-primary-500" />
      </div>

      <Slick
        isDot={false}
        vertical={false}
        isArrow={!mobile}
        loop={true}
        autoPlay={true}
        perView={1}
        fade={true}
      >
        {getNewArrivalApi.loading && <Loader />}

        {(newArrival.products || []).map((product) => (
          <div key={product.id}>
            <div className="w-full flex flex-col sm:grid-cols-3 sm:grid sm:gap-4 overflow-auto">
              <Link
                onClick={clickLink}
                onMouseDown={dragLink}
                to={`/p/${product.slug}`}
                style={{
                  backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${product.extensions.media.featured})`,
                }}
                className="portrait sm:landscape sm:col-span-2 relative"
              ></Link>
              <div className="sm:p-10">
                <h1 className="hidden sm:block text-5xl font-semibold">
                  {product.name}
                </h1>
                <ul className="flex justify-center items-center sm:justify-start gap-3 mt-2 sm:mt-10 ">
                  {product.color.map((color) => (
                    <li key={color.id} className="basis-1/4">
                      <span
                        style={{
                          backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${
                            product.extensions.media[
                              `color_${color.id}_thumbnail`
                            ]
                              ? product.extensions.media[
                                  `color_${color.id}_thumbnail`
                                ].o
                              : "no_image.png"
                          })`,
                        }}
                        className="square"
                      ></span>
                    </li>
                  ))}
                </ul>

                <h2 className="sm:flex gap-2 hidden text-xl mt-4 sm:mt-10">
                  Chỉ từ
                  <p className="text-5xl text-warning">
                    <NumberFormat
                      value={product.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={false}
                      renderText={(value, props) => value}
                    />
                  </p>
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slick>
    </section>
  );
};

export default Best;
