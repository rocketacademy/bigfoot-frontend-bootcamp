import React from 'react';
import BigfootImg from '../Images/bigfoot.png';

export default function App() {
  return (
    <div className="p-[50px] pt-[75px] text-center">
      <h1 className="text-slate-400 text-5xl mb-[20px] top-[50px] font-['BigfootDemo']">
        Have you seen me?
      </h1>
      <img src={BigfootImg} alt="bigfoot" className="w-1/2 rounded-xl m-auto" />
    </div>
  );
}
