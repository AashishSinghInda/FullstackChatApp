"use client"

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function Header() {

    
      const router = useRouter()
    
    //  console.log("get user id >>>>>>", localStorage.getItem("userId"))
    
    
      useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")
       
        
    
        if(!accessToken || !refreshToken){
          router.push("/login")
        }
        
      },[router])

     const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId"); 

      

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { userId });

      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
   //   localStorage.removeItem("refreshTokenExpiry")
      toast.success("Logout successful!")
     
  

      setTimeout(() => {
       router.push("/login"); 
      }, 2000);
      
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  
  return (
    <>
    <ToastContainer/>
     <header className='bg-white  py-[10px] px-[30px] flex justify-between items-center' >
    <div className="">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt4oxC0ZySTb_RH8m586IZc3AcoimYdqFjyg&s" alt="" className='rounded-xl h-[100px] w-[100px]' />
    </div>
    <div>
      <button onClick={handleLogout}  className='font-black text-black cursor-pointer p-[10px] border-2 border-gray-600 rounded-2xl'>Logout</button>
    </div>
   </header>
    </>
  )
}
