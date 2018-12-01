import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastNotif.css';

const ToastNotif = () =>
<ToastContainer
  position="bottom-right"
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnVisibilityChange
  draggable
  pauseOnHover
/>

export default ToastNotif;
