// import React from "react";
import del from "./../assets/delete.png";
import edit from "./../assets/edit.png";
import upload from "./../assets/upload.png";
import arrowBack from "./../assets/backw.svg";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDisplayThesis = ({ app }) => {
  const [thesisList, setThesisList] = useState([]);
  const [user, setUser] = useState(null);

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
    <div>
      <div className="flex">
        <div className="hidden lg:block w-[20%] h-screen bg-[#020252] fixed pl-[26px]">
        <Link to={"/admindashboard"} className="self-start md:self-center ">
            <img src={arrowBack} alt="Go Back" className="pt-[50px] pb-[37px]"/>
          </Link>
          <div className="w-[60px] h-[60px] bg-[#A09E9E] rounded-[400px] mr-[10px] lg:mr-[10px] mb-[18px]">
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User avatar"
                className="rounded-[400px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>
          {/* Display user email */}
          <p className="font-[600] text-[20px] leading-[24.2px] text-white pb-2">
              Name: <p className="py-2 font-[400] uppercase text-white">{user ? user.displayName : ''}</p>
            </p>
          <p className="mr-[20px] lg:mr-[40px] font-[600] text-[20px] text-white">
            Email: {user ? user.email : "Guest"}
          </p>
        </div>

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
                    {/* <th className="pt-[45px] pb-[20px] w-[10%] xl:w-[20%]">Year</th> */}
                    <th className="pt-[45px] pb-[20px] w-[15%]">
                      Last modi...
                    </th>
                    <th className="pt-[45px] pb-[20px] w-[20%] xl:w-[15%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {thesisList === null ? (
                    <tr className="bg-[#F4F4F4] mb-[15px] shadow shadow-[#00000040]">
                      <td className="text-center pt-[26px] pb-[18px]">1</td>
                      <td className="text-start pt-[26px] pb-[18px]  /truncate">
                        A Lexico-Semantics Analysis of Joy of Motherhood.
                      </td>
                      <td className="text-center pt-[26px] pb-[18px] /truncate">
                        Esther Oluwaferanmi
                      </td>
                      <td className="text-center pt-[26px] pb-[18px]">2023</td>
                      <td className="text-center pt-[26px] pb-[18px]">
                        July, 24
                      </td>
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
                          <td className="pt-[26px] pb-[18px] text-center">
                            {index + 1}
                          </td>
                          <td className="pt-[26px] pb-[18px] text-center">
                            {documentData.fileName}
                          </td>
                          <td className="pt-[26px] pb-[18px] text-center">
                            {documentData.author}
                          </td>
                          {/* <td className="pt-[26px] pb-[18px]">{thesis.year}</td> */}
                          <td className="pt-[26px] pb-[18px] text-center">
                            {documentData.date_created}
                          </td>
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
                      );
                    })
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
