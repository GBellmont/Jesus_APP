import createGlobalState from "react-create-global-state";
import { appEnv } from "../../environment";

localStorage?.setItem(
  appEnv?.REACT_APP_LOADER_ACTIVES,
  JSON?.stringify({ loaders: 0 })
);

const [useGlobalLoader, GlobalLoaderProvider] = createGlobalState({
  ativo: false,
});

export { useGlobalLoader, GlobalLoaderProvider };
