import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_filter, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";
let mobile = window.innerWidth <= 575;
let tablet = window.innerWidth <= 768 && window.innerWidth >= 575;
let desktop = window.innerWidth > 780;
export const __templates_campaign = {
  campaign_detail(params) {
    let div = document.createElement("div");
    div.className = "campaign-detail";
    div.innerHTML = `
    <h2>${params.title}</h2>
    <p>Kêt thúc trong</p>
    <div class="clock"></div>
    <p>${params.description}</p>
    <a href="#sale_products">Khám phá ngay</a>
    `;
 let clock_div = div.querySelector(".clock");
 __countdown_timer({div :clock_div, end : params.end_time })
    // btn.addEventListener('click', (e) => {
    //   e.preventDefault();
    // })
    return div;
  },
  banner(params) {
    let div = document.createElement("div");
    div.className = "hero__banner";
    div.innerHTML = `
      <div style="background-image:url(https://sss-dashboard.leanservices.work${
        mobile ? params.thumbnail : params.banner
      }.jpeg)"></div>
      ${params.description ? ` <h1>${params.description.replace(/\|/g, '<br>')}</h1>` : ''}
    `;
    if (params.modal.length) {
      setTimeout(() => {
        __templates_modal.overlay({content : __templates_modal.campaign_guide_modal(params.modal)})
      }, 1000);
    }
    return div;
  },
  campaign_filter(params) {
    let div = document.createElement("div");
    div.className = "campaign__filter";
    div.innerHTML = `
      ${
        params.gender ? `
      <ul class="gender__filter">
        <li class="active" data-filter="catId" data-catId="3vvRIM" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637640613530.jpeg)" ></li>
        <li data-filter="catId" data-catId="y8Q15I" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637640619351.jpeg)" ></li>
      </ul>` : ''
      }
      ${
        params.price ? `   
         <ul class="price__filter">
          <li data-filter="price" data-price="0,100000">< 100k</li>
          <li data-filter="price" data-price="100000,300000">100k - 300k</li>
          <li data-filter="price" data-price="300000,500000">300k - 500k</li>
          <li data-filter="price" data-price="500000">500k > </li>
        </ul>` : ''
      }
  
    `;
    let filter_btn = div.querySelectorAll("[data-filter]");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filter_btn.forEach(i => i.classList.remove('active'));
        btn.classList.add('active');
        e.preventDefault();
        if (btn.dataset.catid) {
          div.querySelectorAll('[data-filter="price"]').forEach((i) => (i.dataset.catid = btn.dataset.catid));
        }
        let product_container = document.querySelector("#sale_products");
        product_container.innerHTML = __templates.busy_loading("show");

        let init_sale_products = ({ skip = 0, limit = 10, catId, price } = {}) => {
          let query = `url=${params.url}&`;
          if (skip) query += `skip=${skip}&`;
          if (limit) query += `limit=${limit}&`;
          if (catId) query += `catId=${catId}&`;
          if (price) query += `salePrice=${price}&`;
          __requests(
            {
              method: "GET",
              url: `https://sss-dashboard.leanservices.work/w/campaign/detail-web?${query}`,
            },
            ({ data }) => {
              if (!data.products.length)
                product_container.innerHTML += ` <p style="text-align:center">Không tìm thấy sản phẩm phù hợp</p>`;
              let product_items = (data.products || []).map((item) => {
                item.catId = item.catId.join(",").split(",");
                let product_template = document.createElement("li");
                product_template.dataset.cat = item.catId[0];
                product_template.className = "product";
                product_template.innerHTML = `
                <div class="thumbnail">
                  <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
                  item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
                })"></span></a>
                </div>
                <div class="detail">
                  <div class="info">
                    <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
                    <div class="price">
                      ${
                        item.salePrice
                          ? `<p>${__currency_format(item.salePrice)}</p>
                        <p class="discount">${__currency_format(item.price)}</p> `
                          : `<p>${__currency_format(item.price)}</p>`
                      }
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                    <div class="color">
                      <p>+${item.color.length} màu</p>
                    </div>
                  </div>
                </div>
              `;
                product_container.appendChild(product_template);
                return product_template;
              });
              if (data.products.length >= 10)
                infinity_scroll(product_items[product_items.length - 2], product_container, {
                  skip,
                  limit,
                  catId,
                  price,
                });
              __templates.busy_loading("hide");
            }
          );
        };
        let infinity_scroll = (anchor, container, query) => {
          if (!anchor) return false;
          let block_loader = new IntersectionObserver(function (entries, observer) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                let block = entry.target;
                container.innerHTML += __templates.busy_loading("show");
                init_sale_products({ ...query, skip: query.skip + 10 });
                block_loader.unobserve(block);
              }
            });
          });
          block_loader.observe(anchor);
        };
        console.log(btn.dataset.filter);
        init_sale_products({
          catId: btn.dataset.catid || "",
          price: btn.dataset.price || "",
        });
      });
    });

    return div;
  },


  sale_products(params = {}) {
    let div = document.createElement("div");
    div.className = "categories__products";
    div.innerHTML = ` 
    <ul id="sale_products">
      ${__templates.busy_loading("show")}
    </ul>
    `;

    let product_sale_container = div.querySelector("ul");
    let init_sale_products = (query = `url=${params.url}&limit=10&catId=3vvRIM`) => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/campaign/detail-web?${query}`,
        },
        ({ data }) => {
          let product_items = (data.products || []).map((item) => {
            item.catId = item.catId.join(",").split(",");
            let product_template = document.createElement("li");
            product_template.dataset.cat = item.catId[0];
            product_template.className = "product";
            product_template.innerHTML = `
            <div class="thumbnail">
              <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
              item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
            })"></span></a>
            </div>
            <div class="detail">
              <div class="info">
                <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
                <div class="price">
                  ${
                    item.salePrice
                      ? `<p>${__currency_format(item.salePrice)}</p>
                    <p class="discount">${__currency_format(item.price)}</p> `
                      : `<p>${__currency_format(item.price)}</p>`
                  }
                </div>
                ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                <div class="color">
                  <p>+${item.color.length} màu</p>
                </div>
              </div>
            </div>
          `;
            product_sale_container.appendChild(product_template);
            return product_template;
          });
          if (data.products.length >= 10)
            infinity_scroll(product_items[product_items.length - 2], product_sale_container);
          __templates.busy_loading("hide");
        }
      );
    };
    let infinity_scroll = (anchor, container) => {
      if (!anchor) return false;
      let block_loader = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let block = entry.target;
            container.innerHTML += __templates.busy_loading("show");
            let query = `url=${params.url}&skip=${container.childElementCount - 1}`;
            init_sale_products(query);
            block_loader.unobserve(block);
          }
        });
      });
      block_loader.observe(anchor);
    };
    init_sale_products();
    return div;
  },
};
