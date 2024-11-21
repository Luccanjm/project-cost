import "../css/ProjectCard.css";
import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, cost, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className="project_card">
      <h4>{name}</h4>
      <p>
        <span> Total cost: </span>R$ {cost}
      </p>
      <p>{description}</p>
      <div className="project_card_actions">
        <button onClick={remove}>
          <BsFillTrashFill />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;