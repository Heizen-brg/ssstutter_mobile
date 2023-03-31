import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, useScrollPosition } from "../hooks";
import productService from "../services/product.service";
import Icon from "./Icon";
import Loader from "./Loader";
const CateFilter = ({ isOpen, handleClose, catId, setTitle }) => {
  let { id } = useParams();
  const [cateList, setCateList] = useState([]);
  const scrollDir = useScrollPosition();
  // const [categories, setCategories] = useState([]);
  const getCateListApi = useApi(productService.getProductListByAttr);
  useEffect(() => {
    getCateList(catId);
  }, [catId]);
  useEffect(() => {
    if (scrollDir == "down") {
      handleClose(false);
    }
  }, [scrollDir]);

  useEffect(() => {
    if (getCateListApi.data?.result !== null)
      setCateList(getCateListApi.data?.result);
  }, [getCateListApi.data?.result]);

  const getCateList = (catId) => {
    getCateListApi.request({ parentId: catId }, "category");
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
            ? "translate-x-0 sm:h-[20vh]"
            : "-translate-x-full sm:translate-x-0 sm:h-0"
        } absolute sm:static w-3/4 sm:w-full h-screen sm:overflow-auto z-50 top-0 left-0 flex justify-end ease-in-out  transition-all duration-300 `}
      >
        <div className={` bg-secondary h-full w-full`}>
          <div className="flex justify-between items-center p-4 border-b sm:hidden bg-primary-500 text-secondary">
            <h1 className="text-2xl">
              {catId == "3vvRIM" ? "For Him" : "For Her"}
            </h1>
            <Icon
              name="close"
              width="20"
              color="white"
              height="20"
              onClick={() => handleClose(false)}
            />
          </div>
          <ul className="py-2 overflow-auto sm:flex sm:flex-wrap sm:px-20">
            {getCateListApi.loading && <Loader />}
            {(cateList || []).map((cat, index) => (
              <li className="sm:w-1/4" key={index}>
                <Link
                  to={`/c/${id}/${cat.id}`}
                  onClick={() => handleClose(false)}
                  onMouseDown={() => setTitle(cat.name)}
                  className="block px-8 py-2"
                >
                  {cat.name}
                </Link>{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CateFilter;
