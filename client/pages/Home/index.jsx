"use client"


import React, { useState } from 'react'
import Header from '@/common/Header'



export default function Home() {

  let [boxShow, setBoxShow]  = useState(false)


  return (
   <>
    <Header/>
    <div className=' max-w-[1000px] mx-auto grid grid-cols-2 my-[50px] gap-[100px] '>
      <div className='h-[300px] border border-white  rounded-b-xl' >
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOeUKFeWYoEG36LnnmOvhu_yawgREmpHF8w&s" className='w-[100%] h-[200px]' alt="" />
         <button onClick={()=> setBoxShow(!boxShow)} className='bg-blue-600 p-[10px_30px] m-[20px_20px] rounded-xl cursor-pointer'>Chat Me</button>
      </div>
       <div className='h-[300px] border border-white  rounded-b-xl'>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOeUKFeWYoEG36LnnmOvhu_yawgREmpHF8w&s" className='w-[100%] h-[200px]' alt="" />
         <button  onClick={()=> setBoxShow(!boxShow)} className='bg-blue-600 p-[10px_30px] m-[20px_20px] rounded-xl cursor-pointer'>Chat Me</button>
      </div>
    </div>


    {boxShow ?
    <div className='max-w-[1000px] mx-auto my-[50px]'>
      <form>
        <h1 className='py-[10px]'>Message Box</h1>
        <textarea name="" id="" className='border-2 border-white w-[30%] resize-none px-[10px]' placeholder='Enter Your Message'></textarea><br />
        <button type='submit' className='my-[10px] bg-blue-500 p-[10px] rounded-xl cursor-pointer'>Send Message</button>
      </form>
    </div>

    :
    ''
     }
    
  

   </>
  )
}


