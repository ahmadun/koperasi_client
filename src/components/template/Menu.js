import React, { useContext,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../App';



function Menu() {

  

    const { state } = useContext(AuthContext)

    const Authority = () => {



        if (state.role === 1) {
            return (

                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">ADMIN</li>

                            {/* <li className="nav-item">
                                <NavLink to="/kasbonentry" className="nav-link">
                                    <i className="nav-icon fas fa-book" />
                                    <p>
                                        Transaksi Kasbon
                                        <span className="right badge badge-danger">Kasir</span>
                                    </p>
                                </NavLink>
                            </li> */}
                            {/* <li className="nav-item">
                                <NavLink to="/salarydata" className="nav-link">
                                    <i className="nav-icon far fa-copy" />
                                    <p>
                                        Data Gaji
                                    </p>
                                </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to="/registrasiuser" className="nav-link">
                                    <i className="nav-icon far fa-edit" />
                                    <p>
                                        Registrasi Anggota
                                    </p>
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-table" />
                                    <p>
                                        Simpanan Karyawan
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/savingmaster" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Master Simpanan</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/savingmaintenance" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Data Simpanan</p>
                                        </NavLink>
                                    </li>

                                </ul>
                            </li>


                            <li className="nav-item">
                                <NavLink to="/creditreg" className="nav-link">
                                    <i className="nav-icon far fa-edit" />
                                    <p>
                                        Pinjaman Karyawan
                                    </p>
                                </NavLink>
                            </li>






                        </ul>
                    </nav>
                </div>

            )

        } else {
            return (
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
                            <li className="nav-item has-treeview">
                                <NavLink to="/" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">ANGGOTA</li>
                            <li className="nav-item">
                                <NavLink to="/simpanan" className="nav-link">
                                    <i className="nav-icon far fa-list-alt" />
                                    <p>
                                        Simpanan
                                    </p>
                                </NavLink >
                            </li >
                            <li className="nav-item">
                                <NavLink to="/pinjaman" className="nav-link">
                                    <i className="nav-icon far fa-credit-card" />
                                    <p>Pinjaman</p>
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/belanjakontan" className="nav-link">
                                    <i className="nav-icon fas fa-cash-register" />
                                    <p>Input Belanja Kontan</p>
                                </NavLink>
                            </li> */}

                        </ul>
                    </nav>
                </div>


            )
        }

    }

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Koperasi SBI</span>
            </a>



            <Authority />


        </aside>
    )
}

export default Menu