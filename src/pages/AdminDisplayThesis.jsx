// import React from "react";
import del from "./../assets/delete.png";
import edit from "./../assets/edit.png";
import upload from "./../assets/upload.png";

const AdminDisplayThesis = () => {
  let thesis = null;
  return (
    <div>
      <div className="flex">
        <div className="hidden lg:block w-[20%] h-screen bg-[#020252] fixed"></div>

        <div className="flex w-[100%]">
          <div className="hidden lg:block w-[20%]"></div>
          <div className="w-full lg:w-[80%] px-[20px] pt-[70px] overflow-x-auto">
            {/* Add a scrollable container */}
            <div className="overflow-x-auto">
              <table className="bg-[#F8F4F8] min-w-[600px]">
                <thead>
                  <tr className="pt-[45px] pb-[20px]">
                    <th className="pt-[45px] pb-[20px] w-[5%]">S/N</th>
                    <th className="pt-[45px] pb-[20px] w-[30%]">Title</th>
                    <th className="pt-[45px] pb-[20px] w-[20%]">Author</th>
                    <th className="pt-[45px] pb-[20px] w-[10%] xl:w-[20%]">Year</th>
                    <th className="pt-[45px] pb-[20px] w-[15%]">Last modi...</th>
                    <th className="pt-[45px] pb-[20px] w-[20%] xl:w-[15%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {thesis === null ? (
                    <tr className="bg-[#F4F4F4] mb-[15px] shadow shadow-[#00000040]">
                      <td className="text-center pt-[26px] pb-[18px]">1</td>
                      <td className="text-start pt-[26px] pb-[18px]  /truncate">
                        A Lexico-Semantics Analysis of Joy of Motherhood.
                      </td>
                      <td className="text-center pt-[26px] pb-[18px] /truncate">
                        Esther Oluwaferanmi
                      </td>
                      <td className="text-center pt-[26px] pb-[18px]">2023</td>
                      <td className="text-center pt-[26px] pb-[18px]">July, 24</td>
                      <td className="pt-[35px] pb-[18px] flex flex-col md:flex-row gap-[10px] justify-center items-center h-full">
                        <img
                          src={upload}
                          alt=""
                          className="p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                        />
                        <img
                          src={edit}
                          alt=""
                          className="/p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                        />
                        <img
                          src={del}
                          alt=""
                          className="/p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                        />
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
                          <img
                            src={upload}
                            alt=""
                            className="p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                          />
                          <img
                            src={edit}
                            alt=""
                            className="/p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                          />
                          <img
                            src={del}
                            alt=""
                            className="/p-[5px] border-[1px] border-[#000000] rounded-[8px]"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDisplayThesis;
