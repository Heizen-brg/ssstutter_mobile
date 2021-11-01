import { __currency_format } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { CONFIG } from "./config.js";

export const __templates_order = {
  order_overview(params) {
    let div = document.createElement("div");
    div.className = "order__overview";
    div.innerHTML = `
    <div class="customer__info">
      ${__icons.ssstutter}
      <h5>Đặt hàng thành công</h5>
      <p>Mã đơn hàng <strong>${params.ticketId}</strong></p>
      <p>Cám ơn bạn đã mua hàng !</p>
      <ul>
        <label>Thông tin vận chuyển</label>
        <li>${params.customerName}</li>
        <li>${params.customerPhone}</li>
        <li>${params.shippingAddress}</li>
      </ul>
      <ul>
        <label>Phương thức thanh toán</label>
        <li>${params.paymentMethod == "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán qua thẻ"}</li>
      </ul>
    </div>
    <div class="customer__continue">
      <i>Hotline liên hệ : <strong>0869936266</strong></i>
      <button>Tiếp tục mua hàng</button>
    </div>
    `;
    localStorage.removeItem("cartItem");
    let continue_btn = div.querySelector("button");
    continue_btn.addEventListener("click", (e) => {
      window.location.href = "/";
    });
    return div;
  },
  order_items(params) {
    let div = document.createElement("div");
    div.className = "order__items";
    div.innerHTML = `
        <ul class="product__list">
        ${(params.items || [])
          .map((item) => {
            return `
            <li>
              <span class="product__thumbnail"
                style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.thumbnail.x100.replace(".jpeg", ".webp")})">
              </span>
              <div>
                <h6>${item.name}</h6>
                <p>Số lương : ${item.quantity}</p>
                <strong>${__currency_format(item.price)}</strong>
              </div>
            </li>
            `;
          })
          .join("")}
        </ul>
        <div class="amount">
          <div>
            <p>Tạm tính:</p>
            <strong>${__currency_format(params.moneyTotal)}</strong>
          </div>
          <div class="ship__fee">
            <p>Phí ship:</p>
            <strong>+${__currency_format(params.shipping[0].fee)}</strong>
          </div>
        </div>
        <div class="total">
          <p>Tổng:</p>
          <strong>${__currency_format(params.moneyTotal + params.shipping[0].fee)}</strong>
        </div>
    `;
    return div;
  },
};
