import React from "react";

const SaveButton = ({ id, style, onClick, children }) => (
  <button id={id} style={style} onClick={onClick}>
    {children}
  </button>
);

export default SaveButton;