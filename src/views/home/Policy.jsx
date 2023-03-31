import React from "react";
import { Icon } from "../../components";
const Policy = () => {
  return (
    <section className="px-4 flex flex-col items-center">
      <hr className="w-1/12 bg-primary-500 border-primary h-[2px]" />
      <ul className="w-full grid grid-cols-3 gap-4 my-6">
        <li className="place-content-center grid justify-items-center ">
          <Icon name="credit" color="gray" width="50" height="50" />
          <p className="text-center text-gray-400 text-xs m-2">Ưu đãi khi thanh toán chuyển khoản </p>
        </li>
        <li className="place-content-center grid justify-items-center ">
          <Icon name="ship" color="gray" width="50" height="50" />
          <p className="text-center text-gray-400 text-xs m-2">Vận chuyển toàn quốc 10.000-20.000</p>
        </li>
        <li className="place-content-center grid justify-items-center ">
          <Icon name="return" color="gray" width="50" height="50" />
          <p className="text-center text-gray-400 text-xs m-2">Miễn Phí đổi trả 2 tuần </p>
        </li>
      </ul>
      <hr className="w-1/12 bg-primary-500  border-primary h-[2px]" />
    </section>
  );
};

export default Policy;
