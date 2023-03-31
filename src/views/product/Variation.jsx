import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Slick } from "../../components";
import { CONFIG } from "../../config";
import { ProductContext } from "../../context";
const Variation = (props) => {
  const {
    childs = [],
    color = [],
    size = [],
    name,
    slug,
    media,
    price,
    salePrice,
  } = props;
  const { colorSelect, setColorSelect } = React.useContext(ProductContext);
  const { purchaseItem, setPurchaseItem } = React.useContext(ProductContext);
  const [sizeSelect, setSizeSelect] = React.useState();
  const [flatlay, setFlatlay] = React.useState([]);
  const [sizeChart, setSizeChart] = React.useState([]);
  const [colorName, setColorName] = useState("");
  const [isStock, setIsStock] = useState("");
  useEffect(() => {
    sizeFormat(size);
  }, [size]);

  useEffect(() => {
    flatlayFormat(color);
  }, [color]);

  useEffect(() => {
    setSizeSelect("");
    initSizeByColor(colorSelect);
    purchaseItemFormat();
  }, [colorSelect]);

  const flatlayFormat = (color) => {
    let colorValue = color.map((c) => {
      return {
        id: c.id,
        name: c.name,
        value: c.value,
        photo: media[`color_${c.id}_thumbnail`]
          ? media[`color_${c.id}_thumbnail`].o
          : "",
      };
    });
    setFlatlay(colorValue);
  };
  const sizeFormat = (size) => {
    let sizeFormat = size.map((s) => {
      return { size: s, stock: true };
    });
    setSizeChart(sizeFormat);
  };
  const initSizeByColor = (color) => {
    let sizeArr = childs
      .filter((i) => String(i.color.id) === String(color))
      .map((s) => {
        return { size: s.size, stock: s.stock };
      });
    if (!sizeArr.length) return;
    setSizeChart(sizeArr);
  };
  const onColorSelect = (colorSelected) => {
    setIsStock("");
    let isStock = childs
      .filter((i) => String(i.color.id) === String(colorSelected.id))
      .every((i) => i.stock <= 0);
    if (isStock) setIsStock("Hết hàng");
    setColorSelect(colorSelected.id);
    setColorName(colorSelected.name);
    setPurchaseItem((prevState) => ({
      ...prevState,
      colorName: colorSelected.name,
      media: colorSelected.photo,
      color: colorSelected.id,
    }));
  };
  const onSizeSelect = (sizeSelected) => {
    setSizeSelect(sizeSelected.size);
    setPurchaseItem((prevState) => ({
      ...prevState,
      size: sizeSelected.size,
    }));
  };
  const purchaseItemFormat = () => {
    setPurchaseItem((prevState) => ({
      ...prevState,
      name: name,
      slug: slug,
      size: "",
    }));
  };

  const Flatlay = (props) => {
    let { id, photo, className } = props;

    // console.log(props);
    return (
      <div className={className}>
        <button
          // disabled={isStock}
          className={`w-full transition-all border disabled:grayscale
                    ${
                      colorSelect == id
                        ? " border-primary-500 border-2"
                        : "border-secondary"
                    }`}
          onClick={() => {
            onColorSelect(props);
          }}
        >
          <span
            style={{
              backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${
                photo ? photo : "no_image.png"
              })`,
            }}
            className="square border"
          ></span>
        </button>
      </div>
    );
  };
  return (
    <div className="p-4">
      <div className="hidden sm:block">
        <h1 className="text-3xl">{name}</h1>
        <div className="flex items-center sm:my-4 gap-10 sm:w-full ">
          {salePrice && (
            <h5 className="text-warning text-3xl font-semibold my-10">
              <NumberFormat
                value={salePrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </h5>
          )}
          <p
            className={` text-3xl font-semibold ${
              salePrice ? "line-through text-primary-300" : ""
            }`}
          >
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={false}
              renderText={(value, props) => value}
            />
          </p>
        </div>
      </div>
      <div className="py-2">
        <h4 className="text-center justify-center items-center sm:justify-start capitalize mb-2 flex gap-2">
          chọn màu : <p className="font-semibold">{colorName}</p>{" "}
        </h4>
        <div className="flex justify-center items-center sm:justify-start flex-wrap gap-4">
          {flatlay.map((item, index) => (
            <Flatlay key={index} className="basis-1/5" {...item} />
          ))}
        </div>
        {/* <Slick vertical={false} perView={5} mobileView={4} loop={false}>
        </Slick> */}
      </div>
      <div className="py-2">
        <h4 className="text-center capitalize sm:text-left">chọn size</h4>
        <div className="flex justify-center sm:justify-between items-center gap-2">
          <ul className="flex items-center justify-center sm:justify-start gap-5 py-2">
            {sizeChart
              .sort((a, b) => a.size - b.size)
              .map((item, index) => (
                <li key={index}>
                  <button
                    disabled={item.stock <= 0}
                    className={`w-10 h-10 grid place-content-center border disabled:text-primary-100 ${
                      item.size == sizeSelect
                        ? "border-primary-500"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      onSizeSelect(item);
                    }}
                  >
                    <span>{item.size}</span>
                  </button>
                </li>
              ))}
          </ul>
          {isStock && (
            <h3 className="px-2 py-1 border border-warning text-warning">
              {isStock}
            </h3>
          )}
        </div>
      </div>
      {/* <div className="flex justify-between items-center">
          <h5 className="border-b border-primary-500">Tìm size của bạn</h5>
          <h5 className="border-b border-primary-500">Bảng size</h5>
        </div> */}
    </div>
  );
};
export default Variation;
