import { __icons } from "../share/_icons.js";
import pre_order_cart from "./pre_order_cart.js";

function self_portrait_campaign() {
  function create_element(e) {
    let dom_create = document.createElement(e);

    return dom_create;
  }

  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }

  let template = create_element("div");

  function page_header() {
    let cart_quantity = 0;
    if (localStorage.getItem("self-portrait-item")) {
      JSON.parse(localStorage.getItem("self-portrait-item")).map((item) => {
        cart_quantity += parseInt(item.quantity);
      });
    }

    let div = create_element("header");
    div.classList.add("header", "style-1");
    div.innerHTML = `
    <div class="nav">
      <div class="nav__logo">
        <a href="/">
          ${__icons.new_ssstutter}
        </a>
      </div>
      <!--
      <div class="pre-order-cart">${__icons.cart} pre-order <span>( ${cart_quantity} )</span></div>
      -->
    </div>
    `;
    /*
    div.querySelector(".pre-order-cart").addEventListener("click", () => {
      document.body.appendChild(pre_order_cart());
    });
    */
    return div;
  }

  function section_slider_1() {
    let div = create_element("section");
    div.classList.add("section-slide");
    div.innerHTML = `
    <div class="glide" id="winter-1">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li class="glide__slide">
            <div class="image" style="background-image: url(/assets/img/self_portrait/1.png)"></div>
            <p>Look 1</p>
          </li>
          <li class="glide__slide">
            <div class="image" style="background-image: url(/assets/img/self_portrait/2.png)"></div>
            <p>Look 2</p>
          </li>
          <li class="glide__slide">
            <div class="image" style="background-image: url(/assets/img/self_portrait/3.png)"></div>
            <p>Look 3</p>
          </li>
          <li class="glide__slide">
            <div class="image" style="background-image: url(/assets/img/self_portrait/4.png)"></div>
            <p>Look 4</p>
          </li>
          <li class="glide__slide">
            <div class="image" style="background-image: url(/assets/img/self_portrait/5.png)"></div>
            <p>Look 5</p>
          </li>
        </ul>

        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>
    </div>
    `;
    
    div.querySelectorAll('.glide__slide').forEach(item => {
      item.addEventListener('click', () => {
        let image = item.querySelector('.image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
        let look_modal = create_element('div');
        look_modal.classList.add('look-detail');
        look_modal.innerHTML = `
        <div class="thumbnail" style="background-image: url(${image})"></div>
        <div class="gallery">
          <div class="item" style="background-image: url()"></div>
          <div class="item" style="background-image: url()"></div>
        </div>
        <button class="close" type="button"></button>
        `;
        
        look_modal.querySelector('.close').addEventListener('click', () => {
          look_modal.remove();
        });
        
        div.appendChild(look_modal);
      });
    });

    return div;
  }

  template.appendChild(page_header());
  template.appendChild(section_slider_1());
  
  
  return template;
}

export default self_portrait_campaign;
