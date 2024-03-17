import "./busca-por-palavra.css";
import { useState } from "react";
import { UseUsuarioGlobal } from "../../../core/context";
import { useVersos, useLoader } from "../../../core/hooks";
import {
  validaCamposFormulario,
  getUsuarioLogadoAtualmente,
} from "../../../core/utils";
import { SideMenu, VersoEncontrado } from "../../components";
import { IDENTIFICADORES_SUBMENU } from "../../../core/constants";

const FUNCOES_VALIDADORAS_BUSCA_POR_PALAVRA = {
  palavra: (string) => string.length >= 4,
};

const MENSAGENS_CAMPOS_INVALIDOS_BUSCA_POR_PALAVRA = {
  palavra: "Palavra de busca inválido(a) ou não informado(a).",
};

const OBJETO_INICIAL_BUSCA_POR_PALAVRA = {
  palavra: "",
  erros: {},
  versiculoAleatorioMobileVisivel: false,
};

const INDEX_INICIAL_BUSCA_POR_PALAVRA = 0;
const NUMERO_ITENS_POR_BUSCA = 20;

const BuscaPorPalavra = () => {
  const { consultarVersosPorPalavra } = useVersos();
  const { ativarLoader, desativarLoader } = useLoader();
  const [usuarioGlobal] = UseUsuarioGlobal();
  const [dadosExternos, setDadosExternos] = useState({});
  const [dadosBuscaPorPalavra, setDadosBuscaPorPalavra] = useState(
    OBJETO_INICIAL_BUSCA_POR_PALAVRA
  );

  const onChange = (eventChange) => {
    const { name, value } = eventChange?.target;

    setDadosBuscaPorPalavra({ ...dadosBuscaPorPalavra, [name]: value });
  };

  const onSubmitBuscaPorPalavra = async (eventSubmit) => {
    eventSubmit.preventDefault();

    const { possuiCamposComErro, formulario } = validaCamposFormulario(
      FUNCOES_VALIDADORAS_BUSCA_POR_PALAVRA,
      MENSAGENS_CAMPOS_INVALIDOS_BUSCA_POR_PALAVRA,
      dadosBuscaPorPalavra
    );

    if (possuiCamposComErro) {
      setDadosBuscaPorPalavra({
        ...dadosBuscaPorPalavra,
        erros: formulario?.erros,
      });
    } else {
      await buscarVersosPorPalavra(
        dadosBuscaPorPalavra?.palavra,
        INDEX_INICIAL_BUSCA_POR_PALAVRA
      );

      setDadosBuscaPorPalavra({
        ...dadosBuscaPorPalavra,
        erros: OBJETO_INICIAL_BUSCA_POR_PALAVRA?.erros,
      });
    }
  };

  const handleProximaPagina = async () => {
    if (!dadosExternos?.ultimaPagina) {
      await buscarVersosPorPalavra(
        dadosExternos?.palavraDestaque,
        dadosExternos?.index + 1
      );
    }
  };

  const handlePaginaAnterior = async () => {
    if (!dadosExternos?.primeiraPagina) {
      await buscarVersosPorPalavra(
        dadosExternos?.palavraDestaque,
        dadosExternos?.index - 1
      );
    }
  };

  const buscarVersosPorPalavra = async (palavra, index) => {
    try {
      ativarLoader();

      const versaoConsulta =
        usuarioGlobal[getUsuarioLogadoAtualmente()]?.versao;

      const response = await consultarVersosPorPalavra(
        versaoConsulta,
        palavra,
        index,
        NUMERO_ITENS_POR_BUSCA
      );

      setDadosExternos({
        index: response?.data?.index,
        primeiraPagina: response?.data?.primeiraPagina,
        ultimaPagina: response?.data?.ultimaPagina,
        palavraDestaque: dadosBuscaPorPalavra?.palavra,
        versosEncontrados: response?.data?.itens?.map((item) => {
          return {
            texto: item?.texto,
            nomeLivro: item?.livro?.nome,
            capitulo: item?.numeroCapitulo,
            verso: item?.numeroVerso,
            abreviacao: item?.livro?.abreviacao?.portugues,
          };
        }),
      });
    } catch (erro) {
      console.log(erro);
    } finally {
      desativarLoader();
    }
  };

  return (
    <div className="busca-por-palavra">
      <SideMenu
        parametros={{}}
        submenus={[
          IDENTIFICADORES_SUBMENU?.home,
          IDENTIFICADORES_SUBMENU?.versoes,
        ]}
        identificadorSubmenuAtual={IDENTIFICADORES_SUBMENU?.buscaPorPalavra}
      />

      <div className="busca-por-palavra__container">
        <form
          action="submit"
          className="busca-por-palavra__form"
          onSubmit={onSubmitBuscaPorPalavra}
        >
          <div className="busca-por-palavra__form-label">
            {dadosBuscaPorPalavra?.erros?.palavra !== null &&
              dadosBuscaPorPalavra?.erros?.palavra?.length > 0 && (
                <p className="busca-por-palavra__form-error font-genos">
                  {dadosBuscaPorPalavra?.erros?.palavra}
                </p>
              )}
            <input
              className="busca-por-palavra__form-input font-genos"
              type="text"
              name={"palavra"}
              value={dadosBuscaPorPalavra?.palavra}
              onChange={onChange}
              placeholder={"@Palavra"}
            />
          </div>

          <button className="busca-por-palavra__form-button font-genos">
            PROCURAR
          </button>
        </form>

        <div className="busca-por-palavra__linhe-divisao"></div>

        <div className="busca-por-palavra__versos-encontrados font-genos">
          {dadosExternos?.versosEncontrados === undefined ||
          dadosExternos?.versosEncontrados?.length === 0 ? (
            <p className="busca-por-palavra__sem-versos">
              Nenhum verso encontrado para a palavra digitada acima.
            </p>
          ) : (
            dadosExternos?.versosEncontrados?.map((verso, index) => {
              return (
                <VersoEncontrado
                  key={index}
                  texto={verso?.texto}
                  nomeLivro={verso?.nomeLivro}
                  capitulo={verso.capitulo}
                  verso={verso?.verso}
                  abreviacao={verso?.abreviacao}
                  palavraDestaque={dadosExternos?.palavraDestaque}
                />
              );
            })
          )}
        </div>

        <div className="busca-por-palavra__paginacao">
          <button
            className="busca-por-palavra__pagina-anterior font-genos"
            disabled={
              dadosExternos?.primeiraPagina === undefined
                ? true
                : dadosExternos?.primeiraPagina
            }
            onClick={() => handlePaginaAnterior()}
          >
            ANTERIOR
          </button>
          <p className="busca-por-palavra__numero-pagina font-genos">
            {dadosExternos?.index ? dadosExternos?.index + 1 : 0}
          </p>
          <button
            className="busca-por-palavra__pagina-sucessora font-genos"
            disabled={
              dadosExternos?.ultimaPagina === undefined
                ? true
                : dadosExternos?.ultimaPagina
            }
            onClick={() => handleProximaPagina()}
          >
            PRÓXIMA
          </button>
        </div>
      </div>
    </div>
  );
};

export { BuscaPorPalavra };
