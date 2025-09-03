"use client"
 

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {

  const router = useRouter();

  let [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form)
      localStorage.setItem("accessToken", res.data.accessToken)
      localStorage.setItem("refreshToken",res.data.refreshToken)
     // localStorage.setItem("UserId",res.data.user.userId)
     localStorage.setItem("userId",res.data.user.userId)

       console.log(res.data.user.userId)

       
      toast.success("Login Successful!")
      setForm({email: '', password: ''})  

      setTimeout(()=> {
      router.push("/Home")
      },2000)
    } 
    catch (error) {
      toast.error(error)
    }
  }


  return (
    <>
      <ToastContainer/>
      <div className='flex justify-center items-center h-screen'>
        <Card className='w-[400px]'>
          <CardHeader className='text-xl font-bold'>Login</CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <Input type="email" name='email' placeholder='Enter Your Email...' className='border border-gray-400' onChange={handleChange} value={form.email} required autoComplete={"email"} />
              <Input type='password' name='password' placeholder="Enter Your Password" className='border border-gray-400' onChange={handleChange} value={form.password} required autoComplete="password" />
              <Button type='submit' className='cursor-pointer'>Login</Button>
            </form>

            <p>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => router.push("/register")}
              >
                Register here
              </span>
            </p>
          </CardContent>
        </Card>
      </div>  
    </>
  )
}
