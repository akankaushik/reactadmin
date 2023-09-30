import React, { Component } from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { BsSpeedometer2, BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className="container">
            <div className="row">
              
                <div className="col-md-5 mt-4 fs-5">PRODUCT ADMIN</div>
                
                <div className="col-md-7 d-flex">
                <Link to="/home" style={{paddingLeft: 13, textDecoration: 'none'}}><p><span> <BsSpeedometer2/></span>  <br />Dashboard</p></Link>
                <Link to="/Product" style={{paddingLeft: 13, textDecoration: 'none'}}><p><span><BsCart3/></span><br />Products</p></Link> 
                <Link to="/accounts" style={{paddingLeft: 13, textDecoration: 'none'}}><p><span><FaUserAlt/></span> <br />Accounts</p></Link>
                    
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}
