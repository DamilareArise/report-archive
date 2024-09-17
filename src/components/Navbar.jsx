// import React from 'react'
import logout from "./../assets/logout.png"

const Navbar = ({ user }) => {
  
  return (
    <div className="bg-[#020252] py-[21px] flex justify-end items-center px-[24px] md:px-[50px]">
      {/* Display default or user's photo */}
      <div className="w-[60px] h-[60px] bg-[#A09E9E] rounded-[400px] mr-[10px] lg:mr-[10px]">
        {user && user.photoURL ? (
          <img src={user.photoURL} alt="User avatar" className="rounded-[400px]" />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-full" />
        )}
      </div>
       {/* Display user email */}
       <p className="mr-[20px] lg:mr-[40px] text-white">
        {user ? user.email : "Guest"}
      </p>

      <div className="flex items-center gap-[5px] ">
          <p className="text-white">Logout</p>
          <img src={logout} alt="" />
      </div>
    </div>
  )
}

export default Navbar