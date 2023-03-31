import React, { useEffect, useState } from "react";
import { Button, Icon } from "../../components";
import { ProductContext } from "../../context";
import { useCart } from "../../context/CartContext";
import { useNoti } from "../../context/NotificationContext";

import NumberFormat from "react-number-format";

const Interact = (props) => {
  const { name, price, salePrice, childs = [] } = props;
  const { purchaseItem, setPurchaseItem } = React.useContext(ProductContext);
  const { toggleCart, addItem } = useCart();
  const { notification } = useNoti();
  const [btn, setBtn] = useState("thêm vào giỏ");


  const addToCart = () => {
    if (!purchaseItem.color) {
      notification("Vui lòng chọn màu sản phẩm", "fail");
      return;
    } else if (!purchaseItem.size) {
      notification("Vui lòng chọn size sản phẩm", "fail");
      return;
    }
    let childItem = childs.find(
      (i) =>
        String(i.color.id) === String(purchaseItem.color) &&
        String(i.size) === String(purchaseItem.size)
    );
    let newPurchaseItem = { ...purchaseItem, variation: childItem };
    setPurchaseItem(newPurchaseItem);
    toggleCart(true);
    return addItem(newPurchaseItem);
  };


  return (
    <div className="border-t sm:border-none border-primary-100 p-4 sticky bottom-0 z-10 bg-white">
      <div className="flex items-center justify-between sm:hidden">
        <h2>{name}</h2>
        <div className="flex items-center gap-2">
          <p
            className={` text-lg ${
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
          {salePrice && (
            <h5 className="text-warning text-xl">
              <NumberFormat
                value={salePrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </h5>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 gap-4">
        <Button
          onClick={addToCart}
          className="uppercase p-2 text-lg font-medium w-full"
        >
          {btn}
        </Button>
        <Icon name="heart" width="30" height="30" />
      </div>
    </div>
  );
};

export default Interact;
