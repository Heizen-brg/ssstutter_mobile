import { __icons } from "./share/_icons.js";
import { __render, __requests } from "./main.js";
import { __countdown_timer, __currency_format, __get_voucher, __show_cart_item, __show_cart_quantity } from "./share/_function.js";
import { __templates } from "./share/_components.js";
import { CONFIG } from "./config.js";
let mobile = window.innerWidth <= 575;
let tablet = window.innerWidth <= 768 && window.innerWidth > 575;
let desktop = window.innerWidth > 780;
let typing_timer = null;
let close_menu = () => {
  let close = document.querySelectorAll(".close");
  close.forEach((btn) => {
    btn.addEventListener("click", () => {
      let menu = document.querySelectorAll("[data-menu]");
      menu.forEach((block) => {
        block.classList.remove("active");
      });
    });
  });
};

export const __templates_header = {
  hide_menu() {
    let menu = document.querySelectorAll("[data-menu]");
    let triggers = document.querySelectorAll("[data-active]");
    triggers.forEach((item) => item.classList.remove("active"));
    menu.forEach((block) => {
      block.classList.remove("active");
    });
  },

  show_menu(item) {
    item.classList.remove("fade-out");
    item.classList.add("active");
    let menu = document.querySelectorAll("[data-menu]");
    menu.forEach((container) => {
      container.dataset.menu == item.dataset.action
        ? container.classList.add("active")
        : container.classList.remove("active");
    });
  },

  header(params = {}) {
    let header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `
      <div class="nav__popup"></div>
      <div class="nav">
        <div class="nav__logo">
          <a href="/">
            ${__icons.ssstutter}
          </a>
        </div>
        <div class="nav__left"></div>
        <div class="nav__right"></div>
      </div>
      <div class="side__nav" data-menu="side_nav">
        <div class="side__nav--title">
          <a href="/">
            <img src="/assets/img/logo.png"/>
          </a>
          <div class="close">${__icons.close}</div>
        </div>
        <div class="nav__mobile"></div>
        <div class="side__nav--footer">
          <h1>SSStutter - LEANOW JOINT STOCK COMPANY®</h1>
        </div>
      </div>
    `;
    ["popup", "left", "right", "mobile"].forEach((pos) => {
      let block = header.querySelector(`.nav__${pos}`);
      if (params[pos]) {
        __render.build_in_block({
          block: block,
          target: params[pos],
        });
      } else if (!params[pos]) {
        block.innerHTML = "";
      } else block.innerHTML = params[pos];
    });
   
    header.querySelector(".close").addEventListener("click", () => {
      this.hide_menu();
    });

    window.onscroll = () => {
      let nav_bar = header.querySelector(".nav");
      let main = document.getElementById("root");
      if (main.classList.contains("home") && !mobile) {
        let prevScrollpos = window.pageYOffset;
        if (prevScrollpos > 100) {
          nav_bar.classList.remove("deactive");
        } else {
          nav_bar.classList.add("deactive");
        }
      }
    };

    return header;
  },

  left(params = {}) {
    let div = document.createElement("div");
    div.className = "nav__left--items";
    if (desktop || tablet) {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/menu/get`,
        },
        ({ data }) => {
          let menu_item = (data || [])
            .map((item) => {
              return `
          <div data-active="${item.attribute}" data-action="megamenu" ><a style="color:${item.style}" href="${item.url}">${item.title}</a></div>
          `;
            })
            .join("");
          div.innerHTML = menu_item;
        }
      );
    } else {
      div.innerHTML = `
      <div data-active="" data-action="side_nav">${__icons.nav}</div>
    `;
    }
    let menu = div.querySelectorAll("[data-action]");
    menu.forEach((item) => {
      if (desktop || tablet) {
        item.addEventListener("mouseenter", (e) => {
          this.hide_menu();
          this.show_menu(item);
          let megamenu_categories = document.querySelector(".megamenu__categories");
          __requests(
            {
              method: "GET",
              url: `product/attribute/category/get`,
            },
            ({ data, error }) => {
              let parent_cat_arr = data.filter((cate) => cate.parentId == item.dataset.active);
              megamenu_categories.innerHTML = `
                <ul>
                  ${(parent_cat_arr || [])
                    .map((cate) => `<li data-cate="${cate.id}"><p>${cate.name}</p></li>`)
                    .join("")}
                </ul>
            `;
            }
          );
        });
      } else {
        item.addEventListener("click", (e) => {
          this.hide_menu();
          this.show_menu(item);
        });
      }
    });
    return div;
  },

  right(params = {}) {
    let div = document.createElement("div");
    div.className = "nav__right--items";
    div.innerHTML = `
      <div data-active="" data-action="search">${__icons.search}</div>
      <div data-active="" data-action="cart">
        ${__icons.cart}
        <span data-toggle="cart_toggle"></span>
      </div>
    `;
    let triggers = div.querySelectorAll("[data-action]");
    let cart_quantity = div.querySelector('[data-toggle="cart_toggle"]');
    __show_cart_quantity(cart_quantity);
    triggers.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (item.classList.contains("active")) {
          this.hide_menu();
        } else {
          this.hide_menu();
          this.show_menu(item);
        }
      });
    });
    return div;
  },

  popup(params = {}) {
    let div = document.createElement("div");
    div.className = "nav__popup--items";
    div.innerHTML = `
      <a href="/campaign/friends-day">
        <div></div>
        <p>FRIENDS DAY - Ưu đãi Ngày bạn bè: Đồng giá 199.000 cho áo thun - Quần Short</p>
        <div class="clock"></div>
      </a>
    `;
    // window.onscroll = function () {
    //   if (window.pageYOffset > params.page_y_offset) {
    //     if (document.querySelector(".header .freeship")) {
    //       document.querySelector(".header .freeship").classList.add('active');
    //     }
    //   } else {
    //     document.querySelector(".header .freeship").classList.remove('active');
    //   }
    // };

    // let clock_div = div.querySelector(".clock");
    // let end_time = new Date('Dec 26 2021 23:59:59').getTime()
    // __countdown_timer({div :clock_div, end : end_time })
    return div;
  },

  mobile() {
    let ul = document.createElement("ul");
    ul.className = "nav__mobile--items";
    __requests(
      {
        method: "GET",
        url: `https://sss-dashboard.leanservices.work/w/menu/get`,
      },
      ({ data }) => {
        let menu_item = (data || [])
          .map((item) => {
            return `
              <li data-cat="toggle" >
                <a data-cat="${item.attribute}" class="${item.style}" ${
              item.attribute ? `data-src="${item.url}"` : `href="${item.url}"`
            } >${item.title}</a>
                <ul class="mega_menu_items mega_menu_items--show">

                </ul>
              </li>
        `;
          })
          .join("");
        ul.innerHTML = menu_item;
        let cat_toggle = ul.querySelectorAll('[data-cat="toggle"]');
        cat_toggle.forEach((item) => {
          let cat_link = item.querySelector("a");
          cat_link.addEventListener("click", () => {
            if (item.querySelector("ul").classList.contains("active")) {
              cat_link.setAttribute("href", cat_link.dataset.src);
              item.querySelector("ul").classList.remove("active");
            } else {
              get_cat_list({ category: cat_link.dataset.cat, container: item.querySelector("ul") });
              item.querySelector("ul").classList.add("active");
            }
          });
        });
      }
    );
    let get_cat_list = (params) => {
      __requests(
        {
          method: "GET",
          url: `product/attribute/category/get`,
        },
        ({ data, error }) => {
          let parent_cat_arr = data.filter((item) => item.parentId == params.category);
          let cat_item = (parent_cat_arr || [])
            .map(
              (cate) => `<li data-cate="${cate.id}"><a href="/c/${cate.slug}">${cate.name.replace("-", "")}</a></li>`
            )
            .join("");
          params.container.innerHTML = cat_item;
        }
      );
    };
    return ul;
  },

  megamenu(params = {}) {
    let div = document.createElement("div");
    div.className = "megamenu__container";
    div.dataset.menu = "megamenu";
    div.innerHTML = `
    <div>
      <h1 class="title">danh mục</h1>
      <ul class="megamenu__categories">
      </ul>
    </div>
    <div>
      <h1 class="title">new arrivals</h1>
      <ul class="megamenu__newarrivals">
        ${(params.new_arrivals || []).map((i) => `<li><a href="${i.link}">${i.text}</a></li>`).join("")}
      </ul>
    </div>
    <ul class="megamenu__banner">
      <li><a style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/megahim.jpg)" href=""></a></li>
      <li><a style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/megaher.jpg)" href=""></a></li>
    </ul>
    `;

    div.addEventListener("mouseleave", (e) => {
      let menu = document.querySelectorAll("[data-action]");
      menu.forEach((item) => {
        item.classList.remove("active");
      });
      div.classList.remove("active");
    });
    return div;
  },

  search(params = {}) {
    let div = document.createElement("div");
    div.className = "search__container";
    div.dataset.menu = "search";
    div.innerHTML = `
      <div class="search__header">
        ${__icons.back}
        <h1>Tìm kiếm</h1>
      </div>
      <div class="search__input">
        <input data-action="search_product" type="text" placeholder="Tìm kiếm..." />
      </div>
      <div class="options__block"></div>
    `;
    let search_input = div.querySelector('[data-action="search_product"]');
    let block = div.querySelector(`.options__block`);
    __render.build_in_block({
      block: block,
      target: params.option,
    });
    search_input.addEventListener("keydown", (e) => {
      get_product_on_search(block.querySelector(".related__product--list"), e);
      if (e.keyCode == 13) {
        window.location.href = `/search?name=${e.target.value}`;
      }
    });

    let get_product_on_search = (item_field, e) => {
      clearTimeout(typing_timer);
      if (e.target.value.length > 0) {
        typing_timer = setTimeout(() => {
          __requests(
            {
              method: "GET",
              url: `https://api.ssstutter.com/product/filter/web?name=${e.target.value}&media=true&webStock=true`,
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

    let close_btn = div.querySelector('[data-action="close"]');
    close_btn.addEventListener("click", () => {
      this.hide_menu();
    });
    return div;
  },

  cart(params = {}) {
    let div = document.createElement("div");
    div.className = "cart__container";
    div.dataset.menu = "cart";
    div.innerHTML = `
      <div class="mini__cart">
        <div class="mini__cart--header">
          ${__icons.back}
          <h1>Giỏ Hàng</h1>
        </div>
        <ul class="cart__item--list">

        </ul>
        <div class="total__cart">
          <p>Tổng:</p>
          <strong data-amount="purchase"></strong>
        </div>
        <div class="total__cart">
          <small>Ưu đãi:</small>
          <small data-amount="discount">0</small>
        </div>
        <div class="total__cart">
          <small>Phí ship:</small>
          <small data-amount="shipping">0</small>
        </div>
        <div class="total__cart">
          <p>Thành tiền:</p>
          <strong data-amount="total">0</strong>
        </div>
        <div class="cart__btn">
          <button class="checkout__btn">thanh toán</button>
        </div>
      </div>
    `;

    let cart_item_wrapper = div.querySelector("ul");
    let total_dom = div.querySelector("[data-amount]");
    __show_cart_item(cart_item_wrapper, total_dom);
    let close_btn = div.querySelector('[data-action="close"]');
    close_btn.addEventListener("click", () => {
      this.hide_menu();
    });
    let to_checkout_btn = div.querySelector(".checkout__btn");
    to_checkout_btn.addEventListener("click", () => {
      window.location.href = "/checkout";
    });

    __get_voucher({ discountDiv: div });
    return div;
  },
};
