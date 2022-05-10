import { __requests } from "../main.js";
import { __templates } from "../share/_components.js";
import { __currency_format, __init_product_list } from "../share/_function.js";
import { __icons } from "../share/_icons.js";
import { __templates_modal } from "../share/_modal.js";
export const __templates_parisienne = {
  parisienne_campaign(params) {
      let div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
      <div class="text__img">      
        <img class="start" src="/assets/img/self_portrait/text/start.png"/>
        <img class="start small" src="/assets/img/self_portrait/text/small.png"/>
      </div>
      </div>
      <section class="section__layout">
        <div class="hero__layout" >
          <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/4-2022/1650337157221.jpeg)" >
          </div>
        </div>
        <div class=grid-row>
          <div class="image__featured" data-cat="herCate1" data-featured="/assets/img/self_portrait/lookbook/look1.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look1.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
          <div class="image__featured" data-cat="herCate2" data-featured="/assets/img/self_portrait/lookbook/look2.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look2.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
        </div>
        <div class=grid-row>
          <div class="image__featured" data-cat="herCate3" data-featured="/assets/img/self_portrait/lookbook/look3.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look3.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
          <div class="image__featured" data-cat="herCate4" data-featured="/assets/img/self_portrait/lookbook/look4.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look4.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="text__img">
        <img class="small" src="/assets/img/self_portrait/text/mid.png"/>
      </div>
      <section class="section__layout">
        <div class="hero__layout" >
          <div style="background-image:url(https://sss-dashboard.leanservices.work/upload/4-2022/1650345211594.jpeg)" >
          </div>
        </div>
        <div class=grid-row>
          <div class="image__featured" data-cat="herCate5" data-featured="/assets/img/self_portrait/lookbook/look5.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look5.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
          <div class="image__featured" data-cat="herCate6" data-featured="/assets/img/self_portrait/lookbook/look6.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look6.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
        </div>        
        <div class=grid-row>
          <div class="image__featured" data-cat="herCate7" data-featured="/assets/img/self_portrait/lookbook/look7.1.jpg" style="background-image: url(/assets/img/self_portrait/lookbook/look7.jpg)">
            <div class="product-opacity">
              <div class="product-content">
                <p>see more....</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      <div class="text__img">      
        <img class="medium" src="/assets/img/self_portrait/text/end.png"/>
      </div>
      <section class="section__slide">
        <h3><b>Shop the collection</b></h3>
        <div class="glide" id="winter-1">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide">
                <div class="image" data-color="100" data-cat="herCate1" data-img="/assets/img/self_portrait/model/1.jpg" data-img1="/assets/img/self_portrait/model/1.1.jpg" data-img2="/assets/img/self_portrait/model/1.2.jpg" style="background-image: url(/assets/img/self_portrait/model/1.jpg)">
                  <p>Look 1</p>
                </div>
              </li>

              <li class="glide__slide">
                <div class="image" data-color="503" data-cat="herCate2" data-img="/assets/img/self_portrait/model/2.jpg" data-img1="/assets/img/self_portrait/model/2.1.jpg" data-img2="/assets/img/self_portrait/model/2.2.jpg" style="background-image: url(/assets/img/self_portrait/model/2.jpg)">
                  <p>Look 2</p>
                </div>
              </li>
              <li class="glide__slide">
                <div class="image" data-color="100" data-cat="herCate3" data-img="/assets/img/self_portrait/model/3.jpg" data-img1="/assets/img/self_portrait/model/3.1.jpg" data-img2="/assets/img/self_portrait/model/3.2.jpg" style="background-image: url(/assets/img/self_portrait/model/3.jpg)">
                  <p>Look 3</p>
                </div>
              </li>
              <li class="glide__slide">
                <div class="image"  data-color="100" data-cat="herCate4" data-img="/assets/img/self_portrait/model/4.jpg" data-img1="/assets/img/self_portrait/model/4.1.jpg" data-img2="/assets/img/self_portrait/model/4.2.jpg" style="background-image: url(/assets/img/self_portrait/model/4.jpg)">
                  <p>Look 4</p>
                </div>
              </li>
              <li class="glide__slide">
                <div class="image" data-color="100" data-cat="herCate5" data-img="/assets/img/self_portrait/model/5.jpg" data-img1="/assets/img/self_portrait/model/5.1.jpg" data-img2="/assets/img/self_portrait/model/5.2.jpg" style="background-image: url(/assets/img/self_portrait/model/5.jpg)">
                  <p>Look 5</p>
                </div>
              </li>
              <li class="glide__slide">
                <div class="image" data-color="100" data-cat="herCate6" data-img="/assets/img/self_portrait/model/6.jpg" data-img1="/assets/img/self_portrait/model/6.1.jpg" data-img2="/assets/img/self_portrait/model/6.2.jpg" style="background-image: url(/assets/img/self_portrait/model/6.jpg)">
                  <p>Look 6</p>
                </div>
              </li>
              <li class="glide__slide">
                <div class="image" data-color="100" data-cat="herCate7" data-img="/assets/img/self_portrait/model/7.jpg" data-img1="/assets/img/self_portrait/model/7.1.jpg" data-img2="/assets/img/self_portrait/model/7.2.jpg" style="background-image: url(/assets/img/self_portrait/model/7.jpg)">
                  <p>Look 7</p>
                </div>
              </li>
            </ul>
    
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
            </div>
          </div>
        </div>
      </section>
      `;
      let slide_container = div.querySelector(".section__slide");
      let product_slide = div.querySelectorAll(".glide__slide");
      let init_lookbook_modal = () => {
        let lookbook_img = div.querySelectorAll(".image__featured");
        lookbook_img.forEach((img) => {
          img.addEventListener("click", (e) => {
            e.preventDefault();
            __templates_modal.overlay({
              content: __templates_modal.lookbook_detail({
                featured: img.dataset.featured,
                catId: img.dataset.cat,
              }),
            });
          });
        });
      };
      init_lookbook_modal();
      product_slide.forEach((slide) => {
            slide.addEventListener("click", () => {
                  let image = slide.querySelector(".image");
                  let look_modal = document.createElement("div");
                  look_modal.classList.add("look-detail");
                  look_modal.innerHTML = `
          <div class="model" style="background-image: url(${image.dataset.img})"></div>
          <div class="model" style="background-image: url(${image.dataset.img2})"></div>
          <div class="model" style="background-image: url(${image.dataset.img1})"></div>
          <div class="gallery"></div>
          <button class="close" type="button"></button>
          `;
                  __requests({
                        method: "GET",
                        url: `https://api.ssstutter.com/product/filter/web?catId=${image.dataset.cat}&media=true&webStock=true&allActive=true&stock=0`,
                      },
                      ({ data }) => {
                        let product = data
                          .map((item) => {
                              return `
              <div>
                <div class="product">
                  <div class="thumbnail">
                    <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
                  item.extensions.media.featured
                })"></span></a>
                  </div>
                  <h6 class="name">${item.name.toLowerCase()}</h6>
                  <div class="price">
                    ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
                    <p>${__currency_format(item.salePrice || item.price)}</p>
                  </div>
                  ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                </div>
              </div>
                `;
              })
              .join("");
            let gallery = div.querySelector(".gallery");
            gallery.innerHTML = product;
          }
        );
        look_modal.querySelector(".close").addEventListener("click", () => {
          look_modal.remove();
        });

        slide_container.appendChild(look_modal);
      });
    });
    setTimeout(() => {
      new Glide("#winter-1", {
        type: "slider",
        bound: true,
        perView: 4,
        gap: 0,
        breakpoints: {
          1024: {
            perView: 4,
          },
          768: {
            perView: 3,
            peek: {
              before: 0,
              after: 0,
            },
          },
          480: {
            gap: 5,
            perView: 2,
            peek: {
              before: 0,
              after: 80,
            },
          },
        },
      }).mount();
    }, 300);
    return div;
  },
};