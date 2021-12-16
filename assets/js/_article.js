import { SimpleImage, Header, Paragraph, List, Button } from "./editor-plugin/plugin-list.js";
import { __requests } from "./main.js";
import { __templates } from "./share/_components.js";
export const __templates_article = {
  related() {
    let div = document.createElement('div');
    div.className = 'article__related';
    div.innerHTML = __templates.busy_loading('show');
    __requests({
      method: 'GET',
      url: `https://sss-dashboard.leanservices.work/w/post/get?limit=3&skip=0`
    }, ({ data }) => {
      let highlight_item = (data || []).map(item => {
        return `
          <li>
            <a href=""><span style="background-image: url(https://sss-dashboard.leanservices.work${item.thumbnail}.jpeg)"></span></a>
            <p>
              <a href="/blog/article/${item.slug}">
                <i>${item.category}</i>
                <strong>${item.title}</strong>
              </a>
            </p>
          </li>
        `
      }).join('');
      div.innerHTML = `<ul>${highlight_item}</ul>`;
    })
    return div;
  },
  content(params) {
    let data = params.data;
    let div = document.createElement('div');
    div.className = 'article__content';
    div.innerHTML = `
    <div class="article__content--header">
      <h1>${data.title}</h1>
      <em>${data.description}</em>
      <div class="author__info">
        <div class="author__info--avt">
          <span style="background-image:url(https://scontent.fpnh22-2.fna.fbcdn.net/v/t1.6435-1/cp0/p60x60/118352062_336869434361524_3904123208517827605_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=2abdc3&_nc_ohc=rxzzAsVLYeUAX9k1zl5&_nc_ht=scontent.fpnh22-2.fna&tp=27&oh=cd6d01736dde02947faec483ff817ed3&oe=60D1A9C9)">
          </span>
        </div>
        <div class="author__info--overview">
          <p class="name">${data.author}</p>
          <p>Content Creator</p>
        </div>
      </div>
      <div class="article__banner">
        <span style="background-image:url(https://sss-dashboard.leanservices.work${data.thumbnail}.jpeg)"></span>
      </div>
    </div>
    <div class="article__content--body" id="article"></div>
    `;
    let editor = new EditorJS({
      holderId: 'article',
      readOnly: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        button : {
          class : Button,
          inlineToolbar : true,
        },
      },
      data: {
        blocks: data.content.blocks
      }
    });
    return div;
  },
};


