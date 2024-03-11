import "./home.css";
import { SideMenu, HomeCard } from "../../components";
import { getImagemAleatoria } from "../../../core/utils";
import { useLoader, useLivros } from "../../../core/hooks";
import {
  IDENTIFICADORES_SUBMENU,
  URLS_IMAGENS_HOME,
  INDEX_LIVROS_HOME,
  NUMERO_LIVROS_HOME,
  TESTAMENTOS_HOME,
} from "../../../core/constants";
import { useEffect, useState } from "react";

const Home = () => {
  const { ativarLoader, desativarLoader } = useLoader();
  const { listarLivros } = useLivros();
  const [dadosExternos, setDadosExternos] = useState({});

  useEffect(() => {
    const carregarLivros = async () => {
      ativarLoader();

      try {
        const response = await listarLivros(
          INDEX_LIVROS_HOME,
          NUMERO_LIVROS_HOME
        );

        setDadosExternos({
          livros: response?.data?.itens?.map((livro) => {
            return {
              nome: livro?.nome,
              descricao: `Escrito por ${livro?.autor}, contendo ${livro?.numeroCapitulos} capítulos. O livro de ${livro?.nome} pertence ao grupo: ${livro?.grupo}.`,
              testamento: TESTAMENTOS_HOME[livro?.testamento],
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

    carregarLivros();
  }, [ativarLoader, desativarLoader, listarLivros]);

  return (
    <div className="home">
      <SideMenu
        parametros={{}}
        submenus={[
          IDENTIFICADORES_SUBMENU?.versoes,
          IDENTIFICADORES_SUBMENU?.buscaPorPalavra,
        ]}
        identificadorSubmenuAtual={IDENTIFICADORES_SUBMENU?.home}
      />

      <div className="home__cards">
        {dadosExternos?.livros !== null &&
          dadosExternos?.livros?.length !== 0 &&
          dadosExternos?.livros?.map((livro, index) => (
            <HomeCard
              key={index}
              nome={livro?.nome}
              descricao={livro?.descricao}
              testamento={livro?.testamento}
              imagem={livro?.imagem}
            />
          ))}
      </div>
    </div>
  );
};

export { Home };
