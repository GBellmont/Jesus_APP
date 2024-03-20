import "./App.css";
import { Loader } from "./ui/components";
import { Login, Home, Livro, BuscaPorPalavra } from "./ui/screen";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Loader />

      <Routes>
        <Route path={"/login"} element={<Login />} />

        <Route path={"/home"} element={<Home />} />

        <Route
          path={"/livro/:abreviacao/:capitulo/:versoDestaque"}
          element={<Livro />}
        />

        <Route path={"/busca-por-palavra"} element={<BuscaPorPalavra />} />

        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export { App };
