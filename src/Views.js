import "./App.css";

import React, { useContext, useEffect } from "react";
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
import SavingsMaintenance from "./components/pages/SavingsMaintenance";
import MasterSavings from "./components/pages/MasterSavings";
import CreditReguler from "./components/pages/CreditReguler";
import ManageCredit from "./components/pages/ManageCredit";
import { AuthContext } from "./App";
import AuthUser from "./components/services/AuthUser";
import ResetPassword from "./components/pages/ResetPassword";
import RegistrasiMember from "./components/pages/RegistrasiMember";

const Views = () => {
  const { http } = AuthUser();
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {

    if (!state.isAuthenticated) {
      http.get('/api/protected').then(response => {
        dispatch({

          type: "LOGIN",
          payload: response.data.data
        })

      })

    }


  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route exact path="/changepassword" element={<Layout />}>
          <Route index element={<ResetPassword />} />
        </Route>

        <Route exact path="/registrasimember" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<RegistrasiMember />} />
          }
        </Route>

        <Route exact path="/simpanan" element={<Layout />}>
          {state.role === 2 &&
            <Route index element={<SimpananMain />} />
          }
        </Route>
        <Route exact path="/pinjaman" element={<Layout />}>
          {state.role === 2 &&
            <Route index element={<PinjamanMain />} />
          }
        </Route>
        <Route exact path="/registrasiuser" element={<Layout />}>
          <Route index element={<RegisterAdmin />} />
        </Route>
        <Route exact path="/kasbonentry" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<KasbonEntry />} />
          }
        </Route>
        <Route exact path="/belanjakontan" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<BelanjaKontan />} />
          }
        </Route>
        <Route exact path="/salarydata" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<SalaryData />} />
          }
        </Route>
        <Route exact path="/savingmaintenance" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<SavingsMaintenance />} />
          }
        </Route>
        <Route exact path="/savingmaster" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<MasterSavings />} />
          }
        </Route>
        <Route exact path="/creditreg" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<CreditReguler />} />
          }
        </Route>
        <Route exact path="/managecredit" element={<Layout />}>
          {state.role === 1 &&
            <Route index element={<ManageCredit />} />
          }
        </Route>
      </Route>
    </Routes>
  );
};

export default Views;
