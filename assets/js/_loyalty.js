import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";

export const __templates_loyalty = {

  header() {
    let div = document.createElement("div");
    div.className = "loyalty__header";
    div.innerHTML = `
     <div></div> 
     <h4>Tài khoản</h4>
     <p>${__icons.notification}</p>
    `;
    return div;
  },

  profile () {
    let div = document.createElement("div");
    div.className = 'loyalty__profile';
    div.innerHTML = `
      <div class="loyalty__profile--avt">
        <div class="card" style="background-image:url(https://sss-dashboard.leanservices.work/upload/3-2022/1647397717026.jpeg)">
          <img class="barcode" id="barcode"/>
          <div>
            <h3 class="loyalty__profile--name">name</h3>
            <p>GOLD MEMBER</p>
          </div>
        </div>
      </div>
   `;
    setTimeout(() => {
      JsBarcode("#barcode", "2345678910JQKA", {
        width:2,
        height:20,
        background : 'transparent',
        lineColor : 'black',
        displayValue: false

      });
    }, 100);

    return div;
  },

  customer_menu() {
    let div = document.createElement('div');
    div.className = "loyalty__menu";
    div.innerHTML = `
      <hr>
      <ul>
        <li data-action="account">
          <span>${__icons.user}</span>
          <div>
            <p>Cá nhân</p>
            <small>Thông tin cá nhân, tích điểm, tiêu dùng</small>
          </div>
        </li>
        <li data-action="voucher">
          <span>${__icons.voucher}</span>
          <div>
            <p>Ưu đãi</p>
            <small>Thông tin ưu đãi, mã giảm giá</small>
          </div>
        </li>
        <li data-action="order">
          <span>${__icons.shopping}</span>
          <div>
            <p>Đơn hàng</p>
            <small>Thông tin và trạng thái đơn hàng</small>
          </div>
        </li>
        <li data-action="setting">
          <span>${__icons.setting}</span>
          <div>
            <p>Cài đặt</p>
            <small>Cập nhật hệ thống và tuỳ chỉnh</small>
          </div>
        </li>
      </ul>
      <div class="logout">
        <button>Đăng xuất</button>
      </div>
    `;

    let menu = div.querySelectorAll('[data-action]');
    let logout = div.querySelector('.logout');
    menu.forEach(item => {
      item.addEventListener('click',(e)=> {
        __templates_modal.overlay({content: __templates_modal[`${item.dataset.action}_modal`](),style : 'fullscreen'})
      })
    })

    logout.addEventListener('click',(e)=> {
      __templates_modal.overlay({content: __templates_modal.logout_modal()})
    })
    return div;
  }

};