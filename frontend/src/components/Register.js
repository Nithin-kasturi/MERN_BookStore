import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { IoBookSharp } from "react-icons/io5";
import axios from 'axios';
export default function Register() {
    const navigate=useNavigate();
    const [response,setResponse]=useState(null);
    const [userDetails,setUserDetails]=useState({
        email:"",
        password:"",
    });
  const handleSubmit=async(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/addUser',userDetails).
    then((res)=>{setResponse(res)});
    console.log(response);
  }
  useEffect(() => {
    if(response!=null && response.data==="User Already exists"){
        alert("User already exists try again");
        window.location.reload();
    }
    else if(response!=null && response.data==="OK"){
        navigate('/');
    }
  }, [response]);
  return (
    <div class="flex flex-col items-center justify-center h-screen ">
        <div className='flex flex-row mb-4 font-bold gap-2'>
            <h1 className='text-2xl'>Welcome to Book Store</h1>
            <IoBookSharp size={20} color='red'/>
        </div>
        <div class="bg-[#66ffcc] p-10 rounded-3xl">
            <div className='p-1'>
                <div className='flex justify-center mb-5'>
                    <h1 className='text-2xl font-bold'>Registration Page</h1>
                </div>
                <div className='flex flex-row'>
                        <input onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} className='text-center h-7 w-full rounded-xl text-sm' name="email" type='email' placeholder='Enter Email'/>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <input onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} className='text-center h-7 w-full rounded-xl text-sm' name="password" type='password' placeholder='Enter Password'/>
                    </div>
                <div className='flex justify-center mt-5'>
                    <button onClick={(e)=>handleSubmit(e)} className='bg-[#4ddbff] rounded-xl w-full' type='submit'>Submit</button>
                </div>
                <div className='mt-3 flex flex-row text-sm justify-between '>
                    <p>Donot have an account?</p>
                    <Link className='text-[#ff6666]' to='/'>Login</Link>
                </div>
            </div>
        </div>
    </div>    
  )
}
