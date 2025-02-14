import React from "react";

const Text = ({ children, id, className }) => (
  <p id={id} className={className}>
    {children}
  </p>
);


export default Text; 

