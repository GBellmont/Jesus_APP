import { appEnv } from "../environment";

const getUsuarioLogadoAtualmente = () => {
  return localStorage.getItem(appEnv?.REACT_APP_ACTUAL_USER_KEY);
};

const setUsuarioLogadoAtualmente = (nomeUsuario) => {
  localStorage.setItem(appEnv?.REACT_APP_ACTUAL_USER_KEY, nomeUsuario);
};

export { getUsuarioLogadoAtualmente, setUsuarioLogadoAtualmente };
