import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import upload from "./../assets/upload.png";
import search from "./../assets/search.png";
import arrowBack from "./../assets/arrowBack.png";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref as storeRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserDisplayThesis = ({ app }) => {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thesisList, setThesisList] = useState([])
  const [user, setUser] = useState(null);
  
  const auth = getAuth();
  const storage = getStorage();
  const database = getDatabase(app);
  const navigate = useNavigate();
  console.log(thesisList);
  
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

        // Update state with the thesis list
        setThesisList(thesisArray);
      }
    });
  }, [auth, navigate]);

  const uploadFile = () => {
    let fileDetails;

    if (file) {
      fileDetails = {
        fileName: file["name"],
        author: user.displayName,
        date_created: new Date().toLocaleString(),
      };
    }

    // Sanitize the file name by encoding it
    const sanitizedFileName = fileDetails.fileName.replace(/[ .#$[\]]/g, "_");

    const thesisRef_db = ref(
      database,
      `thesis/${user.uid}/${sanitizedFileName}`
    );
    get(thesisRef_db)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Thesis exists in the database:", snapshot.val());
        } else {
          console.log("Thesis does not exist in the database");
          let thesisRef = storeRef(
            storage,
            `thesis/${user.uid}/${fileDetails.fileName}`
          );
          const uploadTask = uploadBytesResumable(thesisRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              // Handle unsuccessful uploads
              console.error("Upload failed:", error);
            },
            () => {
              // Handle successful uploads on complete
              console.log("Upload complete.");
              // Get the uploaded file's Storage Reference
              getDownloadURL(thesisRef).then((downloadURL) => {
                set(thesisRef_db, { ...fileDetails, downloadURL })
                  .then(() => {
                    console.log("Thesis saved successfully with download URL!");
                  })
                  .catch((error) => {
                    console.error(
                      "Error saving thesis data with download URL:",
                      error
                    );
                  });
              });
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching thesis data:", error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsModalOpen(true);
    setSubmissionStatus(null);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (file && description) {
      uploadFile();
      setTimeout(() => {
        setSubmissionStatus("success");
        setIsSubmitting(false);
      }, 2000);
    } else {
      setSubmissionStatus("failure");
      setIsSubmitting(false);
    }
  };

  const renderModal = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        {submissionStatus === null ? (
          <>
            <h2 className="text-lg font-bold mb-[13px]">
              Enter Thesis Description:
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter thesis description here..."
              className="w-full p-2 border rounded-md mb-[33px]"
              rows={8}
              disabled={isSubmitting}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`bg-[#020252] text-white px-4 py-2 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        ) : submissionStatus === "success" ? (
          <div className="text-center">
            <h2 className="text-green-500 text-lg font-bold mb-4">
              Upload Successful!
            </h2>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setFile(null);
                setDescription("");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-red-500 text-lg font-bold mb-4">
              Upload Failed!
            </h2>
            <button
              onClick={() => setSubmissionStatus(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#F4F4F4]">
      <Navbar user={user} />
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center px-[24px] md:px-[41px] py-[38px]">
          <Link to={"/"} className="self-start md:self-center">
            <img src={arrowBack} alt="Go Back" />
          </Link>
          <div className="flex items-center bg-[#FFFFFF] gap-[17.43px] rounded-[25px] px-[16px] shadow-md shadow-[#00000040] md:basis-[60%] w-full">
            <img src={search} alt="Search" width={24} height={24} />
            <input
              type="text"
              placeholder="Search"
              className="py-[11px] bg-[#FFFFFF] border-none outline-none w-full placeholder:text-[20px] rounded-[20px]"
            />
          </div>

          <div className="relative self-end mt-[30px] md:mt-0">
            <button className="flex items-center py-[11px] px-[23px] bg-[#FFFFFF] shadow-md shadow-[#00000040] rounded-[25px]">
              <img src={upload} alt="Upload" />
              <p className="ml-2">Upload Thesis</p>
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        <div className="overflow-x-auto md:px-[41px] xl:px-[168px] w-full ">
          <table className="/bg-[#F8F4F8] min-w-[600px]">
            <thead>
              <tr className="pt-[45px] pb-[20px]">
                <th className="pt-[45px] pb-[20px] w-[5%]">S/N</th>
                <th className="pt-[45px] pb-[20px] w-[30%]">Title</th>
                <th className="pt-[45px] pb-[20px] w-[20%]">Author</th>
                <th className="pt-[45px] pb-[20px] w-[10%] xl:w-[20%]">Year</th>
                <th className="pt-[45px] pb-[20px] w-[15%]">Last modi...</th>
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
                thesisList.map((thesis, index) => (
                  <tr
                    key={index}
                    className="bg-[#F4F4F4] mb-[15px] shadow-md shadow-[#00000040]"
                  >
                    <td className="pt-[26px] pb-[18px]">{index + 1}</td>
                    <td className="pt-[26px] pb-[18px]">{thesis.fileName}</td>
                    <td className="pt-[26px] pb-[18px]">{thesis.author}</td>
                    <td className="pt-[26px] pb-[18px]">{thesis.date_created}</td>
                    <td className="pt-[26px] pb-[18px]">
                      {thesis.lastModified}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && renderModal()}
      </div>
    </div>
  );
};

export default UserDisplayThesis;
