import React from "react";

const SaveButton = ({ children, id, onClick, style }) => (
  <button id={id} onClick={onClick} style={style}>
    {children}
  </button>
);

export default SaveButton;