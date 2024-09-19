import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import upload from "./../assets/upload.png";
import search from "./../assets/search.png";
import arrowBack from "./../assets/arrowBack.png";
import download from "./../assets/download.svg";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserDisplayThesis = ({ app }) => {
  const [thesisList, setThesisList] = useState([]);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const database = getDatabase(app);
  const navigate = useNavigate();
  // console.log(thesisList);

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
    <div className="bg-[#F4F4F4] h-screen">
      <Navbar user={user} />
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center px-[24px] md:px-[41px] py-[38px]">
          {/* <Link to={"/"} className="self-start md:self-center">
            <img src={arrowBack} alt="Go Back" />
          </Link> */}
          <div className="flex items-center bg-[#FFFFFF] gap-[17.43px] rounded-[25px] px-[16px] shadow-md shadow-[#00000040] md:basis-[60%] w-full">
            <img src={search} alt="Search" width={24} height={24} />
            <input
              type="text"
              placeholder="Search"
              className="py-[11px] bg-[#FFFFFF] border-none outline-none w-full placeholder:text-[20px] rounded-[20px]"
            />
          </div>

          <div className="relative self-end mt-[30px] md:mt-0">
            <Link
              to={"/userUpload"}
              className="flex items-center py-[11px] px-[23px] bg-[#FFFFFF] shadow-md shadow-[#00000040] rounded-[25px]"
            >
              <img src={upload} alt="Upload" />
              <p className="ml-2">Upload Thesis</p>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto md:px-[41px] xl:px-[50px] w-full ">
          <table className="/bg-[#F8F4F8] min-w-[600px] w-full">
            <thead>
              <tr className="pt-[45px] pb-[20px]">
                <th className="pt-[45px] pb-[20px] w-[5%]">S/N</th>
                <th className="pt-[45px] pb-[20px] w-[25%]">Title</th>
                <th className="pt-[45px] pb-[20px] w-[20%]">Author</th>
                <th className="pt-[45px] pb-[20px] w-[20%] xl:w-[20%]">
                  Date Created
                </th>
                <th className="pt-[45px] pb-[20px] w-[15%]">Download</th>
                {/* <th className="pt-[45px] pb-[20px] w-[20%] xl:w-[15%]"></th> */}
              </tr>
            </thead>

            <tbody>
              {thesisList === null ? (
                <tr className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040] border-spacing-x-[18px]">
                  <td className="text-center pt-[26px] pb-[18px]">1</td>
                  <td className="text-start pt-[26px] pb-[18px]  /truncate">
                    A Lexico-Semantics Analysis of Joy of Motherhood.
                  </td>
                  <td className="text-center pt-[26px] pb-[18px] /truncate">
                    Esther Oluwaferanmi
                  </td>
                  <td className="text-center pt-[26px] pb-[18px]">2023</td>
                  <td className="text-center pt-[26px] pb-[18px]">July, 24</td>
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
                      className="text-center bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040] border-b-2 border-black"
                    >
                      <td className="text-center pt-[26px] pb-[18px]">{index + 1}</td>
                      <td className="text-center pt-[26px] pb-[18px]">
                        {documentData.fileName}
                      </td>
                      <td className="text-center pt-[26px] pb-[18px] uppercase">
                        {documentData.author}
                      </td>
                      <td className="text-center pt-[26px] pb-[18px]">
                        {documentData.date_created}
                      </td>
                      <td>
                        <a
                          href={documentData.downloadURL}
                          className="text-center flex items-center py-[11px] px-[23px] bg-[#020252] text-[#FFFFFF] shadow-md shadow-[#00000040] rounded-[25px]"
                        >
                          <img src={download} alt="download" />
                          <p className="text-center ml-2">Download Thesis</p>
                        </a>
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
  );
};

export default UserDisplayThesis;
