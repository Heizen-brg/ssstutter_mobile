import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_product_list, __push_notification } from "./share/_function.js";
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
          <input data-input="name" type="text" placeholder="Tên"/>
          <input data-input="phone" type="number" placeholder="Số điện thoại"/>
          <input data-input="email" type="email" placeholder="Email"/>
          <input data-input="password" type="password" placeholder="Mật khẩu"/>
          <input data-input="birthday" onfocus="(this.type='date')" type="text" placeholder="Ngày sinh"/>
          <select data-input="gender">
            <option hidden disabled selected value>Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="famale">Nữ</option>
            <option value="other">Khác</option>
          </select>
          <input data-input="address" type="text" placeholder="Địa chỉ"/>
        </div>
        <button data-action="register">Đăng ký</button>
        <small><a href="/login">Bạn đã có tài khoản ? Đăng nhập ngay</a></small>
     </div>
    `;
    let register_btn = div.querySelector('[data-action="register"]')
    let phone = div.querySelector('[data-input="phone"]')
    let name = div.querySelector('[data-input="name"]')
    let email = div.querySelector('[data-input="email"]')
    let password = div.querySelector('[data-input="password"]')
    let birthday = div.querySelector('[data-input="birthday"]')
    let gender = div.querySelector('[data-input="gender"]')
    let address = div.querySelector('[data-input="address"]')
    let form_register = div.querySelector('.register__form--register')
    let register_data = {
      name: '',
      phone: '',
      email: '',
      address:'',
      birthday:'',
      gender:''
    }
    register_btn.addEventListener('click',(e)=> {
      register_data.phone = phone.value;
      register_data.name = name.value;
      register_data.email = email.value;
      register_data.birthday = new Date(birthday.value).getTime();
      register_data.password = password.value;
      register_data.address = address.value;
      register_data.gender = gender.value;
      
      if (Object.values(register_data).some((value) => !value)) {
        __push_notification("fail", "Vui lòng điền đầy đủ thông tin");
        return false;
      }
      if (register_data.phone.length < 10) {
        __push_notification('fail','Số điện thoại không hợp lệ')
        return false;
      }  
      if (register_data.password.length < 8) {
        __push_notification('fail','Mật khẩu phải có độ dài trên 8 ký tự')
        return false;
      }  
         __templates.api_loading('show')
         console.log(register_data);
      __requests({
        method: "POST",
        url : `https://leanservices.work/cs/customer/sign-up`,
        body : JSON.stringify(register_data)
      },({data})=> {
        __push_notification('success', 'Chúc mừng bạn đã đăng ký thành công')
        __templates.api_loading('hide')
        form_register.innerHTML = `
        <h2 class="text-center">Chào mừng ${data.name} đến với SSSTUTTER</h2>
        <a class="w-full text-center p-5 drop-shadow rounded" href="/login">Đăng nhập ngay</a>
        </button>
      `
      })
    })
    return div;
  },
}