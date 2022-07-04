import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx'
import AuthUser from '../services/AuthUser';

function SalaryData() {
    const { http, toasts } = AuthUser();
    const [excelData, setExcelData]=useState(null);

    const handleFile =async (e)=>{
        const file = e.target.files[0];
        const data =await file.arrayBuffer();
        const wobok=XLSX.read(data);

        const worksheetName = wobok.Sheets[wobok.SheetNames[0]];
        const dataex = XLSX.utils.sheet_to_json(worksheetName);
        setExcelData(dataex);

   
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    await http
      .post("api/uploadsalary", {excelData})
      .then((res) => {
        console.log(res);
        
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

                                            </div>
                                            <div className="col-6 text-right">

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
                                                    {/* /.card-header */}
                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-hover text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>User</th>
                                                                    <th>Date</th>
                                                                    <th>Status</th>
                                                                    <th>Reason</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>183</td>
                                                                    <td>John Doe</td>
                                                                    <td>11-7-2014</td>
                                                                    <td><span className="tag tag-success">Approved</span></td>
                                                                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>219</td>
                                                                    <td>Alexander Pierce</td>
                                                                    <td>11-7-2014</td>
                                                                    <td><span className="tag tag-warning">Pending</span></td>
                                                                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>657</td>
                                                                    <td>Bob Doe</td>
                                                                    <td>11-7-2014</td>
                                                                    <td><span className="tag tag-primary">Approved</span></td>
                                                                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>175</td>
                                                                    <td>Mike Doe</td>
                                                                    <td>11-7-2014</td>
                                                                    <td><span className="tag tag-danger">Denied</span></td>
                                                                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* /.card-body */}
                                                </div>
                                                {/* /.card */}
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
                                <input onChange={(e)=> handleFile(e)} required type="file"/>
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

        </div>
    );
}

export default SalaryData