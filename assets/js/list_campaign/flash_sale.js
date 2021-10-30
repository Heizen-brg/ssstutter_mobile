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
    <div class="clock"></div>
    <h2>Flash sale / Ưu đãi giới hạn</h2>
    <p>Sản phẩm chỉ từ 89.000đ</p>
    <p>Kéo xuống để xem danh sách sản phẩm</p>
    `;
    
    let end_date = new Date('Oct 31, 2021 00:00:00').getTime();
    
    let countdown = setInterval(() => {
      let distance = end_date - Date.now();
      
      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours =  Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      div.querySelector('.clock').innerHTML = `
      Kết thúc trong 
      <span>${hours}</span> giờ 
      <span>${minutes}</span> phút 
      <span>${seconds}</span> giây
      `;
      
      if ((distance) < 0) {
        clearInterval(countdown);
        div.querySelector('.clock').innerHTML = `
        Sự kiện đã kết thúc
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
      <div data-filter="nu" style="background-image: url(/assets/img/flash_sale/fs-her-${img_size}.jpg)"></div>
      <div data-filter="nam" style="background-image: url(/assets/img/flash_sale/fs-him-${img_size}.jpg)"></div>
    </div>
    `;
    
    div.querySelectorAll('.grid-row div').forEach(banner => {
      banner.addEventListener('click', (e) => {
        let data_filter = e.target.getAttribute('data-filter');
        
        document.querySelector('#san-pham-flash-sale').scrollIntoView({ behavior: 'smooth' });
        if (document.querySelector(`#san-pham-flash-sale .product-filter .active`)) {
          document.querySelector(`#san-pham-flash-sale .product-filter .active`).classList.remove('active');
        }
        
        document.querySelector(`#san-pham-flash-sale [data-filter="${data_filter}"]`).classList.add('active');
        document.querySelector(`#san-pham-flash-sale [data-filter="${data_filter}"]`).click();
      });
    });
    
    return div;
  }
  
  function section_product() {
    let cat_id = '';
    
    let div = create_element('section');
    div.classList.add('section-product');
    div.setAttribute('id', 'san-pham-flash-sale')
    div.innerHTML = `
    <div class="product-filter">
      <span data-filter="nam">Sản phẩm Nam</span>
      <span style="text-decoration: none;">/</span>
      <span data-filter="nu">Sản phẩm Nữ</span>
    </div>
    <ul></ul>
    `;
    
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
        div.querySelector('ul').innerHTML = '';
        if (div.querySelector('.product-filter .active')) {
          div.querySelector('.product-filter .active').classList.remove('active');
        }
        item.classList.add('active');
        
        let data_filter = item.getAttribute('data-filter');
        if (data_filter == 'nam') cat_id = '?catId=3vvRIM';
        if (data_filter == 'nu') cat_id = '?catId=y8Q15I';
        
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
          get_product(data);
        })
        .catch(error => console.log(error));
      });
    });
    
    return div;
  }
  
  template.appendChild(section_header());
  template.appendChild(section_banner());
  template.appendChild(section_product());
  
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

      template.querySelector('.section-product ul').appendChild(product_item);
      return product_item;
    });
  }
  
  return template;
}

export default flash_sale_page;