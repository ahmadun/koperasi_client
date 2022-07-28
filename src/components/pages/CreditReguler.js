import React, { useState, useRef, useContext, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import DatePicker from "react-datepicker";
import moment from 'moment';
import NumberFormat from "react-number-format";
import AuthUser from "../services/AuthUser";

const CreditReguler = () => {

    const { http, toasts } = AuthUser();
    const [data, setData] = useState([]);
    const [start, setStart] = useState(new Date());
    const [newData, setNewData] = useState({
        nik: "",
        credit_main: "",
        credit_interest: "",
        credit_total: "",
        tenor: 0,
        remarks: "",
        created_by: ""
    });

    const options = [
        { value: '0', text: 'Pilih Remarks' },
        { value: '1', text: 'Angsuran' },
        { value: '2', text: 'Cicilan' }
    ];


    const [selected, setSelected] = useState(options[0].value);
    const [desc, setDesc] = useState("");



    useEffect(() => {

        setData([])

        for (let index = 1; index <= newData.tenor; index++) {
            var daterange = moment(start, "DD-MM-YYYY").add(index - 1, 'month')

            let x = {
                'nik': newData.nik,
                'month': moment.utc(daterange).format("yyyyMM"),
                "mand": newData.credit_main,
                'interest': newData.credit_interest,
                'total': newData.credit_total,
                'tenor': newData.tenor,
                'remarks': selected != '0' ? desc + " " + index : '',
            }

            setData(data => [...data, x]);
        }



    }, [newData, desc, start]);




    const handleChange = (e) => {
        const newInput = (newData) => ({ ...newData, [e.target.name]: e.target.value });
        setNewData(newInput);
    };

    const handleProcess = async (e) => {
        e.preventDefault()

        e.preventDefault();
        await http
            .post("/api/processcredit", data)
            .then((res) => {
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                }

            })
            .catch((error) => console.error(`Error:${error}`));


    };



    const ChangeOption = (e) => {
        setSelected(e.target.value);
        var index = e.nativeEvent.target.selectedIndex;

        setDesc(e.nativeEvent.target[index].text)


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

                                                    <div className="col-6">

                                                        <div className="card-body">



                                                            <form className="form-horizontal" onSubmit={handleProcess}>
                                                                <div className="card-body">

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Anggota</label>
                                                                       
                                                                        <div className="col-sm-4">
                                                                            <div className="custom-control custom-radio">
                                                                                <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio"/>
                                                                                <label htmlFor="customRadio1" className="custom-control-label">Reguler</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <div className="custom-control custom-radio">
                                                                                <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio"/>
                                                                                <label htmlFor="customRadio2" className="custom-control-label">Konsumptif</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Anggota</label>
                                                                        <div className="col-sm-8">
                                                                            <input type="text" name="nik" value={newData.nik} onChange={handleChange} className="form-control" />

                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Jumlah Pinjaman</label>
                                                                        <div className="col-sm-8">
                                                                            <NumberFormat className="form-control" autoComplete="off" name="credit_main" onChange={handleChange}
                                                                                value={newData.credit_main}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Jangka Waktu</label>
                                                                        <div className="col-sm-2">
                                                                            <NumberFormat className="form-control" autoComplete="off" name="tenor"
                                                                                value={newData.tenor} onChange={handleChange}
                                                                            />
                                                                        </div>

                                                                        <div className="col-sm-2 col-form-label">
                                                                            <label>Efectif From</label>
                                                                        </div>

                                                                        <div className="col-sm-4">
                                                                            <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={start} onChange={(date) => setStart(date)} name="date" />
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Bunga Perbulan</label>
                                                                        <div className="col-sm-8">

                                                                            <NumberFormat className="form-control" autoComplete="off" name="credit_interest" onChange={handleChange}
                                                                                value={newData.credit_interest}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Angsuran Perbulan</label>
                                                                        <div className="col-sm-8">
                                                                            <NumberFormat className="form-control" autoComplete="off" name="credit_total" onChange={handleChange}
                                                                                value={newData.credit_total}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <div className="col-sm-12 text-right">
                                                                            <button className="btn btn-info">Simpan Pinjaman</button>
                                                                        </div>


                                                                    </div>



                                                                </div>

                                                            </form>




                                                        </div>

                                                    </div>

                                                    <div className="col-6">

                                                        <div className="card-body">
                                                            <div className="row">

                                                                <div className="col-12">


                                                                    <div className="card">
                                                                        <div className="card-header">
                                                                            <h3 className="card-title"></h3>
                                                                            <div className="card-tools">


                                                                            </div>
                                                                        </div>

                                                                        <div className="card-body table-responsive p-0">
                                                                            <table className="table table-hover text-nowrap">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Bulan</th>
                                                                                        <th>Cicilan Pokok</th>
                                                                                        <th>Cicilan Bunga</th>
                                                                                        <th>Cicilan Total</th>
                                                                                        <th>
                                                                                            <label>Remarks :</label>
                                                                                            <select className="form-control" required="required" value={selected} onChange={ChangeOption}>
                                                                                                {options.map(option => (
                                                                                                    <option key={option.value} value={option.value}>
                                                                                                        {option.text}
                                                                                                    </option>
                                                                                                ))}
                                                                                            </select>

                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {data.map((item, i) => (
                                                                                        <tr key={i}>
                                                                                            <td>{item.month}</td>
                                                                                            <td>{item.mand}</td>
                                                                                            <td>{item.interest}</td>
                                                                                            <td>{item.total}</td>
                                                                                            <td>{item.remarks}</td>
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
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <div className="card-body">

                                                    <div className="row" style={{ marginBottom: "15px" }}>
                                                        <div className="col-6">


                                                            <div>
                                                                <form>
                                                                    <div className="form-group row">
                                                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">NIK</label>
                                                                        <div className="col-3">
                                                                            <input type="text" className="form-control" />
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




                                            </div>
                                            <div className="tab-pane fade" id="user-pwd" role="tabpanel" aria-labelledby="home-tab">



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

    )
}

export default CreditReguler