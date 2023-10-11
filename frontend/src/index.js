import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <App />
    <ToastContainer position="top-left"  />
    </ChakraProvider>
  </React.StrictMode>
);