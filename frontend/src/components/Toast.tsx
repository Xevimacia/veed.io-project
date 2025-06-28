import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <div
        className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg rounded-lg px-6 py-4 flex items-center min-w-[260px] max-w-xs`}
        style={{ fontSize: '1.1rem' }}
      >
        <span className="font-semibold flex-1">{message}</span>
        <button
          className="btn btn-sm btn-ghost text-lg ml-2"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast; 