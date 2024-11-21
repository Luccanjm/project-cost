import "../css/Loading.css";
import loading from "../../assets/loading.svg";

function Loading() {
  return (
    <div className="loading_container">
      <img className="loading" src={loading} alt="loading" />
    </div>
  );
}

export default Loading;
