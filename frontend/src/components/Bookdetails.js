import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Bookdetails() {
  const location = useLocation();
  const [comment, setComment] = useState('');
  const book = location.state?.book;
  const user = localStorage.getItem('user');
  const id = book.id;
  const commentAndUser = { comment, user, id };
  const [fetchedComment, setFetchedComment] = useState([]);
  const [reply,setReply]=useState("");
  const replyAndUser={reply,user,id};
  useEffect(() => {
    const id = getId();
    console.log(id);
    axios
      .get('https://mern-book-store-livid.vercel.app/getComments', { params: { id: id } })
      .then((res) => {
        setFetchedComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getId = () => {
    const book = location.state?.book;
    const id = book.id;
    return id;
  };

  const handleClick = () => {
    if (comment !== '') {
      axios.post('https://mern-book-store-livid.vercel.app/insertComment', { commentAndUser });
      window.location.reload();
    }
  };
const handleReply=(commentator)=>{
  if(reply!==""){
    const replyAndUser={reply,user,commentator,id};
    axios.post('https://mern-book-store-livid.vercel.app/insertReply', { replyAndUser });
      window.location.reload();
  }
}
  console.log(fetchedComment,id);

  return (
    <div className='flex flex-col bg-white'>
      <div className='flex flex-col items-center pt-2 h-auto'>
        <div className='flex flex-col justify-center items-center p-4 gap-3 border-2 border-black rounded-3xl'>
          <img src={book.volumeInfo.imageLinks.thumbnail} className='rounded-2xl' />
          <div className='flex flex-row gap-4 mt-3'>
            <h1 className='font-bold text-red-600'>Title : </h1>
            <h1 className='font-bold'>{book.volumeInfo.title}</h1>
          </div>
          <div className='flex flex-row gap-4 mt-3'>
            <h1 className='font-bold text-red-600'>Author : </h1>
            <h1 className='font-semibold'>{book.volumeInfo.authors}</h1>
          </div>
        </div>
      </div>
      <div className='mt-5 bg-white justify-between flex flex-row '>
        <h1 className='pl-4 text-3xl font-bold text-red-600 '>Reviews</h1>
        <input
          name='comment'
          required='true'
          onChange={(e) => {
            setComment({ ...comment, comment: e.target.value });
          }}
          className='font-semibold p-1 border-2 border-dotted border-black text-center rounded-xl'
          type='text'
          placeholder='Comment on book'
        />
        <button onClick={handleClick} className='mr-4 text-md font-bold text-white bg-green-600 rounded-xl p-2'>
          Add a review
        </button>
      </div>
      {fetchedComment &&
        fetchedComment.map((comment, index) => {
          return (
            <div key={index} className='p-4 bg-white border-2 border-black m-3 rounded-2xl'>
              <div key={index} className='flex flex-col p-4'>
                {comment.comments &&
                  comment.comments
                    .filter((com) => com.id === id)
                    .map((com, index) => (
                      <div key={index} className='m-1 h-auto w-full flex flex-row justify-between font-bold'>
                        <h1>Review by {comment.email}</h1>
                        <h1>---</h1>
                        <h1>{com.comment}</h1>
                        <input onChange={(e)=>{setReply({...reply,reply:e.target.value})}}type='text' className='w-[300px] text-center' placeholder='Reply' />
                        <button onClick={(email)=>handleReply(comment.email)} className='bg-blue-500 text-white p-1 rounded-xl'>Submit</button>
                      </div>
                    ))}
              </div>
              <div>
                <h1 className='font-bold pl-4 text-red-500'>Replies</h1>
              </div>
              {
                comment.replies && comment.replies.filter((reply)=>reply.id===id)
                .map((reply,index)=>{
                  return (
                    <div key={index} className='p-4 flex flex-row gap-5 font-semibold'>
                    <h1>{reply.email}</h1>
                    <h1>---</h1>
                    <h1>{reply.reply}</h1>
                  </div>
                  )
                
                })
                
              }
              
              
            </div>
          );
        })}
    </div>
  );
}
