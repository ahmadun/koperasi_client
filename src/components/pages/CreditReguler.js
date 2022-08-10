import React, { useState, useRef, useContext, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import DatePicker from "react-datepicker";
import moment from 'moment';
import NumberFormat from "react-number-format";
import AuthUser from "../services/AuthUser";
import Loading from "../template/Loading";
import ProgressLoad from "../template/Progress";
import { NavLink } from 'react-router-dom'

const CreditReguler = () => {

    const { http, toasts } = AuthUser();
    const [data, setData] = useState([]);
    const [datalist, setDatalist] = useState([]);
    const [totals, setTotals] = useState([]);
    const [konsum, setKonsum] = useState([]);
    const [start, setStart] = useState(new Date());
    const [sts, seSts] = useState(false);
    const [checkaktif, setCheckaktif] = useState(true);
    const [newData, setNewData] = useState({
        nik: "",
        code: "",
        credit_main: "",
        credit_interest: "",
        credit_total: "",
        tenor: 0,
        remarks: "",
        created_by: ""
    });

    const [editData, setEditData] = useState({
        nik: "",
        code: "",
        month: "",
        credit: "",
        credit_main: "",
        credit_interest: "",
        credit_total: "",
        tenor: 0,
        remarks: "",
        created_by: ""
    });

    const [lockons, setLockons] = useState(false);
    const [creedittype, setCreedittype] = useState("");
    const [nik, setNik] = useState("");
    const [name, setName] = useState("");
    const [load, setLoad] = useState();

    const options = [
        { value: '0', text: 'Pilih Remarks' },
        { value: '1', text: 'Angsuran' },
        { value: '2', text: 'Cicilan' }
    ];

    const opt_type = [
        { value: 'REG', text: 'Reguler' },
        { value: 'KON', text: 'Konsumptif' },
        { value: 'PRT', text: 'PRT' }
    ];


    const [selected, setSelected] = useState(options[0].value);
    const [desc, setDesc] = useState("");
    const [seltype, setSeltype] = useState("REG");


    function handleRadio(e) {
        setLockons(e.target.id == 'kon' ? false : true)
        setCreedittype(e.target.id)


    }

    const checkName=(nik)=>{
        if(name==="" && newData.nik!=""){
            http
            .get("/api/checkmember", {
                params: {
                    nik: nik,
                },
            })
            .then((res) => {
                if(res.data.length>0){
                    setName(res.data[0].name);
                    
                }else{
                    setName("");
                }
                
            })
            .catch((error) => { setName(""); console.error(`Error:${error}`)});


        }else{
            setName("")
        }
      
    }

    useEffect(() => {

        setData([])

        for (let index = 1; index <= newData.tenor; index++) {
            var daterange = moment(start, "DD-MM-YYYY").add(index - 1, 'month')

            let x = {
                'nik': newData.nik,
                'code': newData.code,
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

    useEffect(() => {
        http.get(`/api/creditsmst`).then((res) => {
            setKonsum(res.data);
        }).catch(error => console.error(`Error:${error}`));


    }, []);


    const handleShow = () => {

        showData(nik,seltype)
       

    }


    function showData(nik,seltype){

        setLoad(true);
        let status=0
        if(checkaktif){
            status=0
        }else{
            status=1
        }
        http.get(`api/detail_credit?nik=${nik}&code=${seltype}&sts=${status}`).then((res) => {
            setLoad(false);
            setDatalist(res.data.data);
            setTotals(res.data.total);
        }).catch(error => console.error(`Error:${error}`));

    }

    const handleChange = (e) => {
        const newInput = (newData) => ({ ...newData, [e.target.name]: e.target.value });
        setNewData(newInput);
    };

    const handleEdit = (e) => {
        const newInput = (editData) => ({ ...editData, [e.target.name]: e.target.value.replaceAll(',', '') });
        setEditData(newInput);
    };

    const updateData = async (e) => {
        e.preventDefault()
        await http
            .put(`/api/updatecredit?code=${seltype}`, editData)
            .then((res) => {
                setLoad(false)
                if (res.data.data == true) {
                    toasts("succes", "Data Berhasil Tersimpan !");
                    showData(nik,seltype)
                    seSts(false);
                } else {
                    toasts("error", "Data Gagal Tersimpan !");
                }
            })
            .catch((error) => console.error(`Error:${error}`));

    };

    const handleProcess = async (e) => {
        e.preventDefault();
        if(name==="")
            return
        setLoad(true);
        await http
            .post(`/api/processcredit`, data, {

                params: {
                    code: creedittype,
                },
            })
            .then((res) => {
                if (res.data.data == true) {
                    setLoad(false);
                    toasts("succes", "Data Berhasil Tersimpan !");
                }else{
                    setLoad(false);
                    toasts("error", res.data.message);
                }
            })
            .catch((error) => console.error(`Error:${error}`));
    };

    const displayData = (month) => {
        seSts(true);
        const datanow = datalist.filter((datalist) => datalist.month === month);
        datanow.map((item, i) => {
            console.log(item)
            setEditData(item)
        });
    };

    const ChangeOption = (e) => {
        setSelected(e.target.value);
        var index = e.nativeEvent.target.selectedIndex;
        setDesc(e.nativeEvent.target[index].text)
    };

    const ChangeSel = (e) => {
        setSeltype(e.target.value)
        setDatalist([])
        setTotals([])
    };

    const CompTabelReguler = () => {
        return <table className="table table-head-fixed text-nowrap">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Cicilan Pokok</th>
                    <th>Cicilan Bunga</th>
                    <th>Cicilan Total</th>
                    <th>Remarks</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={5} align={'center'}><Loading /></td>
                    </tr> :
                    datalist.map((item, i) => (
                        <tr key={i}>
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.remarks}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => displayData(item.month)}
                                    data-toggle="modal"
                                    data-target="#modal-edit"
                                    className="btn-sm btn-primary"
                                >
                                    <span className="fa fa-edit"></span>
                                </button>

                            </td>
                        </tr>
                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    }
    const CompTabeKonsumtif = () => {
        return <table className="table table-head-fixed text-nowrap">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Cicilan</th>
                    <th>Bunga</th>
                    <th>Kredit</th>
                    <th>Jenis Kredit</th>
                    <th>Remark</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={6} align={'center'}><Loading /></td>
                    </tr> :
                    datalist.map((item, i) => (
                        <tr key={i}>
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.desc}</td>
                            <td>{item.remarks}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => displayData(item.month)}
                                    data-toggle="modal"
                                    data-target="#modal-edit"
                                    className="btn-sm btn-primary"
                                >
                                    <span className="fa fa-edit"></span>
                                </button>

                            </td>
                        </tr>

                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))}

            </tbody>
        </table>

    }


    const CompTabePrt = () => {
        return <table className="table table-head-fixed text-nowrap">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Kredit</th>
                    <th>Remarks</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={6} align={'center'}><Loading /></td>
                    </tr> :
                    datalist.map((item, i) => (
                        <tr key={i}>
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.remarks} </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => displayData(item.month)}
                                    data-toggle="modal"
                                    data-target="#modal-edit"
                                    className="btn-sm btn-primary"
                                >
                                    <span className="fa fa-edit"></span>
                                </button>

                            </td>

                        </tr>

                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))}

            </tbody>
        </table>

    }


    return (
        <div className="content-wrapper">
            <ToastContainer theme={"colored"} />
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Pinjaman</h1>
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
                                        Data Pinjaman
                                    </h3>
                                </div>


                                <div className="row">

                                    <div className="col-12">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Input Pinjaman</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Data Pinjaman</button>
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
                                                                        <label className="col-sm-4 col-form-label">Jenis Pinjaman</label>

                                                                        <div className="col-sm-3">
                                                                            <div className="custom-control custom-radio">
                                                                                <input className="custom-control-input" type="radio" id="reg" onChange={handleRadio} name="customRadio" />
                                                                                <label htmlFor="reg" className="custom-control-label">Reguler</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <div className="custom-control custom-radio">
                                                                                <input className="custom-control-input" type="radio" id="kon" onChange={handleRadio} name="customRadio" />
                                                                                <label htmlFor="kon" className="custom-control-label">Konsumptif</label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-sm-2">
                                                                            <div className="custom-control custom-radio">
                                                                                <input className="custom-control-input" type="radio" id="prt" onChange={handleRadio} name="customRadio" />
                                                                                <label htmlFor="prt" className="custom-control-label">PRT</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Jenis Konsumptif</label>

                                                                        <div className="col-sm-8">
                                                                       

                                                                            <select disabled={lockons} className="form-control" value={newData.code} name="code" onChange={handleChange} required="required">
                                                                                {konsum.map((item, i) => (
                                                                                    <option key={item.id} value={item.id}>{item.desc}</option>
                                                                                ))}
                                                                            </select>


                                                                        </div>

                                                                    </div>


                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Anggota</label>
                                                                        <div className="col-sm-3">
                                                                            <input type="text" autoComplete="off" onBlur={(e)=>checkName(e.target.value)} name="nik" value={newData.nik} onChange={handleChange} className="form-control" />
                                                                        </div>
                                                                        <div className="col-sm-5">
                                                                            <input type="text" readOnly  name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Jumlah Pinjaman</label>
                                                                        <div className="col-sm-8">
                                                                            <NumberFormat required className="form-control" autoComplete="off" name="credit_main" onChange={handleChange}
                                                                                value={newData.credit_main}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Jangka Waktu</label>
                                                                        <div className="col-sm-2">
                                                                            <NumberFormat required className="form-control" autoComplete="off" name="tenor"
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

                                                                            <NumberFormat required className="form-control" autoComplete="off" name="credit_interest" onChange={handleChange}
                                                                                value={newData.credit_interest}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <label className="col-sm-4 col-form-label">Angsuran Perbulan</label>
                                                                        <div className="col-sm-8">
                                                                            <NumberFormat required className="form-control" autoComplete="off" name="credit_total" onChange={handleChange}
                                                                                value={newData.credit_total}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp"}
                                                                            />
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <div className="col-sm-12 text-right">

                                                                            {load ? (
                                                                                <ProgressLoad text="Simpan Pinjaman" />

                                                                            ) : (
                                                                                <button type="submit" className="btn btn-info">
                                                                                    Simpan Pinjaman</button>
                                                                            )}


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

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">NIK</label>
                                                                    <div className="col-3">
                                                                        <input type="text" value={nik} onChange={(e) => setNik(e.target.value)} className="form-control" />
                                                                    </div>

                                                                </div>

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Jenis Pinjaman</label>
                                                                    <div className="col-3">

                                                                        <select className="form-control" required="required" onChange={ChangeSel}>
                                                                            {opt_type.map(option => (
                                                                                <option key={option.value} value={option.value}>{option.text}</option>
                                                                            ))}

                                                                        </select>

                                                                    </div>

                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} value={checkaktif} onChange={()=>setCheckaktif(!checkaktif)}/> Aktif
                                                                        </label>
                                                                    </div>


                                                                </div>

                                                                <div className="form-group row text-right">


                                                                    <div className="col-6">
                                                                        <button onClick={handleShow} className="btn btn-primary">Show</button>
                                                                    </div>

                                                                </div>
                                                            </div>




                                                        </div>
                                                        <div className="col-6 text-right">

                                                            <NavLink to="/managecredit">
                                                                <button
                                                                    className="btn btn-info"
                                                                >
                                                                    Managemen Pinjaman
                                                                </button>

                                                            </NavLink>

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

                                                        <div className="card-body table-responsive p-0" style={{ height: 500 }}>
                                                            {
                                                                seltype === 'REG' ? (
                                                                    <CompTabelReguler />
                                                                ) : (
                                                                    seltype === 'KON' ? (
                                                                        <CompTabeKonsumtif />
                                                                    ) : (
                                                                        <CompTabePrt />
                                                                    )
                                                                )

                                                            }
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
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Perubahan Data</h4>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>NIK</label>
                                        <div
                                            className="input-group input-group-md">
                                            <input
                                                type="text" readOnly
                                                value={editData.nik}
                                                className="form-control" />

                                        </div>
                                    </div>

                                </div>
                                <br />
                                <div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label>Bulan</label>
                                                <input type="text" readOnly value={editData.month}
                                                    className="form-control" />
                                            </div>

                                            {seltype == 'PRT' ? (
                                                <div className="form-group">
                                                    <label>Cicilan</label>
                                                    <NumberFormat
                                                        thousandSeparator={true}
                                                        value={editData.credit}
                                                        onChange={handleEdit}
                                                        name="credit"
                                                        className="form-control"
                                                    />
                                                </div>

                                            ) : (

                                                <div>

                                                    <div className="form-group">
                                                        <label>Cicilan Pokok</label>
                                                        <NumberFormat
                                                            thousandSeparator={true}
                                                            value={editData.credit_main}
                                                            onChange={handleEdit}
                                                            name="credit_main"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Cicilan Bunga</label>
                                                        <NumberFormat
                                                            thousandSeparator={true}
                                                            value={editData.credit_interest}
                                                            name="credit_interest"
                                                            onChange={handleEdit}
                                                            className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Cicilan Total</label>
                                                        <NumberFormat
                                                            thousandSeparator={true}
                                                            value={editData.credit_total}
                                                            name="credit_total"
                                                            onChange={handleEdit}
                                                            className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Remarks</label>
                                                        <input type="text" value={editData.remarks} onChange={handleEdit} name="remarks"
                                                            className="form-control" />
                                                    </div>


                                                </div>



                                            )}




                                        </div>
                                        <div className="modal-footer justify-content-between">

                                            {load ? (
                                                <ProgressLoad text="Simpan" />

                                            ) : (
                                                <button onClick={updateData} className="btn btn-info">
                                                    Simpan
                                                </button>
                                            )}
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