import { useContext, createContext, useState, useEffect } from "react";
import { useApi, useFacebookPixel } from "../hooks";
import orderService from "../services/order.service";
import { useNoti } from "./NotificationContext";
const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState();
  const checkStockApi = useApi(orderService.checkStock);
  const { notification } = useNoti();
  const { addCart, pageView, viewContent } = useFacebookPixel();
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) setCartItems(JSON.parse(cart));
  }, []);

  useEffect(() => {
    if (checkStockApi.data !== null) {
      if (checkStockApi.data == false)
        notification("Sản phẩm đã hết hàng", "fail");
    }
  }, [checkStockApi.data]);

  useEffect(() => {
    if (cartItems) {
      totalCalculate();
      addCart(cartItems);
    }
  }, [cartItems]);

  const toggleCart = (data) => {
    setOpen(data);
  };
  const addLocalStorage = (currentCart) => {
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const addItem = (item) => {
    let { variation, ...rest } = item;
    if (!variation || !variation.id) return;
    let currentCart = JSON.parse(JSON.stringify(cartItems));
    if (!currentCart[variation.id]) {
      currentCart[variation.id] = {
        ...rest,
        id: variation.id,
        quantity: 0,
        price: variation.price,
        salePrice: variation.salePrice,
      };
    }
    currentCart[variation.id].quantity += 1;
    setCartItems(currentCart);
    addLocalStorage(currentCart);
  };
  const totalCalculate = () => {
    let currentCart = JSON.parse(JSON.stringify(cartItems));
    if (!currentCart) return;
    let total = Object.values(currentCart).reduce((total, current) => {
      if (current.salePrice)
        return total + current.salePrice * current.quantity;
      return total + current.price * current.quantity;
    }, 0);
    let quantityItem = Object.values(currentCart).reduce((total, current) => {
      return total + current.quantity;
    }, 0);
    setQuantity(quantityItem);
    setTotalAmount(total);
  };

  const increaseItem = (id) => {
    let currentCart = JSON.parse(JSON.stringify(cartItems));
    if (!currentCart[id]) return;
    // currentCart[id].quantity += 1;
    checkStockApi.request({ id: id, stock: (currentCart[id].quantity += 1) });
    if (!checkStockApi.data) {
      currentCart[id].quantity--;
    }
    setCartItems(currentCart);
    addLocalStorage(currentCart);
  };

  const decreaseItem = (id) => {
    let currentCart = JSON.parse(JSON.stringify(cartItems));
    if (!currentCart[id]) return;
    currentCart[id].quantity -= 1;
    if (currentCart[id].quantity <= 0) return removeItem(id);
    setCartItems(currentCart);
    addLocalStorage(currentCart);
  };

  const removeItem = (id) => {
    let currentCart = JSON.parse(JSON.stringify(cartItems));
    delete currentCart[id];
    setCartItems(currentCart);
    addLocalStorage(currentCart);
  };

  const clearCart = () => {
    setCartItems({});
    addLocalStorage({});
  };

  return (
    <CartContext.Provider
      value={{
        open,
        totalAmount,
        quantity,
        toggleCart,
        cartItems,
        addItem,
        increaseItem,
        decreaseItem,
        removeItem,
        clearCart,
        totalCalculate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
