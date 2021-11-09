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
    <div class="close">
      <button type="button">
        <svg data-action="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"> <path d="M492,236H68.442l70.164-69.824c7.829-7.792,7.859-20.455,0.067-28.284c-7.792-7.83-20.456-7.859-28.285-0.068    l-104.504,104c-0.007,0.006-0.012,0.013-0.018,0.019c-7.809,7.792-7.834,20.496-0.002,28.314c0.007,0.006,0.012,0.013,0.018,0.019    l104.504,104c7.828,7.79,20.492,7.763,28.285-0.068c7.792-7.829,7.762-20.492-0.067-28.284L68.442,276H492    c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"></path> </svg>
      </button>
    </div>
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
          <div>
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
        </div>

        <button type="button" class="delete">
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