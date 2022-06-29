import { __templates } from "../share/_components.js";
import { __render, __requests } from "../main.js";
import {
  __currency_format,
  __get_voucher,
  __init_product_list,
  __push_notification,
} from "../share/_function.js";
import { __icons } from "../share/_icons.js";
import { CONFIG } from "../config.js";
let order_data = {
  customerPhone: "",
  customerName: "",
  customerEmail: "",
  items: "",
  shippingAddress: "",
};
let typing_timer = null;
let shippingFormat = {
  city: "",
  district: "",
  ward: "",
  address: "",
};
let user_selection = {};
let product;
export const __templates_pant = {
  smart_pant() {
    let div = document.createElement('div');
    div.className = 'main__block'
    div.innerHTML = `
      <figure class="poster">
        <img src="/assets/img/flash_sale/SMP/1.jpg" loading="lazy"/>
      </figure>
      <div class="glide" id="landing_pant">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/SMP/2.0.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/SMP/2.1.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/SMP/2.2.jpg"/></li>
            <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/SMP/2.3.jpg"/></li>
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div> 
      <div class="video">
        <video preload="none" src="/assets/img/flash_sale/FIT/Fit-pant.mp4" autoplay="false" muted="false" loop="true">
        </video>  
      </div> 
      <figure">
        <img src="/assets/img/flash_sale/SMP/3.jpg" loading="lazy"/>
      </figure> 
      <div>
        <img src="/assets/img/flash_sale/SMP/4.jpg" loading="lazy"/>
        <img src="/assets/img/flash_sale/SMP/5.jpg" loading="lazy"/>
      </div>
 
    `;
    let poster = div.querySelector('.poster');
    poster.addEventListener('click',(e)=> {
      let form = document.querySelector('.checkout__landing')
        form.scrollIntoView({ behavior: "smooth", block: "start" });
    })
  setTimeout(() => {
    new Glide("#landing_pant", {
      type: "slider",
      bound: true,
      perView: 1,
      gap: 0,
    }).mount();
  }, 200);
    return div;
  },
  fit_pant() {
    let div = document.createElement('div');
    div.className = 'main__block'
    div.innerHTML = `
      <figure class="poster">
        <img src="/assets/img/flash_sale/FIT/1.jpg" loading="lazy"/>
      </figure>
      <div class="glide" id="landing_fit_pant">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
          <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/FIT/2.1.jpg"/></li>
          <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/FIT/2.2.jpg"/></li>
          <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/FIT/2.3.jpg"/></li>
          <li class="glide__slide"><img loading="lazy" src="/assets/img/flash_sale/FIT/2.4.jpg"/></li>
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>  
      <div class="video">
        <video preload="none" src="/assets/img/flash_sale/FIT/Fit-pant.mp4" autoplay="false" muted="false" loop="true">
        </video>  
      </div>
      <figure"> 
        <img src="/assets/img/flash_sale/FIT/3.jpg" loading="lazy"/>
      </figure> 
      <div>
        <img src="/assets/img/flash_sale/FIT/4.jpg" loading="lazy"/>
        <img src="/assets/img/flash_sale/FIT/5.jpg" loading="lazy"/>
      </div>
 
    `;
  let poster = div.querySelector('.poster');
  poster.addEventListener('click',(e)=> {
    let form = document.querySelector('.checkout__landing')
      form.scrollIntoView({ behavior: "smooth", block: "start" });
  })
  setTimeout(() => {
    new Glide("#landing_fit_pant", {
      type: "slider",
      bound: true,
      perView: 1,
      gap: 0,
    }).mount();
  }, 200);
    return div;
  },
  checkout_form(params) {
    let div = document.createElement("div");
    div.className = "checkout__landing";
    div.innerHTML = `
      <h1>Thông tin đặt hàng</h1>
      <div class="landing__form">
        <img  src="/assets/img/flash_sale/${params}/7.jpg" loading="lazy"/>
        <div>
          <div class="color">
            <p>chọn màu : <strong class="color__name"> </strong></p>
            <ul>
            
            </ul>
          </div>
          <div class="size">
            <div><p>chọn size : <strong class="size__name"> </strong></p></div>
            <ul>

            </ul>
          </div>
          <form>
            <input data-value="customer_name" type="text" placeholder="* Họ & Tên" required />
            <input data-value="customer_email" type="email" placeholder="Email" required />
            <input data-value="customer_phone" type="text" placeholder="* Số điện thoại" required />
            <div>
              <select data-value="customer_city" required>
                <option selected value="none" hidden>* Chọn Tỉnh/Thành Phố</option>
              </select>
              <select data-value="customer_district" required>
                <option selected value="none" hidden>* Chọn Quận/Huyện</option>
              </select>
              <select data-value="customer_ward" required>
                <option selected value="none" hidden>* Chọn Phường/Xã</option>
              </select>
            </div>
            <input data-value="customer_address" required type="text" placeholder="* Số nhà tên đường..." />
            <small style="color:gray">(*) là trường không được để trống</small>
            <button type="button" data-action="purchase">ĐẶT HÀNG NGAY</button>
          </form>
        </div>
      </div>
    `;
    let customer_name = div.querySelector('[data-value="customer_name"]');
    let customer_phone = div.querySelector('[data-value="customer_phone"]');
    let customer_address = div.querySelector('[data-value="customer_address"]');
    let customer_email = div.querySelector('[data-value="customer_email"]');
    let customer_city = div.querySelector('[data-value="customer_city"]');
    let customer_district = div.querySelector('[data-value="customer_district"]');
    let customer_ward = div.querySelector('[data-value="customer_ward"]');
    let confirm_btn = div.querySelector('[data-action="purchase"]');
    // get address
    let get_location_data = (selected_dom, type = "city", parent_id = null) => {
      __requests(
        {
          method: "GET",
          url: `w/get-location?type=${type}&parent_id=${parent_id}`,
        },
        (res) => {
          let location_data = (res.data || [])
            .map((location) => {
              return `
        <option value="${location.id}">${location.name}</option>
        `;
            })
            .join("");
          if (type == "city") {
            selected_dom.innerHTML += location_data;
          } else if (type == "district") {
            selected_dom.innerHTML = `
              <option value="none" selected disabled hidden>Chọn Quận/Huyện</option>
                ${location_data}
          `;
          } else {
            selected_dom.innerHTML = `
            <option value="none" selected disabled hidden>Chọn Xã/Phường</option>
              ${location_data}
          `;
          }
        }
      );
    };

    let get_product_data = () => {
      __requests({
        method: "GET",
        url : `https://leanservices.work/pd/filter/web?webStock=true&slug=fit-pants&media=true`,
      },({data}) => {
        product = data[0]
        let init_flatlay_img = (params) => {
          let media = params.extensions.media;
          let colors_arr = params.color;
          let color_value = colors_arr.map((color) => {
            return {
              id: color.id,
              name: color.name,
              value: color.value,
              photo: media[`color_${color.id}_thumbnail`],
            };
          });
          color_value.map((item, index) => {
            let isStock = Object.values(params.variation)
              .filter((i) => String(i.color) === String(item.id))
              .some((i) => i.isStock);
            let flat_color = document.createElement("li");
            flat_color.innerHTML = `
            <button 
              class="color__variation" 
              ${isStock ? "" : "disabled"}
              data-color='${JSON.stringify(item)}'
              data-index="${index}"
              style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${
              item.photo == null ? "no_image.png" : item.photo.x400.replace(".jpeg", ".jpeg")
            })"
            >
            </button>
            `;
            let color_variation = div.querySelector(".color > ul");
            color_variation.appendChild(flat_color);
            init_size({product : product, color : color_value[0].id});
            return flat_color;
          });
        };
        let init_size = (params) => {
          user_selection.size = 0;
          let size_wrapper = div.querySelector(".size > ul");
          let size_arr = Object.values(params.product.variation)
            .filter((i) => String(i.color) === String(params.color))
            .map((j) => {
              return {
                size: j.size,
                isStock: j.isStock,
              };
            });
          let size_render = size_arr
            .sort((a, b) => a.size - b.size)
            .map((i, index) => {
              return `
            <li><button data-index="${index}" class=" size__variation ${
                user_selection.size ? "active" : ""
              }" 
              ${i.isStock || params.preOrder ? "" : "disabled"} data-value="${
                i.size
              }">${i.size}</button></li>`;
            })
            .join("");
          size_wrapper.innerHTML = size_render;
          let size_variation = div.querySelectorAll(".size__variation");
          size_variation.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              let size_select = div.querySelector(".size__name");
              size_select.innerHTML = btn.dataset.value;
              e.preventDefault();
              size_variation.forEach((btn) => btn.classList.remove("active"));
              btn.classList.add("active");
              user_selection.size = btn.dataset.value;
              
            });
          });
        };

        let on_change_variation = (params) => {
          let color_variation = div.querySelectorAll(".color__variation");
          color_variation.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              let color_name_select = div.querySelector(".color__name");
              let color = JSON.parse(btn.dataset.color);
              color_name_select.innerHTML = color.name;
              color_variation.forEach((btn) => btn.classList.remove("active"));
              btn.classList.add("active");
              user_selection.colorId = color.id;
              init_size({product: product,color :color.id});
            });
          });
        };
        init_flatlay_img(data[0]);
        on_change_variation(data[0]);

      })
    }

    get_product_data();
    //  address shipping
    get_location_data(customer_city);
    customer_name.addEventListener("change", (e) => {
      order_data.customerName = e.target.value;
    });
    customer_phone.addEventListener("change", (e) => {
      let re = /^(?:(?:\+)84|0)\d{9}$/;
      if (re.test(e.target.value)) {
        order_data.customerPhone = e.target.value;
        customer_phone.classList.remove("error");
      } else {
        customer_phone.classList.add("error");
        __push_notification("fail", "Số điện thoại không hợp lệ !");
      }
    });
    customer_email.addEventListener("change", (e) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        order_data.customerEmail = e.target.value;
        customer_email.classList.remove("error");
      } else {
        customer_email.classList.add("error");
        __push_notification("fail", "Email không hợp lệ !");
      }
    });
    customer_city.addEventListener("change", (e) => {
      let selected = customer_city.querySelector("option:checked");
      get_location_data(customer_district, "district", e.target.value);
      get_location_data(customer_ward, "ward", e.target.value);
      shippingFormat.city = selected.textContent;
    });
    customer_district.addEventListener("change", (e) => {
      let selected = customer_district.querySelector("option:checked");
      get_location_data(customer_ward, "ward", e.target.value);
      shippingFormat.district = selected.textContent;
    });
    customer_ward.addEventListener("change", (e) => {
      let selected = customer_ward.querySelector("option:checked");
      shippingFormat.ward = selected.textContent;
    });
    customer_address.addEventListener("change", (e) => {
      shippingFormat.address = e.target.value;
      let total = document.querySelector('[data-amount="total"]');
    });

    confirm_btn.addEventListener("click", () => {
      // let gift_purchased = JSON.parse(localStorage.getItem("giftItem")) || "";
      // let gift2_purchased = JSON.parse(localStorage.getItem("giftItem2")) || "";
      let order_item = {
        id: '',
        quantity: 1
      }
      let select_variation = product.variation.find(
        (item) => item.color == user_selection.colorId && item.size == user_selection.size
      );
      order_item.id = select_variation.id
      order_data.items = [order_item]
      order_data.shippingAddress = `${shippingFormat.address}, ${shippingFormat.ward},${shippingFormat.district},${shippingFormat.city}`;
      if (
        !order_data.customerName ||
        !order_data.customerPhone ||
        !order_data.customerEmail ||
        !order_data.shippingAddress ||
        !shippingFormat.address ||
        !shippingFormat.ward ||
        !shippingFormat.district ||
        !shippingFormat.city
      ) {
        __push_notification("fail", "Vui lòng điển đủ thông tin");
        return;
      }
      __templates.api_loading("show");
      __requests(
        {
          method: "POST",
          url: "https://leanservices.work/order/order/web/create",
          header: { Authorization: "by-passs", "Content-Type": "application/json" },
          body: JSON.stringify(order_data),
        },
        ({ data, error }) => {
          __render.order_page(data);
        }
      );
    });
    return div;
  },
};