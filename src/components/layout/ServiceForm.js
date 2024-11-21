import { useState } from "react";
import Input from "../Input";
import SubmitButton from "../Submit";
import "../css/ProjectForm.css";

function ServiceForm({handleSubmit, btnText, projectData}) {
    
    const [service, setService] = useState([])

  function submit(e) {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e) {
    setService({...service, [e.target.name]: e.target.value})
  }

  return (
    <form onSubmit={submit} className="form">
      <Input
        type="text"
        text="Service name"
        name="name"
        placeholder="Enter service name"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Service cost"
        name="cost"
        placeholder="Enter service cost"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Service description"
        name="description"
        placeholder="Enter service description"
        handleOnChange={handleChange}
      />

    <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
