import "./../css/Home.css";
import savings from "../../assets/savings.svg";
import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className="home_container">
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
