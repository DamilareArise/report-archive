// import React from 'react'
import user from "./../assets/user.svg";
import comment from "./../assets/comment.svg"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const SupervisorDashboard = ({ app }) => {
  const [thesisList, setThesisList] = useState([]);
  const [signuser, setUser] = useState(null);

  const auth = getAuth();
  const database = getDatabase(app);
  const navigate = useNavigate();

 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    const thesisRef = ref(database, `thesis/`);

    // Using onValue to listen to the data in real-time
    onValue(thesisRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object into an array of thesis data
        const thesisArray = Object.keys(data).map((userId) => {
          return { userId, ...data[userId] };
        });
        console.log(thesisArray);

        // Update state with the thesis list
        setThesisList(thesisArray);
      }
    });
  }, [auth, navigate]);
    
  return (
    <div className="pt-[41px] px-[20px] md:px-[30px] bg-[#F4F4F4]">
        <div className="py-[24px] px-[16px] inline-flex gap-[15px] bg-[#7B7BB780] rounded-[17px] w-fit">
          <img src={user} alt="" />
          <span className="flex flex-col gap-[10px]">
            <p className="font-[600] text-[20px] leading-[24.2px]">
              Name<span className="ml-[17px] font-[400] uppercase ">{signuser ? signuser.displayName : ''}</span>
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
                    {/* <th className="pt-[45px] pb-[20px] w-[10%] xl:w-[10%]">Year</th> */}
                    <th className="pt-[45px] pb-[20px] w-[15%]">Last modi...</th>
                    <th className="pt-[45px] pb-[20px] w-[20%] /xl:w-[15%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {thesisList === null ? (
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
                    thesisList.map((thesis, index) => {
                      const documentKey = Object.keys(thesis).find(
                        (key) => key !== "userId"
                      );
                      const documentData = thesis[documentKey];
                      return (
                      <tr
                        key={index}
                        className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040]"
                      >
                        <td className="pt-[26px] pb-[18px] text-center">{index + 1}</td>
                        <td className="pt-[26px] pb-[18px] text-center">{documentData.fileName}</td>
                        <td className="pt-[26px] pb-[18px] text-center">{documentData.author}</td>
                        {/* <td className="pt-[26px] pb-[18px]">{thesis.year}</td> */}
                        <td className="pt-[26px] pb-[18px] text-center">{documentData.date_created}</td>
                        <td className="pt-[35px] pb-[18px] flex gap-[10px] justify-center items-center h-full">
                        <span className="bg-[#D9D9D9] rounded-[25px] ">
                            <img src={comment} alt="" className="p-[11px]"/>
                        </span>

                        <Link to={`/supervisorApproval/${encodeURIComponent(documentData.downloadURL)}`} className="py-[10px] px-[16px] bg-[#020252] text-white rounded-[21px] text-[10px] lg:text-[16px]">Full details</Link>
                        </td>
                      </tr>
                       )
                      })
                    )}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default SupervisorDashboard