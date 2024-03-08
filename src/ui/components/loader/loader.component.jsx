import "./loader.css";
import { useGlobalLoader } from "../../../core/context";

const Loader = () => {
  const [loader] = useGlobalLoader();

  return (
    <div className={`loader ${loader?.ativo ? "loader__ativo" : ""}`}>
      <div className="loader__ex"></div>
      <div className="loader__ex"></div>
      <div className="loader__ex"></div>
      <div className="loader__ex"></div>
      <h1 className="loader__descricao">Consultando a Bíblia...</h1>
    </div>
  );
};

export { Loader };
