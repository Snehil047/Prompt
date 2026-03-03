import type { ReactNode } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  className?: string;
  iconSuccess?: ReactNode;
  iconError?: ReactNode;
}

export default function Toast({ message, type, className = '', iconSuccess, iconError }: ToastProps) {
  const baseClasses =
    'flex items-center p-4 rounded-lg shadow-lg border animate-in slide-in-from-top-2 text-sm font-medium';
  const toneClasses =
    type === 'success'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : 'bg-red-50 border-red-200 text-red-800';

  return (
    <div className={`${baseClasses} ${toneClasses} ${className}`}>
      {type === 'success' ? iconSuccess : iconError}
      <span>{message}</span>
    </div>
  );
}

