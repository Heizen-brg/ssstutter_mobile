import React from "react";
import { useModal } from "../context/ModalContext";
import { SpinModal } from "./popup";
const Sticker = () => {
  const { toggleModal, setModal } = useModal();

  const openModal = () => {
    toggleModal(true);
    setModal(<SpinModal />);
  };

  return (
    <div className="fixed bottom-40 right-10">
      <img
        onClick={openModal}
        src="/img/wheel/center.png"
        className="w-14 h014"
        alt=""
      />
    </div>
  );
};

export default Sticker;
