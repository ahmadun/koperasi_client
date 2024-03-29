import React, { useState, useRef, useContext, useEffect } from "react";
import NumberFormat from "react-number-format";
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx";
import { AuthContext } from "../../App";
import AuthUser from "../services/AuthUser";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ExportToExcel } from "../services/ExportToExcel";
import ProgressLoad from "../template/Progress";

function SavingsMaintenance() {
    const fileName = "pinjaman-template";
    const { http, toasts } = AuthUser();
    const [excelData, setExcelData] = useState(null);
    const [data, setData] = useState([]);
    const [niktxt, setNiktxt] = useState("");
    const [nikadd, setNikadd] = useState("");
    const [nameadd, setNameadd] = useState("");
    const [adjust, setAdjust] = useState(false);
    const inputRef = React.createRef();
    const nikRef = useRef(null);
    const [sts, seSts] = useState(false);
    const [period, setPeriod] = useState(new Date());
    const [periodadd, setPeriodadd] = useState(new Date());
    const [dateadd, setDateadd] = useState(new Date());
    const { state } = useContext(AuthContext);
    const [ names,setNames]=useState("")
    const [newData, setNewData] = useState({
        nik: "",
        name: "",
        date_save: period,
        period: dateadd,
        save_main: "",
        save_mand: "",
        save_volu: "",
        created_by: ""
    });

    const [load, setLoad] = useState();
    const exceltemp = [
        { 'nik': '', 'period': '', 'date_save': '', 'save_mand': '', 'save_main': '', 'save_volu': '' },
    ];


    useEffect(() => {

        setNewData({
            nik: niktxt,
            date_save: period,
            period: dateadd,
            save_main: 0,
            save_mand: 0,
            save_volu: 0,
            created_by: state.nik
        })


    }, [adjust]);

    const clearForm = () => {

        setNewData({
            nik: "",
            date_save: period,
            period: dateadd,
            save_main: 0,
            save_mand: 0,
            save_volu: "",
            created_by: state.nik
        })
        setNameadd("")
        setNikadd("")

    };

    const displayData = (nik) => {
        seSts(true);
        const datanow = data.filter((newData) => newData.nik === nik);
        datanow.map((item, i) => { 
            setNewData(item)
            setNames(item.name)

        });
    };

    const handleChange = (e) => {
        const newInput = (data) => ({ ...data, [e.target.name]: e.target.value });
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

    const addNew = async (e) => {
        e.preventDefault();

        setLoad(true)
        if (adjust == false) {
            newData.save_volu = 0 - parseInt(newData.save_volu.replaceAll(',', ''))
        } else {
            newData.save_volu = parseInt(newData.save_volu.replaceAll(',', ''))
        }

        newData.nik = nikadd
        newData.date_save = moment.utc(dateadd).format("yyyy-MM-DD")
        newData.period = moment.utc(periodadd).format("yyyyMM")
        newData.created_by = state.nik
        await http
            .post("/api/savingmain", newData)
            .then((res) => {
                setLoad(false)
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                    clearForm();
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
    };


    const editData = async (e) => {
        e.preventDefault();

       

        setLoad(true)

        newData.save_volu=newData.save_volu===null || newData.save_volu===""?newData.save_volu="0":newData.save_volu;
        newData.save_main=newData.save_main===null || newData.save_main===""?newData.save_main="0":newData.save_main;
        newData.save_mand=newData.save_mand===null || newData.save_mand===""?newData.save_mand="0":newData.save_mand;


        newData.save_volu =Number.isInteger(newData.save_volu)===false? newData.save_volu.replaceAll(',', ''):newData.save_volu;
        newData.save_main =Number.isInteger(newData.save_main)===false? newData.save_main.replaceAll(',', ''):newData.save_main;
        newData.save_mand =Number.isInteger(newData.save_mand)===false? newData.save_mand.replaceAll(',', ''):newData.save_mand;
       

        newData.date_save = moment.utc(dateadd).format("yyyy-MM-DD")
        newData.period = moment.utc(periodadd).format("yyyyMM")
        newData.created_by = state.nik

        console.log(newData)
        await http
            .put("/api/savingmain", newData)
            .then((res) => {
                setLoad(false)
                if (res.data.data == true) {
                    toasts("succes", "Data Diupdate Tersimpan !");
                    clearForm();
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
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wobok = XLSX.read(data);
        const worksheetName = wobok.Sheets[wobok.SheetNames[0]];
        const dataex = XLSX.utils.sheet_to_json(worksheetName);
        setExcelData(dataex);
    };

    const handleKalkulasi = async (e) => {
        e.preventDefault();
        setLoad(true)
        const periods = moment.utc(period).format("yyyyMM")
        await http
            .post("/api/createsaving", { month: periods, created_by: state.nik })
            .then((res) => {
                setLoad(false)
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                }

            })
            .catch((error) => console.error(`Error:${error}`));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        await http
            .post("/api/savemainupload", excelData)
            .then((res) => {
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                }

            })
            .catch((error) => console.error(`Error:${error}`));
    };

    function getData() {
        const periods = moment.utc(period).format("yyyyMM")

        http
            .get("/api/savingmain", {
                params: {
                    nik: niktxt,
                    period: periods,
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => console.error(`Error:${error}`));
    }

    const showtData = (e) => {
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
                            <h1>Simpanan</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Simpanan</li>
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
                                    <h3 className="card-title">Simpanan Karyawan</h3>
                                </div>
                                <div>
                                    <div className="card-body">
                                        <div className="row" style={{ marginBottom: "15px" }}>
                                            <div className="col-6">
                                                <div>

                                                    <div className="form-group row">
                                                        <label
                                                            className="col-sm-2 col-form-label">
                                                            NIK
                                                        </label>
                                                        <div className="col-3">
                                                            <input
                                                                type="text"
                                                                className="form-control" onChange={(e) => setNiktxt(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>

                                                        <div className="form-group row">
                                                            <label
                                                                htmlFor="inputEmail3"
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Period
                                                            </label>
                                                            <div className="col-3">
                                                                <DatePicker className="form-control" showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker dateFormat="MM/yyyy" selected={period} onChange={(date) => setPeriod(date)} name="date" />
                                                            </div>

                                                            <div className="col-6">
                                                                <button
                                                                    type="button" onClick={showtData}
                                                                    className="btn btn-primary">
                                                                    Show
                                                                </button>

                                                                {load ? (

                                                                    <ProgressLoad text="Kalkulasi" />
                                                                ) : (
                                                                    <button style={{ marginLeft: "10px", width: 200 }}
                                                                        type="button" onClick={handleKalkulasi}
                                                                        className="btn btn-info">
                                                                        Kalkulasi
                                                                    </button>
                                                                )}


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 text-right">
                                                <label style={{ marginRight: "10px" }}>Penyesuaian : </label>
                                                <button
                                                    type="button"
                                                    style={{ marginRight: "10px" }}
                                                    data-backdrop="static"
                                                    data-keyboard="false" onClick={clearForm}
                                                    className="btn btn-info"
                                                    data-toggle="modal"
                                                    data-target="#modal-tambah"
                                                >
                                                    Tambah
                                                </button>

                                                <button
                                                    type="button"
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    className="btn btn-primary"
                                                    data-toggle="modal"
                                                    data-target="#modal-default">
                                                    Upload
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
                                                                    <th>Tanggal Simpan</th>
                                                                    <th>Simpanan Pokok</th>
                                                                    <th>Simpanan Wajib</th>
                                                                    <th>Simpanan Sukarela</th>
                                                                    <th>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item.nik}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.date_save}</td>
                                                                        <td>
                                                                            <NumberFormat
                                                                                value={item.save_main}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <NumberFormat
                                                                                value={item.save_mand}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <NumberFormat
                                                                                value={item.save_volu}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => displayData(item.nik)}
                                                                                data-toggle="modal"
                                                                                data-target="#modal-edit"
                                                                                className="btn-sm btn-primary">
                                                                                <span className="fa fa-edit"></span>
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

            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Upload Data Penyesuaian</h4>
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
                            <form>
                                <input onChange={(e) => handleFile(e)} required type="file" />

                            </form>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal">
                                Close
                            </button>
                            <ExportToExcel apiData={exceltemp} fileName={fileName} />
                            <button type="button" className="btn btn-primary" onClick={handleUpload}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modal-tambah">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Penyesuaian Tabungan</h4>
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
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>NIK</label>
                                    <form
                                        className="input-group input-group-md"
                                        onSubmit={ChecNik}>
                                        <input
                                            ref={nikRef}
                                            type="text"
                                            value={nikadd}
                                            onChange={(e) => setNikadd(e.target.value)}
                                            className="form-control" />
                                        <span className="input-group-append">
                                            <button
                                                type="submit"
                                                className="btn btn-info btn-flat">
                                                Check
                                            </button>
                                        </span>
                                    </form>
                                </div>

                                <div className="col-sm-8">
                                    <label>NAME</label>
                                    <input
                                        type="text"
                                        value={nameadd}
                                        onChange={(e) => setNameadd(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <br />
                            <form onSubmit={addNew} autoComplete="off">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">


                                        <div className="form-group">
                                            <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                <input type="checkbox" checked={adjust} onChange={e => setAdjust(e.target.checked)} className="custom-control-input" id="customSwitch3" />
                                                <label className="custom-control-label" htmlFor="customSwitch3">{adjust ? ("Penyimpanan") : "Penarikan"}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="nohp">Jumlah {adjust ? ("Penyimpanan") : "Penarikan"}</label>
                                            <NumberFormat thousandSeparator={true} name="save_volu" value={newData.save_volu} onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="password">Tanggal {adjust ? ("Penyimpanan") : "Penarikan"}</label>
                                            <DatePicker className="form-control" isClearable selected={dateadd} onChange={(date) => setDateadd(date)} name="date" />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="password">Periode</label>
                                            <DatePicker className="form-control" showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker isClearable dateFormat="MM/yyyy" selected={periodadd} onChange={(date) => setPeriodadd(date)} name="date" />
                                        </div>
                                    </div>

                                </div>
                            </form>

                        </div>
                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                            >
                                Close
                            </button>

                            {load ? (
                                <ProgressLoad text="Simpan" />

                            ) : (
                                <button type="button" onClick={addNew} className="btn btn-primary">
                                    Simpan
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modal-edit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Data User</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>NIK</label>

                                    <form
                                        className="input-group input-group-md"
                                        onSubmit={ChecNik}>
                                        <input
                                            type="text" readOnly={sts} name="nik" onChange={handleChange}
                                            value={newData.nik} 
                                            className="form-control" />
                                        <span className="input-group-append">
                                            <button type="submit" className="btn btn-info btn-flat">
                                                Check
                                            </button>
                                        </span>
                                    </form>
                                </div>

                                <div className="col-sm-8">
                                    <label>NAME</label>
                                    <input
                                        type="text" name="name"
                                        value={names} onChange={(e)=>setNames(e.target.value)} readOnly={sts}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <br />
                            <form onSubmit={editData} autoComplete="off">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Simpanan Pokok</label>
                                            <NumberFormat
                                                thousandSeparator={true}
                                                value={newData.save_main}
                                                getInputRef={inputRef}
                                                name="save_main"
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Simpanan Wajib</label>
                                            <NumberFormat
                                                thousandSeparator={true}
                                                value={newData.save_mand}
                                                onChange={handleChange}
                                                name="save_mand"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Simpanan Sukarela</label>
                                            <NumberFormat
                                                thousandSeparator={true}
                                                value={newData.save_volu}
                                                name="save_volu"
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

export default SavingsMaintenance;
