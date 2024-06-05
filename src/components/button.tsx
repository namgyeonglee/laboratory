"use client";

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? '처리중' : children}
    </button>
  );
}