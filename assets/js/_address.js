import { __icons } from "./share/_icons.js";

export const __templates_address = {
  map_banner() {
    let div = document.createElement('div');
    div.className = ' map__banner';
    div.innerHTML = `
    <h1>Thông tin cửa hàng</h1>
      <div style="background-image:url(assets/img/MAP.jpg)"></div>
    `;
    return div;
  },
  address_info() {
    let div = document.createElement('div');
    div.className = 'address__info';
    div.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Khu Vực</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Chỉ đường</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hai Bà Trưng</td>
            <td>SSStutter Tô Hiến Thành</td>
            <td>70 Tô Hiến Thành, Quận Hai Bà Trưng</td>
            <td><a target="_blank" href="https://goo.gl/maps/HxXoPDbXhwm9tCiV6">${__icons.location}</a></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Đống Đa</td>
            <td>SSStutter Đặng Văn Ngữ</td>
            <td>105-D6, ngõ 4B Đặng Văn Ngữ, Quận Đống Đa</td>
            <td><a target="_blank" href="https://goo.gl/maps/TCM36tSPpeM8CCDG6">${__icons.location}</a></td>
          </tr>
        </tbody>
      </table>
    `;
    return div;
  }
}