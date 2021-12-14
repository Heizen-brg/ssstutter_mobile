import { __requests } from "../main.js";
import { __templates } from "./_components.js";
import { __icons } from "./_icons.js";
import { CONFIG } from "../config.js";
import { __templates_modal } from "./_modal.js";
export const __currency_format = (n) =>
  `${new Intl.NumberFormat("vi-VN", {}).format(parseInt(n))} <span class="currency-symbol">&#x20AB;</span>`;

export const __push_notification = (type, msg, delay) => {
  let wrapper = document.createElement("div");
  wrapper.innerHTML = __templates.notification({ type, msg });
  let noti = wrapper.children[0];
  document.body.appendChild(noti);
  noti.style.display = "inline-block";
  if (!delay) {
    setTimeout(function () {
      document.body.removeChild(noti);
    }, 3000);
  } else return noti;
};

export const __remove_item_in_array = (el, array) => {
  let index = array.indexOf(el);
  if (index > -1) array.splice(index, 1);
  return [...new Set(array)];
};

export const __init_filter = (data, container, skip) => {
  let query = "";
  skip = skip != 0 ? container.childElementCount - 1 : 0;
  query = `?sort=up&catId=${container.dataset.cate}&skip=${skip}&limit=10`;
  return (query += data.q.map((i) => (i.data.length ? `&${i.tax}=${[...new Set(i.data)].join(",")}` : "")).join(""));
};
// container, query, product_ids
export const __init_product_list = (params = { ids: product_ids }) => {
  params.infinity ? false : ((params.container.innerHTML = ""), __templates.api_loading("show"));
  window.product_ids = params.ids || (window.product_ids ? window.product_ids : []);
  let url = !params.query ? `?catId=3vvRIM&` : params.query;
  __requests(
    {
      method: "GET",
      url: `https://api.ssstutter.com/product/filter/web${url}&media=true&webStock=true`,
    },
    ({ data, error }) => {
      __templates.api_loading("hide");
      if (!data.length)  {
        __templates.busy_loading("hide");
        params.container.innerHTML += `<p class="empty_product">Không còn sản phẩm phù hợp</p>`;
        return false;

      }
      let products = (data || []).map((item) => {
        window.product_ids.push(item.id);
        let product_template = document.createElement("li");
        product_template.dataset.gender = item.gender;
        product_template.dataset.price = item.price;
        product_template.dataset.sale = item.discount;
        product_template.innerHTML = `
      <div class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
          })"></span></a>
        </div>
        <div class="detail">
          <h6 class="name">${item.name.toLowerCase()}</h6>
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
      </div>
      `;
        /*
        let color_bar = product_template.querySelector(".color");
        item.color.map((color) => {
          let color_box = document.createElement("span");
          color_box.className = "";
          color_box.dataset.color_id = color ? color.id : "";
          color_box.style.background = color ? color.value : "";
          color_bar.appendChild(color_box);
          return color_box;
        });
        */
        params.container.appendChild(product_template);
        return product_template;
      });
      if (data.length >= 10) __infinity_scroll(products[products.length - 3], params.container);
      __templates.busy_loading("hide");
    }
  );
};

export const __infinity_scroll = (anchor, container) => {
  if (!anchor) return false;
  let block_loader = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let block = entry.target;
        container.innerHTML += __templates.busy_loading("show");
        __init_product_list({
          infinity: true,
          container: container,
          query: __init_filter(window.data_filter, container),
        });
        block_loader.unobserve(block);
      }
    });
  });
  block_loader.observe(anchor);
};

