// src/LoginPage.js


import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-[#00000080] bg-cover bg-center bg-[url('./assets/loginbg.png')] "
      
    >
      <div className="bg-[#00000080] h-full w-full flex justify-center items-center">
      <div className="/bg-black  /bg-opacity-50 p-8 /rounded-lg text-white flex flex-col justify-center items-center max-w-lg w-full text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 ">Welcome Onboard</h1>
        <p className="text-sm md:text-lg mb-6 ">
          Lorem ipsum dolor sit amet consectetur. Ullamcorper sed id at sagittis
          nisl sapien.
        </p>

        <div className="/space-y-4 flex justify-center items-center flex-col gap-[22px] ">
          <label className="flex items-center border-[1px] border-[#BDB8B8] bg-[#99989833] gap-[20px] md:gap-[84px] p-[16px] md:p-[26px] w-[300px] md:w-[621px] font-[400] text-[20px] md:text-[28px] leading-[38.73px]">
            <input type="radio" name="role" value="user" className="/mr-2 custom-radio" />
            Login as User
          </label>
          <label className="flex items-center border-[1px] border-[#BDB8B8] bg-[#99989833] gap-[20px] md:gap-[84px] p-[16px] md:p-[26px] w-[300px] md:w-[621px] font-[400] text-[20px] md:text-[28px] leading-[38.73px]">
            <input type="radio" name="role" value="admin" className="/mr-2 custom-radio" />
            Login as Admin
          </label>
          <label className="flex items-center border-[1px] border-[#BDB8B8] bg-[#99989833] gap-[20px] md:gap-[84px] p-[16px] md:p-[26px] w-[300px] md:w-[621px] font-[400] text-[20px] md:text-[28px] leading-[38.73px]">
            <input
              type="radio"
              name="role"
              value="supervisor"
              className="/mr-2 custom-radio"
            />
            Login as Supervisor
          </label>
        </div>

        <Link to={'/signin'} className="mt-6 bg-[#020252] hover:opacity-[70%] text-white py-2 px-4 rounded w-[300px] /md:w-[621px] font-[400] text-[20px] md:text-[28px] leading-[38.73px]">
          Proceed
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
