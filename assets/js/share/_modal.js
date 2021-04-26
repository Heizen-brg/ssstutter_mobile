import { __render } from "../main.js";

const __templates_modal = {
  modal(params = {}) {
    let main_body = document.querySelector('#root');
    let div = document.createElement('div');
    div.className = 'modal__overlay';
    let content = document.createElement('div');
    content.className = 'modal__content';
    if (params.content) __render.draw_in_block({
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


}