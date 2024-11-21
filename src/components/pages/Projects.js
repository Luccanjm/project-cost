import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/Projects.css";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../layout/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";
  console.log(location.state);
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Project removed successfully!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="project_container">
      <div className="title_container">
        <h1>My Projects</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message message={message} type="success" />}
      {projectMessage && <Message message={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category}
              key={project.id}
              handlerRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Don't have any projects in the system!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
