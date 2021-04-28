import { __icons } from "./share/_icons.js";
import { __categories, __size_arr } from "./share/_data.js";
import { __templates } from "./share/_components.js";
import { __render, __requests } from "./main.js";
import { __remove_item_in_array, __init_filter, __init_product_list } from "./share/_function.js";

window.data_filter = {
  existed_ids: [],
  q: [{
    tax: 'color',
    data: []
  }, {
    tax: 'size',
    data: []
  }],
  price: null,
}

export const __templates_categories = {
  infomation(params = {}) {
    let section = document.createElement('section');
    section.className = 'categories__info';
    section.innerHTML = `
      <h1 class="info__title">category</h1>
      <p>Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của mình.
      </p>
    `;
    return section;
  },
  categories(params = {}) {
    let section = document.createElement('section');
    section.className = 'categories__list';
    section.innerHTML = `
      <ul>
        ${(__categories || []).map(item => `<li data-cate=""><p>${item}</p></li>`).join('')}
      </ul>
    `;
    return section;
  },

  products(params = {}) {
    let div = document.createElement('div');
    div.className = 'categories__products';
    div.innerHTML = ` 
    <ul data-cate="3vvRIM">
      ${__templates.busy_loading('show')}
    </ul>
    `;
    let product_container = div.querySelector('ul');
    __init_product_list({
      container: product_container,
      query: __init_filter(window.data_filter, product_container)
    }); return div;
  },
  filter(params = {}) {
    let div = document.createElement('div');
    div.className = 'categories__filter';
    div.innerHTML = `
    <div data-toggle="filter" class="filter__toggle">${__icons.filter} FILTER</div>
    <div class="filter__list">
      <ul class="filter__list--wrapper">
        <li class="color">
          <h4>Màu sắc
            ${__icons.right}
          </h4>
          <ul class="color__list">
          </ul>
        </li>
        <li class="size">
          <h4>
            Size quần/áo
            ${__icons.right}
          </h4>
          <ul>
           ${__size_arr[0].size.map(item => `
              <li data-name="pa_size" data-size="${item}">
                <label>
                  <input type="checkbox"><span>${item}</span>
                </label>
              </li>
           `).join('')}
          </ul>
        </li>
        <li class="size">
          <h4>Kích cỡ quần jeans
            ${__icons.right}
          </h4>
          <ul>
          ${__size_arr[1].size.map(item => `
          <li data-name="pa_size" data-size="${item}">
            <label>
              <input type="checkbox"><span>${item}</span>
            </label>
          </li>
       `).join('')}
          </ul>
        </li>
        <li class="size">
          <h4>Kích cỡ giày
            ${__icons.right}
          </h4>
          <ul>
          ${__size_arr[2].size.map(item => `
          <li data-name="pa_size" data-size="${item}">
            <label>
              <input type="checkbox"><span>${item}</span>
            </label>
          </li>
       `).join('')}
          </ul>
        </li>
        <li class="sort">
          <h4>Sắp xếp
            ${__icons.right}
          </h4>
          <ul>
            <li>
              <label for="up_price">
                <input id="up_price" name="filter_price" value="asc" type="radio">
                <span>Giá tăng dần</span>
              </label>
            </li>
            <li>
              <label for="down_price">
                <input id="down_price" name="filter_price" value="desc" type="radio">
                <span>Giá giảm dần</span>
              </label>
            </li>
          </ul>
        </li>
      </ul>
      <div class="filter__action">
        <button>Áp dụng</button>
        <button data-toggle="filter">Trở lại</button>
      </div>
    </div>
    `;
    __requests({
      method: 'GET',
      url: `https://ssstutter.com/services/color-group`
    }, (res) => {
      let colors_arr = res.data;
      console.log('colors_arr: ', colors_arr);
      colors_arr.map(color => {
        let li = document.createElement('li');
        li.dataset.name = 'pa_color';
        li.dataset.color = color.color_ids;
        li.innerHTML = `
        <label>
          <input type="checkbox">
          <span>${color.name}</span>
        </label>
        `;
        let color_list = div.querySelector('.color__list');
        color_list.appendChild(li);
        li.addEventListener('click', (e) => {
          let product_container = document.querySelector('.categories__products > ul')
          e.preventDefault();
          if (!li.dataset.name) return false;
          let color_attr = li.dataset.color;
          let btn_input = li.querySelector('input');
          btn_input.checked = true;
          if (li.classList.contains('active')) {
            if (window.data_filter.q[0].data) {
              let d = window.data_filter.q[0].data;
              window.data_filter.q[0].data = __remove_item_in_array(color_attr, d);
              btn_input.checked = false;
            }
            li.classList.remove('active');
          } else {
            li.classList.add('active');
            if (color_attr) {
              window.data_filter.q[0].data.push(color_attr);
              btn_input.checked = true
            }
          }
          __init_product_list({
            infinity: false,
            container: product_container,
            query: __init_filter(window.data_filter, product_container)
          });
        })
        return li;
      });
    })

    let filter_toggle = div.querySelectorAll('[data-toggle="filter"')
    filter_toggle.forEach(toggle => {
      toggle.addEventListener('click', () => {
        if (div.querySelector('.filter__list').classList.contains('active')) {
          div.querySelector('.filter__list').classList.remove('active');
        } else {
          div.querySelector('.filter__list').classList.add('active');
        }
      })
    })
    let filter_label = div.querySelectorAll('.filter__list--wrapper > li');
    filter_label.forEach(label => {
      let trigger = label.querySelector('h4');
      let ul = label.querySelector('ul');
      trigger.addEventListener('click', () => {
        if (ul.classList.contains('active')) {
          ul.classList.remove('active');
        } else {
          ul.classList.add('active');
        }
      })
    })

    let size_filter_list = div.querySelectorAll('[data-name="pa_size"]')
    size_filter_list.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let product_container = document.querySelector('.categories__products > ul')
        e.preventDefault();
        if (!btn.dataset.name) return false;
        let size_attr = btn.dataset.size;
        let btn_input = btn.querySelector('input');
        btn_input.checked = true;
        if (btn.classList.contains('active')) {
          if (window.data_filter.q[1].data) {
            let d = window.data_filter.q[1].data;
            window.data_filter.q[1].data = __remove_item_in_array(size_attr, d);
            btn_input.checked = false;
          }
          btn.classList.remove('active');
        } else {
          btn.classList.add('active');
          if (size_attr) {
            window.data_filter.q[1].data.push(size_attr);
            btn_input.checked = true
          }
        }
        __init_product_list({
          infinity: false,
          container: product_container,
          query: __init_filter(window.data_filter, product_container)
        });
      })
    })

    return div;
  },
}

