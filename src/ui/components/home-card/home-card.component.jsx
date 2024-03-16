import { IDENTIFICADORES_SUBMENU, SUBMENUS } from "../../../core/constants";
import { adicionarParametrosRota } from "../../../core/utils";
import "./home-card.css";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ nome, descricao, testamento, imagem, abreviacao }) => {
  const navigate = useNavigate();

  const direcionarParaLeitura = () => {
    const rotaLivro = SUBMENUS?.find(
      (submenu) => submenu?.identificador === IDENTIFICADORES_SUBMENU?.livro
    )?.rota;

    navigate(
      adicionarParametrosRota(rotaLivro, {
        abreviacao: abreviacao,
        capitulo: 0,
      })
    );
  };

  return (
    <div
      className="home-card font-genos"
      style={{
        backgroundImage: "url(" + imagem + ")",
      }}
    >
      <h1 className="home-card__nome">{nome}</h1>
      <div className="home-card__sobreposicao">
        <p className="home-card__sobreposicao-descricao font-caesar-dressing-regular">
          {descricao}
        </p>
        <p className="home-card__sobreposicao-testamento font-caesar-dressing-regular">
          {testamento}
        </p>
        <button
          className="home-card__sobreposicao-button font-genos"
          onClick={direcionarParaLeitura}
        >
          LER
        </button>
      </div>
    </div>
  );
};

export { HomeCard };
