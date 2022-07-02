import React, { useRef, useState } from "react";
import AuthUser from "../services/AuthUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterAdmin() {
  const { http,toasts } = AuthUser();
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [statususer, setStatususer] = useState();
  const nohpRef = useRef(null);

  const ChecNik = (e) => {
    e.preventDefault();
    http
      .get("api/checknama", {
        params: {
          nik: nik,
        },
      })
      .then((res) => {
        setName(res.data.data);

        if (res.data.user.length == 0) {
          setStatususer(1);
          nohpRef.current.focus();
        } else {
          setStatususer(3);
          setNo_hp(res.data.user[0].no_hp);
          setEmail(res.data.user[0].email);
        }
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const RegisterData = () => {
    if (statususer === 3) {
      UpdateUser();
    } else {
      SaveUser();
    }
  };

  async function SaveUser() {
    await http
      .post("api/auth/register", {
        nik: nik,
        name: name,
        no_hp: no_hp,
        email: email,
        password: password,
      })
      .then((res) => {toasts()})
      .catch((error) => console.error(`Error:${error}`));
  }

  async function UpdateUser() {
    await http
      .post("/auth/updateuser", {
        nik: nik,
        name: name,
        no_hp: no_hp,
        email: email,
        password: password,
      })
      .then((res) => {toasts()})
      .catch((error) => console.error(`Error:${error}`));
  }

  async function UpdateEmail() {
      await http
      .post("/auth/updateemail", {
        nik: nik,
        no_hp: no_hp,
        email: email,
      })
      .then((res) => {
        toasts()
      })
      .catch((error) => console.error(`Error:${error}`));
  }

  const InfoRegistrasi = () => {
    if (statususer === 1) {
      return <div className="alert alert-info">User Belum Terdaftar</div>;
    } else if (statususer === 2) {
      return (
        <div className="alert alert-warning">
          Karyawan Belum Menjadi Anggota
        </div>
      );
    } else if (statususer === 3) {
      return (
        <div className="alert alert-success">
          User telah terdaftar, data bisa dirubah
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const ButtonType=()=>{
    if(statususer===3 && password=="" && password_confirm==""){
      return (
        <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modal-default"
      >
        Simpan
      </button>
      );
    }else{
      return (
        <button
        type="button"
        onClick={() => RegisterData()}
        className="btn btn-primary"
      >
        Simpan
      </button>
      );
    }

  }

  return (
    
    <div className="content-wrapper">
      <ToastContainer theme={"colored"}/>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Pinjaman</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Invoice</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    Quick Example <small>jQuery Validation</small>
                  </h3>
                </div>
                <div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <label>NIK</label>

                        <form
                          className="input-group input-group-md"
                          onSubmit={ChecNik}
                        >
                          <input
                            type="text"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            className="form-control"
                          />
                          <span className="input-group-append">
                            <button
                              type="submit"
                              className="btn btn-info btn-flat"
                            >
                              Check
                            </button>
                          </span>
                        </form>
                      </div>

                      <div className="col-sm-8">
                        <label>NAME</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-lg-12">
                        <InfoRegistrasi />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label htmlFor="nohp">No HP</label>
                          <input
                            type="text"
                            ref={nohpRef}
                            value={no_hp}
                            onChange={(e) => setNo_hp(e.target.value)}
                            className="form-control"
                            id="nohp"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password_confirm">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={password_confirm}
                            onChange={(e) =>
                              setPassword_confirm(e.target.value)
                            }
                            className="form-control"
                            id="password_confirm"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              name="terms"
                              className="custom-control-input"
                              id="exampleCheck1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                   <ButtonType/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Default Modal</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Hanya No Handphone dan alamat email yang ingin di ubah?</p>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={() => UpdateEmail()} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
