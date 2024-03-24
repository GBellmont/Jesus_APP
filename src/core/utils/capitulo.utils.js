/*
    A função relatada abaixo deve receber os seguintes objetos para que ocorra 
    a validação correta dos dados:

    capituloMaximo: 
        Este objeto deve seguir o exemplo:
            EXEMPLO_CAPITULO_MAXIMO = 1 - 150;
*/
const montarArrayBotoesCapitulos = (capituloMaximo) => {
  let array = [];

  for (let i = 0; i <= capituloMaximo; i++) {
    array = [...array, { numeroCapitulo: i?.toString() }];
  }

  return array;
};

export { montarArrayBotoesCapitulos };
