function pre_order_cart() {
  function create_element(e) {
    let dom_create = document.createElement(e);
    
    return dom_create;
  }
  
  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('pre-order-cart');
  template.innerHTML = '<div class="overlay"></div>';
  
  let template_inner = create_element('div');
  template_inner.classList.add('cart-modal');
  
  template.querySelector('.overlay').addEventListener('click', () => {
    template.remove();
  });
  
  function cart_header() {
    let div = create_element('div');
    div.classList.add('cart-header')
    div.innerHTML = `
    <span class="title">Giỏ hàng</span>
    <button type="button">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 377.126 377.125">
        <g id="Group_35" data-name="Group 35" transform="translate(-4890.35 -7314.312) rotate(-45)">
          <g id="Group_33" data-name="Group 33" transform="translate(-1970 8790)">
            <g id="Group_27" data-name="Group 27">
              <path id="Path_20" data-name="Path 20" d="M501.333,96H10.667a10.667,10.667,0,1,0,0,21.334H501.334a10.667,10.667,0,1,0,0-21.334Z"></path>
            </g>
          </g>
          <g id="Group_34" data-name="Group 34" transform="translate(-1724.667 9152.668) rotate(-90)">
            <g id="Group_27-2" data-name="Group 27" transform="translate(0 0)">
              <path id="Path_20-2" data-name="Path 20" d="M10.668,117.334H501.334a10.667,10.667,0,1,0,0-21.334H10.667a10.667,10.667,0,1,0,0,21.334Z" transform="translate(0 -96)"></path>
            </g>
          </g>
        </g>
      </svg>
    </button>
    `;
    
    div.querySelector('button').addEventListener('click', () => {
      template.remove();
      let cart_quantity = 0;
      if (localStorage.getItem('pre-order-item')) {
        JSON.parse(localStorage.getItem('pre-order-item')).map(item => {
          cart_quantity += parseInt(item.quantity)
        });
      }
      
      document.querySelector('.pre-order-cart span').innerHTML = `( ${cart_quantity} )`;
    });
    
    return div;
  }
  
  function cart_body() {
    let data_cart = [],
        total_bill = 0;
    if (localStorage.getItem('pre-order-item')) {
      data_cart = JSON.parse(localStorage.getItem('pre-order-item'));
      
      data_cart.map(item => {
        total_bill += (item.price * item.quantity);
      });
    }
    
    let div = create_element('div');
    div.classList.add('cart-body');
    div.innerHTML = `
    <div class="content left">

    </div>
    <div class="content right">
      <p>
        <span>Thành tiền</span>  
        <span class="total">${total_bill.toLocaleString('en-US')}</span>  
      </p>
      <button type="button" class="checkout">Thanh toán</button>
    </div>
    `;
    
    if (data_cart.length > 0) {
      data_cart.map(item => {
        let color = item.colorId,
            image = '';
        if (Object.keys(item.media).length) {
          image = `color_${color}_thumbnail`;
        }
        // console.log(image);
        let cart_item = create_element('div');
        cart_item.classList.add('cart-item');
        cart_item.setAttribute('data-id', item.variation.id);
        cart_item.innerHTML = `
        <div class="image" style="background-image: url(https://cdn.ssstutter.com/products/${item.media[image] ?item.media[image]['o']: 'no_image.png' })"></div>
        <div class="detail">
          <p>${item.name} - ${item.price.toLocaleString('en-US')}</p>
          <p>Size ${item.size} - ${item.colorName}</p>
        </div>
        <div class="quantity">
          <button type="button" class="decrease">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 512.001 512.001">
              <g id="Group_35" data-name="Group 35" transform="translate(1970 -8640.667)">
                <g id="Group_33" data-name="Group 33" transform="translate(-1970 8790)">
                  <g id="Group_27" data-name="Group 27">
                    <path id="Path_20" data-name="Path 20" d="M501.333,96H10.667a10.667,10.667,0,1,0,0,21.334H501.334a10.667,10.667,0,1,0,0-21.334Z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>

          <span class="number">${item.quantity}</span>

          <button type="button" class="increase">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 512.001 512.001">
              <g id="Group_35" data-name="Group 35" transform="translate(1970 -8640.667)">
                <g id="Group_33" data-name="Group 33" transform="translate(-1970 8790)">
                  <g id="Group_27" data-name="Group 27">
                    <path id="Path_20" data-name="Path 20" d="M501.333,96H10.667a10.667,10.667,0,1,0,0,21.334H501.334a10.667,10.667,0,1,0,0-21.334Z"></path>
                  </g>
                </g>
                <g id="Group_34" data-name="Group 34" transform="translate(-1724.667 9152.668) rotate(-90)">
                  <g id="Group_27-2" data-name="Group 27" transform="translate(0 0)">
                    <path id="Path_20-2" data-name="Path 20" d="M10.668,117.334H501.334a10.667,10.667,0,1,0,0-21.334H10.667a10.667,10.667,0,1,0,0,21.334Z" transform="translate(0 -96)"></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>

        <button type="button" class="delete">
          <svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"></path><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path></g></svg>
        </button>
        `;
        //
        // decrease quantity
        //
        cart_item.querySelector('.decrease').addEventListener('click', () => {
          let quantity = parseInt(cart_item.querySelector('.number').textContent),
              item_id = cart_item.getAttribute('data-id');
          
          if (quantity == 1) return false;
          quantity -= 1;
          cart_item.querySelector('.number').innerHTML = quantity;
          
          let update_cart = JSON.parse(localStorage.getItem('pre-order-item'));
          update_cart = update_cart.map(product => {
            if (product.variation.id == item_id) {
              product.quantity -= 1
            }
            return product;
          });
          
          localStorage.setItem('pre-order-item', JSON.stringify(update_cart));
          
          let total_bill = parseInt(div.querySelector('.total').textContent.replace(/,/g, ''));
          div.querySelector('.total').innerHTML = (total_bill - item.price).toLocaleString('en-US');
          /*
          if (quantity == 1) return false;
          quantity -= 1;
          cart_item.querySelector('.number').innerHTML = quantity;
          
          // let update_cart = JSON.parse(localStorage.getItem('pre-order-item'));
          update_cart.find(product => {
            if (product.variation.id == item_id) {
              product.quantity -= 1;
            }
            return update_cart;
          });
          
          */
        });
        //
        // increase quantity
        //
        cart_item.querySelector('.increase').addEventListener('click', () => {
          let quantity = parseInt(cart_item.querySelector('.number').textContent),
              item_id = cart_item.getAttribute('data-id');
          
          quantity += 1;
          cart_item.querySelector('.number').innerHTML = quantity;
          
          let update_cart = JSON.parse(localStorage.getItem('pre-order-item'));
          update_cart = update_cart.map(product => {
            if (product.variation.id == item_id) {
              product.quantity += 1
            }
            return product;
          });
          
          localStorage.setItem('pre-order-item', JSON.stringify(update_cart));
          
          let total_bill = parseInt(div.querySelector('.total').textContent.replace(/,/g, ''));
          div.querySelector('.total').innerHTML = (total_bill + item.price).toLocaleString('en-US');
          /*
          quantity += 1;
          cart_item.querySelector('.number').innerHTML = quantity;
          
          // let update_cart = JSON.parse(localStorage.getItem('pre-order-item'));
          update_cart.find(product => {
            if (product.variation.id == item_id) {
              product.quantity += 1;
            }
            return update_cart;
          });
          
          */
        });
        
        cart_item.querySelector('.delete').addEventListener('click', () => {
          let item_id = cart_item.getAttribute('data-id');
          
          cart_item.remove();
          let update_cart = JSON.parse(localStorage.getItem('pre-order-item'));
          update_cart = update_cart
            .map((product) => {
              if (product.variation.id == item_id) {
                return false;
              }
              return product;
            })
            .filter((i) => !!i);
          
          localStorage.setItem('pre-order-item', JSON.stringify(update_cart));
          let total_bill = parseInt(div.querySelector('.total').textContent.replace(/,/g, ''));
          div.querySelector('.total').innerHTML = (total_bill - (item.price * item.quantity)).toLocaleString('en-US');
        });
        
        div.querySelector('.content.left').appendChild(cart_item);
        return cart_item;
      });
    }
    
    div.querySelector('.content.right button').addEventListener('click', () => {
      location.href = '/editorial/checkout';
    });
    
    return div;
  }
  
  template_inner.appendChild(cart_header());
  template_inner.appendChild(cart_body());
  template.appendChild(template_inner);
  
  return template;
}

export default pre_order_cart;