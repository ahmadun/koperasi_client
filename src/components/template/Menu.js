import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../App';



function Menu() {


    const { state } = useContext(AuthContext)
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Koperasi</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{state.name}</a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview">
                            <NavLink to="/" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/kasbonentry" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Transaksi Kasbon
                                    <span className="right badge badge-danger">Kasir</span>
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/registrasiuser" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Registrasi Anggota
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">ANGGOTA</li>
                        <li className="nav-item">
                            <NavLink to="/simpanan" className="nav-link">
                                <i className="nav-icon far fa-calendar-alt" />
                                <p>
                                    Simpanan
                                </p>
                            </NavLink >
                        </li >
                        <li className="nav-item">
                            <NavLink to="/pinjaman" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p>Pinjaman</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/belanjakontan" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p>Belanja Kontan</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Menu