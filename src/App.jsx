import "./App.css";
import { Login, Home } from "./ui/screen";
import { Loader } from "./ui/components";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Loader />

      <Routes>
        <Route path={"/login"} element={<Login />} />

        <Route path={"/home"} element={<Home />} />

        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export { App };
