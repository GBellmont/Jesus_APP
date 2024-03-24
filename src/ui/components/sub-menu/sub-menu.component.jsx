import "./sub-menu.css";
import { useNavigate } from "react-router-dom";
import { adicionarParametrosRota } from "../../../core/utils";

const SubMenu = ({ image, descricao, rota, parametros }) => {
  const navigate = useNavigate();

  const goTo = () => {
    const rotaComParametros = adicionarParametrosRota(rota, parametros);

    navigate(rotaComParametros);
  };

  return (
    <button
      className="submenu"
      style={{
        backgroundImage: "url(" + image + ")",
      }}
      onClick={goTo}
    >
      <div className="submenu__descricao font-genos">
        {descricao?.toUpperCase()}
      </div>
    </button>
  );
};

export { SubMenu };
