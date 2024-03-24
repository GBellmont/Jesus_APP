import { useMemo } from "react";
import { appEnv } from "../../environment";
import { useGlobalLoader } from "../../context";

const getNumeroLoadersAtivos = () => {
  const stringJsonAtivos = localStorage?.getItem(
    appEnv?.REACT_APP_LOADER_ACTIVES
  );
  const objetoLoadersAtivos = stringJsonAtivos
    ? JSON.parse(stringJsonAtivos)
    : { loaders: 0 };

  return parseInt(objetoLoadersAtivos?.loaders);
};

const setNumeroLoadersAtivos = (int) => {
  localStorage?.setItem(
    appEnv?.REACT_APP_LOADER_ACTIVES,
    JSON?.stringify({ loaders: int })
  );
};

const useLoader = () => {
  const [, setLoader] = useGlobalLoader();

  const ativarLoader = () => {
    const loadersAtivos = getNumeroLoadersAtivos();
    setNumeroLoadersAtivos(loadersAtivos + 1);

    setLoader({ ativo: true });
  };

  const desativarLoader = () => {
    const loadersAtivos = getNumeroLoadersAtivos();

    if (loadersAtivos - 1 === 0) {
      setLoader({ ativo: false });
    }

    setNumeroLoadersAtivos(loadersAtivos - 1);
  };

  return useMemo(
    () => ({
      ativarLoader,
      desativarLoader,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export { useLoader };
