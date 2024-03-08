/*
    A função relatada abaixo deve receber os seguintes objetos para que ocorra 
    a validação correta dos dados:

    funcoesValidadoras: 
        Este objeto deve seguir o exemplo:
            EXEMPLO_FUNCOES_VALIDADORAS = {
                nomeCampoFormulario1: (valorCampoFormulario) => condicao que retorne um boolean,
                nomeCampoFormulario2: (valorCampoFormulario) => condicao que retorne um boolean,
            }

    mensagensErro: 
        Este objeto deve seguir o exemplo:
            EXEMPLO_MENSAGENS_ERRO = {
                nomeCampoFormulario1: "mensagem utilizada em caso de erro",
                nomeCampoFormulario2: "mensagem utilizada em caso de erro",
            }

    jsonFormulario:
        Este objeto deve seguir o exemplo:
            EXEMPLO_JSON_FORMULARIO = {
                nomeCampoFormulario1: valorCampoFormulario,
                nomeCampoFormulario2: valorCampoFormulario,
                erros: {
                    nomeCampoFormulario1: "",(string que será populada no método)
                    nomeCampoFormulario2: "",(string que será populada no método)
                }
            }

*/
const validaCamposFormulario = (
  funcoesValidadoras,
  mensagensErro,
  jsonFormulario
) => {
  const objetoDeErros = Object.keys(funcoesValidadoras)
    .filter((propName) => {
      const valor = jsonFormulario[propName];
      const funcaoValidadora = funcoesValidadoras[propName];
      const ehValido = funcaoValidadora(valor);

      return !ehValido;
    })
    .reduce((acumulador, elemento) => {
      const mensagem = mensagensErro[elemento];

      return {
        ...acumulador,
        [elemento]: mensagem,
      };
    }, {});

  return {
    possuiCamposComErro: JSON.stringify(objetoDeErros) !== "{}",
    formulario: {
      ...jsonFormulario,
      erros: objetoDeErros,
    },
  };
};

export { validaCamposFormulario };
