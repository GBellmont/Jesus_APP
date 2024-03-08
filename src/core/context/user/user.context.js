import { appEnv } from "../../environment";
import createGlobalState from "react-create-global-state";
import { OBJETO_INICIAL_USER_GLOBAL } from "../../constants";

const dadosSalvos = localStorage.getItem(appEnv?.REACT_APP_USER_GLOBAL_KEY);

const INITIAL_USER = dadosSalvos
  ? JSON.parse(dadosSalvos)
  : OBJETO_INICIAL_USER_GLOBAL;

const [useGlobalUser, GlobalUserProvider] = createGlobalState(INITIAL_USER);

const UseUsuarioGlobal = () => {
  const [usuarioGlobal, setUsuarioGlobal] = useGlobalUser();

  const setDadosUsuarioGlobal = (userGlobal) => {
    localStorage.setItem(
      appEnv?.REACT_APP_USER_GLOBAL_KEY,
      JSON.stringify(userGlobal)
    );

    setUsuarioGlobal(userGlobal);
  };

  return [usuarioGlobal, setDadosUsuarioGlobal];
};

export { UseUsuarioGlobal, GlobalUserProvider };
