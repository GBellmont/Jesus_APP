import "./home-card.css";

const HomeCard = ({ nome, descricao, testamento, imagem }) => {
  const direcionarParaLeitura = () => {
    //TODO direcionar para a leitura do livro mostrado
    console.log("Direcionar para a leitura de ", nome);
  };

  return (
    <div
      className="home-card font-genos"
      style={{
        backgroundImage: "url(" + imagem + ")",
      }}
    >
      <h1 className="home-card__nome">{nome}</h1>
      <div className="home-card__sobreposicao">
        <p className="home-card__sobreposicao-descricao font-caesar-dressing-regular">
          {descricao}
        </p>
        <p className="home-card__sobreposicao-testamento font-caesar-dressing-regular">
          {testamento}
        </p>
        <button
          className="home-card__sobreposicao-button font-genos"
          onClick={direcionarParaLeitura}
        >
          LER
        </button>
      </div>
    </div>
  );
};

export { HomeCard };
