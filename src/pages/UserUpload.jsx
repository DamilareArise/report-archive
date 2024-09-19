import { useState } from "react";
import Navbar from "../components/Navbar";
import upload from "./../assets/uploadimg.svg"


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

const UserUpload = () => {
  const [fullname, setFullname] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [file, setFile] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size > 50000000) { //I limited the file size to 50MB here
      setErrorMessage('File size exceeds 50MB');
      setErrorModal(true);
      return;
    }
    setFile(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if file is uploaded
    if (!file) {
      setErrorMessage('Please upload a project file.');
      setErrorModal(true);
      return;
    }

    // Mock file upload success
    const fileUploadSuccess = true; // Assume success

    if (fileUploadSuccess) {
      setSuccessModal(true);
    } else {
      setErrorMessage('There was an error uploading the file.');
      setErrorModal(true);
    }
  };

  return (
    <div className="/min-h-screen bg-gray-100 /p-6">
      <Navbar />

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
              onChange={handleFileChange}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md cursor-pointer"
            />
            <p className="mt-2 text-gray-500">
              {file ? file.name : 'No file chosen'}
            </p>
          </div>

          <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#020252] hover:bg-blue-700 text-white font-bold py-2 px-[70px] rounded focus:outline-none focus:shadow-outline flex gap-[10px] "
          >
            <img src={upload} alt="" />
            <p>Upload Thesis</p>
          </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {successModal && (
        <Modal message="Form submitted successfully!" onClose={() => setSuccessModal(false)} />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal message={errorMessage} onClose={() => setErrorModal(false)} />
      )}
    </div>
  );
};

export default UserUpload;
