import { __banners, __banners_mobile } from "./share/_data.js";
import { __icons } from "./share/_icons.js";
import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
import { __currency_format } from "./share/_function.js";

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
            <li class="glide__slide"><a target="_blank" href="${
              item.link
            }"><div style="background-image:url(https://sss-dashboard.leanservices.work${item.img}.jpeg)">${
                item.cta ? `<button>${item.cta}</button>` : ""
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
              <li class="glide__slide"><a target="_blank" href="${
                item.link
              }"><div style="background-image:url(https://sss-dashboard.leanservices.work${item.mobile_img}.jpeg)">${
                item.cta ? `<button>${item.cta}</button>` : ""
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
      <div class="image" style="background-image: url(assets/img/test.jpg);"><a href="/editorial" target="_blank"></a></div>
      <div class="content">
        <h2>New collection</h2>
        <div class="btn-row">
          <a href="/editorial" target="_blank">Xem chi tiết</a>
        </div>
      </div>
    </div>
    `;

    return div;
  },
  
  editorial_product() {
    let div = document.createElement("section");
    div.classList.add('editorial-slide-pc');
    div.innerHTML = `
    <p class="title">Warm your day up</p>
    <div class="products__slider">
      <div class="glide active" id="editorial_products">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
             
          </ul>
        </div>
      </div>
    </div>
    `;
    
    __requests(
      {
        method: "GET",
        url: `product/filter/web?sort=up&catId=newColl&media=true`,
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let products = res.data
          .map(
            (item) =>
              `
          <li class="glide__slide">
            <div class="product">
              <div class="thumbnail">
                <a href="/p/${
                  item.slug
                }"><span style="background-image:url(https://api.leanservices.work/product/static/${
                item.extensions.media.featured
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
          </li>
        `
          )
          .join("");
        let glide__track = div.querySelector("#editorial_products .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#editorial_products", {
          type: "slider",
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
      }
    );
    
    return div;
  },
  mobile_editorial_product() {
    let section = document.createElement("section");
    section.className = "editorial-slide-sp";
    section.innerHTML = `
    <p class="title">Warm your day up</p>
      <div class="products__slider">
        <div class="glide active" id="editorial_products1">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${__templates.busy_loading("show")}
            </ul>
          </div>
        </div>
      </div>
    `;
    
    __requests(
      {
        method: "GET",
        url: "product/filter/web?sort=down&catId=newColl&media=true",
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
              <a href="/p/${
                next_item.slug
              }"><span style="background-image:url(https://api.leanservices.work/product/static/${
                next_item.extensions.media.featured
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
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
              item.extensions.media.featured
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
        let glide__track = section.querySelector("#editorial_products1 .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#editorial_products1", {
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
  /*
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
  */

  categories() {
    let section = document.createElement("section");
    section.className = "categories__banner";
    section.innerHTML = `
      <div><a href="/c/for-him" class="categories__banner--left" style="background-image:url('https://i.imgur.com/dCwJedM.jpg')"></a></div>
      <div><a href="/c/for-her" class="categories__banner--right" style="background-image:url('https://i.imgur.com/Bqa03SH.jpg')"></a></div>
    `;
    return section;
  },
  new_arrivals(product = {}) {
    let section = document.createElement("section");
    section.className = "new-arrivals__slide";
    section.innerHTML = `
      <h2><a href="/">what's new</a></h2>
      <div class="gender__toggle">
        <button data-active="male_arrivals" class="active">For Him</button>
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
    __requests(
      {
        method: "GET",
        url: `product/filter/web?limit=10&sort=up&catId=3vvRIM&media=true&webStock=true`,
        header: {
          authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
        },
      },
      (res) => {
        let products = res.data
          .map(
            (item) =>
              `
          <li class="glide__slide">
            <div class="product">
              <div class="thumbnail">
                <a href="/p/${
                  item.slug
                }"><span style="background-image:url(https://api.leanservices.work/product/static/${
                item.extensions.media.featured
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
          </li>
        `
          )
          .join("");
        let glide__track = section.querySelector("#male_arrivals .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#male_arrivals", {
          type: "slider",
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
        let products = res.data
          .map(
            (item) =>
              `
          <li class="glide__slide">
            <div class="product">
              <div class="thumbnail">
                <a href="/p/${
                  item.slug
                }"><span style="background-image:url(https://api.leanservices.work/product/static/${
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
          </li>
        `
          )
          .join("");
        let glide__track = section.querySelector("#female_arrivals .glide__slides");
        glide__track.innerHTML = products;
        new Glide("#female_arrivals", {
          type: "slider",
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
              <a href="/p/${
                next_item.slug
              }"><span style="background-image:url(https://api.leanservices.work/product/static/${
                next_item.extensions.media.featured
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
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
              item.extensions.media.featured
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
              <a href="/p/${
                item.slug
              }"><span style="background-image:url(https://api.leanservices.work/product/static/${
                next_item.extensions.media.featured
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
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
              item.extensions.media.featured
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
                        <a href="/p/${
                          item.slug
                        }"><span style="background-image:url(https://api.leanservices.work/product/static/${
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
          <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
              item.extensions.media.featured
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
            <a href="/p/${item.slug}"><span style="background-image:url(https://api.leanservices.work/product/static/${
              item.extensions.media.featured
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
          <a href="https://ssstutter.com/starter/product/${
            item.slug
          }"  target="_blank" style="background-image:url(https://ipo.leanservices.work/w/static/${
              item.media.featured ? item.media.featured : ""
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
