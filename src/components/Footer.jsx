import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { Icon } from ".";
import { RefundModal } from "./popup";

const Footer = () => {
  const { toggleModal, setModal } = useModal();
  const openRefundModal = () => {
    toggleModal(true);
    setModal(<RefundModal />);
  };
  return (
    <div className="bg-primary-500 p-4 pb-60 text-secondary sm:grid sm:grid-cols-4 sm:gap-8">
      <div className="mt-5">
        <h2 className="uppercase">ssstutter</h2>
        <p className="text-justify sm:w-2/3 py-3">
          Với thông điệp "Refined Life", SSStutter mong muốn đem đến cho khách
          hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.
        </p>
      </div>
      <div className="mt-5">
        <h2 className="uppercase">chi nhánh hà nội</h2>
        <ul className="py-3">
          <li>105 - D6, ngõ 4B Đặng Văn Ngữ</li>
          <li>70 Tô Hiến Thành</li>
          <li>167 Cầu Giấy</li>
          <li>46 Đông Các</li>
        </ul>
      </div>
      <div className="mt-5">
        <h2 className="uppercase">chi nhánh tp. hồ chí minh</h2>
        <ul className="py-3">
          <li>Lầu 1, số 25, Nguyễn Trãi, Q1</li>
          <li>152 Nguyễn Gia Trí, Bình Thạnh</li>
        </ul>
      </div>
      <div>
        <div className="mt-5">
          <h2 className="uppercase">chính sách</h2>
          <ul className="py-3">
            <li className="cursor-pointer" onClick={openRefundModal}>
              Hướng dẫn đổi trả
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="uppercase">liên hệ</h2>
          <ul className="py-3">
            <li>info@ssstutter.com</li>
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="uppercase">social</h2>
          <ul className="py-3 flex items-center gap-5">
            <li>
              <Link to="/">
                <Icon width="25" height="25" name="facebook" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Icon width="25" height="25" name="instagram" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Icon width="25" height="25" name="youtube" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Icon width="25" height="25" name="tiktok" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
