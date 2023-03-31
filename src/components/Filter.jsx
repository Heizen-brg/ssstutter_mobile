import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, Icon, Radio, Range } from ".";
import { useApi, useScrollPosition, useWindowDimension } from "../hooks";
import { useFilter } from "../context/FilterContext";
import productService from "../services/product.service";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
const Filter = ({ isOpen, handleClose }) => {
  const { query, setQuery } = useFilter();
  const { id } = useParams();
  const getColorListApi = useApi(productService.getColorList);
  const getSizeListApi = useApi(productService.getSizeList);
  const scrollDir = useScrollPosition();
  const { width } = useWindowDimension();
  const [shrinkColor, setShrinkColor] = useState(true);
  const [shrinkSize, setShrinkSize] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [colorSelected, setColorSelected] = useState([]);
  const [orderSelected, setOrderSelected] = useState("Giá cao nhất");
  const [sizeList, setSizeList] = useState({});
  const [colorList, setColorList] = useState([]);
  const [attr, setAttr] = useState({
    catId: id == "for-him" ? "3vvRIM" : "y8Q15I",
    color: [],
    size: [],
    price: [],
    sort: "down",
    sortBy: "",
  });
  useEffect(() => {
    if (getColorListApi.data?.result)
      setColorList(getColorListApi.data?.result);
  }, [getColorListApi.data?.result]);

  useEffect(() => {
    if (getSizeListApi.data?.result) {
      let sizeGroup = getSizeListApi.data?.result.reduce((sizeGr, current) => {
        if (!sizeGr[current.typeName]) sizeGr[current.typeName] = [];
        sizeGr[current.typeName].push(current);
        return sizeGr;
      }, {});
      setSizeList(sizeGroup);
    }
  }, [getSizeListApi.data?.result]);

  useEffect(() => {
    if (scrollDir == "down") {
      handleClose(false);
    }
  }, [scrollDir]);

  useEffect(() => {
    getAttrList();
  }, []);

  useEffect(() => {
    setQuery({ catId: id == "for-him" ? "3vvRIM" : "y8Q15I" });
  }, [id]);

  useEffect(() => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  }, [width]);

  useEffect(() => {
    if (isCheckAll) setIsCheck([]);
  }, [isCheckAll]);

  const getAttrList = () => {
    getColorListApi.request();
    getSizeListApi.request();
  };

  const handleAttrSelect = (e, type, name) => {
    const { checked, value } = e.target;
    setIsCheck([...isCheck, value]);
    setAttr({ ...attr, [type]: [...attr[type], value] });
    if (name) setColorSelected([...colorSelected, name]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== value));
      setAttr({ ...attr, [type]: attr[type].filter((i) => i !== value) });
      if (name) setColorSelected((curr) => curr.filter((c) => c !== name));
    }
  };

  const handleSortSelect = (e, value) => {
    if (e.target.checked) {
      setAttr({ ...attr, sort: e.target.value });
      setOrderSelected(value);
    }
  };
  const handleShrinkColor = () => {
    setShrinkColor(!shrinkColor);
  };
  const handleShrinkSize = () => {
    setShrinkSize(!shrinkSize);
  };
  const confirmFilter = () => {
    let filterFormat = Object.assign(
      {},
      {
        catId: id == "for-him" ? "3vvRIM" : "y8Q15I",
        color: attr.color.join(","),
        size: attr.size.join(","),
        price: attr.price.join(","),
        sort: attr.sort,
        sortBy: attr.sortBy,
      }
    );

    handleShrinkColor();
    handleClose(false);
    setQuery(filterFormat);
  };
  const resetFilter = () => {
    setQuery({ catId: id == "for-him" ? "3vvRIM" : "y8Q15I" });
    handleClose(false);
    handleShrinkColor();
    setIsCheckAll(!isCheckAll);
  };
  return (
    <div>
      <div
        onClick={() => handleClose(false)}
        className={`absolute z-50 w-full ${
          isOpen ? "h-full w-screen" : "h-0 w-0"
        } sm:hidden bg-primary-100 sm:bg-none top-0 left-0 backdrop-blur-1 transition`}
      ></div>
      <div
        className={`${
          isOpen
            ? "translate-x-0 sm:h-[550px]"
            : "translate-x-full sm:translate-x-0 sm:h-0"
        } absolute sm:static w-3/4 sm:w-full h-screen sm:overflow-auto z-50 top-0 right-0 flex justify-end ease-in-out  transition-all duration-300 `}
      >
        <div className="h-full w-full sm:w-full bg-secondary">
          <div className="sm:hidden flex items-center justify-between gap-4 p-4 border-b bg-primary-500 text-white">
            <h3 className="uppercase">refine by </h3>
            <Icon
              name="close"
              width="25"
              height="25"
              color="white"
              onClick={() => handleClose(false)}
            />
          </div>
          <div className="max-h-[70vh] sm:max-h-auto sm:px-20  overflow-auto sm:grid sm:grid-cols-3">
            <div className="p-4 sm:p-0 border-b sm:border-none">
              <h2 className="flex justify-between py-2 capitalize">
                color
                <Icon
                  className={`${
                    shrinkColor ? "rotate-180" : ""
                  } sm:hidden transition-all`}
                  name="down"
                  width="15"
                  height="15"
                  onClick={handleShrinkColor}
                />
              </h2>
              {shrinkColor && <div>{colorSelected.join()}</div>}
              <ul
                className={`flex flex-col sm:grid sm:grid-cols-8 sm:w-2/3 gap-1 transition-all ${
                  shrinkColor ? "h-[10vh] sm:h-16" : "h-[30vh] sm:h-full"
                } overflow-auto`}
              >
                {(colorList || []).map((color, index) => (
                  <li key={index}>
                    <Checkbox
                      id={color.id}
                      label={mobile ? color.name : ""}
                      value={color.id}
                      hidden={!mobile}
                      style={{ backgroundColor: mobile ? "" : color.value }}
                      labelClass={`px-2 sm:border text-xs sm:w-6 sm:h-6 peer-checked:border-black `}
                      checked={isCheck.includes(color.id)}
                      onChange={(e) => handleAttrSelect(e, "color", color.name)}
                    />
                  </li>
                ))}
              </ul>
              {shrinkColor && (
                <p
                  onClick={handleShrinkColor}
                  className="text-xs py-2 cursor-pointer"
                >
                  more colors...
                </p>
              )}
            </div>
            <div className="p-4 border-b sm:border-none sm:p-0">
              {Object.values(sizeList).map((sizeData, index) => (
                <div key={index}>
                  <h2 className="flex justify-between py-2 capitalize text-sm">
                    {sizeData[0].typeName}
                    <Icon
                      className={`${
                        shrinkSize ? "rotate-180" : ""
                      } transition-all sm:hidden`}
                      name="down"
                      width="15"
                      height="15"
                      onClick={handleShrinkSize}
                    />
                  </h2>
                  {/* {shrinkSize && <div>{sizeData.join()}</div>} */}
                  <ul
                    className={`flex flex-col gap-2 transition-all sm:w-2/3 sm:grid sm:grid-cols-5  ${
                      shrinkSize ? "h-0" : "h-[20vh] sm:h-auto"
                    } overflow-auto`}
                  >
                    {sizeData.map((size, index) => (
                      <li key={index}>
                        <Checkbox
                          id={size.id}
                          label={size.name}
                          value={size.id}
                          checked={isCheck.includes(size.id)}
                          onChange={(e) => handleAttrSelect(e, "size")}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-4 border-b sm:border-none sm:p-0">
              <div>
                <h2 className="flex justify-between items-center py-2 capitalize">
                  mức giá :
                  {attr.price.length > 0 && (
                    <div className="flex gap-2 text-primary-100">
                      Từ
                      {
                        <NumberFormat
                          value={attr.price[0]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={false}
                          renderText={(value, props) => (
                            <p className="text-black">{value}</p>
                          )}
                        />
                      }
                      đến
                      {
                        <NumberFormat
                          value={attr.price[1]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={false}
                          renderText={(value, props) => (
                            <p className="text-black">{value}</p>
                          )}
                        />
                      }
                    </div>
                  )}
                </h2>
                <div className="py-2 sm:p-4">
                  <Range
                    min={0}
                    max={2000000}
                    step={100000}
                    defaultValue={[0, 100000]}
                    onInput={(value) => setAttr({ ...attr, price: value })}
                  />
                </div>
              </div>
              <div>
                <h2 className="flex justify-between py-2 capitalize">
                  sắp xếp
                </h2>
                {/* {shrink && <div>{orderSelected}</div>} */}
                <ul
                  className={`flex flex-col gap-2 transition-all overflow-auto`}
                >
                  <li>
                    <Radio
                      name="sort"
                      label="Giá cao nhất"
                      value="up"
                      onChange={(e) => handleSortSelect(e, "Giá cao nhất")}
                    />
                    <Radio
                      name="sort"
                      label="Giá thấp nhất"
                      value="down"
                      onChange={(e) => handleSortSelect(e, "Giá thấp nhất")}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border-t w-full grid grid-cols-2 gap-2 sm:flex sm:justify-end">
            <Button
              className="w-full sm:w-auto p-2 mt-5"
              onClick={confirmFilter}
            >
              áp dụng
            </Button>
            <Button className="w-full sm:w-auto p-2 mt-5" onClick={resetFilter}>
              đặt lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
