import React from 'react';

const Button = ({ onClick, type, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'} // Default to 'button' type
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;