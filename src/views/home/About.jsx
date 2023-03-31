import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-6">
      <div
        className="bg-[url('/img/store.jpeg')] bg-cover p-4 grayscale flex justify-end"
      >
        <div className="w-3/4 sm:w-1/2 p-4 sm:p-20 sm:my-40 bg-primary-100 text-secondary backdrop-blur-sm ">
          <h1 className="text-5xl mb-2 sm:text-6xl sm:mb-5">ssstutter</h1>
          <p className="sm:text-xl">
            Với thông điệp "Refined Life", SSStutter mong muốn đem đến cho khách
            hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
