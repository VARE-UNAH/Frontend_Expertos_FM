import React, { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose, autoClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className={`${getAlertStyles()} p-4 rounded-md flex items-center justify-between`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl font-semibold leading-none focus:outline-none ml-4"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
