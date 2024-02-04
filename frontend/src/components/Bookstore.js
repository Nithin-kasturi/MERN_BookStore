import React, { useState, useEffect } from 'react';
import Book from './Book';

export default function BookStore() {
  const [bookdetails, setBookdetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=dogs&key=AIzaSyBsJhd3qN5PbLN11Ujt70oR4xo3f5ZuP68');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setBookdetails(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to fetch data');
    }
  };

  return (
    <div className='flex flex-wrap justify-evenly'>
       {
        bookdetails && bookdetails.items.map((book,index)=>{
            return (
                <Book 
                    key={index}
                    book={book}
                />
            )
        })
       }
       {
        bookdetails && bookdetails.items.map((book,index)=>{
            return (
                <Book 
                    key={index}
                    book={book}
                />
            )
        })
       }
            
    </div>
  );
}
