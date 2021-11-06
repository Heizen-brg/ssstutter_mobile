import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";


export const __templates_blog = {
  blog_highlight() {
    let section = document.createElement('section');
    section.className = 'highlight';
    section.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/post/get?limit=3&skip=0`
    }, (res) => {
      let highlight_item = (res || []).map(item => {
        return `
          <div class="highlight__item">
            <a href="blog/article/${item.slug}">
              <span style="background-image: url(https://sss-dashboard.leanservices.work${item.thumbnail}.jpeg)"></span>
            </a>
            <p><a href="blog/article/${item.slug}">${item.title}</a></p>
          </div>
        `
      }).join('');
      section.innerHTML = highlight_item
    })
    return section;
  },
  blog_categories() {
    let section = document.createElement('section');
    section.className = 'category';
    section.innerHTML = `
        <h1>Danh mục</h1>
        <ul>
        </ul>
    `;
    let cate_list = section.querySelector('ul');
    cate_list.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/blog/get`
    }, (res) => {
      let cate_blog_item = (res || []).map(cat => {
        return `
        <li>
          <a href="/">
            <span
              style="background-image: url(https://sss-dashboard.leanservices.work/${cat.thumbnail}.jpeg);"></span>
          </a>
          <p><a href="">${cat.title}</a></p>
        </li>
        `
      }).join('');
      cate_list.innerHTML = cate_blog_item;
    })
    return section;
  },
  blog_latest() {
    let section = document.createElement('section');
    section.className = 'latest';
    section.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/post/get?skip=3`
    }, (res) => {
      let blog_item = (res || []).map(item => {
        return `
        <li>
          <a href="blog/article/${item.slug}">
            <span style="background-image: url(https://sss-dashboard.leanservices.work${item.thumbnail}.jpeg)"></span>
          </a>
          <p>
            <a href="blog/article/${item.slug}">
              <i>${item.category}</i>
              <strong>${item.title}</strong>
            </a>
          </p>
        </li>
        `
      }).join('');
      section.innerHTML = `<ul>${blog_item}</ul>`
    })
    return section;
  },
}