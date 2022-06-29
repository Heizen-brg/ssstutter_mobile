import { __requests } from "../main.js";
import { __currency_format } from "./_function.js";
import { __icons } from "./_icons.js";
export const __templates = {
  notification(params) {
    return `
		<div class="notify-wrapper">
		<span class="server-${params.type}">
			<span class="notify-msg">
				<span>${params.msg}</span>
			</span>
		</span>
		</div>
		`;
  },
  busy_loading(status) {
    if (status == "hide") {
      document.querySelectorAll(".busy__loader").forEach((div) => {
        div.parentNode.removeChild(div);
      });
    }
    let div = document.createElement("div");
    div.className = "busy__loader";
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<g transform="translate(20 50)">
				<circle cx="0" cy="0" r="6" fill="#1d0e0b">
					<animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(40 50)">
				<circle cx="0" cy="0" r="6" fill="#774023">
					<animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(60 50)">
				<circle cx="0" cy="0" r="6" fill="#d88c51">
					<animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(80 50)">
				<circle cx="0" cy="0" r="6" fill="#f3e7c9">
					<animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g>
				</svg>`;
    div.style.display = status == "show" ? "grid" : "none";
    return div.outerHTML;
  },
  api_loading(status) {
    if (status == "hide") {
      document.querySelectorAll(".preview__loader").forEach((div) => {
        document.body.removeChild(div);
      });
    }
    let div = document.createElement("div");
    div.className = "preview__loader";
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<g transform="translate(20 50)">
				<circle cx="0" cy="0" r="6" fill="#1d0e0b">
					<animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(40 50)">
				<circle cx="0" cy="0" r="6" fill="#774023">
					<animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(60 50)">
				<circle cx="0" cy="0" r="6" fill="#d88c51">
					<animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g><g transform="translate(80 50)">
				<circle cx="0" cy="0" r="6" fill="#f3e7c9">
					<animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
				</circle>
				</g>
				</svg>`;
    div.style.display = status == "show" ? "grid" : "none";
    document.body.appendChild(div);
  },

  related_product(params) {
    let div = document.createElement("div");
    div.className = "related__product";
    div.innerHTML = `
    <h1>Có thể bạn sẽ thích</h1>
   <ul class="related__product--list"></ul>
  `;
  let randomCate;
  if (params) {
    let catId = params.catId.join('').split(',')
    randomCate = catId[catId.length-2]
  }
  let url = !params ? '' : `&catId=${randomCate}&sortBy=stock`;
  let shuffle;
    __requests({
          method: "GET",
          url: `https://api.ssstutter.com/product/filter/web?${url}&limit=20&sort=down&media=true&webStock=true&showStock=true`,
          header: {
            authorization: "ca246fba-c995-4d53-a22e-40c7416e9be4",
          },
        },
        ({ data=[] }) => {
          params ? shuffle = data.sort(()=> 0.5 - Math.random()).filter(i => i.id != params.id) : shuffle = data.sort(()=> 0.5 - Math.random()) ;
          (shuffle || []).splice(0,4).map((item) => {
                let product_template = document.createElement("li");
                product_template.dataset.gender = item.gender;
                product_template.dataset.price = item.price;
                product_template.dataset.sale = item.discount;
                product_template.innerHTML = `
      <div class="product">
        <div class="thumbnail">
          <a href="/p/${item.slug}"><span style="background-image:url(https://cdn.ssstutter.com/products/${
          item.extensions.media.featured
        })"></span></a>
        </div>
        <div class="detail">
          <div class="info">
            <a href="/p/${item.slug}" class="name">${item.name.replace("II", "Ⅱ").toLowerCase()}</a>
            <div class="price">
              ${
                item.salePrice
                  ? `<p>${__currency_format(item.salePrice)}</p>
                <p class="discount">${__currency_format(item.price)}</p> `
                  : `<p>${__currency_format(item.price)}</p>`
              }
            </div>
            ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ""}
            <div class="color">
              <p>+${item.color.length} màu</p>
            </div>
          </div>
        </div>
        ${
          item.salePrice || item.salePrice === 0
            ? `<p class="tag">${Math.floor(100 - (item.salePrice / item.price) * 100)}%</p>`
            : ""
        }
        </div>
      `;
        let container = div.querySelector(".related__product--list");
        container.appendChild(product_template);
        return product_template;
      });
    }
  );
  return div;
  },

};
