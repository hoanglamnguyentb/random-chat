'use client';
import React from 'react';

type ButtonProps = {
  value?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  value,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`border rounded-lg bg-primary px-5 py-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
