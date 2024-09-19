import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Navbar from "../components/Navbar";

const SupervisorApproval = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState("/assets/Adesola.pdf");

  const handleApprove = () => {
    alert("The document has been approved.");
  };

  const handleDisapprove = () => {
    alert("The document has been disapproved.");
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== "") {
      setComment("");
      setModalOpen(false);
      setSuccessModalOpen(true); // Show success modal
    } else {
      alert("Please add a comment before submitting.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-col /flex-grow /container w-full md:w-[80%] mx-auto mt-6">
        {/* PDF Viewer */}
        <div className="w-[100%] /p-4 self-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">View Document</h2>
            <div className="h-[700px] overflow-auto border border-gray-200 rounded-lg">
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={"src/assets/Adesola.pdf"} />
              </Worker>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-[100%]  flex justify-end /p-4">
          <div className="/bg-white /p-4 rounded shadow-lg w-[100%] md:w-[50%] flex justify-end gap-[10px]">
            {/* <h3 className="text-lg font-semibold mb-4">Actions</h3> */}
            <button
              className="w-full bg-[#008000] text-white py-2 rounded my-2 hover:bg-green-600"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="w-full bg-[#FF0000] text-white py-2 rounded my-2 hover:bg-red-600"
              onClick={handleDisapprove}
            >
              Disapprove
            </button>
            <button
              className="w-full bg-[#020252] text-white py-2 rounded my-2 hover:bg-blue-600"
              onClick={() => setModalOpen(true)}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/3 p-6 rounded shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Add Comment</h4>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="6"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here..."
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-[#020252] text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSubmitComment}
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/3 p-6 rounded shadow-lg text-center">
            <h4 className="text-lg font-semibold mb-4">Comment Submitted Successfully!</h4>
            <button
              className="bg-[#020252] text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setSuccessModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorApproval;
