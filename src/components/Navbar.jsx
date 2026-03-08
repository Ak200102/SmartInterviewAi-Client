import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsRobot } from "react-icons/bs";
import { BsCoin } from 'react-icons/bs';
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App.jsx';
import { setUserData } from '../redux/userSlice.js';
import AuthModel from './AuthModel.jsx';

const Navbar = () => {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);
    const handleLogout = async ()=>{
      try {
        await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
        dispatch(setUserData(null))
        setShowCreditPopup(false)
        setShowUserPopup(false)
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='bg-[#f3f3f7] flex justify-center px-4 pt-6'>
      <motion.div 
      initial={{opacity:0, y:-40}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.8}}
      className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-300 px-8 py-4 flex justify-between shadow-2xs shadow-gray-400 items-center relative'>
             <div className='flex items-center gap-3 cursor-pointer'>
              <div className='bg-blue-950 text-white p-2 rounded-lg'>
                <BsRobot size={20}/>
              </div>
              <h1 className='font-semibold hidden md:block text-lg text-blue-950'>
                SmartInterview.AI
              </h1>
             </div>
             <div className='flex items-center gap-6 relative'>
              <div className='relative'>
                <button onClick={()=>{
                  if(!userData){
                    setShowAuth(true)
                    return;
                  }
                setShowCreditPopup
                (!showCreditPopup);
                setShowUserPopup(false)
                }} className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-blue-200 transition cursor-pointer'>
                  <BsCoin size={20}/>
                  {userData?.credits || 0}
                </button>
                {showCreditPopup && (
                  <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                    <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                    <button onClick={()=>navigate("/pricing")} className='w-full bg-black text-white py-2 rounded-lg text-sm cursor-pointer'>Buy more credits</button>
                  </div>
                )}
              </div>

              <div className='relative'>
                <button onClick={()=>{
                  if(!userData){
                    setShowAuth(true)
                    return;
                  }
                  setShowUserPopup(!showUserPopup);
                  setShowCreditPopup(false)
                }} className='w-9 h-9 bg-blue-950 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer'>
                  {userData ? userData?.name.slice(0,1).toUpperCase():<FaUserAstronaut size={16}/>}
                </button>
                {showUserPopup && (
                  <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                    <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
                    <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>Interview History</button>
                    <button onClick={handleLogout} className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                      <HiOutlineLogout size={20}/>
                      Logout</button>
                  </div>
                )}
              </div>
             </div>
      </motion.div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  )
}

export default Navbar
