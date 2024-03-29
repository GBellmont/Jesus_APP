import { useMemo } from "react";
import { appEnv } from "../../../environment/index.js";
import { useHttp } from "../../base/use-http.hook.js";

const useVersos = () => {
  const httpInstance = useHttp(appEnv?.REACT_APP_JESUS_API_URL, {});

  const consultarVersoAleatorio = async (versao) => {
    const response = httpInstance.get(`/jesus-api/versos/${versao}/aleatorio`);

    return response;
  };

  const consultarVersosPorPalavra = async (
    versao,
    palavra,
    index,
    numeroItens
  ) => {
    const response = httpInstance.post(
      `/jesus-api/versos/pesquisa/${index}/${numeroItens}`,
      {
        versao: versao,
        palavra: palavra,
      },
      {}
    );

    return response;
  };

  return useMemo(
    () => ({
      consultarVersoAleatorio,
      consultarVersosPorPalavra,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export { useVersos };
