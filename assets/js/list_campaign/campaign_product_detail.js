import { __requests } from "../main.js";
import { __currency_format, __push_notification, __show_cart_item, __show_cart_quantity } from "../share/_function.js";
import { __icons } from "../share/_icons.js";
import { __templates_modal } from "../share/_modal.js";
import { __templates_header } from "../_header.js";
import { CONFIG } from "../config.js";
import pre_order_cart from './pre_order_cart.js';
let user_selection = {};
let cart_quantity = 0;
export const campaign_product_detail_page = {
  page_header() {
    
    if (localStorage.getItem('pre-order-item')) {
      JSON.parse(localStorage.getItem('pre-order-item')).map(item => {
        cart_quantity += parseInt(item.quantity)
      });
    }
    
    let div = document.createElement("div");
    div.classList.add('header', 'style-1');
    div.innerHTML = `
    <div class="nav">
      <div class="nav__logo">
        <a href="/editorial">
          ${__icons.new_ssstutter}
        </a>
      </div>
      <div class="pre-order-cart">${__icons.cart} pre-order <span>( ${cart_quantity} )</span></div>
    </div>
    `;
    
    div.querySelector('.pre-order-cart').addEventListener('click', () => {
      document.body.appendChild(pre_order_cart());
    });
    
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
          (img) => `<li style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${img.o.replace(".jpeg", ".webp")}"></li>`
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
          item.photo == null ? "no_image.png" : item.photo.o.replace(".jpeg", ".webp")
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
    <h1>Thông số sản phẩm</h1>
    <table>
      <tbody>
        <tr>
          <th>Độ vừa vặn</th>
          <td>
            <label for="Rất bó">
              <input id="Rất bó" type="checkbox" readonly="readonly" hidden="">
              <p>Rất bó</p>
            </label>
          </td>
          <td>
            <label for="Bó">
              <input id="Bó" type="checkbox" readonly="readonly" hidden="">
              <p>Bó</p>
            </label>
          </td>
          <td>
            <label for="Vừa vặn">
              <input id="Vừa vặn" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa vặn</p>
            </label>
          </td>
          <td>
            <label for="Xuông">
              <input id="Xuông" type="checkbox" readonly="readonly" hidden="">
              <p>Xuông</p>
            </label>
          </td>
          <td>
            <label for="Rộng">
              <input id="Rộng" type="checkbox" readonly="readonly" hidden="">
              <p>Rộng</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ co giãn</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Vừa phải">
              <input id="Vừa phải" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa phải</p>
            </label>
          </td>
          <td>
            <label for="Nhiều">
              <input id="Nhiều" type="checkbox" readonly="readonly" hidden="">
              <p>Nhiều</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ trong suốt</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Vừa phải">
              <input id="Vừa phải" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa phải</p>
            </label>
          </td>
          <td>
            <label for="Nhiều">
              <input id="Nhiều" type="checkbox" readonly="readonly" hidden="">
              <p>Nhiều</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ dày</th>
          <td>
            <label for="Mỏng">
              <input id="Mỏng" type="checkbox" readonly="readonly" hidden="">
              <p>Mỏng</p>
            </label>
          </td>
          <td>
            <label for="Dày vừa">
              <input id="Dày vừa" type="checkbox" readonly="readonly" hidden="">
              <p>Dày vừa</p>
            </label>
          </td>
          <td>
            <label for="Dày">
              <input id="Dày" type="checkbox" readonly="readonly" hidden="">
              <p>Dày</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Lớp lót</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Một phần">
              <input id="Một phần" type="checkbox" readonly="readonly" hidden="">
              <p>Một phần</p>
            </label>
          </td>
          <td>
            <label for="Toàn bộ">
              <input id="Toàn bộ" type="checkbox" readonly="readonly" hidden="">
              <p>Toàn bộ</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Phù hợp mùa</th>
          <td>
            <label for="Xuân">
              <input id="Xuân" type="checkbox" readonly="readonly" hidden="">
              <p>Xuân</p>
            </label>
          </td>
          <td>
            <label for="Hạ">
              <input id="Hạ" type="checkbox" readonly="readonly" hidden="">
              <p>Hạ</p>
            </label>
          </td>
          <td>
            <label for="Thu">
              <input id="Thu" type="checkbox" readonly="readonly" hidden="">
              <p>Thu</p>
            </label>
          </td>
          <td>
            <label for="Đông">
              <input id="Đông" type="checkbox" readonly="readonly" hidden="">
              <p>Đông</p>
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
        <div class="info">
          <h1 class="name">${info.name}</h1>
          <div class="price">
          ${info.salePrice ? `<p>${__currency_format(info.salePrice)}</p>` : ""}
          ${
            info.salePrice
              ? `<p class="discount">${__currency_format(info.price)}</p>`
              : ` <p>${__currency_format(info.price)}</p>`
          }
          </div>
        </div>
        <div class="color">
          <p>chọn màu : <strong class="color__name">${info.color[0].name} </strong></p>
          <ul>
          
          </ul>
        </div>
        <div class="size">
          <p>chọn size</p>
          <ul>

          </ul>
        </div>
        <div>
          <br>
          <p style="margin-bottom: 4px;">Ưu đãi giảm 10% khi đặt hàng trước (Pre-Order)</p>
          <p class="clock" style="min-height: 20px;"></p><br>
        </div>
        <button class="add">Thêm vào giỏ hàng</button>
        <ul class="guide">
          <li data-action="size_check">Hướng dẫn chọn size ${__icons.right}</li>
          <li  data-action="refund_policy">Hướng dẫn đổi trả ${__icons.right}</li>
        </ul>
        ${
          info.catId.join(",").includes("0x7u3p") || info.catId.join(",").includes("S2HJYi")
            ? `<div class="promotion__sale">
        <p>Tặng thêm Great Life Tee Premium khi mua sản phẩm này </p>
        <button data-action="sale_promotion">Thông tin ưu đãi</button>
      </div>`
            : ""
        }
      </div>
    `;
    
    let end_date = new Date("Nov 10, 2021 00:00:00").getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector(".clock").innerHTML = `
      Thời gian
      <span>${days}</span> ngày 
      <span>${hours}</span> giờ 
      <span>${minutes}</span> phút 
      <span>${seconds}</span> giây
      `;

      if (distance < 0) {
        clearInterval(countdown);
        div.querySelector(".clock").innerHTML = ``;
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
          item.photo == null ? "no_image.png" : item.photo.x100.replace(".jpeg", ".webp")
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
                  `<li style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${img.o.replace("jpeg", "webp")})"></li>`
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
        JSON.parse(localStorage.getItem('pre-order-item')).map(item => {
          cart_quantity += parseInt(item.quantity)
        });
        document.querySelector('.pre-order-cart span').innerHTML = `( ${cart_quantity} )`;
      });
    };
    let triggers = div.querySelectorAll("[data-action]");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        __templates_modal.overlay({ content: __templates_modal[btn.dataset.action]() });
      });
    });
    init_flatlay_img();
    on_change_variation();
    init_add_to_cart(info);
    return div;
  },
};
