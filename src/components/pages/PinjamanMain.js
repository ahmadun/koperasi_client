import React, { useEffect, useState } from 'react'
import AuthUser from '../services/AuthUser'



function PinjamanMain() {

    const { http } = AuthUser();
    const [pinjamanlists, setPinjamanlists] = useState([]);
    const [pinjamandetails, setPinjamandetails] = useState([]);

    useEffect(() => {
        getListPinjaman();
    }, []);

    const getListPinjaman = () => {
        http.get('/pinjaman').then((res) => {
            setPinjamanlists(res.data.data);
        });
    }

    
    const getDetailPinjaman=(kode)=> {
        http.get('/pinjaman/detail', {
            params: {
              nik: 197088,
              code:kode
            }
          }).then((res) => {
            setPinjamandetails(res.data.data);
        });
    }


    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Pinjaman</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Invoice</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-primary card-outline">
                                    <div className="row">
                                        <div className="col-12 table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Jenis Kredit</th>
                                                        <th>Selesai</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pinjamanlists.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.type}</td>
                                                            <td>{item.lastmonth}</td>
                                                            <td>
                                                                <button type="button" onClick={()=>getDetailPinjaman(item.kode)} className="btn btn-info">Lihat</button>
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


                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                       <div className="row">
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                                Detail Pinjaman 003 Renovasi Rumah
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                    <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Bulan</th>
                                                        <th>Cicilan Pokok</th>
                                                        <th>Cicilan Bunga</th>
                                                        <th>Cicilan Total</th>
                                                        <th>Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pinjamandetails.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.Bulan}</td>
                                                            <td>{item.Cicilan_pokok}</td>
                                                            <td>{item.Cicilan_bunga}</td>
                                                            <td>{item.Cicilan_total}</td>
                                                            <td>{item.Remarks}</td>
                                                        </tr>

                                                    ))}

                                                </tbody>
                                            </table>
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

export default PinjamanMain

