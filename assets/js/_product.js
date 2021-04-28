import { __currency_format } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";
let user_selection = [];
export const __templates_product = {
  product_gallery(params = {}, color_id) {
    let gallery = params.extensions.media;
    let color = color_id ? color_id : params.color[0].value;
    let div = document.createElement('div');
    div.className = 'gallery';
    div.innerHTML = `
    <ul>
      ${(gallery[`color_${color}_gallery`]).map(img => `<li style="background-image:url(https://leanservices.work/pd/static/${img.o})"></li>`).join('')}
    </ul>
    `;
    return div;
  },
  model_info(params = {}) {
    let div = document.createElement('div');
    div.className = 'model';
    div.innerHTML = `
      <h1>model info</h1>
      <div>
        <ul>
          <li>178 cm , 69 kg</li>
          <li>Chiều dài vai : 45 cm</li>
          <li>Vòng ngực: 90 cm</li>
          <li>Chiều dài chân: 101 cm</li>
          <li>Size Áo : 2 (L)</li>
          <li>Size Quần : 3 (XL)</li>
        </ul>
        <div>
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/WideBlazer-14.jpg)"></span>
        </div>
      </div>
    `;
    return div;
  },
  flatlay_view(params = {}) {
    let div = document.createElement('div');
    div.className = 'flatlay';
    div.innerHTML = `
      <h1>Chi tiết</h1>
        <ul>
        </ul>
      </div>
    `;
    let init_flatlay_img = () => {
      let media = params.extensions.media;
      let colors_arr = params.color;
      let color_value = colors_arr.map(color => {
        return {
          id: color.value,
          photo: media[`color_${color.value}_thumbnail`]
        }
      });
      color_value.map((item, index) => {
        let flat_img = document.createElement('li');
        flat_img.style.backgroundImage = `url(https://leanservices.work/pd/static/${item.photo == null ? 'no_image.png' : item.photo.o})`
        let color_variation = div.querySelector('.flatlay > ul');
        color_variation.appendChild(flat_img);
        return flat_img;
      });
    };
    init_flatlay_img();
    return div;
  },
  attributes(params = {}) {
    let div = document.createElement('div');
    div.className = 'attributes';
    div.innerHTML = `
    <h1>Thông số sản phẩm</h1>
    <table>
      <tbody>
        <tr>
          <th>Độ vừa vặn</th>
          <td>
            <label for="Rất bó">
              <input id="Rất bó" type="checkbox" readonly="readonly" hidden="">
              <p>Rất bó</p>
            </label>
          </td>
          <td>
            <label for="Bó">
              <input id="Bó" type="checkbox" readonly="readonly" hidden="">
              <p>Bó</p>
            </label>
          </td>
          <td>
            <label for="Vừa vặn">
              <input id="Vừa vặn" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa vặn</p>
            </label>
          </td>
          <td>
            <label for="Xuông">
              <input id="Xuông" type="checkbox" readonly="readonly" hidden="">
              <p>Xuông</p>
            </label>
          </td>
          <td>
            <label for="Rộng">
              <input id="Rộng" type="checkbox" readonly="readonly" hidden="">
              <p>Rộng</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ co giãn</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Vừa phải">
              <input id="Vừa phải" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa phải</p>
            </label>
          </td>
          <td>
            <label for="Nhiều">
              <input id="Nhiều" type="checkbox" readonly="readonly" hidden="">
              <p>Nhiều</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ trong suốt</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Vừa phải">
              <input id="Vừa phải" type="checkbox" readonly="readonly" hidden="">
              <p>Vừa phải</p>
            </label>
          </td>
          <td>
            <label for="Nhiều">
              <input id="Nhiều" type="checkbox" readonly="readonly" hidden="">
              <p>Nhiều</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Độ dày</th>
          <td>
            <label for="Mỏng">
              <input id="Mỏng" type="checkbox" readonly="readonly" hidden="">
              <p>Mỏng</p>
            </label>
          </td>
          <td>
            <label for="Dày vừa">
              <input id="Dày vừa" type="checkbox" readonly="readonly" hidden="">
              <p>Dày vừa</p>
            </label>
          </td>
          <td>
            <label for="Dày">
              <input id="Dày" type="checkbox" readonly="readonly" hidden="">
              <p>Dày</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Lớp lót</th>
          <td>
            <label for="Không">
              <input id="Không" type="checkbox" readonly="readonly" hidden="">
              <p>Không</p>
            </label>
          </td>
          <td>
            <label for="Một phần">
              <input id="Một phần" type="checkbox" readonly="readonly" hidden="">
              <p>Một phần</p>
            </label>
          </td>
          <td>
            <label for="Toàn bộ">
              <input id="Toàn bộ" type="checkbox" readonly="readonly" hidden="">
              <p>Toàn bộ</p>
            </label>
          </td>
        </tr>
        <tr>
          <th>Phù hợp mùa</th>
          <td>
            <label for="Xuân">
              <input id="Xuân" type="checkbox" readonly="readonly" hidden="">
              <p>Xuân</p>
            </label>
          </td>
          <td>
            <label for="Hạ">
              <input id="Hạ" type="checkbox" readonly="readonly" hidden="">
              <p>Hạ</p>
            </label>
          </td>
          <td>
            <label for="Thu">
              <input id="Thu" type="checkbox" readonly="readonly" hidden="">
              <p>Thu</p>
            </label>
          </td>
          <td>
            <label for="Đông">
              <input id="Đông" type="checkbox" readonly="readonly" hidden="">
              <p>Đông</p>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  
    `;
    return div;
  },
  variation(params = {}) {
    let info = params.master;
    let div = document.createElement('div');
    div.className = 'variation';
    div.innerHTML = `
      <div>
        <h1 class="name">${info.name}</h1>
        <div class="price">
          <p>${__currency_format(info.price)}</p>
        </div>
        <div class="color">
          <p>chọn màu</p>
          <ul>
           
          </ul>
        </div>
        <div class="size">
          <p>chọn size</p>
          <ul>
          ${info.size.sort((a, b) => a - b).map((i, index) => ` <li class=" size__variation ${index == 0 ? 'active' : ''} " data-value="${i}"><span>${i}</span></li>`).join('')}
          </ul>
        </div>
        <button class="add">Thêm vào giỏ hàng</button>
        <div class="interact">
          <div>
            ${__icons.wishlist}
            <p>Yêu thích</p>
          </div>
          <div class="store__check" data-action="store_check">
            ${__icons.store}
            <p>Cửa hàng còn hàng</p>
          </div>
        </div>
        <ul class="guide">
          <li data-action="size_check">Hướng dẫn chọn size ${__icons.right}</li>
          <li  data-action="refund_policy">Hướng dẫn đổi trả ${__icons.right}</li>
        </ul>
      </div>
    `;
    user_selection.push({ id: info.id, color: info.color[0].value, size: info.size[0] });
    let init_flatlay_img = (value) => {
      let media = params.master.extensions.media;
      let colors_arr = params.master.color;
      let color_value = colors_arr.map(color => {
        return {
          id: color.value,
          photo: media[`color_${color.value}_thumbnail`]
        }
      });
      color_value.map((item, index) => {
        let flat_color = document.createElement('li');
        flat_color.className = 'color__variation';
        index == 0 ? flat_color.classList.add('active') : false;
        flat_color.dataset.value = item.id;
        flat_color.dataset.variation = JSON.stringify(info);
        flat_color.style.backgroundImage = `url(https://leanservices.work/pd/static/${item.photo == null ? 'no_image.png' : item.photo.o})`
        let color_variation = div.querySelector('.color > ul');
        color_variation.appendChild(flat_color);
        return flat_color;
      });
    };
    let on_change_variation = () => {
      let color_variation = div.querySelectorAll('.color__variation');
      color_variation.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          color_variation.forEach(btn => btn.classList.remove('active'));
          btn.classList.add('active')
          document.querySelector('.product__page .gallery').innerHTML = '';
          this.product_gallery(JSON.parse(btn.dataset.variation), btn.dataset.value)
          user_selection[0].color = btn.dataset.value;

        })
      })
      let size_variation = div.querySelectorAll('.size__variation');
      size_variation.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          size_variation.forEach(btn => btn.classList.remove('active'));
          btn.classList.add('active')
          user_selection[0].size = btn.dataset.value;
        })
      })
    };
    let init_add_to_cart = (params) => {
      let to_cart_btn = div.querySelector('.add');
      to_cart_btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(user_selection);
        let cart_menu = document.querySelector('[data-menu="cart"]');
        cart_menu.classList.add('active');
      })
    }
    let triggers = div.querySelectorAll('[data-action]')
    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        __templates_modal.overlay({ content: __templates_modal[btn.dataset.action]() })
      })
    })
    init_flatlay_img();
    on_change_variation();
    init_add_to_cart();
    return div
  }
}