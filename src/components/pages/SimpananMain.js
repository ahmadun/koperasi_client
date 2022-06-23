import React, { useState } from "react";
import axios from 'axios'
import NumberFormat from 'react-number-format';







function SimpananMain() {

    const [simpananlists, setSimpananlists] = useState([]);

    const fetchSimpanan = () => {
        axios.get(`http://127.0.0.1:8000/api/simpanan`)
            .then((response) => {
                const result = response.data;
                setSimpananlists(result.data);
    
            })
            .catch(error => console.error(`Error:${error}`));
    }


    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Invoice</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Invoice</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="callout callout-info">
                                    <h5><i className="fas fa-info" /> Note:</h5>
                                    This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.
                                </div>
                                {/* Main content */}
                                <div className="invoice p-3 mb-3">
                                    {/* title row */}
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                <i className="fas fa-globe" /> Koperasi SBI
                                                <small className="float-right">Date: 2/10/2014</small>
                                            </h4>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* info row */}
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            Tampilkan di layar
                                            <address>
                                                <button type="button" onClick={fetchSimpanan} className="btn btn-primary btn-block"><i className="fa fa-book" /> Tampilkan</button>

                                            </address>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-sm-4 invoice-col">
                                            Kirim ke email
                                            <address>
                                                <div className="input-group input-group-md">
                                                    <input type="text" className="form-control" />
                                                    <span className="input-group-append">
                                                        <button type="button" className="btn btn-info btn-flat">Kirim</button>
                                                    </span>
                                                </div>


                                            </address>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-sm-4 invoice-col">

                                        </div>
                                        {/* /.col */}
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
                                                {simpananlists.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.Tgl_penyimpanan}</td>
                                                            <td><NumberFormat value={item.Simpanan_Wajib} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                            <td><NumberFormat value={item.Simpanan_Sukarela} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                                                        </tr>

                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* /.row */}
                                    <div className="row">
                                        {/* accepted payments column */}
                                        <div className="col-6">

                                        </div>
                                        {/* /.col */}
                                        <div className="col-lg-6 col-sm-12">
                                            <p className="lead">Amount Due 2/22/2014</p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody><tr>
                                                        <th style={{ width: '50%' }}>Simpanan Pokok</th>
                                                        <td>$250.30</td>
                                                    </tr>
                                                        <tr>
                                                            <th>Total Simpanan Wajib</th>
                                                            <td>$10.34</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total Simpanan Sukarela</th>
                                                            <td>$5.80</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total:</th>
                                                            <td>$265.24</td>
                                                        </tr>
                                                    </tbody></table>
                                            </div>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* /.row */}
                                    {/* this row will not appear when printing */}
                                    <div className="row no-print">
                                        <div className="col-12">
                                            <a href="invoice-print.html" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a>
                                            <button type="button" className="btn btn-success float-right"><i className="far fa-credit-card" /> Submit
                                                Payment
                                            </button>
                                            <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                <i className="fas fa-download" /> Generate PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* /.invoice */}
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>

        </div>
    )
}

export default SimpananMain