import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Book({key,book}) {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(`/bookdetails`,{state:{book:book}})
    }
  return (
        <div className='flex flex-row m-3 border-2 border-black rounded-xl'>
            <div className='m-5 p-4 flex flex-col'>
                <div className=' flex flex-col justify-center items-center'>
                    <img key={key} src={book.volumeInfo.imageLinks.thumbnail} className='h-[100px] w-[100px]'/>
                    <div className='mt-3 flex flex-row gap-3'>
                        <h1 className='text-red-500'>Title :</h1>
                        <h1>{book.volumeInfo.title}</h1>    
                    </div>
                    <div className='mt-3 flex flex-row gap-3'>
                        <h1 className='text-red-500'>Author :</h1>
                        <h1>{book.volumeInfo.authors}</h1>    
                    </div>
                    <div className='mt-4'>
                        <button className='bg-blue-500 rounded-xl p-1 text-white'  onClick={handleClick}>See reviews</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
