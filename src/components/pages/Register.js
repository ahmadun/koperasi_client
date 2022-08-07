import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AuthUser from '../services/AuthUser';

const Register = () => {

    const { http, toasts } = AuthUser();
    const [userinfo, setUserinfo] = useState({
        nik: "",
        name: "",
        email: "",
        nohp: "",
        no_hp: "",
        role: "2",
        password: "",
        password_conf: "",
        created_by:"user"
    })

    const handleChange = (e) => {
        const newInput = (newData) => ({ ...newData, [e.target.name]: e.target.value });
        setUserinfo(newInput);
    };


    async function submitUser(e) {
        e.preventDefault()

        console.log(userinfo)

        if (userinfo.password != userinfo.password_conf) {
            toasts("error", "Password Konfirmasi tidak sama !");

        }
        else {
            await http
                .post("/api/users", userinfo)
                .then((res) => {
                    if (res.data.data == true) {
                        toasts("succes", "Data Berhasil Tersimpan !");
                    }

                })
                .catch((error) => console.error(`Error:${error}`));
        }

    }

    return (
        <><ToastContainer theme={"colored"}/><div className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Koperasi</b> SBI</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Pendaftaran Layanan Komperasi SBI</p>
                        <form onSubmit={submitUser}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={userinfo.nik} onChange={handleChange} name="nik" placeholder="NIK" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={userinfo.name} onChange={handleChange} name="name" placeholder="Name" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" value={userinfo.email} onChange={handleChange} name="email" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={userinfo.no_hp} onChange={handleChange} name="no_hp" placeholder="No Hp" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" value={userinfo.password} onChange={handleChange} name="password" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" value={userinfo.password_conf} onChange={handleChange} name="password_conf" placeholder="Retype password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">

                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>

        </div></>
    )
}

export default Register