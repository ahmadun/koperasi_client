import React, { useState, useRef, useContext } from "react";
import NumberFormat from "react-number-format";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../App";
import AuthUser from "../services/AuthUser";
import DatePicker from "react-datepicker";
import ProgressLoad from "../template/Progress";

function RegistrasiMember() {
    const { http, toasts } = AuthUser();
    const [data, setData] = useState([]);
    const [niktxt, setNiktxt] = useState("");
    const [nikadd, setNikadd] = useState("");
    const [nameadd, setNameadd] = useState("");
    const [name, setName] = useState("");
    const inputRef = React.createRef();
    const [sts, seSts] = useState(false);
    const { state } = useContext(AuthContext);
    const [newData, setNewData] = useState({
        nik: "",
        name: "",
        created_by: ""
    });

    const [load, setLoad] = useState();


    function clearScreen() {


        setNikadd("")
        setNameadd("")

        setNewData({
            nik: "",
            name: 0,
        })

        seSts(false);


    }

    const displayData = (nik) => {
        seSts(true);
        const datanow = data.filter((newData) => newData.nik === nik);
        datanow.map((item, i) => {
           setNewData(item)
        });
    };

    const handleChange = (e) => {
        const newInput = (data) => ({ ...data, [e.target.name]: e.target.value});
        setNewData(newInput);
    };




    const ChecNik = (e) => {
        e.preventDefault();
        http
            .get("/api/checkmember", {
                params: {
                    nik: nikadd,
                },
            })
            .then((res) => {
                setNameadd(res.data[0].name);
                inputRef.current.focus();
            })
            .catch((error) => console.error(`Error:${error}`));
    };

    async function savedata(){

        await http
        .post("/api/member", newData)
        .then((res) => {
            setLoad(false)
            if (res.data.data == true) {
                toasts("succes", "Data Berhasil Tersimpan !");
                clearScreen();
                seSts(false);
                getData();
            } else {

                if (res.data.data == 2627) {
                    toasts("error", "Data sudah ada!");
                } else {
                    toasts("error", "Data Gagal Tersimpan !");
                }
            }
        })
        .catch((error) => console.error(`Error:${error}`));

    }

    async function updatedate(){

        await http
        .put("/api/member", newData)
        .then((res) => {
            setLoad(false)
            if (res.data.data == true) {
                toasts("succes", "Data Berhasil Tersimpan !");
                clearScreen();
                seSts(false);
                getData();
            } else {

                if (res.data.data == 2627) {
                    toasts("error", "Data sudah ada!");
                } else {
                    toasts("error", "Data Gagal Tersimpan !");
                }
            }
        })
        .catch((error) => console.error(`Error:${error}`));

    }

    const addNew = async (e) => {
        e.preventDefault();
        setLoad(true)
        newData.created_by = state.nik

        if (sts) {
            updatedate();
         
        } else {
            savedata();
        }
       
    };

  
    function getData() {
        http
            .get("/api/member", {
                params: {
                    nik: niktxt,
                },
            })
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((error) => console.error(`Error:${error}`));
    }

    const getAllsalary = (e) => {
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
                                    <h3 className="card-title">Anggota Koperasi</h3>
                                </div>
                                <div>
                                    <div className="card-body">
                                        <div className="row" style={{ marginBottom: "15px" }}>
                                            <div className="col-6">
                                                <div>
                                                    
                                                    
                                                    
                                                    <form onSubmit={getAllsalary}>
                                                        <div className="form-group row">
                                                            <label className="col-2 col-form-label">
                                                                NIK
                                                            </label>
                                                            <div className="col-3">
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setNiktxt(e.target.value)}
                                                                    className="form-control"
                                                                />
                                                            </div>

                                                            <div className="col-3">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary"
                                                                >
                                                                    Show
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    type="button"
                                                    style={{ marginRight: "10px" }}
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    className="btn btn-info" onClick={clearScreen}
                                                    data-toggle="modal"
                                                    data-target="#modal-tambah"
                                                >
                                                    Tambah
                                                </button>

                                              
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title"></h3>
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
                                                                    <th>Tanggal Dibuat</th>
                                                                    <th>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item.nik}</td>
                                                                        <td>{item.name}</td>
                                                                        
                                                                        <td>{item.created_at}</td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => displayData(item.nik)}
                                                                                data-toggle="modal"
                                                                                data-target="#modal-tambah"
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

            <div className="modal fade" id="modal-tambah">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Data User</h4>
                        </div>
                        <div className="modal-body">
    
                            <form onSubmit={addNew} autoComplete="off">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                    <div className="form-group">
                                            <label>NIK</label>
                                            <input name="nik"
                                            type="text"
                                            value={newData.nik}
                                            onChange={handleChange}
                                            className="form-control" />
                                        </div>


                                        <div className="form-group">
                                            <label>NAMA</label>
                                            <input name="name"
                                            type="text"
                                            value={newData.name}
                                            onChange={handleChange}
                                            className="form-control" />
                                        </div>
                                       
                                    </div>
                                    <div className="modal-footer justify-content-between">
                            
                                        {load ? (
                                            <ProgressLoad text="Simpan" />

                                        ) : (
                                            <button type="submit" className="btn btn-info">
                                                Simpan
                                            </button>
                                        )}


                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrasiMember;
