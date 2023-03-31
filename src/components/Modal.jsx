import React, { useEffect } from "react";
import { useConfetti } from "../context/ConfettiContext";
import { useModal } from "../context/ModalContext";
const Modal = () => {
  const { open, toggleModal, modal } = useModal();
  const { setShow } = useConfetti();

  useEffect(() => {
    if (open == false) {
      setShow(false);
    }
  }, [open]);

  return (
    <div>
      <div
        onClick={() => toggleModal(false)}
        className={`absolute z-50 ${
          open ? "h-full w-screen" : "h-0 w-0"
        } bg-primary-300 backdrop-blur-sm top-0 left-0`}
      ></div>
      <div
        className={`${
          open ? "translate-x-1/2 right-1/2  " : "translate-x-full right-0"
        }
      fixed z-50 w-[90vw] sm:w-auto h-auto max-h-[90vh] max-w-[90vw] overflow-auto bg-white ease-in-out top-1/2 -translate-y-1/2  transition-all duration-300 p-1`}
      >
        {modal}
      </div>
    </div>
  );
};

export default Modal;
