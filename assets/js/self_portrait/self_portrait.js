import { __icons } from "../share/_icons.js";

export const __templates_portrait = {

  self_portrait_campaign(params) {

    let div = document.createElement("div");
    div.className = ""
    div.innerHTML = `
      <section class="section__layout">
        <div class=grid-row>
          <div class="video"></div>
          <div class="title" style="align-self: center;">
            <h3><span>Yumi</span></h3>
            <p>wears Limted edition puff neck coat and Limted edition dress with draped detail</p>
          </div>
        </div>
        <div class=grid-row>
          <div class="image" style="background-image: url(/assets/img/self_portrait/1.jpg)"></div>
          <div class="image" style="background-image: url(/assets/img/self_portrait/2.jpg)"></div>
        </div>
        
        <div class="title">
          <h3><span>Kristen</span></h3>
          <p>wears Limted edition puff neck coat and Limted edition dress with draped detail</p>
        </div>
        <div class=grid-row>
          <div class="image" style="background-image: url(/assets/img/self_portrait/3.jpg)"></div>
          <div class="image" style="background-image: url(/assets/img/self_portrait/4.jpg)"></div>
        </div>
      </section>
      <section class="section__layout">
        <div class=grid-row>
          <div class="video"></div>
          <div class="title" style="align-self: center;">
            <h3><span>Yumi</span></h3>
            <p>wears Limted edition puff neck coat and Limted edition dress with draped detail</p>
          </div>
        </div>
        <div class=grid-row>
          <div class="image" style="background-image: url(/assets/img/self_portrait/1.jpg)"></div>
          <div class="image" style="background-image: url(/assets/img/self_portrait/2.jpg)"></div>
        </div>
        
        <div class="title">
          <h3><span>Kristen</span></h3>
          <p>wears Limted edition puff neck coat and Limted edition dress with draped detail</p>
        </div>
        <div class=grid-row>
          <div class="image" style="background-image: url(/assets/img/self_portrait/3.jpg)"></div>
          <div class="image" style="background-image: url(/assets/img/self_portrait/4.jpg)"></div>
        </div>
      </section>
      <section class="section__slide">
        <h3 style="margin: 18px 0 28px;"><b>Shop the collection</b></h3>
        <div class="glide" id="winter-1">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide">
                <div class="image" style="background-image: url(/assets/img/self_portrait/1.png)"></div>
                <p>Look 1</p>
              </li>
              <li class="glide__slide">
                <div class="image" style="background-image: url(/assets/img/self_portrait/2.png)"></div>
                <p>Look 2</p>
              </li>
              <li class="glide__slide">
                <div class="image" style="background-image: url(/assets/img/self_portrait/3.png)"></div>
                <p>Look 3</p>
              </li>
              <li class="glide__slide">
                <div class="image" style="background-image: url(/assets/img/self_portrait/4.png)"></div>
                <p>Look 4</p>
              </li>
              <li class="glide__slide">
                <div class="image" style="background-image: url(/assets/img/self_portrait/5.png)"></div>
                <p>Look 5</p>
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
    let slide_container = div.querySelector('.section__slide')
    let product_slide = div.querySelectorAll('.glide__slide');
    product_slide.forEach(item => {
      item.addEventListener('click', () => {
        let image = item.querySelector('.image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
        let look_modal = document.createElement('div');
        look_modal.classList.add('look-detail');
        look_modal.innerHTML = `
          <div class="thumbnail" style="background-image: url(${image})"></div>
          <div class="gallery">
            <div class="item" ><div style="background-image: url()" class="image"></div></div>
            <div class="item" ><div style="background-image: url()" class="image"></div></div>
          </div>
          <button class="close" type="button"></button>
          `;

        look_modal.querySelector('.close').addEventListener('click', () => {
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
        gap: 20,
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
  }

}

