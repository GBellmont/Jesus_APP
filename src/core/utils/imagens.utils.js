/*
    A função relatada abaixo deve receber os seguintes objetos para que ocorra 
    a validação correta dos dados:

    imagens: 
        Este objeto deve seguir o exemplo:
            EXEMPLO_IMAGENS = [
                "http://base-url/gg"
            ]

*/
const getImagemAleatoria = (imagens) => {
  const numeroRandom = Math.floor(Math.random() * (imagens?.length - 0) + 0);

  return imagens[numeroRandom];
};

export { getImagemAleatoria };
