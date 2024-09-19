import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import upload from "./../assets/uploadimg.svg";
import arrowBack from "./../assets/arrowBack.png";
import {
  getStorage,
  ref as storeRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const UserUpload = ({ app }) => {
  const [fullname, setFullname] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const database = getDatabase(app);

  // Ref for file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  }, [auth]);

  const uploadFile = () => {
    let fileDetails;

    if (file) {
      fileDetails = {
        fileName: file["name"],
        author: fullname,
        abstract: abstract,
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

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size > 100000000) {
      // I limited the file size to 100MB here
      setErrorMessage("File size exceeds 100MB");
      setErrorModal(true);
      return;
    }
    setFile(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if file is uploaded
    if (!file) {
      setErrorMessage("Please upload a project file.");
      setErrorModal(true);
      return;
    }

    // Mock file upload success
    const fileUploadSuccess = true; // Assume success

    if (fileUploadSuccess) {
      setSuccessModal(true);

      // Clear the form fields
      setFullname("");
      setAbstract("");
      setProjectTitle("");
      setFile(null);

      // Clear the file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } else {
      setErrorMessage("There was an error uploading the file.");
      setErrorModal(true);
    }
  };

  return (
    <div className="/min-h-screen bg-gray-100 /p-6">
      <Navbar user={user}/>

      <Navbar />
      <Link to={"/userdisplay"}>
          <img src={arrowBack} alt="Go Back"  className="pl-[41px] pt-[20px]"/>
        </Link>
      {/* Form */}
      <div className="bg-white max-w-4xl mx-auto mt-10 p-8 shadow-md rounded-md">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fullname
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Abstract
            </label>
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows={8}
              required
              className="w-full p-3 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project File:
            </label>
            <input
              type="file"
              ref={fileInputRef} // Attach ref to file input
              onChange={handleFileChange}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md cursor-pointer"
            />
            <p className="mt-2 text-gray-500">
              {file ? file.name : "No file chosen"}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#020252] hover:bg-blue-700 text-white font-bold py-2 px-[70px] rounded focus:outline-none focus:shadow-outline flex gap-[10px] "
              onClick={uploadFile}
            >
              <img src={upload} alt="" />
              <p>Upload Thesis</p>
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {successModal && (
        <Modal
          message="Form submitted successfully!"
          onClose={() => setSuccessModal(false)}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal message={errorMessage} onClose={() => setErrorModal(false)} />
      )}
    </div>
  );
};

export default UserUpload;
