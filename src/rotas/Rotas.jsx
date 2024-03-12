import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../paginas/dashboard/Dashboard";
import Listar from "../paginas/usuario/Listar";
import Incluir from "../paginas/usuario/Incluir";
import ManutencaoRole from "../paginas/role_usuario/ManutencaoRole";
import Login from "../paginas/login/Login";
import PrivateRoute from "./PrivateRoute";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuario/listar" element={<Listar />} />
        <Route path="/usuario/incluir" element={<Incluir />} />
        <Route path="/role/adicionar/:id" element={<ManutencaoRole />} />
      </Route>
    </Routes>
  );
};

export default Rotas;