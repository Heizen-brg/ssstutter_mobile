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
          ${params.logo || __icons.ssstutter}
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

  left() {
    let div = document.createElement('div');
    div.className = 'nav__left--items';
    div.innerHTML = `
    left
    `;
    return div;
  },
  right() {
    let div = document.createElement('div');
    div.className = 'nav__right--items';
    div.innerHTML = `
    right
    `;
    return div
  }


};
