import { __render, __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __currency_format, __get_voucher, __push_notification, __show_cart_item } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";
import { CONFIG } from "./config.js";
let typing_timer = null;
export const __templates_search = {
  input(params = {}) {
    let div = document.createElement("div");
    div.className = "input";
    div.innerHTML = `
        <input data-action="search_product" type="text" placeholder="Tìm kiếm..." />
    `;
    let search_input = div.querySelector('[data-action="search_product"]');

    search_input.addEventListener("keyup", (e) => {
      let search_wrapper = document.querySelector(".search__products--list");
      get_product_on_search(search_wrapper, e);
    });

    let get_product_on_search = (item_field, e) => {
      clearTimeout(typing_timer);
      if (e.target.value.length > 0) {
        typing_timer = setTimeout(() => {
          __requests(
            {
              method: "GET",
              url: `product/filter/web?name=${e.target.value}&media=true&webStock=true`,
            },
            ({ data, error }) => {
              __templates.busy_loading("hide");
              if (!data.length) {
                item_field.innerHTML = `<p>Không có kết quả</p>`;
              } else {
                let products = (data || [])
                  .map((item) => {
                    return `
                  <li>
                    <div class="product fade__in">
                      <div class="thumbnail">
                        <a href="/p/${item.slug}"><span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
                      item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
                    })"></span></a>
                      </div>
                      <h6 class="name">${item.name}</h6>
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
                    </div>
                  </li>
                `;
                  })
                  .join("");
                item_field.innerHTML = products;
              }
            }
          );
        }, 200);
      }
      // else {
      //   item_field.style.display = "none";
      // }
    };
    return div;
  },
  products_list(params) {
    let div = document.createElement("div");
    div.className = "categories__products";
    div.innerHTML = `
      <ul class="search__products--list" data-cate="">

      </ul>
    `;
    let ul = div.querySelector("ul");
    let products = (params.data || [])
      .map((item) => {
        return `
    <li>
      <div class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
          item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
        })"></span></a>
        </div>
        <h6 class="name">${item.name}</h6>
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
      </div>
    </li>
  `;
      })
      .join("");
    ul.innerHTML = products;
    return div;
  },
};