export const __show_cart_item = (wrapper, total, div) => {
  let purchase_items_list = JSON.parse(localStorage.getItem("cartItem"));
  if (!purchase_items_list) {
    wrapper.innerHTML = '<p class="empty__cart">Giỏ hàng chưa có sản phẩm nào</p>';
    return false;
  }
  let inner_item = purchase_items_list
    .map((prod, index) => {
      return `
    <li>
      <a href="/p/${prod.slug}" class="product__thumbnail" style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${prod.media[`color_${prod.colorId}_thumbnail`]
          ? prod.media[`color_${prod.colorId}_thumbnail`].x100.replace(".jpeg", ".webp")
          : "no_image.png"
        })">
      </a>
      <div>
        <h6>${prod.name}</h6>
        <span class="product__variation">
          <p>${prod.colorName}, ${prod.size}</p>
        </span>
        <div class="price">
            ${prod.salePrice
          ? `<p>${__currency_format(prod.salePrice)}</p>
              <p class="discount">${__currency_format(prod.price)}</p> `
          : `<p>${__currency_format(prod.price)}</p>`
        }
        </div>
        <div class="add__product">
          <button data-id="${prod.variation.id}" data-quantity="descrease">-</button>
          <input data-index=${index} value="${prod.quantity}" type="number"/>
          <button data-id="${prod.variation.id}" data-quantity="inscrease">+</button>
        </div>
      </div>
      <div class="clear__product" data-id="${prod.variation.id}" data-index=${index}>
            ${__icons.close}
      </div>
    </li>
    `;
    })
    .join("");
  wrapper.innerHTML = inner_item;
  let item_in_cart = wrapper.querySelectorAll("li");
  // let total_amount_arr = purchase_items_list.map(
  //   (item) => item.quantity * item.price
  // );
  // let total_amount = total_amount_arr.reduce((a, b) => a + b, 0);
  let total_amount = purchase_items_list.reduce((total, current) => {
    if (current.salePrice) return total + current.quantity * current.salePrice;
    return total + current.quantity * current.price;
  }, 0);
  total.dataset.price = total_amount;
  total.innerHTML = __currency_format(total_amount);
  let discount_amount, final_amount;
  if (div) {
    discount_amount = div.querySelector('[data-amount="discount"]');
    final_amount = div.querySelector('[data-amount="total"]');
  }
  if (discount_amount && final_amount) {
    let discount_price = 0;
    if (discount_amount.dataset && discount_amount.dataset.price)
      discount_price = parseInt(discount_amount.dataset.price) || 0;
    let final_price = total_amount - discount_price;
    final_amount.innerHTML = __currency_format(final_price);
    final_amount.dataset.price = final_price;
  }
  item_in_cart.forEach((item) => {
    let input_quantity = item.querySelector("input");
    let quantity_btn = item.querySelectorAll("button");
    let del_btn = item.querySelector(".clear__product");
    quantity_btn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (btn.dataset.quantity == "inscrease") {
          __templates.api_loading("show");
          __requests(
            {
              method: "GET",
              url: `product/variation/check-stock?id=${btn.dataset.id}&stock=${parseInt(input_quantity.value) + 1}`,
            },
            ({ data }) => {
              __templates.api_loading("hide");
              if (!data) return __push_notification("fail", "Sản phẩm hết hàng!");
              input_quantity.value++;
              init_quantity_value(input_quantity.value, input_quantity.dataset.index);
            }
          );
        } else {
          if (input_quantity.value == 1) return false;
          input_quantity.value--;
          init_quantity_value(input_quantity.value, input_quantity.dataset.index);
        }
      });
    });

    input_quantity.addEventListener("change", (e) => {
      e.preventDefault();
      init_quantity_value(e.target.value, e.target.dataset.index);
    });
    let init_quantity_value = (value, index) => {
      purchase_items_list[index].quantity = value;

      let total_amount = purchase_items_list.reduce((total, current) => {
        if (current.salePrice) return total + current.quantity * current.salePrice;
        return total + current.quantity * current.price;
      }, 0);
      total.innerHTML = __currency_format(total_amount);
      total.dataset.price = total_amount;
      let customer_phone = document.querySelector('[data-value="customer_phone"]');
      localStorage.setItem("cartItem", JSON.stringify(purchase_items_list));
      __get_voucher({ customerPhone: customer_phone ? customer_phone.value : null }, __check_shipping);
    };

    del_btn.addEventListener("click", (e) => {
      e.preventDefault();
      purchase_items_list = purchase_items_list.filter((i) => {
        return i.variation.id != del_btn.dataset.id;
      });
      // let total_amount_arr = purchase_items_list.map(
      //   (item) => item.quantity * item.price
      // );
      // let total_amount = total_amount_arr.reduce((a, b) => a + b, 0);
      let total_amount = purchase_items_list.reduce((total, current) => {
        if (current.salePrice) return total + current.quantity * current.salePrice;
        return total + current.quantity * current.price;
      }, 0);
      let customer_phone = document.querySelector('[data-value="customer_phone"]');
      total.innerHTML = __currency_format(total_amount);
      total.dataset.price = total_amount;
      localStorage.setItem("cartItem", JSON.stringify(purchase_items_list));
      __get_voucher({ customerPhone: customer_phone ? customer_phone.value : null }, __check_shipping);
      __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
      del_btn.parentNode.remove();
    });
  });
};

