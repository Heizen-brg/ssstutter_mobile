import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";

export const __templates_register = {

  register() {
    let div = document.createElement("div");
    div.className = "register__form";
    div.innerHTML = `
     <div class="register__form--logo">${__icons.ssstutter}</div>
     <div class="register__form--register">
        <div class="register__form--label">
          <input data-input="phone" type="number" placeholder="Số điện thoại"/>
          <input data-input="email" type="email" placeholder="Email"/>
          <input data-input="password" type="password" placeholder="Mật khẩu"/>
        </div>
        <button data-action="register">Đăng ký</button>
        <small><a href="/login">Bạn đã có tài khoản ? Đăng nhập ngay</a></small>
     </div>
    `;
    let register_btn = div.querySelector('[data-action="register"]')
    let input_label = div.querySelector('.register__form--label')
    register_btn.addEventListener('click',(e)=> {
      switch (register_btn.dataset.action) {
        case 'register':
          input_label.innerHTML = `          
          <input data-input="password" type="text" placeholder="Mật khẩu"/>
          `
          register_btn.dataset.action = 'check_password';
          register_btn.innerHTML = 'Tiếp tục';
          break;
        case 'check_password':
          __templates.api_loading('show');
          window.location.href = '/loyalty';

        default:
          break;
      }
    })
    return div;
  },
}