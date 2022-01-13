import { __render, __requests } from "../main.js";
import { __size_guide_data } from "./_data.js";
import {
  __currency_format,
  __get_voucher,
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
    params.close == "show" ? (div.innerHTML = `<div class="close__btn">${__icons.close}<div>`) : "";
    let content = document.createElement("div");
    content.className = "modal__content";
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
    div.className = "sale__promotion";
    div.innerHTML = `
      <h2>Cảm ơn bạn đã tải ứng dụng</h2>
      <p> Bạn đã dược tặng 01 voucher giảm giá</p>
      <p>SSSTUTTERAPP</p>
      <div><button>Xác nhận</button></div>
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
            __show_cart_item(cart_menu.querySelector("ul"), cart_menu.querySelector("[data-amount]"));
            __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
            __get_voucher({ discountDiv: cart_menu });
          }
        );
      });
    });

    return div;
  },
  promotion_book_combo() {
    let div = document.createElement("div");
    div.className = `book__promotion`;
    div.innerHTML = `
      <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637225147506.jpeg)">
      </div>
    `;
    if (window.innerWidth < 436) {
      div.innerHTML = `
      <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637219407036.jpeg)">
      </div>
      <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637219553094.jpeg)">
      </div>
      <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637219558465.jpeg)">
      </div>
      ${__icons.swipe_up}
      `;
    }
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
              <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
              item.extensions.media.featured
            })"></span></a>
            </div>
            <h6 class="name">${item.name.toLowerCase()}</h6>
            <div class="price">
              ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
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
      if (!gift1) localStorage.setItem("giftItem", JSON.stringify(indicatedSegment.text));
      if (gift1 && !gift2) localStorage.setItem("giftItem2", JSON.stringify(indicatedSegment.text));
      localStorage.setItem("cartItem", JSON.stringify(cart_selected));
      // localStorage.setItem("giftItem", JSON.stringify(indicatedSegment.text));
      cart_menu.classList.add("active");
      __show_cart_item(cart_menu.querySelector("ul"), cart_menu.querySelector("[data-amount]"));
      __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
      __get_voucher({ discountDiv: cart_menu, gift: indicatedSegment.text });
      if (cart_quantity === 3 && localStorage.getItem("giftItem")) {
        spin_btn.disabled = true;
        spin_btn.innerHTML = "Bạn đã hết lượt quay";
        return;
      }

      if (cart_quantity >= 4 && localStorage.getItem("giftItem") && localStorage.getItem("giftItem2")) {
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
};
