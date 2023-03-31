import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components";
import { CONFIG } from "../../config";
import { useCart } from "../../context/CartContext";
import NumberFormat from "react-number-format";
const CartList = (props) => {
  const { className } = props;
  const { cartItems, increaseItem, decreaseItem, removeItem } = useCart();

  if (!Object.values(cartItems).length)
    return <li className="p-10 text-center">Giỏ hàng chưa có sản phẩm</li>;
  return (
    <ul className={className}>
      {Object.values(cartItems).map((item, index) => (
        <li className="grid grid-cols-3 p-4 border-b gap-5" key={index}>
          <div className="col-span-1">
            <span
              style={{
                backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${item.media})`,
              }}
              className="portrait"
            ></span>
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <div>
              <div className="uppercase flex items-center justify-between">
                <Link className="" to={`/p/${item.slug}`}>
                  {item.name}
                </Link>
                <Icon
                  name="close"
                  width="15"
                  height="15"
                  onClick={() => removeItem(item.id)}
                />
              </div>
              <div className="flex items-center gap-4">
                {item.salePrice && (
                  <NumberFormat
                    value={item.salePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={false}
                    renderText={(value, props) => <h3>{value}</h3>}
                  />
                )}
                <NumberFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={false}
                  renderText={(value, props) => (
                    <h3
                      className={`${
                        item.salePrice ? "line-through text-primary-100" : ""
                      } `}
                    >
                      {value}
                    </h3>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="grid gap-1">
                <div className="grid grid-cols-3 items-center ">
                  <p className="capitalize font-light text-sm">quantity</p>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <button
                      className="text-xl px-1"
                      onClick={() => decreaseItem(item.id)}
                    >
                      -
                    </button>
                    <p className="text-center">{item.quantity}</p>
                    <button
                      className="text-xl px-1 "
                      onClick={() => increaseItem(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                  <p className="capitalize font-light text-sm">color</p>
                  <p>{item.colorName}</p>
                </div>

                <div className="grid grid-cols-3 items-center ">
                  <p className="capitalize font-light text-sm">size</p>
                  <p>{item.size}</p>
                  <NumberFormat
                    value={
                      item.salePrice
                        ? item.quantity * item.salePrice
                        : item.quantity * item.price
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={false}
                    renderText={(value, props) => <h2>{value}</h2>}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
