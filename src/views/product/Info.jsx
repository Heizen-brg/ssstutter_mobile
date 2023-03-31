import React, { useEffect, useState } from "react";
import Editor from "../../plugin/Editor";

const Info = (props) => {
  const { shortDescription } = props;
  const [info, setInfo] = useState("shortDes");
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (shortDescription) setDescription(shortDescription);
  }, [shortDescription]);

  return (
    <div className="p-4">
      <ul className="flex justify-between border-b px-2">
        <li
          className={`cursor-pointer hover:text-black  text-primary-100 py-1 border-b  ${
            info == "shortDes" ? "text-black" : ""
          }`}
          onClick={() => setInfo("shortDes")}
        >
          Mô tả
        </li>
        <li
          className={`cursor-pointer hover:text-black  text-primary-100 py-1 border-b  ${
            info == "policy" ? "text-black" : ""
          }`}
          onClick={() => setInfo("policy")}
        >
          Giao hàng và thanh toán
        </li>
        <li
          className={`cursor-pointer hover:text-black  text-primary-100 py-1 border-b  ${
            info == "detail" ? "text-black" : ""
          }`}
          onClick={() => setInfo("detail")}
        >
          Tips
        </li>
      </ul>
      {info == "shortDes" && (
        <div className="py-2 ">
          {description && description.blocks?.length > 0 && (
            <>
              <Editor content={description} id="product_des" />
            </>
          )}
          {description && !description.blocks?.length && (
            <p className="text-center text-md">
              Chưa có mô tả cho sản phẩm này
            </p>
          )}
        </div>
      )}
      {info == "policy" && (
        <div className="p-2 sm:p-4 sm:mt-5 ">
          <h3 className="capitalize font-semibold">chính sách giao hàng</h3>
          <table className="table-auto border-collapse border border-slate-500 mt-2">
            <thead>
              <tr>
                <th className="border uppercase text-xs p-2">khu vực</th>
                <th className="border uppercase text-xs p-2">phí giao hàng</th>
                <th className="border uppercase text-xs p-2">
                  thời gian vận chuyển
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  Nội thành Hà Nội & TP. Hồ Chí Minh
                </td>
                <td className="border p-2">Đồng giá 10.000Đ</td>
                <td className="border p-2">1-2 ngày làm việc.</td>
              </tr>
              <tr>
                <td className="border p-2">
                  Ngoại thành Hà Nội & TP. Hồ Chí Minh
                </td>
                <td className="border p-2">Đồng giá 20.000Đ</td>
                <td className="border p-2">3-7 ngày làm việc.</td>
              </tr>
              <tr>
                <td className="border p-2">Các tỉnh thành khác</td>
                <td className="border p-2">Đồng giá 20.000Đ </td>
                <td className="border p-2">5-7 ngày làm việc.</td>
              </tr>
            </tbody>
          </table>

          <h3 className="capitalize font-semibold mt-4">
            chính sách thanh toán
          </h3>
          <p>
            Khách hàng mua hàng tại SSSTUTTER có thể thanh toán bằng 3 hình thức
            sau:
          </p>
          <ul className="list-decimal px-4 py-2">
            <li className="text-xs p-2">
              Trả tiền khi nhận hàng (COD): khi nhận được hàng, người nhận hàng
              sẽ thanh toán trực tiếp cho người giao hàng. Khoản thanh toán bao
              gồm tiền hàng và phí giao hàng cho vận chuyển.
            </li>
            <li className="text-xs p-2">Thanh toán qua ví ShopeePay.</li>
            <li className="text-xs p-2">
              Thanh toán bằng thẻ ATM nội địa/thẻ thanh toán quốc tế Visa,
              MasterCard.
            </li>
          </ul>
        </div>
      )}
      {info == "detail" && (
        <div className="p-4 sm:p-2 ">
          <h3 className="capitalize font-semibold mt-4">bảo quản</h3>
          <p>*Lưu ý</p>
          <ul className="list-decimal px-4 py-2">
            <li className="text-xs p-2">
              Không để quần áo ở nơi ẩm và nên giặt ngay sau khi sử dụng để
              tránh ẩm mốc
            </li>
            <li className="text-xs p-2">
              Không giặt chung áo trắng với quần áo màu
            </li>
            <li className="text-xs p-2">
              Không nên giặt trong nước nóng quá 40 độ để tránh bị giãn và mất
              form
            </li>
            <li className="text-xs p-2">
              Không đổ trực tiếp bột giặt lên quần áo khi giặt để tránh bị phai
              và loang màu
            </li>
            <li className="text-xs p-2">
              Không ngâm trong xà phòng quá lâu để tránh bạc màu
            </li>
          </ul>
          <p>*Mẹo giữ quần áo lâu mới</p>
          <ul className="list-decimal px-4 py-2">
            <li className="text-xs p-2">
              Nên giặt áo bằng nước lạnh hoặc nước hơi ấm, nước nóng sẽ làm vải
              áo giãn ra
            </li>
            <li className="text-xs p-2">
              Phơi áo dưới nắng nhẹ, tránh nắng gắt để áo không bị bạc màu
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Info;
