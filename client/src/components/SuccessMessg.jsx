import React, { useEffect } from "react";

 export default function SuccessMessg({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  );
};