import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Chatbot from './Chatbot';

const Overlay = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const closeContent = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Draggable bounds="parent">
        <div
          className="cursor-pointer fixed p-8 bg-white text-black text-center shadow-lg rounded-full"
          style={{ top: '15vh', left: '10vw' }}
          onDoubleClick={toggleContent}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
      </Draggable>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-8 overflow-auto transition-all duration-300 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <button 
              onClick={closeContent}
              className="self-end p-2 m-2 bg-red-500 text-white rounded-full"
            >
              X
            </button>
            <Chatbot />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
