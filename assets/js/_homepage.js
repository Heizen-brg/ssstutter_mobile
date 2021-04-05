import { __banners } from "./share/_data.js";
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
      <h2>sản phẩm mới nhất</h2>
      <div class="gender__toggle">
        <button>For Him</button>
        <button>For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide">
              <div class="product">
                <div class="thumbnail">
                  <a href="/"><span style="background-image:url(https://ssstutter.com/wp-content/uploads/2021/03/RetroDenimShirt_Dam_PT_2.jpg)"></span></a>
                </div>
                <h6 class="name">Name</h6>
                <div class="price">
                  <p class="discount">299.000</p>
                  <p>499.000</p>
                </div>
                <p class="tag">10%</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `;
    return section;
  },
  lookbook() {

  },
  blog() {

  },

};