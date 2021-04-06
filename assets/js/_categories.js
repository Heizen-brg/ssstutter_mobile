import { __icons } from "./share/_icons.js";
import {__categories} from "./share/_data.js";
export const __template_categories = {
  infomation (params={}) {
    let section = document.createElement('section');
    section.className = 'categories__info';
    section.innerHTML = `
      <h1 class="info__title">category</h1>
      <p>Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của mình.
      </p>
    `;
    return section;
  },
  categories (params= {}) {
    let section = document.createElement('section');
    section.className = 'categories__list';
    section.innerHTML = `
      <ul>
        ${(__categories || []).map(item => `<li data-cate="">${item}</li>`).join('')}
      </ul>
    `;
    return section;
  },
  filter (params={}) {
    let div = document.createElement('div');
    div.className = 'categories__filter';
    div.innerHTML = `
      
    `;
    return div;
  }
}