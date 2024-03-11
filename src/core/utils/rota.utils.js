import { PLACEHOLDERS } from "../constants";

/*
    A função relatada abaixo deve receber os seguintes objetos para que ocorra 
    a validação correta dos dados:

    rota: 
        Esta string deve seguir o exemplo:
            "/rota-teste/{valor-de-alguma-key-no-PLACEHOLDERS}"

    parametros: 
        Este objeto deve seguir o exemplo:
            EXEMPLO_PARAMETROS = {
                keyPLACEHOLDERS: "valorParaSerColocadoNaRota",
            }

*/
const adicionarParametrosRota = (rota, parametros) => {
  return Object.keys(PLACEHOLDERS).reduce((acumulador, elemento) => {
    const placeHolderAtual = PLACEHOLDERS[elemento];

    if (acumulador?.includes(placeHolderAtual)) {
      return acumulador?.replace(placeHolderAtual, parametros[elemento]);
    }

    return acumulador;
  }, rota);
};

export { adicionarParametrosRota };
