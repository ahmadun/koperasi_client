import React,{useState,useContext} from 'react'
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../../App';
import AuthUser from '../services/AuthUser';

const ResetPassword = () => {
    const { state } = useContext(AuthContext);
    const { http, toasts } = AuthUser();
    const [userinfo, setUserinfo] = useState({
        passwordsold:"",
        password: "",
        passwordsconf: ""
      })
      const handleChangeUser = (e) => {

        const newInput = (data) => ({ ...data, [e.target.name]: e.target.value })
        setUserinfo(newInput)
      }

      async function SaveUser(e) {
        e.preventDefault()

        if(userinfo.password!=userinfo.passwordsconf){
            toasts("error", "Konfirmasi Password salah!")
        }else{

            await http
            .post("/api/users/chagenpwduser", {
              nik: state.nik,
              password: userinfo.password,
              passwordold:userinfo.passwordsold,
              created_by: state.nik,
            })
            .then((res) => {
              if(res.data.data===true){
                toasts("succes", "Password Berhasil Dirubah !")
              }
              else if(res.data.data===false){
                  toasts("error", "Password Lama Salah !")
              }          
            })
            .catch((error) =>
              toasts("error", "Data Gagal Tersimpan !")
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
                            <h1></h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Perubahan</li>
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
                                    <h3 className="card-title">Ubah Password</h3>
                                </div>
                                <div>
                                    <div className="card-body">

                                    <form onSubmit={SaveUser}>
                          <div className="card-body">
                            
                            
                            <div className="form-group">
                              <label>Password Lama</label>
                              <input type="password" name="passwordsold" value={userinfo.passwordsold} onChange={handleChangeUser}  className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Password Baru</label>
                              <input type="password" name="password" value={userinfo.password} onChange={handleChangeUser} className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Konfirmasi Password</label>
                              <input type="password" name="passwordsconf" value={userinfo.passwordsconf} onChange={handleChangeUser} className="form-control" />
                            </div>


                          </div>
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                          </div>
                        </form>

            
                                    </div>
                                    <div className="card-footer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default ResetPassword