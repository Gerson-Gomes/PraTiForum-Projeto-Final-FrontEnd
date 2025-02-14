import React from 'react';
import googlelogo from "../../assets/Images/googlelogo.png";
import './GoogleButton.css';

function GoogleButton({ text, className,onClick }) {
    return (
      <button className={className} onClick={onClick}>
      <img src={googlelogo} alt="Google logo" className="google-icon" width="24" height="24" />

        {text}
      </button>
    );
  }
  
  export default GoogleButton;
