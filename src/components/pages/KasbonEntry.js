import React, { useState, useEffect, useRef,useContext } from "react";
import NumberFormat from 'react-number-format';
import AuthUser from "../services/AuthUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../App";


function KasbonEntry() {
  const { http, toasts } = AuthUser();
  const [tableData, setTableData] = useState([])
  const [nik, setNik] = useState("")
  const [name, setName] = useState("")
  const [kredit, setKredit] = useState()
  const [notaitem, setNotaitem] = useState("")
  const nikRef = useRef(null);
  const notaRef = useRef(null);
  const itemRef = useRef(null);
  const notaitemRef = useRef(null);
  const saveRef = useRef(null);
  const [oneDate, setOneDate] = useState(new Date());
  const [twoDate, setTwoDate] = useState(new Date());
  const[notalock,setNotalock]=useState(false);
  const[nikalock,setNikalock]=useState(false);
  const[savelock,setSavelock]=useState(true);
  const { state } = useContext(AuthContext);
  const [formAddone, setFormAddone] = useState({
    form: 1,
    nota:"",
    item: "",
    qty: 1,
    price: "0",
    date: "",
    nik: 0,
    user: ""
  })
  const [totals, setTotals] = useState(0);
  const [formAddtwo, setFormAddtwo] = useState({
    form: 2,
    nota:"",
    item: "",
    qty: 1,
    price: "0",
    date: "",
    nik: 0,
    user: ""
  })

  useEffect(() => {
    setTotals((tableData.reduce((a, v) => a = a + v.qty * v.price, 0)))
    if (nik.length != 6) {
      setName(null)
      setKredit(null);
    }
   
  }, [tableData, nik]);

  function clearScreen() {
    nikRef.current.focus();
    setNik("");
    setNotaitem("");
    setName("")
    setKredit("");
    setTableData([]);
    setNotalock(false);
    setNikalock(false);
    setSavelock(true);
  

  }

  const CheckNik = (e) => {
    e.preventDefault();
    http.get("api/checkkasbon", {
      params: {
        nik: nik
      },
    })
      .then((res) => {
        if (res.data.data.length > 0) {
          setName(res.data.data[0].name);
          setKredit(res.data.data[0].kredit_percen);
          notaRef.current.focus();
          setNikalock(true);
          setSavelock(false);
        } else {
          clearScreen();
          toasts("error", "Data Gaji Karyawan belum didaftarkan !");
        }
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const handleChangeone = (e) => {
    const newInput = (data) => ({ ...data, [e.target.name]: e.target.value })
    setFormAddone(newInput)
  }

  const handleChangetwo = (e) => {
    const newInput = (data) => ({ ...data, [e.target.name]: e.target.value })
    setFormAddtwo(newInput)
  }

  function addingItemOne(e) {
    e.preventDefault();
    const checkEmptyInput = !Object.values(formAddone).every(res => res === "")
    if (checkEmptyInput) {
    
      if (formAddone.nota != "" && formAddone.price != 0) {
        if(tableData.length>0){
          setTableData(tableData.filter((tableData) => tableData.form === 1));
        }

        formAddone.item="NOTA";
        formAddone.nik = nik;
        formAddone.date = oneDate;
        formAddone.user =state.nik
        formAddone.price = formAddone.price.replaceAll(',', '');
        const newData = (data) => ([...data, formAddone])
        setTableData(newData);
        const emptyInput = { form: 1, nota: '', qty: 1, price: 0 }
        setFormAddone(emptyInput)
        saveRef.current.focus();

      }
    }
  }

  function addingItemTwo(e) {
    e.preventDefault();
    const checkEmptyInput = !Object.values(formAddtwo).every(res => res === "")
    if (checkEmptyInput) {
     
      if (formAddtwo.item != "" && formAddtwo.price != 0 && formAddtwo.qty > 0 && notaitem!="") {

        if(tableData.length>0){
          setTableData(tableData.filter((tableData) => tableData.form === 2));
       }

        formAddtwo.nik = nik;
        formAddtwo.nota=notaitem;
        formAddtwo.user =state.nik
        formAddtwo.date = oneDate;
        formAddtwo.price = formAddtwo.price.replaceAll(',', '');     
        const newData = (data) => ([...data, formAddtwo])
        setTableData(newData);
        const emptyInput = { form: 2, item: '', qty: 1, price: 0 }
        setFormAddtwo(emptyInput)
        itemRef.current.focus();
        
      }
    }
  }

  function handleNota(){
    itemRef.current.focus();
    setNotalock(true);
  }


  function cancelTrans(){
    clearScreen()
  }

  async function savingData() {

    if(totals>0){
      await http
      .post("api/savetrans", {
        tableData

      })
      .then((res) => {
        if (res.data.status == true) {
          toasts("succes", "Data Berhasil Tersimpan !");
          clearScreen();
        } else {
          toasts("error", "Data Gagal Tersimpan !");
        }
      })
      .catch((error) => console.error(`Error:${error}`));

    }else{
      toasts("error", "Daftar Kasbon Kosong !");
    }
 

   
  }


  const handleDelete = (index, e) => {
    setTableData(tableData.filter((v, i) => i !== index));
  }

  const StatusKredit = () => {
    if (kredit < 40) {
      return (
        <div className="info-box">
          <span className="info-box-icon bg-info"><i className="far fa-check-square" /></span>
          <div className="info-box-content">
            <span className="info-box-text">{name}</span>
            <span className="info-box-number">{kredit} %</span>
          </div>
        </div>

      )
    } else if (kredit >= 40) {
      return (
        <div className="info-box">
          <span className="info-box-icon bg-danger"><i className="fas fa-times" /></span>
          <div className="info-box-content">
            <span className="info-box-text">{name}</span>
            <span className="info-box-number">{kredit} %
              <span className="badge bg-danger" style={{ marginLeft: "5px" }}>Limit Kredit mencampai Maximum</span>
            </span>
          </div>
        </div>

      )
    } else {
      return (
        <div className="info-box">
          <span className="info-box-icon"></span>
          <div className="info-box-content">
            <span className="info-box-text"></span>
            <span className="info-box-number"></span>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="container-fluid">
      <ToastContainer theme={"colored"} />
      <div className="content-wrapper">
        <div className="row" style={{ paddingTop: 10 }}>
          <div className="col-6">
            <div className="card card-primary">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <label>NIK</label>
                  </div>
                  <div className="col-12">
                    <form onSubmit={CheckNik} autoComplete="off">
                      <input type="text" disabled={nikalock} ref={nikRef} onChange={e => setNik(e.target.value)} value={nik} name="nik" id="inputnik" className="form-control" />
                    </form>
                  </div>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="col-12">
                    <StatusKredit />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-primary card-tabs">
                      <div className="card-header p-0 pt-1">
                        <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" id="tabs-one-tab" data-toggle="pill" href="#tabs-one" role="tab" aria-controls="tabs-one" aria-selected="true">Jumlah Kasbon</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="tabs-two-tab" data-toggle="pill" href="#tabs-two" role="tab" aria-controls="tabs-two" aria-selected="false">Per Item</a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="tab-content" id="custom-tabs-five-tabContent">
                          <div className="tab-pane fade show active" id="tabs-one" role="tabpanel" aria-labelledby="tabs-one-tab">
                            <div className="row">
                              <div className="col-12">
                                <div className="row" style={{ marginBottom: "5px" }}>
                                  <div className="col-8 align-self-center">
                                    <div className="text-right">Tanggal Kasbon</div>
                                  </div>
                                  <div className="col-4">

                                    <DatePicker className="form-control" isClearable
                                      placeholderText="Tanggal Kasbon" selected={oneDate} onChange={(date) => setOneDate(date)} name="date" />

                                  </div>
                                </div>
                                <form onSubmit={addingItemOne} autoComplete="off">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>No. Nota</th>
                                        <th>Jumlah Belanja</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input type="text" ref={notaRef} value={formAddone.nota} onChange={handleChangeone} name="nota" className="form-control" />
                                        </td>
                                        <td>
                                          <NumberFormat thousandSeparator={true} className="form-control" value={formAddone.price} onChange={handleChangeone} name="price" />
                                        </td>
                                        <td>
                                          <button type="submit" className="btn btn-primary">+</button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="tabs-two" role="tabpanel" aria-labelledby="tabs-two-tab">
                            <div className="row" style={{ marginBottom: "5px" }}>

                                <div className="col-4">
                                  
                                  <input type="text" disabled={notalock} onKeyPress={(e) => e.key === 'Enter' && handleNota()} ref={notaitemRef} autoComplete="off" onChange={e => setNotaitem(e.target.value)} value={notaitem} name="nota-item" className="form-control" placeholder="No. Nota"/>
                                  
                                </div>
                                <div className="col-4 align-self-center">
                                  <div className="text-right">Tanggal Kasbon</div>
                                </div>
                                <div className="col-4">

                                  <DatePicker className="form-control" isClearable
                                    placeholderText="Tanggal Kasbon" selected={twoDate} onChange={(date) => setTwoDate(date)} />

                                </div>
                            </div>
                
                              <form onSubmit={addingItemTwo} autoComplete="off">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Item</th>
                                      <th>Qty</th>
                                      <th>Harga Item</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <textarea name="item" ref={itemRef} value={formAddtwo.item} onChange={handleChangetwo} className="form-control" rows="3"></textarea>
                                      </td>
                                      <td style={{ width: 100 }}>
                                        <input type="number" value={formAddtwo.qty} onChange={handleChangetwo} name="qty" className="form-control" />
                                      </td>
                                      <td>
                                        <NumberFormat thousandSeparator={true} className="form-control" value={formAddtwo.price} onChange={handleChangetwo} name="price" />
                                      </td>
                                      <td>
                                        <button type="submit" className="btn btn-primary">+</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
  
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" style={{ backgroundColor: "#EDF9F3" }}>
            <div className="row">
              <div className="col-12">
                <div style={{ marginTop: "5px" }}>
                  <div className="table-responsive p-0" style={{ height: 300 }}>
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          <th>Nota / Item</th>
                          <th>Qty</th>
                          <th>Harga / Jumlah</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, i) => (
                          <tr key={i}>
                            <td style={{ width: "300px" }}>
                            <span className="badge bg-info" style={{ marginLeft: "5px" }}>  {item.nota} </span> {item.item}
                            </td>
                            <td style={{ width: "200px" }}>
                              {item.qty}
                            </td>
                            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>
                              <button type="button" onClick={e => handleDelete(i, e)} className="btn btn-sm btn-danger"><span className="fas fa-trash" /></button>
                            </td>
                          </tr>

                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="con" style={{ position: "relative" }}>
                <div className="con-bottom" style={{ position: "fixed", bottom: "0", height: 250, width: "100%", backgroundColor:"#CEEFDE"}}>
                  <div className="row">
                    <div className="col-12">
                      <div style={{ paddingBottom: 8, paddingTop: 15, borderBottom: "2px solid black", fontSize: 20 }}>
                        <label style={{ marginLeft: 10 }}>Total Kasbon : <span><NumberFormat value={totals} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></span></label>
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "blue", position: "relative" }}>
                    
                    <div style={{backgroundColor:"Red", position:"fixed", bottom:0, margin:10}}>                   
                      <button  type="button" onClick={()=>cancelTrans()} className="btn btn-danger">Cancel</button>
                      
                    </div>
                  
                    <div style={{ position: "fixed", right: 0, bottom: 0, margin: 10 }}>
                      <button disabled={savelock} type="button" ref={saveRef} onClick={savingData} className="btn btn-primary" style={{ height: 100, width: 200 }}>SAVE</button>
                  
                    </div>               
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KasbonEntry;