export const __check_shipping = () => {
  if (!document.querySelector('[data-value="customer_city"]')) return;
  let shippingFormat = {
    city: document.querySelector('[data-value="customer_city"]').querySelector("option:checked").textContent,
    district: document.querySelector('[data-value="customer_district"]').querySelector("option:checked").textContent,
    ward: document.querySelector('[data-value="customer_ward"]').querySelector("option:checked").textContent,
    address: document.querySelector('[data-value="customer_address"]').value,
  };
  let checkout_cart = document.querySelector(".checkout__cart");
  let final_price;
  if (checkout_cart) {
    final_price = checkout_cart.querySelector('[data-amount="total"]').dataset.price || 0;
  } else {
    final_price = document.querySelector('[data-amount="total"]').dataset.price || 0;
  }
  let shippingAddress = `${shippingFormat.address}, ${shippingFormat.ward},${shippingFormat.district},${shippingFormat.city}`;
  __requests(
    {
      method: "POST",
      url: `order/shipping/fee/web`,
      body: JSON.stringify({
        moneyTotal: final_price,
        shippingAddress: shippingAddress,
      }),
    },
    ({ data, error }) => {
      if (error) return false;
      let total = document.querySelector('[data-amount="total"]');
      let shipping_fee = document.querySelector('[data-amount="shipping"]');
      // total.innerHTML = __currency_format(parseInt(total.dataset.price) * + data);
      shipping_fee.innerHTML = __currency_format(parseInt(data));
      shipping_fee.dataset.price = data;
      let checkout_cart = document.querySelector(".checkout__cart");
      if (checkout_cart) {
        let checkout_shipping = checkout_cart.querySelector('[data-amount="shipping"]');
        checkout_shipping.innerHTML = __currency_format(parseInt(data));
        checkout_shipping.dataset.price = data;
        __calc_final_amount(checkout_cart);
      }
      __calc_final_amount();
    }
  );
};

