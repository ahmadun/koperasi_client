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

  const [niktxt, setNiktxt] = useState("");
  const [member, setMember] = useState([]);
  const [userinfo, setUserinfo] = useState({
    nik: "",
    name: "",
    email: "",
    no_hp: "",
    password: ""
  })
  const [confirm_pass, setConfirm_pass] = useState("");



  function clearScreen() {
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

  async function SaveUser(e) {
    e.preventDefault()
    if (rule === "0") {
      return
    }
    await http
      .post("/api/users", {
        nik: nik,
        name: name,
        role: rule,
        no_hp: no_hp,
        email: email,
        password: password,
        role: 1,
        created_by: 'Ahmadun',
      })
      .then((res) => {
        toasts("succes", "Data Berhasil Tersimpan !")
      })
      .catch((error) =>
        toasts("error", "Data Gagal Tersimpan !")
      );
  }




  function getData(e) {
    e.preventDefault()
    http.get('/api/checkmember', {
      params: {
        nik: niktxt
      }
    }).then((res) => {
      setMember(res.data)
    }).catch(error => console.error(`Error:${error}`));
  }


  const handleChangeUser = (e) => {

    const newInput = (data) => ({ ...data, [e.target.name]: e.target.value })
    setUserinfo(newInput)
  }


  const displayData = (nik) => {
    const datanow = member.filter((newData) => newData.nik === nik);
    datanow.map((item, i) => {
      setUserinfo(item)
    });
  }

  const updateUserinfo = (e) => {
    e.preventDefault()
    http
      .put("/api/users",
        userinfo
      )
      .then((res) => {
        clearScreen()
        toasts("succes", "Data Berhasil Tersimpan !");
      })
      .catch((error) => {
        toasts("error", "Data Gagal Tersimpan !")
      });
  }

  const updateUserpwd = (e) => {
    e.preventDefault()
    console.log(userinfo)
    http
      .put("/api/users/pwd",
        userinfo
      )
      .then((res) => {
        clearScreen()
        toasts("succes", "Data Berhasil Tersimpan !");
      })
      .catch((error) => {
        toasts("error", "Data Gagal Tersimpan !")
      });
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


                <div className="row">

                  <div className="col-12">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Registrasi</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Data User</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                        <div className="row">


                          <div className="card-body">


                            <div className="row">
                              <div className="col-sm-4">
                                <label>NIK</label>

                                <div
                                  className="input-group input-group-md">
                                  <input autoComplete="off"
                                    ref={nikRef}
                                    type="text"
                                    value={nik}
                                    onChange={(e) => setNik(e.target.value)}
                                    className="form-control"
                                  />

                                </div>
                              </div>

                              <div className="col-sm-8">
                                <label>Name</label>
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

                              <div className="col-12">

                                <form onSubmit={SaveUser}>

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
                                  <input autoComplete="off"
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
                                  <input autoComplete="off"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"

                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="password">Password</label>
                                  <input autoComplete="off"
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
                                  <input autoComplete="off"
                                    type="password"
                                    value={password_confirm}
                                    onChange={(e) => setPassword_confirm(e.target.value)}
                                    className="form-control"
                                  />
                                </div>

                                <br></br>
                                <div className="form-group">

                                  
                                  <button type="submit" className="btn btn-primary">Save</button>
                                  

                                </div>


                                </form>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="card-body">

                          <div className="row" style={{ marginBottom: "15px" }}>
                            <div className="col-6">


                              <div>
                                <form onSubmit={getData}>
                                  <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">NIK</label>
                                    <div className="col-3">
                                      <input type="text" onChange={e => setNiktxt(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="col-3">
                                      <button type="submit" className="btn btn-primary">Show</button>
                                    </div>
                                  </div>
                                </form>

                              </div>


                            </div>
                            <div className="col-6 text-right">

                            



                            </div>
                          </div>



                          <div className="card">
                            <div className="card-header">
                              <h3 className="card-title"></h3>
                              <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: 150 }}>
                                  <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                  <div className="input-group-append">
                                    <button type="submit" className="btn btn-default">
                                      <i className="fas fa-search" />
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </div>

                            <div className="card-body table-responsive p-0">
                              <table className="table table-hover text-nowrap">
                                <thead>
                                  <tr>
                                    <th>NIK</th>
                                    <th>Nama</th>
                                    <th>No HP</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Aksi</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    member.map((item, i) => (
                                      <tr key={i}>
                                        <td>{item.nik}</td>
                                        <td>{item.name}</td>
                                        <td>{item.no_hp}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>

                                          <button type="button" onClick={() => displayData(item.nik)} data-toggle="modal" data-target="#modal-edit" className="btn-sm btn-primary"><span className="fa fa-edit"/></button>

                                        </td>
                                      </tr>

                                    ))}

                                </tbody>


                              </table>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <div>
        <div className="modal fade" id="modal-edit">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Data User</h4>
              </div>
              <div className="modal-body">



                <div className="row">

                  <div className="col-12">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-toggle="tab" data-target="#user-info" type="button" role="tab" aria-controls="home" aria-selected="true">Registrasi</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-toggle="tab" data-target="#user-pwd" type="button" role="tab" aria-controls="profile" aria-selected="false">Data User</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="user-info" role="tabpanel" aria-labelledby="home-tab">


                        <form onSubmit={updateUserinfo}>
                          <div className="card-body">
                            <div className="form-group">
                              <label>NIK</label>
                              <input type="text" readOnly value={userinfo.nik} onChange={handleChangeUser} className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>Name</label>
                              <input type="text" name="name" value={userinfo.name} onChange={handleChangeUser} className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Email</label>
                              <input type="text" name="email" value={userinfo.email} onChange={handleChangeUser} className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>No HP</label>
                              <input type="text" name="no_hp" value={userinfo.no_hp} onChange={handleChangeUser} className="form-control" />
                            </div>


                          </div>
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                          </div>
                        </form>


                      </div>
                      <div className="tab-pane fade" id="user-pwd" role="tabpanel" aria-labelledby="home-tab">

                        <form onSubmit={updateUserpwd}>
                          <div className="card-body">
                            <div className="form-group">
                              <label>NIK</label>
                              <input type="text" readOnly value={userinfo.nik} className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>Name</label>
                              <input type="text" readOnly name="name" value={userinfo.name} className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Password</label>
                              <input type="password" name="password" value={userinfo.password} onChange={handleChangeUser} className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input type="password" name="password-conf" value={confirm_pass} onChange={(e) => setConfirm_pass(e.target.value)} className="form-control" />
                            </div>


                          </div>
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default RegisterAdmin;
