import { __currency_format } from "./share/_function.js";
import { __icons } from "./share/_icons.js";


export const __templates_canceled = {
  canceled_overview() {
    let div = document.createElement('div');
    div.className = 'thankyou__overview';
    div.innerHTML = `
    <div class="customer__info">
      ${__icons.ssstutter}
      <h5>Thanh toán không thành công</h5>
      <p>Đã có lỗi xảy ra trong quá trình thanh toán!</p>
      <ul>
        <label>Vui lòng liên hệ SSStutter để được hỗ trợ</label>
        <li>Hotline:086 993 6266</li>
        <li><button>Về trang chủ</button></li>
      </ul>
    </div>

    `;
    localStorage.removeItem("cartItem");
    localStorage.removeItem('giftItem');
    localStorage.removeItem('giftItem2');
    let continue_btn = div.querySelector('button');
    continue_btn.addEventListener('click', (e) => {
      window.location.href = '/'
    })
    return div;
  },

}