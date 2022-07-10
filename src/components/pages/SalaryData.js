import React, { useState,useRef } from 'react'
import NumberFormat from 'react-number-format';
import { ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx'
import AuthUser from '../services/AuthUser';

function SalaryData() {
    const { http, toasts } = AuthUser();
    const [excelData, setExcelData] = useState(null);
    const [salaryData, setSalaryData] = useState([]);
    const [niktxt, setNiktxt] = useState("");
    const [name, setName] = useState("");
    const [niknew, setNiknew] = useState("");
    const [basic, setBasic] = useState("");
    const [last, setLast] = useState("");
    const [month, setMonth] = useState("");
    const basicRef = useRef(null);
    const inputRef = React.createRef();
    const [sts,seSts]=useState(false);
    const [newData,setNewData] =useState ({
        nik: 0,
        basic_salary: 0,
        last_salary: 0,
        last_month_pay: 0,
        created_by:"",
        mode:1
      });

      function clearScreen(){
        setNiknew('');
        setBasic('');
        setLast('');
        setLast('');
        setMonth('');
        setName('');
      }

    const displayData=(nik)=>{
  
        seSts(true);
        const datanow = salaryData.filter((newData) => newData.nik === nik);    
        datanow.map((item, i) => {
            setNiknew(item.nik)
            setName(item.name)
            setBasic(item.basic_salary)
            setLast(item.last_salary)
            setMonth(item.last_month_pay)
    });

    }

    const ChecNik = (e) => {
        e.preventDefault();
        http
          .get("api/checknama", {
            params: {
              nik: niknew,
            },
          })
          .then((res) => {
            setName(res.data.data); 
            inputRef.current.focus();
          
          })
          .catch((error) => console.error(`Error:${error}`));
      };

    const addNew=async(e)=>{
        e.preventDefault();
        newData.nik=niknew;
        newData.basic_salary=basic.replace(',','');
        newData.last_salary=last.replace(',','');
        newData.month=month.replace(',','');
        newData.created_by="ahmadun";
        if(sts){
            newData.mode=1;
        }else{
            newData.mode=2;
        }


        await http
            .post("api/addnew",  newData )
            .then((res) => {
                if(res.data.status==true){
                    toasts("succes", "Data Berhasil Tersimpan !");
                    clearScreen();
                    seSts(false);
                    getData()
                }else {
                    if(res.data.data==2627){
                        toasts("error", "Data sudah ada!");
                    }else{
                        toasts("error", "Data Gagal Tersimpan !");
                    }
                    
                }

            })
            .catch((error) => console.error(`Error:${error}`));
    }


    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wobok = XLSX.read(data);

        const worksheetName = wobok.Sheets[wobok.SheetNames[0]];
        const dataex = XLSX.utils.sheet_to_json(worksheetName);
        setExcelData(dataex);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await http
            .post("api/uploadsalary", { excelData })
            .then((res) => {
                setSalaryData(res.data.data);
                console.log(res.data.data);

            })
            .catch((error) => console.error(`Error:${error}`));

    }

    function getData(){
        http.get('api/datasalary', {
            params: {
                nik: niktxt
            }
        }).then((res) => {
            setSalaryData(res.data.data);
        }).catch(error => console.error(`Error:${error}`));
    }

    const getAllsalary = (e) => {
        e.preventDefault();
        getData()

       
    }
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
                                <div>
                                    <div className="card-body">


                                        <div className="row" style={{ marginBottom: "15px" }}>
                                            <div className="col-6">


                                                <div>
                                                    <form onSubmit={getAllsalary}>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">NIK</label>
                                                            <div className="col-3">
                                                                <input type="text" onChange={e => setNiktxt(e.target.value)} className="form-control" id="inputEmail3" />
                                                            </div>

                                                            <div className="col-3">
                                                                <button type="submit" className="btn btn-primary">Show</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>


                                            </div>
                                            <div className="col-6 text-right">

                                                <button type="button" style={{ marginRight: "10px" }}
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    className="btn btn-info"
                                                    data-toggle="modal"
                                                    data-target="#modal-tambah">Tambah</button>

                                                <button type="button"
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    className="btn btn-primary"
                                                    data-toggle="modal"
                                                    data-target="#modal-default">Upload</button>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
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
                                                                    <th>Basic Salary</th>
                                                                    <th>Last Salary</th>
                                                                    <th>Payrol Terkahir</th>
                                                                    <th>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    salaryData.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td>{item.nik}</td>
                                                                            <td>{item.name}</td>
                                                                            <td><NumberFormat value={item.basic_salary} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                                            <td><NumberFormat value={item.last_salary} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                                            <td>{item.last_month_pay}</td>
                                                                            <td>

                                                                                <button type="button" onClick={()=>displayData(item.nik)} data-toggle="modal" data-target="#modal-tambah" className="btn-sm btn-primary">Edit</button>
                                                                                <button type="button" style={{ marginLeft: "5px" }} className="btn-sm btn-danger">Hapus</button>

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
                                    <div className="card-footer">

                                    </div>
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
                            <h4 className="modal-title">Default Modal</h4>
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

                            <form onSubmit={handleSubmit}>
                                <input onChange={(e) => handleFile(e)} required type="file" />
                                <button className="btn btn-primary" type="submit">Upload</button>
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
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="modal-tambah">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Gaji Entry</h4>
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
                                            type="text"
                                            value={niknew}
                                            onChange={(e) => setNiknew(e.target.value)}
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
<br/>
                            <form onSubmit={addNew} autoComplete="off">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="nohp">Basic Salary</label>
                                            <NumberFormat thousandSeparator={true}
                                                value={basic} getInputRef={inputRef}
                                                onChange={(e) => setBasic(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Last Salary</label>
                                            <NumberFormat thousandSeparator={true}
                                                value={last}
                                                onChange={(e) => setLast(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>

                                        
                             
                                        
                                        <div className="form-group">
                                            <label htmlFor="password">Gaji Bulan</label>
                                            <NumberFormat placeholder='yyyyMM'
                                                value={month}
                                                onChange={(e) => setMonth(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalaryData