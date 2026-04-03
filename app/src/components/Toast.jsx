import { useState, useCallback, useEffect, useRef } from 'react';

let toastHandler = null;

export function useToast() {
  const show = useCallback((message, type = 'success') => {
    if (toastHandler) toastHandler(message, type);
  }, []);
  return { show };
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    toastHandler = (message, type) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => { toastHandler = null; };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-up flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium
            ${toast.type === 'success'
              ? 'bg-green-950 border-green-800 text-green-300'
              : toast.type === 'error'
              ? 'bg-red-950 border-red-800 text-red-300'
              : 'bg-steel-800 border-steel-700 text-white'
            }`}
        >
          {toast.type === 'success' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
          )}
          {toast.message}
        </div>
      ))}
    </div>
  );
}
