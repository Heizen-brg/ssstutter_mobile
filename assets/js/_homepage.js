import { __banners, __products, __banners_mobile } from "./share/_data.js";
import { __icons } from "./share/_icons.js";



export const __templates_home = {
  banner() {
    let section = document.createElement('section');
    section.className = 'slide__banner';
    section.innerHTML = `
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
          ${(__banners || []).map(item => ` <li class="glide__slide"><div style="background-image:url(${item.url})"></div></li>`).join('')}
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>  
      `;
    setTimeout(() => {
      new Glide('.glide', {
        type: "slider",
        perView: 1,
        autoplay: 5000,
      }).mount();
    }, 100);
    return section;
  },
  mobile_banner() {
    let section = document.createElement('section');
    section.className = 'slide__banner';
    section.innerHTML = `
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
          ${(__banners_mobile || []).map(item => ` <li class="glide__slide"><div style="background-image:url(${item.url})"></div></li>`).join('')}
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
      </div>  
      `;
    setTimeout(() => {
      new Glide('.glide', {
        type: "slider",
        perView: 1,
        autoplay: 5000,
      }).mount();
    }, 100);
    return section;
  },
  categories() {
    let section = document.createElement('section');
    section.className = 'categories__banner';
    section.innerHTML = `
      <div><a href="/" class="categories__banner--left" style="background-image:url('https://ssstutter.com/wp-content/uploads/2021/01/nam.gif')"></a></div>
      <div><a href="/" class="categories__banner--right" style="background-image:url('https://ssstutter.com/wp-content/uploads/2021/01/nu.gif')"></a></div>
    `;
    return section;
  },
  new_arrivals() {
    let section = document.createElement('section');
    section.className = 'new-arrivals__slide';
    section.innerHTML = `
      <h2>what's new</h2>
      <div class="gender__toggle">
        <button>For Him</button>
        <button>For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide" id="new_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${(__products || []).map(item =>
      `
                <li class="glide__slide">
                  <div class="product">
                    <div class="thumbnail">
                      <a href="/"><span style="background-image:url(https://ssstutter.com${item.photo})"></span></a>
                    </div>
                    <h6 class="name">${item.name}</h6>
                    <div class="price">
                      ${item.sale_price == item.price ? '' : `<p class="discount">${item.sale_price}<sup>đ</sup></p>`}
                      <p>${item.price}<sup>đ</sup></p>
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
                  </div>
                </li>
                  `
    ).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      new Glide('#new_arrivals', {
        type: "carousel",
        bound: true,
        perView: 4,
        autoplay: 5000,
        gap: 20,
        hoverpause: true,
        peek: {
          before: 0,
          after: 100
        },
        breakpoints: {
          800: {
            perView: 3
          },
          480: {
            perView: 2
          }
        }
      }).mount();
    }, 100);
    return section;
  },
  mobile_new_arrivals() {
    let section = document.createElement('section');
    section.className = 'new-arrivals__slide';
    section.innerHTML = `
      <h2>what's new</h2>
      <div class="gender__toggle">
        <button>For Him</button>
        <button>For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide" id="new_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${(__products || []).map((item, index) => {
      return `       
                <li class="glide__slide">
                  <div class="product">
                    <div class="thumbnail">
                      <a href="/"><span style="background-image:url(https://ssstutter.com${item.photo})"></span></a>
                    </div>
                    <h6 class="name">${item.name}</h6>
                    <div class="price">
                      ${item.sale_price == item.price ? '' : `<p class="discount">${item.sale_price}<sup>đ</sup></p>`}
                      <p>${item.price}<sup>đ</sup></p>
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
                  </div>
                  <div class="product">
                    <div class="thumbnail">
                      <a href="/"><span style="background-image:url(https://ssstutter.com${item.photo})"></span></a>
                    </div>
                    <h6 class="name">${item.name}</h6>
                    <div class="price">
                      ${item.sale_price == item.price ? '' : `<p class="discount">${item.sale_price}<sup>đ</sup></p>`}
                      <p>${item.price}<sup>đ</sup></p>
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
                  </div>
                </li>
                  `
    }
    ).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      new Glide('#new_arrivals', {
        type: "carousel",
        bound: true,
        perView: 4,
        autoplay: 5000,
        gap: 10,
        hoverpause: true,
        peek: {
          before: 0,
          after: 100
        },
        breakpoints: {
          800: {
            perView: 3
          },
          480: {
            perView: 2,
            peek: {
              before: 0,
              after: 0
            },
          }
        }
      }).mount();
    }, 100);
    return section;
  },
  stylepick() {
    let section = document.createElement('section');
    section.className = 'stylepick__slide';
    section.innerHTML = `
      <h2>style pick</h2>
      <div class="products__slider">
        <div class="glide" id="stylepick">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${(__products || []).map(item =>
      `
                <li class="glide__slide">
                  <div class="product">
                    <div class="thumbnail">
                      <a href="/"><span style="background-image:url(https://ssstutter.com${item.photo})"></span></a>
                    </div>
                    <h6 class="name">${item.name}</h6>
                    <div class="price">
                      ${item.sale_price == item.price ? '' : `<p class="discount">${item.sale_price}<sup>đ</sup></p>`}
                      <p>${item.price}<sup>đ</sup></p>
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
                  </div>
                </li>
                  `
    ).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      new Glide('#stylepick', {
        type: "carousel",
        bound: true,
        perView: 3,
        autoplay: 5000,
        gap: 10,
        hoverpause: true,
        breakpoints: {
          800: {
            perView: 2
          },
          460: {
            perView: 1,
            peek: {
              before: 50,
              after: 50
            }
          },
        }
      }).mount();
    }, 100);
    return section;
  },
  weekly() {
    let section = document.createElement('section');
    section.className = 'weekly__best';
    section.innerHTML = `
      <h2>weekly best</h2>
      <div class="gender__toggle">
        <button>For Him</button>
        <button>For Her</button>
      </div>
      <ul class="weekly__best--list">
        ${(__products || []).map(item => ` 
        <li>
          <div class="product">
          <div class="thumbnail">
            <a href="/"><span style="background-image:url(https://ssstutter.com${item.photo})"></span></a>
          </div>
          <h6 class="name">${item.name}</h6>
          <div class="price">
            ${item.sale_price == item.price ? '' : `<p class="discount">${item.sale_price}<sup>đ</sup></p>`}
            <p>${item.price}<sup>đ</sup></p>
          </div>
          ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
          </div>
        </li>`).join('')}
      </ul>
    `;

    return section;
  },
  blog() {
    let section = document.createElement('section');
    section.className = 'blog';
    section.innerHTML = `
    <h2>ssstory</h2>
    <ul class="blog__list">
      <li>
        <a href="/">
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/01.bia_-scaled.jpg)"></span>
          <p>GIẢI MÃ SỰ IM LẶNG</p>
        </a>
      </li>
      <li>
        <a href="/">
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/02/0-BIA-1-scaled.jpg)"></span>
          <p>NHỮNG SUY NGHĨ NÀO ĐANG KIỂM SOÁT SỰ HẠNH PHÚC CỦA BẠN?</p>
        </a>
      </li>
      <li>
        <a href="/">
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/01.bia_.gif)"></span>
          <p>ĐAM MÊ - ÁP LỰC HAY ĐỘNG LỰC?</p>
        </a>
      </li>
      <li>
        <a href="/">
          <span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/K-CHU-17-scaled.jpg)"></span>
          <p>NĂM 2021 - ĐÂY LÀ 5 KHOẢN ĐẦU TƯ ĐÁNG GIÁ NHẤT DÀNH CHO BẢN THÂN</p>
        </a>
      </li>
    </ul>
    `;
    return section
  },
  lookbook() {
    let section = document.createElement('section');
    section.className = 'lookbook';
    section.innerHTML = `
      <h2>lookbook</h2>
      <div class="lookbook__list">
        <div class="glide" id="lookbook">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                  <a href="/"  target="_blank" style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/02/R.M-BANNER.gif)"></a>
                </li>
                <li class="glide__slide">
                  <a href="/"  target="_blank" style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/04/banner-final.jpg)"></a>
                </li>
                <li class="glide__slide">
                  <a href="/"  target="_blank" style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/20201021_SSS_LB-107-1-scaled.jpg)"></a>
                </li>
                <li class="glide__slide">
                  <a href="/"  target="_blank" style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/01/WIN-COAT.gif)"></a>
                </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      new Glide('#lookbook', {
        type: "carousel",
        bound: true,
        perView: 2,
        gap: 20,
        hoverpause: true,
        peek: {
          before: 100,
          after: 100
        },
        breakpoints: {
          800: {
            perView: 1,
            peek: {
              before: 50,
              after: 50
            },
          },
        }
      }).mount();
    }, 100);
    return section
  },


};