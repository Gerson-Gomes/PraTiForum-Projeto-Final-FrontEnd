import React from 'react';
import Button from "../atoms/Button";
import './ButtonGroup.css';

function ButtonGroup() {
  return (
    <div className="buttons">
      <Button text="Cadastrar" className="primary-button" />
      <Button text="Institucional" className="secondary-button" />
    </div>
  );
}

export default ButtonGroup;