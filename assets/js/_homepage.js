import { __banners, __products, __banners_mobile } from "./share/_data.js";
import { __icons } from "./share/_icons.js";
import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";


export const __templates_home = {
  hide_menu() {
    let gender = document.querySelectorAll('[data-gender]');
    let triggers = document.querySelectorAll('[data-active]')
    triggers.forEach(item => item.classList.remove('active'));
    gender.forEach(block => {
      block.classList.remove('active');
    });
  },
  show_menu(item) {
    item.classList.add('active');
    let gender = document.querySelectorAll('[data-gender]');
    gender.forEach(container => {
      container.dataset.gender == item.dataset.active ? container.classList.add('active') : container.classList.remove('active');
    })
  },
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
  new_arrivals(product = {}) {
    let section = document.createElement('section');
    section.className = 'new-arrivals__slide';
    section.innerHTML = `
      <h2>what's new</h2>
      <div class="gender__toggle">
        <button data-active="male_arrivals" class="active">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide active" data-gender="male_arrivals" id="male_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading('show')}
            </ul>
          </div>
        </div>
        <div class="glide" data-gender="female_arrivals" id="female_arrivals">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading('show')}
            </ul>
          </div>
        </div>
      </div>
    `;
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=35&limit=10',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let products = (res || []).map(item =>
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
      ).join('');
      let glide__track = section.querySelector('#male_arrivals .glide__slides');
      glide__track.innerHTML = products;
      new Glide('#male_arrivals', {
        type: "slider",
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
    })
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=39&limit=10',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let products = (res || []).map(item =>
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
      ).join('');
      let glide__track = section.querySelector('#female_arrivals .glide__slides');
      glide__track.innerHTML = products;
      new Glide('#female_arrivals', {
        type: "slider",
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
    })
    let toggle_gender = section.querySelectorAll('[data-active]');
    toggle_gender.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
        }
      })
    })
    return section;
  },
  mobile_new_arrivals() {
    let section = document.createElement('section');
    section.className = 'new-arrivals__slide';
    section.innerHTML = `
      <h2>what's new</h2>
      <div class="gender__toggle">
        <button class="active" data-active="male_arrivals">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide active" data-gender="male_arrivals" id="male_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading('show')}
            </ul>
          </div>
        </div>
        <div class="glide" data-gender="female_arrivals" id="female_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading('show')}
            </ul>
          </div>
        </div>
      </div>
    `;
    let toggle_gender = section.querySelectorAll('[data-active]');
    toggle_gender.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
        }
      })
    })
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=35&limit=10',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let item_per_view = 4;
      let stop_loop = Math.ceil(res.length / item_per_view);
      let products = (res || []).map((item, index) => {
        let current_index = index * 2;
        if (index - 1 > stop_loop) return '';
        item = res[current_index];
        if (!item) return '';
        let next_item = res[current_index + 1];
        if (next_item) {
          next_item = `
          <div class="product">
            <div class="thumbnail">
              <a href="/"><span style="background-image:url(https://ssstutter.com${next_item.photo})"></span></a>
            </div>
            <h6 class="name">${next_item.name}</h6>
            <div class="price">
              ${next_item.sale_price == next_item.price ? '' : `<p class="discount">${next_item.sale_price}<sup>đ</sup></p>`}
              <p>${next_item.price}<sup>đ</sup></p>
            </div>
            ${next_item.discount > 0 ? `<p class="tag">${next_item.discount}%</p>` : ''}
          </div>
          `
        } else next_item = '';

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
          ${next_item}
      </li>
        `
      }).join('');
      let glide__track = section.querySelector('#male_arrivals .glide__slides');
      glide__track.innerHTML = products;
      new Glide('#male_arrivals', {
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
    })
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=39&limit=10',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let item_per_view = 4;
      let stop_loop = Math.ceil(res.length / item_per_view);
      let products = (res || []).map((item, index) => {
        let current_index = index * 2;
        if (index - 1 > stop_loop) return '';
        item = res[current_index];
        if (!item) return '';
        let next_item = res[current_index + 1];
        if (next_item) {
          next_item = `
          <div class="product">
            <div class="thumbnail">
              <a href="/"><span style="background-image:url(https://ssstutter.com${next_item.photo})"></span></a>
            </div>
            <h6 class="name">${next_item.name}</h6>
            <div class="price">
              ${next_item.sale_price == next_item.price ? '' : `<p class="discount">${next_item.sale_price}<sup>đ</sup></p>`}
              <p>${next_item.price}<sup>đ</sup></p>
            </div>
            ${next_item.discount > 0 ? `<p class="tag">${next_item.discount}%</p>` : ''}
          </div>
          `
        } else next_item = '';

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
          ${next_item}
      </li>
        `
      }).join('');
      let glide__track = section.querySelector('#female_arrivals .glide__slides');
      glide__track.innerHTML = products;
      new Glide('#female_arrivals', {
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
    })
    return section;
  },
  stylepick() {
    let section = document.createElement('section');
    section.className = 'stylepick__slide';
    section.innerHTML = `
      <h2>style pick</h2>
      <div class="products__slider">
        <div class="glide active" id="stylepick">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading('show')}
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
          </div>
        </div>
      </div>
    `;
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=35&limit=10',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let product = (res || []).map(item =>
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
      ).join('');
      let glide = section.querySelector('.glide__slides')
      glide.innerHTML = product;
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

    });
    return section;
  },
  weekly() {
    let section = document.createElement('section');
    section.className = 'weekly__best';
    section.innerHTML = `
      <h2>weekly best</h2>
      <div class="gender__toggle">
        <button class="active" data-active="male_arrivals">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <ul data-gender="male_arrivals" class="weekly__best--list active">
        ${__templates.busy_loading('show')}
      </ul>
      <ul data-gender="female_arrivals" class="weekly__best--list">
        ${__templates.busy_loading('show')}
      </ul>
    `;
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=35&limit=8',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let product = (res || []).map(item => ` 
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
      </li>`).join('');
      let glide = section.querySelector('[data-gender="male_arrivals"]')
      glide.innerHTML = product;

    });
    __requests({
      method: 'GET',
      url: 'https://sss.leanservices.work/services/sssearch?cat=39&limit=8',
      header: {
        authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
      },
    }, (res) => {
      let product = (res || []).map(item => ` 
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
      </li>`).join('');
      let glide = section.querySelector('[data-gender="female_arrivals"]')
      glide.innerHTML = product;
    });
    let toggle_gender = section.querySelectorAll('[data-active]');
    toggle_gender.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
        }
      })
    })
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