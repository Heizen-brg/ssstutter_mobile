import { __icons } from "./share/_icons.js";
import { __categories, __products } from "./share/_data.js";
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
    <ul data-cate="35">
      ${__templates.busy_loading('show')}
    </ul>
    `;
    let product_container = div.querySelector('ul');
    __init_product_list(product_container, __init_filter(window.data_filter, product_container));
    return div;
  },
  filter(params = {}) {
    let product_container = document.querySelector('categories__products > ul')
    console.log(product_container);
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
            <li data-name="pa_color" data-color="322,321,320" title="trắng">
              <label>
                <input type="checkbox">
                <span>trắng</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="319,318,126" title="đen">
              <label>
                <input type="checkbox">
                <span>đen</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="317,316,315,314,313,312,311,310,309,308,307,305,304" title="xám">
              <label>
                <input type="checkbox">
                <span>xám</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="299,298,297,295" title="nâu">
              <label>
                <input type="checkbox">
                <span>nâu</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="303,294,300,302,301,125" title="be">
              <label>
                <input type="checkbox">
                <span>be</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="290,289,286,285,293,292,291,288" title="tím">
              <label>
                <input type="checkbox">
                <span>tím</span>
              </label>
            </li>
            <li data-name="pa_color"
              data-color="285,284,283,282,281,280,279,278,277,124,276,275,274,273,272,271,270,269,268,267,266,265,264,263,262,261,260,259,258,257,256,255,254,253,252,251,250,249,248,247,246,245,244,243"
              title="xanh biển">
              <label>
                <input type="checkbox">
                <span>xanh biển</span>
              </label>
            </li>
            <li data-name="pa_color"
              data-color="242,241,240,239,238,237,236,235,234,128,233,232,231,230,229,228,227,226,225,224,223,222,221"
              title="xanh lục">
              <label>
                <input type="checkbox">
                <span>xanh lục</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="210,209,208,207,206,203,202,220,218,217,216,215,214,213,212,211,204"
              title="vàng">
              <label>
                <input type="checkbox">
                <span>vàng</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="188,186,183,185,187,184" title="đỏ">
              <label>
                <input type="checkbox">
                <span>đỏ</span>
              </label>
            </li>
            <li data-name="pa_color" data-color="201,200,199,197,196,195,194,192,191,190,189,198,193" title="cam">
              <label>
                <input type="checkbox">
                <span>cam</span>
              </label>
            </li>
          </ul>
        </li>
        <li class="size">
          <h4>
            Size quần/áo
            ${__icons.right}
          </h4>
          <ul>
            <li data-name="pa_size" data-size="00" data-term-id="72">
              <label>
                <input type="checkbox"><span>0</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="1" data-term-id="73">
              <label>
                <input type="checkbox"><span>1</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="2" data-term-id="74">
              <label>
                <input type="checkbox"><span>2</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="3" data-term-id="75">
              <label>
                <input type="checkbox"><span>3</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="4" data-term-id="76">
              <label>
                <input type="checkbox"><span>4</span>
              </label>
            </li>
          </ul>
        </li>
        <li class="size">
          <h4>Kích cỡ quần jeans
            ${__icons.right}
          </h4>
          <ul>
            <li data-name="pa_size" data-size="29" data-term-id="338">
              <label>
                <input type="checkbox"><span>29</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="30" data-term-id="337">
              <label>
                <input type="checkbox"><span>30</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="31" data-term-id="336"><label>
                <input type="checkbox"><span>31</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="32" data-term-id="335"><label>
                <input type="checkbox"><span>32</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="33" data-term-id="324"><label>
                <input type="checkbox"><span>33</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="34" data-term-id="804"><label>
                <input type="checkbox"><span>34</span>
              </label>
            </li>
          </ul>
        </li>
        <li class="size">
          <h4>Kích cỡ giày
            ${__icons.right}
          </h4>
          <ul>
            <li data-name="pa_size" data-size="39" data-term-id="334"><label>
                <input type="checkbox"><span>39</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="40" data-term-id="333"><label>
                <input type="checkbox"><span>40</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="41" data-term-id="332"><label>
                <input type="checkbox"><span>41</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="42" data-term-id="331"><label>
                <input type="checkbox"><span>42</span>
              </label>
            </li>
            <li data-name="pa_size" data-size="43" data-term-id="330"><label>
                <input type="checkbox"><span>43</span>
              </label>
            </li>
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
    let color_filter_list = div.querySelectorAll('[data-name="pa_color"]')
    color_filter_list.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!btn.dataset.name) return false;
        let color_attr = btn.dataset.color;
        let btn_input = btn.querySelector('input');
        btn_input.checked = true;
        if (btn.classList.contains('active')) {
          if (window.data_filter.q[0].data) {
            let d = window.data_filter.q[0].data;
            window.data_filter.q[0].data = __remove_item_in_array(color_attr, d);
            btn_input.checked = false;
          }
          btn.classList.remove('active');
        } else {
          btn.classList.add('active');
          if (color_attr) {
            window.data_filter.q[0].data.push(color_attr);
            btn_input.checked = true
          }
        }
        __init_product_list(product_container, __init_filter(window.data_filter, product_container));

      })
    });
    let size_filter_list = div.querySelectorAll('[data-name="pa_size"]')
    size_filter_list.forEach(btn => {
      btn.addEventListener('click', (e) => {
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
        __init_product_list(product_container, __init_filter(window.data_filter, product_container));

      })
    })

    return div;
  },
}

