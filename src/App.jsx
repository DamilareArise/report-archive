// import LoginPage from "./auth/Login"
import LoginPage from "./auth/Login";
import Signin from "./auth/Signin";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
  
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
