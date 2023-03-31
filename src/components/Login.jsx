import React, { useEffect, useState } from "react";
import { Input, Button } from ".";

const Login = ({ isOpen, handleClose }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const handleLogin = () => {};
  const toRegister = () => {};
  return (
    <div>
      <div
        onClick={handleClose}
        className={`absolute z-40 w-full ${
          isOpen ? "h-full w-screen" : "h-0 w-0"
        } bg-primary-300 backdrop-blur-1 transition`}
      ></div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed w-screen h-screen md:w-1/2 lg:w-1/4 sm:h-auto sm:translate-y-[79px] overflow-auto z-50 top-0 right-0 ease-in-out bg-secondary transition-all duration-300 sm:border`}
      >
        <div className="h-screen overflow-auto w-full p-4 bg-secondary">
          {/* login */}
          {isLogin && (
            <div>
              <div className=" flex flex-col justify-center items-center sm:p-10 gap-2 ">
                <img src="/img/login.png" className="w-24 h-24" />
                <h1 className="font-medium">ssstutter</h1>
              </div>
              <div className="flex flex-col gap-10 mt-10">
                <Input
                  label="Email"
                  className="w-full "
                  name="email"
                  onChange={handleLogin}
                  value={login.email}
                />
                <Input
                  label="Password"
                  className="w-full"
                  name="password"
                  onChange={handleLogin}
                  value={login.password}
                />
              </div>
              <p className="w-full text-end p-2 cursor-pointer">
                Quên mật khẩu ?
              </p>
              <div className="mt-10">
                <Button className="px-4 py-2 w-full">đăng nhập</Button>
              </div>
              <div className="p-4 mt-20">
                <p className="text-center cursor-pointer">
                  Bạn chưa có tài khoản ? <strong>đăng ký ngay</strong>
                </p>
              </div>
            </div>
          )}
          {/* register */}
          {register && (
            <div>
              <div className=" flex flex-col justify-center items-center sm:p-4 gap-2 ">
                <h1 className="font-medium uppercase text-2xl">đăng ký</h1>
                <p className="text-xs">
                  Điền đầy đủ thông tin để đăng ký thành viên
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-10">
                <Input label="Họ và tên" />
                <Input label="Số điện thoại" />
                <Input label="Email" />
                <Input label="Mật khẩu" />
                <Input label="Ngày sinh" />
              </div>
              <div className="mt-10">
                <Button className="px-4 py-2 w-full">đăng ký</Button>
              </div>
              <div className="p-4 mt-10">
                <p className="text-center cursor-pointer">
                  Bạn đã có tài khoản ? <strong>đăng nhập</strong>
                </p>
              </div>
            </div>
          )}
          {/* forgot pws */}
          {forgotPass && (
            <div>
              <div className=" flex flex-col justify-center items-center sm:p-4 gap-2 ">
                <h1 className="font-medium uppercase text-2xl">đăng ký</h1>
                <p className="text-xs">
                  Điền đầy đủ thông tin để đăng ký thành viên
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-10">
                <Input label="Email" />
              </div>
              <div className="mt-10">
                <Button className="px-4 py-2 w-full">xác nhận</Button>
              </div>
              <div className="p-4 mt-10">
                <p className="text-center cursor-pointer">
                  quay lại <strong>đăng nhập</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
