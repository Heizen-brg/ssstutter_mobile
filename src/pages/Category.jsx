import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CateFilter,
  Filter,
  Icon,
  Loader,
  Product,
  Select,
} from "../components";
import {
  useAnalytic,
  useApi,
  useFacebookPixel,
  useInfiniteScroll,
  useWindowDimension,
} from "../hooks";
import { useFilter } from "../context/FilterContext";

import productService from "../services/product.service";
const Category = () => {
  let { id, cate } = useParams();
  const queryCat = id == "for-him" ? "3vvRIM" : "y8Q15I";
  const { loadMoreRef, skip, setSkip } = useInfiniteScroll();
  const { query, setQuery } = useFilter();
  const { width } = useWindowDimension();

  const [filter, setFilter] = useState(false);
  const [title, setTitle] = useState(null);
  const [cateMenu, setCateMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const getProductsApi = useApi(productService.getProductList);
  const { pageView } = useFacebookPixel();
  useAnalytic();

  useEffect(() => {
    document.title =
      id == "for-him" ? "FOR HIM - SSSTUTTER" : "FOR HER - SSSTUTTER";
    pageView();
  }, []);

  useEffect(() => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  }, [width]);

  useEffect(() => {
    if (getProductsApi.data?.result)
      setProductsList(getProductsApi.data?.result);
  }, [getProductsApi.data?.result]);

  useEffect(() => {
    getProductList();
  }, [id, query, skip]);

  useEffect(() => {
    setSkip(0);
  }, [id, query]);

  useEffect(() => {
    setQuery({ ...query, catId: cate });
    if (!cate) setTitle("");
  }, [cate]);

  const toggleFilter = (value) => {
    setFilter(value);
  };
  const handleTitle = (value) => {
    setTitle(value);
  };
  const toggleCateMenu = (value) => {
    setCateMenu(value);
  };

  const getProductList = () => {
    let queryParam = query.color
      ? query
      : {
          catId: cate ? cate : queryCat,
          limit:
            skip > getProductsApi.data?.total
              ? getProductsApi.data?.total
              : skip,
        };
    getProductsApi.request(queryParam);
  };

  return (
    <div className="py-4">
      {!mobile && (
        <h1 className="capitalize text-xl px-20 font-bold flex items-center">
          {id == "for-him" ? "For Him" : "For Her"}{" "}
          {title && <p className="ml-2">- {title}</p>}
        </h1>
      )}
      <div className="grid grid-cols-2 border items-center p-2 sm:px-20 sm:py-10 sm:border-none">
        <div
          className="flex items-center justify-between sm:justify-start gap-4 border-r sm:border-none px-2 sm:px-0"
          onClick={() => toggleCateMenu(!cateMenu)}
        >
          <h4 className="capitalize">danh mục</h4>
          <Icon
            className={`${cateMenu ? "-rotate-180" : ""} transition-all`}
            name={mobile ? "right" : "down"}
            width="20"
            height="20"
          />
        </div>
        <div
          className="flex items-center justify-between sm:justify-end gap-4 px-2 sm:px-0 cursor-pointer "
          onClick={(e) => toggleFilter(!filter)}
        >
          <h4 className="capitalize">refine by</h4>
          <Icon name="filter" width="20" height="20" />
        </div>
      </div>
      <CateFilter
        isOpen={cateMenu}
        handleClose={toggleCateMenu}
        catId={id == "for-him" ? "3vvRIM" : "y8Q15I"}
        setTitle={handleTitle}
      />
      <Filter isOpen={filter} handleClose={toggleFilter} />
      <div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 sm:px-20 ">
          {(productsList || []).map((product) => (
            <Product key={product.id} {...product} />
          ))}
          {!productsList.length && (
            <p className="text-center col-span-full">
              Không tìm thấy sản phẩm phù hợp
            </p>
          )}
        </div>
        <div ref={loadMoreRef}>{getProductsApi.loading && <Loader />}</div>
      </div>
    </div>
  );
};

export default Category;
