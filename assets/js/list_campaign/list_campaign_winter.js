import { __icons } from "../share/_icons.js";

function list_campaign_winter() {
  function create_element(e) {
    let dom_create = document.createElement(e);
    
    return dom_create;
  }
  
  function remove_element(e) {
    if (document.querySelector(e)) document.querySelector(e).remove();
  }
  
  let template = create_element('div');
  template.classList.add('list-campaign-page-wrapper');
  
  function section_video() {
    let div = create_element('section');
    div.classList.add('section-video', 'container');
    div.innerHTML = `
    <video width="100%" autoplay playsinline muted loop>
      <source type="video/mp4" src="/assets/img/1.mp4">
    </video>
    `;
    
    return div;
  }
  
  function section_banner() {
    let div = create_element('section');
    div.classList.add('section-banner', 'container');
    div.innerHTML = `
    <div class="image" style="background-image: url(/assets/img/16.9-01.jpg)"></div>
    <div class="content">
      <h2><span>new</span>Heritage</h2>
      <p>
        A curated transitional wardwore of repurposed classic featuring a vibrant selection of timeless heritage staples including outerwear, knitwear, premium shirting, jeans and accessories all in updated shape, farbics and colorways. This mix of sportwear, workwear and tailoring allows for more versatile wardwore combination that are perfect for autumn season.
      </p>
    </div>
    `;
    
    return div;
  }
  
  function section_collections() {
    let div = create_element('section');
    div.classList.add('section-collection', 'container');
    div.innerHTML = `
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/1.jpg)"></a>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/2.jpg)"></a>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/3.jpg)"></a>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/4.jpg)"></a>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/5.jpg)"></a>
    </div>
    <div class="item">
      <a class="image" href="#" style="background-image: url(/assets/img/6.jpg)"></a>
    </div>
    `;
    
    return div;
  }
  
  function section_gallery() {
    let div = create_element('section');
    div.classList.add('section-gallery');
    div.innerHTML = `
    <div class="item" style="background-image: url(/assets/img/04.1.jpg)"></div>
    <div class="item" style="background-image: url(/assets/img/06.3.jpg)"></div>
    `;
    
    return div;
  }
  
  function section_end() {
    let div = create_element('section');
    div.classList.add('section-banner', 'container');
    div.innerHTML = `
    <div class="image" style="background-image: url(/assets/img/feedback02.jpg)"></div>
    <div class="content">
      <h2 style="transform: translate(-50%, -50%)"><span>new</span>Heritage</h2>
    </div>
    `;
    
    return div;
  }
  
  template.appendChild(section_video());
  template.appendChild(section_banner());
  template.appendChild(section_collections());
  template.appendChild(section_gallery());
  template.appendChild(section_end());
  
  return template;
}

export default list_campaign_winter;