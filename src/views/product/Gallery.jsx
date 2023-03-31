import React, { useEffect, useState } from "react";
import { Slick } from "../../components";
import { CONFIG } from "../../config";
import { ProductContext } from "../../context";
import { useWindowDimension } from "../../hooks";
const Gallery = (props) => {
  const { media = {}, salePrice, price, color = [] } = props;
  let galleryArray = [];
  const [gallery, setGallery] = React.useState([]);
  const { colorSelect } = React.useContext(ProductContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobile, setMobile] = useState(false);
  const { width } = useWindowDimension();
  useEffect(() => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  }, [width]);
  useEffect(() => {
    color.map((c) => {
      galleryArray.push(media[`color_${c.id}_gallery`]);
      let listFormart = [].concat(...galleryArray);
      setGallery(listFormart);
    });
  }, [color]);

  useEffect(() => {
    if (colorSelect) {
      galleryArray = media[`color_${colorSelect}_gallery`];
      setGallery(galleryArray);
    }
  }, [colorSelect]);

  const handlePreview = (value) => {
    setSlideIndex(value);
  };

  return (
    <div className="w-full border-b sm:border-none">
      <div className="w-full sm:grid sm:grid-cols-4 lg:grid-rows-[600px] xl:grid-rows-[765px] gap-2 overflow-auto">
        <div className="col-span-1 snap-y snap-mandatory sm:grid sm:grid-cols-1 gap-2 hidden  overflow-scroll sm:h-full w-full">
          {(gallery || []).map((img, index) => (
            <div key={index} className="snap-start">
              <div
                onClick={() => handlePreview(index)}
                style={{
                  backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${
                    img ? img.o : "no_image.png"
                  })`,
                }}
                className="relative portrait bg-primary-100 bg-blend-multiply hover:bg-blend-normal "
              ></div>
            </div>
          ))}
        </div>
        <div className="w-full col-span-3">
          <Slick
            slideIndex={slideIndex}
            isDot={mobile}
            isArrow={!mobile}
            perView={1}
            vertical={false}
            mobileView={1}
            slideChange={handlePreview}
            autoPlay={!mobile}
            fade={mobile}
          >
            {(gallery || []).map((img, index) => (
              <div key={index}>
                <div
                  style={{
                    backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${
                      img ? img.o : "no_image.png"
                    })`,
                  }}
                  className="relative portrait"
                >
                  {salePrice && (
                    <span className="absolute z-10 top-5 left-0 p-2 bg-warning text-xs text-secondary">
                      {Math.floor(100 - (salePrice / price) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
