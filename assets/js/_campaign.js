import { __templates } from "./share/_components.js";
import { __currency_format, __init_filter, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
export const __templates_campaign = {
  banner(params) {
    let div = document.createElement("div");
    div.className = "hero__banner";
    div.innerHTML = `
      <div style="background-image:url(https://sss-dashboard.leanservices.work${params.banner}.jpeg)"></div>
    `;
    return div;
  },
  gender_filter(params) {
    let div = document.createElement("div");
    div.className = "gender__filter";
    div.innerHTML = `
      <ul>
        <li data-cate="3vvRIM">NAM</li>
        <li data-cate="y8Q15I">NỮ</li>
      </ul>
    `;
    let filter_btn = div.querySelectorAll("ul > li");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let product_container = document.querySelector("#sale_products");
        let product_sale = product_container.querySelectorAll("li");
        product_sale.forEach((item) => {
          if (e.target.dataset.cate != item.dataset.cat) {
            item.style.display = "none";
          } else {
            item.style.display = "block";
          }
        });
      });
    });

    return div;
  },
  price_filter(params) {
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
    <ul id="sale_products">
      ${__templates.busy_loading("show")}
    </ul>
    `;
    let product_items = (params.products || [])
      .map((item) => {
        return `
      <li data-cat="${item.catId[0][0]}" class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
          item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
        })"></span></a>
        </div>
        <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
        <div class="price">
          ${
            item.salePrice
              ? `<p>${__currency_format(item.salePrice)}</p>
            <p class="discount">${__currency_format(item.price)}</p> `
              : `<p>${__currency_format(item.price)}</p>`
          }
        </div>
        ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
        <div class="color">
          <p>+${item.color.length} màu</p>
        </div>
    </li>
      `;
      })
      .join("");
    let product_sale_container = div.querySelector("ul");
    product_sale_container.innerHTML = product_items;
    return div;
  },
};
