import createGlobalState from "react-create-global-state";

const [useGlobalLoader, GlobalLoaderProvider] = createGlobalState({
  ativo: false,
});

export { useGlobalLoader, GlobalLoaderProvider };
