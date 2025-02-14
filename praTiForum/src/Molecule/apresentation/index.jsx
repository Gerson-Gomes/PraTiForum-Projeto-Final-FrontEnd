import "./styles.css";

const Apresentation = ({ title, description }) => {
  return (
    <div className="container">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
    </div>
  );
};

export default Apresentation;
 