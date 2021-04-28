import { __requests } from "../main.js";
import { __templates } from "./_components.js";

export const __currency_format = n => `${new Intl.NumberFormat('vi-VN', {}).format(parseInt(n))} <span class="currency-symbol">&#x20AB;</span>`;


export const __remove_item_in_array = (el, array) => {
  let index = array.indexOf(el);
  if (index > -1) array.splice(index, 1);
  return [...new Set(array)];
}

export const __init_filter = (data, container) => {
  let query = '';
  query = '?catId=' + container.dataset.cate;
  return query += data.q.map(i => i.data.length ? `&${i.tax}=${[...new Set(i.data)].join(',')}` : '').join('');
}
// container, query, product_ids
export const __init_product_list = (params = { ids: product_ids }) => {
  params.infinity ? false : (params.container.innerHTML = '', __templates.api_loading('show'));

  window.product_ids = params.ids || (window.product_ids ? window.product_ids : []);
  let url = !params.query ? `?catId=3vvRIM&skip=${10}` : params.query;
  console.log(url);
  __requests({
    method: 'GET',
    url: `https://leanservices.work/pd/filter/web${url}`,
    header: {
    },
  }, (res) => {
    console.log(res);
    __templates.api_loading('hide');
    let products = (res.data).map(item => {
      window.product_ids.push(item.id);
      let product_template = document.createElement('li');
      product_template.dataset.gender = item.gender;
      product_template.dataset.price = item.price;
      product_template.dataset.sale = item.discount;
      product_template.innerHTML = `
      <div class="product fade__in">
        <div class="thumbnail">
          <a href="/"><span style="background-image:url(https://leanservices.work/pd/static/${item.extensions.media.featured})"></span></a>
        </div>
        <h6 class="name">${item.name}</h6>
        <div class="price">
          ${item.sale_price ? `<p class="discount">${__currency_format(item.sale_price)}</p>` : ''}
          <p>${__currency_format(item.price)}</p>
        </div>
        ${item.discount > 0 ? `<p class="tag">${item.discount}%</p>` : ''}
        <div class="color">
            <p>+${item.color.length} màu</p>
        </div>
      </div>
      `;
      let color_bar = product_template.querySelector('.color');
      item.color.map(color => {
        let color_box = document.createElement('span');
        color_box.className = '';
        color_box.dataset.color_id = color.value;
        color_box.style.background = color.id;
        color_bar.appendChild(color_box);
        return color_box;
      })
      params.container.appendChild(product_template);
      return product_template
    })
    __infinity_scroll(products[products.length - 3], params.container);
    __templates.busy_loading('hide');
  })
}

export const __infinity_scroll = (anchor, container) => {
  let block_loader = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let block = entry.target;
        console.log('block: ', block);
        container.innerHTML += __templates.busy_loading('show');
        __init_product_list({
          infinity: true,
          container: container,
          query: __init_filter(window.data_filter, container),
        });
        block_loader.unobserve(block);
      }
    })
  });
  block_loader.observe(anchor);
};
