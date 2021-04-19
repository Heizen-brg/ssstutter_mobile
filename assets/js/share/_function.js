import { __templates } from "./_components.js";

export const __remove_item_in_array = (el, array) => {
  let index = array.indexOf(el);
  if (index > -1) array.splice(index, 1);
  return [...new Set(array)];
}

export const __init_filter = (data) => {
  let products_container = document.querySelector('.categories__products > ul');
  let cat_id = products_container.dataset.cate;
  let query = '';
  if (cat_id) query = '?cat=' + cat_id;
  return query += data.q.map(i => i.data.length ? `&${i.tax}=${[...new Set(i.data)].join(',')}` : '').join('');
}