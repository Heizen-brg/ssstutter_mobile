import { __templates_header } from "./_header.js";
import { __templates_home } from "./_homepage.js";
import { __templates_categories } from "./_categories.js";
import { __templates_product } from "./_product.js";
import { __templates_checkout } from "./_checkout.js";
import { __templates_blog } from "./_blog.js";
import { __templates_article } from "./_article.js";
import { __templates_footer } from "./_footer.js";
import { __templates } from "./share/_components.js";
import { __templates_search } from "./_search.js";
import { __templates_order } from "./_order.js";
import { __templates_address } from "./_address.js";
import { __push_notification } from "./share/_function.js";
import { __templates_thankyou } from "./_thankyou.js";
import { __templates_canceled } from "./_canceled.js";
import { __templates_campaign } from "./_campaign.js";
import list_campaign_winter from "./list_campaign/list_campaign_winter.js";
import flash_sale_page from "./list_campaign/flash_sale.js";

export const __requests = (params, callback, callback_error = false) => {
  let header = params.header || {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (params.auth) header["Authorization"] = params.auth;
  let options = {
    method: params.method || "GET",
    headers: header,
    // credentials: 'include'
  };
  if (options.method !== "GET") options.body = params.body;
  let url = !params.url.includes("https://") ? `https://api.leanservices.work/${params.url}` : params.url;
  return fetch(url, options)
    .then((response) => {
      if (response.headers.get("content-type").indexOf("application/json") !== -1) {
        response = response.json();
        if (typeof response == " string") response = JSON.parse(response);
      } else response = response.text();
      return response;
    })
    .then((res) => {
      if ("error" in res) {
        if (callback_error) return callback_error(res);
        // console.log(res);
        __templates.api_loading("hide");
        __push_notification("fail", res.error);
        return false;
      }
      if (callback) callback(res);
    })
    .catch((err) => {
      if (!err) return false;
      console.log(err);
    });
};

let mobile = window.innerWidth <= 426;
let tablet = window.innerWidth <= 768 && window.innerWidth >= 426;
let desktop = window.innerWidth > 780;

export const __render = {
  website() {
    __templates.api_loading("show");
    let pathname = window.location.pathname;
    let url_data = {
      "/": () => __render.homepage(),
      // "/c/for-him": () => __render.categories_page({ category: "3vvRIM" }),
      // "/c/for-her": () => __render.categories_page({ category: "y8Q15I" }),
      "/c": (params) => __render.categories_page(params),
      "/p": (params) => __render.product_page(params),
      "/campaign": (params) => __render.campaign(params),
      "/checkout": () => __render.checkout_page(),
      "/blog": () => __render.blog_page(),
      "/blog/article": (params) => __render.article_page(params),
      "/address": () => __render.address_page(),
      "/search": (params) => __render.search_page(params),
      "/thankyou": () => __render.thankyou_page(),
      "/canceled": () => __render.canceled_page(),
      "/editorial": () => __render.list_campaign_winter(),
      "/flash-sale": () => __render.flash_sale(),
    };

    if (pathname.includes(`/p/`)) {
      if (typeof product_master_detail === "undefined") return false;
      let product = product_master_detail;
      url_data[`/p`]({ product });
    } else if (pathname.includes(`/blog/article`)) {
      let article = blog_detail;
      if (typeof article === "undefined") {
        return false;
      }
      url_data["/blog/article"]({ article });
    } else if (pathname.includes(`/c/`)) {
      let category = category_detail;
      if (typeof category === "undefined") {
        return false;
      }
      url_data["/c"](category);
    } else if (pathname.includes(`/campaign`)) {
      let campaign = campaign_detail.data;
      if (typeof campaign === "undefined") {
        return false;
      }
      url_data["/campaign"](campaign);
    } else if (pathname.includes(`/search`)) {
      let products_list = search_result;
      if (typeof products_list === "undefined") {
        return false;
      }
      url_data[`/search`]({ products_list });
    } else {
      url_data[pathname]();
    }
  },
  build(page, blocks) {
    let app = document.getElementById("root");
    app.className = page;
    app.innerHTML = "";
    blocks.map((block) => {
      if (!block) return;
      app.appendChild(block);
    });
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
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      banner,
      __templates_home.categories(),
      new_arrivals,
      __templates_home.stylepick(),
      __templates_home.weekly(),
      __templates_home.blog(),
      // __templates_home.lookbook(),
      __templates_footer.footer(),
    ];
    this.build("home", blocks);
    __templates.api_loading("hide");
  },

  categories_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_categories.infomation({ category: params }),
      __templates_categories.categories({ category: params }),
      __templates_categories.products({ category: params }),
      __templates_categories.filter({ category: params }),
      __templates_footer.footer(),
    ];
    this.build("categories", blocks);
    __templates.api_loading("hide");
  },

  product_page(params) {
    // console.log(params);
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(params.product),
      }),
      __templates_header.cart(),
      __templates_product.product_gallery(params.product),
      __templates_product.flatlay_view(params.product),
      __templates_product.variation(params.product),
      __templates_footer.footer(),
    ];
    this.build("product__page", blocks);
    __templates.api_loading("hide");
    if (fbq) fbq("track", "ViewContent");
  },

  checkout_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_checkout.checkout_form(),
      __templates_checkout.checkout__method(),
      __templates_checkout.checkout__cart(),
      __templates_footer.footer(),
    ];
    this.build("checkout__page", blocks);
    __templates.api_loading("hide");
  },

  order_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_order.order_overview(params),
      __templates_order.order_items(params),
      __templates_footer.footer(),
    ];
    this.build("order__confirmation", blocks);
    __templates.api_loading("hide");
  },

  thankyou_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_thankyou.thankyou_overview(),
      __templates_footer.footer(),
    ];
    this.build("thankyou", blocks);
    __templates.api_loading("hide");
  },

  canceled_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_canceled.canceled_overview(),
      __templates_footer.footer(),
    ];
    this.build("thankyou", blocks);
    __templates.api_loading("hide");
  },

  blog_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_blog.blog_highlight(),
      __templates_blog.blog_categories(),
      __templates_blog.blog_latest(),
      __templates_footer.footer(),
    ];
    this.build("blog__page", blocks);
    __templates.api_loading("hide");
  },

  article_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_article.related(),
      __templates_article.content(params.article),
      __templates_footer.footer(),
    ];
    this.build("article__page", blocks);
    __templates.api_loading("hide");
  },

  campaign(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.cart(),
      __templates_campaign.campaign_detail(params),
      __templates_campaign.banner(params),
      __templates_campaign.gender_filter(params),
      __templates_campaign.sale_products(params),
      __templates_footer.footer(),
    ];
    this.build("campaign__page", blocks);
    __templates.api_loading("hide");
  },

  search_page(params) {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.cart(),
      __templates_search.input(),
      __templates_search.products_list(params.products_list),
      __templates_footer.footer(),
    ];
    this.build("search__page", blocks);
    __templates.api_loading("hide");
  },

  address_page() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.cart(),
      __templates_address.map_banner(),
      __templates_address.address_info(),
      __templates_footer.footer(),
    ];
    this.build("address__page", blocks);
    __templates.api_loading("hide");
  },
  list_campaign_winter() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.megamenu(),
      __templates_header.cart(),
      list_campaign_winter(),
      __templates_footer.footer(),
    ];
    this.build("winter-campaign", blocks);
    __templates.api_loading("hide");
  },
  flash_sale() {
    let blocks = [
      __templates_header.header({
        left: __templates_header.left(),
        right: __templates_header.right(),
      }),
      __templates_header.search({
        option: __templates.related_product(),
      }),
      __templates_header.megamenu(),
      __templates_header.cart(),
      flash_sale_page(),
      __templates_footer.footer(),
    ];
    this.build("flash-sale-page", blocks);
    __templates.api_loading("hide");
  },
};

__render.website();
