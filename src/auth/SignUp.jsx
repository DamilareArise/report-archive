import { useState } from "react";
import google from "./../assets/google.svg";
import facebook from "./../assets/facebook.svg";
import edit from "./../assets/edit.png";
import message from "../assets/message.svg";
import passwordd from "../assets/password.svg";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setPasswordError("Password is required");
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!fullname) {
      alert("Fullname is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Perform signup logic here
    
    setLoading(false); // Reset loading after form handling
  };

  return (
    <div className="h-screen flex">
      <div className="basis-[0%] lg:basis-[50%] bg-[url('./assets/Frame5.png')] bg-cover bg-no-repeat bg-center"></div>

      <div className="px-[24px] md:px-[100px] lg:px-[50px] xl:px-[100px] bg-cover bg-no-repeat bg-top basis-full lg:basis-[50%] flex flex-col justify-center items-center w-full bg-[url('./assets/Frame5.png')] lg:bg-none">
        <form action="" onSubmit={handleSubmit} className="w-full mb-[50px]">
          <p className="pb-[32px] text-center text-[16px] md:text-[28px] font-[500]">
            Sign Up
          </p>

          {/* Fullname Field */}
          <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
            <img src={edit} alt="Full name" width={22.07} height={17.43} />
            <input
              type="text"
              placeholder="Fullname"
              className="py-[18px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[20px]"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
            <img src={message} alt="Email" width={22.07} height={17.43} />
            <input
              type="email"
              placeholder="Email"
              className="py-[18px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[20px]"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {emailError && (
            <div className="text-red-500 text-sm mb-[23.3px]">{emailError}</div>
          )}

          {/* Password Field */}
          <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
            <img src={passwordd} alt="Password" width={22.07} height={17.43} />
            <input
              type="password"
              placeholder="Password"
              className="py-[18px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[20px]"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {passwordError && (
            <div className="text-red-500 text-sm mb-[23.3px]">{passwordError}</div>
          )}

          {/* Confirm Password Field */}
          <div className="flex items-center bg-[#F5F5F5] gap-[17.43px] rounded-[11.62px] px-[25.56px] shadow-md shadow-[#00000040] mb-[10px]">
            <img src={passwordd} alt="Confirm Password" width={22.07} height={17.43} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="py-[18px] bg-[#F5F5F5] border-none outline-none w-full placeholder:text-[20px]"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {confirmPasswordError && (
            <div className="text-red-500 text-sm mb-[39.3px]">
              {confirmPasswordError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`py-[18px] text-[#FFFFFF] bg-[#020252] rounded-[6px] w-full mb-[22px] md:text-[20px] font-[400] text-[16px]  hover:opacity-[75%]`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex gap-[12px] items-center mb-[8px]">
          <span className="w-[63px] h-[1px] bg-black"></span>
          <p>OR</p>
          <span className="w-[63px] h-[1px] bg-black"></span>
        </div>

        {/* Social Sign Up */}
        <div className="flex flex-col w-full gap-[20px]">
          <button className="flex gap-[17px] justify-center bg-[#F9F8F8] rounded-[6px] items-center py-[18px] shadow-md shadow-[#00000040]">
            <img src={google} alt="Google" width={30} height={30} />
            <p>Continue with Google</p>
          </button>

          <button className="flex gap-[17px] justify-center bg-[#F9F8F8] rounded-[6px] items-center py-[18px] shadow-md shadow-[#00000040]">
            <img src={facebook} alt="facebook" width={30} height={30} />
            <p>Continue with Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
