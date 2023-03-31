import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { useAnalytic } from "../hooks";

const PurchaseCancel = () => {
  useAnalytic()
  useEffect(() => {
    document.title = "THANH TOÁN ĐÃ BỊ HUỶ";
  }, []);

  return (
    <div className="sm:p-20 p-10">
      <div className="w-full grid place-content-center border p-4 ">
        <h1 className="text-center font-bold sm:text-2xl">
          Thanh toán không thành công
        </h1>
        <h4 className="text-center">Bạn đã xác nhận huỷ thanh toán</h4>
        <p className="text-center mt-5">
          Vui lòng liên hệ SSStutter để được hỗ trợ
        </p>
        <p className="text-center text-lg font-semibold">
          Hotline:086 993 6266
        </p>
      </div>

      <div className="">
        <Link
          to="/"
          className=" mt-4 sm:flex sm:justify-center uppercase w-full"
        >
          <Button className="w-full sm:w-1/3 p-2 sm:p-4">về trang chủ</Button>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseCancel;
