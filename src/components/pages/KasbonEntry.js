import React, { useState, useEffect } from "react";
import NumberFormat from 'react-number-format';
function KasbonEntry() {

  const [tableData, setTableData] = useState([])
  const [formAdd, setFormAdd] = useState({
    form: 1,
    item: "",
    qty: 1,
    price: "0"
  })
  const[totals,setTotals]=useState(0);

  const [formAddtwo, setFormAddtwo] = useState({
    form: 1,
    item: "",
    qty: 1,
    price: "0"
  })

  useEffect(() => {
    setTotals((tableData.reduce((a,v) =>  a = a + v.qty*v.price, 0 )))
}, [tableData]);


  const handleChange = (evnt) => {
    const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
    setFormAdd(newInput)
  }

  const handleChangetwo = (evnt) => {
    const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
    setFormAddtwo(newInput)
  }

  function addingItemOne(evnt) {

    evnt.preventDefault();

    const checkEmptyInput = !Object.values(formAdd).every(res => res === "")
    if (checkEmptyInput) {
      const newData = (data) => ([...data, formAdd])
      setTableData(newData);
      const emptyInput = { item: '', qty: 1, price: 0 }
      setFormAdd(emptyInput)
    }


  }

  function addingItemTwo(evnt) {
    evnt.preventDefault();
    const checkEmptyInput = !Object.values(formAdd).every(res => res === "")
    if (checkEmptyInput) {
      const newData = (data) => ([...data, formAddtwo])
      setTableData(newData);
      const emptyInput = { item: '', qty: 1, price: 0 }
      setFormAddtwo(emptyInput)
    }
  }

  return (
    <div className="container-fluid">
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

                    <input type="text" name="nik" id="inputnik" className="form-control" />

                  </div>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="col-12">
                    <div className="info-box">
                      <span className="info-box-icon bg-info"><i className="far fa-envelope" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">AHMADUN</span>
                        <span className="info-box-number">4.60</span>
                      </div>
                    </div>
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
                                <form onSubmit={addingItemOne}>
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
                                          <input type="text" value={formAdd.item} onChange={handleChange} name="item" className="form-control" />
                                        </td>
                                        <td>

                                          <input type="text" value={formAdd.price} onChange={handleChange} name="price" className="form-control" />

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
                            <div className="row">

                              <div className="col-12">
                                <form onSubmit={addingItemTwo}>
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
                                          <textarea name="item" value={formAddtwo.item} onChange={handleChangetwo} className="form-control" rows="3"></textarea>
                                        </td>
                                        <td style={{ width: 100 }}>
                                          <input type="number" value={formAddtwo.qty} onChange={handleChangetwo} name="qty" className="form-control" />
                                        </td>
                                        <td>
                                          <input type="text" value={formAddtwo.price} onChange={handleChangetwo} name="price" className="form-control" />
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
            </div>
          </div>
          <div className="col-6" style={{ backgroundColor: "lightgrey" }}>


            <div className="row">
              <div className="col-12">
                <div style={{marginTop:"5px"}}>
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
                            <td style={{ width: "300px" }}>{item.item}</td>
                            <td style={{ width: "200px" }}>
                              {item.qty}
                            </td>
                            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td><NumberFormat value={item.price*item.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></td>
                            <td>
                              <button type="button" className="btn btn-sm btn-danger"><span className="fas fa-trash" /></button>
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
                <div className="con-bottom" style={{ position: "fixed", bottom: "0", height: 200, width: "100%", backgroundColor: "yellow" }}>
                  <div className="row">
                    <div className="col-12">
                      <div style={{ paddingBottom: 8, paddingTop: 15, borderBottom: "2px solid black", fontSize: 20 }}>
                        <label style={{ marginLeft: 10 }}>Total Kasbon : <span><NumberFormat value={totals} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></span></label>
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "blue", position: "relative" }}>
                    <div style={{ position: "fixed", right: 0, bottom: 0, margin: 10 }}>
                      <button type="button" className="btn btn-primary" style={{ height: 100, width: 200 }}>SAVE</button>

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
