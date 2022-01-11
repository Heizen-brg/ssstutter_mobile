import { __icons } from "./share/_icons.js";
import { __size_arr } from "./share/_data.js";
import { __templates } from "./share/_components.js";
import { __render, __requests } from "./main.js";
import {
  __remove_item_in_array,
  __init_filter,
  __init_product_list,
  __to_slug,
} from "./share/_function.js";
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
      data : []
    },
    {
      tax: "sortBy=price&sort",
      data : []
    },
  ],
  price: null,
};

export const __templates_categories = {
  infomation(params = {}) {
    let section = document.createElement("section");
    section.className = "categories__info";
    section.innerHTML = `
      <h1 class="info__title">${params.category.name.replace("-", "")}</h1>
      <p>Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của mình.
      </p>
    `;
    return section;
  },
  categories(params = {}) {
    let section = document.createElement("section");
    section.className = "categories__list";
    __requests(
      {
        method: "GET",
        url: `product/attribute/category/get`,
      },
      ({ data, error }) => {
        let top_cat = data.filter(i => !i.parentId).map(i => i.id)
        let parent_cat_arr
        if (top_cat.includes(params.category.id)) {
          parent_cat_arr = data.filter(
            (item) => item.parentId === params.category.id
          );

        } else {
          parent_cat_arr = data.filter(
            (item) => item.parentId === params.category.parentId
          );
        }
        // console.log(parent_cat_arr);
        section.innerHTML = `
        <ul>
          ${(parent_cat_arr || [])
            .map(
              (cate) =>
                `<li><a href="/c/${cate.slug}">${cate.name.replace("-", "")}</a></li>`
            )
            .join("")}
        </ul>
    `;
      }
    );

    return section;
  },

  products(params = {}) {
    let div = document.createElement("div");
    div.className = "categories__products";
    div.innerHTML = ` 
    <ul data-cate="${params.category.id}">
      ${__templates.busy_loading("show")}
    </ul>
    `;
    let product_container = params.container
      ? params.container
      : div.querySelector("ul");
    __init_product_list({
      container: product_container,
      query: __init_filter(window.data_filter, product_container, 0),
    });
    return div;
  },

  filter(params = {}) {
    let div = document.createElement("div");
    div.className = "categories__filter";
    div.innerHTML = `
    <div class="filter__toggle">
      <span class="mobile-cate-trigger" style="text-transform: capitalize">${params.category.name.replace("-", "").toLowerCase()} ${__icons.down}</span>
      <span data-toggle="filter">${__icons.plus} Filter </span>
    </div>
    <div class="filter__list">
      <ul class="filter__list--wrapper">
        <li class="color">
          <h4>Màu sắc
            ${__icons.right}
          </h4>
          <ul class="color__list">
          </ul>
        </li>
        <li class="size">
          <h4>
            Size quần/áo
            ${__icons.right}
          </h4>
          <ul>
          ${__size_arr[0].size
        .map(
          (item) => `
              <li data-name="pa_size" data-size="${item}">
                <label>
                  <input type="checkbox"><span>${item}</span>
                </label>
              </li>
          `
        )
        .join("")}
          </ul>
        </li>
        <li class="size">
          <h4>Size quần jeans
            ${__icons.right}
          </h4>
          <ul>
          ${__size_arr[1].size
        .map(
          (item) => `
          <li data-name="pa_size" data-size="${item}">
            <label>
              <input type="checkbox"><span>${item}</span>
            </label>
          </li>
       `
        )
        .join("")}
          </ul>
        </li>
        <li class="size">
          <h4>Size giày
            ${__icons.right}
          </h4>
          <ul>
          ${__size_arr[2].size
        .map(
          (item) => `
          <li data-name="pa_size" data-size="${item}">
            <label>
              <input type="checkbox"><span>${item}</span>
            </label>
          </li>
       `
        )
        .join("")}
          </ul>
        </li>
        <li class="sort">
          <h4>Mức giá
            ${__icons.right}
          </h4>
          <ul>
            <li data-name="pa_price" data-price="0,100000">
              <label>
                <input type="radio" name="price">
                <span>Dưới 100k</span>
              </label>
            </li>
            <li data-name="pa_price" data-price="100000,300000">
              <label>
                <input type="radio" name="price">
                <span>100k - 300k</span>
              </label>
            </li>
            <li data-name="pa_price" data-price="300000,500000">
              <label>
                <input type="radio" name="price">
                <span>300k - 500k</span>
              </label>
            </li>
            <li data-name="pa_price" data-price="500000">
              <label>
                <input type="radio" name="price">
                <span>Trên 500k</span>
              </label>
            </li>
          </ul>
        </li>
        <li class="sort">
          <h4>Sắp xếp
            ${__icons.right}
          </h4>
          <ul>
            <li data-name="pa_sort" data-sort="up">
              <label>
                <input type="radio" name="sort">
                <span>Giá tăng dần</span>
              </label>
            </li>
            <li data-name="pa_sort" data-sort="down">
              <label>
                <input type="radio" name="sort">
                <span>Giá giảm dần</span>
              </label>
            </li>
          </ul>
        </li>
      </ul>
      <div class="filter__action">
        <button data-action="apply_filter">Áp dụng</button>
        <button data-toggle="filter">Trở lại</button>
      </div>
    </div>
    `;
    __requests(
      {
        method: "GET",
        url: `product/attribute/color/get`,
      },
      ({ data }) => {
        let colors_arr = data;
        colors_arr.map((color) => {
          let li = document.createElement("li");
          li.dataset.name = "pa_color";
          li.dataset.color = color.id;
          li.innerHTML = `
        <label>
          <input type="checkbox">
          <span>${color.name}</span>
        </label>
        `;
          let color_list = div.querySelector(".color__list");
          color_list.appendChild(li);
          li.addEventListener("click", (e) => {
            let product_container = document.querySelector(
              ".categories__products > ul"
            );
            e.preventDefault();
            if (!li.dataset.name) return false;
            let color_attr = li.dataset.color;
            let btn_input = li.querySelector("input");
            btn_input.checked = true;
            if (li.classList.contains("active")) {
              if (window.data_filter.q[0].data) {
                let d = window.data_filter.q[0].data;
                window.data_filter.q[0].data = __remove_item_in_array(
                  color_attr,
                  d
                );
                btn_input.checked = false;
              }
              li.classList.remove("active");
            } else {
              li.classList.add("active");
              if (color_attr) {
                window.data_filter.q[0].data.push(color_attr);
                btn_input.checked = true;
              }
            }
            if (mobile) {
              let apply_btn = div.querySelector('[data-action="apply_filter"]');
              apply_btn.addEventListener("click", (e) => {
                div.querySelector(".filter__list").classList.remove("active");
                e.preventDefault();
                __init_product_list({
                  infinity: false,
                  container: product_container,
                  query: __init_filter(
                    window.data_filter,
                    product_container,
                    0
                  ),
                });
              });
            } else {
              __init_product_list({
                infinity: false,
                container: product_container,
                query: __init_filter(window.data_filter, product_container, 0),
              });
            }
          });
          return li;
        });
      }
    );

    let filter_toggle = div.querySelectorAll('[data-toggle="filter"');
    filter_toggle.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        if (div.querySelector(".filter__list").classList.contains("active")) {
          div.querySelector(".filter__list").classList.remove("active");
        } else {
          div.querySelector(".filter__list").classList.add("active");
        }
      });
    });

    let filter_label = div.querySelectorAll(".filter__list--wrapper > li");
    filter_label.forEach((label) => {
      let trigger = label.querySelector("h4");
      let ul = label.querySelector("ul");
      trigger.addEventListener("click", () => {
        if (ul.classList.contains("active")) {
          ul.classList.remove("active");
        } else {
          ul.classList.add("active");
        }
      });
    });

    let size_filter_list = div.querySelectorAll('[data-name="pa_size"]');
    size_filter_list.forEach((btn) => {
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
            window.data_filter.q[1].data = __remove_item_in_array(size_attr, d);
            btn_input.checked = false;
          }
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
          if (size_attr) {
            window.data_filter.q[1].data.push(size_attr);
            btn_input.checked = true;
          }
        }
        if (mobile) {
          let apply_btn = div.querySelector('[data-action="apply_filter"]');
          apply_btn.addEventListener("click", (e) => {
            div.querySelector(".filter__list").classList.remove("active");
            e.preventDefault();
            __init_product_list({
              infinity: false,
              container: product_container,
              query: __init_filter(window.data_filter, product_container, 0),
            });
          });
        } else {
          __init_product_list({
            infinity: false,
            container: product_container,
            query: __init_filter(window.data_filter, product_container, 0),
          });
        }
      });
    });
    
    let price_range_list = div.querySelectorAll('[data-name="pa_price"]');
    price_range_list.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let product_container = document.querySelector(".categories__products > ul");
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
            window.data_filter.q[2].data =[]
            window.data_filter.q[2].data.push(price_range);
            btn_input.checked = true;
          }
        }
        if (mobile) {
          let apply_btn = div.querySelector('[data-action="apply_filter"]');
          apply_btn.addEventListener("click", (e) => {
            div.querySelector(".filter__list").classList.remove("active");
            e.preventDefault();
            __init_product_list({
              infinity: false,
              container: product_container,
              query: __init_filter(window.data_filter, product_container, 0),
            });
          });
        } else {
          __init_product_list({
            infinity: false,
            container: product_container,
            query: __init_filter(window.data_filter, product_container, 0),
          });
        }
      });
    });

    let sort_list = div.querySelectorAll('[data-name="pa_sort"]');
    sort_list.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let product_container = document.querySelector(".categories__products > ul");
        e.preventDefault();
        if (!btn.dataset.name) return false;
        let sort_type = btn.dataset.sort;
        let btn_input = btn.querySelector("input");
        btn_input.checked = true;
        if (btn.classList.contains("active")) {
          if (window.data_filter.q[3].data) {
            let d = window.data_filter.q[3].data;
            window.data_filter.q[3].data = [];
            btn_input.checked = false;
          }
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
          if (sort_type) {
            window.data_filter.q[3].data =[]
            window.data_filter.q[3].data.push(sort_type);
            btn_input.checked = true;
          }
        }
        if (mobile) {
          let apply_btn = div.querySelector('[data-action="apply_filter"]');
          apply_btn.addEventListener("click", (e) => {
            div.querySelector(".filter__list").classList.remove("active");
            e.preventDefault();
            __init_product_list({
              infinity: false,
              container: product_container,
              query: __init_filter(window.data_filter, product_container, 0),
            });
          });
        } else {
          __init_product_list({
            infinity: false,
            container: product_container,
            query: __init_filter(window.data_filter, product_container, 0),
          });
        }
      });
    });

    //
    // Show / hide cate mobile
    //
    div.querySelector('.mobile-cate-trigger').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.categories__list').classList.toggle('show');
    });

    return div;
  },
};

document.addEventListener('mouseup', (e) => {
  if (!e.target.classList.contains('mobile-cate-trigger')) {
    if (document.querySelector('.categories__list')) document.querySelector('.categories__list').classList.remove('show');
  }
});


