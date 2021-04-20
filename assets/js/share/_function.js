import { __requests } from "../main.js";
import { __templates } from "./_components.js";
export const __remove_item_in_array = (el, array) => {
  let index = array.indexOf(el);
  if (index > -1) array.splice(index, 1);
  return [...new Set(array)];
}

export const __init_filter = (data, container) => {
  // let cat_id = container.dataset.cate;
  let query = '';
  query = '?cat=' + '35';
  console.log(query += data.q.map(i => i.data.length ? `&${i.tax}=${[...new Set(i.data)].join(',')}` : '').join(''));
  return query += data.q.map(i => i.data.length ? `&${i.tax}=${[...new Set(i.data)].join(',')}` : '').join('');
}

export const __init_product_list = (container, query, product_ids) => {
  window.product_ids = product_ids || (window.product_ids ? window.product_ids : []);
  let url = query ? query : `?cat=35&exclude=${window.product_ids.join(',')}`;
  __requests({
    method: 'GET',
    url: `https://sss.leanservices.work/services/sssearch${url}&exclude=${window.product_ids.join(',')}`,
    header: {
      authorization: 'ca246fba-c995-4d53-a22e-40c7416e9be4'
    },
  }, (res) => {
    console.log(res);
    let products = (res || []).map(item => {
      window.product_ids.push(item.id);
      let product_template = document.createElement('li');
      product_template.dataset.gender = item.gender;
      product_template.dataset.price = item.price;
      product_template.dataset.sale = item.discount;
      product_template.innerHTML = `
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
      `;
      container.appendChild(product_template);
      return product_template
    })
    __infinity_scroll(products[products.length - 3], container);
    __templates.busy_loading('hide');
  })
}

export const __infinity_scroll = (anchor, container) => {
  let block_loader = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let block = entry.target;
        container.innerHTML += __templates.busy_loading('show');
        __init_product_list(container, __init_filter(window.data_filter, container));
        block_loader.unobserve(block);
      }
    })
  });
  block_loader.observe(anchor);
};