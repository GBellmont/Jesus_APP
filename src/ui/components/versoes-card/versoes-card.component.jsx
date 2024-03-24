import "./versoes-card.css";

const VersoesCard = ({
  nome,
  codigo,
  isSelecionada,
  onApareceModalSelecao,
  imagem,
}) => {
  const handleApareceModalSelecao = () => {
    onApareceModalSelecao(codigo);
  };
  const getTextoSelecionada = () => {
    return isSelecionada ? (
      <p className="versoes-card__selecionada font-genos">SELECIONADA</p>
    ) : null;
  };

  return (
    <div
      style={{
        backgroundImage: "url(" + imagem + ")",
      }}
      className="versoes-card"
    >
      {getTextoSelecionada()}
      <h1 className="versoes-card__nome font-genos">{nome}</h1>

      <div className="versoes-card__detalhes">
        <h3 className="versoes-card__codigo font-genos">{`[${codigo?.toUpperCase()}]`}</h3>
        <button
          className="versoes-cards__ver-detalhes font-genos"
          onClick={handleApareceModalSelecao}
        >
          DETALHES
        </button>
      </div>
    </div>
  );
};

export { VersoesCard };
