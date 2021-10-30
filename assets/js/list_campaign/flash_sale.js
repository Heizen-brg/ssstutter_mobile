function flash_sale_page() {
  function create_element(e) {
    let dom_create = document.createElement(e);
    
    return dom_create;
  }
  
  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('flash-sale-page-wrapper');
  
  function section_header() {
    let div = create_element('section');
    div.className = "campaign-detail";
    div.innerHTML = `
    <h2>Flash sale</h2>
    <p>Kết thúc trong</p>
    <div class="clock"></div>
    <p>Sản phẩm chỉ từ 89.000đ</p>
    `;
    
    let end_date = new Date('Oct 31, 2021 00:00:00').getTime();
    
    let countdown = setInterval(() => {
      let distance = end_date - Date.now();
      
      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours =  Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
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
  }
  
  function section_banner() {
    let img_size = 'pc';
    if (window.innerWidth < 768) img_size = 'mobile';
    
    let div = create_element('section');
    div.classList.add('section-banner');
    div.innerHTML = `
    <div class="grid-row">
      <div style="background-image: url(/assets/img/flash_sale/fs-her-${img_size}.jpg)"></div>
      <div style="background-image: url(/assets/img/flash_sale/fs-him-${img_size}.jpg)"></div>
    </div>
    `;
    
    return div;
  }
  
  function section_product() {
    let cat_id = '';
    
    let div = create_element('section');
    div.classList.add('section-product');
    div.innerHTML = `
    <div class="product-filter">
      <span data-filter="nam">Nam</span>
      <span data-filter="nu">Nữ</span>
    </div>
    <ul></ul>
    `;
    
    function get_product(data) {
      data.data.map(item => {
        let product_item = create_element('li');
        product_item.classList.add('product');
        product_item.innerHTML = `
        <div class="thumbnail">
          <a href="/p/${item.slug}">
            <span style="background-image:url(https://cdn.ssstutter.com/products/${item.extensions.media.featured})"></span>
          </a>
        </div>
        <div class="detail">
          <h6 class="name">${item.name}</h6>
          <div class="price">
            ${item.salePrice.toLocaleString('en-US')
            ? `
            <p>${item.salePrice.toLocaleString('en-US')} <span class="currency-symbol">₫</span></p> 
            `
            : ''
            }
            <p class="discount">${item.price.toLocaleString('en-US')} <span class="currency-symbol">₫</span></p>
          </div>
          <div class="color">
            <p>+${item.color.length} màu</p>
          </div>
        </div>
        `;
        
        div.querySelector('ul').appendChild(product_item);
        return product_item;
      });
    }
    
    fetch(`https://api.leanservices.work/product/services/flash-sale${cat_id}`, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.stauts);
        return false;
      }
      return response.json();
    })
    .then(data => {
      get_product(data)
    })
    .catch(error => console.log(error));
    
    div.querySelectorAll('.product-filter span').forEach(item => {
      item.addEventListener('click', () => {
        if (div.querySelector('.product-filter .active')) {
          div.querySelector('.product-filter .active').classList.remove('active');
        }
        item.classList.add('active');
      });
    });
    
    div.querySelector('[data-filter="nam"]').addEventListener('click', () => {
      div.querySelector('ul').innerHTML = '';
      cat_id = '?catId=3vvRIM';
      fetch(`https://api.leanservices.work/product/services/flash-sale${cat_id}`, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.stauts);
          return false;
        }
        return response.json();
      })
      .then(data => {
        get_product(data)
      })
      .catch(error => console.log(error));
    });
    
    div.querySelector('[data-filter="nu"]').addEventListener('click', () => {
      div.querySelector('ul').innerHTML = '';
      cat_id = '?catId=y8Q15I';
      fetch(`https://api.leanservices.work/product/services/flash-sale${cat_id}`, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.stauts);
          return false;
        }
        return response.json();
      })
      .then(data => {
        get_product(data)
      })
      .catch(error => console.log(error));
    });
    
    return div;
  }
  
  template.appendChild(section_header());
  template.appendChild(section_banner());
  template.appendChild(section_product());
  
  return template;
}

export default flash_sale_page;