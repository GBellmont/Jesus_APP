import { useMemo } from "react";
import { appEnv } from "../../../environment/index.js";
import { useHttp } from "../../base/use-http.hook.js";

const useLivros = () => {
  const httpInstance = useHttp(appEnv?.REACT_APP_JESUS_API_URL, {});

  const listarLivros = async (index, numeroItens) => {
    const response = httpInstance.get(
      `/jesus-api/livros/${index}/${numeroItens}`
    );

    return response;
  };

  const consultarLivroPorAbreviacao = async (abreviacao) => {
    const response = httpInstance.get(`/jesus-api/livros/${abreviacao}`);

    return response;
  };

  return useMemo(
    () => ({
      listarLivros,
      consultarLivroPorAbreviacao,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export { useLivros };
