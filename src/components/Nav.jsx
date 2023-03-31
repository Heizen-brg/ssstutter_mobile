import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon, SideNav, Search, Cart, Login } from ".";
import { useCart } from "../context/CartContext";
import { useApi, useWindowDimension } from "../hooks";
import cmsService from "../services/cms.service";

const Nav = () => {
  const { open, toggleCart, quantity } = useCart();
  const { width } = useWindowDimension();
  const getMenuApi = useApi(cmsService.getMenuList);

  const [mobile, setMobile] = React.useState(true);
  const [activeNav, setActiveNav] = React.useState(false);
  const [activeSearch, setActiveSearch] = React.useState(false);
  const [activeLogin, setActiveLogin] = React.useState(false);
  const [menuList, setMenuList] = useState([]);
  const reponsive = () => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 1024) {
      setMobile(false);
    }
  };
  const toggleSideNav = () => {
    setActiveNav(!activeNav);
    setActiveSearch(false);
    setActiveLogin(false);
    toggleCart(false);
  };

  const toggleLogin = () => {
    setActiveLogin(!activeLogin);
    setActiveNav(false);
    setActiveSearch(false);
    toggleCart(false);
  };

  const toggleSearch = () => {
    setActiveSearch(!activeSearch);
    setActiveNav(false);
    setActiveLogin(false);
    toggleCart(false);
  };

  useEffect(() => {
    if (getMenuApi.data) setMenuList(getMenuApi.data);
  }, [getMenuApi.data]);

  useEffect(() => {
    setActiveNav(false);
    setActiveSearch(false);
  }, [open]);

  useEffect(() => {
    getMenuApi.request();
  }, []);

  useEffect(() => {
    reponsive();
  }, [width]);

  return (
    <>
      <div className="w-full px-4 sm:px-20 py-2 sm:py-4 grid grid-cols-3 fixed top-0 left-0 z-50 bg-secondary h-[60px] sm:h-[80px] drop-shadow-sm sm:drop-shadow-none">
        {mobile && (
          <div className="flex flex-row justify-start items-center gap-4">
            <Icon name="menu" height="20" width="20" onClick={toggleSideNav} />
            <Icon name="search" height="20" width="20" onClick={toggleSearch} />
          </div>
        )}
        {!mobile && (
          <div className="flex flex-row justify-start sm:justify-between items-center gap-16 sm:gap-2 uppercase">
            <Icon name="menu" height="20" width="20" onClick={toggleSideNav} />
            {menuList
              .filter((i) => !i.attribute)
              .map((menu) => (
                <Link
                  key={menu.id}
                  style={{ color: menu.style }}
                  className="truncate"
                  to={menu.url}
                >
                  {menu.title}
                </Link>
              ))}
          </div>
        )}
        <div className="grid place-content-center">
          <Link to="/">
            <img className="w-5 sm:w-7" src="/img/new_logo.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-row justify-end items-center gap-4 sm:gap-16">
          {!mobile && (
            <Icon name="search" height="20" width="20" onClick={toggleSearch} />
          )}
          <Icon name="account" height="20" width="20" onClick={toggleLogin} />
          <div className="relative">
            <Icon
              name="cart"
              height="20"
              width="20"
              onClick={() => toggleCart(!open)}
            />
            {quantity > 0 && (
              <p className="absolute px-1 -bottom-1 -right-1 text-[8px] text-white rounded-full bg-warning">
                {quantity}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <SideNav
          isOpen={activeNav}
          handleClose={toggleSideNav}
          setClose={setActiveNav}
        />
        <Login isOpen={activeLogin} handleClose={toggleLogin} />
        <Search isOpen={activeSearch} handleClose={toggleSearch} />
        <Cart isOpen={open} handleClose={() => toggleCart(false)} />
      </div>
    </>
  );
};

export default Nav;
