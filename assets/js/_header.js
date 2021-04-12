import { __icons } from './share/_icons.js';
import { __render } from './main.js';

let mobile = window.innerWidth <= 425;
let tablet = window.innerWidth <= 768 && window.innerWidth > 425;
let desktop = window.innerWidth > 780;

let close_menu = () => {
  let close = document.querySelectorAll('.close');
  close.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('sdsd');
      let menu = document.querySelectorAll('[data-menu]');
      menu.forEach(block => {
        block.classList.remove('active');
      });
    })
  })
}

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
      <div class="side__nav" data-menu="side_nav">
        <div class="side__nav--title">
          <a href="/"><img src="https://sss.leanservices.work/wp-content/uploads/2021/03/LOGO-SSSTUTTER-NEW.png"/>
          </a>
          <div class="close">${__icons.close}</div>
        </div>
        <ul>
          <li data-megamenu="toggle" class=""><a href="javascript:" data-src="/c/for-him">Nam</a>
            <ul class="side__items">
              <li><a href="https://sss.leanservices.work/c/for-him/so-mi-ao-kieu/">sơ mi &amp; áo kiểu</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/ao-thun/">áo thun</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/quan-for-him/">quần</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/len-det/">len dệt</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/phu-kien-for-him/">phụ kiện</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/ao-blazer-ao-khoac/">áo blazer &amp; áo khoác</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/quan-bo/">quần bò</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/quan-short-for-him/">quần short</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/giay-for-him/">giày</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/tui-vi/">túi &amp; ví</a></li>
              <li><a href="https://sss.leanservices.work/c/for-him/hoodies-sweatshirt/">hoodies &amp; sweatshirt</a></li>
            </ul>
          </li>
          <li data-megamenu="toggle" class=""><a href="javascript:" data-src="/c/for-her">Nữ</a>
            <ul class="side__items">
              <li><a href="https://sss.leanservices.work/c/for-her/so-mi-ao-kieu-for-her/">sơ mi &amp; áo kiểu</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/ao-blazer-ao-khoac-for-her/">áo blazer &amp; áo khoác</a>
              </li>
              <li><a href="https://sss.leanservices.work/c/for-her/dam-jumpsuit/">đầm &amp; jumpsuit</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/len-det-for-her/">len &amp; dệt</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/quan-for-her-2/">quần</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/quan-bo-for-her/">quần bò</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/chan-vay/">chân váy</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/ao-thun-for-her/">áo thun</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/quan-short-for-her/">quần short</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/tui-vi-for-her/">túi &amp; ví</a></li>
              <li><a href="https://sss.leanservices.work/c/for-her/hoodies-sweatshirt-for-her/">hoodies &amp; sweatshirt</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="side__nav--community">
          <h1>Community</h1>
          <li><a href="https://www.facebook.com/ssstuttershop/posts/2190399631090711">What's new</a></li>
          <li><a href="/new-collection/">Lookbook</a></li>
          <li><a href="https://www.facebook.com/ssstuttershop/" target="_blank">Fanpage</a></li>
          <li><a href="/campaign/gia-moi-2021/">Event</a></li>
        </ul>
        <div class="side__nav--footer">
          <h1>SSStutter - LEANOW JOINT STOCK COMPANY®</h1>
        </div>
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
    header.querySelector('.close').addEventListener('click', () => { this.hide_menu() });
    return header
  },

  left(params = {}) {
    let div = document.createElement('div');
    div.className = 'nav__left--items';
    if (desktop || tablet) {
      div.innerHTML = `
      <div data-active="" data-action="megamenu"><a href="/c/for-him">nam</a></div>
      <div data-active="" data-action="megamenu"><a href="//c/for-her">nữ</a></div>
    `;
    } else {
      div.innerHTML = `
      <div data-active="" data-action="side_nav">${__icons.nav}</div>
      <div data-active="" data-action="search">${__icons.search}</div>
    `;
    }
    let menu = div.querySelectorAll('[data-action]');
    menu.forEach(item => {
      if (desktop || tablet) {
        item.addEventListener('mouseenter', (e) => {
          this.hide_menu();
          this.show_menu(item);
        })
      } else {
        item.addEventListener('click', (e) => {
          this.hide_menu();
          this.show_menu(item);
        })
      }
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

