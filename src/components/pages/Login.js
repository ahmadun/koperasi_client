import axios from 'axios'
import React, { useEffect } from 'react'


const http=axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials:true,
});


async function postLogin(){
    const csrf=await http.get('/sanctum/csrf-cookie');
    console.log('csrf=',csrf);
    const login=await http.post('/api/auth/login',{
        email:'ahmadunis@gmail.com',
        password:'ahmadunis'
    });

    console.log('login=',login);
}

const Login = () => {

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                {/* /.login-logo */}
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                              
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="button" onClick={postLogin} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                       
                        {/* /.social-auth-links */}
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new membership</a>
                        </p>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div></div>

    )
}

export default Login