import { __templates } from "./share/_components.js";
import {
  __currency_format,
  __init_filter,
  __init_product_list,
  __init_product_sale_list,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
export const __templates_campaign = {
  banner(params) {
    let div = document.createElement("div");
    div.className = "hero__banner";
    div.innerHTML = `
      <div style="background-image:url(${params.sale == 'friend' ? 'https://i.imgur.com/USpGvxk.jpg' : 'https://i.imgur.com/HRtBtbZ.jpg'})"></div>
    `;
    return div;
  },
  gender_filter() {
    let div = document.createElement("div");
    div.className = "gender__filter";
    div.innerHTML = `
     <ul>
      <li data-cate="3vvRIM">FOR HIM</li>
      <li data-cate="y8Q15I">FOR HER</li>
     </ul>
    `;
    let filter_btn = div.querySelectorAll("ul > li");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let product_container = document.querySelector("#sale_products");
        product_container.dataset.cate = btn.dataset.cate;
        if (btn.dataset.cate == "y8Q15I") {
          __init_product_sale_list({
            container: product_container,
            query: __init_filter(window.data_filter, btn, 0),
          });
        } else {
          __init_product_list({
            container: product_container,
            query: __init_filter(window.data_filter, btn, 0),
          });
        }
      });
    });

    return div;
  },
  price_filter() {
    let div = document.createElement("div");
    div.className = "price__filter";
    div.innerHTML = `
     <ul>
      <li data-price="1">< 100k</li>
      <li data-price="2">100k - 300k</li>
      <li data-price="3">300k - 500k</li>
      <li data-price="4">500k > </li>
     </ul>
    `;
    return div;
  },
  sale_products(params = {}) {
    let div = document.createElement("div");
    div.className = "categories__products";
    div.innerHTML = ` 
    <ul id="sale_products" data-cate="3vvRIM">
      ${__templates.busy_loading("show")}
    </ul>
    `;
    let product_container = params.container
      ? params.container
      : div.querySelector("ul");
    // __init_product_sale_list({
    //   container: product_container,
    //   query: __init_filter(window.data_filter, product_container, 0)
    // });
    __init_product_list({
      container: product_container,
      query: __init_filter(window.data_filter, product_container, 0),
    });
    return div;
  },
};
