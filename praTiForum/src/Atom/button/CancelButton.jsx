import React from "react";

const CancelButton = ({ id, style, onClick, children }) => (
  <button id={id} style={style} onClick={onClick}>
    {children}
  </button>
);

export default CancelButton;