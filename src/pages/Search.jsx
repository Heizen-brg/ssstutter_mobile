import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, Input, Loader } from "../components";
import { useAnalytic, useApi, useFacebookPixel } from "../hooks";
import productService from "../services/product.service";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [recentKey, setRecentKey] = useState([]);
  const [toggleHistory, setToggleHistory] = useState(false);
  const { searchContent } = useFacebookPixel();
  const { name } = useParams();
  const getProductsApi = useApi(productService.getProductList);

  useAnalytic();
  useEffect(() => {
    if (getProductsApi.data?.result !== null) {
      setProducts(getProductsApi.data?.result);
      searchContent(recentKey, getProductsApi.data?.result);
    }
  }, [getProductsApi.data?.result]);
  useEffect(() => {
    getProductsApi.request({ name });
  }, [name]);

  const getProductListBySearch = (value) => {
    getProductsApi.request({
      name: value,
    });
    setRecentKey([...recentKey, value]);
    setProducts(getProductsApi.data?.result);
  };

  useEffect(() => {
    if (!searchValue.length) return;
    const delayDebounceFn = setTimeout(() => {
      getProductListBySearch(searchValue);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const initRecentSearch = (value) => {
    setSearchValue(value);
    setToggleHistory(false);
  };

  return (
    <div className="p-4">
      <div className="w-full relative mb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm"
          className="w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={(e) => setToggleHistory(true)}
          onBlur={(e) => setToggleHistory(false)}
        />
        {toggleHistory && recentKey.length != 0 && (
          <div className="absolute  z-10 flex flex-wrap w-full max-h-72 gap-2 p-2 rounded drop-shadow-md bg-secondary overflo-y-auto">
            {recentKey.map((value, index) => (
              <p
                key={index}
                className="px-2 py-1 border rounded cursor-pointer"
                onMouseDown={(e) => initRecentSearch(value)}
              >
                {value}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2 ">
        {getProductsApi.loading && <Loader />}
        {(products || []).map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Search;
