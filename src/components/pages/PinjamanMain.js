import React, { useEffect, useState,useContext } from 'react'
import NumberFormat from 'react-number-format';
import AuthUser from '../services/AuthUser'
import Loading from '../template/Loading';
import { AuthContext } from '../../App';


function PinjamanMain() {
    const { state } = useContext(AuthContext)
    const { http } = AuthUser();
    const [pinjamanlists, setPinjamanlists] = useState([]);
    const [pinjamandetails, setPinjamandetails] = useState([]);
    const [totals, setTotals] = useState([]);
    const [codetypes, setCodetypes] = useState('');
    const [titleTable, setTitleTable] = useState('');
    const [load, setLoad] = useState();

    useEffect(() => {
        getListPinjaman();
    }, []);

    const getListPinjaman = () => {
        http.get('api/pinjaman',{
            params: {
                nik: state.nik,
            }
        }).then((res) => {
            setPinjamanlists(res.data.data);
        }).catch(error => console.error(`Error:${error}`));
    }


    const getDetailPinjaman = (kode) => {
        setLoad(true);
        setPinjamandetails([]);
        setTotals([]);
        setCodetypes(kode);
        if (kode == 'REG') {
            setTitleTable('Daftar Pinjaman Reguler');
        } else {
            setTitleTable('Daftar Pinjaman Konsumptif');
        }
        http.get('api/pinjaman/detail', {
            params: {
                nik: state.nik,
                code: kode
            }
        }).then((res) => {
            setLoad(false);
            setPinjamandetails(res.data.data);
            setTotals(res.data.total);
        }).catch(error => console.error(`Error:${error}`));
    }


    const CompTabelReguler = () => {
        return <table className="table table-head-fixed text-nowrap">
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
                {load ?
                    <tr>
                        <td colSpan={5} align={'center'}><Loading /></td>
                    </tr> :
                        pinjamandetails.map((item, i) => (
                        <tr key={i}>
                            <td>{item.Bulan}</td>
                            <td><NumberFormat value={item.Cicilan_pokok} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.Cicilan_bunga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.Cicilan_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.remarks}</td>
                        </tr>
                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.Bulan} Bulan</td>
                        <td><NumberFormat value={item.Cicilan_pokok} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.Cicilan_bunga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.Cicilan_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
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
                    <th>Kredit PRT</th>
                    <th>Kode</th>
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={6} align={'center'}><Loading /></td>
                    </tr> :
                    pinjamandetails.map((item, i) => (
                        <tr key={i}>
                            <td>{item.Bulan}</td>
                            <td><NumberFormat value={item.Cicilan} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.Bunga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.kredit_Kendaraan} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.Kredit_PRT} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.Kode}</td>
                        </tr>

                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.Bulan} Bulan</td>
                        <td><NumberFormat value={item.Cicilan_pokok} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.Cicilan_bunga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.Cicilan_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.Kredit_PRT} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td></td>
                    </tr>
                ))}

            </tbody>
        </table>

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
                                    <li className="breadcrumb-item active">Pinjaman</li>
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

                                            </table>
                                        </div>
                                    </div><table className="table table-striped">
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
                                                        <button type="button" onClick={() => getDetailPinjaman(item.kode)} className="btn btn-info">Check</button>
                                                    </td>
                                                </tr>

                                            ))}

                                        </tbody>
                                    </table>

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
                                            {titleTable}
                                        </h3>
                                    </div>

                                    <div className="card-body table-responsive p-0" style={{ height: 500 }}>
                                        {

                                            codetypes === 'REG' ? (
                                                <CompTabelReguler />
                                            ) : (
                                                <CompTabeKonsumtif />
                                            )

                                        }
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

