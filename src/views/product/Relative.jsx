import React, { useEffect, useState } from "react";
import { Slick, Product } from "../../components";
import { useApi, useLinkDrag, useWindowDimension } from "../../hooks";
import productService from "../../services/product.service";
const Relative = (props) => {
  const { id, catId = [] } = props;
  const {width} = useWindowDimension()
  const {clickLink,dragLink} = useLinkDrag()
  const getSaleProductApi = useApi(productService.getSaleProduct);
  const [products, setProducts] = useState([]);
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    getRelativeProduct();
  }, []);

  useEffect(() => {
    if (getSaleProductApi.data !== null) {
      setProducts(getSaleProductApi.data);
    }
  }, [getSaleProductApi.data]);
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
  const getRelativeProduct = () => {
    getSaleProductApi.request();
  };
  return (
    <div className="p-4 border-t sm:p-16">
      <h4 className="uppercase text-sm mb-4">có thể bạn sẽ thích</h4>
      <Slick vertical={false} perView={4} loop={true} isDot={false} mobileView={2}>
        {(products || []).map((product) => (
          <Product onClick={clickLink} onMouseDown={dragLink} className="m-2" key={product.id} {...product} />
        ))}
      </Slick>
    </div>
  );
};

export default Relative;
