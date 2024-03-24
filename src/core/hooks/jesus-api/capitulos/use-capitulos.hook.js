import { useMemo } from "react";
import { appEnv } from "../../../environment/index.js";
import { useHttp } from "../../base/use-http.hook.js";

const useCapitulos = () => {
  const httpInstance = useHttp(appEnv?.REACT_APP_JESUS_API_URL, {});

  const consultarCapitulo = async (versao, abreviacao, capitulo) => {
    const response = httpInstance.get(
      `/jesus-api/capitulos/${versao}/${abreviacao}/${capitulo}`
    );

    return response;
  };

  return useMemo(
    () => ({
      consultarCapitulo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export { useCapitulos };
