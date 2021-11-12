import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
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
        flat_img.style.backgroundImage = `url(${CONFIG.DOMAIN_IMG_CDN}/${item.photo == null ? "no_image.png" : item.photo.o.replace(".jpeg", ".jpeg")
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
    let div = document.createElement("div");
    div.className = "variation";
    div.innerHTML = `
      <div>
        <div class="info">
          <h1 class="name">${info.name}</h1>
          <div class="price">
          ${info.salePrice ? `<p>${__currency_format(info.salePrice)}</p>` : ""}
          ${info.salePrice
        ? `<p class="discount">${__currency_format(info.price)}</p>`
        : ` <p>${__currency_format(info.price)}</p>`
      }
          </div>
        </div>
        <div class="color">
          <p>chọn màu : <strong class="color__name"> </strong></p>
          <ul>
          
          </ul>
        </div>
        <div class="size">
          <p>chọn size</p>
          <ul>

          </ul>
        </div>
        ${params.preOrder == true
        ? `
        <div class="subscribe-new-product">
          <p>
            Sản phẩm đã cháy hàng trong đợt Pre-Order và đang được restock trong thời gian tới. Bạn có thể đăng ký nhận thông tin khi sản phẩm restock ở dưới đây.
          </p>
          <input placeholder="Họ & tên" name="subscribe_name">
          <input placeholder="Số điện thoại" name="subscribe_phone">
          <input placeholder="Email" name="subscribe_mail">
          <button type="button">Đăng ký</button>
        </div>
        `
        : '<button class="add">Thêm vào giỏ hàng</button>'
      }
        
        <ul class="guide">
          <li data-action="size_check">Hướng dẫn chọn size ${__icons.right}</li>
          <li style="margin: 0; border: 0; cursor: default; padding: 0;">
            <div id="size_check" class="mobile-variation">
              <div class="info">
                <table>
                  <thead>
                    <tr>
                      <th>Kích thước</th>
                      <th>Chiều cao (cm)</th>
                      <th>Cân nặng (kg)</th>
                      <th>Phần ngực (cm)</th>
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
                <p>Giúp bạn tìm size phù hợp</p><br>
                <div class="grid-row">
                  <div class="size__input">
                    <p>Chiều cao (cm)</p>
                    <input class="height__input" type="number" placeholder="..." required>
                  </div>
                  <div class="size__input">
                    <p>Cân nặng (kg)</p>
                    <input class="weight__input" type="number" placeholder="..." required>
                  </div>
                </div>
                <button type="button" class="find-size">Tìm size</button>
                <p class="response"></p>
              </form>
            </div>
          </li>
          
          <li  data-action="refund_policy">Hướng dẫn đổi trả ${__icons.right}</li>
          <li style="margin: 0; border: 0; cursor: default; padding: 0;">
            <div id="refund_policy" class="mobile-variation">
              <p>
                – Bạn có thể đổi hàng trong 14 ngày kể từ ngày mua hàng.
                <br>
                – Mặt hàng phải ở trong tình trạng ban đầu, còn nguyên tem mác, chưa qua sử dụng, chưa giặt giũ và có hoá đơn tương ứng.
                <br>
                – Bạn vui lòng giữ lại hoá đơn để được đổi hàng. Bạn có thể xuất trình hóa đơn mua hàng dưới dạng giấy in hoặc định dạng điện tử trên điện thoại di động của bạn.
                <br>
                – Mỗi hoá đơn chỉ được đổi một lần.
                <br>
                – Nếu hoá đơn đã mua có giá trị cao hơn hoá đơn được đổi, SSSTUTTER sẽ không hoàn tiền lại. Ngược lại, hoá đơn được đổi có giá cao hơn thì bạn vui lòng bù thêm phần chênh lệch.
                <br>
                – Không áp dụng đổi hàng với hoá đơn khuyến mãi, giảm giá trên 30%.
                <br>
                – Không có chính sách trả hàng với bất kì sản phẩm nào của SSSTUTTER.
                <br>
                – Phụ kiện: Không được đổi hoặc trả lại các phụ kiện như Vòng đeo tay, Kính mát, Thắt lưng, Tất, Pin cài áo, Mũ len, Mũ, Khăn choàng, Ví và các phụ kiện nhỏ.
                <br>
                – Bạn có thể đổi hàng tại tất cả các chi nhanh của SSSTUTTER.
                <br>
                Mọi thắc mắc khác bạn vui lòng gọi số  086.993.6266  hoặc liên hệ fanpage SSSTUTTER để được hỗ trợ ngay nhé.
              </p>
            </div>
          </li>
        </ul>
      </div>
    `;

    if (div.querySelector('.subscribe-new-product button')) {
      div.querySelector('.subscribe-new-product button').addEventListener('click', () => {
        __requests(
          {
            method: "POST",
            url: "/order/order/subscribe-order",
            body: JSON.stringify({
              id: params.id,
              name: '',
              phone: '',
            })
          }
        )
      });
    }

    if (div.querySelector(".subscribe-new-product")) {
      div.querySelector(".subscribe-new-product button").addEventListener("click", () => {
        __templates.api_loading("show");
        __requests(
          {
            method: "POST",
            url: "order/order/subscribe-order",
            body: JSON.stringify({
              id: params.id,
              name: div.querySelector('.subscribe-new-product input[name="subscribe_name"]').value,
              phone: div.querySelector('.subscribe-new-product input[name="subscribe_phone"]').value,
              email: div.querySelector('.subscribe-new-product input[name="subscribe_mail"]').value,
            }),
          },
          () => {
            __templates.api_loading("hide");
            div.querySelector(".subscribe-new-product").innerHTML = `
            <p class="text-center"><b>Đăng ký nhận thông tin thành công!</b></p>
            <p style="margin-bottom: 6px;">SSStutter sẽ liên hệ lại ngay khi có thông tin về hàng của sản phẩm</p>
            <p style="margin-bottom: 0;">Khi cần trợ giúp, vui lòng gọi 086 993 6266</p>
            `;
          }
        );
      });
    }

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
        response_size.innerHTML = `Size phù hợp với bạn là size ${size_found}`;
        return __size_guide_data[size_found];
      } else {
        response_size.innerHTML = `Không tìm được size phù hợp với bạn, vui lòng thử lại !`;
        return false;
      }
    };

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
        let isStock = Object.values(info.variation)
          .filter((i) => i.color === item.id)
          .some((i) => i.isStock);
        if (!info.preOrder && !isStock) return;
        let flat_color = document.createElement("li");
        flat_color.innerHTML = `
        <button 
          class="color__variation 
          ${index == 0 && info.variation[index].isStock ? "active" : ""}" 
          data-product='${JSON.stringify(info).replace("'", "")}'
          data-color='${JSON.stringify(item)}'
          data-index="${index}"
          style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.photo == null ? "no_image.png" : item.photo.x400.replace(".jpeg", ".jpeg")
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
        <li><button data-index="${index}" class=" size__variation ${index == 0 && info.variation[index].isStock ? "active" : ""
            }" ${i.isStock || info.preOrder ? "" : "disabled"} data-value="${i.size}">${i.size}</button></li>`;
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
      let to_cart_btn = null;
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
            (item) => item.color == user_selection.colorId && item.size == user_selection.size
          );
          let new_selected_item = { ...user_selection };
          let [product_in_cart] = cart_selected.filter((i) => i.variation.id === new_selected_item.variation.id);
          if (product_in_cart) {
            __requests(
              {
                method: "GET",
                url: `product/variation/check-stock?id=${product_in_cart.variation.id}&stock=${product_in_cart.quantity + 1
                  }`,
              },
              ({ data }) => {
                if (!data) return __push_notification("fail", "Sản phẩm hết hàng!");
                cart_selected = cart_selected.map((i) => {
                  if (i.variation.id === new_selected_item.variation.id) i.quantity = parseInt(i.quantity) + 1;
                  return i;
                });
                localStorage.setItem("cartItem", JSON.stringify(cart_selected));
                cart_menu.classList.add("active");
                __show_cart_item(cart_menu.querySelector("ul"), cart_menu.querySelector("[data-amount]"));
                __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
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
                if (!data) return __push_notification("fail", "Sản phẩm hết hàng!");
                cart_selected.push(new_selected_item);
                localStorage.setItem("cartItem", JSON.stringify(cart_selected));
                cart_menu.classList.add("active");
                __show_cart_item(cart_menu.querySelector("ul"), cart_menu.querySelector("[data-amount]"));
                __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
                __get_voucher({ discountDiv: cart_menu });
              }
            );
          }
        });
      }
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
