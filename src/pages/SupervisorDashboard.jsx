// import React from 'react'
import user from "./../assets/user.svg";
import comment from "./../assets/comment.svg"
import { Link } from "react-router-dom";
const SupervisorDashboard = () => {
    let thesis = null;
  return (
    <div className="pt-[41px] px-[20px] md:px-[30px] bg-[#F4F4F4]">
        <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px] w-fit">
          <img src={user} alt="" />
          <span className="flex flex-col gap-[10px]">
            <p className="font-[600] text-[20px] leading-[24.2px]">
              Name<span className="ml-[17px] font-[400]">Fasanya Favour</span>
            </p>
            <p className="font-[600] text-[20px] leading-[24.2px]">
              Status<span className="ml-[17px]">Supervisor</span>
            </p>
          </span>
        </div>



        <div className="overflow-x-auto">
              <table className=" min-w-[600px] w-full overflow-x-auto mb-[40px]">
                <thead>
                  <tr className="pt-[45px] pb-[20px]">
                    <th className="pt-[45px] pb-[20px] w-[5%]">S/N</th>
                    <th className="pt-[45px] pb-[20px] w-[30%]">Title</th>
                    <th className="pt-[45px] pb-[20px] w-[20%]">Author</th>
                    <th className="pt-[45px] pb-[20px] w-[10%] xl:w-[10%]">Year</th>
                    <th className="pt-[45px] pb-[20px] w-[15%]">Last modi...</th>
                    <th className="pt-[45px] pb-[20px] w-[20%] /xl:w-[15%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {thesis === null ? (
                    <tr className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040]">
                      <td className="text-center pt-[26px] pb-[18px]">1</td>
                      <td className="text-start pt-[26px] pb-[18px]  /truncate">
                        A Lexico-Semantics Analysis of Joy of Motherhood.
                      </td>
                      <td className="text-center pt-[26px] pb-[18px] /truncate">
                        Esther Oluwaferanmi
                      </td>
                      <td className="text-center pt-[26px] pb-[18px]">2023</td>
                      <td className="text-center pt-[26px] pb-[18px]">July, 24</td>
                      <td className="pt-[35px] pb-[18px] flex /flex-col flex-row gap-[20px] justify-center items-center h-full">
                        <span className="bg-[#D9D9D9] rounded-[25px] ">
                            <img src={comment} alt="" className="p-[11px]"/>
                        </span>

                        <Link to={'/supervisorApproval'} className="py-[10px] px-[16px] bg-[#020252] text-white rounded-[21px] text-[10px] lg:text-[16px]">Full details</Link>
                      </td>
                      
                    </tr>
                  ) : (
                    thesis.map((thesis, index) => (
                      <tr
                        key={index}
                        className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040]"
                      >
                        <td className="pt-[26px] pb-[18px]">{index + 1}</td>
                        <td className="pt-[26px] pb-[18px]">{thesis.title}</td>
                        <td className="pt-[26px] pb-[18px]">{thesis.author}</td>
                        <td className="pt-[26px] pb-[18px]">{thesis.year}</td>
                        <td className="pt-[26px] pb-[18px]">{thesis.lastModified}</td>
                        <td className="pt-[35px] pb-[18px] flex gap-[10px] justify-center items-center h-full">
                          
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default SupervisorDashboard