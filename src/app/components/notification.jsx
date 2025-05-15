import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function showToast (message, type = "success"){
  toast(message, { type });
};

export const ToastProvider = () => {
  return <ToastContainer position="top-right" autoClose={3000}  hideProgressBar/>;
};


export function Notification({ message, type }) {
  let typeHeader;
  let borderColorClass;

  switch (type) {
    case "success":
      typeHeader = "Success";
      borderColorClass = "border-green-500";
      break;
    case "error":
      typeHeader = "Oops ! something went wrong";
      borderColorClass = "border-red-500";
      break;
    case "warning":
      typeHeader = "Warning";
      borderColorClass = "border-yellow-500";
      break;
    case "info":
      typeHeader = "Important Notice ! ";
      borderColorClass = "border-blue-500";
      break;
    default:
      typeHeader = "Notification !";
      borderColorClass = "border-blue-700";
      break;
  }

  return (
    <main className={`border-l-4 px-4 ${borderColorClass}`}>
      <div className="font-bold text-lg mb-2">{typeHeader}</div>
      <div className="text-lg">{message}</div>
    </main>
  );
}
