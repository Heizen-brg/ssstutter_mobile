import { __requests } from "../main.js";
import { __templates } from "../share/_components.js";
import { __landing_her_data } from "../share/_data.js";
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
        <img class="small" src="/assets/img/self_portrait/text/small.png"/>
      </div>
      </div>
      <section class="section__layout">
        <div class="hero__layout" >
          <div style="background-image:url(/assets/img/self_portrait/poster1.jpg)" >
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
        <div class="minor__layout" >
          <div style="background-image:url(/assets/img/self_portrait/poster2.jpg)" >
          </div>
          <div style="background-image:url(/assets/img/self_portrait/poster3.jpg)" >
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
          <ul class="glide__slides flatlay__container">
            ${
              __landing_her_data.map(item => {
                return `
                <li class="glide__slide" data-item='${JSON.stringify(item)}'>
                  <div class="image" data-color="${item.colorId}" data-cat="${item.catId}" style="background-image: url(${item.featured})">
                    <p>${item.title}</p>
                  </div>
                </li>
                `
              }).join("")
            }
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
              let item_data = JSON.parse(slide.dataset.item)
              let image = slide.querySelector(".image");
              let look_modal = document.createElement("div");
              look_modal.classList.add("look-detail");
              look_modal.innerHTML = `
              ${
                item_data.gallery.map(img => `<div class="model" style="background-image: url(${img})"></div>`).join('')
              }
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