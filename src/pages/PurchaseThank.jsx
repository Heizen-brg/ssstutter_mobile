import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { SpinModal } from "../components/popup";
import { CONFIG } from "../config";
import { useModal } from "../context/ModalContext";
import { useAnalytic, useFacebookPixel } from "../hooks";
const PurchaseThank = (props) => {
  const { toggleModal, setModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { purchase } = useFacebookPixel();
  const [orderData, setOrderData] = useState([]);
  useAnalytic();
  useEffect(() => {
    document.title = "ĐẶT HÀNG THÀNH CÔNG";
  }, []);
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      purchase(location.state.items);
      setOrderData(location.state);
    }
  }, [location]);

  const openSpinModal = () => {
    toggleModal(true);
    setModal(<SpinModal />);
  };
  return (
    <>
      {location.state && (
        <div className="sm:p-20 p-10">
          <div className="w-full grid place-content-center ">
            <h1 className="text-center">Đặt hàng thành công</h1>
            <h4 className="text-center">Cảm ơn bạn đã ủng hộ SSSTUTTER</h4>
          </div>
          <div className="flex sm:flex-row flex-col gap-10 sm:gap-5 sm:mt-10 mt-4 p-4 sm:px-20 sm:py-10 border">
            <div className="sm:basis-1/2">
              <h2 className="sm:text-xl uppercase">Thông tin đơn hàng</h2>
              <div className="mt-4 grid gap-5 p-2">
                <p>Mã đơn hàng : {orderData.ticketId}</p>
                <p>Tên khách hàng : {orderData.customerName}</p>
                <p>Số điện thoại : {orderData.customerPhone}</p>
                <p>Địa chỉ : {orderData.shippingAddress}</p>
              </div>
            </div>
            <div className="sm:basis-1/2">
              <h2 className="sm:text-xl uppercase">Sản phẩm đã mua</h2>
              <ul className="max-h-[100vh] overflow-auto">
                {(orderData.items || []).map((item, index) => (
                  <li
                    className="grid grid-cols-3 p-4 border-b gap-5"
                    key={index}
                  >
                    <div className="col-span-1">
                      <span
                        style={{
                          backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${
                            item.thumbnail ? item.thumbnail.o : "no_image.png"
                          })`,
                        }}
                        className="portrait"
                      ></span>
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                      <div>
                        <div className="uppercase flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          {item.name}
                          <NumberFormat
                            value={
                              item.discountedPrice
                                ? item.discountedPrice
                                : item.price
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={false}
                            renderText={(value, props) => (
                              <h3 className="text-end">{value}</h3>
                            )}
                          />
                        </div>
                        {item.itemVoucherDiscount > 0 && (
                          <h3 className="text-end">
                            <NumberFormat
                              value={item.itemVoucherDiscount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={false}
                              renderText={(value, props) => ({ value })}
                            />
                          </h3>
                        )}
                      </div>
                      <div className="w-full">
                        <div>
                          <div className="w-full flex justify-between items-center gap-4">
                            <p className="uppercase text-xs">Số lượng:</p>
                            <p className="text-md">{item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex justify-end py-2 border-t">
                          <NumberFormat
                            value={item.finalPrice}
                            className="flex flex-end w-full"
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={false}
                            renderText={(value, props) => (
                              <h2 className="">{value}</h2>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="py-5">
                <div className="flex justify-between ">
                  <h3 className="text-xl">Tổng hoá đơn :</h3>
                  <NumberFormat
                    value={orderData.moneyTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={false}
                    renderText={(value, props) => (
                      <h2 className="text-2xl font-semibold">{value}</h2>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* {orderData.moneyTotal >= 600000 && (
            <h2 className="p-2 text-center">
              Chúc mừng bạn đã nhận được một phần quà từ SSSTUTTER với hoá đơn
              trên 600.000, nhấn nút nhận quà để khám phá nhé !
            </h2>
          )} */}
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-center gap-4 sm:gap-10 uppercase w-full">
            <Link to="/" className="basis-full sm:basis-1/3">
              <Button className="w-full p-2 sm:p-4 !bg-white border !text-black">
                tiếp tục mua sắm
              </Button>
            </Link>
            {/* {orderData.moneyTotal >= 600000 && (
              <Button
                className="basis-full sm:basis-1/3 p-2 sm:p-4"
                onClick={openSpinModal}
              >
                Nhận quà
              </Button>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseThank;
