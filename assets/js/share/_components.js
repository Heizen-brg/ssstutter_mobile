import { __related } from "./_data.js";

export const __templates = {
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