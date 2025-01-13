import React from "react";
import { FaSearch } from "react-icons/fa";
 import "./InputSearch.css";

// function InputSearch({ label, tipo, placeholder, value, setValor }) {
//   return (
//     <div>
//       {label && <label htmlFor={tipo}>{label}</label>}
//       <div className="inputSearch-wrapper">
//         <FaSearch className="icone-lupa-placeholder" />
//         <input className="inputSearch"
//           type={tipo}
          
//           placeholder={placeholder}
//           required
//           id={tipo}
//           value={value}
//           onChange={(evento) => setValor(evento.target.value)}
//         />
//       </div>
//     </div>
//   );
// }

// export default InputSearch;




const InputSearch = (props) => {
  const placeholderModificado = `${props.placeholder}...`;

  return (
    <div>
     <div className="inputSearch-wrapper">
        <FaSearch className="icone-lupa-placeholder" />
      <label>{props.label}</label>
      <input className="inputSearch" placeholder={placeholderModificado} />
    </div>
    </div>
  );
};

export default InputSearch;


