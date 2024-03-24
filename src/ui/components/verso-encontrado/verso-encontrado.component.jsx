import "./verso-encontrado.css";
import { useNavigate } from "react-router-dom";
import { adicionarParametrosRota } from "../../../core/utils";
import { IDENTIFICADORES_SUBMENU, SUBMENUS } from "../../../core/constants";

const VersoEncontrado = ({
  texto,
  nomeLivro,
  capitulo,
  verso,
  abreviacao,
  palavraDestaque,
}) => {
  const navigate = useNavigate();

  const onDirecionarParaLeituraCaptulo = () => {
    const rota = SUBMENUS?.find(
      (submenu) => submenu?.identificador === IDENTIFICADORES_SUBMENU?.livro
    )?.rota;

    navigate(
      adicionarParametrosRota(rota, {
        abreviacao: abreviacao,
        capitulo: capitulo,
        versoDestaque: verso,
      })
    );
  };

  const separarTextoDestacado = (texto, palavraDestaque) => {
    const regEscape = (v) =>
      v.replace("/[-[\\]{}()*+?.,\\\\^$|#\\s]/g", "\\\\$&");

    const palavraDesqueVerificada = palavraDestaque ? palavraDestaque : " ";
    const strArr = texto.split(
      new RegExp(regEscape(palavraDesqueVerificada), "ig")
    );

    return strArr?.reduce((acumulador, elemento, index) => {
      if (index === strArr?.length - 1) {
        return [...acumulador, elemento];
      }

      return [
        ...acumulador,
        elemento,
        <span key={index} className="verso-encontrado__destaque">
          {palavraDesqueVerificada}
        </span>,
      ];
    }, []);
  };

  return (
    <button
      className="verso-encontrado font-genos"
      onClick={onDirecionarParaLeituraCaptulo}
    >
      <p className="verso-encontrado__livro">{`${nomeLivro} ${capitulo}:${verso}`}</p>
      <p className="verso-encontrado__texto">
        {separarTextoDestacado(texto, palavraDestaque)}
      </p>
    </button>
  );
};

export { VersoEncontrado };
