'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
      <div className="bg-red-100 p-3 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
      <p className="text-slate-500 mb-6 max-w-md">An unexpected error occurred in the dashboard UI. We apologize for the inconvenience.</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

