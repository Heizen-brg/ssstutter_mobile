import { __templates } from "./share/_components.js";
import {
  __currency_format,
  __init_filter,
  __init_product_list,
} from "./share/_function.js";
import { __icons } from "./share/_icons.js";
export const __templates_landing = {
  body(params) {
    console.log(params);
    let div = document.createElement('div');
    let script = JSON.parse(params.script);
    // let css = JSON.parse(params.css);
    div.innerHTML = `
    <style>${params.css}</style>
    ${params.content.blocks[0].data.html}
    `;
    script
    return div;
  }
};
