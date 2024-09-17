// import LoginPage from "./auth/Login"
import LoginPage from "./auth/Login";
import Signin from "./auth/Signin";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import AdminDisplayThesis from "./pages/AdminDisplayThesis";
import UserDisplayThesis from "./pages/UserDisplayThesis";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCAvusC_S-3VZGjKbUGgdlbHN-JOvV-yFU",
    authDomain: "report-archive.firebaseapp.com",
    projectId: "report-archive",
    databaseURL: "https://report-archive-default-rtdb.firebaseio.com",
    storageBucket: "report-archive.appspot.com",
    messagingSenderId: "112919389436",
    appId: "1:112919389436:web:cbf5b624095ef7a8dea379"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin/:role" element={<Signin  app={app}/>} />
          <Route path="/admindisplay" element={<AdminDisplayThesis/>}/>
          <Route path="/userdisplay" element={<UserDisplayThesis app={app} /> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
