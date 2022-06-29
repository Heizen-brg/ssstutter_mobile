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
        container.dataset.gender == item.dataset.active ?
          container.classList.add("active") :
          container.classList.remove("active");
      });
    },
    banner() {
      let section = document.createElement("section");
      section.className = "slide__banner";
      section.innerHTML = `
        <div class="glide" id="banner__glide">
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
            url: `https://sss-dashboard.leanservices.work/w/banner/get?type=major`,
          },
          ({ data }) => {
            let banner_container = section.querySelector(".banner__container");
            let banner_item = (data || [])
              .map((item) => {
                return `
              <li class="glide__slide">
                <a href="${item.link}">
                  <div style="background-image:url(https://sss-dashboard.leanservices.work${
                    item.img
                  }.jpeg)">${
                  item.cta
                    ? `<button style="background-color:${item.color}">${item.cta}</button>`
                    : ""
                }</div>
                </a>
              </li>
              `;
              })
              .join("");
            banner_container.innerHTML = banner_item;
            setTimeout(() => {
              new Glide("#banner__glide", {
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
        <div class="glide" id="mobile_banner_slide">
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
            url: `https://sss-dashboard.leanservices.work/w/banner/get?type=major`,
          },
          ({ data }) => {
            let banner_container = section.querySelector(".banner__container");
            let banner_item = (data || [])
              .map((item) => {
                return `
                <li class="glide__slide"><a href="${
                  item.link
                }"><div style="background-image:url(https://sss-dashboard.leanservices.work${
                  item.mobile_img
                }.jpeg)">${
                  item.cta
                    ? `<button style="background-color:${item.color}">${item.cta}</button>`
                    : ""
                }</div></a></li>
                `;
              })
              .join("");
            banner_container.innerHTML = banner_item;
            setTimeout(() => {
              new Glide("#mobile_banner_slide", {
                type: "slider",
                perView: 1,
                autoplay: 5000,
              }).mount();
            }, 200);
          }
        );
      };
      get_banner_list();
      return section;
    },
    minor_banner() {
      let section = document.createElement("section");
      section.className = "minor__banner";
      section.innerHTML = `
      <div class="glide" id="minor_banner">
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
            url: `https://sss-dashboard.leanservices.work/w/banner/get?type=minor`,
          },
          ({ data }) => {
            let banner_container = section.querySelector(".banner__container");
            let banner_item = (data || [])
              .map((item) => {
                return `
            <li class="glide__slide">
              <a href="${item.link}">
                <div style="background-image:url(https://sss-dashboard.leanservices.work${
                  item.img
                }.jpeg)">${
                  item.cta
                    ? `<button style="background-color:${item.color}">${item.cta}</button>`
                    : ""
                }</div>
              </a>
            </li>
            `;
              })
              .join("");
            banner_container.innerHTML = banner_item;
            setTimeout(() => {
              new Glide("#minor_banner", {
                type: "slider",
                perView: 1,
                autoplay: 10000,
              }).mount();
            }, 100);
          }
        );
      };
      get_banner_list();
  
      return section;
    },


  categories() {
    let section = document.createElement("section");
    section.className = "categories__banner";
    section.innerHTML = `
      <div data-type="for-him"></div>
      <div data-type="for-her"></div>
    `
    let cate_banner = section.querySelectorAll('div');
    cate_banner.forEach(dom => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/categories/detail?type=${dom.dataset.type}`,
        },
        ({ data }) => {
          dom.innerHTML = `<div><a href="${data.slug}">${data.title}</a></div>

          `;
        }
      );
    })
    return section;
  },


  mobile_new_arrivals() {
    let section = document.createElement("section");
    section.className = "new-arrivals__slide";
    section.innerHTML = `
      <a href="/new-arrivals" style="background-image:url(https://sss-dashboard.leanservices.work/upload/5-2022/1653448408095.jpeg)"></a>
    `;
    // let init_new_arrivals = (params = "3vvRIM") => {
    //   __requests(
    //     {
    //       method: "GET",
    //       url: `https://api.ssstutter.com/product/filter/web?limit=10&catId=${params}&sort=down&media=true&webStock=true`,
    //     },
    //     ({ data }) => {
    //       let item_per_view = 4;
    //       let stop_loop = Math.ceil(data.length / item_per_view);
    //       let products = data
    //         .map((item, index) => {
    //           let current_index = index * 2;
    //           if (index - 1 > stop_loop) return "";
    //           item = data[current_index];
    //           if (!item) return "";
    //           let next_item = data[current_index + 1];
    //           if (next_item) {
    //             next_item = `
    //         <div class="product">
    //           <div class="thumbnail">
    //             <a href="/p/${next_item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
    //               next_item.extensions.media.featured
    //             })"></span></a>
    //           </div>
    //           <div class="detail">
    //             <div class="info">
    //               <h6 class="name">${next_item.name.toLowerCase()}</h6>
    //               <div class="price">
    //                 ${
    //                   next_item.salePrice
    //                     ? `<p>${__currency_format(next_item.salePrice)}</p>
    //                   <p class="discount">${__currency_format(next_item.price)}</p> `
    //                     : `<p>${__currency_format(next_item.price)}</p>`
    //                 }
    //               </div>
    //               ${
    //                 next_item.salePrice || next_item.salePrice === 0
    //                   ? `<p class="tag">${Math.floor(100 - (next_item.salePrice / next_item.price) * 100)}%</p>`
    //                   : ""
    //               }
    //               <div class="color">
    //                 <p>+${next_item.color.length} màu</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         `;
    //           } else next_item = "";

    //           return `
    //     <li class="glide__slide" data-cate="${item.catId[0][0]}">
    //       <div class="product">
    //         <div class="thumbnail">
    //           <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
    //             item.extensions.media.featured
    //           })"></span></a>
    //         </div>
    //         <div class="detail">
    //           <div class="info">
    //             <h6 class="name">${item.name.toLowerCase()}</h6>
    //             <div class="price">
    //               ${
    //                 item.salePrice
    //                   ? `<p>${__currency_format(item.salePrice)}</p>
    //                 <p class="discount">${__currency_format(item.price)}</p> `
    //                   : `<p>${__currency_format(item.price)}</p>`
    //               }
    //             </div>
    //             ${
    //               item.salePrice || item.salePrice === 0
    //                 ? `<p class="tag">${Math.floor(100 - (item.salePrice / item.price) * 100)}%</p>`
    //                 : ""
    //             }
    //             <div class="color">
    //               <p>+${item.color.length} màu</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //         ${next_item}
    //     </li>
    //       `;
    //         })
    //         .join("");
    //       let glide__track = section.querySelector(".glide__slides");
    //       glide__track.innerHTML = products;
    //       new Glide(`#mobile_new_arrivals`, {
    //         type: "slider",
    //         bound: true,
    //         perView: 2,
    //         autoplay: 3000,
    //         gap: 10,
    //         hoverpause: true,
    //         peek: {
    //           before: 0,
    //           after: 100,
    //         },
    //         breakpoints: {
    //           1024: {
    //             perView: 3,
    //           },
    //           480: {
    //             perView: 2,
    //             peek: {
    //               before: 0,
    //               after: 0,
    //             },
    //           },
    //         },
    //       }).mount();
    //     }
    //   );
    // };

    // init_new_arrivals();


    // let toggle_gender = section.querySelectorAll("[data-cate]");
    // toggle_gender.forEach((btn) => {
    //   btn.addEventListener("click", () => {
    //     toggle_gender.forEach((i) => i.classList.remove("active"));
    //     btn.classList.toggle("active");
    //     init_new_arrivals(btn.dataset.cate)
    //   });
    // });

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
        url: "https://sss-dashboard.leanservices.work/w/section/detail?type=style_pick",
      },
      ({ data }) => {
        let product = data.products
          .map(
            (item) =>
              `
                  <li class="glide__slide">
                    <div class="product">
                      <div class="thumbnail">
                        <a href="/p/${
                          item.slug
                        }"><span style="background-image:url(https://cdn.ssstutter.com/products/${
                item.extensions.media[`color_${item.color[0].id}_thumbnail`].o
              })"></span></a>
                      </div>
                      <div class="detail">
                        <div class="info">
                          <h6 class="name">${item.name.replace('II', 'Ⅱ').toLowerCase()}</h6>
                          <div class="price">
                            ${
                              item.salePrice
                                ? `<p>${__currency_format(item.salePrice)}</p>
                              <p class="discount">${__currency_format(item.price)}</p> `
                                : `<p>${__currency_format(item.price)}</p>`
                            }
                          </div>
                          ${
                            item.salePrice || item.salePrice === 0
                              ? `<p class="tag">${Math.floor(100 - (item.salePrice / item.price) * 100)}%</p>`
                              : ""
                          }
                          <div class="color">
                            <p>+${item.color.length} màu</p>
                          </div>
                        </div>
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
        <button class="active" data-cate="3vvRIM">For Him</button>
        <button data-cate="y8Q15I">For Her</button>
      </div>
      <ul class="weekly__best--list active">
        ${__templates.busy_loading("show")}
      </ul>
    `;
    let init_item_list = (params = "3vvRIM") => {
      __requests(
        {
          method: "GET",
          url: `https://sss-dashboard.leanservices.work/w/section/detail?type=weekly_best&catId=${params}`,
        },
        ({ data }) => {
          let products = data.products.splice(0,6)
            .map(
              (item) => ` 
            <li data-cate="${item.catId[0][0]}">
              <div class="product">
                <div class="thumbnail">
                  <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
                item.extensions.media.featured
              })"></span></a>
                </div>
                
              </div>
            </li>`
            )
            .join("");
          let container = section.querySelector(".weekly__best--list");
          container.innerHTML = products;
        }
      );
    };
    init_item_list();

    let toggle_gender = section.querySelectorAll("[data-cate]");
    toggle_gender.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggle_gender.forEach((i) => i.classList.remove("active"));
        btn.classList.toggle("active");
        init_item_list(btn.dataset.cate)
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
  instagram() {
    let section = document.createElement('section');
    section.className = "instagram__feed";
    section.innerHTML = `
      <h2>instagram</h2>
      <div id="instafeed"></div>
    `;
    setTimeout(() => {
      var feed = new Instafeed({
        accessToken: `IGQVJWQ3RYaWhySFJxTmdJYWhHNDBzRUxVN1djRG9yV2RtWUROZAkpyZA3hrcWNWckh3OUFxdGtRVGtYbkdMMmpRbHNkVEpMNm01NEdmeWRhUTNBdV9TU1NFQ1ZAVcHRZANXhPV2cyV0ozVTJWSlFTX0t4QQZDZD`,
        limit : 9,
        template : '<a href="{{link}}" style="background-image:url({{image}})"></a>'	
      });
      
      feed.run();
     
    }, 100);
    return section;
  }
}