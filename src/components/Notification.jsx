import React, {useEffect} from "react";
import { useNoti } from "../context/NotificationContext";

const Notification = () => {
  const { open,setOpen, type, text } = useNoti();
  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 2500);

  }, [open])
  
  return (
    <div
      className={`${
        open ? "-translate-x-2" : "translate-x-full"
        
      }
      ${type =="success" ? "border-green-600 text-green-600 bg-green-200": "border-warning text-warning bg-red-200"}
      fixed z-50 top-2 right-0 ease-in-out  transition-all duration-300 border p-2 rounded-md `}
    >
      {text}
    </div>
  );
};

export default Notification;
