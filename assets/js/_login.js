import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import {
  __countdown_timer,
  __currency_format,
  __init_product_list,
  __push_notification,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";

export const __templates_login = {
  login() {
    let div = document.createElement("div");
    div.className = "login__form";
    div.innerHTML = `
     <div class="coming__soon">
      <h1>${__icons.ssstutter}</h1>
      <h1>COMING SOON !!!</h1>
      <p>Tính năng đang trong quá trình thử nghiệm, SSSTUTTER sẽ mang đến cho các bạn hệ thống Thành Viên trong thời gian sớm nhất, xin cảm ơn !</p>
     </div>
     <div class="login__form--logo">${__icons.ssstutter}</div>
     <div class="login__form--login">
        <div class="login__form--label">
          <input data-input="phone" type="number" placeholder="Số điện thoại"/>
        </div>
        <button data-action="login">Đăng nhập</button>
       <!-- <p><a href="/register">Đăng ký ngay tại đây</a></p> --!>
        <small data-action="forgot_pwd">Quên mật khẩu?</small>
     </div>
    `;
    let login_btn = div.querySelector('[data-action="login"]');
    let phone_input = div.querySelector('[data-input="phone"]');
    let forgot_pwd = div.querySelector('[data-action="forgot_pwd"]');
    let input_label = div.querySelector(".login__form--label");
    let user = {
      phone: "",
      password: "",
    };
    login_btn.addEventListener("click", (e) => {
    
      switch (login_btn.dataset.action) {
        case "login":
          user.phone = phone_input.value;
          input_label.innerHTML = `          
          <input data-input="password" type="text" placeholder="Mật khẩu"/>
          `;
          login_btn.dataset.action = "check_password";
          login_btn.innerHTML = "Xác nhận";
          break;
        case "check_password":
          let password_input = div.querySelector('[data-input="password"]');
          user.password = password_input.value;
          __requests(
            {
              url: "https://leanservices.work/cs/customer/sign-in",
              method: "POST",
              body: JSON.stringify(user),
            },
            ({ data }) => {
              console.log(data);
              localStorage.setItem('user', JSON.stringify(data))
              window.location.href = "/loyalty";
            },({error}) => {
              __push_notification('fail',error)
               window.location.href = "/login";
            }
          );
        default:
          break;
      }
    });
    return div;
  },
};
