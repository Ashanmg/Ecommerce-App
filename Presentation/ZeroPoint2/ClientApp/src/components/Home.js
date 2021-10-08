import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="artisan-page-body">
                <div className="header-menu">
                    <div className="row d-none d-lg-flex">
                        <div className="justify-content-center">
                            <div className="d-inline-flex">
                                <img src="/images/common/Logo2.jpg" className="home-logo-image" alt="..." />
                                <span className="material-icons-outlined" style={{fontSize : '46px', marginTop : '-7px'}}>view_headline</span>
                                <div>
                                    <input type="text" id="in-name1" className="form-control artisan-input text-left mb-2" placeholder="Search" style={{height: '30px !important', width: '525px'}} />
                                    <div>
                                        <p className="d-inline-block" style={{marginLeft: '-100px', marginTop: '3px', fontWeight: '500', verticalAlign: 'middle', fontSize: '14px'}}>Where the world's finest artisans showcase their talents</p>
                                        <div className="float-right">
                                            <a type="button" href="/Login" className="btn btn-common mr-1">Login</a>
                                            <a type="button" href="/Register" className="btn btn-common">Become a member</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    search
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    save
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    collections
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    arrow_back_ios
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    arrow_forward_ios
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    add
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>info</span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    delete
                                </span>
                                <span className="material-icons-outlined" style={{fontSize : '45px', marginTop : '-7px'}}>
                                    shopping_cart
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row d-block d-lg-none text-center">
                        <img src="/images/common/Logo2.jpg" className="home-logo-image" alt="..." />
                        <div className="ml-0 mt-auto mr-auto mb-auto">
                            <a type="button" href="/Login" className="btn btn-common">Login</a>
                            <a type="button" href="/Register" className="btn btn-common">Become a member</a>
                            <button type="button" className="btn btn-common" style={{backgroundColor: '#8e62eb !important'}}>100% Handmade</button>
                            <span className="material-icons-outlined" style={{fontSize: '40px', verticalAlign: 'middle', color: '#8e62eb'}}>info</span>
                            <p className="text-center">Where the world's finest artisans showcase their talents</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row justify-content-lg-center">
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="1" src="/images/products/1.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="2" src="/images/products/2.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="3" src="/images/products/3.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="4" src="/images/products/4.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-lg-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="5" src="/images/products/5.png" alt="Another alt text" />
                            </a>
                        </div>
                    </div>
                    <div className="row justify-content-lg-center">
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="6" src="/images/products/6.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="7" src="/images/products/7.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="8" src="/images/products/8.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="9" src="/images/products/9.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-lg-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="10" src="/images/products/10.png" alt="Another alt text" />
                            </a>
                        </div>
                    </div>
                    <div className="row justify-content-lg-center">
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="11" src="/images/products/11.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="12" src="/images/products/12.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="13" src="/images/products/13.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-sm-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="14" src="/images/products/14.png" alt="Another alt text" />
                            </a>
                        </div>
                        <div className="col d-none d-lg-block thumb">
                            <a className="thumbnail" href="#">
                                <img className="img-thumbnail" id="15" src="/images/products/15.png" alt="Another alt text" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
