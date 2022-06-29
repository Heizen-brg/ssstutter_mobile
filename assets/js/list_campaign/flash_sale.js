import { __icons } from "../share/_icons.js";
import { __size_arr } from "../share/_data.js";
import { __templates } from "../share/_components.js";
import { __render, __requests } from "../main.js";
import {
  __remove_item_in_array,
  __init_filter,
  __init_product_list,
  __to_slug,
  __keep_scroll_postion,
  __currency_format,
  __init_sale_list,
} from "../share/_function.js";
let mobile = window.innerWidth <= 525;

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
      tax: "salePrice",
      data: [],
    },
    {
      tax: "sortBy=price&sort",
      data: [],
    },
  ],
  price: null,
};

export const __templates_sale = {
  banner() {
    let div = document.createElement("div");
    div.className = "hero__banner";
    div.innerHTML = `
        <div style="background-image:url(${
          mobile
            ? "https://sss-dashboard.leanservices.work/upload/6-2022/1655780507245.jpeg"
            : "https://sss-dashboard.leanservices.work/upload/6-2022/1655780500984.jpeg"
        })"></div>
      `;
    return div;
  },
  campaign_filter() {
    let div = document.createElement("div");
    div.className = "campaign__filter";
    div.innerHTML = `
        <ul class="gender__filter">
          <li class="active" data-filter="catId" data-catId="3vvRIM" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637640613530.jpeg)" ></li>
          <li data-filter="catId" data-catId="y8Q15I" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637640619351.jpeg)" ></li>
        </ul>
       <!-- <ul class="size__filter">
        ${__size_arr[0].size
          .map(
            (item) => `
            <li data-filter="size" data-size="${item}">
              <label>
                <input type="checkbox" hidden><span>Size ${item}</span>
              </label>
            </li>
        `
          )
          .join("")}
        </ul> --!>
        `;
    let filter_btn = div.querySelectorAll("[data-filter]");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filter_btn.forEach((i) => i.classList.remove("active"));
        btn.classList.add("active");
        e.preventDefault();
        if (btn.dataset.catid) {
          div
            .querySelectorAll('[data-filter="size"]')
            .forEach((i) => (i.dataset.catid = btn.dataset.catid));
        }
        let product_container = document.querySelector("#sale_products");
        product_container.dataset.cate = btn.dataset.catid;
        product_container.innerHTML = __templates.busy_loading("show");

        let init_sale_products = ({
          skip = 0,
          limit = 10,
          catId,
          price,
          size
        } = {}) => {
          let query = "";
          if (skip) query += `skip=${skip}&`;
          if (limit) query += `limit=${limit}&`;
          if (catId) query += `catId=${catId}&`;
          if (price) query += `salePrice=${price}&`;
          if (size) query += `size=${size}&`;
          __requests(
            {
              method: "GET",
              url: `https://leanservices.work/pd/services/campaign-sale-list?${query}`,
            },
            ({ data }) => {
              if (!data.length)
                product_container.innerHTML += ` <p style="text-align:center">Không tìm thấy sản phẩm phù hợp</p>`;
              let product_items = (data || []).map((item) => {
                item.catId = item.catId.join(",").split(",");
                let product_template = document.createElement("li");
                product_template.dataset.cat = item.catId[0];
                product_template.className = "product";
                product_template.innerHTML = `
                  <div class="thumbnail">
                    <a href="/p/${
                      item.slug
                    }"><span style="background-image:url(https://cdn.ssstutter.com/products/${
                  item.extensions.media.featured
                    ? item.extensions.media.featured
                    : "no_image.png"
                })"></span></a>
                  </div>
                  <div class="detail">
                    <div class="info">
                      <h6 class="name">${item.name.toLowerCase()}</h6>
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
                `;
                product_container.appendChild(product_template);
                return product_template;
              });
              if (data.length >= 10)
                infinity_scroll(
                  product_items[product_items.length - 2],
                  product_container,
                  {
                    skip,
                    limit,
                    catId,
                    price,
                  }
                );
              __templates.busy_loading("hide");
            }
          );
        };
        let infinity_scroll = (anchor, container, query) => {
          if (!anchor) return false;
          let block_loader = new IntersectionObserver(function (
            entries,
            observer
          ) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                let block = entry.target;
                container.innerHTML += __templates.busy_loading("show");
                init_sale_products({ ...query, skip: query.skip + 10 });
                block_loader.unobserve(block);
              }
            });
          });
          block_loader.observe(anchor);
        };
        init_sale_products({
          catId: btn.dataset.catid || "",
          price: btn.dataset.price || "",
          size: btn.dataset.size || ""
        });
      });
    });

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

    let product_sale_container = div.querySelector("ul");
    __init_sale_list({
      infinity: false,
      container: product_sale_container,
      query: __init_filter({
        data: window.data_filter,
        container: product_sale_container,
        skip: 0,
      }),
    });
    return div;
  },
  filter() {
    let div = document.createElement("div");
    div.className = "categories__filter";
    div.innerHTML = `
    <h1>Chọn size của bạn</h1>
    <ul class="size__filter">
    ${__size_arr[0].size
      .map(
        (item) => `
        <li data-name="pa_size" data-size="${item}">
          <label>
            <input type="checkbox" hidden><span>Size ${item}</span>
          </label>
        </li>
    `
      )
      .join("")}
    </ul>
    `;
    let current_filter = sessionStorage.getItem("filter");
    if (current_filter) window.data_filter = JSON.parse(current_filter);

    let size_filter_list = div.querySelectorAll('[data-name="pa_size"]');
    size_filter_list.forEach((btn) => {
      if (window.data_filter.q[1].data == btn.dataset.size) {
        btn.classList.add('active')
      }
      btn.addEventListener("click", (e) => {
        let product_container = document.querySelector(
          ".categories__products > ul"
        );
        e.preventDefault();
        if (!btn.dataset.name) return false;
        let size_attr = btn.dataset.size;
        let btn_input = btn.querySelector("input");
        btn_input.checked = true;
        if (btn.classList.contains("active")) {
          if (window.data_filter.q[1].data) {
            let d = window.data_filter.q[1].data;
            window.data_filter.q[1].data = '';
            sessionStorage.setItem(
              "filter",
              JSON.stringify(window.data_filter)
            );
            btn_input.checked = false;
          }
          btn.classList.remove("active");
        } else {
          size_filter_list.forEach(i => i.classList.remove('active'))
          btn.classList.add("active");
          if (size_attr) {
            window.data_filter.q[1].data = size_attr;
            sessionStorage.setItem(
              "filter",
              JSON.stringify(window.data_filter)
            );
            btn_input.checked = true;
          }
        }
        __init_sale_list({
          infinity: false,
          container: product_container,
          query: __init_filter({
            data: window.data_filter,
            container: product_container,
            skip: 0,
          }),
        });
      });
    });

    let price_range_list = div.querySelectorAll('[data-name="pa_price"]');
    price_range_list.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let product_container = document.querySelector(
          ".categories__products > ul"
        );
        e.preventDefault();
        if (!btn.dataset.name) return false;
        let price_range = btn.dataset.price;
        let btn_input = btn.querySelector("input");
        btn_input.checked = true;
        if (btn.classList.contains("active")) {
          if (window.data_filter.q[2].data) {
            let d = window.data_filter.q[2].data;
            window.data_filter.q[2].data = [];
            btn_input.checked = false;
          }
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
          if (price_range) {
            window.data_filter.q[2].data = [];
            window.data_filter.q[2].data.push(price_range);
            btn_input.checked = true;
          }
        }
        __init_sale_list({
          infinity: false,
          container: product_container,
          query: __init_filter({
            data: window.data_filter,
            container: product_container,
            skip: 0,
          }),
        });
      });
    });

    return div;
  },
};
