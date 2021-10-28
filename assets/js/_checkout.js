import { __render, __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import {
  __calc_final_amount,
  __check_shipping,
  __currency_format,
  __get_voucher,
  __push_notification,
  __show_cart_item,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";
let typing_timer = null;
let items_purchased = JSON.parse(localStorage.getItem("cartItem"));
let order_data = {
  customerPhone: "",
  customerName: "",
  customerEmail: "",
  paymentMethod: "",
  items: "",
  discountCode: [],
  customerNote: "",
  shippingAddress: "",
};
let shippingFormat = {
  city: "",
  district: "",
  ward: "",
  address: "",
};
export const __templates_checkout = {
  checkout_form() {
    let div = document.createElement("div");
    div.className = "checkout__form";
    div.innerHTML = `
      <h1>Thông tin giao hàng</h1>
      <form>
        <input data-value="customer_name" type="text" placeholder="* Họ & Tên" required />
        <input data-value="customer_email" type="email" placeholder="Email" />
        <input data-value="customer_phone" type="text" placeholder="* Số điện thoại" required />
        <div>
          <select data-value="customer_city" required>
            <option selected value="none" hidden>* Chọn Tỉnh/Thành Phố</option>
          </select>
          <select data-value="customer_district" required>
            <option selected value="none" hidden>* Chọn Quận/Huyện</option>
          </select>
          <select data-value="customer_ward" required>
            <option selected value="none" hidden>* Chọn Phường/Xã</option>
          </select>
        </div>
        <input data-value="customer_address" required type="text" placeholder="* Số nhà tên đường..." />
      </form>
      <small style="color:gray">(*) là trường không được để trống</small>
    `;

    let customer_name = div.querySelector('[data-value="customer_name"]');
    let customer_phone = div.querySelector('[data-value="customer_phone"]');
    let customer_address = div.querySelector('[data-value="customer_address"]');
    let customer_email = div.querySelector('[data-value="customer_email"]');
    let customer_city = div.querySelector('[data-value="customer_city"]');
    let customer_district = div.querySelector('[data-value="customer_district"]');
    let customer_ward = div.querySelector('[data-value="customer_ward"]');

    // get address
    let get_location_data = (selected_dom, type = "city", parent_id = null) => {
      __requests(
        {
          method: "GET",
          url: `w/get-location?type=${type}&parent_id=${parent_id}`,
        },
        (res) => {
          let location_data = (res.data || [])
            .map((location) => {
              return `
        <option value="${location.id}">${location.name}</option>
        `;
            })
            .join("");
          if (type == "city") {
            selected_dom.innerHTML += location_data;
          } else if (type == "district") {
            selected_dom.innerHTML = `
              <option value="none" selected disabled hidden>Chọn Quận/Huyện</option>
                ${location_data}
          `;
          } else {
            selected_dom.innerHTML = `
            <option value="none" selected disabled hidden>Chọn Xã/Phường</option>
              ${location_data}
          `;
          }
        }
      );
    };

    //  address shipping

    get_location_data(customer_city);
    customer_name.addEventListener("change", (e) => {
      order_data.customerName = e.target.value;
    });
    customer_phone.addEventListener("change", (e) => {
      let re = /^(?:(?:\+)84|0)\d{9}$/;
      if (re.test(e.target.value)) {
        order_data.customerPhone = e.target.value;
        customer_phone.classList.remove("error");
        clearTimeout(typing_timer);
        typing_timer = setTimeout(() => {
          __get_voucher(e.target.value);
        }, 500);
      } else {
        customer_phone.classList.add("error");
        __push_notification("fail", "Số điện thoại không hợp lệ !");
      }
    });
    customer_email.addEventListener("change", (e) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        order_data.customerEmail = e.target.value;
        customer_email.classList.remove("error");
      } else {
        customer_email.classList.add("error");
        __push_notification("fail", "Email không hợp lệ !");
      }
    });
    customer_city.addEventListener("change", (e) => {
      let selected = customer_city.querySelector("option:checked");
      get_location_data(customer_district, "district", e.target.value);
      get_location_data(customer_ward, "ward", e.target.value);
      shippingFormat.city = selected.textContent;
    });
    customer_district.addEventListener("change", (e) => {
      let selected = customer_district.querySelector("option:checked");
      get_location_data(customer_ward, "ward", e.target.value);
      shippingFormat.district = selected.textContent;
    });
    customer_ward.addEventListener("change", (e) => {
      let selected = customer_ward.querySelector("option:checked");
      shippingFormat.ward = selected.textContent;
    });
    customer_address.addEventListener("change", (e) => {
      shippingFormat.address = e.target.value;
      let total = document.querySelector('[data-amount="total"]');
      __check_shipping(total.dataset.price, shippingFormat);
    });
    return div;
  },
  checkout__method() {
    let div = document.createElement("div");
    div.className = "checkout__method";
    div.innerHTML = `
    <h1>Phương thức thanh toán</h1>
    <form>
      <input id="card_payment" type="radio" value="card" name="method" hidden />
      <label for="card_payment">
        ${__icons.visa}
        <p>Thanh toán thẻ (ATM, Visa , MasterCard)</p>
      </label>
      <input id="cod_payment" type="radio" value="cod" name="method" hidden />
      <label for="cod_payment">
        ${__icons.ship}
        <p>Thanh toán khi giao hàng (COD)</p>
      </label>
    </form>
    <!--
    <p>Bonus 5% cho khách hàng cũ</p>
    <p>Bonus 10% cho khách hàng Loyal & VIP</p>
    -->
    `;
    let method_input = div.querySelectorAll("input");
    method_input.forEach((input) => {
      input.addEventListener("change", (e) => {
        order_data.paymentMethod = e.target.value;
      });
    });
    return div;
  },
  checkout__cart() {
    let div = document.createElement("div");
    div.className = "checkout__cart";
    div.innerHTML = `
        <ul class="product__list">

        </ul>
        <div class="discount__code">
          <input data-value="coupon" type="text" placeholder="Mã giảm giá..." />
          <button data-action="coupon">Áp dụng</button>
        </div>
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
        
        <button class="confirm__order">Hoàn tất đơn hàng</button>
    `;
    __show_cart_item(div.querySelector(".product__list"), div.querySelector('[data-amount="purchase"]'), div);
    let coupon_input = div.querySelector('[data-value="coupon"]');
    let apply_coupon = div.querySelector('[ data-action="coupon"]');
    let confirm_btn = div.querySelector(".confirm__order");
    apply_coupon.addEventListener("click", (e) => {
      order_data.discountCode.push(coupon_input.value);
    });
    confirm_btn.addEventListener("click", () => {
      let items_purchased = JSON.parse(localStorage.getItem("cartItem"));
      let order_item_format = items_purchased.map((item) => {
        return {
          id: item.variation.id,
          quantity: item.quantity,
          barcode: item.variation.barcode,
        };
      });
      order_data.shippingAddress = `${shippingFormat.address}, ${shippingFormat.ward},${shippingFormat.district},${shippingFormat.city}`;
      order_data.items = order_item_format;
      if (
        !order_data.customerName ||
        !order_data.customerPhone ||
        !order_data.shippingAddress ||
        !shippingFormat.address ||
        !shippingFormat.ward ||
        !shippingFormat.district ||
        !shippingFormat.city
      ) {
        __push_notification("fail", "Vui lòng điển đủ thông tin");
        return;
      }
      __templates.api_loading("show");
      __requests(
        {
          method: "POST",
          url: "order/order/web/create",
          body: JSON.stringify(order_data),
        },
        ({ data, error }) => {
          if (data.paymentUrl) {
            __templates_modal.overlay({ content: __templates_modal.card_payment_progress() });
            window.open(data.paymentUrl, "_blank");
          } else {
            __render.order_page(data);
          }
        }
      );
    });
    return div;
  },
};
