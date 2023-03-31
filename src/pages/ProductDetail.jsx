import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Loader } from "../components";
import { ProductContext } from "../context";
import {
  useApi,
  useWindowDimension,
  useFacebookPixel,
  useAnalytic,
} from "../hooks";
import productService from "../services/product.service";
import { Gallery, Variation, Info, Relative, Interact } from "../views/product";
const ProductDetail = () => {
  let { slug } = useParams();
  const { viewContent, pageView } = useFacebookPixel();
  const { width } = useWindowDimension();
  const getProductDetailApi = useApi(productService.getProductDetail);

  const [mobile, setMobile] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const [colorSelect, setColorSelect] = useState();
  const [purchaseItem, setPurchaseItem] = useState({
    name: "",
    media: "",
    variation: {},
    colorName: "",
    color: "",
    size: "",
    slug: "",
    quantity: 1,
  });
  useAnalytic();
  useEffect(() => {
    pageView();
  }, []);
  useEffect(() => {
    setColorSelect("");
    getProductDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (getProductDetailApi.data !== null) {
      viewContent(getProductDetailApi.data);
      document.title = getProductDetailApi.data.name;
      setProductDetail(getProductDetailApi.data);
    }
  }, [getProductDetailApi.data]);

  useEffect(() => {
    reponsive();
  }, [width]);

  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  };
  const getProductDetail = (slug) => {
    getProductDetailApi.request({ slug });
  };
  return (
    <div>
      <ProductContext.Provider
        value={{ colorSelect, setColorSelect, purchaseItem, setPurchaseItem }}
      >
        {getProductDetailApi.loading && <Loader />}
        <div>
          <div className="sm:grid sm:grid-cols-3 lg:p-10 xl:px-28 ">
            <div className="sm:col-span-2">
              <Gallery {...productDetail} />
            </div>
            <div className="sm:col-span-1">
              <Variation {...productDetail} />
              {mobile ? (
                <>
                  <Info {...productDetail} />
                  <Interact {...productDetail} />
                </>
              ) : (
                <>
                  <Interact {...productDetail} />
                  <Info {...productDetail} />
                </>
              )}
            </div>
          </div>
          <Relative {...productDetail} />
        </div>
      </ProductContext.Provider>
    </div>
  );
};

export default ProductDetail;
