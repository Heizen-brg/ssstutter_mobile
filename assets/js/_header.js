import { __icons } from './share/_icons.js';
import { __render } from './main.js';

export const __templates_header = {
  hide_menu() {
    let menu = document.querySelectorAll('[data-menu]');
    let triggers = document.querySelectorAll('[data-active]')
    triggers.forEach(item => item.classList.remove('active'));
    menu.forEach(block => {
      block.classList.remove('active');
    });
  },
  show_menu(item) {
    item.classList.remove('fade-out');
    item.classList.add('active');
    let menu = document.querySelectorAll('[data-menu]');
    menu.forEach(container => {
      container.dataset.menu == item.dataset.action ? container.classList.add('active') : container.classList.remove('active');
    })
  },
  header(params = {}) {
    let header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <div class="nav">
        <div class="nav__left"></div>
        <div class="nav__logo">
          <a href="/">
            ${params.logo || __icons.ssstutter}
          </a>
        </div>
        <div class="nav__right"></div>
      </div>
    `;
    ['left', 'right'].forEach(pos => {
      let block = header.querySelector(`.nav__${pos}`);
      if (params[pos]) {
        __render.build_in_block({
          block: block,
          target: params[pos]
        })
      } else block.innerHTML = params[pos];
    })
    return header
  },

  left(params = {}) {
    let div = document.createElement('div');
    div.className = 'nav__left--items';
    div.innerHTML = `
      <div data-active="" data-action="megamenu"><a href="/c/for-him">nam</a></div>
      <div data-active="" data-action="megamenu"><a href="//c/for-her">nữ</a></div>
    `;
    let menu = div.querySelectorAll('[data-action]');
    menu.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        this.hide_menu();
        this.show_menu(item);
      })
    })
    return div;
  },

  right(params = {}) {
    let div = document.createElement('div');
    div.className = 'nav__right--items';
    div.innerHTML = `
      <div data-active="" data-action="search">${__icons.search}</div>
      <div data-active="" data-action="">${__icons.user}</div>
      <div data-active="" data-action="cart">${__icons.cart}</div>
    `;
    let triggers = div.querySelectorAll('[data-action]');
    triggers.forEach(item => {
      item.addEventListener('click', (e) => {
        if (item.classList.contains('active')) {
          this.hide_menu();
        } else {
          this.hide_menu();
          this.show_menu(item);
        }
      })
    })
    return div;
  },

  megamenu(params = {}) {
    let div = document.createElement('div');
    div.className = 'megamenu__container';
    div.dataset.menu = 'megamenu';
    div.innerHTML = `
    <div>
      <h1 class="title">danh mục</h1>
      <ul class="megamenu__categories">
        ${(params.categories || []).map(i => `<li><a href="${i.link}">${i.text}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h1 class="title">new arrivals</h1>
      <ul class="megamenu__newarrivals">
        ${(params.new_arrivals || []).map(i => `<li><a href="${i.link}">${i.text}</a></li>`).join('')}
      </ul>
    </div>
    <ul class="megamenu__banner">
      <li><a style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/megahim.jpg)" href=""></a></li>
      <li><a style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/megaher.jpg)" href=""></a></li>
    </ul>
    `;
    div.addEventListener('mouseleave', (e) => {
      let menu = document.querySelectorAll('[data-action]')
      menu.forEach(item => {
        item.classList.remove('active');
      })
      div.classList.remove('active');
    })
    return div;
  },

  search(params = {}) {
    let div = document.createElement('div');
    div.className = 'search__container';
    div.dataset.menu = 'search';
    div.innerHTML = `
      <div class="search__input">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <div class="options__block"></div>
    `;
    let block = div.querySelector(`.options__block`);
    __render.build_in_block({
      block: block,
      target: params.option
    })
    return div;
  },
  cart(params = {}) {
    let div = document.createElement('div');
    div.className = 'cart__container';
    div.dataset.menu = 'cart';
    div.innerHTML = `
      <div class="mini__cart">
        <ul>
          <li>
            <span class="product__thumbnail" style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/RetroDenimShirt_Dam_FL_1.jpg)"></span>
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
        <div class="cart__total">
          <span>Tổng tiền: </span>
          <strong>499.000 VND</strong>
        </div>
        <div class="cart__btn">
          <button data-action="close">tiếp tục mua sắm</button>
          <button class="checkout__btn">thanh toán</button>
        </div>
      </div>
    `;
    let close_btn = div.querySelector('[data-action="close"]');
    close_btn.addEventListener('click', () => {
      this.hide_menu();
    })
    return div;
  }
};

