import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none transition';
  const styles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    outline: 'text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-300',
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
