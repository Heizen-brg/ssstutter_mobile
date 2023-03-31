import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Product, Loader } from ".";
import { useApi, useFacebookPixel, useInfiniteScroll } from "../hooks";
import { Icon, Slick } from ".";
import productService from "../services/product.service";
const Search = ({ isOpen, handleClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [recentKey, setRecentKey] = useState([]);
  const [toggleHistory, setToggleHistory] = useState(false);
  const { loadMoreRef, skip, setSkip } = useInfiniteScroll();
  const { searchContent } = useFacebookPixel();
  const getProductsApi = useApi(productService.getProductList);
  const navigate = useNavigate();

  useEffect(() => {
    if (getProductsApi.data?.result !== null) {
      setProducts(getProductsApi.data?.result);
      searchContent(recentKey, getProductsApi.data?.result);
    }
  }, [getProductsApi.data?.result]);

  useEffect(() => {
    if (!searchValue.length) return;
    const delayDebounceFn = setTimeout(() => {
      getProductListBySearch(searchValue, skip);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, skip]);

  const getProductListBySearch = (value, skip) => {
    getProductsApi.request({
      name: value,
      limit:
        skip > getProductsApi.data?.total ? getProductsApi.data?.total : skip,
    });
    setRecentKey([...recentKey, value]);
  };
  const initRecentSearch = (value) => {
    setSearchValue(value);
    setToggleHistory(false);
  };

  const onEnter = (e) => {
    if (e.key == "Enter") {
      navigate(`/search/${e.target.value}`);
      handleClose();
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? "translate-x-0 sm:translate-y-[75px]"
          : "-translate-x-full sm:-translate-y-full sm:translate-x-0"
      } fixed w-screen h-screen sm:h-auto z-50 top-0 left-0 ease-in-out transition-all duration-300 sm:border-b  `}
    >
      <div className=" h-full w-full bg-secondary ">
        <div className="flex items-center gap-4 bg-secondary p-4 sm:py-10 sm:px-40">
          <Icon
            name="back"
            width="30"
            height="30"
            color="white"
            onClick={handleClose}
          />
          <div className="w-full relative">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              className="w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={(e) => setToggleHistory(true)}
              onBlur={(e) => setToggleHistory(false)}
              onKeyDown={onEnter}
            />
            {toggleHistory && recentKey.length != 0 && (
              <div className="absolute  z-10 w-full  p-2 rounded drop-shadow-md bg-secondary">
                <h1 className="my-4">Tìm kiếm gần đây</h1>
                <div className="flex flex-wrap gap-2 overflo-y-auto max-h-72">
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
              </div>
            )}
          </div>
        </div>
        <div className="mx-4 p-2 border-b flex justify-center items-center gap-1 border-primary-300 sm:mx-40 sm:border sm:p-10 sm:hidden">
          <div className="p-1">
            <Link
              onClick={handleClose}
              className="border text-center rounded bg-secondary p-2"
              to="/c/for-him"
            >
              For Him
            </Link>
          </div>
          <div className="p-1">
            <Link
              onClick={handleClose}
              className="border text-center rounded bg-secondary p-2"
              to="/c/for-her"
            >
              For Her
            </Link>
          </div>
          <div className="p-1">
            <Link
              onClick={handleClose}
              className="border text-center rounded bg-secondary p-2"
              to="/c/for-him/5LoRyo"
            >
              Sơ mi
            </Link>
          </div>
          <div className="p-1">
            <Link
              onClick={handleClose}
              className="border text-center rounded bg-secondary p-2"
              to="/c/for-him/Z1X8tF"
            >
              Quần âu
            </Link>
          </div>
        </div>
        <div className="drop-shadow">
          <div className="p-4 relative min-h-screen overflow-auto">
            {getProductsApi.data?.total > 0 && (
              <h1 className="text-xl text-center p-10">
                Tìm thấy {getProductsApi.data?.total || ""} sản phẩm
              </h1>
            )}
            <div className="max-h-screen sm:max-h-[50vh] overflow-auto grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2 ">
              {(products || []).map((product, index) => (
                <Product key={index} {...product} handleClose={handleClose} />
              ))}
            </div>
            <div ref={loadMoreRef}>{getProductsApi.loading && <Loader />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
