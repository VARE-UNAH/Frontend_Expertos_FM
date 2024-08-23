import React from 'react';

interface AlertProps {
    message: string;
  }

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="flex h-1 rounded-lg items-center w-full  border-l-4 border-[#F87171] bg-[#F87171] bg-opacity-[15%] mt-2  shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
      <div className="w-full">
        <ul className="flex justify-center">
          <li className="text-[#CD5D5D] text-center">
            {message}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Alert;
