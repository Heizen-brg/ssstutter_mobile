export const __templates_blog = {
  blog_highlight() {
    let section = document.createElement('section');
    section.className = 'highlight';
    section.innerHTML = `
        <div class="highlight__item">
          <a href="https://ssstutter.com/quy-tac-1-no-luc-it-thanh-qua-cao/">
            <span style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/04/BIA-1.jpg);"></span>
          </a>
          <p><a href="https://ssstutter.com/quy-tac-1-no-luc-it-thanh-qua-cao/">QUY TẮC 1% - NỖ LỰC ÍT THÀNH QUẢ CAO?</a></p>
        </div>
        <div class="highlight__item">
          <a href="https://ssstutter.com/10-mon-do-nang-cap-ve-banh-bao-he-2021/">
            <span style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/04/blog1-1-2.png);"></span>
          </a>
          <p><a href="https://ssstutter.com/10-mon-do-nang-cap-ve-banh-bao-he-2021/">10 MÓN ĐỒ NÂNG CẤP VẺ BẢNH BAO - HÈ
              2021</a></p>
        </div>
        <div class="highlight__item">
          <a href="https://ssstutter.com/cam-300-000-di-sam-do-he-o-ssstutter/">
            <span style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/04/BIA.jpg);"></span>
          </a>
          <p><a href="https://ssstutter.com/cam-300-000-di-sam-do-he-o-ssstutter/">CẦM 300.000 ĐI SẮM ĐỒ HÈ Ở SSSTUTTER?</a></p>
        </div>
    `;
    return section;
  },
  blog_categories() {
    let section = document.createElement('section');
    section.className = 'category';
    section.innerHTML = `
        <h1>Danh mục</h1>
        <ul>
          <li>
            <a href="https://ssstutter.com/b/cong-viec-su-nghiep/">
              <span
                style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/01/20200829-LB-COLOGO-20-scaled.jpg);"></span>
            </a>
            <p><a href="">Công việc & Sự nghiệp</a></p>
          </li>
          <li>
            <a href="https://ssstutter.com/b/phat-trien-ban-than/">
              <span
                style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/01/20200829-LB-COLOGO-scaled.jpg);"></span>
            </a>
            <p><a href="">Phát triển bản thân</a></p>
          </li>
          <li>
            <a href="https://ssstutter.com/b/quan-ly-tai-chinh/">
              <span
                style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/01/20200916_90sLookbook_LG-123-scaled.jpg);"></span>
            </a>
            <p><a href="">Quản lý tài chính</a></p>
          </li>
          <li>
            <a href="https://ssstutter.com/b/tinh-cam/">
              <span
                style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/01/2-scaled.jpg);"></span>
            </a>
            <p><a href="">Tình cảm</a></p>
          </li>
        </ul>
    `;
    return section;
  },
  blog_latest() {
    let section = document.createElement('section');
    section.className = 'latest';
    section.innerHTML = `
    <ul>
      <li>
        <a href="https://ssstutter.com/5-dieu-cac-co-gai-nen-dung-neu-khong-muon-tiep-tuc-ha-thap-gia-tri-ban-than/">
          <span style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/03/4X5-NU-scaled.jpg);"></span>
        </a>
        <p>
          <a href="https://ssstutter.com/5-dieu-cac-co-gai-nen-dung-neu-khong-muon-tiep-tuc-ha-thap-gia-tri-ban-than/">
            <i>Phát triển bản thân</i>
            <strong>5 ĐIỀU CÁC CÔ GÁI NÊN DỪNG NẾU KHÔNG MUỐN TIẾP TỤC HẠ THẤP GIÁ TRỊ BẢN THÂN</strong>
          </a>
        </p>
      </li>
      <li>
        <a href="https://ssstutter.com/4-mon-qua-giup-cac-chang-trai-cham-den-trai-tim-nguoi-con-gai-dac-biet-cua-minh/">
          <span
            style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/03/20201021_SSS_LB-107-1-scaled.jpg);"></span>
        </a>
        <p>
          <a href="https://ssstutter.com/4-mon-qua-giup-cac-chang-trai-cham-den-trai-tim-nguoi-con-gai-dac-biet-cua-minh/">
            <i>Tình cảm</i>
            <strong>4 MÓN QUÀ GIÚP CÁC CHÀNG TRAI "CHẠM" ĐẾN TRÁI TIM NGƯỜI CON GÁI ĐẶC BIỆT CỦA MÌNH</strong>
          </a>
        </p>
      </li>
      <li>
        <a href="https://ssstutter.com/giai-ma-su-im-lang/">
          <span style="background-image: url(https://ssstutter.com/wp-content/uploads/2021/02/GLP13-scaled.jpg);"></span>
        </a>
        <p>
          <a href="https://ssstutter.com/giai-ma-su-im-lang/">
            <i>Tình cảm</i>
            <strong>GIẢI MÃ SỰ IM LẶNG</strong>
          </a>
        </p>
      </li>
    </ul>
    `;
    return section;
  },
}