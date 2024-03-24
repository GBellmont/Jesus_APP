const FUNCOES_VALIDADORAS_BUSCA_POR_PALAVRA = {
  palavra: (string) => string.length >= 4,
};

const INDEX_INICIAL_BUSCA_POR_PALAVRA = 0;

const MENSAGENS_CAMPOS_INVALIDOS_BUSCA_POR_PALAVRA = {
  palavra: "Palavra de busca inválido(a) ou não informado(a).",
};

const NUMERO_ITENS_POR_BUSCA = 20;

const OBJETO_INICIAL_BUSCA_POR_PALAVRA = {
  palavra: "",
  erros: {},
  versiculoAleatorioMobileVisivel: false,
};

export {
  FUNCOES_VALIDADORAS_BUSCA_POR_PALAVRA,
  INDEX_INICIAL_BUSCA_POR_PALAVRA,
  MENSAGENS_CAMPOS_INVALIDOS_BUSCA_POR_PALAVRA,
  NUMERO_ITENS_POR_BUSCA,
  OBJETO_INICIAL_BUSCA_POR_PALAVRA,
};
