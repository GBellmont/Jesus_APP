import "./versoes.css";
import { useEffect, useState } from "react";
import { UseUsuarioGlobal } from "../../../core/context";
import { SideMenu, VersoesCard } from "../../components";
import { useVersoes, useLoader } from "../../../core/hooks";
import {
  getImagemAleatoria,
  getUsuarioLogadoAtualmente,
} from "../../../core/utils";

import {
  IDENTIFICADORES_SUBMENU,
  URLS_IMAGENS_HOME,
  INDEX_CONSULTA_VERSOES,
  NUMERO_ITENS_CONSULTA_VERSOES,
} from "../../../core/constants";

const Versoes = () => {
  const [dadosExternos, setDadosExternos] = useState({});
  const [usuarioGlobal, setUsuarioGlobal] = UseUsuarioGlobal();
  const { listarVersoes } = useVersoes();
  const { ativarLoader, desativarLoader } = useLoader();

  useEffect(() => {
    const carregarDadosExternos = async () => {
      ativarLoader();

      try {
        const response = await listarVersoes(
          INDEX_CONSULTA_VERSOES,
          NUMERO_ITENS_CONSULTA_VERSOES
        );

        setDadosExternos({
          versaoModalDetalhes: "",
          modalSelecaoVisivel: false,
          versoes: response?.data?.itens?.map((item) => {
            return {
              nome: item?.nomeCompleto,
              codigo: item?.codigoVersao,
              descricao: item?.descricao,
              imagem: getImagemAleatoria(URLS_IMAGENS_HOME),
            };
          }),
        });
      } catch (erro) {
        console.log(erro);
      } finally {
        desativarLoader();
      }
    };

    carregarDadosExternos();
  }, [ativarLoader, desativarLoader, listarVersoes]);

  const getVersaoAtualUsuario = () => {
    return usuarioGlobal[getUsuarioLogadoAtualmente()]?.versao;
  };

  const onApareceModalSelecaoVersao = (codigo) => {
    setDadosExternos({
      ...dadosExternos,
      versaoModalDetalhes: codigo,
      modalSelecaoVisivel: true,
    });
  };

  const onFecharModal = () => {
    setDadosExternos({
      ...dadosExternos,
      versaoModalDetalhes: "",
      modalSelecaoVisivel: false,
    });
  };

  const onSelecionarVersao = () => {
    const usuario = usuarioGlobal[getUsuarioLogadoAtualmente()];

    const usuarioAtualizado = {
      ...usuario,
      versao: dadosExternos?.versaoModalDetalhes,
    };

    setUsuarioGlobal({
      ...usuarioGlobal,
      [getUsuarioLogadoAtualmente()]: usuarioAtualizado,
    });
    onFecharModal();
  };

  const getVersaoSelecionada = () => {
    return dadosExternos?.versoes?.find((versao) => {
      return versao?.codigo === dadosExternos?.versaoModalDetalhes;
    });
  };

  return (
    <div className="versoes">
      <SideMenu
        identificadorSubmenuAtual={IDENTIFICADORES_SUBMENU?.versoes}
        submenus={[
          IDENTIFICADORES_SUBMENU?.buscaPorPalavra,
          IDENTIFICADORES_SUBMENU?.home,
        ]}
        parametros={{}}
      />

      <div
        className={`versoes__background-modal ${
          dadosExternos?.modalSelecaoVisivel ? `versoes__modal-visivel` : ``
        }`}
      >
        <div className="versoes__modal-selecao-versao">
          <div className="versoes__modal-container">
            <h1 className="versoes__modal-nome font-genos">
              {getVersaoSelecionada()?.nome}
            </h1>
            <h3 className="versoes__modal-codigo font-genos">
              {`[${getVersaoSelecionada()?.codigo?.toUpperCase()}]`}
            </h3>
            <p className="versoes__modal-descricao font-caesar-dressing-regular">
              {getVersaoSelecionada()?.descricao}
            </p>
            <div className="versoes__modal-buttons">
              <button
                className="versoes__modal-fechar font-genos"
                onClick={onFecharModal}
              >
                FECHAR
              </button>
              <button
                className="versoes__modal-selecionar font-genos"
                onClick={onSelecionarVersao}
                disabled={
                  getVersaoAtualUsuario() === dadosExternos?.versaoModalDetalhes
                }
              >
                {getVersaoAtualUsuario() === dadosExternos?.versaoModalDetalhes
                  ? `SELECIONADA`
                  : `SELECIONAR`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="versoes__consultadas">
        {dadosExternos?.versoes?.map((versao, index) => {
          return (
            <VersoesCard
              key={index}
              nome={versao?.nome}
              codigo={versao?.codigo}
              imagem={versao?.imagem}
              isSelecionada={getVersaoAtualUsuario() === versao?.codigo}
              onApareceModalSelecao={onApareceModalSelecaoVersao}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Versoes };
