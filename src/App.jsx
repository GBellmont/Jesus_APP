import "./App.css";
import { Loader } from "./ui/components";
import { Login, Home, Livro } from "./ui/screen";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Loader />

      <Routes>
        <Route path={"/login"} element={<Login />} />

        <Route path={"/home"} element={<Home />} />

        <Route path={"/livro/:abreviacao/:capitulo"} element={<Livro />} />

        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export { App };
