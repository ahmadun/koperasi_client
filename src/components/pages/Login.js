import axios from 'axios'
import React, { useState,useContext  } from 'react'
import AuthUser from '../services/AuthUser'
import { AuthContext } from '../../App';
import { ToastContainer } from 'react-toastify';


function Login() {

    const {http,setToken,toasts} = AuthUser();
    const { dispatch } = useContext(AuthContext)
    const [nik,setNik] = useState();
    const [password,setPassword] = useState();

    

    async function postLogin(e){
        
     e.preventDefault()

     http.post('api/login',{
        nik:nik,
        password:password
    }
    ).then((res)=>{
        if(res.data.data.isAuthenticated=="true")
        {
            dispatch({
                type: "LOGIN",
                payload: res.data.data
            })

            setToken(res.data.data.nik,res.data.data.token);

        }else{
            toasts("error", "User atau Password anda Salah !");
            
        }
     })

      
 
    }


    return (
        <div className="hold-transition login-page">
            <ToastContainer theme={"colored"} />
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a className="h1"><b>Koperasi</b> SBI</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Silahkan Login</p>
                        <form onSubmit={postLogin}>
                            <div className="input-group mb-3">
                                <input type="text" onChange={e=>setNik(e.target.value)} className="form-control" placeholder="NIK" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
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
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                       
                
                    </div>
                </div>
            </div></div>

    )
}

export default Login