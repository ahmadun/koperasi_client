import React, { Component,useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../App'
import AuthUser from '../services/AuthUser';

function Header() {

    const {http,logout} = AuthUser();
    const { dispatch } = useContext(AuthContext)

    function logOut(){

       http
        .post("/api/logout" )
        .then((res) => {
            logout()
        })
        .catch((error) => console.error(`Error:${error}`));

    }


    function changepass(){

       
 
     }
 
    const { state } = useContext(AuthContext)
        return (

            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
                    </li>

                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                            <img src="../../dist/img/avatar5.png" className="user-image img-circle elevation-2" alt="User Image" />
                            <span className="d-none d-md-inline"><b>{state.name}</b></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <li className="user-header bg-primary">
                                <img src="../../dist/img/avatar5.png" className="img-circle elevation-2" alt="User Image" />
                                <p>
                                    {state.name}
                                    <small>{state.nik}</small>
                                </p>
                            </li>

                            

                            <li className="user-footer">
                                <NavLink to="/changepassword" className="btn btn-default btn-flat float-left">Ubah Password</NavLink>
                                <a onClick={()=>logOut()} className="btn btn-default btn-flat float-right">Sign out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
}

export default Header