import { __requests } from "../main.js";
import { __templates } from "./_components.js";
import { __icons } from "./_icons.js";

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
      url: `product/filter/web${url}&media=true&webStock=true`,
    },
    ({ data, error }) => {
      if (!data.length) return params.container.innerHTML = `<p>Không có sản phẩm</p>`;
      __templates.api_loading("hide");
      let products = (data || []).map((item) => {
        window.product_ids.push(item.id);
        let product_template = document.createElement("li");
        product_template.dataset.gender = item.gender;
        product_template.dataset.price = item.price;
        product_template.dataset.sale = item.discount;
        product_template.innerHTML = `
      <div class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
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
      <a href="/p/${prod.slug
        }" class="product__thumbnail" style="background-image:url(https://api.leanservices.work/product/static/${prod.media[`color_${prod.colorId}_thumbnail`]
          ? prod.media[`color_${prod.colorId}_thumbnail`].x100.replace(".jpeg", ".webp")
          : "no_image.png"
        })">
      </a>
      <div>
        <h6>${prod.name}</h6>
        <span class="product__variation">
          <p>${prod.colorName}, ${prod.size}</p>
        </span>
        <strong>${__currency_format(prod.salePrice || prod.price)}</strong>
        <div class="add__product">
          <button data-id="${prod.variation.id}" data-quantity="descrease">-</button>
          <input data-index=${index} value="${prod.quantity}" type="number"/>
          <button data-id="${prod.variation.id}" data-quantity="inscrease">+</button>
        </div>
      </div>
      <div class="clear__product" value="${prod.quantity}" data-index=${index}>${__icons.bin}</div>
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
          __templates.api_loading('show');
          __requests(
            {
              method: "GET",
              url: `product/variation/check-stock?id=${btn.dataset.id}&stock=${parseInt(input_quantity.value) + 1}`,
            },
            ({ data }) => {
              __templates.api_loading('hide');
              if (!data) return __push_notification("fail", "Sản phẩm hết hàng!");
              input_quantity.value++;
              init_quantity_value(input_quantity.value, input_quantity.dataset.index);
            }
          );
        } else {
          if (input_quantity.value == 0) return false;
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
      // let total_amount_arr = purchase_items_list.map(
      //   (item) => item.quantity * item.price
      // );
      // let total_amount = total_amount_arr.reduce((a, b) => a + b, 0);
      let total_amount = purchase_items_list.reduce((total, current) => {
        if (current.salePrice) return total + current.quantity * current.salePrice;
        return total + current.quantity * current.price;
      }, 0);
      total.innerHTML = __currency_format(total_amount);
      total.dataset.price = total_amount;
      let customer_phone = document.querySelector('[data-value="customer_phone"]');
      localStorage.setItem("cartItem", JSON.stringify(purchase_items_list));
      __get_voucher(customer_phone.value, __check_shipping)
      // __check_shipping();
      // let address = {
      //   city: div.querySelector('[data-value="customer_city"]').value,
      //   district: div.querySelector('[data-value="customer_district"]').value,
      //   ward: div.querySelector('[data-value="customer_ward"]').value,
      //   address: div.querySelector('[data-value="customer_address"]').value,
      // };
      // let final_price = document.querySelector('[data-amount="total"]').dataset.price || 0
      // let customer_district = div.querySelector('[data-value="customer_district"]');
      // let customer_ward = div.querySelector('[data-value="customer_ward"]');
      // let customer_address = div.querySelector('[data-value="customer_address"]');
    };

    del_btn.addEventListener("click", (e) => {
      e.preventDefault();
      purchase_items_list.splice(del_btn.dataset.index, 1);
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
      localStorage.setItem("cartItem", JSON.stringify(purchase_items_list));
      __get_voucher(customer_phone);
      __show_cart_quantity(document.querySelector('[data-toggle="cart_toggle"]'));
      del_btn.parentNode.remove();
    });
  });
};

export const __check_shipping = () => {
  // console.log(document.querySelector('[data-value="customer_city"]').selected)
  let shippingFormat = {
    city: document.querySelector('[data-value="customer_city"]').querySelector("option:checked").textContent,
    district: document.querySelector('[data-value="customer_district"]').querySelector("option:checked").textContent,
    ward: document.querySelector('[data-value="customer_ward"]').querySelector("option:checked").textContent,
    address: document.querySelector('[data-value="customer_address"]').value,
  };
  let final_price = document.querySelector('[data-amount="total"]').dataset.price || 0
  let shippingAddress = `${shippingFormat.address}, ${shippingFormat.ward},${shippingFormat.district},${shippingFormat.city}`;
  console.log(final_price);
  __requests({
    method: "POST",
    url: `order/shipping/fee/web`,
    body: JSON.stringify({
      moneyTotal: final_price,
      shippingAddress: shippingAddress
    })
  }, ({ data, error }) => {
    if (error) return false;
    let total = document.querySelector('[data-amount="total"]')
    let shipping_fee = document.querySelector('[data-amount="shipping"]')
    // total.innerHTML = __currency_format(parseInt(total.dataset.price) * + data);
    shipping_fee.innerHTML = __currency_format(parseInt(data));
    shipping_fee.dataset.price = data;
    __calc_final_amount();
  })
}

export const __get_voucher = (customerPhone, callback) => {
  let items_purchased = JSON.parse(localStorage.getItem("cartItem"));
  let products = items_purchased.map((item) => {
    return {
      id: item.variation.id,
      quantity: parseInt(item.quantity),
      price: parseInt(item.salePrice) || parseInt(item.price),
    };
  });
  __requests(
    {
      method: "POST",
      url: `order/voucher/customer-voucher`,
      body: JSON.stringify({
        customerPhone: customerPhone,
        items: products,
      }),
    },
    ({ data }) => {
      let discount_amount = document.querySelector('[data-amount="discount"]');
      discount_amount.dataset.price = data.amount;
      discount_amount.innerHTML = `-${__currency_format(data.amount)}`;
      __calc_final_amount()
      if (callback) callback()
    }
  );
};

export const __calc_final_amount = () => {
  let purchase_amount = document.querySelector('[data-amount="purchase"]');
  let discount_amount = document.querySelector('[data-amount="discount"]');
  let total_amount = document.querySelector('[data-amount="total"]');
  let shipping_amount = document.querySelector('[data-amount="shipping"]');
  let purchase = parseInt(purchase_amount.dataset.price) || 0
  let discount = parseInt(discount_amount.dataset.price) || 0
  let shipping = parseInt(shipping_amount.dataset.price) || 0
  total_amount.dataset.price = purchase + shipping - discount
  console.log('sdasd');
  total_amount.innerHTML = `${__currency_format(purchase + shipping - discount)}`;

}

export const __to_slug = (str, mark_space = '-') => {
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  str = str.replace(/([^0-9a-z-\s])/g, '');
  str = str.replace(/(\s+)/g, mark_space);
  str = str.replace(/^-+/g, '');
  str = str.replace(/-+$/g, '');
  return str;
};
export const __show_cart_quantity = (wrapper) => {
  let purchase_items_list = JSON.parse(localStorage.getItem("cartItem"));
  if (purchase_items_list && purchase_items_list.length) wrapper.innerHTML = `( ${purchase_items_list.length} )`;
};
