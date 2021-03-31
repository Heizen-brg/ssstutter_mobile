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
      })
    ];
    this.build(blocks);
  }
};

__render.homepage();
