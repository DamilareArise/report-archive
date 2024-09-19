// import React from "react";

import ham from "./../assets/hamburger.svg";
import user from "./../assets/user.svg";
import back from './../assets/back.svg';
import forward from './../assets/forward.svg';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminDashboard = () => {
  const [signuser, setUser] = useState(null);

  let activities = null;
  let users = null;
  const auth = getAuth();
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  }, [auth])


  
  return (
    <div className="pt-[41px] px-[20px] md:px-[50px] bg-[#F4F4F4]">
      {/* <Navbar/> */}
      <div className="flex justify-end mb-[52px]">
        <Link
          to={"/admindisplay"}
          className="px-[23px] py-[11px] bg-[#FFFFFF] rounded-[25px] flex gap-[10px] shadow-md shadow-[#00000040]"
        >
          <img src={ham} alt="" />
          <p className="font-[400] text-[20px] leading-[24.2px]">
            Display Thesis
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-[68px] ">
        <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px] w-fit">
          <img src={user} alt="" />
          <span className="flex flex-col gap-[10px]">
            <p className="font-[600] text-[20px] leading-[24.2px]">
              Name<span className="ml-[17px] font-[400] uppercase">{signuser ? signuser.displayName : ''}</span>
            </p>
            {/* <p className="font-[600] text-[20px] leading-[24.2px]">
              Status<span className="ml-[17px]"></span>
            </p> */}
          </span>
        </div>

        <div className="overflow-x-auto">
          <p className="mb-[9px] text-[24px] leading-[29px] font-[500]">Recent Activities</p>

          <table className="/bg-[#F8F4F8] min-w-[600px] w-full">
            <thead className=" target ">
              <tr className="/pt-[45px] /py-[20px] bg-[#ffffff] border-b-[1px] border-black">
                <th className="/pt-[45px] py-[20px] w-[10%] mb-[20px]">
                  Details
                </th>
                <th className="/pt-[45px] py-[20px] w-[30%]">Actions</th>
                <th className="/pt-[45px] py-[20px] w-[20%]">Page</th>
                <th className="/pt-[45px] py-[20px] w-[10%] xl:w-[20%]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {activities === null ? (
                <tr className="bg-[#FFFFFF] mb-[15px] shadow-md shadow-[#00000040] border-spacing-x-[18px] border-b-[1px] border-black">
                  <td className="text-center pt-[26px] pb-[18px]">Logged in</td>
                  <td className="text-center pt-[26px] pb-[18px]  /truncate">
                    Log In
                  </td>
                  <td className="text-center pt-[26px] pb-[18px] /truncate">
                    Log In
                  </td>
                  <td className="text-center pt-[26px] pb-[18px]">
                    23-05-2024
                  </td>
                  {/* <td className="text-center pt-[26px] pb-[18px]">July, 24</td> */}
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr
                    key={index}
                    className="bg-[#FFFFFF] mb-[15px] shadow-md shadow-[#00000040] border-b-[1px] border-black"
                  >
                    <td className="pt-[26px] pb-[18px]">{activity.details}</td>
                    <td className="pt-[26px] pb-[18px]">{activity.actions}</td>
                    <td className="pt-[26px] pb-[18px]">{activity.page}</td>
                    <td className="pt-[26px] pb-[18px]">{activity.date}</td>
                    {/* <td className="pt-[26px] pb-[18px]">
                      {activity.lastModified}
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto ">
          <p className="mb-[21px] text-[24px] leading-[29px] font-[500]">Sign Up/Login Activities</p>
          <div className="flex justify-between flex-col md:flex-row gap-[10px] md:w-full w-fit ">
            <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px]">
              <img src={user} alt="" />
              <span className="flex flex-col gap-[10px]">
                <p className="font-[600] text-[16px] lg:text-[20px] leading-[24.2px]">
                  New Sign up
                </p>
                <p className="font-[400] text-[16px] lg:text-[20px] leading-[24.2px]">30</p>
              </span>
            </div>

            <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px]">
              <img src={user} alt="" />
              <span className="flex flex-col gap-[10px]">
                <p className="font-[600] text-[16px] lg:text-[20px] leading-[24.2px]">
                  Total Month Sign Up
                </p>
                <p className="font-[400] text-[16px] lg:text-[20px] leading-[24.2px]">100</p>
              </span>
            </div>

            <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px]">
              <img src={user} alt="" />
              <span className="flex flex-col gap-[10px]">
                <p className="font-[600] text-[16px] lg:text-[20px] leading-[24.2px]">
                  Most Recent Activity
                </p>
                <p className="font-[400] text-[16px] lg:text-[20px] leading-[24.2px]">
                  Thesis Upload
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-[74px] overflow-x-auto">
          <p className="mb-[25px] text-[24px] leading-[29px] font-[500]">View Users</p>
          <table className="/bg-[#F8F4F8] min-w-[600px]">
            <thead className="bg-[#B4B4D2] target">
              <tr className="/pt-[45px] pb-[20px] border-b-[1px] border-black">
                <th className="/pt-[45px] py-[20px] w-[5%]">S/N</th>
                <th className="/pt-[45px] py-[20px] w-[30%]">
                  User&apos;s name
                </th>
                <th className="/pt-[45px] py-[20px] w-[35%]">Activity</th>
                <th className="/pt-[45px] py-[20px] w-[30%] xl:w-[30%]">
                  Time
                </th>
                {/* <th className="/pt-[45px] pb-[20px] w-[15%]">Last modi...</th> */}
                {/* <th className="pt-[45px] pb-[20px] w-[20%] xl:w-[15%]"></th> */}
              </tr>
            </thead>

            <tbody>
              {users === null ? (
                <tr className="bg-[#FFFFFF] mb-[15px] shadow-md shadow-[#00000040] border-spacing-x-[18px] border-b-[1px] border-black ">
                  <td className="text-center pt-[26px] pb-[18px]">1</td>
                  <td className="text-center pt-[26px] pb-[18px]  /truncate">
                    BabaTunde Akinde
                  </td>
                  <td className="text-center pt-[26px] pb-[18px] /truncate">
                    Upload Thesis
                  </td>
                  <td className="text-center pt-[26px] pb-[18px]">
                    2024-04-03 12:30:06
                  </td>
                  {/* <td className="text-center pt-[26px] pb-[18px]">July, 24</td> */}
                </tr>
              ) : (
                users.map((users, index) => (
                  <tr
                    key={index}
                    className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040] border-b-[1px] border-black"
                  >
                    <td className="pt-[26px] pb-[18px]">{index + 1}</td>
                    <td className="pt-[26px] pb-[18px]">{users.name}</td>
                    <td className="pt-[26px] pb-[18px]">{users.activity}</td>
                    <td className="pt-[26px] pb-[18px]">{users.time}</td>
                    {/* <td className="pt-[26px] pb-[18px]">
                      {users.lastModified}
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center gap-[10px] mt-[48px] self-end">
            <Link to={'/'}><img src={back} alt="" /></Link>
            <span className="font-[500] py-[6] px-[16px] text-[20px] text-white bg-[#020252] rounded-[9px]">{1}</span>
            <Link to={'/'}><img src={forward} alt="" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
