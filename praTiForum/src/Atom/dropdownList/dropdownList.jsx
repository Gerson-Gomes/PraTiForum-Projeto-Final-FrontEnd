import "./DropdownList.css";

const DropdownList = (props) => {
  console.log(props.itens);
  return (
    <div className="dropdown">
      <label>{props.label}</label>
      <select>
        <option value="" disabled selected>
          Selecione uma opção
        </option>
        {props.itens.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default DropdownList;
