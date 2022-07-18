import React, { useRef, useState, useEffect } from "react";
import AuthUser from "../services/AuthUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterAdmin() {
  const { http, toasts, user } = AuthUser();
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [rule, setRule] = useState("0");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [statususer, setStatususer] = useState();
  const nohpRef = useRef(null);
  const nikRef = useRef(null);



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
          setRule(res.data.user[0].role);
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

  function clearScreen(){
    setNik("")
    setName("")
    setNo_hp("")
    setEmail("")
    setPassword("")
    setPassword_confirm("");
    setStatususer(0)
    setRule("0")
    nikRef.current.focus();
    
  }

  async function SaveUser() {
    if(rule==="0"){
      return
    }
    await http
      .post("api/auth/register", {
        nik: nik,
        name: name,
        rule:rule,
        no_hp: no_hp,
        email: email,
        password: password,
        role: 1,
      })
      .then((res) => { 
        toasts("succes", "Data Berhasil Tersimpan !")
       })
      .catch((error) => 
      toasts("error", "Data Gagal Tersimpan !")
      );
  }

  async function UpdateUser() {
    await http
      .post("api/auth/updateuser", {
        nik: nik,
        name: name,
        rule:rule,
        no_hp: no_hp,
        email: email,
        password: password,
      })
      .then((res) => {
        if(res.data.status===true){
          toasts("succes", "Data Berhasil Tersimpan !");
          clearScreen();
          
        }else{
          toasts("error", "Data Gagal Tersimpan !")
        }
        
      })
      .catch((error) => console.error(`Error:${error}`));
  }

  async function UpdateEmail() {
    console.log(rule);
    await http
      .post("api/auth/updateemail", {
        nik: nik,
        rule:rule,
        no_hp: no_hp,
        email: email,
      })
      .then((res) => {
        clearScreen()
        toasts("succes", "Data Berhasil Tersimpan !");
      })
      .catch((error) => {
        toasts("error", "Data Gagal Tersimpan !")
      });
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

  const ButtonType = () => {
    if (statususer === 3 && password == "" && password_confirm == "") {
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
    } else {
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
      <ToastContainer theme={"colored"} />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Registrasi</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Registrasi</li>
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
                    Registrasi Anggota
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
                          <input autoComplete="off"
                            ref={nikRef}
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
                        <input autoComplete="off"
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
                      <div className="col-12">

                      <div className="form-group">
                    
                      <label>Rule</label>
                        <select className="form-control col-2" selected value={rule}
                            onChange={(e) => setRule(e.target.value)}>
                          <option value="0" disabled>Pilih Rule</option>
                          <option value="2">Anggota</option>
                          <option value="1">Karyawan</option>
                        </select>
                         
                        </div>

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
                          <label htmlFor="email">EMAIL</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"

                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password_confirm">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={password_confirm}
                            onChange={(e) => setPassword_confirm(e.target.value)}
                            className="form-control"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <ButtonType />
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
              <h4 className="modal-title">Ubah Informasi User</h4>
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
              <p>Hanya No Handphone, Rule dan alamat email yang ingin di ubah?</p>
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
