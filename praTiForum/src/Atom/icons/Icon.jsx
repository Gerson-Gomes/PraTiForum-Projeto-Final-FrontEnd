import React from "react";

const Icon = ({ className, id, style, onClick }) => (
  <i className={className} id={id} style={style} aria-hidden="true" onClick={onClick}></i>
);

export default Icon;