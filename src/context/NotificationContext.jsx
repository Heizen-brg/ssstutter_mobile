import { useContext, useEffect,useState, createContext } from "react";

const NotificationContext = createContext({});

const NotificationProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState('');

 const notification = (content,type) => {
  setOpen(true);
  setText(content);
  setType(type);
 }
  
  return (
    <NotificationContext.Provider value={{open,text,type,notification, setOpen}}>
      {children}
    </NotificationContext.Provider>
  )
}
const useNoti = ()=> useContext(NotificationContext);
export {useNoti, NotificationProvider}

