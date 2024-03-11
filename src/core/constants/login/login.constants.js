const FUNCOES_VALIDADORAS_LOGIN = {
  nomeUsuario: (string) => string.length >= 6,
};

const LOGIN_VERSAO_CONSULTA_VERSO_ALEATORIO = "nvi";

const MENSAGENS_CAMPOS_INVALIDOS_LOGIN = {
  nomeUsuario: "Nome de usuário(a) inválido(a) ou não informado(a).",
};

const OBJETO_INICIAL_LOGIN = {
  nomeUsuario: "",
  erros: {},
  versiculoAleatorioMobileVisivel: false,
};

export {
  FUNCOES_VALIDADORAS_LOGIN,
  LOGIN_VERSAO_CONSULTA_VERSO_ALEATORIO,
  MENSAGENS_CAMPOS_INVALIDOS_LOGIN,
  OBJETO_INICIAL_LOGIN,
};
