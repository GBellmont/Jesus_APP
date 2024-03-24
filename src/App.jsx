import "./App.css";
import { Loader } from "./ui/components";
import { getUsuarioLogadoAtualmente } from "./core/utils";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Home, Livro, BuscaPorPalavra, Versoes } from "./ui/screen";
import { UseUsuarioGlobal } from "./core/context";

const PrivateRoute = ({ children }) => {
  const [usuarioGlobal] = UseUsuarioGlobal();

  const usuario = usuarioGlobal[getUsuarioLogadoAtualmente()];
  return usuario ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="app">
      <Loader />

      <Routes>
        <Route path={"/login"} element={<Login />} />

        <Route
          path={"/home"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path={"/livro/:abreviacao/:capitulo/:versoDestaque"}
          element={
            <PrivateRoute>
              <Livro />
            </PrivateRoute>
          }
        />

        <Route
          path={"/busca-por-palavra"}
          element={
            <PrivateRoute>
              <BuscaPorPalavra />
            </PrivateRoute>
          }
        />

        <Route
          path={"/versoes"}
          element={
            <PrivateRoute>
              <Versoes />
            </PrivateRoute>
          }
        />

        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export { App };
