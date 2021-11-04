import { __icons } from "../share/_icons.js";
import pre_order_cart from './pre_order_cart.js';

function list_campaign_winter() {
  function create_element(e) {
    let dom_create = document.createElement(e);
    
    return dom_create;
  }
  
  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('list-campaign-page-wrapper');
  
  function page_header() {
    let cart_quantity = 0;
    if (localStorage.getItem('pre-order-item')) {
      JSON.parse(localStorage.getItem('pre-order-item')).map(item => {
        cart_quantity += parseInt(item.quantity)
      });
    }
    
    let div = create_element('header');
    div.classList.add('header', 'style-1');
    div.innerHTML = `
    <div class="nav">
      <div class="nav__logo">
        <a href="/editorial">
          ${__icons.new_ssstutter}
        </a>
      </div>
      <div class="pre-order-cart">${__icons.cart} pre-order <span>( ${cart_quantity} )</span></div>
    </div>
    `;
    
    div.querySelector('.pre-order-cart').addEventListener('click', () => {
      document.body.appendChild(pre_order_cart());
    });
    
    return div;
  }
  
  function section_video() {
    let div = create_element('section');
    div.classList.add('section-video');
    div.innerHTML = `
    <div class="video">
      <video width="100%" autoplay playsinline muted loop>
        <source type="video/mp4" src="/assets/img/SSSTUTTER_Leak_01.mp4">
      </video>
    </video>
    `;
    
    return div;
  }
  
  function section_banner() {
    let div = create_element('section');
    div.classList.add('section-banner', 'container');
    div.innerHTML = `
    <div class="image" style="background-image: url(/assets/img/editorial/16.9-01.jpg)"></div>
    <div class="content">
      <h2><span>new</span>Heritage</h2>
      <p>
        A curated transitional wardwore of repurposed classic featuring a vibrant selection of timeless heritage staples including outerwear, knitwear, premium shirting, jeans and accessories all in updated shape, farbics and colorways. This mix of sportwear, workwear and tailoring allows for more versatile wardwore combination that are perfect for autumn season.
      </p>
    </div>
    `;
    
    return div;
  }
  
  function section_collections() {
    let div = create_element('section');
    div.classList.add('section-collection', 'container');
    div.innerHTML = `
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look1.jpg)"></a>
      <p>Look 1</p>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look2.jpg)"></a>
      <p>Look 2</p>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look3.jpg)"></a>
      <p>Look 3</p>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look4.jpg)"></a>
      <p>Look 4</p>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look5.jpg)"></a>
      <p>Look 5</p>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/editorial/look6.jpg)"></a>
      <p>Look 6</p>
    </div>
    `;
    
    return div;
  }
  
  function section_gallery() {
    let div = create_element('section');
    div.classList.add('section-gallery');
    div.innerHTML = `
    <div class="item" style="background-image: url(/assets/img/editorial/04.1.jpg)"></div>
    <div class="item" style="background-image: url(/assets/img/editorial/06.3.jpg)"></div>
    `;
    
    return div;
  }
  
  function section_end() {
    let div = create_element('section');
    div.classList.add('section-banner', 'container');
    div.innerHTML = `
    <div class="image" style="background-image: url(/assets/img/editorial/feedback02.jpg)"></div>
    <div class="content">
      <h2 style="transform: translate(-50%, -50%)"><span>new</span>Heritage</h2>
    </div>
    `;
    
    return div;
  }
  
  template.appendChild(page_header());
  template.appendChild(section_video());
  // template.appendChild(section_banner());
  template.appendChild(section_collections());
  // template.appendChild(section_gallery());
  // template.appendChild(section_end());
  
  return template;
}

export default list_campaign_winter;