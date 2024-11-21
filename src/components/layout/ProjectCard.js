import "../css/ProjectCard.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProjectCard({ id, name, budget, category, handlerRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handlerRemove(id);
  };

  return (
    <div className="project_card">
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> R${budget}
      </p>
      <p className="category_text">
        <span className={`${category.name.toLowerCase()}`}></span>{" "}
        {category.name}
      </p>
      <div className="project_card_actions">
        <Link to={`/project/${id}`}>
          <BsPencil /> Edit
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
