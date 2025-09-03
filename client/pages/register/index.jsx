"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { use, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const router = useRouter();

const[form,setForm] = useState({
    name : '',
    email : '',
    password : '',
    currentPassword : ''
});

 const handleChange = (e) =>{
    setForm({...form,[e.target.name] : e.target.value})
} 

 const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,form)
        toast.success("Registration Successful !");
        
        setTimeout(()=> {
        router.push("/login")
        },2000)
        setForm({name : '', email : '', password : '', currentPassword : ''})
    }
    catch(error){
        toast.error("Something went wrong")
    }
 }







    /* let Register = (event)=>{
    event.preventDefault();
        let obj = {
            name : event.target.name.value,
            email : event.target.email.value,
            password : event.target.password.value,
            cpassword : event.target.cpassword.value
        }
        console.log(obj)
        event.target.reset();
    

   }  */

    
  return (
  <>
    <ToastContainer/>
    <div className='flex justify-center items-center h-screen'>
        <Card className='w-[400px]'>
            <CardHeader className='text-xl font-bold'>Register</CardHeader>
            <CardContent>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <Input type="text" name='name' placeholder='Enter Your Name...' className='border border-gray-400'  require='Enter your name' onChange={handleChange} required value={form.name}/>


                        <Input type="email" name='email' placeholder='Enter Your Email...' className='border border-gray-400'
                          require='Enter your email' onChange={handleChange} required value={form.email} autoComplete="new-email"/>


                        <Input type='password' name='password' placeholder="Enter Your Password" className='border border-gray-400'     onChange={handleChange} required value={form.password} autoComplete="new-password"/>


                        <Input type='password' name='currentPassword' placeholder="Enter Confirm Password" className='border border-gray-400'  onChange={handleChange} required value={form.currentPassword}  />
                        <Button type='submit' className='cursor-pointer'>Register</Button>
                </form>

                  <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => router.push("/login")}
        >
          Login here
        </span>
      </p>

            </CardContent>
        </Card>
    </div>
  </>
  )
}
