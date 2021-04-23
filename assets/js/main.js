import { __megamenu } from './share/_data.js';
import { __templates_header } from './_header.js';
import { __templates_home } from './_homepage.js';
import { __templates_categories } from './_categories.js';
import { __templates_product } from './_product.js';
import { __templates_checkout } from './_checkout.js';
import { __templates_blog } from './_blog.js';
import { __template_article } from './_article.js';
import { __templates_footer } from './_footer.js';
import { __templates } from './share/_components.js';
import { __template_search } from "./_search.js";


const __requests = (params, callback, by_pass_error = false) => {
  let header = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, params.header || {})

  let options = {
    method: params.method || 'GET',
    headers: header,
  }
  if (options.method !== 'GET') options.body = params.body;
  return fetch(params.url, options).then((response) => {
    if (response.status >= 400 && response.status < 600) {
      // __push_notification('fail', __lang[languages].system_error);
      // __templates.loader('hide');
      return Promise.resolve(false);
    }
    if (response.headers.get("content-type").indexOf("application/json") !== -1) {
      response = response.json();
      if (typeof response == ' string') response = JSON.parse(response);
    }
    else response = response.text();
    return response;
  }).then(data => {
    // if ((data.success == 0 || data.success == false) && by_pass_error == false) {
    //   if (data.error) __push_notification('fail', __lang[languages][data.error]);
    //   if (data.action) return Promise.resolve(data);
    //   return Promise.resolve(false);
    // }
    if (callback) callback(data);
    return Promise.resolve(data);
  });
};
export { __requests }




let mobile = window.innerWidth <= 425;
let tablet = window.innerWidth <= 768 && window.innerWidth > 425;
let desktop = window.innerWidth > 780;
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
    let banner = mobile ? __templates_home.mobile_banner() : __templates_home.banner();
    let new_arrivals = mobile ? __templates_home.mobile_new_arrivals() : __templates_home.new_arrivals();

    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product()
      }),
      __templates_header.cart(),
      banner,
      __templates_home.categories(),
      new_arrivals,
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
      __templates_header.search({
        option: __templates.related_product()
      }),
      __templates_header.cart(),
      __templates_categories.infomation(),
      __templates_categories.categories(),
      __templates_categories.products(),
      __templates_categories.filter(),
      __templates_footer.footer(),
    ];
    this.build('categories', blocks);
  },

  product_page() {
    __templates.api_loading('show');
    __requests({
      method: 'GET',
      url: 'https://leanservices.work/pd/master/WH0JpLd8SHXH257V8m31HGXY1ZuWvG37 ',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      }
    }, (res) => {
      __templates.api_loading('hide');
      let product = res.data
      console.log(product);
      let blocks = [
        __templates_header.header({
          left: __templates_header.left(),
          right: __templates_header.right(),
        }),
        __templates_header.megamenu(),
        __templates_header.search({
          option: __templates.related_product(product.master)
        }),
        __templates_header.cart(),
        __templates_product.product_gallery(product.master),
        __templates_product.model_info(),
        __templates_product.flatlay_view(product.master),
        __templates_product.attributes(),
        __templates_product.variation(product),
        __templates.related_product(product.master.color[0].value),
        __templates_footer.footer(),
      ];
      this.build('product__page', blocks);
    });
  },
  checkout_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product()
      }),
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
      __templates_header.search({
        option: __templates.related_product()
      }),
      __templates_header.cart(),
      __templates_blog.blog_highlight(),
      __templates_blog.blog_categories(),
      __templates_blog.blog_latest(),
      __templates_footer.footer(),
    ];
    this.build('blog__page', blocks);
  },
  article_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product()
      }),
      __templates_header.cart(),
      __template_article.related(),
      __template_article.content(),
      __templates_footer.footer(),
    ];
    this.build('article__page', blocks);
  },
  campaign_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product()
      }),
      __templates_header.cart(),
      __templates.banner(),
      __templates.gender_filter(),
      __templates_categories.filter(),
      __templates_categories.products(),
      __templates_footer.footer(),
    ];
    this.build('campaign__page', blocks);
  },
  search_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.cart(),
      __template_search.input(),
      __templates.gender_filter(),
      __templates_categories.filter(),
      __templates_categories.products(),
      __templates_footer.footer(),
    ];
    this.build('search__page', blocks);
  },
};

// __render.homepage();
__render.categories_page();





