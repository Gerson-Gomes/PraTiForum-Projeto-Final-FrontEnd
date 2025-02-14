import "./input.css";

const Input = ({ label, type = "text", name, placeholder, value, onChange, error }) => {
  const placeholderModificado = `${placeholder}...`;

  return (
    <div className="input-default">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholderModificado}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? "input-error" : ""}`} // Classe condicional para erros
      />
      {error && <span className="error-message">{error}</span>} {/* Exibe mensagem de erro */}
    </div>
  );
};

export default Input;
