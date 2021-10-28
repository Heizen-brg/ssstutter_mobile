import { __icons } from "../share/_icons.js";

export class QuoteTool {
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }


  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'EM';
    this.class = 'cdx-quote';
  }


  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = __icons.quote;
    this.button.classList.add(this.api.styles.inlineToolButton);
    return this.button;
  }

  surround(range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }
    this.wrap(range);

  }

  wrap(range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);
    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();
    mark.remove();
    range.insertNode(text);
  }


  checkState(selection) {
    const mark = this.api.selection.findParentTag(this.tag);

    this.state = !!mark;
  }

}
export class FontSize {
  static get isInline() {
    return true;
  }
  // static title = 'Font Size';


  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  get shortcut() {
    return 'ALT+Q';
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'SIZE';
    this.class = 'cdx-size';
  }


  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = __icons.size;
    this.button.classList.add(this.api.styles.inlineToolButton);
    return this.button;
  }

  surround(range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }
    this.wrap(range);

  }

  wrap(range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);
    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();
    mark.remove();
    range.insertNode(text);
  }


  checkState(selection) {
    const mark = this.api.selection.findParentTag(this.tag);
    this.state = !!mark;
    if (this.state) {
      this.showActions(mark);
    } else {
      this.hideActions();
    }
  }


  renderActions() {
    this.fontPicker = document.createElement('select');
    this.fontPicker.className = 'font__picker';
    this.fontPicker.hidden = true;
    this.fontPicker.value = 'medium';
    this.fontPicker.innerHTML = `
      <option value="x-small">Smaller</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
      <option value="x-large">Larger</option>
    `;
    return this.fontPicker;
  }

  showActions(mark) {
    const { fontSize } = mark.style;
    this.fontPicker.value = fontSize ? fontSize : 'medium';

    this.fontPicker.onchange = () => {
      mark.style.fontSize = this.fontPicker.value;
    };
    this.fontPicker.hidden = false;
  }

  hideActions() {
    this.fontPicker.onchange = null;
    this.fontPicker.hidden = true;
  }

  clear() {
    this.hideActions();
  }
}
export class ColorTool {
  static get isInline() {
    return true;
  }

  // static title = 'Text Color';

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  get shortcut() {
    return 'ALT+Q';
  }
  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'COLOR';
    this.class = 'cdx-color';
  }


  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = __icons.text_color;
    this.button.classList.add(this.api.styles.inlineToolButton);
    return this.button;
  }

  surround(range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }
    this.wrap(range);

  }

  wrap(range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);
    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();
    mark.remove();
    range.insertNode(text);
  }


  checkState(selection) {
    const mark = this.api.selection.findParentTag(this.tag);
    this.state = !!mark;
    if (this.state) {
      this.showActions(mark);
    } else {
      this.hideActions();
    }
  }


  renderActions() {
    this.colorPicker = document.createElement('input');
    this.colorPicker.type = 'color';
    this.colorPicker.value = '#c1272d';
    this.colorPicker.className = 'color__picker';
    this.colorPicker.hidden = true;

    return this.colorPicker;
  }

  showActions(mark) {
    const { color } = mark.style;
    this.colorPicker.value = color ? this.convertToHex(color) : '#c1272d';

    this.colorPicker.onchange = () => {
      mark.style.color = this.colorPicker.value;
    };
    this.colorPicker.hidden = false;
  }

  hideActions() {
    this.colorPicker.onchange = null;
    this.colorPicker.hidden = true;
  }
  convertToHex(color) {
    const rgb = color.match(/(\d+)/g);

    let hexr = parseInt(rgb[0]).toString(16);
    let hexg = parseInt(rgb[1]).toString(16);
    let hexb = parseInt(rgb[2]).toString(16);

    hexr = hexr.length === 1 ? '0' + hexr : hexr;
    hexg = hexg.length === 1 ? '0' + hexg : hexg;
    hexb = hexb.length === 1 ? '0' + hexb : hexb;

    return '#' + hexr + hexg + hexb;
  }
  clear() {
    this.hideActions();
  }
}


