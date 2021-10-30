import { __icons } from "./share/_icons.js";


export const __templates_footer = {
  footer() {
    let footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
    <div class="footer-row">
      <div>
        <h4>ssstutter</h4>
        <p class="about">Với thông điệp "Refined Life", SSStutter mong muốn đem đến cho khách hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.</p>
      </div>
      <div>
        <h4>Chi nhánh Hà Nội</h4>
        <p>105 - D6, ngõ 4B Đặng Văn Ngữ</p>
        <p>70 Tô Hiến Thành</p>
        <p>167 Cầu Giấy</p>
        <p>46 Đông Các</p>
        <br>
        <h4>Chi nhánh TP. Hồ Chí Minh</h4>
        <p>Lầu 1, số 25, Nguyễn Trãi, Q1</p>
        <p>152 Nguyễn Gia Trí, Bình Thạnh</p>
      </div>
      <div>
        <h4>Liên hệ</h4>
        <p>Hotline: 086 993 6266</p>
        <p>Email: info@ssstutter.com</p>
      </div>
      <div>
        <h4>Social</h4>
        <a target="_blank" href="https://www.facebook.com/ssstuttershop">${__icons.facebook}</a>
        <a target="_blank" href="https://www.instagram.com/ssstutter">${__icons.instagram}</a>
        <a target="_blank" href="https://www.youtube.com/channel/UCK4XUs0UpsKDAli2GmcTOcg">${__icons.youtube}</a>
        <a target="_blank" href="https://www.tiktok.com/@ssstuttershop?">${__icons.tiktok}</a>
      </div>
    </div>
    
    <p class="copy">Copyright ⓒ by Leanow Joint Stock Company </p>
    `;
    return footer;
  }
};
