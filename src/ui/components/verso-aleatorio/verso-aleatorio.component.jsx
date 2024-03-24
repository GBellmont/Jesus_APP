import "./verso-aleatorio.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseUsuarioGlobal } from "../../../core/context";
import { useLoader, useVersos } from "../../../core/hooks";
import { SUBMENUS, IDENTIFICADORES_SUBMENU } from "../../../core/constants";
import versoAleatorioIcon from "../../../assets/images/verso-aleatorio.png";
import {
  adicionarParametrosRota,
  getUsuarioLogadoAtualmente,
} from "../../../core/utils";

const VersoAleatorio = () => {
  const [usuarioGlobal] = UseUsuarioGlobal();
  const [dadosExternos, setDadosExternos] = useState({});
  const { ativarLoader, desativarLoader } = useLoader();
  const { consultarVersoAleatorio } = useVersos();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarVersoAleatorio = async () => {
      ativarLoader();

      const versaoConsulta =
        usuarioGlobal[getUsuarioLogadoAtualmente()]?.versao;

      try {
        const response = await consultarVersoAleatorio(versaoConsulta);

        setDadosExternos({
          nome: `${response?.data?.livro?.nome} ${response?.data?.numeroCapitulo}:${response?.data?.numeroVerso}`,
          verso: response?.data?.numeroVerso,
          abreviacao: response?.data?.livro?.abreviacao?.portugues,
          numeroCapitulo: response?.data?.numeroCapitulo,
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
    const rotaLivro = SUBMENUS?.find(
      (submenu) => submenu?.identificador === IDENTIFICADORES_SUBMENU?.livro
    )?.rota;

    navigate(
      adicionarParametrosRota(rotaLivro, {
        abreviacao: dadosExternos?.abreviacao,
        capitulo: dadosExternos?.numeroCapitulo,
        versoDestaque: dadosExternos?.verso,
      })
    );
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
