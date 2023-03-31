import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader, Icon } from ".";
import { useApi, useScrollPosition, useWindowDimension } from "../hooks";
import cmsServices from "../services/cms.service";
import productService from "../services/product.service";
const SideNav = ({ isOpen, handleClose, setClose }) => {
  const { width } = useWindowDimension();
  const scrollDir = useScrollPosition();
  const getMenuApi = useApi(cmsServices.getMenuList);
  const getCatApi = useApi(productService.getProductListByAttr);

  const [mobile, setMobile] = useState(false);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    getMenuList();
    getCateMenu();
  }, []);

  useEffect(() => {
    if (scrollDir == "down") {
      setClose(false);
    }
  }, [scrollDir]);

  useEffect(() => {
    reponsive();
  }, [width]);

  useEffect(() => {
    if (getMenuApi.data) {
      setMenuList(getMenuApi.data);
    }
  }, [getMenuApi.data]);

  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  };
  const getMenuList = async () => {
    await getMenuApi.request();
  };
  const getCateMenu = () => {
    getCatApi.request({ parentId: "" }, "category");
  };

  const MenuList = (props) => {
    const { url, style, attribute, title } = props;
    const [toggle, setToggle] = useState(false);
    const toggleCatList = () => {
      setToggle(!toggle);
    };
    return (
      <>
        <li className="flex justify-between items-center px-4 py-2 flex-col sm:items-start sm:justify-start ">
          <div className="uppercase w-full text-sm flex justify-between">
            <Link
              to={url}
              style={{ color: style }}
              className="w-2/3 sm:w-fit truncate group"
              onClick={handleClose}
            >
              {title}
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary-300"></span>
            </Link>
            <Icon
              className={`${attribute ? "" : "hidden"} ${
                toggle ? "rotate-90" : ""
              } transition-all duration-300 sm:hidden`}
              name="right"
              width="15"
              height="15"
              color="black"
              onClick={toggleCatList}
            />
          </div>
          {attribute && (
            <div
              className={`sm:px-0 w-full sm:mt-4 sm:grid sm:grid-cols-2 overflow-auto ease-in-out transition-all duration-300 ${
                toggle
                  ? "translate-x-0 h-auto p-4"
                  : "-translate-x-full h-0 sm:translate-x-0 sm:h-[20vh]"
              }`}
            >
              {(getCatApi.data?.result || [])
                .filter((i) => i.parentId === attribute)
                .map((item) => (
                  <Link
                    to={`/c/${attribute == "3vvRIM" ? "for-him" : "for-her"}/${
                      item.id
                    }`}
                    key={item.id}
                    onClick={handleClose}
                    className="block w-fit text-xs font-light py-2 transition duration-300 group lowercase"
                  >
                    {item.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary-300"></span>
                  </Link>
                ))}
            </div>
          )}
        </li>
      </>
    );
  };

  return (
    <div>
      <div
        onClick={handleClose}
        className={`absolute z-40 w-full ${
          isOpen ? "h-full w-screen" : "h-0 w-0"
        } bg-primary-100 sm:bg-none backdrop-blur-1 transition`}
      ></div>
      <div
        className={`${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full sm:-translate-y-full sm:translate-x-0"
        } fixed w-2/3 sm:w-full h-screen sm:h-auto z-50 top-0 sm:translate-y-[79px] left-0 ease-in-out transition-all duration-300 sm:border-b  `}
      >
        <div className={` bg-secondary h-full sm:h-auto w-full sm:w-full`}>
          {mobile && (
            <div className="flex justify-between items-center bg-primary-500 text-white p-4">
              <Link to="/" onClick={handleClose}>
                <h1 className="text-3xl">ssstutter</h1>
              </Link>
              <Icon
                name="close"
                width="20"
                height="20"
                color="white"
                onClick={handleClose}
              />
            </div>
          )}
          <div className="py-10 sm:grid sm:grid-cols-5">
            <ul className="overflow-auto sm:px-5 sm:max-h-[50vh]">
              {(menuList || [])
                .filter((i) => !i.attribute)
                .map((menu, index) => (
                  <MenuList key={index} {...menu} />
                ))}
            </ul>
            <ul className="overflow-auto sm:col-span-4 sm:grid sm:grid-cols-2 sm:px-5 sm:max-h-[50vh]">
              {(menuList || [])
                .filter((i) => i.attribute)
                .map((menu, index) => (
                  <MenuList key={index} {...menu} />
                ))}
            </ul>
          </div>

          {/* {mobile && (
          <Link to="" className="flex items-center gap-4 absolute bottom-0 p-4">
            <Icon name="account" width="20" height="20" />
            <p className="uppercase text-md">đăng nhập</p>
          </Link>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
