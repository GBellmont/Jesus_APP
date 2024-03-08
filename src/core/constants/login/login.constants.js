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
  versoAleatorioAnimation: "",
  versiculoAleatorioMobileVisivel: false,
};

const VERSICULO_ALEATORIO_ENTRADA_ANIMATION =
  "login__verso-aleatorio-mobile-entrada";

const VERSICULO_ALEATORIO_SAIDA_ANIMATION =
  "login__verso-aleatorio-mobile-saida";

export {
  FUNCOES_VALIDADORAS_LOGIN,
  LOGIN_VERSAO_CONSULTA_VERSO_ALEATORIO,
  MENSAGENS_CAMPOS_INVALIDOS_LOGIN,
  OBJETO_INICIAL_LOGIN,
  VERSICULO_ALEATORIO_ENTRADA_ANIMATION,
  VERSICULO_ALEATORIO_SAIDA_ANIMATION,
};
