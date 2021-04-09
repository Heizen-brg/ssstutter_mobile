export const __template_search = {
  input(params = {}) {
    let div = document.createElement('div');
    div.className = 'input';
    div.innerHTML = `
        <input type="text" placeholder="Tìm kiếm..." />
    `;
    return div;
  },
}