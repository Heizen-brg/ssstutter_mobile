import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";


export const __templates_blog_category = {
  blog_highlight(params) {
    let section = document.createElement('section');
    let query = '';
    section.className = 'highlight';
    section.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/post/get?&limit=3&skip=0&${query}`
    }, ({ data }) => {
      let highlight_item = (data || []).map(item => {
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

  blog_latest(params) {
    console.log(params);
    let section = document.createElement('section');
    let query = '';
    section.className = 'latest';
    section.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/post/get?skip=3&${query}`
    }, ({ data }) => {
      let blog_item = (data || []).map(item => {
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