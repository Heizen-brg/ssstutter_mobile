import React from "react";
import { CONFIG } from "../config.js";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
const Product = (props) => {
  const { name, slug, price, salePrice, color, media, handleClose, className , onClick, onMouseDown} =
    props;
    const closeMenu = () =>{
      handleClose()
      onClick()
    }
  return (
    <>
      <div className={className}>
        <Link to={`/p/${slug}`}  onClick={closeMenu} onMouseDown={onMouseDown}>
          <div
            style={{
              backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${media.featured})`,
            }}
            className="portrait relative"
          >
            {salePrice && (
              <span className="absolute top-3 left-0 p-1 bg-warning  text-secondary">
                {Math.floor(100 - (salePrice / price) * 100)}%
              </span>
            )}
          </div>
          <div className="py-2">
            <div className="flex items-center justify-between">
              <h5 className="uppercase truncate w-2/3 text-xs sm:text-md">{name}</h5>
              <p
                className={`text-xs ${
                  salePrice ? "line-through text-primary-300" : ""
                }`}
              >
                <NumberFormat
                  value={price}
                  className="flex flex-end w-full"
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={false}
                  renderText={(value, props) => value}
                />
              </p>
            </div>
            <div className="flex justify-between items-center">
              <small className="text-primary-300">{color.length} Colors</small>
              {salePrice && (
                <h4 className="text-warning">
                  {
                    <NumberFormat
                      value={salePrice}
                      className="flex flex-end w-full"
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={false}
                      renderText={(value, props) => value}
                    />
                  }
                </h4>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
