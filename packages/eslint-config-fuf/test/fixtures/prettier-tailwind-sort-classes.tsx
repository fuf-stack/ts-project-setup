/* eslint-disable */

import React from 'react';

const MyButton = ({ children }) => {
  return (
    <button className="px-4 bg-blue-500 text-base rounded text-white py-2">
      {children}
    </button>
  );
};

export default MyButton;
