'use client'
// pages/index.tsx
import React, { useState } from 'react';
import Alert from '@/components/Alert/alert';

const HomePage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Operation was successful!');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleError = async () => {
    try {
      await someAsyncFunction();
      setAlertType('success');
      setAlertMessage('Operation was successful!');
    } catch (error) {
      if (error instanceof Error) {
        setAlertType('error');
        setAlertMessage(error.message || 'Something went wrong!');
      } else {
        setAlertType('error');
        setAlertMessage('An unexpected error occurred!');
      }
      setShowAlert(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Next.js Error Handling Example</h1>

      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={closeAlert}
          autoClose={5000}
        />
      )}

      <button
        onClick={handleError}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default HomePage;

const someAsyncFunction = async () => {
  throw new Error('This is a simulated error');
};
