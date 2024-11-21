import { parse, v4 as uuidv4 } from "uuid";
import "../css/Project.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../layout/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../layout/ServiceForm";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((err) => console.log(err));
  });

  function editPost(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("The budget can not be less than the cost!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Project updated");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService(project){
    setMessage("");

    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()
  console.log(lastService)
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)){
        setMessage('Budget exceeded, verify the service price!')
        setType('error')
        project.services.pop()
        return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => console.log(err))
    
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className="project_details">
          <Container customClass="column">
            {message && <Message type={type} message={message} />}
            <div className="details_container">
              <h1>Project: {project.name}</h1>
              <button className="btn" onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className="project_info">
                  <p>
                    <span>Category: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total of budget: </span>R${project.budget}
                  </p>
                  <p>
                    <span>Total spend: </span>R${project.cost}
                  </p>
                </div>
              ) : (
                <div className="project_info">
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Finish editing"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className="service_form_container">
              <h2>Add one service: </h2>
              <button className="btn" onClick={toggleServiceForm}>
                {!showServiceForm ? "Add service" : "Close"}
              </button>
              <div className="project_info">
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              <p>Service items</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
