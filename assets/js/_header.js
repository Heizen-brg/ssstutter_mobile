import { __icons } from './share/_icons.js';
import { __render } from './main.js';

export const __templates_header = {
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
      <div data-action="for_him"><a href="/">nam</a></div>
      <div data-action="for_her"><a href="/">nữ</a></div>
    `;
    let menu = div.querySelectorAll('[data-action]');
    menu.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        menu.forEach(item => item.classList.remove('active'));
        let megamenu__container = document.querySelector('.megamenu__container');
        item.classList.add('active');
        megamenu__container.classList.add('active');
      })
    })
    return div;
  },

  right(params = {}) {
    let div = document.createElement('div');
    div.className = 'nav__right--items';
    div.innerHTML = `
      <div>${__icons.search}</div>
      <div>${__icons.user}</div>
      <div>${__icons.cart}</div>
    `;
    return div
  },

  megamenu(params = {}) {
    let div = document.createElement('div');
    div.className = 'megamenu__container';
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
    div.innerHTML = html`
      <div>
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <div class="options__block"></div>
    `;
    return div;
  }
};

