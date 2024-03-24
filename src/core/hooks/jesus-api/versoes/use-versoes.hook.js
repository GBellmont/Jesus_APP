import { useMemo } from "react";
import { appEnv } from "../../../environment/index.js";
import { useHttp } from "../../base/use-http.hook.js";

const useVersoes = () => {
  const httpInstance = useHttp(appEnv?.REACT_APP_JESUS_API_URL, {});

  const listarVersoes = async (index, numeroItens) => {
    const response = httpInstance.get(
      `/jesus-api/versoes/${index}/${numeroItens}`
    );

    return response;
  };

  return useMemo(
    () => ({
      listarVersoes,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export { useVersoes };
