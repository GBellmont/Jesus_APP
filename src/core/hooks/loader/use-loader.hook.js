import { useMemo } from "react";
import { useGlobalLoader } from "../../context";

const useLoader = () => {
  const [, setLoader] = useGlobalLoader();

  const ativarLoader = () => {
    setLoader({ ativo: true });
  };

  const desativarLoader = () => {
    setLoader({ ativo: false });
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
