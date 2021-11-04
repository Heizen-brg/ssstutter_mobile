function campaign_cateory_cate(data) {
  function create_element(e) {
    let dom_create = document.createElement(e);
    return dom_create;
  }

  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('category-campaign-page');
  
  return template;
}

export default campaign_cateory_cate;