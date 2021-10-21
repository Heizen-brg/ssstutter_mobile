import { __icons } from "./share/_icons.js";


export const __templates_footer = {
  footer() {
    let footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div>
        <div class="company__info">
          <img src="https://sss.leanservices.work/wp-content/uploads/2021/03/LOGO-SSSTUTTER-NEW.png"/>
          <ul>
            <li>Hotline :086 993 6266</li>
            <li>Email : info@ssstutter.com</li>
          </ul>
        </div>
        <div class="company__policy">
          <ul>
            <li><a href="">giới thiệu thương hiệu</a></li>
            <li><a target="_blank" href="https://www.facebook.com/ssstutterrecruitment">thông tin tuyển dụng</a></li>
            <li><a href="/address">thông tin cửa hàng</a></li>
          </ul>
          <ul>
            <li><a href="">chính sách đổi trả</a></li>
            <li><a href="">chính sách bảo hành</a></li>
            <li><a href="">chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>
      <div>
        <div class="about__us">
          <p>SSStutter với thông điệp “Refined from Inside - Bảnh bao từ bên trong” - đó là khi bạn không chỉ ăn mặc đẹp, mà
            còn có một lối sống “Tinh gọn” - Tinh tế và Gọn gàng hơn bất cứ ai khác.</p>
          <p>
          SSStutter luôn tin rằng: Mặc đẹp là chuyện ai cũng có thể làm, nhưng chưa chắc đã được người đối diện tôn trọng. Muốn được tôn trọng, bạn phải kết hợp được 2 tiêu chí: “Ăn Mặc Bảnh Bao - là khi bạn mặc những gì phù hợp với bản thân, và phải Thay đổi bản thân từ bên trong - từ Thói Quen Sống Tinh Tế cho đến cách Cư Xử Chuẩn Mực.</p>
        </div>
        <div class="social__network">
          <a target="_blank" href="https://www.facebook.com/ssstuttershop">${__icons.facebook}</a>
          <a target="_blank" href="https://www.instagram.com/ssstutter">${__icons.instagram}</a>
          <a target="_blank" href="https://www.tiktok.com/@ssstuttershop?">${__icons.tiktok}</a>
          <a target="_blank" href="https://www.youtube.com/channel/UCK4XUs0UpsKDAli2GmcTOcg">${__icons.youtube}</a>
        </div>
      </div>
      <div class="end__footer">
        <h1>Copyright ⓒ by Leanow joint stock company </h1>
        <div class="mobile__app">
          <a>${__icons.ios}</a>
          <a href="https://play.google.com/store/apps/details?id=ssstutter.com.app">${__icons.android}</a>
          <p>Tải xuống ứng dụng</p>
        </div>
      </div>
    `;
    return footer;
  }
};
