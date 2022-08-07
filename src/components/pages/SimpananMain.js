import React, { useRef, useState, useContext } from "react";
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Loading from "../template/Loading";
import AuthUser from "../services/AuthUser";
import { AuthContext } from '../../App';
import { ToastContainer } from "react-toastify";


function SimpananMain() {

    const { http, toasts } = AuthUser();
    const [simpananlists, setSimpananlists] = useState([]);
    const [wajib, setWajib] = useState(0);
    const [pokok, setPokok] = useState(0);
    const [suka, setSuka] = useState(0);
    const [totals, setTotals] = useState(0);
    const [load, setLoad] = useState();
    const [loadmail, setLoadmail] = useState();
    const [email, setEmail] = useState("");
    const { state } = useContext(AuthContext)

    const sendEmail = () => {

        setLoadmail(true)
        http.post(`api/sendsaving/${state.nik}`, {
            email: email
        })
            .then((res) => {
                setLoadmail(false)
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Terkirim !");
                } else {
                    toasts("error", "Data Gagal Tersimpan !");
                }
            })
            .catch(error => console.error(`Error:${error}`));

    }

    const fetchSimpanan = () => {
        setLoad(true);
        http.get(`api/saving/${state.nik}`).then((res) => {
            const result = res.data;
            setSimpananlists(result.data);
            setWajib(result.total[0].save_mand)
            setPokok(result.total[0].save_main)
            setSuka(result.total[0].save_volu)
            setTotals(parseInt(wajib) + parseInt(pokok) + parseInt(suka))
            setLoad(false);

        })
            .catch(error => console.error(`Error:${error}`));
    }

    return (
        <div>
            <div className="content-wrapper">
                <ToastContainer theme={"colored"} />
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Simpanan</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Simpanan</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

                                <div className="invoice p-3 mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                {/* <i className="fas fa-globe" /> Koperasi SBI */}
                                                <small className="float-right"></small>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            Tampilkan di layar
                                            <address>
                                                <button type="button" onClick={() => fetchSimpanan()} className="btn btn-primary btn-block"><i className="fa fa-book" /> Tampilkan</button>

                                            </address>
                                        </div>
                                        <div className="col-sm-4 invoice-col">
                                            Kirim ke email
                                            <address>
                                                <div className="input-group input-group-md">
                                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                                    <span className="input-group-append">
                                                        <button type="button" onClick={() => sendEmail()} className="btn btn-info btn-flat">Kirim</button>

                                                    </span>
                                                    {loadmail ? (
                                                        <div style={{ marginTop: "2px", marginLeft: "5px" }}>
                                                            <Loading />
                                                        </div>

                                                    ) : (
                                                        <div></div>
                                                    )}


                                                </div>


                                            </address>
                                        </div>
                                        <div className="col-sm-4 invoice-col">

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="card-body table-responsive p-0" style={{ height: 500 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Tanggal Penyimpanan</th>
                                                        <th>Simpanan Wajib</th>
                                                        <th>Simpanan Sukarela</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {load ?
                                                        <tr>
                                                            <td colSpan={5} align={'center'}><Loading /></td>
                                                        </tr> :

                                                        simpananlists.map((item, i) => (
                                                            <tr key={i}>
                                                                <td>{item.date_save}</td>
                                                                <td><NumberFormat value={item.save_mand} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                                <td><NumberFormat value={item.save_volu} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                            </tr>

                                                        ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">

                                        </div>
                                        <div className="col-lg-6 col-sm-12">
                                            <p className="lead"></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody><tr>
                                                        <th style={{ width: '50%' }}>Simpanan Pokok</th>
                                                        <td><NumberFormat value={pokok} displayType={"text"} thousandSeparator={true} prefix={'Rp'} /></td>
                                                    </tr>
                                                        <tr>
                                                            <th>Total Simpanan Wajib</th>
                                                            <td><NumberFormat value={wajib} displayType={"text"} thousandSeparator={true} prefix={'Rp'} /></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total Simpanan Sukarela</th>
                                                            <td><NumberFormat value={suka} displayType={"text"} thousandSeparator={true} prefix={'Rp'} /></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total:</th>
                                                            <td><NumberFormat value={totals} displayType={"text"} thousandSeparator={true} prefix={'Rp'} /></td>
                                                        </tr>
                                                    </tbody></table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default SimpananMain