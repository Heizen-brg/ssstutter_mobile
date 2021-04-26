import { __icons } from "./share/_icons.js";


export const __templates_order = {
  order_overview() {
    let div = document.createElement('div');
    div.className = 'order__overview';
    div.innerHTML = `
    <div class="customer__info">
      ${__icons.ssstutter}
      <h5>Đặt hàng thành công</h5>
      <p>Mã đơn hàng #22829</p>
      <p>Cám ơn bạn đã mua hàng !</p>
      <ul>
        <label>Thông tin vận chuyển</label>
        <li>Nguyen Van Test</li>
        <li>0966868496</li>
        <li>pop1234x@gmail.com</li>
        <li>80 Phan Van Tri, Phường Phú Thượng, Quận Tây Hồ, Hà Nội</li>
      </ul>
      <ul>
        <label>Phương thức thanh toán</label>
        <li>Thanh toán khi nhận hàng</li>
      </ul>
    </div>
    <div class="customer__continue">
      <i>Hotline liên hệ : <strong>0869936266</strong></i>
      <button>Tiếp tục mua hàng</button>
    </div>
    `;
    return div;
  },
  order_items() {
    let div = document.createElement('div');
    div.className = 'order__items';
    div.innerHTML = `
        <ul class="product__list">
          <li>
            <span class="product__thumbnail"
              style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/RetroDenimShirt_Dam_FL_1.jpg)"></span>
            <div>
              <h6>name</h6>
              <span>
                <p>Color, size</p>
              </span>
              <strong>price</strong>
            </div>
          </li>
        </ul>
        <div class="amount">
          <div>
            <p>Tạm tính:</p>
            <strong>499.000</strong>
          </div>
          <div>
            <p>Phí ship:</p>
            <strong>+0</strong>
          </div>
        </div>
        <div class="total">
          <p>Tổng:</p>
          <strong>499.000</strong>
        </div>
    `;
    return div;
  }
}