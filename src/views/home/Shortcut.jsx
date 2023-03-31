import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks";
import productService from "../../services/product.service";

const Shortcut = () => {
  const getCateApi = useApi(productService.getProductListByAttr);
  const [cate, setCate] = useState([]);

  useEffect(() => {
    getCateShortcut();
  }, []);

  const getCateShortcut = () => {
    getCateApi.request({ parentId: "" }, "category");
    setCate(getCateApi.data?.result);
  };

  return (
    <section className="px-4 sm:my-5 sm:px-20">
      <h2 className="p-5 text-center text-xl">Khám phá ngay</h2>
      <div className="sm:flex items-center justify-center sm:gap-5">
        <ul className="flex flex-wrap sm:w-3/4 sm:grid sm:grid-cols-5 gap-5 justify-center items-center p-2 sm:p-0">
          <Link to={`/c/for-him/5LoRyo`} className="w-1/4 sm:w-full ">
            <li className="capitalize bg-secondary px-1 py-2 text-center border truncate">
              sơ mi
            </li>
          </Link>
          <Link to={`/c/for-him/Z1X8tF`} className="w-1/4 sm:w-full ">
            <li className="capitalize bg-secondary px-1 py-2 text-center border truncate">
              quần âu
            </li>
          </Link>
          <Link to={`/c/for-him/iSNRzh`} className="w-1/4 sm:w-full">
            <li className="capitalize bg-secondary px-1 py-2  text-center border truncate">
              quần short
            </li>
          </Link>
          <Link to={`/c/for-him/5fUu6J`} className="w-1/4 sm:w-full">
            <li className="capitalize bg-secondary px-1 py-2  text-center border truncate">
              áo phông
            </li>
          </Link>
          <Link to={`/c/for-him/5LoRyo`} className="w-1/4 sm:w-full">
            <li className="capitalize bg-secondary px-1 py-2  text-center border truncate">
              áo polo
            </li>
          </Link>
        </ul>

      </div>
    </section>
  );
};

export default Shortcut;
