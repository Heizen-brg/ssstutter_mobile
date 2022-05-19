import { CONFIG } from "../config.js";
import { __render, __requests } from "../main.js";
import { __templates } from "./_components.js";
import { __size_guide_data } from "./_data.js";
import {
  __currency_format,
  __get_voucher,
  __output_date,
  __push_notification,
  __show_cart_item,
  __show_cart_quantity,
} from "./_function.js";
import { __icons } from "./_icons.js";
export const __templates_modal = {
  overlay(params = {}) {
    let main_body = document.querySelector("#root");
    let div = document.createElement("div");
    div.className = "modal__overlay";
    params.close == "show"
      ? (div.innerHTML = `<div class="close__btn">${__icons.close}<div>`)
      : "";
    let content = document.createElement("div");
    content.className = `modal__content ${params.style ? params.style : ""} `;
    if (params.content)
      __render.build_in_block({
        block: content,
        target: params.content,
      });
    div.appendChild(content);
    div.addEventListener("click", (e) => {
      if (!e.target.classList.contains("modal__overlay")) return false;
      main_body.removeChild(div);
    });
    let close_btn = div.querySelector(".close__btn");
    if (close_btn)
      close_btn.addEventListener("click", () => {
        main_body.removeChild(div);
      });
    main_body.appendChild(div);
    return div;
  },
  close() {
    let main_body = document.querySelector("#root");
    let modal_overlay = document.querySelector(".modal__overlay");
    main_body.removeChild(modal_overlay);
  },
  store_check() {
    let div = document.createElement("div");
    div.className = "store__check--modal";
    div.innerHTML = `
      <ul>
        <li>
          <h5>SSStutter - Kho Tổng - Hà Nội</h5>
          <small>Còn hàng</small>
        </li>
        <li>
          <h5>SSStutter - Kho Tổng - Hà Nội</h5>
          <small>Còn hàng</small>
        </li>
      </ul>
    `;
    return div;
  },
  size_check() {
    let div = document.createElement("div");
    div.className = "size__guide--modal";
    div.innerHTML = `
      <h1>My fit size</h1>
      <div class="size__guide--container">
        <div class="info">
          <img src="assets/img/size.png" alt="" />
          <table>
            <thead>
              <tr>
                <td>Kích thước</td>
                <td>Chiều cao (cm)</td>
                <td>Cân nặng (kg)</td>
                <td>Phần ngực (cm)</td>
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
          <p>Giúp bạn tìm size phù hợp</p>
          <div>
            <div class="size__input">
              <p>Chiều cao (cm)</p>
              <input class="height__input" type="number" placeholder="..." required>
            </div>
            <div class="size__input">
              <p>Cân nặng (kg)</p>
              <input class="weight__input" type="number" placeholder="..." required>
            </div>
          </div>
          <button type="button">Tìm size</button>
          <p class="response"></p>
        </form>
      </div>
    `;
    let calc_btn = div.querySelector("button");
    calc_btn.addEventListener("click", () => {
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
    return div;
  },
  sale_promotion() {
    let div = document.querySelector("div");
    div.className = "sale__promotion";
    div.innerHTML = `
    <span></span>
    <h2>Thông tin ưu đãi</h2>
    <p> Sản phẩm sweatshirt / long tee: Giảm 10%, khi mua được tặng 1 sổ tay</p>
    <p> Sản phẩm áo khoác & coat: Giảm 10%, khi mua được tặng 1 Great Life Tee Premium và 1 sổ tay</p>
    <h4> SSStutter sẽ gọi lại cho bạn để tư vấn chọn màu và size cho Great Life Tee Premium cho bạn ngay sau khi thanh toán sản phẩm này</h4>
    `;
    return div;
  },
  app_promotion() {
    let div = document.querySelector("div");
    div.className = "app__promotion";
    div.innerHTML = `
      <h2>Cảm ơn bạn đã tải ứng dụng</h2>
      <p> Bạn đã dược tặng 01 voucher giảm giá</p>
      <span style="background-image:url(https://sss-dashboard.leanservices.work/upload/1-2022/1642392857065.jpeg)"></span>
      <small>⚠️  Ứng dụng vẫn đang trong quá trình phát triển, trong quá trình trải nghiệm mua sắm nếu gặp bất kì vấn đề gì, xin vui lòng gửi góp ý qua email technology@ssstutter.com, xin cảm ơn ! </small>
    `;
    return div;
  },
  refund_policy() {
    let div = document.createElement("div");
    div.className = "refund__policy";
    div.innerHTML = `
      <h2>QUY ĐỊNH ĐỔI HÀNG</h2>
      <h4>BẠN VUI LÒNG KIỂM TRA HOÁ ĐƠN VÀ TƯ TRANG TRƯỚC KHI RỜI QUẦY NHÉ !</h4>
      <p>– Bạn có thể đổi hàng trong 14 ngày kể từ ngày mua hàng.</p>
      <p>– Mặt hàng phải ở trong tình trạng ban đầu, còn nguyên tem mác, chưa qua sử dụng, chưa giặt giũ và có hoá đơn tương ứng.</p>
      <p>– Bạn vui lòng giữ lại hoá đơn để được đổi hàng. Bạn có thể xuất trình hóa đơn mua hàng dưới dạng giấy in hoặc định dạng điện tử trên điện thoại di động của bạn.</p>
      <p>– Mỗi hoá đơn chỉ được đổi một lần.</p>
      <p>– Nếu hoá đơn đã mua có giá trị cao hơn hoá đơn được đổi, SSSTUTTER sẽ không hoàn tiền lại. Ngược lại, hoá đơn được đổi có giá cao hơn thì bạn vui lòng bù thêm phần chênh lệch.</p>
      <p>– Không áp dụng đổi hàng với hoá đơn khuyến mãi, giảm giá trên 30%.</p>
      <p>– Không có chính sách trả hàng với bất kì sản phẩm nào của SSSTUTTER.</p>
      <p>– Phụ kiện: Không được đổi hoặc trả lại các phụ kiện như Vòng đeo tay, Kính mát, Thắt lưng, Tất, Pin cài áo, Mũ len, Mũ, Khăn choàng, Ví và các phụ kiện nhỏ.</p>
      <p>– Bạn có thể đổi hàng tại tất cả các chi nhanh của SSSTUTTER.</p>
      <p>Mọi thắc mắc khác bạn vui lòng gọi số&nbsp; <strong>086.993.6266</strong>&nbsp; hoặc liên hệ fanpage SSSTUTTER để được hỗ trợ ngay nhé.</p>
    `;
    return div;
  },
  card_payment_progress() {
    let div = document.createElement("div");
    div.className = "payment__progress";
    div.innerHTML = `
      <h1>Đã mở công thanh toán online !</h1>
      <a href="/"><button>Quay lại trang chủ</buton></a>
    `;
    return div;
  },
  bag_combo_modal() {
    let div = document.createElement("div");
    div.className = "combo__modal";
    div.innerHTML = `
      <h1>Ưu đãi khi mua túi kèm sách</h1>
      <h3>Combo 1 túi & 1 sách bất kỳ với giá 449.000k</h3>
      <h3>Combo 1 túi & 2 sách với giá 549.000k</h3>
      <ul>
        <li data-value="WiUqsm7fw6uR2Chu2Ck16lp5x3LVwFuV">
          <label>
            <span style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637053625381.jpeg)"></span>
            <p>SPIDERUM - SÁCH NGÀNH SÁNG TẠO CÓ GÌ?</p>
            <div><button>Chọn</button></div>
          </label>
        </li>
        <li data-value="CVTzXiE4RuXbX5Z7Bq6s37iXZW2B6P3D">
          <label>
            <span style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637053578403.jpeg)"></span>
            <p>SPIDERUM - SÁCH NGƯỜI TRONG MUÔN NGHỀ</p>
            <div><button>Chọn</button></div>
          </label>
        </li>
        <li data-value="WiUqsm7fw6uR2Chu2Ck16lp5x3LVwFuV,CVTzXiE4RuXbX5Z7Bq6s37iXZW2B6P3D">
          <label>
            <span style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637053643783.jpeg)"></span>
            <p>SÁCH NGƯỜI TRONG MUÔN NGHỀ & SÁCH NGÀNH SÁNG TẠO CÓ GÌ?</p>
            <div><button>Chọn</button></div>
          </label>
        </li>
      </ul>
    `;
    let book_label = div.querySelectorAll("li");
    book_label.forEach((book) => {
      book.addEventListener("click", (e) => {
        e.preventDefault();
        __requests(
          {
            method: "GET",
            url: `https://api.ssstutter.com/product/filter/web?ids=${book.dataset.value}`,
          },
          ({ data }) => {
            if (!data) data = [];
            console.log(data);
            data = data.map((i) => {
              return {
                color: "transparent",
                colorId: "000",
                colorName: "Ngẫu nhiên",
                id: i.id,
                media: i.extensions.media,
                name: i.name,
                price: i.price,
                quantity: 1,
                salePrice: i.salePrice,
                size: "F",
                slug: i.slug,
                variation: i.variation[0],
              };
            });
            let cart_selected = JSON.parse(localStorage.getItem("cartItem"))
              ? JSON.parse(localStorage.getItem("cartItem"))
              : [];
            let cart_menu = document.querySelector('[data-menu="cart"]');
            cart_selected = [...cart_selected, ...data];
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
      });
    });

    return div;
  },
  promotion_gift_combo(params) {
    let info = params;
    info.size = info.size.sort((a, b) => a - b);
    let div = document.createElement("div");
    div.className = `gift__promotion`;
    div.innerHTML = `
      <div class="featured" style="background-image:url(${
        CONFIG.DOMAIN_IMG_CDN
      }/${params.extensions.media.featured.replace(".jpeg", ".jpeg")})">
      </div>
      <div class="info">
        <h1>${info.name}</h1>
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
        <div class="interact">
          <button class="add"><h1>Thêm vào giỏ hàng</h1></button>
        </div> 
      </div>

    `;
    let user_selection = {
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
    let init_size = (params) => {
      user_selection.size = 0;
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
        <li><button data-index="${index}" class=" size__variation ${
            index == 0 && info.variation[index].isStock ? "active" : ""
          }" ${i.isStock || info.preOrder ? "" : "disabled"} data-value="${
            i.size
          }">${i.size}</button></li>`;
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
          let product_gallery = div.querySelector(".featured");
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
                  `<li style="background-image:url(${
                    CONFIG.DOMAIN_IMG_CDN
                  }/${img.o.replace("jpeg", "jpeg")})"></li>`
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
      to_cart_btn = div.querySelector(".add");
      to_cart_btn.addEventListener("click", (e) => {
        let cart_selected = JSON.parse(localStorage.getItem("cartItem"))
          ? JSON.parse(localStorage.getItem("cartItem"))
          : [];
        let cart_menu =
          document.querySelector('[data-menu="cart"]') ||
          document.querySelector(".checkout__cart");
        let variation = params.variation;
        e.preventDefault();
        user_selection.variation = variation.find(
          (item) =>
            item.color == user_selection.colorId &&
            item.size == user_selection.size
        );
        if (!user_selection.variation) {
          __push_notification("fail", "Vui lòng chọn màu và size");
          return false;
        }
        let new_selected_item = { ...user_selection };
        let [product_in_cart] = cart_selected.filter(
          (i) => i.variation.id === new_selected_item.variation.id
        );
        to_cart_btn.disabled = true;
        if (product_in_cart) {
          __requests(
            {
              method: "GET",
              url: `product/variation/check-stock?id=${
                product_in_cart.variation.id
              }&stock=${product_in_cart.quantity + 1}`,
            },
            ({ data }) => {
              to_cart_btn.disabled = false;
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
              to_cart_btn.disabled = false;
              if (!data)
                return __push_notification(
                  "fail",
                  "Sản phẩm hết hàng!  Vui lòng chọn màu và size khác"
                );
              cart_selected.push(new_selected_item);

              localStorage.setItem("cartItem", JSON.stringify(cart_selected));
              __show_cart_item(
                cart_menu.querySelector("ul"),
                cart_menu.querySelector("[data-amount]")
              );
              __show_cart_quantity(
                document.querySelector('[data-toggle="cart_toggle"]')
              );
              __get_voucher({ discountDiv: cart_menu });
              this.close();
            }
          );
        }
      });
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
        if (index == 0) init_size(item.id);
        return flat_color;
      });
    };
    init_flatlay_img();
    on_change_variation();
    init_add_to_cart(info);
    return div;
  },
  lookbook_detail(params) {
    let div = document.createElement("div");
    div.className = `lookbook__detail`;
    div.innerHTML = `
      <div class="lookbook__detail--featured">
        <span style="background-image:url(${params.featured})"></span>
      </div>
      <ul class="lookbook__detail--products">

      </ul>
    `;
    __requests(
      {
        method: "GET",
        url: `https://api.ssstutter.com/product/filter/web?catId=${params.catId}&media=true&webStock=true&allActive=true&stock=0`,
      },
      ({ data }) => {
        let product = data
          .map((item) => {
            return `
        <li>
          <div class="product">
            <div class="thumbnail">
              <a href="/p/${
                item.slug
              }"><span style="background-image:url(https://cdn.ssstutter.com/products/${
              item.extensions.media.featured
            })"></span></a>
            </div>
            <h6 class="name">${item.name.toLowerCase()}</h6>
            <div class="price">
              ${
                item.salePrice
                  ? `<p class="discount">${__currency_format(item.price)}</p>`
                  : ""
              }
              <p>${__currency_format(item.salePrice || item.price)}</p>
            </div>
            ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
          </div>
        </li>
          `;
          })
          .join("");
        let lookbook_dom = div.querySelector(".lookbook__detail--products");
        lookbook_dom.innerHTML = product;
      }
    );
    return div;
  },
  lucky_wheel_modal(params) {
    let div = document.createElement("div");
    div.className = "lucky__wheel";
    div.innerHTML = `
    <h1>Vòng quay may mắn</h1>
    <div>
      <img src="/assets/img/wheel/kim.png"/>
      <div>
        <img src="/assets/img/wheel/center.png"/>
        <canvas  data-responsiveMinWidth="180"
        data-responsiveScaleHeight="true" 
        data-responsiveMargin="50" id='myCanvas' width='420' height='420'> Canvas not supported, use another browser.</canvas>
      </div>
      <button data-active="spin">Spin</button>
    </div>
    `;
    let canvas = div.querySelector("#myCanvas");
    let spin_btn = div.querySelector('[data-active="spin"]');

    let alertPrize = (indicatedSegment) => {
      let gift1 = localStorage.getItem("giftItem");
      let gift2 = localStorage.getItem("giftItem2");

      let cart_selected = JSON.parse(localStorage.getItem("cartItem"))
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [];
      let cart_quantity = cart_selected.reduce((total, current) => {
        if (current.catId && current.catId.includes("sGT8Q5")) return total;
        if (current.catId && current.catId.includes("kYx45S")) return total;
        if (current.name.toLowerCase().includes("great life")) return total;
        return total + parseInt(current.quantity);
      }, 0);
      cart_quantity = parseInt(cart_quantity);

      let cart_menu = document.querySelector('[data-menu="cart"]');
      __push_notification(
        "success",
        `Chúc mừng bạn đã nhận được ${indicatedSegment.text}, phần quà đã được thêm vào giỏ hàng`
      );
      cart_selected = [...cart_selected];
      if (!gift1)
        localStorage.setItem("giftItem", JSON.stringify(indicatedSegment.text));
      if (gift1 && !gift2)
        localStorage.setItem(
          "giftItem2",
          JSON.stringify(indicatedSegment.text)
        );
      localStorage.setItem("cartItem", JSON.stringify(cart_selected));
      // localStorage.setItem("giftItem", JSON.stringify(indicatedSegment.text));
      cart_menu.classList.add("active");
      __show_cart_item(
        cart_menu.querySelector("ul"),
        cart_menu.querySelector("[data-amount]")
      );
      __show_cart_quantity(
        document.querySelector('[data-toggle="cart_toggle"]')
      );
      __get_voucher({ discountDiv: cart_menu, gift: indicatedSegment.text });
      if (cart_quantity === 3 && localStorage.getItem("giftItem")) {
        spin_btn.disabled = true;
        spin_btn.innerHTML = "Bạn đã hết lượt quay";
        return;
      }

      if (
        cart_quantity >= 4 &&
        localStorage.getItem("giftItem") &&
        localStorage.getItem("giftItem2")
      ) {
        spin_btn.disabled = true;
        spin_btn.innerHTML = "Bạn đã hết lượt quay";
        return;
      }
      // spin_btn.disabled = true;
      // spin_btn.innerHTML = "Bạn đã hết lượt quay";
    };

    let theWheel = new Winwheel({
      canvasId: canvas,
      numSegments: 9,
      responsive: true,
      drawText: false,
      drawMode: "segmentImage",
      // Definition of all the segments.
      segments: [
        {
          text: "Pin / Khăn Tay / Bật lửa / Túi Bút",
          image: "/assets/img/wheel/1.png",
        },
        {
          image: "/assets/img/wheel/2.png",
          text: "Vòng tay / Mũ (S-cap ver.2) / Túi ",
        },
        {
          image: "/assets/img/wheel/3.png",
          text: "Quần Short / Áo thun bất kỳ",
        },
        {
          text: "Voucher 5%",
          image: "/assets/img/wheel/4.png",
        },
        {
          text: "Voucher 10%",
          image: "/assets/img/wheel/5.png",
        },
        {
          text: "Áo sơ mi",
          image: "/assets/img/wheel/6.png",
        },
        {
          text: "Áo nỉ",
          image: "/assets/img/wheel/7.png",
        },
        {
          text: "Quần",
          image: "/assets/img/wheel/8.png",
        },
        {
          text: "Voucher 1 triệu đồng",
          image: "/assets/img/wheel/9.png",
        },
      ],
      // Definition of the animation
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 10,
        callbackFinished: alertPrize,
      },
    });

    spin_btn.addEventListener("click", (e) => {
      theWheel.rotationAngle = 0;
      var segmentNumber = {
        1: 2600,
        2: 1600,
        3: 1000,
        4: 26,
        5: 15,
        6: 2,
        7: 2,
        8: 2,
        9: 0,
      };
      let a = Object.keys(segmentNumber).reduce((total, current) => {
        return [...total, ...Array(segmentNumber[current]).fill(current)];
      }, []);
      let random = a[Math.floor(Math.random() * a.length)];
      var stopAt = theWheel.getRandomForSegment(random);
      theWheel.animation.stopAngle = stopAt;
      theWheel.startAnimation();
    });
    return div;
  },

  campaign_guide_modal(data) {
    let div = document.createElement("div");
    div.className = "campaign__guide";
    div.innerHTML = `
      <div class="glide" id="campaign_guide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides campaign__guide--items" >
          
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>  
    `;
    let guide_container = div.querySelector(".campaign__guide--items");
    let guide_item = (data || [])
      .map((item) => {
        return `
      <li class="glide__slide">
          <div style="background-image:url(https://sss-dashboard.leanservices.work${item}.jpeg)"></div>
      </li>
      `;
      })
      .join("");
    guide_container.innerHTML = guide_item;
    setTimeout(() => {
      new Glide("#campaign_guide", {
        type: "slider",
        perView: 1,
      }).mount();
    }, 500);
    return div;
  },

  survey_modal(data) {
    let div = document.createElement("div");
    div.className = "survey__modal";
    div.innerHTML = `
      <h1>Hòm thư góp ý</h1>
      <form>
        <input data-value="customer_email" type="email" placeholder="Email" />
        <input data-value="customer_phone" type="text" placeholder="* Số điện thoại" required />
        <textarea data-value="customer_note" placeholder="Nội dung"></textarea>
      </form>
    `;
  },

  //loyalty modal
  account_modal(params) {
    let div = document.createElement("div");
    div.className = "loyalty__account";
    div.innerHTML = `
      <div class="account__header">
        <span data-action="close">${__icons.back}</span>
        <h3>Thông tin cá nhân</h3>
      </div>
      <div class="account__overview">
        <div class="card" style="background-image:url(https://sss-dashboard.leanservices.work/upload/5-2022/1652687671783.jpeg)">
          <img class="barcode" id="account_barcode"/>
          <div>
            <div class="loyalty__info">
              <h3 class="loyalty__profile--name">${params.name}</h3>
              <p>${params.grade ? params.grade :'member'}</p>
            </div>
            <div class="loyalty__info">
             <!-- <small>${params.totalPoint} points</small> --!>
            </div>
          </div>
        </div>
        <div class="member__ranking mt-5">
            <div class=" relative h-3 w-full bg-zinc-200 rounded">
                <p class="absolute top-0 left-0 h-3 rounded bg-amber-400 max-w-full" style="width:${(params.totalPayment/ 6000000)*100}%">
                </p>
                <small class="w-full absolute top-auto text-xs left-0 h-3 rounded text-center">${__currency_format(params.totalPayment)}/${__currency_format(6000000)}</small>
                <ul class="flex absolute flex-row max-w-full w-full top-3">
                  <li class="text-xs uppercase absolute py-2 px-1 top-0 left-[${(0/6000000)*100}%]"><span class="block absolute w-0.5 h-5 left-0 top-[-10px] bg-zinc-500"></span>member</li>
                  <li class="text-xs uppercase absolute py-2 px-1 top-0 left-[${(2500000/6000000)*100}%]"><span class="block absolute w-0.5 h-5 left-0 top-[-10px] bg-zinc-500"></span>loyal</li>
                  <li class="text-xs uppercase absolute py-2 px-1 top-0 left-[calc(${(6000000/6000000)*100}%-25px)]">vip<span class="block absolute w-0.5 h-5 right-0 top-[-10px] bg-zinc-500"></span></li>
                </ul>
            </div>
        </div>
      </div>
      <div class="account__form">
        <label>
            <p>Họ và tên</p>
            <input data-input="customer_name" type="text" value="${
              params.name
            }"/>
        </label>
        <label>
            <p>Email</p>
            <input data-input="customer_email" type="email" value="${
              params.email
            }"/>
        </label>
        <label>
            <p>Số điện thoại</p>
            <input data-input="customer_phone" type="number" value="${
              params.phone
            }"/>
        </label>
        <label>
            <p>Ngày sinh</p>
            <input data-input="customer_birthday" type="date" value="${__output_date(
              params.birthday
            )}"/>
        </label>
        <label>
            <p>Giới tính</p>
            <select data-input="customer_gender">
              <option selected disabled hidden value>${params.gender == "male" ? "Nam" : "Nữ"}</option>
              <option value="male">Nam</option>
              <option value="famale">Nữ</option>
              <option value="other">Khác</option>
            </select>
        </label>
        <label>
            <p>Địa chỉ</p>
            <textarea data-input="customer_address" value="${params.address}">${
      params.address
    }</textarea>
        </label>
      </div>
      <div class="flex justify-center items-center p-5">
        <button data-action="update_btn" class="drop-shadow p-4 bg-gray-200 rounded">Cập nhật thông tin</button>
      </div>
    `;
    let back_btn = div.querySelector('[data-action="close"]');
    let update_btn = div.querySelector('[data-action="update_btn"]');
    let customer_name = div.querySelector('[data-input="customer_name"]');
    let customer_gender = div.querySelector('[data-input="customer_gender"]');
    let customer_phone = div.querySelector('[data-input="customer_phone"]');
    let customer_birthday = div.querySelector(
      '[data-input="customer_birthday"]'
    );
    let customer_email = div.querySelector('[data-input="customer_email"]');
    let customer_address = div.querySelector('[data-input="customer_address"]');
    let user_data = params;

    update_btn.addEventListener("click", (e) => {
      e.preventDefault();
      user_data.name = customer_name.value;
      user_data.phone = customer_phone.value;
      user_data.email = customer_email.value;
      user_data.birthday = new Date(customer_birthday.value).getTime();
      user_data.address = customer_address.value;
      user_data.gender = customer_gender.value;
      let token = localStorage.getItem("token");
      if (!token) return false;
      console.log(user_data);
      __templates.api_loading("show");
      __requests(
        {
          method: "PUT",
          url: `https://leanservices.work/cs/customer/update-profile`,
          auth: token,
          body: JSON.stringify(user_data),
        },
        ({ data }) => {
          __templates.api_loading("hide");
          __push_notification(
            "success",
            "Cập nhật thông tin cá nhân thành công"
          );
          console.log(data);
        }
      );
    });

    back_btn.addEventListener("click", (e) => {
      this.close();
    });

    setTimeout(() => {
      JsBarcode("#account_barcode", params.id, {
        width: 2,
        height: 20,
        background: "white",
        lineColor: "black",
        displayValue: false,
      });
    }, 100);
    return div;
  },

  voucher_modal(params) {
    let div = document.createElement("div");
    div.className = "voucher__modal";
    div.innerHTML = `
    <div class="voucher__header">
      <span data-action="close">${__icons.back}</span>
      <h3>Mã ưu đãi</h3>
    </div>
    <ul class="voucher__list">
      <p class="text-center">Bạn chưa có mã ưu đãi nào</p>
    <ul>
    `;
    let voucher_list = div.querySelector(".voucher__list");
    let _init_voucher_data = () => {
      let token = localStorage.getItem("token");
      if (!token) return false;
      let voucher = params.voucher
        .map((item) => {
          return `
        <li class="voucher__item">
          <div class="voucher__item--img">
            <span style="background-image:url(https://sss-dashboard.leanservices.work/upload/3-2022/1647486888220.jpeg)"></span>
          </div>
          <div class="voucher__item--info">
            <h3>${item.name}</h3>
            <p>${item.des}</p>
            <small>HSD: ${item.startDate} - ${item.endDate} </small>
          </div>
        </li>
        `;
        })
        .join("");
      voucher_list.innerHTML = voucher;
    };
    let back_btn = div.querySelector('[data-action="close"]');
    back_btn.addEventListener("click", (e) => {
      this.close();
    });
    return div;
  },

  history_modal() {
    let div = document.createElement("div");
    div.className = "history__modal";
    div.innerHTML = `
    <div class="history__header">
      <span data-action="close">${__icons.back}</span>
      <h3>Thông tin cá nhân</h3>
    </div>
    `;
    let back_btn = div.querySelector('[data-action="close"]');
    back_btn.addEventListener("click", (e) => {
      this.close();
    });
    return div;
  },

  order_modal(params) {
    let div = document.createElement("div");
    div.className = "order__modal";
    div.innerHTML = `
    <div class="order__header">
      <span data-action="close">${__icons.back}</span>
      <h3>Quản lý đơn hàng</h3>
    </div>
    <ul class="order__list">
      
    </ul>
    `;
    let order_list = div.querySelector('.order__list');
    let back_btn = div.querySelector('[data-action="close"]');
    back_btn.addEventListener("click", (e) => {
      this.close();
    });

    let init_order_data = () => {
      let token = localStorage.getItem('token');
      if(!token) return false;
      __requests({
        method: "GET",
        url : `https://leanservices.work/cs/customer/my-orders?id=${params.id}`,
        auth: token,
      },({data})=> {
        if (!data.length) {
          order_list.innerHTML = '<li class="text-center">Bạn không có đơn hàng nào</li>';
          return false
        }
        let order = data.map(ticket => {
          return `
          <li data-ticket='${JSON.stringify(ticket)}' class="order__list--item">
            <h5>Đơn hàng: ${ticket.ticketId}</h5>
            <div class="order__item--info">
              <span style="background-image:url(https://cdn.ssstutter.com/products/${ticket.items[0].thumbnail.o})"></span>
              <div>
                <h5>${ticket.items[0].name}</h5>
                <small>${__currency_format(ticket.items[0].price)}</small>
              </div>
            </div>
            <div class="see__more"><button>Xem thêm</button></div>
          </li>
          `
        }).join('');
        order_list.innerHTML = order;
        let orders = div.querySelectorAll(".order__list--item");
        orders.forEach((item) => {
          item.addEventListener("click", (e) => {
            let ticket_data = JSON.parse(item.dataset.ticket)
            this.overlay({ content: this.order_detail(ticket_data) });
          });
        });
      })
    }
    init_order_data();
    return div;
  },

  setting_modal(params) {
    let div = document.createElement("div");
    div.className = "setting__modal";
    div.innerHTML = `
    <div class="setting__header">
      <span data-action="close">${__icons.back}</span>
      <h3>Cài đặt</h3>
    </div>
    <div class="setting__menu">
      <ul>
        <li class="p-2">
          <p data-toggle="change_pass" class="p-2">Đổi mật khẩu</p>
          <div class="flex flex-col hidden">
            <input type="text" data-input="old_password" class="p-2 my-2" placeholder="Nhập mật khẩu cũ"/>
            <input type="text" data-input="new_password" class="p-2 my-2" placeholder="Nhập mật khẩu mới"/>
            <button data-action="submit" class="p-3 drop-shadow bg-gray-50">Xác nhận</button>
          </div>
        </li>
        <li class="p-2">
           <p data-toggle="support" class="p-2">Hỗ trợ</p>
           <div class="flex flex-col hidden">
              <p class="p-2 my-2">Hotline: 086 993 6266</p>
              <p class="p-2 my-2">Email: info@ssstutter.com</p>
           </div> 
        </li>
      </ul>
    </div>
    `;
    let back_btn = div.querySelector('[data-action="close"]');
    let toggle_setting = div.querySelectorAll("[data-toggle]");
    let old_pwd = div.querySelector('[data-input="old_password"]');
    let new_pwd = div.querySelector('[data-input="new_password"]');
    let submit_btn = div.querySelector('[data-action="submit"]');
    let user_data = params;
    toggle_setting.forEach((menu) => {
      menu.addEventListener("click", (e) => {
        let content = menu.parentNode.querySelector("div");
        content.classList.toggle("hidden");
      });
    });

    submit_btn.addEventListener("click", (e) => {
      __templates.api_loading("show");
      let token = localStorage.getItem("token");
      if (!token) return false;
      user_data.password = old_pwd.value;
      user_data.newPassword = new_pwd.value;
      __requests({
        method: "PUT",
        url: `https://leanservices.work/cs/customer/update-profile`,
        auth: token,
        body: JSON.stringify(user_data),
      },({data})=> {
        __templates.api_loading("hide");
        __push_notification(
          "success",
          "Cập nhật mật khẩu thành công"
        );
        console.log(data);
      });
    });

    back_btn.addEventListener("click", (e) => {
      this.close();
    });
    return div;
  },

  order_detail(params) {
    console.log(params);
    let div = document.createElement("div");
    div.className = "order__detail--modal";
    div.innerHTML = `
      <h5>Đơn hàng: ${params.ticketId}</h5>
      <div class="order__info">
        <h1>Thông tin</h1>
        <div class="overview">
            <p>Khách hàng : ${params.customerName}</p>
            <p>Điện thoại : ${params.customerPhone}</p>
            <p>Địa chỉ nhận hàng : ${params.shippingAddress}</p>
        </div>
        <div class="purchase__list">
          <div class="class="glide__track" data-glide-el="track"">
            <ul class="glide__slides">
         ${params.items.map(product => {
           return `
            <li class="glide__slide">
              <span style="background-image:url(https://cdn.ssstutter.com/products/${product.thumbnail.o})"></span>
              <div class="item__info">
                <h5>${product.name}</h5>
                <div><p>${__currency_format(product.price)}</p><em>x${product.quantity}</em></div>
              </div>
              <div class="item__total">Tổng : <strong>${__currency_format(product.quantity* product.price)}</strong></div>
            </li>
           `
         }).join('')}
            </ul>
          </div>
        </div> 
        <div class="total__bill">
          <h1>Tổng hoá đơn:</h1>
          <strong>${__currency_format(params.moneyTotal)}</strong>
        </div>
      </div>
       <!--<div class="order__tracking">
      <h1>Hành trình</h1>
        <ul>
          <li class="active">
            <i>13/2/2022</i>
            <p>Đang chuẩn bị hàng</p>          
          </li>
          <li>
            <i>13/2/2022</i>
            <p>Đang giao cho hãng vận chuyển</p>          
          </li>
        </ul> --!>

      </div>
    `;
    setTimeout(() => {
      new Glide(".purchase__list", {
        type: "slider",
        perView: 1,
        peek: {
          before: 0,
          after: 50,
        },
        autoplay: 5000,
      }).mount();
    }, 100);
    return div;
  },

  logout_modal() {
    let div = document.createElement("div");
    div.className = "logout__modal";
    div.innerHTML = `
      <h3>Bạn có muốn đăng xuất</h3>
      <div>
        <button data-action="logout">Đăng xuất</button>
        <button data-action="close">Huỷ</button>
      </div>
    `;
    let logout = div.querySelector('[data-action="logout"]');
    let back_btn = div.querySelector('[data-action="close"]');
    back_btn.addEventListener("click", (e) => {
      this.close();
    });

    logout.addEventListener("click", (e) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    });

    return div;
  },
};
