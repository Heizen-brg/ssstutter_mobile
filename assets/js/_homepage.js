import { __banners, __banners_mobile } from "./share/_data.js";
import { __icons } from "./share/_icons.js";
import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __currency_format } from "./share/_function.js";
import { CONFIG } from "./config.js";

export const __templates_home = {
  hide_menu() {
    let gender = document.querySelectorAll("[data-gender]");
    let triggers = document.querySelectorAll("[data-active]");
    triggers.forEach((item) => item.classList.remove("active"));
    gender.forEach((block) => {
      block.classList.remove("active");
    });
  },
  show_menu(item) {
    item.classList.add("active");
    let gender = document.querySelectorAll("[data-gender]");
    gender.forEach((container) => {
      container.dataset.gender == item.dataset.active
        ? container.classList.add("active")
        : container.classList.remove("active");
    });
  },
  banner() {
    let section = document.createElement("section");
    section.className = "slide__banner";
    section.innerHTML = `
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides banner__container">
          
          </ul>
        </div>
        <!--
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
        -->
      </div>  
      `;
    let get_banner_list = () => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/banner/get`,
        },
        ({ data }) => {
          let banner_container = section.querySelector(".banner__container");
          let banner_item = (data || [])
            .map((item) => {
              return `
            <li class="glide__slide"><a target="_blank" href="${item.link
                }"><div style="background-image:url(https://sss-dashboard.leanservices.work${item.img}.jpeg)">${item.cta ? `<button>${item.cta}</button>` : ""
                }</div></a></li>
            `;
            })
            .join("");
          banner_container.innerHTML = banner_item;
          setTimeout(() => {
            new Glide(".glide", {
              type: "slider",
              perView: 1,
              autoplay: 5000,
            }).mount();
          }, 100);
        }
      );
    };
    get_banner_list();

    return section;
  },
  mobile_banner() {
    let section = document.createElement("section");
    section.className = "slide__banner";
    section.innerHTML = `
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides banner__container">
          </ul>
        </div>
        <!--
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
        </div>
        -->
      </div>  
      `;
    let get_banner_list = () => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/banner/get`,
        },
        ({ data }) => {
          let banner_container = section.querySelector(".banner__container");
          let banner_item = (data || [])
            .map((item) => {
              return `
              <li class="glide__slide"><a target="_blank" href="${item.link
                }"><div style="background-image:url(https://sss-dashboard.leanservices.work${item.mobile_img}.jpeg)">${item.cta ? `<button>${item.cta}</button>` : ""
                }</div></a></li>
              `;
            })
            .join("");
          banner_container.innerHTML = banner_item;
          setTimeout(() => {
            new Glide(".glide", {
              type: "slider",
              perView: 1,
              autoplay: 5000,
            }).mount();
          }, 100);
        }
      );
    };
    get_banner_list();
    return section;
  },

  subcription() {
    let div = document.createElement("section");
    div.classList.add("subcription");
    div.innerHTML = `
    <div class="container">
      <div class="image" style="background-image: url(assets/img/test.jpg);"></div>
      <div class="content">
        <h2>First Collection<br>Winter 2021</h2>
        <p>Mở bán Pre-Order tại Website<br></p>
        <p class="clock"></p>
        <div class="btn-row">
          <a href="https://m.me/263972407066786?ref=3110" target="_blank">Nhận thông tin sớm qua Messenger tại đây</a>
        </div>
      </div>
    </div>
    `;

    let end_date = new Date("Nov 04, 2021 21:30:00").getTime();

    let countdown = setInterval(() => {
      let distance = end_date - Date.now();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      div.querySelector(".clock").innerHTML = `
      <span>${days}</span> ngày 
      <span>${hours}</span> giờ 
      <span>${minutes}</span> phút 
      <span>${seconds}</span> giây
      `;

      if (distance < 0) {
        clearInterval(countdown);
        div.querySelector(".clock").innerHTML = `
        Sự kiện đã kết thúc
        `;
      }
    }, 1000);

    // return div;
  },

  home_video() {
    let div = document.createElement("section");
    div.classList.add("home-video");
    div.innerHTML = `
    <div class="video">
      <video autoplay playsinline muted loop>
        <source type="video/mp4" src="/assets/img/SSSTUTTER_Leak_01.mp4">
      </video>
    </div>
    `;

    // return div;
  },

  categories() {
    let section = document.createElement("section");
    section.className = "categories__banner";

    __requests({
      method: "GET",
      url: 'https://sss-dashboard.leanservices.work/w/categories/get'
    }, ({ data }) => {
      let cat_item = (data || []).map(item => {
        return `
          <div><a href="${item.slug}" class="categories__banner" style="background-image:url(https://sss-dashboard.leanservices.work/${item.thumbnail}.jpeg)"></a></div>
          `
      }).join('');
      section.innerHTML = cat_item;
    })
    return section;
  },
  new_arrivals(product = {}) {
    let section = document.createElement("section");
    section.className = "new-arrivals__slide";
    section.dataset.block = "new_arrivals"
    section.innerHTML = `
      <h2><a href="/">what's new</a></h2>
      <div class="gender__toggle">
        <button data-active="male_arrivals" class="active">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide active"  data-catId="3vvRIM" data-gender="male_arrivals" id="male_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul data-catId="3vvRIM" class="glide__slides">
                ${__templates.busy_loading("show")}
            </ul>
          </div>
        </div>
        <div class="glide" data-catId="y8Q15I" data-gender="female_arrivals" id="female_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul data-catId="y8Q15I" class="glide__slides">
                ${__templates.busy_loading("show")}
            </ul>
          </div>
        </div>
      </div>
    `;

    let get_item_list = (params) => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/section/detail?type=${section.dataset.block}`,
        },
        ({ data }) => {
          let gender_block = section.querySelectorAll('[data-gender]')
          gender_block.forEach(block => {
            let product_gender = data.products.filter(product => product.catId.join(',').split(",").includes(block.dataset.catid))
            let products = (product_gender || []).map(
              (item) =>
                `
              <li class="glide__slide">
                <div class="product">
                  <div class="thumbnail">
                  <a href="/p/${item.slug}">
                    <span style="background-image:url(${CONFIG.DOMAIN_IMG_CDN}/${item.extensions.media.featured ? item.extensions.media.featured : "no_image.png"
                })">
                    </span>
                  </a>
                  </div>
                  <div class="detail">
                    <h6 class="name">${item.name.toLowerCase()}</h6>
                    <div class="price">
                    ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
                      <p>${__currency_format(item.salePrice || item.price)}</p>
                    </div>
                    ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                  </div>
                </div>
              </li>
            `
            ).join("");
            let glide_slides = block.querySelector(".glide__slides");
            glide_slides.innerHTML = products || `
            <li class="glide__slide">
            </li>
          `;
            new Glide(`#${block.id}`, {
              type: "carousel",
              bound: true,
              perView: 4,
              autoplay: 5000,
              gap: 20,
              hoverpause: true,
              peek: {
                before: 0,
                after: 100,
              },
              breakpoints: {
                1024: {
                  perView: 3,
                },
                480: {
                  perView: 2,
                },
              },
            }).mount();
          })
        }
      );
    }
    get_item_list();
    let toggle_gender = section.querySelectorAll("[data-active]");
    toggle_gender.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
        }
      });
    });
    return section;
  },
  mobile_new_arrivals() {
    let section = document.createElement("section");
    section.className = "new-arrivals__slide";
    section.innerHTML = `
      <h2><a href="/">what's new</a></h2>
      <div class="gender__toggle">
        <button class="active" data-active="male_arrivals">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <div class="products__slider">
        <div class="glide active" data-gender="male_arrivals" id="male_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading("show")}
            </ul>
          </div>
        </div>
        <div class="glide" data-gender="female_arrivals" id="female_arrivals">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading("show")}
            </ul>
          </div>
        </div>
      </div>
    `;
    let toggle_gender = section.querySelectorAll("[data-active]");
    toggle_gender.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
          ``;
        }
      });
    });
    __requests(
      {
        method: "GET",
        url: "product/filter/web?limit=10&sort=down&catId=3vvRIM&media=true&webStock=true",
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let item_per_view = 4;
        let stop_loop = Math.ceil(res.length / item_per_view);
        let products = res.data
          .map((item, index) => {
            let current_index = index * 2;
            if (index - 1 > stop_loop) return "";
            item = res.data[current_index];
            if (!item) return "";
            let next_item = res.data[current_index + 1];
            if (next_item) {
              next_item = `
          <div class="product">
            <div class="thumbnail">
              <a href="/p/${next_item.slug
                }"><span style="background-image:url(https://api.leanservices.work/product/static/${next_item.extensions.media.featured
                })"></span></a>
            </div>
            <div class="detail">
              <h6 class="name">${next_item.name.toLowerCase()}</h6>
              <div class="price">
              ${next_item.salePrice ? `<p class="discount">${__currency_format(next_item.price)}</p>` : ""}
                <p>${__currency_format(next_item.salePrice || next_item.price)}</p>
              </div>
              ${next_item.discount > 0 ? `<p class="tag">${next_item.discount}%</p>` : ""}
            </div>
          </div>
          `;
            } else next_item = "";

            return `
      <li class="glide__slide">
        <div class="product">
          <div class="thumbnail">
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured
              })"></span></a>
          </div>
          <div class="detail">
            <h6 class="name">${item.name.toLowerCase()}</h6>
            <div class="price">
              ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
              <p>${__currency_format(item.salePrice || item.price)}</p>
            </div>
            ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
          </div>
        </div>
          ${next_item}
      </li>
        `;
          })
          .join("");
        let glide__track = section.querySelector("#male_arrivals .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#male_arrivals", {
          type: "carousel",
          bound: true,
          perView: 4,
          autoplay: 5000,
          gap: 10,
          hoverpause: true,
          peek: {
            before: 0,
            after: 100,
          },
          breakpoints: {
            1024: {
              perView: 3,
            },
            480: {
              perView: 2,
              peek: {
                before: 0,
                after: 0,
              },
            },
          },
        }).mount();
      }
    );
    __requests(
      {
        method: "GET",
        url: "product/filter/web?limit=10&sort=down&catId=y8Q15I&media=true&webStock=true",
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let item_per_view = 4;
        let stop_loop = Math.ceil(res.length / item_per_view);
        let products = res.data
          .map((item, index) => {
            let current_index = index * 2;
            if (index - 1 > stop_loop) return "";
            item = res.data[current_index];
            if (!item) return "";
            let next_item = res.data[current_index + 1];
            if (next_item) {
              next_item = `
          <div class="product">
            <div class="thumbnail">
              <a href="/p/${item.slug
                }"><span style="background-image:url(https://api.leanservices.work/product/static/${next_item.extensions.media.featured
                })"></span></a>
            </div>
            <h6 class="name">${next_item.name}</h6>
            <div class="price">
            ${next_item.salePrice ? `<p class="discount">${__currency_format(next_item.price)}</p>` : ""}
              <p>${__currency_format(next_item.salePrice || next_item.price)}</p>
            </div>
            ${next_item.discount > 0 ? `<p class="tag">${next_item.discount}%</p>` : ""}
          </div>
          `;
            } else next_item = "";

            return `
      <li class="glide__slide">
        <div class="product">
          <div class="thumbnail">
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured
              })"></span></a>
          </div>
          <h6 class="name">${item.name}</h6>
          <div class="price">
            ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
            <p>${__currency_format(item.salePrice || item.price)}</p>
          </div>
          ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
        </div>
          ${next_item}
      </li>
        `;
          })
          .join("");
        let glide__track = section.querySelector("#female_arrivals .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#female_arrivals", {
          type: "carousel",
          bound: true,
          perView: 4,
          autoplay: 5000,
          gap: 10,
          hoverpause: true,
          peek: {
            before: 0,
            after: 100,
          },
          breakpoints: {
            1024: {
              perView: 3,
            },
            480: {
              perView: 2,
              peek: {
                before: 0,
                after: 0,
              },
            },
          },
        }).mount();
      }
    );
    return section;
  },
  stylepick() {
    let section = document.createElement("section");
    section.className = "stylepick__slide";
    section.innerHTML = `
      <h2>style pick</h2>
      <div class="products__slider">
        <div class="glide active" id="stylepick">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                ${__templates.busy_loading("show")}
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
          </div>
        </div>
      </div>
    `;
    __requests(
      {
        method: "GET",
        url: "product/filter/web?limit=10&sort=down&catId=3vvRIM&media=true&webStock=true",
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let product = res.data
          .map(
            (item) =>
              `
                  <li class="glide__slide">
                    <div class="product">
                      <div class="thumbnail">
                        <a href="/p/${item.slug
              }"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured
              })"></span></a>
                      </div>
                      <h6 class="name">${item.name.toLowerCase()}</h6>
                      <div class="price">
                        ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
                        <p>${__currency_format(item.salePrice || item.price)}</p>
                      </div>
                      ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
                    </div>
                  </li>
                    `
          )
          .join("");
        let glide = section.querySelector(".glide__slides");
        glide.innerHTML = product;
        new Glide("#stylepick", {
          type: "carousel",
          bound: true,
          perView: 3,
          autoplay: 5000,
          gap: 10,
          hoverpause: true,
          breakpoints: {
            800: {
              perView: 2,
            },
            460: {
              perView: 1,
              peek: {
                before: 50,
                after: 50,
              },
            },
          },
        }).mount();
      }
    );
    return section;
  },
  weekly() {
    let section = document.createElement("section");
    section.className = "weekly__best";
    section.innerHTML = `
      <h2>weekly best</h2>
      <div class="gender__toggle">
        <button class="active" data-active="male_arrivals">For Him</button>
        <button data-active="female_arrivals">For Her</button>
      </div>
      <ul data-gender="male_arrivals" class="weekly__best--list active">
        ${__templates.busy_loading("show")}
      </ul>
      <ul data-gender="female_arrivals" class="weekly__best--list">
        ${__templates.busy_loading("show")}
      </ul>
    `;
    __requests(
      {
        method: "GET",
        url: "product/filter/web?limit=8&sort=down&catId=3vvRIM&media=true&webStock=true",
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let product = res.data
          .map(
            (item) => ` 
      <li>
        <div class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured
              })"></span></a>
        <div>
          <div class="detail">
          <h6 class="name">${item.name.toLowerCase()}</h6>
          <div class="price">
            ${item.salePrice ? `<p class="discount">${__currency_format(item.price)}</p>` : ""}
            <p>${__currency_format(item.salePrice || item.price)}</p>
          </div>
          ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
          </div>
        </div>
      </li>`
          )
          .join("");
        let glide = section.querySelector('[data-gender="male_arrivals"]');
        glide.innerHTML = product;
      }
    );
    __requests(
      {
        method: "GET",
        url: "product/filter/web?limit=8&sort=down&catId=y8Q15I&media=true&webStock=true",
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let product = res.data
          .map(
            (item) => ` 
      <li>
        <div class="product">
          <div class="thumbnail">
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${item.extensions.media.featured
              })"></span></a>
          </div>
          <div class="detail">
            <h6 class="name">${item.name}</h6>
            <div class="price">
              ${!item.salePrice ? "" : `<p class="discount">${__currency_format(item.price)}</p>`}
              <p>${__currency_format(item.salePrice || item.price)}</p>
            </div>
            ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
          </div>
        </div>
      </li>`
          )
          .join("");
        let glide = section.querySelector('[data-gender="female_arrivals"]');
        glide.innerHTML = product;
      }
    );
    let toggle_gender = section.querySelectorAll("[data-active]");
    toggle_gender.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
          return false;
        } else {
          this.hide_menu();
          this.show_menu(btn);
        }
      });
    });
    return section;
  },
  blog() {
    let section = document.createElement("section");
    section.className = "blog";
    section.innerHTML = `
    <h2><a href="/blog">ssstory</a> </h2>
    <ul class="blog__list">
    </ul>
    `;
    __requests(
      {
        method: "GET",
        url: `https://sss-dashboard.leanservices.work/w/post/get?limit=4&skip=0`,
      },
      ({ data }) => {
        // console.log(res);
        let blog_list = section.querySelector(".blog__list");
        let blog_item = (data || [])
          .map((item) => {
            return `
          <li>
            <a href="blog/article/${item.slug}">
              <span style="background-image:url(https://sss-dashboard.leanservices.work${item.thumbnail}.jpeg)"></span>
              <p>${item.title}</p>
            </a>
          </li>
        `;
          })
          .join("");
        blog_list.innerHTML = blog_item;
      }
    );
    return section;
  },
  lookbook() {
    let section = document.createElement("section");
    section.className = "lookbook";
    section.innerHTML = `
      <h2><a href="/starter">collection</a></h2>
      <div class="lookbook__list">
        <div class="glide" id="project">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">${__icons.left}</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">${__icons.right}</button>
          </div>
        </div>
      </div>
    `;
    __requests(
      {
        method: "GET",
        url: `https://ssstutter.com/starter/w/product/search`,
      },
      ({ data }) => {
        let project_container = section.querySelector(".glide__slides");
        let project_item = (data || [])
          .map((item) => {
            return `
        <li class="glide__slide">
          <a href="https://ssstutter.com/starter/product/${item.slug
              }"  target="_blank" style="background-image:url(https://ipo.leanservices.work/w/static/${item.media.featured ? item.media.featured : ""
              })">
            <span>${item.name}</span>
          </a>
        </li>
        `;
          })
          .join("");
        project_container.innerHTML = project_item;
        setTimeout(() => {
          new Glide("#project", {
            type: "carousel",
            bound: true,
            perView: 2,
            gap: 20,
            hoverpause: true,
            peek: {
              before: 100,
              after: 100,
            },
            breakpoints: {
              800: {
                perView: 1,
                peek: {
                  before: 50,
                  after: 50,
                },
              },
            },
          }).mount();
        }, 100);
      }
    );
    return section;
  },
};
