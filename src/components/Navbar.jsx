// import React from 'react'
import logout from "./../assets/logout.png"

const Navbar = () => {
  return (
    <div className="bg-[#020252] py-[21px] flex justify-end px-[24px] md:px-[50px]">
        <div className="w-[60px] h-[60px] bg-[#A09E9E] rounded-[400px] mr-[30px] lg:mr-[73px]"></div>
        <div className="flex items-center gap-[5px] ">
            <p className="text-white">Logout</p>
            <img src={logout} alt="" />
        </div>
    </div>
  )
}

export default Navbar