import React, { useEffect, useState, useContext } from 'react'
import NumberFormat from 'react-number-format';
import AuthUser from '../services/AuthUser'
import Loading from '../template/Loading';
import { AuthContext } from '../../App';



function PinjamanMain() {
    const { state } = useContext(AuthContext)
    const { http, nik } = AuthUser();
    const [pinjamanlists, setPinjamanlists] = useState([]);
    const [pinjamandetails, setPinjamandetails] = useState([]);
    const [totals, setTotals] = useState([]);
    const [codetypes, setCodetypes] = useState('');
    const [titleTable, setTitleTable] = useState('');
    const [load, setLoad] = useState();





    useEffect(() => {

        if (!state.isAuthenticated) {
            getnik().then(res => {
                getListPinjaman(res.data.data.nik);
            })

        } else {
            getListPinjaman(state.nik);
        }

    }, []);


    const getnik = () => {

        return http.get('/api/protected')
    }

    const getListPinjaman = (nik) => {
        http.get(`api/credit_list/${nik}`).then((res) => {
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
        } else if(kode=='KON'){
            setTitleTable('Daftar Pinjaman Konsumptif');
        }else{
            setTitleTable('Daftar Pinjaman PRT');
        }
        http.get(`api/detail_credit?nik=${state.nik}&code=${kode}`).then((res) => {
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
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.remarks}</td>
                        </tr>
                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
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
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={6} align={'center'}><Loading /></td>
                    </tr> :
                    pinjamandetails.map((item, i) => (
                        <tr key={i}>
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        </tr>

                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit_main} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_interest} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                        <td><NumberFormat value={item.credit_total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
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
                </tr>
            </thead>
            <tbody>
                {load ?
                    <tr>
                        <td colSpan={6} align={'center'}><Loading /></td>
                    </tr> :
                    pinjamandetails.map((item, i) => (
                        <tr key={i}>
                            <td>{item.month}</td>
                            <td><NumberFormat value={item.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>{item.remarks} </td>
                        </tr>

                    ))}

                {totals.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: 'pink', fontWeight: 'bolder' }}>
                        <td><b>Total</b>   {item.month} Bulan</td>
                        <td><NumberFormat value={item.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>                     
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

                                <div className="row">

                                    {pinjamanlists.map((item, i) => (

                                        <div className="col-md-3 col-sm-6 col-12 m-2" key={i}>
                                            <div className="info-box">
                                                <span className="info-box-icon bg-warning"><i className="far fa-credit-card" /></span>
                                                <div className="info-box-content">
                                                    <span className="info-box-text">{item.type}</span>
                                                    <span className="info-box-number">{item.lastmonth}</span>
                                                </div>
                                                <a style={{cursor:'pointer'}} onClick={() => getDetailPinjaman(item.kode)} className="small-box-footer">
                                                    Detail <i className="fas fa-arrow-circle-right"></i>
                                                </a>
                                            </div>

                                        </div>

                                    ))}
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
                                                codetypes==='KON' ? (
                                                    <CompTabeKonsumtif />
                                                ):(
                                                    <CompTabePrt/>
                                                )                                             
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

