import React from 'react';
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

import { Outlet } from 'react-router-dom';

function Layout(props) {
  return (
    <div>
      <Header/>
      <Menu/>
      <Outlet/>
      {/* <Footer/>     */}
    </div>
  )
}

export default Layout