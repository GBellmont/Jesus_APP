import "./botao-capitulo.css";

const BotaoCapitulo = ({
  numeroCapitulo,
  isSelecionado,
  onSetNovoCapituloSelecionado,
}) => {
  return (
    <button
      className="botao-capitulo font-genos"
      disabled={isSelecionado}
      onClick={onSetNovoCapituloSelecionado}
    >
      {numeroCapitulo}
    </button>
  );
};

export { BotaoCapitulo };
