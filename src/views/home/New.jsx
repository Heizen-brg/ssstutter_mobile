import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLinkDrag, useWindowDimension } from "../../hooks";
import productService from "../../services/product.service";
import { Button, Icon, Product, Slick } from "/src/components";
const New = () => {
  const [products, setProducts] = useState([]);
  const { width } = useWindowDimension();
  const {clickLink,dragLink} = useLinkDrag()
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    getWeeklyBest();
  }, []);

  useEffect(() => {
    reponsive();
  }, [width]);

  const reponsive = () => {
    if (width < 528) {
      setMobile(true);
    }
  };
  const getWeeklyBest = async () => {
    const productList = await productService.getProductList();
    setProducts(productList.data.data.result);
  };

  return (
    <section className="px-4 py-6 sm:px-20">
      <div className="py-4 sm:p-16 flex items-center">
        <h1 className="uppercase font-medium sm:text-2xl">bộ sưu tập mới</h1>
        <hr className="w-1/3 sm:w-1/6 ml-5 bg-primary-500 border-primary-500" />
      </div>
      <Slick
        vertical={false}
        perView={4}
        isDot={false}
        mobileView={2}
        centerMode={!mobile}
      >
        {products.map((product) => (
          <Product onClick={clickLink} onMouseDown={dragLink} key={product.id} {...product} className="m-2" />
        ))}
      </Slick>
      <div className="flex justify-center">
        <Link
          to="/c/for-him"
          className="mt-3 p-2 block sm:mx-16 text-center bg-black text-white uppercase w-full sm:w-1/4 text-lg"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
};

export default New;
