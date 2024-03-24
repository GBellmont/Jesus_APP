import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVersos, useLoader } from "../../../core/hooks";
import { UseUsuarioGlobal } from "../../../core/context";
import { validaCamposFormulario } from "../../../core/utils";
import { OBJETO_NOVO_USUARIO } from "../../../core/constants";
import { setUsuarioLogadoAtualmente } from "../../../core/utils";
import imagemJesusLogin from "../../../assets/images/jesus-login.png";
import imagemBibliaLogin from "../../../assets/images/biblia-login.png";
import imagemExit from "../../../assets/images/exit.png";
import {
  OBJETO_INICIAL_LOGIN,
  FUNCOES_VALIDADORAS_LOGIN,
  MENSAGENS_CAMPOS_INVALIDOS_LOGIN,
  LOGIN_VERSAO_CONSULTA_VERSO_ALEATORIO,
} from "../../../core/constants";

const Login = () => {
  const [dadosLogin, setDadosLogin] = useState(OBJETO_INICIAL_LOGIN);
  const [dadosExternos, setDadosExternos] = useState({});
  const [usuarioGlobal, setUsuarioGlobal] = UseUsuarioGlobal();
  const { ativarLoader, desativarLoader } = useLoader();
  const { consultarVersoAleatorio } = useVersos();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarVersoAleatorio = async () => {
      ativarLoader();

      try {
        const response = await consultarVersoAleatorio(
          LOGIN_VERSAO_CONSULTA_VERSO_ALEATORIO
        );

        setDadosExternos({
          nome: `${response?.data?.livro?.nome} ${response?.data?.numeroCapitulo}:${response?.data?.numeroVerso}`,
          texto: response?.data?.texto,
        });
      } catch (erro) {
        console.log("Erro: ", erro?.response?.data?.message);
      } finally {
        desativarLoader();
      }
    };

    if (!dadosExternos?.nome) {
      carregarVersoAleatorio();
    }
  }, [
    ativarLoader,
    desativarLoader,
    consultarVersoAleatorio,
    dadosExternos?.nome,
  ]);

  const onChange = (eventChange) => {
    const { name, value } = eventChange?.target;

    setDadosLogin({ ...dadosLogin, [name]: value });
  };

  const onSubmit = async (eventSubmit) => {
    eventSubmit.preventDefault();

    const { possuiCamposComErro, formulario } = validaCamposFormulario(
      FUNCOES_VALIDADORAS_LOGIN,
      MENSAGENS_CAMPOS_INVALIDOS_LOGIN,
      dadosLogin
    );

    if (possuiCamposComErro) {
      setDadosLogin({ ...dadosLogin, erros: formulario?.erros });
    } else {
      if (usuarioGlobal[dadosLogin?.nomeUsuario]) {
        setUsuarioLogadoAtualmente(dadosLogin?.nomeUsuario);

        navigate("/home");
      } else {
        setUsuarioGlobal({
          ...usuarioGlobal,
          [dadosLogin?.nomeUsuario]: {
            ...OBJETO_NOVO_USUARIO,
            nomeUsuario: dadosLogin?.nomeUsuario,
          },
        });

        setUsuarioLogadoAtualmente(dadosLogin?.nomeUsuario);
      }

      setDadosLogin({ ...dadosLogin, erros: OBJETO_INICIAL_LOGIN.erros });
    }
  };

  const getImagemVersoAleatorioButton = () => {
    return dadosLogin?.versiculoAleatorioMobileVisivel
      ? imagemExit
      : imagemBibliaLogin;
  };

  const onToggleMostrarVersiculoMobile = () => {
    setDadosLogin({
      ...dadosLogin,
      versiculoAleatorioMobileVisivel:
        !dadosLogin?.versiculoAleatorioMobileVisivel,
    });
  };

  return (
    <div className="login">
      <button
        style={{
          backgroundImage: "url(" + getImagemVersoAleatorioButton() + ")",
        }}
        className="login__verso-aleatorio-button"
        onClick={onToggleMostrarVersiculoMobile}
      ></button>

      <div
        className={`login__verso-aleatorio ${
          dadosLogin?.versiculoAleatorioMobileVisivel
            ? "login__verso-aleatorio-mobile-visivel"
            : ""
        }`}
      >
        <h1 className="login__verso-aleatorio-livro font-genos">
          {dadosExternos?.nome}
        </h1>
        <p className="login__verso-aleatorio-texto font-genos">
          {dadosExternos?.texto}
        </p>
        <img
          src={imagemBibliaLogin}
          alt="Ícone da Bíblia"
          className="login__verso-aleatorio-icon"
        />
        <div className="login__verso-aleatorio-linha-divisoria"></div>
      </div>

      <form action="submit" className="login__form" onSubmit={onSubmit}>
        <img
          src={imagemJesusLogin}
          alt="ìcone de Jesus"
          className="login__form-icon"
        />
        <h1 className="login__form-titulo font-genos">JESUS APP</h1>
        <h3 className="login__form-instrucao font-caesar-dressing-regular">
          Digite um nome de usuário
        </h3>
        <p className="login__form-observacao font-caesar-dressing-regular">
          Os dados salvos para este usuário estarão disponíveis apenas neste
          aparelho.
        </p>

        <div className="login__form-label">
          {dadosLogin?.erros?.nomeUsuario !== null &&
            dadosLogin?.erros?.nomeUsuario?.length > 0 && (
              <p className="login__form-error font-genos">
                {dadosLogin?.erros?.nomeUsuario}
              </p>
            )}
          <input
            className="login__form-input font-genos"
            type="text"
            name={"nomeUsuario"}
            value={dadosLogin?.nomeUsuario}
            onChange={onChange}
            placeholder={"@NomeUsuário"}
          />
        </div>

        <button className="login__form-button font-genos">ENTRAR</button>
      </form>
    </div>
  );
};

export { Login };
