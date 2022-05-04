import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";

export const __templates_login = {

  login() {
    let div = document.createElement("div");
    div.className = "login__form";
    div.innerHTML = `
     <div class="login__form--logo">${__icons.ssstutter}</div>
     <div class="login__form--login">
        <div class="login__form--label">
          <input data-input="phone" type="text" placeholder="Số điện thoại"/>
        </div>
        <button data-action="login">Đăng nhập</button>
        <small data-action="forgot_pwd">Quên mật khẩu?</small>
     </div>
    `;
    let login_btn = div.querySelector('[data-action="login"]')
    let forgot_pwd = div.querySelector('[data-action="forgot_pwd"]')
    let input_label = div.querySelector('.login__form--label')
    login_btn.addEventListener('click',(e)=> {
      switch (login_btn.dataset.action) {
        case 'login':
          input_label.innerHTML = `          
          <input data-input="password" type="text" placeholder="Mật khẩu"/>
          `
          login_btn.dataset.action = 'check_password';
          login_btn.innerHTML = 'Tiếp tục';
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
  register() {
    let div = document.createElement("div");
    div.className = "register__form";
    div.innerHTML = `
     <div></div> 
     <h4>Tài khoản</h4>
     <p>${__icons.notification}</p>
    `;
    return div;
  },
}