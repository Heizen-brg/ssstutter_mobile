import { __related } from "./_data.js";

export const __templates = {
  busy_loading(status) {
    if (status == 'hide') {
      document.querySelectorAll('.busy__loader').forEach(div => {
        div.style.display = 'none';
      })
    }
    let div = document.createElement('div');
    div.className = 'busy__loader';
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
    div.style.display = status == 'show' ? 'grid' : 'none';
    return div.outerHTML;
  },
  api_loading(status) {
    if (status == 'hide') {
      document.querySelectorAll('.preview__loader').forEach(div => {
        document.body.removeChild(div);
      })
    }
    let div = document.createElement('div');
    div.className = 'preview__loader';
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
    div.style.display = status == 'show' ? 'grid' : 'none';
    document.body.appendChild(div);
  },
  banner() {
    let div = document.createElement('div');
    div.className = 'hero__banner';
    div.innerHTML = `
      <div style="background-image:url('https://ssstutter.com/wp-content/uploads/2021/04/banner-final.jpg')"></div>
    `;
    return div;
  },
  gender_filter() {
    let div = document.createElement('div');
    div.className = 'gender__filter';
    div.innerHTML = `
     <ul>
      <li>FOR HIM</li>
      <li>FOR HER</li>
     </ul>
    `;
    return div;
  },
  related_product() {
    let div = document.createElement('div');
    div.className = 'related_product';
    div.innerHTML = `
      <h1>Gợi ý cho bạn</h1>
     <ul>
      ${(__related || []).map(item => `
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
    return div;
  }
}