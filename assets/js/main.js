import { __megamenu } from './share/_data.js';
import { __templates_header } from './_header.js';
import { __templates_home } from './_homepage.js';
import { __templates_categories } from './_categories.js';
import { __templates_product } from './_product.js';
import { __templates_checkout } from './_checkout.js';
import { __templates_blog } from './_blog.js';
import { __templates_footer } from './_footer.js';




export const __render = {
  build(page, blocks) {
    let app = document.getElementById('root');
    app.className = page;
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
    ];
    this.build('home', blocks);
  },

  categories_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search(),
      __templates_header.cart(),
      __template_categories.infomation(),
      __template_categories.categories(),
      __template_categories.filter(),
      __template_categories.products(),
      __templates_footer.footer(),
    ];
    this.build('categories', blocks);
  },

  product_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search(),
      __templates_header.cart(),
      __templates_product.product_gallery(),
      __templates_product.model_info(),
      __templates_product.flatlay_view(),
      __templates_product.attributes(),
      __templates_product.variation(),
      __templates_footer.footer(),
    ];
    this.build('product__page', blocks);
  },
  checkout_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search(),
      __templates_header.cart(),
      __templates_checkout.checkout_form(),
      __templates_checkout.checkout__method(),
      __templates_checkout.checkout__cart(),
      __templates_footer.footer(),
    ];
    this.build('checkout__page', blocks);
  },
  blog_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search(),
      __templates_header.cart(),
      __templates_blog.blog_highlight(),
      __templates_blog.blog_categories(),
      __templates_blog.blog_latest(),
      __templates_footer.footer(),
    ];
    this.build('blog__page', blocks);
  },
};

// __render.homepage();
__render.blog_page();
