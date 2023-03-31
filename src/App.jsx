import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Footer, Modal, Nav, Notification, Sticker } from "./components";

import {
  Home,
  Category,
  ProductDetail,
  Checkout,
  Campaign,
  Search,
  PurchaseThank,
  PurchaseCancel,
  Blog,
  Article,
} from "./pages";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { FilterProvider } from "./context/FilterContext";
import { ModalProvider } from "./context/ModalContext";
import ScrollToTop from "./plugin/ScrollTop";
import { ConfettiProvider } from "./context/ConfettiContext";
const App = () => {
  return (
    <div className="container max-w-full min-h-screen">
      <BrowserRouter>
        <ConfettiProvider>
          <ModalProvider>
            <NotificationProvider>
              <ScrollToTop>
                <CartProvider>
                  <FilterProvider>
                    <div className="w-full relative ">
                      <div>
                        <Nav />
                      </div>
                      <div className=" bg-white w-full transition-all pt-[60px] sm:pt-[80px]">
                        <Routes>
                          <Route exact path="/" element={<Home />} />
                          <Route exact path="/c/:id" element={<Category />} />
                          <Route
                            exact
                            path="/c/:id/:cate"
                            element={<Category />}
                          />
                          <Route
                            exact
                            path="/search/:name/"
                            element={<Search />}
                          />
                          <Route
                            exact
                            path="/campaign/:slug"
                            element={<Campaign />}
                          />
                          <Route
                            exact
                            path="/p/:slug"
                            element={<ProductDetail />}
                          />
                          <Route exact path="/blog" element={<Blog />} />
                          <Route
                            exact
                            path="/blog/:slug"
                            element={<Article />}
                          />
                          <Route
                            exact
                            path="/checkout"
                            element={<Checkout />}
                          />
                          <Route exact path="/blog" element={<Blog />} />
                          <Route
                            exact
                            path="/thankyou"
                            element={<PurchaseThank />}
                          />
                          <Route
                            exact
                            path="/canceled"
                            element={<PurchaseCancel />}
                          />
                        </Routes>
                      </div>
                      <div>
                        <Footer />
                      </div>
                      <Notification />
                      <Modal />
                      {/* <Sticker /> */}
                    </div>
                  </FilterProvider>
                </CartProvider>
              </ScrollToTop>
            </NotificationProvider>
          </ModalProvider>
        </ConfettiProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
