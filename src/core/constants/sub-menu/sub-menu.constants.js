import versoesSubMenuImage from "../../../assets/images/versoes.png";
import buscaPorPalavraSubMenuImage from "../../../assets/images/busca-por-palavra.png";

const IDENTIFICADORES_SUBMENU = {
  versoes: "VERSOES",
  buscaPorPalavra: "BUSCA_POR_PALAVRA",
};

const PLACEHOLDERS = {};

const SUBMENUS = [
  {
    identificador: IDENTIFICADORES_SUBMENU?.versoes,
    image: versoesSubMenuImage,
    rota: "/versoes",
    descricao: "versões",
  },
  {
    identificador: IDENTIFICADORES_SUBMENU?.buscaPorPalavra,
    image: buscaPorPalavraSubMenuImage,
    rota: "/busca-por-palavra",
    descricao: "busca_por_palavra",
  },
];

export { SUBMENUS, IDENTIFICADORES_SUBMENU, PLACEHOLDERS };
