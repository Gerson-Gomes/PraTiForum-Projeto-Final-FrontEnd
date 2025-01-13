// import "./Input.css";

// function Input({ label, tipo, placeholder, value, setValor }) {
//   return (
//     <div input-default>
//       {label && <label htmlFor={tipo}>{label}</label>}
//         <input className="input-default"
//           type={tipo}          
//           placeholder={placeholder}
//           required
//           id={tipo}
//           value={value}
//           onChange={(evento) => setValor(evento.target.value)}
//         />
//       </div>
//   );
// }

// export default Input;


import "./input.css";

// const Input = (props) => {
//   const placeholderModificado = `${props.placeholder}...`;

//   return (
//     <div className="input-default">
//       <label>{props.label}</label>
//       <input placeholder={placeholderModificado} />
//     </div>
//   );
// };

// export default Input;

const Input = (props) => {
  const placeholderModificado = `${props.placeholder}...`;

  return (
    <div className="input-default">
      <label>{props.label}</label>
      <input
        type={props.type || "text"} // Garantir que o tipo padrão seja "text"
        placeholder={placeholderModificado}
      />
    </div>
  );
};

export default Input;
