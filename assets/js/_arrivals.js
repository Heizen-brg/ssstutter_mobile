import { __icons } from "./share/_icons.js";
import { __size_arr } from "./share/_data.js";
import { __templates } from "./share/_components.js";
import { __render, __requests } from "./main.js";
import {
  __remove_item_in_array,
  __to_slug,
  __currency_format,
} from "./share/_function.js";
import { CONFIG } from "./config.js";
let mobile = window.innerWidth <= 425;

window.data_filter = {
  existed_ids: [],
  q: [
    {
      tax: "color",
      data: [],
    },
    {
      tax: "size",
      data: [],
    },
    {
      tax: "price",
      data: [],
    },
    {
      tax: "sortBy=price&sort",
      data: [],
    },
  ],
  price: null,
};

export const __templates_arrivals = {
  infomation() {
    let section = document.createElement("section");
    section.className = "arrivals__info";
    section.innerHTML = `
    <h1 class="info__title">NEW ARRIVALS</h1>
    <p>Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của mình.
    </p>
  `;
    return section;
  },

  him_products(params = {}) {
    let div = document.createElement("div");
    div.className = "arrivals__products";
    div.innerHTML = `
    <div class="banner" data-type="him-new-arrivals">
    </div>
    <ul data-cate="3vvRIM">
      ${__templates.busy_loading("show")}
    </ul>
    <button class="back__top">${__icons.up}</button>
    `;
    let product_container =  div.querySelector("ul");
    let top_btn = div.querySelector(".back__top");
    let banner = div.querySelector('.banner')

    top_btn.addEventListener("click", (e) => {
      product_container.scrollIntoView({ behavior: "smooth" });
    });

    __requests({
      method : 'GET',
      url : `https://sss-dashboard.leanservices.work/w/categories/detail?type=${banner.dataset.type}`
    },({data})=> {
        banner.innerHTML = `<span style="background-image:url(https://sss-dashboard.leanservices.work/${data.thumbnail}.jpeg)"></span>
        `
    })
    __requests(
    {
      method: "GET",
      url: `https://sss-dashboard.leanservices.work/w/section/detail?type=new_arrivals&catId=${product_container.dataset.cate}`,
    },
    ({ data, error }) => {
      __templates.api_loading("hide");
      let products = data.products.map((item) => {
        return `
              <li>
                <div class="product">
                  <div class="thumbnail">
                    <a href="/p/${item.slug}"><span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.extensions.media.featured? item.extensions.media.featured: "no_image.png"})"></span></a>
                  </div>
                  <div class="detail">
                    <div class="info">
                      <h6 class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</h6>
                      <div class="price">
                        ${
                          item.salePrice
                            ? `<p>${__currency_format(item.salePrice)}</p>
                          <p class="discount">${__currency_format(
                            item.price
                          )}</p> `
                            : `<p>${__currency_format(item.price)}</p>`
                        }
                      </div>
                      ${
                        item.salePrice || item.salePrice === 0
                          ? `<p class="tag">${Math.floor(
                              100 - (item.salePrice / item.price) * 100
                            )}%</p>`
                          : ""
                      }
                      <div class="color">
                        <p>+${item.color.length} màu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
                `;
      }).join('');
      product_container.innerHTML = products
    }
  );

    return div;
  },
  her_products(params = {}) {
    let div = document.createElement("div");
    div.className = "arrivals__products";
    div.innerHTML = ` 
    <div class="banner" data-type="her-new-arrivals">
    </div>
    <ul data-cate="y8Q15I">
      ${__templates.busy_loading("show")}
    </ul>
    <button class="back__top">${__icons.up}</button>
    `;
    let product_container =  div.querySelector("ul");
    let banner = div.querySelector('.banner')
    let top_btn = div.querySelector(".back__top");

    top_btn.addEventListener("click", (e) => {
      product_container.scrollIntoView({ behavior: "smooth" });
    });
    __requests({
      method : 'GET',
      url : `https://sss-dashboard.leanservices.work/w/categories/detail?type=${banner.dataset.type}`
    },({data})=> {
        banner.innerHTML = `<span style="background-image:url(https://sss-dashboard.leanservices.work/${data.thumbnail}.jpeg)"></span>
        `
    })
    __requests(
      {
        method: "GET",
        url: `https://sss-dashboard.leanservices.work/w/section/detail?type=new_arrivals&catId=${product_container.dataset.cate}`,
      },
      ({ data, error }) => {
        __templates.api_loading("hide");
        let products = data.products.map((item) => {
          return `
                <li>
                  <div class="product">
                    <div class="thumbnail">
                      <a href="/p/${item.slug}"><span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.extensions.media.featured? item.extensions.media.featured: "no_image.png"})"></span></a>
                    </div>
                    <div class="detail">
                      <div class="info">
                        <h6 class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</h6>
                        <div class="price">
                          ${
                            item.salePrice
                              ? `<p>${__currency_format(item.salePrice)}</p>
                            <p class="discount">${__currency_format(
                              item.price
                            )}</p> `
                              : `<p>${__currency_format(item.price)}</p>`
                          }
                        </div>
                        ${
                          item.salePrice || item.salePrice === 0
                            ? `<p class="tag">${Math.floor(
                                100 - (item.salePrice / item.price) * 100
                              )}%</p>`
                            : ""
                        }
                        <div class="color">
                          <p>+${item.color.length} màu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                  `;
        }).join('');
        product_container.innerHTML = products
      }
    );

    return div;
  },
};
