import React, { useEffect, useState } from "react";
import { Icon, Input, Select, Button, Loader } from "../components";
import { useCart } from "../context/CartContext";
import { CartList } from "../views/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAnalytic, useApi, useFacebookPixel } from "../hooks";
import { useNoti } from "../context/NotificationContext";
import NumberFormat from "react-number-format";
import locationService from "../services/location.service";
import orderService from "../services/order.service";

const Checkout = () => {
  const checkUserApi = useApi(orderService.checkUser);
  const createOrderApi = useApi(orderService.confirmOrder);
  const checkShippingApi = useApi(orderService.checkShipping);
  const { cartItems, totalAmount, clearCart } = useCart();
  const { notification } = useNoti();
  const { pageView, checkout } = useFacebookPixel();
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    district: "",
    ward: "",
    address: "",
  });

  const [order, setOrder] = useState({
    customerPhone: "",
    customerName: "",
    customerEmail: "",
    paymentMethod: "",
    items: "",
    discountCode: [],
    customerNote: "",
    shippingAddress: "",
    note: "",
    source: "website",
  });
  const [validation, setValidation] = useState({
    customerPhone: "",
    customerName: "",
    paymentMethod: "",
    items: "",
    shippingAddress: "",
  });
  useAnalytic()
  useEffect(() => {
    if (createOrderApi.error) {
      notification(createOrderApi.error, "fail");
    } else {
      if (createOrderApi.data !== null) {
        if (createOrderApi.data?.paymentUrl) {
          window.location.href = createOrderApi.data.paymentUrl;
        } else {
          navigate("/thankyou", { state: createOrderApi.data });
          clearCart();
        }
      }
    }
  }, [createOrderApi.data, createOrderApi.error]);

  useEffect(() => {
    if (checkShippingApi.data !== null) setShippingFee(checkShippingApi.data);
  }, [checkShippingApi.data]);

  useEffect(() => {
    getLocation("city", null, setCity);
    document.title = "THANH TOÁN ĐƠN HÀNG";
    pageView();
  }, []);

  useEffect(() => {
    if (Object.values(address).some((value) => !value)) return;
    let addressFormat = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.city.name}`;
    setOrder({ ...order, shippingAddress: addressFormat });
  }, [address]);

  useEffect(() => {
    const calcShipDelay = setTimeout(() => {
      let shipData = {
        moneyTotal: totalAmount,
        shippingAddress: order.shippingAddress,
      };
      calcShippingFee(shipData);
    }, 1000);
    return () => clearTimeout(calcShipDelay);
  }, [order.shippingAddress]);

  useEffect(() => {
    let cartItemsFormat = Object.values(cartItems).map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
    checkout(cartItemsFormat)

    setOrder({ ...order, items: cartItemsFormat });
  }, [cartItems]);

  const getLocation = async (type, parentId, callback) => {
    let locationData = await locationService.getLocationData(type, {
      parentId: parentId,
    });
    callback(locationData.data.data);
    // console.log(locationData);
  };

  const handleLocationChange = (e) => {
    if (e.target.name === "address") {
      return setAddress({ ...address, [e.target.name]: e.target.value });
    }
    let value = JSON.parse(e.target.value);
    let newAddress = { ...address, [e.target.name]: value };
    if (e.target.name === "city") {
      newAddress.district = "";
      newAddress.ward = "";
      getLocation("district", value.id, setDistrict);
      setDistrict([]);
      setWard([]);
    }
    if (e.target.name === "district") {
      newAddress.ward = "";
      getLocation("ward", value.id, setWard);
    }
    setAddress(newAddress);
  };

  const calcShippingFee = (data) => {
    checkShippingApi.request(data);
  };

  const handleOrderChange = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  const handleCheckVoucher = (e) => {
    if (e.target.value.length !== 10) {
      setValidation({
        ...validation,
        customerPhone: "Vui lòng kiểm tra lại số điện thoại",
      });

      return;
    } else if (e.target.value.length === 10) {
      setValidation({
        ...validation,
        customerPhone: "",
      });
    }
    setOrder({ ...order, customerPhone: e.target.value });
    checkUserApi.request({
      customerPhone: e.target.value,
      items: order.items,
      discountCode: order.discountCode,
    });
  };

  const handleValidation = () => {
    let errors = validation;
    errors.customerName = !order.customerName.trim()
      ? "Vui lòng điền tên của bạn"
      : "";
    errors.customerPhone = !order.customerPhone.trim()
      ? "Vui lòng điền số điện thoại của bạn"
      : "";
    errors.paymentMethod = !order.paymentMethod.trim()
      ? "Vui lòng chọn phương thức thanh toán"
      : "";
    errors.shippingAddress = !order.shippingAddress.trim()
      ? "Vui lòng chọn và ghi rõ địa chỉ"
      : "";
    errors.items = !order.items.length ? "Bạn đang chưa chọn sản phẩm nào" : "";
    return setValidation(errors);
  };

  const createOrder = async () => {
    handleValidation();

    if (
      !order.customerName ||
      !order.customerPhone ||
      !order.customerEmail ||
      !order.shippingAddress ||
      !address.address ||
      !address.ward ||
      !address.district ||
      !address.city
    ) {
      notification("Vui lòng chọn điền đủ thông tin", "fail");
      return;
    } else {
      createOrderApi.request(order);
      // console.log(createOrderApi);
    }
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:p-10 gap-20">
      {createOrderApi.loading && <Loader />}
      <div className="p-4">
        <h1 className="uppercase">thông tin giao hàng</h1>
        <form action="" className="flex flex-col gap-5 sm:gap-10 mt-4 py-2">
          <div>
            <Input
              label="Họ và Tên"
              className="w-full"
              name="customerName"
              onChange={handleOrderChange}
              value={order.customerName}
            />
            {validation.customerName && (
              <p className="p-1 text-warning">{validation.customerName}</p>
            )}
          </div>
          <Input
            label="Email"
            className="w-full"
            name="customerEmail"
            onChange={handleOrderChange}
          />
          <div>
            <Input
              label="Số điện thoại"
              className="w-full"
              name="customerPhone"
              onChange={handleCheckVoucher}
            />
            {validation.customerPhone && (
              <p className="p-1 text-warning">{validation.customerPhone}</p>
            )}
          </div>
          <Select
            className="w-full"
            label="Chọn tỉnh/ Thành phố"
            defaultValue={"default"}
            name="city"
            onChange={handleLocationChange}
          >
            <option value="default" disabled hidden></option>
            {city.map((c, index) => (
              <option key={index} value={JSON.stringify(c)}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            className="w-full"
            name="district"
            label="Chọn quận/ Huyện"
            onChange={handleLocationChange}
            value={
              address.district ? JSON.stringify(address.district) : "default"
            }
          >
            <option value="default" disabled hidden></option>
            {district.map((d, index) => (
              <option key={index} value={JSON.stringify(d)}>
                {d.name}
              </option>
            ))}
          </Select>
          <Select
            className="w-full"
            label="Chọn phường/ Xã"
            name="ward"
            value={address.ward ? JSON.stringify(address.ward) : "default"}
            onChange={handleLocationChange}
          >
            <option value="default" disabled hidden></option>
            {ward.map((w, index) => (
              <option key={index} value={JSON.stringify(w)}>
                {w.name}
              </option>
            ))}
          </Select>
          <div>
            <Input
              label="Số nhà, tên đường"
              className="w-full"
              name="address"
              onChange={handleLocationChange}
            />
            {validation.shippingAddress && (
              <p className="p-1 text-warning">{validation.shippingAddress}</p>
            )}
          </div>
        </form>
      </div>
      <div className="p-4">
        <h1 className="uppercase">phương thức thanh toán</h1>
        <form action="" className="mt-4">
          <div className="flex flex-col gap-2">
            <label className="flex flex-row items-center gap-3 p-2 border rounded">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                onChange={handleOrderChange}
              />
              <Icon name="atm" width="20" height="20" />
              <p className="flex flex-col">
                Thanh toán thẻ (ATM, Visa)
                <small className="text-sm text-green-700">
                  Ưu đãi giảm 10k khi thanh toán
                </small>
              </p>
            </label>
            <label className="flex flex-row items-center gap-3 p-2 border rounded">
              <input
                type="radio"
                name="paymentMethod"
                value="shopeePay"
                onChange={handleOrderChange}
              />
              <Icon name="wallet" width="20" height="20" />
              <p>Thanh toán bằng ví điện tử (OnePay, MoMo,...)</p>
            </label>
            <label className="flex flex-row items-center gap-3 p-2 border rounded">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                onChange={handleOrderChange}
              />
              <Icon name="ship" width="20" height="20" />
              <p>Thanh toán khi nhận hàng (COD)</p>
            </label>
            {validation.paymentMethod && (
              <p className="p-1 text-warning">{validation.paymentMethod}</p>
            )}
          </div>
        </form>
      </div>
      <div>
        <CartList />
        <div className="p-4 grid gap-3 border-b">
          <div className="flex items-center justify-between">
            <h5>Tổng đơn</h5>
            <h1>
              <NumberFormat
                value={totalAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <h5>Ưu đãi (voucher / thành viên)</h5>
            <h1>
              <NumberFormat
                value={discount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <h5>Phí ship</h5>
            <p>
              <NumberFormat
                value={shippingFee}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </p>
          </div>
          {/* <div className="flex items-center justify-between">
            <h5 className="flex items-center gap-2">
              <Icon name="voucher" width="20" height="20" /> Voucher
            </h5>
            <Input
              placeholder="Nhập code voucher tại đây..."
              onChange={handleOrderChange("discountCode")}
            />
          </div> */}
        </div>
        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="uppercase font-light">Thành tiền</h1>
            <h1>
              <NumberFormat
                value={totalAmount + shippingFee - discount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={false}
                renderText={(value, props) => value}
              />
            </h1>
          </div>
          <Button className="w-full p-2 mt-5" onClick={createOrder}>
            hoàn tất đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
