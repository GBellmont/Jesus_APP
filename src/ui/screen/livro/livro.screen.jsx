import "./livro.css";
import { useParams } from "react-router-dom";
import { UseUsuarioGlobal } from "../../../core/context";
import { SideMenu, BotaoCapitulo } from "../../components";
import { useCallback, useEffect, useState, useRef } from "react";
import { IDENTIFICADORES_SUBMENU } from "../../../core/constants";
import { useLivros, useLoader, useCapitulos } from "../../../core/hooks";
import {
  getUsuarioLogadoAtualmente,
  montarArrayBotoesCapitulos,
} from "../../../core/utils";

const Livro = () => {
  const referenciaVersoDestaque = useRef(null);
  const { abreviacao, capitulo, versoDestaque } = useParams();
  const { ativarLoader, desativarLoader } = useLoader();
  const { consultarLivroPorAbreviacao } = useLivros();
  const { consultarCapitulo } = useCapitulos();
  const [usuarioGlobal] = UseUsuarioGlobal();
  const [dadosExternos, setDadosExternos] = useState({});
  const [dadosLivro, setDadosLivro] = useState({});

  const consultarCapituloLivro = useCallback(
    async (capitulo) => {
      const versaoConsulta =
        usuarioGlobal[getUsuarioLogadoAtualmente()]?.versao;

      try {
        const response = await consultarCapitulo(
          versaoConsulta,
          abreviacao,
          capitulo
        );

        return {
          numeroCapitulo: response?.data?.capitulo?.numero?.toString(),
          versos: response?.data?.versos,
        };
      } catch (erro) {
        console.log(erro);
      }
    },
    [abreviacao, consultarCapitulo, usuarioGlobal]
  );

  useEffect(() => {
    const carregarDadosExternos = async () => {
      ativarLoader();

      try {
        const livroResponse = await consultarLivroPorAbreviacao(abreviacao);

        const capituloConsulta =
          capitulo &&
          capitulo !== "0" &&
          parseInt(capitulo) <= livroResponse?.data?.numeroCapitulos
            ? capitulo
            : "1";

        const capituloResponse = await consultarCapituloLivro(capituloConsulta);

        setDadosExternos({
          livro: {
            descricao: livroResponse?.data?.comentario,
            nome: livroResponse?.data?.nome,
            botoesCapitulo: montarArrayBotoesCapitulos(
              livroResponse?.data?.numeroCapitulos
            ),
          },
          capitulo: capituloResponse,
        });

        const capituloSecionado =
          capitulo && parseInt(capitulo) <= livroResponse?.data?.numeroCapitulos
            ? capitulo
            : "0";

        setDadosLivro({
          capituloSelecionado: capituloSecionado,
        });
      } catch (erro) {
        console.log(erro);
      } finally {
        desativarLoader();

        setTimeout(
          () => referenciaVersoDestaque?.current?.scrollIntoView(),
          250
        );
      }
    };

    carregarDadosExternos();
  }, [
    abreviacao,
    ativarLoader,
    capitulo,
    consultarCapituloLivro,
    consultarLivroPorAbreviacao,
    desativarLoader,
  ]);

  const onSetNovoCapituloSelecionado = async (numeroCapitulo) => {
    const capituloExternoJaConsultado =
      numeroCapitulo === dadosExternos?.capitulo?.numeroCapitulo;

    if (!capituloExternoJaConsultado && numeroCapitulo !== "0") {
      ativarLoader();

      const capituloResponse = await consultarCapituloLivro(numeroCapitulo);

      setDadosExternos({ ...dadosExternos, capitulo: capituloResponse });
      desativarLoader();
    }

    setDadosLivro({ ...dadosLivro, capituloSelecionado: numeroCapitulo });
  };

  const getTextoFolha = () => {
    const isIntroducao = dadosLivro?.capituloSelecionado === "0";

    if (isIntroducao) {
      return dadosExternos?.livro?.descricao?.length !== 0
        ? dadosExternos?.livro?.descricao
        : "Nenhuma Descrição Encontrada Para Este Livro...";
    } else {
      const versoDestaqueVerificado = versoDestaque
        ? parseInt(versoDestaque)
        : null;
      return dadosExternos?.capitulo?.versos?.map((elemento, index) => {
        return (
          <span
            key={index}
            className={`livro__detalhes-folha-principal-verso ${
              versoDestaqueVerificado === elemento?.numero &&
              capitulo === dadosLivro?.capituloSelecionado
                ? "livro__detalhes-folha-principal-verso-destacado"
                : ""
            }`}
            ref={
              versoDestaqueVerificado === elemento?.numero &&
              capitulo === dadosLivro?.capituloSelecionado
                ? referenciaVersoDestaque
                : null
            }
          >{`[${elemento?.numero}] - ${elemento?.texto}`}</span>
        );
      });
    }
  };

  return (
    <div className="livro">
      <SideMenu
        parametros={{}}
        submenus={[
          IDENTIFICADORES_SUBMENU?.home,
          IDENTIFICADORES_SUBMENU?.versoes,
          IDENTIFICADORES_SUBMENU?.buscaPorPalavra,
        ]}
        identificadorSubmenuAtual={IDENTIFICADORES_SUBMENU?.livro}
      />

      <div className="livro__container">
        <div className="livro__detalhes">
          <div className="livro__detalhes-nome-livro font-genos">
            {dadosExternos?.livro?.nome}
          </div>
          <div className="livro__detalhes-texto">
            <div className="livro__detalhes-folhas">
              <p className="livro__detalhes-folha-principal font-genos">
                {getTextoFolha()}
              </p>
              <div className="livro__detalhes-primeira-folha"></div>
              <div className="livro__detalhes-segunda-folha"></div>
            </div>
          </div>
        </div>

        <div className="livro__capitulos">
          {dadosExternos &&
            dadosExternos?.livro?.botoesCapitulo?.length !== 0 &&
            dadosExternos?.livro?.botoesCapitulo?.map((elemento, index) => (
              <BotaoCapitulo
                key={index}
                numeroCapitulo={elemento?.numeroCapitulo}
                isSelecionado={
                  dadosLivro?.capituloSelecionado === elemento?.numeroCapitulo
                }
                onSetNovoCapituloSelecionado={() =>
                  onSetNovoCapituloSelecionado(elemento?.numeroCapitulo)
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export { Livro };
