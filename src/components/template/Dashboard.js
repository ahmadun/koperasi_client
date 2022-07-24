import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return ( 
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Dashboard</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>Rp. 150.000</h3>
                                            <p>TOTAL SHU 2022</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-bag" />
                                        </div>
                                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                    </div>
                                </div>
                               
                               
                              
                            </div>
                            <div className="row">
                                <section className="col-lg-12 connectedSortable">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                <i className="fas fa-chart-pie mr-1" />
                                                Informasi
                                            </h3>
                                          
                                        </div>
                                        <div className="card-body">
                                            
                                        </div>
                                    </div>
                                             
                                </section>

                            
                            </div>
                        </div>
                    </section>
                </div>
          

        )
    }
}