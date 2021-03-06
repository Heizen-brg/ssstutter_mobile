import { __requests } from "../main.js";
import { __currency_format, __push_notification, __show_cart_item, __show_cart_quantity } from "../share/_function.js";
import { __icons } from "../share/_icons.js";
import { __templates_modal } from "../share/_modal.js";
import { __templates_header } from "../_header.js";
import { CONFIG } from "../config.js";
import pre_order_cart from "./pre_order_cart.js";
import { __size_guide_data } from "../share/_data.js";
let user_selection = {};
let cart_quantity = 0;
export const campaign_product_detail_page = {
  page_header() {
    if (localStorage.getItem("pre-order-item")) {
      JSON.parse(localStorage.getItem("pre-order-item")).map((item) => {
        cart_quantity += parseInt(item.quantity);
      });
    }

    let div = document.createElement("div");
    div.classList.add("header", "style-1");
    div.innerHTML = `
    <div class="nav">
      <div class="nav__logo">
        <a href="/">
          ${__icons.new_ssstutter}
        </a>
      </div>
      <!--
      <div class="pre-order-cart">${__icons.cart} pre-order <span>( ${cart_quantity} )</span></div>
      -->
    </div>
    `;
    /*
    div.querySelector(".pre-order-cart").addEventListener("click", () => {
      document.body.appendChild(pre_order_cart());
    });
    */
    return div;
  },
  product_gallery(params = {}) {
    let gallery = params.extensions ? params.extensions.media : {};
    let color = params.color[0].id;
    let div = document.createElement("div");
    div.className = "gallery";
    div.innerHTML = `
    <ul>
      ${(gallery[`color_${color}_gallery`] || [])
        .map(
          (img) => `<li style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${img.o.replace(".jpeg", ".jpeg")}"></li>`
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
          <li>Chi???u d??i vai : 45 cm</li>
          <li>V??ng ng???c: 90 cm</li>
          <li>Chi???u d??i ch??n: 101 cm</li>
          <li>Size ??o : 2 (L)</li>
          <li>Size Qu???n : 3 (XL)</li>
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
      <h1>Chi ti???t</h1>
      <p style="padding: 20px 15px;">
        ${params.shortDescription}
      </p>
        <ul>
        </ul>
      </div>
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
      color_value.map((item, index) => {
        let flat_img = document.createElement("li");
        flat_img.style.backgroundImage = `url(${CONFIG.DOMAIN_IMG_CDN}/${
          item.photo == null ? "no_image.png" : item.photo.o.replace(".jpeg", ".jpeg")
        })`;
        let color_variation = div.querySelector(".flatlay > ul");
        color_variation.appendChild(flat_img);
        return flat_img;
      });
    };
    init_flatlay_img();
    return div;
  },
  attributes(params = {}) {
    let div = document.createElement("div");
    div.className = "attributes";
    div.innerHTML = `
    <h1>Th??ng s??? s???n ph???m</h1>
    <table>
      <tbody>
        <tr>
          <th>????? v???a v???n</th>
          <td>
            <label for="R???t b??">
              <input id="R???t b??" type="checkbox" readonly="readonly" hidden="">
              <p>R???t b??</p>
            </label>
          </td>
          <td>
            <label for="B??">
              <input id="B??" type="checkbox" readonly="readonly" hidden="">
              <p>B??</p>
            </label>
          </td>
          <td>
            <label for="V???a v???n">
              <input id="V???a v???n" type="checkbox" readonly="readonly" hidden="">
              <p>V???a v???n</p>
            </label>
          </td>
          <td>
            <label for="Xu??ng">
              <input id="Xu??ng" type="checkbox" readonly="readonly" hidden="">
              <p>Xu??ng</p>
            </label>
          </td>
          <td>
            <label for="R???ng">
              <input id="R???ng" type="checkbox" readonly="readonly" hidden="">
              <p>R???ng</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>????? co gi??n</th>
          <td>
            <label for="Kh??ng">
              <input id="Kh??ng" type="checkbox" readonly="readonly" hidden="">
              <p>Kh??ng</p>
            </label>
          </td>
          <td>
            <label for="V???a ph???i">
              <input id="V???a ph???i" type="checkbox" readonly="readonly" hidden="">
              <p>V???a ph???i</p>
            </label>
          </td>
          <td>
            <label for="Nhi???u">
              <input id="Nhi???u" type="checkbox" readonly="readonly" hidden="">
              <p>Nhi???u</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>????? trong su???t</th>
          <td>
            <label for="Kh??ng">
              <input id="Kh??ng" type="checkbox" readonly="readonly" hidden="">
              <p>Kh??ng</p>
            </label>
          </td>
          <td>
            <label for="V???a ph???i">
              <input id="V???a ph???i" type="checkbox" readonly="readonly" hidden="">
              <p>V???a ph???i</p>
            </label>
          </td>
          <td>
            <label for="Nhi???u">
              <input id="Nhi???u" type="checkbox" readonly="readonly" hidden="">
              <p>Nhi???u</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>????? d??y</th>
          <td>
            <label for="M???ng">
              <input id="M???ng" type="checkbox" readonly="readonly" hidden="">
              <p>M???ng</p>
            </label>
          </td>
          <td>
            <label for="D??y v???a">
              <input id="D??y v???a" type="checkbox" readonly="readonly" hidden="">
              <p>D??y v???a</p>
            </label>
          </td>
          <td>
            <label for="D??y">
              <input id="D??y" type="checkbox" readonly="readonly" hidden="">
              <p>D??y</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>L???p l??t</th>
          <td>
            <label for="Kh??ng">
              <input id="Kh??ng" type="checkbox" readonly="readonly" hidden="">
              <p>Kh??ng</p>
            </label>
          </td>
          <td>
            <label for="M???t ph???n">
              <input id="M???t ph???n" type="checkbox" readonly="readonly" hidden="">
              <p>M???t ph???n</p>
            </label>
          </td>
          <td>
            <label for="To??n b???">
              <input id="To??n b???" type="checkbox" readonly="readonly" hidden="">
              <p>To??n b???</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Ph?? h???p m??a</th>
          <td>
            <label for="Xu??n">
              <input id="Xu??n" type="checkbox" readonly="readonly" hidden="">
              <p>Xu??n</p>
            </label>
          </td>
          <td>
            <label for="H???">
              <input id="H???" type="checkbox" readonly="readonly" hidden="">
              <p>H???</p>
            </label>
          </td>
          <td>
            <label for="Thu">
              <input id="Thu" type="checkbox" readonly="readonly" hidden="">
              <p>Thu</p>
            </label>
          </td>
          <td>
            <label for="????ng">
              <input id="????ng" type="checkbox" readonly="readonly" hidden="">
              <p>????ng</p>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  
    `;
    return div;
  },
  variation(params = {}) {
    let info = params;
    // console.log(info);
    let div = document.createElement("div");
    div.className = "variation";
    div.innerHTML = `
      <div>
        <div class="info" style="margin-bottom: 10px">
          <h1 class="name">${info.name}</h1>
          <div class="price">
          ${info.salePrice ? `<p>${__currency_format(info.salePrice)}</p>` : ""}
          
          </div>
        </div>
        <div style="margin-top: -8px">
          ${__currency_format(info.price)}
          <!--<span style="text-decoration: line-through; display: inline-block; margin-left: 6px; opacity: 0.6">
            ${__currency_format(info.price)} 
          </span>-->
        </div>
        <div class="color">
          <p>ch???n m??u : <strong class="color__name">${info.color[0].name} </strong></p>
          <ul>
          
          </ul>
        </div>
        <div class="size">
          <p>ch???n size</p>
          <ul>

          </ul>
        </div>
        <div>
          <br>
          <p style="margin-bottom: 4px;">S???n ph???m m??? b??n l???i tr??n website trong</p>
          <p class="clock" style="min-height: 20px;"></p><br>
        </div>
        <button class="add" disabled style="opacity: .45">Th??m v??o gi??? h??ng</button>
        <ul class="guide">
          <li data-action="size_check">H?????ng d???n ch???n size ${__icons.right}</li>
          
          <li style="margin: 0; border: 0; cursor: default; padding: 0; display: block;">
            <div id="size_check" class="mobile-variation">
              <div class="info">
                <table>
                  <thead>
                    <tr>
                      <th>K??ch th?????c</th>
                      <th>Chi???u cao (cm)</th>
                      <th>C??n n???ng (kg)</th>
                      <th>Ph???n ng???c (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S(0)</td>
                      <td>160-170</td>
                      <td>49-54</td>
                      <td>85-89</td>
                    </tr>
                    <tr>
                      <td>M(1)</td>
                      <td>166-174</td>
                      <td>55-60</td>
                      <td>90-94</td>
                    </tr>
                    <tr>
                      <td>L(2)</td>
                      <td>170-177</td>
                      <td>61-66</td>
                      <td>95-99</td>
                    </tr>
                    <tr>
                      <td>XL(3)</td>
                      <td>175-180</td>
                      <td>67-72</td>
                      <td>100-104</td>
                    </tr>
                    <tr>
                      <td>XXL(4)</td>
                      <td>178-185</td>
                      <td>73-78</td>
                      <td>105-109</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <form class="form">
                <p>Gi??p b???n t??m size ph?? h???p</p><br>
                <div class="grid-row">
                  <div class="size__input">
                    <p>Chi???u cao (cm)</p>
                    <input class="height__input" type="number" placeholder="..." required>
                  </div>
                  <div class="size__input">
                    <p>C??n n???ng (kg)</p>
                    <input class="weight__input" type="number" placeholder="..." required>
                  </div>
                </div>
                <button type="button" class="find-size">T??m size</button>
                <p class="response"></p>
              </form>
            </div>
          </li>
          
          <li data-action="refund_policy">H?????ng d???n ?????i tr??? ${__icons.right}</li>
          
          <li style="margin: 0; border: 0; cursor: default; padding: 0; display: block;">
            <div id="refund_policy" class="mobile-variation">
              <p>
                ??? B???n c?? th??? ?????i h??ng trong 14 ng??y k??? t??? ng??y mua h??ng.
                <br>
                ??? M???t h??ng ph???i ??? trong t??nh tr???ng ban ?????u, c??n nguy??n tem m??c, ch??a qua s??? d???ng, ch??a gi???t gi?? v?? c?? ho?? ????n t????ng ???ng.
                <br>
                ??? B???n vui l??ng gi??? l???i ho?? ????n ????? ???????c ?????i h??ng. B???n c?? th??? xu???t tr??nh h??a ????n mua h??ng d?????i d???ng gi???y in ho???c ?????nh d???ng ??i???n t??? tr??n ??i???n tho???i di ?????ng c???a b???n.
                <br>
                ??? M???i ho?? ????n ch??? ???????c ?????i m???t l???n.
                <br>
                ??? N???u ho?? ????n ???? mua c?? gi?? tr??? cao h??n ho?? ????n ???????c ?????i, SSSTUTTER s??? kh??ng ho??n ti???n l???i. Ng?????c l???i, ho?? ????n ???????c ?????i c?? gi?? cao h??n th?? b???n vui l??ng b?? th??m ph???n ch??nh l???ch.
                <br>
                ??? Kh??ng ??p d???ng ?????i h??ng v???i ho?? ????n khuy???n m??i, gi???m gi?? tr??n 30%.
                <br>
                ??? Kh??ng c?? ch??nh s??ch tr??? h??ng v???i b???t k?? s???n ph???m n??o c???a SSSTUTTER.
                <br>
                ??? Ph??? ki???n: Kh??ng ???????c ?????i ho???c tr??? l???i c??c ph??? ki???n nh?? V??ng ??eo tay, K??nh m??t, Th???t l??ng, T???t, Pin c??i ??o, M?? len, M??, Kh??n cho??ng, V?? v?? c??c ph??? ki???n nh???.
                <br>
                ??? B???n c?? th??? ?????i h??ng t???i t???t c??? c??c chi nhanh c???a SSSTUTTER.
                <br>
                M???i th???c m???c kh??c b???n vui l??ng g???i s???  086.993.6266  ho???c li??n h??? fanpage SSSTUTTER ????? ???????c h??? tr??? ngay nh??.
              </p>
            </div>
          </li>
        </ul>
      </div>
    `;

    div.querySelector(".find-size").addEventListener("click", () => {
      let height_input = div.querySelector(".height__input");
      let weight_input = div.querySelector(".weight__input");
      let user_info = {
        w: weight_input.value,
        h: height_input.value,
      };
      size_calc(user_info);
    });
    let size_calc = (params) => {
      let response_size = div.querySelector(".response");
      // console.log(params);
      if ((params.w || params.h) == "") return false;
      let balance = __size_guide_data.balance;
      let size_found = null;
      for (let [k, v] of Object.entries(__size_guide_data)) {
        if (v.constructor != Object) continue;
        if (params.h >= v.height.min && params.h <= v.height.max) {
          size_found = k;
          if (params.w >= v.weight.max + balance) {
            continue;
          } else {
            break;
          }
        } else {
          if (params.h < v.height.max + balance) {
            size_found = k;
          } else {
            continue;
          }
        }
        if (params.w >= v.weight.min && params.w <= v.weight.max) {
          size_found = k;
          break;
        } else {
          if (params.w < v.weight.max + balance) {
            size_found = k;
          } else {
            continue;
          }
        }
      }
      if (size_found) {
        response_size.innerHTML = `Size ph?? h???p v???i b???n l?? size ${size_found}`;
        return __size_guide_data[size_found];
      } else {
        response_size.innerHTML = `Kh??ng t??m ???????c size ph?? h???p v???i b???n, vui l??ng th??? l???i !`;
        return false;
      }
    };

    let end_date = new Date("Nov 12, 2021 21:30:00").getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector(".clock").innerHTML = `
      <span>${hours}</span> gi??? 
      <span>${minutes}</span> ph??t 
      <span>${seconds}</span> gi??y
      `;

      if (distance < 0) {
        clearInterval(countdown);
        div.querySelector(".clock").innerHTML = `
        <span>00</span> gi??? 
        <span>00</span> ph??t 
        <span>00</span> gi??y
        `;
      }
    }, 1000);

    user_selection = {
      name: info.name,
      media: info.extensions.media,
      id: info.id,
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
        let flat_color = document.createElement("li");
        flat_color.innerHTML = `
        <button 
          class="color__variation" 
          data-product='${JSON.stringify(info).replace("'", "")}'
          data-color='${JSON.stringify(item)}'
          data-index="${index}"
          style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
          item.photo == null ? "no_image.png" : item.photo.x400.replace(".jpeg", ".jpeg")
        })"
        >
        </button>
        `;
        let color_variation = div.querySelector(".color > ul");
        color_variation.appendChild(flat_color);
        if (index == 0) init_size(item.id);
        return flat_color;
      });
    };
    let init_size = (params) => {
      let size_wrapper = div.querySelector(".size > ul");
      let size_arr = Object.values(info.variation)
        .filter((i) => i.color === params)
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
        <li><button data-index="${index}" class=" size__variation" data-value="${i.size}">${i.size}</button></li>`;
        })
        .join("");
      size_wrapper.innerHTML = size_render;
      let size_variation = div.querySelectorAll(".size__variation");
      size_variation.forEach((btn) => {
        btn.addEventListener("click", (e) => {
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
      let to_cart_btn = div.querySelector(".add");

      to_cart_btn.addEventListener("click", (e) => {
        document.body.appendChild(pre_order_cart());
        let cart_selected = JSON.parse(localStorage.getItem("pre-order-item"))
          ? JSON.parse(localStorage.getItem("pre-order-item"))
          : [];
        let cart_menu = document.querySelector('[data-menu="cart"]');
        let variation = params.variation;
        e.preventDefault();
        user_selection.variation = variation.find(
          (item) => item.color == user_selection.colorId && item.size == user_selection.size
        );
        let new_selected_item = { ...user_selection };
        let [product_in_cart] = cart_selected.filter((i) => i.variation.id === new_selected_item.variation.id);
        if (product_in_cart) {
          cart_selected = cart_selected.map((i) => {
            if (i.variation.id === new_selected_item.variation.id) i.quantity = parseInt(i.quantity) + 1;
            return i;
          });
          localStorage.setItem("pre-order-item", JSON.stringify(cart_selected));
        } else {
          cart_selected.push(new_selected_item);
          localStorage.setItem("pre-order-item", JSON.stringify(cart_selected));
        }
        cart_quantity = 0;
        JSON.parse(localStorage.getItem("pre-order-item")).map((item) => {
          cart_quantity += parseInt(item.quantity);
        });
        document.querySelector(".pre-order-cart span").innerHTML = `( ${cart_quantity} )`;
        document.body.appendChild(pre_order_cart());
      });
    };
    let triggers = div.querySelectorAll("[data-action]");
    triggers.forEach((btn) => {
      if (window.innerWidth > 767) {
        btn.addEventListener("click", () => {
          __templates_modal.overlay({ content: __templates_modal[btn.dataset.action]() });
        });
      } else {
        if (btn.parentElement.querySelector(".mobile-variation")) {
          btn.addEventListener("click", () => {
            btn.parentElement.querySelector("#" + btn.getAttribute("data-action")).classList.toggle("show");
          });
        }
      }
    });
    init_flatlay_img();
    on_change_variation();
    init_add_to_cart(info);
    return div;
  },
};
