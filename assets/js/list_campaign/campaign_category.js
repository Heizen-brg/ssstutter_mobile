import { __icons } from "../share/_icons.js";
import pre_order_cart from './pre_order_cart.js';

function campaign_category_page(data) {
  let look_image = '';
  if (data.slug == 'lookbook-1') look_image = 1;
  if (data.slug == 'lookbook-2') look_image = 2;
  if (data.slug == 'lookbook-3') look_image = 3;
  if (data.slug == 'lookbook-4') look_image = 4;
  if (data.slug == 'lookbook-5') look_image = 5;
  if (data.slug == 'lookbook-6') look_image = 6;
  
  function create_element(e) {
    let dom_create = document.createElement(e);
    return dom_create;
  }

  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('list-campaign-page-wrapper', 'category-campaign-page');
  
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
  
  function page_banner() {
    let div = create_element('section');
    div.classList.add('section-video');
    div.innerHTML = `
    <div class="video" style="background: #cecece no-repeat center; background-image: url(/assets/img/editorial/look${look_image}.jpg);"></div>
    `;
    
    div.querySelector('.video').style.backgroundSize = 'cover';
    
    return div;
  }
  
  function section_product() {
    let div = create_element('section');
    div.classList.add('section-product');
    div.innerHTML = `
    <p style="text-align: center; padding: 0 10px;">Sản phẩm có trong ảnh</p>
    <div class="product-list"></div>
    `;
    
    fetch(`https://api.leanservices.work/product/filter/web?catId=${data.id}&showAll=true&stock=0`, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.stauts);
        return false;
      }
      return response.json();
    })
    .then((data) => {
      get_product(data);
    })
    .catch((error) => console.log(error));
    
    function get_product(data) {
      let pathname = location.pathname;
      if (pathname.includes('editorial/look/lookbook-')) {
        pathname = '';
      }
      
      data.data.map(product => {
        let item = create_element('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href="${pathname}/editorial/product/${product.slug}" class="image" style="background-image:url(https://cdn.ssstutter.com/products/${product.extensions.media.featured})"></a>
        <p class="name">${product.name.toLowerCase()}</p>
        <p>${product.price.toLocaleString("en-US")} <span class="currency-symbol">₫</span></p> 
        <p>+${product.color.length} màu</p>
        `;
        
        div.querySelector('.product-list').appendChild(item);
        return item;
      });
    }
    
    return div;
  }
  
  
  template.appendChild(page_header());
  template.appendChild(page_banner());
  template.appendChild(section_product());
  return template;
}

export default campaign_category_page;