import { __megamenu } from './share/_data.js';
import { __templates_header } from './_header.js';
import { __templates_home } from './_homepage.js';
import { __templates_footer } from './_footer.js';




export const __render = {
  build(blocks) {
    let app = document.getElementById('root');
    app.innerHTML = '';
    blocks.map(block => {
      if (!block) return;
      app.appendChild(block);
    })
  },
  build_in_block(params = {}) {
    if (!params.block || !params.target) return false;
    try {
      params.block.appendChild(params.target);
    } catch (e) {
      return false;
    }
  },


  homepage() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search(),
      __templates_header.cart(),
      __templates_home.banner(),
      __templates_home.categories(),
      __templates_home.new_arrivals(),
      __templates_home.stylepick(),
      __templates_home.weekly(),
      __templates_home.blog(),
      __templates_home.lookbook(),
      __templates_footer.footer(),
    ]
    this.build(blocks);
  }
};

__render.homepage();
