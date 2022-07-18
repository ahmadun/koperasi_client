import React, { useState,useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from 'react-number-format';
import AuthUser from '../services/AuthUser';
import { AuthContext } from '../../App';

function BelanjaKontan() {
    const [oneDate, setOneDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const { http, toasts } = AuthUser();
    const { state } = useContext(AuthContext);

   async function save(e) {
        e.preventDefault();
        if(amount===""){
            toasts("error", "Silahkan Input Jumlah Belanja anda!");
            return
        }
        await http
            .post("api/saveblgkontan", {
                nik:state.nik,
                jumlah: amount.replace(',',''),
                tgl: oneDate,

            })
            .then((res) => {
                if (res.data.status == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                    setAmount(0);

                } else {
                    if(res.data.data==2627){
                        toasts("error", "Anda telah Input Belanja pada tanggal tersebut!");
                    }else{
                        toasts("error", "Data Gagal Tersimpan !");
                    }
                    
                }
            })
            .catch((error) => console.error(`Error:${error}`));
    }

    return (

        <div className="content-wrapper">
            <ToastContainer theme={"colored"} />
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Belanja</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Belanja</li>
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
                                        Belanja Kontan
                                    </h3>
                                </div>
                                <div>
                                    <form onSubmit={save}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <label>Tanggal Belanja</label>
                                                    <DatePicker className="form-control"
                                                        placeholderText="Tanggal Kasbon" selected={oneDate} onChange={(date) => setOneDate(date)} name="date" />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="nohp">Jumlah Belanja</label>
                                                        <NumberFormat autoFocus thousandSeparator={true} className="form-control" value={amount} onChange={e => setAmount(e.target.value)} name="amount" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-4">
                                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                                </div>
                                            </div>

                                        </div>

                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}

export default BelanjaKontan