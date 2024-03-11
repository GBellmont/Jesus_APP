import "./verso-aleatorio.css";
import { useEffect, useState } from "react";
import { useLoader, useVersos } from "../../../core/hooks";
import { UseUsuarioGlobal } from "../../../core/context";
import { getUsuarioLogadoAtualmente } from "../../../core/utils";
import versoAleatorioIcon from "../../../assets/images/verso-aleatorio.png";

const VersoAleatorio = () => {
  const [usuarioGlobal] = UseUsuarioGlobal();
  const [dadosExternos, setDadosExternos] = useState({});
  const { ativarLoader, desativarLoader } = useLoader();
  const { consultarVersoAleatorio } = useVersos();

  useEffect(() => {
    const carregarVersoAleatorio = async () => {
      ativarLoader();

      const versaoConsulta =
        usuarioGlobal[getUsuarioLogadoAtualmente()]?.versao;

      try {
        const response = await consultarVersoAleatorio(versaoConsulta);

        setDadosExternos({
          nome: `${response?.data?.livro?.nome} ${response?.data?.numeroCapitulo}:${response?.data?.numeroVerso}`,
          texto: response?.data?.texto,
          textoBotao: `Ler ${response?.data?.livro?.nome} ${response?.data?.numeroCapitulo}`,
        });
      } catch (erro) {
        console.log(erro);
      } finally {
        desativarLoader();
      }
    };

    carregarVersoAleatorio();
  }, [ativarLoader, consultarVersoAleatorio, desativarLoader, usuarioGlobal]);

  const onDirecionarParaLeitura = () => {
    //TODO enviar para pagina de leitura do capítulo do verso mostrado
    console.log("Jesus Te Ama");
  };

  return (
    <div className="verso-aleatorio font-genos">
      <div
        style={{
          backgroundImage: "url(" + versoAleatorioIcon + ")",
        }}
        className="verso-aleatorio__icon"
      ></div>

      <h1 className="verso-aleatorio__nome">{dadosExternos?.nome}</h1>
      <p className="verso-aleatorio__texto">{dadosExternos?.texto}</p>

      <button
        className="verso-aleatorio__button font-genos"
        onClick={onDirecionarParaLeitura}
      >
        {dadosExternos?.textoBotao?.toUpperCase()}
      </button>
    </div>
  );
};

export { VersoAleatorio };
