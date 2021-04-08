export const __templates_checkout = {
  checkout_form() {
    let div = document.createElement('div');
    div.className = 'checkout__form';
    div.innerHTML = `
      <h1>Thông tin giao hàng</h1>
      <p>Hãy <strong>đăng nhập</strong> để nhận được nhiều ưu đãi hơn</p>
      <form>
        <input type="text" placeholder="Họ & Tên" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Số điện thoại" />
        <div>
          <select>
            <option value="-1" hidden="">Chọn Tỉnh/Thành phố</option>
          </select>
          <select>
            <option value="-1" hidden="">Chọn Quận/Huyện</option>
          </select>
          <select>
            <option value="-1" hidden="">Chọn Phường/Xã</option>
          </select>
        </div>
        <input type="text" placeholder="Số nhà tên đường..." />
      </form>
    `;
    return div;
  },
  checkout__method() {
    let div = document.createElement('div');
    div.className = 'checkout__method';
    div.innerHTML = `
    <h1>Phương thức thanh toán</h1>
    <form>
     <input id="card_payment" type="radio" name="method" hidden />
      <label for="card_payment">
        <p>Thanh toán thẻ (ATM, Visa , MasterCard)</p>
      </label>
      <input id="cod_payment" type="radio" name="method" hidden />
      <label for="cod_payment">
        <p>Thanh toán khi giao hàng (COD)</p>
      </label>
    </form>
    `;
    return div;
  },
  checkout__cart() {
    let div = document.createElement('div');
    div.className = 'checkout__cart';
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
              <div class="add__product">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="discount__code">
          <input type="text" placeholder="Mã giảm giá..." />
          <button>Áp dụng</button>
        </div>
        <div class="total__cart">
          <p>Tổng:</p>
          <strong>499.000 <sup>đ</sup></strong>
        </div>
        <button>Hoàn tất đơn hàng</button>

    `;
    return div;
  }
}