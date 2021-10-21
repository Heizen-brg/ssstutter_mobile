import { __render } from "../main.js";
import { __size_guide_data } from "./_data.js";
import { __icons } from "./_icons.js";
export const __templates_modal = {
  overlay(params = {}) {
    let main_body = document.querySelector('#root');
    let div = document.createElement('div');
    div.className = 'modal__overlay';
    div.innerHTML = `<div class="close__btn">${__icons.close}<div>`;
    let content = document.createElement('div');
    content.className = 'modal__content';
    if (params.content) __render.build_in_block({
      block: content,
      target: params.content
    });
    div.appendChild(content);
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('modal__overlay')) return false;
      main_body.removeChild(div);
    })
    let close_btn = div.querySelector('.close__btn');
    if (close_btn)
      close_btn.addEventListener('click', () => {
        main_body.removeChild(div);
      })
    main_body.appendChild(div);
    return div;
  },
  store_check() {
    let div = document.createElement('div');
    div.className = 'store__check--modal';
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
    let div = document.createElement('div');
    div.className = 'size__guide--modal'
    div.innerHTML = `
      <h1>My fit size</h1>
      <div class="size__guide--container">
        <div class="info">
          <img src="assets/img/size.png" alt="" />
          <table>
            <thead>
              <tr>
                <td>Kích thước</td>
                <td>Chiều rộng vai</td>
                <td>Phần ngực</td>
                <td>Chiều dài tay</td>
                <td>Tổng thể</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S(1)</td>
                <td>45.5</td>
                <td>55</td>
                <td>58</td>
                <td>65</td>
              </tr>
              <tr>
                <td>M(2)</td>
                <td>45.5</td>
                <td>55</td>
                <td>58</td>
                <td>65</td>
              </tr>
              <tr>
                <td>L(3)</td>
                <td>45.5</td>
                <td>55</td>
                <td>58</td>
                <td>65</td>
              </tr>
              <tr>
                <td>XL(4)</td>
                <td>45.5</td>
                <td>55</td>
                <td>58</td>
                <td>65</td>
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
    let calc_btn = div.querySelector('button');
    calc_btn.addEventListener('click', () => {
      let height_input = div.querySelector('.height__input');
      let weight_input = div.querySelector('.weight__input');
      let user_info = {
        w: weight_input.value,
        h: height_input.value
      }
      size_calc(user_info)
    })
    let size_calc = (params) => {
      let response_size = div.querySelector('.response');
      console.log(params);
      if ((params.w || params.h) == "") return false;
      let balance = __size_guide_data.balance;
      let size_found = null;
      for (let [k, v] of Object.entries(__size_guide_data)) {
        if (v.constructor != Object) continue;
        if (params.h >= v.height.min && params.h <= v.height.max) {
          size_found = k;
          if (params.w >= (v.weight.max + balance)) {
            continue;
          } else {
            break;
          }
        } else {
          if (params.h < (v.height.max + balance)) {
            size_found = k;
          } else {
            continue;
          }
        }
        if (params.w >= v.weight.min && params.w <= v.weight.max) {
          size_found = k;
          break;
        } else {
          if (params.w < (v.weight.max + balance)) {
            size_found = k;
          } else {
            continue;
          }
        }

      }
      if (size_found) {
        response_size.innerHTML = `Size phù hợp với bạn là size ${size_found}`
        return __size_guide_data[size_found]
      } else {
        response_size.innerHTML = `Không tìm được size phù hợp với bạn, vui lòng thử lại !`
        return false;
      }

    }
    return div;
  },
  refund_policy() {
    let div = document.createElement('div');
    div.className = 'refund__policy';
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
    let div = document.createElement('div');
    div.className = 'payment__progress';
    div.innerHTML = `
      <h1>Đã mở công thanh toán online !</h1>
      <a href="/"><button>Quay lại trang chủ</buton></a>
    `;
    return div;
  }
}