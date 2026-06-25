import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition';
  const variants = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-300',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 focus:ring-gray-200',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