export const __get_voucher = (params, callback) => {
  let items_purchased = JSON.parse(localStorage.getItem("cartItem")) || [];
  let gift_purchased = JSON.parse(localStorage.getItem("giftItem")) || '';
  let gift_purchased_2 = JSON.parse(localStorage.getItem("giftItem2")) || '';
  let products = items_purchased.map((item) => {
    return {
      id: item.variation.id,
      quantity: parseInt(item.quantity),
      price: parseInt(item.salePrice) || parseInt(item.price),
    };
  });
  let cart_quantity = items_purchased.reduce((total, current) => {
    if (current.catId.includes('sGT8Q5')) return total
    if (current.name.toLowerCase().includes('great life')) return total
    return total + current.quantity;
  }, 0);
  cart_quantity=parseInt(cart_quantity)
  if (!gift_purchased && cart_quantity ===3) {
    __templates_modal.overlay({
      content: __templates_modal.lucky_wheel_modal(),
      close: "hide",
    });
  }
  if ((!gift_purchased || !gift_purchased_2) && cart_quantity >3) {
    __templates_modal.overlay({
      content: __templates_modal.lucky_wheel_modal(),
      close: "hide",
    });
  }
  __requests(
    {
      method: "POST",
      url: `order/voucher/customer-voucher`,
      body: JSON.stringify({
        customerPhone: params.customerPhone || "",
        items: products,
        discountCode: params.discountCode || [],
      }),
    },
    ({ data, error }) => {
      let discount_amount = params.discountDiv
        ? params.discountDiv.querySelector('[data-amount="discount"]')
        : document.querySelector('[data-amount="discount"]');
      discount_amount.dataset.price = data.amount;
      discount_amount.innerHTML = `-${__currency_format(data.amount)}`;
      __calc_final_amount(params.discountDiv,gift_purchased);
      let checkout_cart = document.querySelector(".checkout__cart");
      if (checkout_cart) {
        let checkout_discount = checkout_cart.querySelector('[data-amount="discount"]');
        checkout_discount.dataset.price = data.amount;
        checkout_discount.innerHTML = `-${__currency_format(data.amount)}`;
        __calc_final_amount(checkout_cart,gift_purchased);
      }
      if (callback) callback();
    },
    (res) => callback(res)
  );
};

export const __calc_final_amount = (div,gift) => {
  let purchase_amount = document.querySelector('[data-amount="purchase"]');
  let discount_amount = document.querySelector('[data-amount="discount"]');
  let total_amount = document.querySelector('[data-amount="total"]');
  let cart_items = document.querySelector(".cart__item--list");
  let shipping_amount = document.querySelector('[data-amount="shipping"]');
  if (div) {
    purchase_amount = div.querySelector('[data-amount="purchase"]');
    discount_amount = div.querySelector('[data-amount="discount"]');
    total_amount = div.querySelector('[data-amount="total"]');
    shipping_amount = div.querySelector('[data-amount="shipping"]');
    cart_items = div.querySelector(".cart__item--list");
  }
  let purchase = parseInt(purchase_amount.dataset.price) || 0;
  let discount = parseInt(discount_amount.dataset.price) || 0;
  let shipping = parseInt(shipping_amount.dataset.price) || 0;
  let final_amount = purchase + shipping - discount;
  total_amount.dataset.price = final_amount;
  //add gift box for black friday
  let gift1 = localStorage.getItem("giftItem");
  let gift2 = localStorage.getItem("giftItem2");
  let cart_selected = JSON.parse(localStorage.getItem("cartItem"))
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [];
  let cart_quantity = cart_selected.reduce((total, current) => {
    if (current.catId.includes("sGT8Q5")) return total;
    if (current.name.toLowerCase().includes("great life")) return total;
    return total + current.quantity;
  }, 0);
  cart_quantity=parseInt(cart_quantity)
  let giftDiv1 = cart_items.querySelector('.blackfriday__gift')
  let giftDiv2 = cart_items.querySelector('.blackfriday__gift__2')
  if(giftDiv1) giftDiv1.remove()
  if(giftDiv2) giftDiv2.remove()
  if(cart_quantity>=3 && gift1){
    let li_gift = document.createElement("li");
    li_gift.className = "blackfriday__gift";
    li_gift.innerHTML = `
    <a class="product__thumbnail" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637651035392.jpeg)">
    </a>
    <div>
      <h6>QUÀ QUAY THƯỞNG</h6>
        <small>${gift1}</small>
      <div class="price">
        <p>0</p>
      </div>
      <span class="product__variation">
        <p>SSStutter sẽ gọi điện xác nhận đơn hàng và phần quà của bạn trong thời gian sớm nhất.</p>
      </span>
    </div>
    `;
    cart_items.appendChild(li_gift);
  }
  if(cart_quantity>=4 && gift2){
    let li_gift = document.createElement("li");
    li_gift.className = "blackfriday__gift__2";
    li_gift.innerHTML = `
    <a class="product__thumbnail" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637651035392.jpeg)">
    </a>
    <div>
      <h6>QUÀ QUAY THƯỞNG</h6>
        <small>${gift2}</small>
      <div class="price">
        <p>0</p>
      </div>
      <span class="product__variation">
        <p>SSStutter sẽ gọi điện xác nhận đơn hàng và phần quà của bạn trong thời gian sớm nhất.</p>
      </span>
    </div>
    `;
    cart_items.appendChild(li_gift);
  }
  // if (gift && !cart_items.querySelector('.blackfriday__gift')) {
  //   let li_gift = document.createElement("li");
  //   li_gift.className = "blackfriday__gift";
  //   li_gift.innerHTML = `
  //   <a class="product__thumbnail" style="background-image:url(https://sss-dashboard.leanservices.work/upload/11-2021/1637651035392.jpeg)">
  //   </a>
  //   <div>
  //     <h6>QUÀ QUAY THƯỞNG</h6>
  //       <small>${gift}</small>
  //     <div class="price">
  //       <p>0</p>
  //     </div>
  //     <span class="product__variation">
  //       <p>SSStutter sẽ gọi điện xác nhận đơn hàng và phần quà của bạn trong thời gian sớm nhất.</p>
  //     </span>
  //   </div>
  //   `;
  //   cart_items.appendChild(li_gift);
  // }

  total_amount.innerHTML = `${__currency_format(final_amount)}`;
};

