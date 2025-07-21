import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className='flex items-center justify-between gap-4 p-3 sm:p-4 bg-gray-100 rounded-lg shadow-sm mb-3'>
      <div onClick={() => toggle(id)} className='flex items-center flex-1 cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt="status" className='w-5 sm:w-6' />
        <p className={`ml-3 text-sm sm:text-base text-gray-800 ${isComplete ? "line-through text-gray-400" : ""}`}>
          {text}
        </p>
      </div>
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt="delete"
        className='w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform duration-150'
      />
    </div>
  );
};

export default Todoitems;

