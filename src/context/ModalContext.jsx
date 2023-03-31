import React, { useContext, createContext, useState, useEffect } from "react";

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const toggleModal = (data) => {
    setOpen(data);
  };
  return (
    <ModalContext.Provider
      value={{
        open,
        modal,
        setModal,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
