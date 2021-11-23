import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import {
  __currency_format,
  __init_filter,
  __init_product_list,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
export const __templates_campaign = {
  campaign_detail(params) {
    let div = document.createElement("div");
    div.className = "campaign-detail";
    div.innerHTML = `
    <h2>${params.title}</h2>
    <p>Kết thúc trong</p>
    <div class="clock"></div>
    <p>${params.description}</p>
    `;

    let end_date = new Date(params.end_time).getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector('.clock').innerHTML = `
      <!--
      <div class="text-center"><span>${days}</span>Ngày</div>
      -->
      <div class="text-center"><span>${hours}</span>Giờ</div>
      <div class="text-center"><span>${minutes}</span>Phút</div>
      <div class="text-center"><span>${seconds}</span>Giây</div>
      `;

      if ((distance) < 0) {
        clearInterval(countdown);
        div.querySelector('.clock').innerHTML = `
        <!--
        <div class="text-center"><span>00</span>Ngày</div>
        -->
        <div class="text-center"><span>00</span>Giờ</div>
        <div class="text-center"><span>00</span>Phút</div>
        <div class="text-center"><span>00</span>Giây</div>
        `;
      }
    }, 1000);


    return div;
  },
  banner(params) {
    let div = document.createElement("div");
    div.className = "hero__banner";
    div.innerHTML = `
      <div style="background-image:url(https://sss-dashboard.leanservices.work${params.banner}.jpeg)"></div>
    `;
    return div;
  },
  gender_filter(params) {
    let div = document.createElement("div");
    div.className = "gender__filter";
    div.innerHTML = `
      <ul>
        <li style="background-image:url(https://sss-dashboard.leanservices.work//upload/11-2021/1637036828297.jpeg)" data-cate="3vvRIM"></li>
        <li style="background-image:url(https://sss-dashboard.leanservices.work//upload/11-2021/1637036843983.jpeg)" data-cate="y8Q15I"></li>
      </ul>
    `;
    let filter_btn = div.querySelectorAll("ul > li");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        let product_container = document.querySelector("#sale_products");
        product_container.innerHTML = __templates.busy_loading('show')

        let init_sale_products = ({ skip = 0, limit = 10, catId } = {}) => {

          let query = `url=${params.url}&`
          if (skip) query += `skip=${skip}&`
          if (limit) query += `limit=${limit}&`
          if (catId) query += `catId=${catId}&`
          __requests({
            method: "GET",
            url: `https://sss-dashboard.leanservices.work/w/campaign/detail-web?${query}`
          }, ({ data }) => {
            let product_items = (data.products || []).map(item => {
              item.catId = item.catId.join(",").split(",")
              let product_template = document.createElement("li");
              product_template.dataset.cat = item.catId[0];
              product_template.className = 'product';
              product_template.innerHTML = `
                <div class="thumbnail">
                  <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
                })"></span></a>
                </div>
                <div class="detail">
                  <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
                  <div class="price">
                    ${item.salePrice
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
              `
              product_container.appendChild(product_template);
              return product_template;
            })
            if (data.products.length >= 10) infinity_scroll(product_items[product_items.length - 2], product_container, { skip, limit, catId })
            __templates.busy_loading("hide");
          })
        }
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
        init_sale_products({ catId: btn.dataset.cate })
      });
    });

    return div;
  },
  price_filter(params = {}) {
    let div = document.createElement("div");
    div.className = "price__filter";
    div.innerHTML = `
      <ul>
        <li data-price="0,100000">< 100k</li>
        <li data-price="100000,300000">100k - 300k</li>
        <li data-price="300000,5000000">300k - 500k</li>
        <li data-price="500000">500k > </li>
      </ul>
    `;
    let filter_btn = div.querySelectorAll("ul > li");
    filter_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        let product_container = document.querySelector("#sale_products");
        product_container.innerHTML = __templates.busy_loading('show')

        let init_sale_products = ({ skip = 0, limit = 10, catId, price } = {}) => {

          let query = `url=${params.url}&`
          if (skip) query += `skip=${skip}&`
          if (limit) query += `limit=${limit}&`
          if (catId) query += `catId=${catId}&`
          if (price) query += `salePrice=${price}`
          __requests({
            method: "GET",
            url: `https://sss-dashboard.leanservices.work/w/campaign/detail-web?${query}`
          }, ({ data }) => {
            let product_items = (data.products || []).map(item => {
              item.catId = item.catId.join(",").split(",")
              let product_template = document.createElement("li");
              product_template.dataset.cat = item.catId[0];
              product_template.className = 'product';
              product_template.innerHTML = `
                <div class="thumbnail">
                  <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
                })"></span></a>
                </div>
                <div class="detail">
                  <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
                  <div class="price">
                    ${item.salePrice
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
              `
              product_container.appendChild(product_template);
              return product_template;
            })
            if (data.products.length >= 10) infinity_scroll(product_items[product_items.length - 2], product_container, { skip, limit, catId })
            __templates.busy_loading("hide");
          })
        }
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
        init_sale_products({ catId: btn.dataset.cate })
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

    let product_sale_container = div.querySelector('ul');
    let init_sale_products = (query = `url=${params.url}&`) => {
      __requests({
        method: "GET",
        url: `https://sss-dashboard.leanservices.work/w/campaign/detail-web?${query}`
      }, ({ data }) => {
        let product_items = (data.products || []).map(item => {
          item.catId = item.catId.join(",").split(",")
          let product_template = document.createElement("li");
          product_template.dataset.cat = item.catId[0];
          product_template.className = 'product';
          product_template.innerHTML = `
            <div class="thumbnail">
              <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
            })"></span></a>
            </div>
            <div class="detail">
              <h6 class="name">${item.name.toLocaleLowerCase()}</h6>
              <div class="price">
                ${item.salePrice
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
          `
          product_sale_container.appendChild(product_template);
          return product_template;
        })
        if (data.products.length >= 10) infinity_scroll(product_items[product_items.length - 2], product_sale_container)
        __templates.busy_loading("hide");
      })
    }
    let infinity_scroll = (anchor, container) => {
      if (!anchor) return false;
      let block_loader = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let block = entry.target;
            container.innerHTML += __templates.busy_loading("show");
            let query = `url=${params.url}&skip=${container.childElementCount - 1}`
            init_sale_products(query);
            block_loader.unobserve(block);
          }
        });
      });
      block_loader.observe(anchor);
    };
    init_sale_products()
    return div;
  },
};
