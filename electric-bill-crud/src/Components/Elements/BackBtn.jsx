import React from 'react';
import {useNavigate} from 'react-router-dom';

export const BackBtn = () => {
    const navigate = useNavigate();
  return (
    <button className='bg-orange-400 text-white py-2 px-5 rounded-md' onClick={()=>navigate("/")}>Back</button>
  )
}
