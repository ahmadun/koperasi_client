import "./App.css";

import React from "react";
import Layout from "./components/template/Layout";

import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/template/Dashboard";
import SimpananMain from "./components/pages/SimpananMain";
import PinjamanMain from "./components/pages/PinjamanMain";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import RegisterAdmin from "./components/pages/RegisterAdmin";
import ProtectedRoutes from "./ProtectedRoutes";
import KasbonEntry from "./components/pages/KasbonEntry";
import BelanjaKontan from "./components/pages/BelanjaKontan";
import SalaryData from "./components/pages/SalaryData";

const Views = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route exact path="/simpanan" element={<Layout />}>
          <Route index element={<SimpananMain />} />
        </Route>
        <Route exact path="/pinjaman" element={<Layout />}>
          <Route index element={<PinjamanMain />} />
        </Route>
        <Route exact path="/registrasiuser" element={<Layout />}>
          <Route index element={<RegisterAdmin />} />
        </Route>
        <Route exact path="/kasbonentry" element={<Layout />}>
          <Route index element={<KasbonEntry />} />
        </Route>
        <Route exact path="/belanjakontan" element={<Layout />}>
          <Route index element={<BelanjaKontan />} />
        </Route>
        <Route exact path="/salarydata" element={<Layout />}>
          <Route index element={<SalaryData />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Views;
