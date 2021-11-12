import { __icons } from "../share/_icons.js";
import pre_order_cart from "./pre_order_cart.js";

function list_campaign_winter() {
  function create_element(e) {
    let dom_create = document.createElement(e);

    return dom_create;
  }

  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }

  let template = create_element("div");
  template.classList.add("list-campaign-page-wrapper");

  function page_header() {
    let cart_quantity = 0;
    if (localStorage.getItem("pre-order-item")) {
      JSON.parse(localStorage.getItem("pre-order-item")).map((item) => {
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

  function section_video() {
    let div = create_element("section");
    div.classList.add("section-video");
    div.innerHTML = `
    <div class="video">
      <video width="100%" autoplay playsinline muted loop>
        <source type="video/mp4" src="/assets/img/SSSTUTTER_Leak_01.mp4">
      </video>
    </div>
    `;

    return div;
  }

  function section_banner() {
    let div = create_element("section");
    div.classList.add("section-banner", "container");
    div.innerHTML = `
    <div class="image" style="background-image: url(/assets/img/editorial/SSSTUTTER9360.jpg)"></div>
    <div class="content">
      <h2>Warm Your Day Up</h2>
      <p>
        Sản phẩm đã kết thúc Preorder và chuẩn bị mở bán chính thức trong
      </p>
      <div>
        <br><br>
        <!--
        <p style="margin-bottom: 4px; color: #444">Ưu đãi giảm 10% khi đặt hàng trước (Pre-Order)</p>
        -->
        <p class="clock" style="min-height: 20px; color: #444"></p><br>
      </div>
      <u style="cursor: pointer; opacity: 0.65;">Xem danh sách sản phẩm</u>
    </div>
    `;

    div.querySelector("u").addEventListener("click", () => {
      document.querySelector("#warm-up").scrollIntoView();
    });

    let end_date = new Date("Nov 12, 2021 21:30:00").getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector(".clock").innerHTML = `
      <span>${hours}</span> giờ 
      <span>${minutes}</span> phút 
      <span>${seconds}</span> giây
      `;

      if (distance < 0) {
        clearInterval(countdown);
        div.querySelector(".clock").innerHTML = `
        <span>00</span> giờ 
        <span>00</span> phút 
        <span>00</span> giây
        `;
      }
    }, 1000);

    return div;
  }

  function section_collections() {
    let div = create_element("section");
    div.classList.add("section-collection", "container");
    div.setAttribute("id", "collection");
    div.innerHTML = `
    <div class="item">
      <a class="image" href="editorial/look/lookbook-1" style="background-image: url(/assets/img/editorial/look1.jpg)"></a>
      <p>1</p>
    </div>

    <div class="item">
      <a class="image" href="/editorial/product/prince-denim-jacket" style="background-image: url(/assets/img/editorial/look9.jpg)"></a>
      <p>2</p>
    </div>
    <div class="item">
      <a class="image" href="editorial/look/lookbook-7" style="background-image: url(/assets/img/editorial/look7.jpg)"></a>
      <p>3</p>
    </div>
    <div class="item">
      <a class="image" href="editorial/look/lookbook-6" style="background-image: url(/assets/img/editorial/look6.jpg)"></a>
      <p>4</p>
    </div>
    <div class="item">
      <a class="image" href="/editorial/product/textured-plaid-jacket" style="background-image: url(/assets/img/editorial/look8.jpg)"></a>
      <p>5</p>
    </div>
    <div class="item">
      <a class="image" href="editorial/look/lookbook-3" style="background-image: url(/assets/img/editorial/look3.jpg)"></a>
      <p>6</p>
    </div>
    
    <div class="item">
      <a class="image" href="editorial/look/lookbook-5" style="background-image: url(/assets/img/editorial/look5.jpg)"></a>
      <p>7</p>
    </div>
    
    <div class="item">
      <a class="image" href="editorial/look/lookbook-2" style="background-image: url(/assets/img/editorial/look2.jpg)"></a>
      <p>8</p>
    </div>
    
    <div class="item" >
      <a class="image" href="/editorial/product/prince-coat" style="background-image: url(/assets/img/editorial/look10.jpg)"></a>
      <p>9</p>
    </div>

    <div class="item" style="grid-column: 2">
      <a class="image" href="editorial/look/lookbook-4" style="background-image: url(/assets/img/editorial/look4.jpg)"></a>
      <p>10</p>
    </div>
    `;

    return div;
  }

  function section_product() {
    let div = create_element("section");
    div.classList.add("section-product");
    div.setAttribute("id", "warm-up");
    div.innerHTML = `
    <div class="product-list"></div>
    `;

    fetch(`https://api.leanservices.work/product/filter/web?catId=newColl&showAll=true&stock=0`, {
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
      data.data.map((product) => {
        let item = create_element("div");
        item.classList.add("item");
        item.innerHTML = `
        <a href="editorial/product/${
          product.slug
        }" class="image" style="background-image:url(https://cdn.ssstutter.com/products/${
          product.extensions.media.featured
        })"></a>
        <p class="name">${product.name.toLowerCase()}</p>
        <p>
          ${(product.price * 0.9).toLocaleString("en-US")} <span class="currency-symbol">₫</span>
          <span style="text-decoration: line-through; display: inline-block; margin-left: 6px; opacity: 0.6">
            ${product.price.toLocaleString("en-US")} <span class="currency-symbol">₫</span>
          </span>
        </p> 
        <p>+${product.color.length} màu</p>
        `;

        div.querySelector(".product-list").appendChild(item);
        return item;
      });
    }

    return div;
  }

  function section_slider_1() {
    let div = create_element("section");
    div.classList.add("section-slide", "slide-1");
    div.innerHTML = `
    <div class="grid-row">
      <div class="glide" id="winter-1">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide">
              <div class="image image-1"></div>
            </li>
            <li class="glide__slide">
              <div class="image image-2"></div>
            </li>
            <li class="glide__slide">
              <div class="image image-3"></div>
            </li>
            <li class="glide__slide">
              <div class="image image-4"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">Warm, tức Ấm áp, được thể hiện qua sự xuất hiện của sản phẩm Coat, Jacket và Sweatshirt. Chất liệu chính là trọng tâm của chúng tôi trong BST : Vải Khaki kháng nước, Denim, vải dạ mịn hay vải nỉ, tất cả đều được chọn lựa kĩ lưỡng bởi chính CEO của SSStutter.</div>
    </div>
    `;

    return div;
  }

  function prince_coat() {
    let div = create_element("section");
    div.classList.add("prince-coat");
    div.innerHTML = `
    <div class="grid-row">
      <div class="content">
        Khaki cao cấp với khả năng kháng nước (Mưa phùn nhẹ, nước bắn) được sử dụng trên mẫu Prince Coat, thích hợp với thời tiết trở lạnh, hoặc cho các chuyến du lịch Đà Lạt, Sapa.
        <br>
        <br>
        <a href="/editorial/product/prince-coat"><u>Xem sản phẩm</u></a>
      </div>
      <div class="image"></div>
    </div>
    `;

    return div;
  }

  function ex_four() {
    let div = create_element("section");
    div.classList.add("ex-four");
    div.innerHTML = `
    <div class="grid-row">
      <div class="image"></div>
      <div class="content">Các Sản phẩm trong BST mới được trang bị bộ Mác SSStutter và Mác Cờ Mỹ hoàn toàn mới, mang hơi hướng hiện đại hơn, thay thế mác nguyên bản.</div>
    </div>
    `;

    return div;
  }

  function section_end() {
    let div = create_element("div");
    div.classList.add("end");
    div.innerHTML = `
    <!--
    <p style="margin-bottom: 4px; color: #444">Ưu đãi giảm 10% khi đặt hàng trước (Pre-Order)</p>
    <p class="clock" style="min-height: 20px; color: #444"></p><br>
    -->
    `;

    let end_date = new Date("Nov 12, 2021 00:00:00").getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector(".clock").innerHTML = `
      Thời gian kết thúc: 
      <span>${days}</span> ngày 
      <span>${hours}</span> giờ 
      <span>${minutes}</span> phút 
      <span>${seconds}</span> giây
      `;

      if (distance < 0) {
        clearInterval(countdown);
        div.querySelector(".clock").innerHTML = ``;
      }
    }, 1000);

    return div;
  }

  template.appendChild(page_header());
  template.appendChild(section_video());
  template.appendChild(section_banner());
  template.appendChild(section_collections());
  template.appendChild(section_product());
  template.appendChild(section_slider_1());
  template.appendChild(prince_coat());
  template.appendChild(ex_four());

  template.appendChild(section_end());

  setTimeout(() => {
    new Glide("#winter-1", {
      type: "slider",
      bound: true,
      perView: 1,
      autoplay: 2000,
      gap: 20,
      hoverpause: true,
      peek: {
        before: 0,
        after: 0,
      },
      breakpoints: {
        1024: {
          perView: 1,
        },
        480: {
          perView: 1,
        },
      },
    }).mount();
  }, 4000);

  return template;
}

export default list_campaign_winter;