export const __to_slug = (str, mark_space = "-") => {
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, mark_space);
  str = str.replace(/^-+/g, "");
  str = str.replace(/-+$/g, "");
  return str;
};
export const __show_cart_quantity = (wrapper) => {
  let purchase_items_list = JSON.parse(localStorage.getItem("cartItem"));
  if (purchase_items_list && purchase_items_list.length) wrapper.innerHTML = `( ${purchase_items_list.length} )`;
};

export const __snow_drop = () => {
  'use strict';

/**
 * Not doing any polyfills, this is a one-off, added fun little extra
 * Assumes window.requestAnimationFrame support, unprefixed CSS Transforms,
 * emoji support, and ES6 support
 */

//Each update cycle should remove this much life from a snowflake
const LIFE_PER_TICK = 1000 / 60;
 //Number of snowflakes
const MAX_FLAKES = Math.min(30, screen.width / 1280 * 30);
//The array of snow particles to be animated. They are HTMLElements
const flakes = [];

//A variety of periodic movement functions for the x-axis to create a range of snow falling models
//The initial multiplier determines how far it moves in vw units at most, from the original
//x-axis position
const period = [
    n => 5 * (Math.sin(n)),
    n => 8 * (Math.cos(n)),
    n => 5 * (Math.sin(n) * Math.cos(2 * n)),
    n => 2 * (Math.sin(0.25 * n) - Math.cos(0.75 * n) + 1),
    n => 5 * (Math.sin(0.75 * n) + Math.cos(0.25 * n) - 1)
];

//Emojis to substitute for snowflakes, just for fun
const fun = ['⛄', '🎁', '🦌', '☃', '🍪'];

//The CSS styles for the snowflakes and container
const cssString = `.snowfall-container {
    display: block;
    height: 100vh;
    left: 0;
    margin: 0;
    padding: 0;
    -webkit-perspective-origin: top center;
            perspective-origin: top center;
    -webkit-perspective: 150px;
            perspective: 150px;
    pointer-events: none;
    position: fixed;
    top: 0;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    width: 100%;
    z-index: 99999; }

  .snowflake {
    pointer-events: none;
    color: #f1f1f1;
    display: block;
    font-size: 24px;
    left: -12px;
    line-height: 24px;
    position: absolute;
    top: -12px;
    -webkit-transform-origin: center;
            transform-origin: center; }`;

// Add a DOMContentLoaded listener, or fire the function immediately if that already happened
function ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Reset a flake to newly randomized values
function resetFlake(flake) {
    // X-axis is in vw CSS units
    let x = flake.dataset.origX = (Math.random() * 100);
    //Y-axis is in CSS vh units
    let y = flake.dataset.origY = 0;

    //Once in awhile, have closer snowflakes
    //Z-axis is in CSS px units
    let z = flake.dataset.origZ = (Math.random() < 0.1) ? (Math.ceil(Math.random() * 100) + 25) : 0;

    let life = flake.dataset.life = (Math.ceil(Math.random() * 4000) + 6000); //Milliseconds
    flake.dataset.origLife = life; //Timestamps for flake creation

    flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
    flake.style.opacity = 0.8;

    //This is the index into the period function array
    flake.dataset.periodFunction = Math.floor(Math.random() * period.length);

    if (Math.random() < 0.001) {
        //Very small chance of some fun happening
        flake.innerText = fun[Math.floor(Math.random() * fun.length)];
    }
}

// Move all the snowflakes
function updatePositions() {

    flakes.forEach((flake) => {
        // Normalize amount of time a snowfalke has been alive to the range [0, 1.0]
        let origLife = parseFloat(flake.dataset.origLife)
        let curLife = parseFloat(flake.dataset.life);
        let dt = (origLife - curLife) / origLife;

        if (dt <= 1.0) {
            // Fetch this flake's personalized periodicity for x-axis movement fromt he array
            let p = period[parseInt(flake.dataset.periodFunction)];
            // Calculate new x-position, relative to original starting x
            let x = p(dt * 2 * Math.PI) + parseFloat(flake.dataset.origX);
            //Snowflakes fall to the bottom of the screen using a straight linear progression over their lifespan
            let y = 100 * dt;
            // Z-depth does not vary over time, although I guess it could?
            let z = parseFloat(flake.dataset.origZ);
            // Each update, change the CSS transformation
            flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;

            if (dt >= 0.5) {
                //Start fading out flakes 1/2 down screen
                flake.style.opacity = (1.0 - ((dt - 0.5) * 2));
            }

            curLife -= LIFE_PER_TICK;
            flake.dataset.life = curLife;
        }
        else {
            //Once the lifespan is exceeded, reset the flake
            resetFlake(flake);
        }
    });

    //Using requestAnimationFrame to update the positions for a (hopefully) smooth animation
    window.requestAnimationFrame(updatePositions);
}


function appendSnow() {
    //Append the CSS styles to the document head
    let styles = document.createElement('style');
    styles.innerText = cssString;
    document.querySelector('head').appendChild(styles);

    //Create the container for the snowflakes and add it to the document body
    let field = document.createElement('div');
    field.classList.add('snowfall-container');

    //set aria-hidden and role=presentation so that screen readers don't read the emoji
    field.setAttribute('aria-hidden', 'true');
    field.setAttribute('role', 'presentation');
    document.body.appendChild(field);

    let i = 0;

    //Using an inner function and setTimeout to delay the initial snowfall
    //This makes it much less clumpy
    const addFlake = () => {
        let flake = document.createElement('span');
        flake.classList.add('snowflake');
        flake.setAttribute('aria-hidden', 'true');
        flake.setAttribute('role', 'presentation');
        flake.innerText = '❄';
        resetFlake(flake);
        flakes.push(flake);
        field.appendChild(flake);

        //Recursive (delayed by timeout) call to add a flake until max reached
        if (i++ <= MAX_FLAKES) {
            setTimeout(addFlake, Math.ceil(Math.random() * 300) + 100);
        }
    };
    addFlake();

    updatePositions();
}

ready(appendSnow);
}