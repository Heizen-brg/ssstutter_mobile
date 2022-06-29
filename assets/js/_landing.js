import { __templates } from "./share/_components.js";
import {
  __currency_format,
  __init_product_list,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
export const __templates_landing = {
  body() {
    let div = document.createElement('div');
    div.className = 'content'
    div.innerHTML = `
      <figure>
        <img src="/assets/img/flash_sale/everyday.jpg" loading="lazy"/>
        <a href="p/pure-tee"><p>khám phá ngay</p></a>
        <img src="/assets/img/flash_sale/BUS.jpg" loading="lazy"/>
      </figure>
      <div class="glide" id="landing_glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/1.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/2.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/3.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/4.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/7.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/5.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/6.jpg"/></li>
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>  
      <a href="p/pure-tee"><p>mua ngay</p></a>
      <figure">
        <img src="/assets/img/flash_sale/gia.jpg" loading="lazy"/>
      </figure>
    `;
  setTimeout(() => {
    new Glide("#landing_glide", {
      type: "slider",
      bound: true,
      perView: 1,
      gap: 0,
    }).mount();
  }, 200);
    return div;
  }
};