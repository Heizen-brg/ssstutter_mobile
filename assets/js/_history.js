import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __countdown_timer, __currency_format, __init_product_list } from "./share/_function.js";
import { __icons } from "./share/_icons.js";
import { __templates_modal } from "./share/_modal.js";

export const __templates_history = {

    products(params = {}) {
      let div = document.createElement("div");
      div.className = "history__products";
      div.innerHTML = ` 
    <h1>đã xem gần đây </h1>
    <ul></ul>
    `;
      let history_container = div.querySelector("ul");
      let init_favor_items = () => {
          let favor_item = localStorage.getItem('history_item');
          favor_item = JSON.parse(favor_item);
          if (!favor_item||!favor_item.length  ) {
            history_container.innerHTML = `
            <h2>Chưa có sản phẩm nào</h2>
            `
          } else {
            let products = (favor_item || []).map((item) => {
              return `
         <li class="product">   
            <button class="delete__product" data-id="${item.id}">${__icons.close}</button>      
            <div class="thumbnail">
              <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
              item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
            })"></span></a>
            </div>
            <div class="detail">
              <div class="info">
                <h6 class="name">${item.name.toLowerCase()}</h6>
                <div class="price">
                  ${item.salePrice ? `<p>${__currency_format(item.salePrice)}</p><p class="discount">${__currency_format(item.price)}</p> `: `<p>${__currency_format(item.price)}</p>`}
                </div>
                ${item.salePrice || item.salePrice === 0 ? `<p class="tag">${Math.floor(100 - (item.salePrice / item.price) * 100)}%</p>`: ""}
                <div class="color">
                  <p>+${item.color.length} màu</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        `;
      }).join('');
      history_container.innerHTML = products;
          };
       
        let favor_products = history_container.querySelectorAll('li');
        favor_products.forEach(product => {
          let del_btn = product.querySelector(".delete__product");
          del_btn.addEventListener('click',(e)=> {
            e.preventDefault();
          let favor_item = JSON.parse(localStorage.getItem('history_item'));
            favor_item = favor_item.filter(i => i.id !== del_btn.dataset.id);
            localStorage.setItem("history_item", JSON.stringify(favor_item));
            del_btn.parentNode.remove();
          })
        })
    }
    init_favor_items();

    return div;
  },
};