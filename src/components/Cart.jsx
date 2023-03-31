import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { CartList } from "../views/cart";
import { useCart } from "../context/CartContext";
import NumberFormat from "react-number-format";
const Cart = ({ isOpen, handleClose }) => {
  const { totalAmount } = useCart();
  return (
    <div>
      <div
        onClick={handleClose}
        className={`absolute z-40 w-full ${
          isOpen ? "h-full w-screen" : "h-0 w-0"
        } bg-primary-50 backdrop-blur-1 transition`}
      ></div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed w-screen h-screen md:w-1/2 lg:w-1/4 sm:h-auto sm:translate-y-[79px] overflow-auto z-50 top-0 right-0 ease-in-out bg-secondary transition-all duration-300 sm:border `}
      >
        <div className="h-full w-full">
          <div className="flex items-center justify-between gap-4 p-4 border-b">
            <h1>Giỏ hàng</h1>
            <Icon name="close" width="25" height="25" onClick={handleClose} />
          </div>
          <div className="max-h-[70vh] sm:max-h-[45vh] overflow-auto">
            <CartList />
          </div>
          <div className="p-4 w-full bg-secondary">
            <div className="flex flex-row justify-between items-center">
              <h1 className="uppercase font-light">thành tiền</h1>
              <h1>
                <NumberFormat
                  value={totalAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalSeparator="."
                  prefix={false}
                  renderText={(value, props) => value}
                />
              </h1>
            </div>
            <Link
              to="/checkout"
              className="p-3 mt-5 uppercase text-center bg-black text-white block w-full h-full"
              onClick={handleClose}
            >
              thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
