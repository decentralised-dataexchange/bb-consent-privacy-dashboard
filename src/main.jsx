import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const elementId = document
  .getElementById("consentBbPrivacyBoard-script")
  ?.getAttribute("data-element-id");

window.ConsentBbPrivacyBoard = () => {
  ReactDOM.createRoot(document.getElementById(elementId)).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
