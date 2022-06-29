import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import {
    SimpleImage,
    Header,
    Paragraph,
    List,
    Button,
} from "./editor-plugin/plugin-list.js";

import {
    __currency_format,
    __get_voucher,
    __push_notification,
    __show_cart_item,
    __show_cart_quantity,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";
import { __templates_header } from "./_header.js";
import { CONFIG } from "./config.js";
import { __size_guide_data } from "./share/_data.js";
let user_selection = {};
export const __templates_product = {
  product_gallery(params = {}) {
            let gallery = params.extensions ? params.extensions.media : {};
            let color = params.color[0].id;
            let div = document.createElement("div");
            div.className = "gallery";
            div.innerHTML = `
    <ul>
      ${(gallery[`color_${color}_gallery`] || [])
        .map(
          (img) =>
            `<li style="background-image:url(${
              CONFIG.DOMAIN_IMG_CDN
            }/${img.o.replace(".jpeg", ".jpeg")}"></li>`
        )
        .join("")}
    </ul>
    ${__icons.swipe}
    `;
    return div;
  },
 
  model_info(params = {}) {
    let div = document.createElement("div");
    div.className = "model";
    div.innerHTML = `
      <h1>model info</h1>
      <div>
        <ul>
          <li>178 cm , 69 kg</li>
          <li>Chiều dài vai : 45 cm</li>
          <li>Vòng ngực: 90 cm</li>
          <li>Chiều dài chân: 101 cm</li>
          <li>Size Áo : 2 (L)</li>
          <li>Size Quần : 3 (XL)</li>
        </ul>
        <div>
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/WideBlazer-14.jpg)"></span>
        </div>
      </div>
    `;
    return div;
  },

  flatlay_view(params = {}) {
    let div = document.createElement("div");
    div.className = "flatlay";
    div.innerHTML = `
      <h1>Chi tiết</h1>
        <ul class="glide" id="flatlay_glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides flatlay__container">
            
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
          </div>
        </ul>  
    `;
    let init_flatlay_img = () => {
      let media = params.extensions.media;
      let colors_arr = params.color;
      let color_value = colors_arr.map((color) => {
        return {
          id: color.id,
          photo: media[`color_${color.id}_thumbnail`],
        };
      });
      let flat_img = color_value
        .map((item, index) => {
          return `
          <li class="glide__slider">
            <span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
            item.photo == null
              ? "no_image.png"
              : item.photo.o.replace(".jpeg", ".jpeg")
          })"></span>
          </li>
        `;
        }).join("");
      let color_variation = div.querySelector(".flatlay__container");
      color_variation.innerHTML = flat_img;
      setTimeout(() => {
        new Glide("#flatlay_glide", {
          type: "slider",
          perView: 1,
          peek: {
            before: 200,
            after: 200,
          },
          breakpoints: {
            1024: {
              perView: 1,
            },
            480: {
              perView: 1,
              gap: 10,
              peek: {
                before: 0,
                after: 0,
              },
            },
          },
          autoplay: false,
        }).mount();
      }, 200);
    };
    init_flatlay_img();
    return div;
  },
  variation(params = {}) {
    let info = params;
    info.size = info.size.sort((a, b) => a - b);
    let div = document.createElement("div");
    div.className = "variation";
    div.innerHTML = `
      <div itemscope itemtype="http://schema.org/Product">
        <meta itemprop="brand" content="ssstutter">
        <meta itemprop="name" content="${info.name}">
        <meta itemprop="productID" content="${info.id}">
        <meta itemprop="url" content="https://ssstutter.com/p/${info.slug}">
        <meta itemprop="image" content="https://cdn.ssstutter.com/products/${
          info.extensions.media.featured
        }">
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
          <link itemprop="availability" href="in stock">
          <link itemprop="itemCondition" href="new">
          <meta itemprop="price" content="${info.salePrice || info.price}">
          <meta itemprop="priceCurrency" content="VND">
        </div>
      </div>
      <div class="product__overview">
        <div class="detail">
          <div class="info">
            <h1 class="name">${info.name.replace("II", "Ⅱ")}</h1>
            <div class="price">
            ${
              info.salePrice
                ? `<p>${__currency_format(info.salePrice)}</p>`
                : ""
            }
            ${
              info.salePrice
                ? `<p class="discount">${__currency_format(info.price)}</p>`
                : ` <p>${__currency_format(info.price)}</p>`
            }
            </div>
          </div>
        </div>
        <div class="color">
          <p>chọn màu : <strong class="color__name"> </strong></p>
          <ul>
          
          </ul>
        </div>
        <div class="size">
          <div><p>chọn size : <strong class="size__name"> </strong></p><span data-action="size_check">${
            __icons.rule
          } Bảng size </span></div>
          <ul>

          </ul>
        </div>
        <div class="interact">
          <button class="add"><h1>Thêm vào giỏ hàng</h1></button>
        </div>  
        <ul class="guide">
          <li data-action="refund_policy">${
            __icons.refund
          } Chính sách đổi trả</li>
        </ul>
          ${
            params.shortDescription && params.shortDescription.blocks && params.shortDescription.blocks.length ? `
            <div class="description">
              <p>Chi tiết :</p>
              <div id="product_des"></div>
            </div>
            ` : ''
          }
      </div>
    `;
    if (params.shortDescription && params.shortDescription.blocks && params.shortDescription.blocks.length)  {
      new EditorJS({
      holder: 'product_des',
      readOnly: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        button: {
          class: Button,
          inlineToolbar: true,
        },
      },
      data: {
        blocks: params.shortDescription.blocks,
      },
    });
    }

    user_selection = {
      name: info.name,
      media: info.extensions.media,
      id: info.id,
      catId: info.catId.join(""),
      price: info.price,
      salePrice: info.salePrice,
      variation: info.variation[0],
      color: info.color[0].value,
      colorId: info.color[0].id,
      colorName: info.color[0].name,
      size: info.size[0],
      slug: info.slug,
      quantity: 1,
    };

    let init_flatlay_img = (value) => {
      let media = info.extensions.media;
      let colors_arr = info.color;
      let color_value = colors_arr.map((color) => {
        return {
          id: color.id,
          name: color.name,
          value: color.value,
          photo: media[`color_${color.id}_thumbnail`],
        };
      });
      color_value.map((item, index) => {
        let isStock = Object.values(info.variation)
          .filter((i) => String(i.color) === String(item.id))
          .some((i) => i.isStock);
        // if (!info.preOrder && !isStock) return;
        let flat_color = document.createElement("li");
        flat_color.innerHTML = `
        <button 
          class="color__variation" 
          ${isStock ? "" : "disabled"}
          data-product='${JSON.stringify(info).replace("'", "")}'
          data-color='${JSON.stringify(item)}'
          data-index="${index}"
          style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
          item.photo == null
            ? "no_image.png"
            : item.photo.x400.replace(".jpeg", ".jpeg")
        })"
        >
        </button>
        `;
        let color_variation = div.querySelector(".color > ul");
        color_variation.appendChild(flat_color);
        init_size(color_value[0].id);
        return flat_color;
      });
    };
    let init_size = (params) => {
      user_selection.size = 0;
      let size_wrapper = div.querySelector(".size > ul");
      let size_arr = Object.values(info.variation)
        .filter((i) => String(i.color) === String(params))
        .map((j) => {
          return {
            size: j.size,
            isStock: j.isStock,
          };
        });
      let size_render = size_arr
        .sort((a, b) => a.size - b.size)
        .map((i, index) => {
          return `
        <li><button data-index="${index}" class=" size__variation ${
            user_selection.size ? "active" : ""
          }" 
          ${i.isStock || info.preOrder ? "" : "disabled"} data-value="${
            i.size
          }">${i.size}</button></li>`;
        })
        .join("");
      size_wrapper.innerHTML = size_render;
      let size_variation = div.querySelectorAll(".size__variation");
      size_variation.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let size_select = div.querySelector(".size__name");
          size_select.innerHTML = btn.dataset.value;
          e.preventDefault();
          size_variation.forEach((btn) => btn.classList.remove("active"));
          btn.classList.add("active");
          user_selection.size = btn.dataset.value;
          
        });
      });
    };
    let on_change_variation = () => {
      let color_variation = div.querySelectorAll(".color__variation");
      color_variation.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          let product_gallery = document.querySelector(".gallery");
          let color_name_select = div.querySelector(".color__name");
          let product = JSON.parse(btn.dataset.product);
          let gallery = product.extensions.media;
          let variation = product.variation;
          let color = JSON.parse(btn.dataset.color);
          // console.log(variation);
          color_name_select.innerHTML = color.name;
          color_variation.forEach((btn) => btn.classList.remove("active"));
          btn.classList.add("active");
          product_gallery.innerHTML = `
          <ul>
            ${(gallery[`color_${color.id}_gallery`] || [])
              .map(
                (img) =>
                  `<li style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${img.o.replace("jpeg", "jpeg")})"></li>`
              )
              .join("")}
          </ul>
          `;
          user_selection.color = color.value;
          user_selection.colorName = color.name;
          user_selection.colorId = color.id;
          init_size(color.id);
        });
      });
    };
    let init_add_to_cart = (params) => {
      let to_cart_btn = null;
      // let gift_purchased = JSON.parse(localStorage.getItem("giftItem")) || "";
      if (div.querySelector(".add")) {
        to_cart_btn = div.querySelector(".add");
        to_cart_btn.addEventListener("click", (e) => {
          let cart_selected = JSON.parse(localStorage.getItem("cartItem"))
            ? JSON.parse(localStorage.getItem("cartItem"))
            : [];
          let cart_menu = document.querySelector('[data-menu="cart"]');
          let variation = params.variation;
          e.preventDefault();
          user_selection.variation = variation.find(
            (item) =>
              item.color == user_selection.colorId &&
              item.size == user_selection.size
          );
          let new_selected_item = { ...user_selection };
          let [product_in_cart] = cart_selected.filter(
            (i) => i.variation.id === new_selected_item.variation.id
          );
          if (product_in_cart) {
            __requests(
              {
                method: "GET",
                url: `product/variation/check-stock?id=${
                  product_in_cart.variation.id
                }&stock=${product_in_cart.quantity + 1}`,
              },
              ({ data }) => {
                if (!data)
                  return __push_notification("fail", "Sản phẩm hết hàng!");
                cart_selected = cart_selected.map((i) => {
                  if (i.variation.id === new_selected_item.variation.id)
                    i.quantity = parseInt(i.quantity) + 1;
                  return i;
                });

                localStorage.setItem("cartItem", JSON.stringify(cart_selected));
                cart_menu.classList.add("active");
                __show_cart_item(
                  cart_menu.querySelector("ul"),
                  cart_menu.querySelector("[data-amount]")
                );
                __show_cart_quantity(
                  document.querySelector('[data-toggle="cart_toggle"]')
                );
                __get_voucher({ discountDiv: cart_menu });
              }
            );
          } else {
            __requests(
              {
                method: "GET",
                url: `product/variation/check-stock?id=${new_selected_item.variation.id}&stock=1`,
              },
              ({ data }) => {
                if (!data)
                  return __push_notification("fail", "Sản phẩm hết hàng!");
                cart_selected.push(new_selected_item);
                let cart_quantity = cart_selected.reduce((total, current) => {
                  return total + current.quantity;
                }, 0);
                localStorage.setItem("cartItem", JSON.stringify(cart_selected));
                cart_menu.classList.add("active");
                __show_cart_item(
                  cart_menu.querySelector("ul"),
                  cart_menu.querySelector("[data-amount]")
                );
                __show_cart_quantity(
                  document.querySelector('[data-toggle="cart_toggle"]')
                );
                __get_voucher({ discountDiv: cart_menu });
              }
            );
          }
          if (fbq) fbq("track", "AddToCart", {
            content_type: 'product',
            contents : cart_selected,
            content_ids : cart_selected.map(item => item.id),
            currency : 'VND',
            value : new_selected_item.price
        });
        });
      }
    };

   
    let triggers = div.querySelectorAll("[data-action]");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        __templates_modal.overlay({
          content: __templates_modal[btn.dataset.action](params),
        });
      });
    });
    init_flatlay_img();
    on_change_variation();
    init_add_to_cart(info);
    return div;
  },
  suggest_product(params) {
    let div = document.createElement("div");
    div.className = "suggest__product";
    div.innerHTML = `
    <h1>SẢN PHẨM TƯƠNG TỰ</h1>
    <ul class="suggest__product--list">
      ${
        params.mixItems.map(item => {
          return `
            <li>
              <div class="product">
                <div class="thumbnail">
                  <a href="/p/${item.slug}">
                    <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
                  </a>
                </div>
                <div class="detail">
                  <div class="info">
                  <a href="/p/${item.slug}" class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</a>
                  ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                  </div>
                </div>
              </div>
            </li>
          `
        }).join('')
      }
    </ul>
  `;
    let randomCate;
    if (params) {
      let catId = params.catId.join("").split(",");
      randomCate = catId[catId.length - 1];
    }
    let url = !params ? "" : `&catId=${randomCate}&sortBy=stock`;
    let shuffle;
    let container = div.querySelector(".suggest__product--list");
    let get_relative_item = (params) => {
      __requests(
        {
          method: "GET",
          url: `https://api.ssstutter.com/product/filter/web?${params.url}&limit=20&sort=down&media=true&webStock=true&showStock=true`,
          header: {
            authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
          },
        },
        ({ data = [] }) => {
          params.products
            ? (shuffle = data
                .sort(() => 0.5 - Math.random())
                .filter((i) => i.id != params.products.id))
            : (shuffle = data.sort(() => 0.5 - Math.random()));
          (shuffle || []).splice(0, params.limit).map((item) => {
            let product_template = document.createElement("li");
            product_template.innerHTML = `
            <div class="product">
              <div class="thumbnail">
                <a href="/p/${item.slug}">
                  <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
                </a>
              </div>
              <div class="detail">
                <div class="info">
                  <h6 class="name">${item.name.toLowerCase()}</h6>
                  ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
              </div>
            `;
            container.appendChild(product_template);
            return product_template;
          });
        }
      );
    };
    get_relative_item({url : url , products: params, limit: (4 - container.children.length)});
    return div;
  },
  cross_product(params = {}) {
    let div = document.createElement("div");
    div.className = "cross__product";
    div.innerHTML = `
    <h1>SẢN PHẨM ĐƯỢC YÊU THÍCH</h1>
    <div class="glide" id="cross_product">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides" >
            ${__templates.busy_loading("show")}
        </ul>
      </div>
      <div class="glide__arrows" data-glide-el="controls">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
      </div>
    </div>
    `;
    let init_cross_product = (params = "3vvRIM") => {
      __requests(
        {
          method: "GET",
          url: `https://leanservices.work/pd/master/cross-items`,
        },
        ({ data }) => {
          let products = data.splice(0, 10)
            .map(
              (item) =>
                `
            <li class="glide__slide" }">
              <div class="product">
                <div class="thumbnail">
                  <a href="/p/${item.slug}">
                    <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
                  </a>
                </div>
                <div class="detail">
                  <div class="info">
                    <a href="/p/${item.slug}" class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</a>
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
                  </div>
                </div>
              </div>
            </li>
          `
            )
            .join("");
          let glide__track = div.querySelector(".glide__slides");
          glide__track.innerHTML = products;
          new Glide(`#cross_product`, {
            type: "slider",
            bound: true,
            perView: 4,
            autoplay: 5000,
            gap: 20,
            hoverpause: true,
            peek: {
              before: 0,
              after: 100,
            },
            breakpoints: {
              1024: {
                perView: 3,
              },
              480: {
                perView: 2,
                gap: 10,
                peek: {
                  before: 0,
                  after: 50,
                },
              },
            },
          }).mount();
        }
      );
    };
    init_cross_product();
    return div;
  },
  mobile_suggest_product(params ={}) {
    let div = document.createElement('div');
    div.className = 'mobile__suggest';
    div.innerHTML = `
    <div class="block__toggle">
      <button class="active" data-action="mobile_mix_suggest">SẢN PHẨM TƯƠNG TỰ</button>
      <button data-action="mobile_cross_suggest">SẢN PHẨM ĐƯỢC YÊU THÍCH</button>
    </div>
    <div class="products__slider">
      <div class="glide" id="mobile_mix_suggest">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides" >

          </ul>
        </div>
      </div>
      <div class="glide deactive" id="mobile_cross_suggest">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides" >
              ${__templates.busy_loading("show")}
          </ul>
        </div>
      </div>
    </div> 
    `;
    let suggest_slide = div.querySelectorAll('.glide');
    let randomCate;
    if (params) {
      let catId = params.catId.join("").split(",");
      randomCate = catId[catId.length - 1];
    }
    let url = !params ? "" : `&catId=${randomCate}&sortBy=stock`;
    let shuffle;
    let container = div.querySelector("#mobile_mix_suggest .glide__slides ");
    let get_relative_item = (params) => {
      __requests(
        {
          method: "GET",
          url: `https://api.ssstutter.com/product/filter/web?${params.url}&limit=20&sort=down&media=true&webStock=true&showStock=true`,
          header: {
            authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
          },
        },
        ({ data = [] }) => {
          params.products ? (shuffle = data.sort(() => 0.5 - Math.random()).filter((i) => i.id != params.products.id))
            : (shuffle = data.sort(() => 0.5 - Math.random()));
          let relative_item = (shuffle || []).splice(0, params.limit).map((item) => {
            return `       
            <li class="glide__slide">
              <div class="product">
                <div class="thumbnail">
                  <a href="/p/${item.slug}">
                    <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
                  </a>
                </div>
                <div class="detail">
                  <div class="info">
                  <a href="/p/${item.slug}" class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</a>
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
                  </div>
                </div>
              </div>
            </li>
            `;
          }).join('');
          container.innerHTML = relative_item;
             // add mix item
         params.products.mixItems.map(item => {
          let mix_dom = document.createElement('li');
          mix_dom.className = "glide__slide";
          mix_dom.innerHTML = `
          <div class="product">
            <div class="thumbnail">
              <a href="/p/${item.slug}">
                <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
              </a>
            </div>
            <div class="detail">
              <div class="info">
              <a href="/p/${item.slug}" class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</a>
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
                ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
              </div>
            </div>
          </div>
          `;
          container.insertBefore(mix_dom,container.firstChild)
         }).join('');
          setTimeout(() => {
            new Glide(`#mobile_mix_suggest`, {
              type: "slider",
              bound: true,
              perView: 4,
              autoplay: false,
              gap: 20,
              hoverpause: true,
              peek: {
                before: 0,
                after: 100,
              },
              breakpoints: {
                1024: {
                  perView: 3,
                },
                480: {
                  perView: 2,
                  gap: 10,
                  peek: {
                    before: 0,
                    after: 50,
                  },
                },
              },
            }).mount();
          }, 200);
        }
      );
    };
    let init_cross_product = () => {
      __requests(
        {
          method: "GET",
          url: `https://leanservices.work/pd/master/cross-items`,
        },
        ({ data }) => {
          let products = data
            .map(
              (item) =>
                `
            <li class="glide__slide">
              <div class="product">
                <div class="thumbnail">
                  <a href="/p/${item.slug}">
                    <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
                  </a>
                </div>
                <div class="detail">
                  <div class="info">
                    <a href="/p/${item.slug}" class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</a>
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
                  </div>
                </div>
              </div>
            </li>
          `
            )
            .join("");
          let glide__track = div.querySelector("#mobile_cross_suggest .glide__slides");
          glide__track.innerHTML = products;
          setTimeout(() => {
            new Glide(`#mobile_cross_suggest`, {
              type: "slider",
              bound: true,
              perView: 3,
              autoplay: false,
              gap: 20,
              hoverpause: true,
              peek: {
                before: 0,
                after: 50,
              },
              breakpoints: {
                1024: {
                  perView: 3,
                },
                480: {                 
                  perView: 2,
                  gap: 10,
                  peek: {
                    before: 0,
                    after: 50,
                  },
                },
              },
            }).mount();
          }, 200);
        }
      );
    };
    get_relative_item({url : url , products: params, limit: (4 - container.children.length)});

    init_cross_product();
    let toggle_block = div.querySelectorAll("[data-action]");
    toggle_block.forEach((btn) => {
      btn.addEventListener("click", () => {
        let product_block = div.querySelector(`#${btn.dataset.action}`);
        suggest_slide.forEach((i) => i.classList.add("deactive"));
        toggle_block.forEach((i) => i.classList.remove("active"));
        btn.classList.add("active");
        product_block.classList.remove('deactive')
      });
    });
    return div;
  }
};