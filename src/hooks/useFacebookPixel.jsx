import React, { useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";

const useFacebookPixel = () => {
  ReactPixel.init("2822192974735799", {}, { debug: false, autoConfig: true });

  const pageView = () => {
    ReactPixel.pageView();
  };
 const searchContent = (value,data) => {
  ReactPixel.track('Search', { 
    search_string: value,
    content_category: 'Product Search',
    content_ids: (data || []).map(i => i.id),
  })
 }
  const viewContent = (data) => {
    const { name, id, catId, price } = data;
    ReactPixel.track("ViewContent", {
      content_type: "product",
      content_name: name,
      content_ids: id,
      content_category: catId[0],
      value: price,
    });
  };

  const addCart = (data) => {
    ReactPixel.track("AddToCart", {
      content_type: "product",
      contents: data,
      content_ids: Object.values(data).map((item) => item.id),
      currency: "VND",
      value: Object.values(data).reduce((total, current) => {
        let price = current.salePrice ? current.salePrice : current.price;
        return total + price;
      }, 0),
    });
  };
  const purchase = (data) => {
    ReactPixel.track("Purchase", {
      contents: data,
      content_ids: data.map((item) => item.id),
    });
  };
  const checkout = (data) => {
    ReactPixel.track("InitiateCheckout", {
      content_ids: Object.values(data).map((item) => item.id),
    });
  };

  return {
    viewContent,
    pageView,
    purchase,
    checkout,
    addCart,
    searchContent
  };
};

export default useFacebookPixel;
