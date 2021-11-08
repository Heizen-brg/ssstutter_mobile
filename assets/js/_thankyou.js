import { __currency_format } from "./share/_function.js";
import { __icons } from "./share/_icons.js";

export const __templates_thankyou = {
  thankyou_overview() {
    let div = document.createElement("div");
    div.className = "thankyou__overview";
    div.innerHTML = `
    <div class="customer__info">
      ${__icons.ssstutter}
      <h5>Đặt hàng thành công</h5>
      <p>Cảm ơn bạn đã ủng hộ SSStutter !</p>
      <ul>
        <label>Phương thức thanh toán</label>
        <li>Thanh toán qua thẻ</li>
        <li><button>Tiếp tục mua hàng</button></li>
      </ul>
    </div>

    `;
    localStorage.removeItem("cartItem");
    let continue_btn = div.querySelector("button");
    continue_btn.addEventListener("click", (e) => {
      window.location.href = "/";
    });
    return div;
  },
};
