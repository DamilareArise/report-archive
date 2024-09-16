// import React from 'react'
import logout from "./../assets/logout.png"

const Navbar = ({ user }) => {
  
  return (
    <div className="bg-[#020252] py-[21px] flex justify-end items-center px-[24px] md:px-[50px]">
        <div className="w-[60px] h-[60px] bg-[#A09E9E] rounded-[400px] mr-[10px] lg:mr-[10px]">
          <img src={user.photoURL} alt="" className="rounded-[400px]"/>
        </div>
        <p className=" mr-[20px] lg:mr-[40px] text-white">{user.email}</p>
        <div className="flex items-center gap-[5px] ">
            <p className="text-white">Logout</p>
            <img src={logout} alt="" />
        </div>
    </div>
  )
}

export default Navbar