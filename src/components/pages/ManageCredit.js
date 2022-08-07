import React, { useState, useEffect, useContext } from "react";
import NumberFormat from "react-number-format";
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx";
import { AuthContext } from "../../App";
import AuthUser from "../services/AuthUser";
import DatePicker from "react-datepicker";
import ProgressLoad from "../template/Progress";

function ManageCredit() {
    const { http, toasts } = AuthUser();
    const [data, setData] = useState([]);
    const [sts, seSts] = useState(false);
    const { state } = useContext(AuthContext);
    const [load, setLoad] = useState();
    const [desc, setDesc] = useState();
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const displayData = (nik, type) => {
        seSts(true);
        const datanow = data.filter((newData) => newData.nik === nik && newData.type === type);
        datanow.map((item, i) => {

            setNewData(item)
        });

    };
    const savingData = async () => {
        setLoad(true)
        await http
            .post("/api/credithistory", newData, {remarks: desc})
            .then((res) => {
                setLoad(false)
                if (res.data.data == true) {
                    getData() 
                    toasts("succes", "Data Berhasil Tersimpan !");
                }

            })
            .catch((error) => console.error(`Error:${error}`));
    };

    function getData() {
        http
            .get("/api/listcreditall")
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => console.error(`Error:${error}`));
    }

    const getAllData = (e) => {
        e.preventDefault();
        getData();
    };
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
                                <li className="breadcrumb-item active">Master Simpanan</li>
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
                                    <h3 className="card-title">Data Master Simpanan Karyawan</h3>
                                </div>
                                <div>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Daftar Kredit Aktif</h3>
                                                        <div className="card-tools">
                                                            <div
                                                                className="input-group input-group-sm"
                                                                style={{ width: 150 }}
                                                            >
                                                                <input
                                                                    type="text"
                                                                    name="table_search"
                                                                    className="form-control float-right"
                                                                    placeholder="Search"
                                                                />
                                                                <div className="input-group-append">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-default"
                                                                    >
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
                                                                    <th>Jenis Pinjaman</th>
                                                                    <th>Jumlah Pinjaman</th>
                                                                    <th>Waktu Selesai</th>
                                                                 
                                                                    <th>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item.nik}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.type}</td>
                                                                        <td>
                                                                            <NumberFormat
                                                                                value={item.total_credit}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </td>

                                                                        <td>{item.lastmonth}</td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => displayData(item.nik, item.type)}
                                                                                data-toggle="modal" data-target="#modal-edit"
                                                                                className="btn-sm btn-primary"
                                                                            >
                                                                                <span className="fa fa-edit" />
                                                                            </button>
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
                                    <div className="card-footer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </section>



            <div className="modal fade" id="modal-edit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Penyelesaian Kredit</h4>
                        </div>
                        <div className="modal-body">


                            <table className="table">

                                <tbody>
                                    <tr>
                                        <td style={{ width: '30%' }}><label>NIK</label></td>
                                        <td>:</td>
                                        <td >{newData.nik}</td>
                                    </tr>

                                    <tr>
                                        <td><label>Name</label></td>
                                        <td>:</td>
                                        <td>{newData.name}</td>
                                    </tr>

                                    <tr>
                                        <td><label>Mulai Pinjaman</label></td>
                                        <td>:</td>
                                        <td>{newData.begins}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Akhir Pinjaman</label></td>
                                        <td>:</td>
                                        <td>{newData.lastmonth}</td>
                                    </tr>

                                    <tr>
                                        <td><label>Jenis Pinjaman</label></td>
                                        <td>:</td>
                                        <td>{newData.type}</td>
                                    </tr>

                                    <tr>
                                        <td><label>Jumlah Pinjaman</label></td>
                                        <td>:</td>
                                        <td><NumberFormat
                                            value={newData.total_credit}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"Rp"}
                                        /></td>
                                    </tr>


                                </tbody>
                            </table>


                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Keterangan</label>
                                        <textarea className="form-control" value={desc} onChange={(e)=>setDesc(e.target.value)} rows={3} placeholder="Enter ..." defaultValue={""} />
                                    </div>
                                </div>

                            </div>




                        </div>
                        <div className="modal-footer">

                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <button type="button" onClick={savingData} className="btn btn-primary align-left" data-dismiss="modal">Simpan</button>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ManageCredit;
