import buscaPorPalavraSubMenuImage from "../../../assets/images/busca-por-palavra.png";
import homeSubMenuImage from "../../../assets/images/home.png";
import livroSubMenuImage from "../../../assets/images/livro.png";
import versoesSubMenuImage from "../../../assets/images/versoes.png";

const IDENTIFICADORES_SUBMENU = {
  versoes: "VERSOES",
  buscaPorPalavra: "BUSCA_POR_PALAVRA",
  home: "HOME",
  livro: "LIVRO",
};

const PLACEHOLDERS = {
  abreviacao: "{abreviacao}",
  capitulo: "{capitulo}",
  versoDestaque: "{versoDestaque}",
};

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
  {
    identificador: IDENTIFICADORES_SUBMENU?.home,
    image: homeSubMenuImage,
    rota: "/home",
    descricao: "livros",
  },
  {
    identificador: IDENTIFICADORES_SUBMENU?.livro,
    image: livroSubMenuImage,
    rota: "/livro/{abreviacao}/{capitulo}/{versoDestaque}",
    descricao: "leitura",
  },
];

export { IDENTIFICADORES_SUBMENU, PLACEHOLDERS, SUBMENUS };
