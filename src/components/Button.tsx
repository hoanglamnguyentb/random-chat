'use client';
import React from 'react';

type ButtonProps = {
  value?: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  value,
  className,
  onClick,
  type,
  ...props
}) => {
  return (
    <button
      className={`border rounded-lg bg-primary px-5 py-2 text-white ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
