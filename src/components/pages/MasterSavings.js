import React, { useState, useRef, useContext } from "react";
import NumberFormat from "react-number-format";
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx";
import { AuthContext } from "../../App";
import AuthUser from "../services/AuthUser";
import DatePicker from "react-datepicker";
import ProgressLoad from "../template/Progress";

function MasterSavings() {
    const { http, toasts } = AuthUser();
    const [excelData, setExcelData] = useState(null);
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
        save_main: 0,
        save_mand: 0,
        save_volu: 0,
        created_by: "",
        mode: 1,
    });

    const [load, setLoad] = useState();
    const [newDatas, setNewDatas] = useState({
        nik: "",
        save_main: 0,
        save_mand: 0,
        save_volu: 0,
        created_by: "",
        mode: 1,
    });

    function clearScreen() {


        setNikadd("")
        setNameadd("")

        setNewData({
            nik: "",
            save_main: 0,
            save_mand: 0,
            save_volu: 0,
            created_by: "",
            mode: 1,
        })

        seSts(false);



    }

    const displayData = (nik) => {
        seSts(true);
        const datanow = data.filter((newData) => newData.nik === nik);
        datanow.map((item, i) => {
            setNikadd(item.nik)
            setNameadd(item.name)
            setNewData(item)
        });
    };

    const handleChange = (e) => {
        const newInput = (data) => ({ ...data, [e.target.name]: e.target.value.replaceAll(',', '') });
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
                console.log(res);
                setNameadd(res.data[0].name);
                inputRef.current.focus();
            })
            .catch((error) => console.error(`Error:${error}`));
    };

    const addNew = async (e) => {
        e.preventDefault();
        setLoad(true)
        newData.nik = nikadd
        newData.created_by = state.nik

        if (sts) {
            newData.mode = 1;
        } else {
            newData.mode = 2;
        }
        await http
            .post("/api/savingmaster", newData)
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
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wobok = XLSX.read(data);

        const worksheetName = wobok.Sheets[wobok.SheetNames[0]];
        const dataex = XLSX.utils.sheet_to_json(worksheetName);
        setExcelData(dataex);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await http
            .post("/api/uploadsavingmaster", excelData)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => console.error(`Error:${error}`));
    };

    function getData() {
        http
            .get("/api/savingmaster", {
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

                                                <button
                                                    type="button"
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    className="btn btn-primary"
                                                    data-toggle="modal"
                                                    data-target="#modal-default"
                                                >
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
                                                                    <th>Simpanan Pokok</th>
                                                                    <th>Simpanan Wajib</th>
                                                                    <th>Simpanan Sukarela</th>
                                                                    <th>Last Update</th>
                                                                    <th>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item.nik}</td>
                                                                        <td>{item.name}</td>
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
                                                                        <td>{item.updated_at}</td>
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

            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Upload Master Simpanan</h4>
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
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">
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
                                            type="text"
                                            value={nikadd}
                                            onChange={(e) => setNikadd(e.target.value)}
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

export default MasterSavings;
