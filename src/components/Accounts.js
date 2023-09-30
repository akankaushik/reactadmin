import React, { Component } from 'react';
import './style.scss';
import Header from './Header';
import { BsFillTrashFill } from 'react-icons/bs';

export default class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      account: '',
      data: {},
      name: '',
      email: '',
      password: '',
      repassword: '',
      phone: '',
      profilePic: ''
    };
  }

  selectacc = (e) => {
    const selectedAccount = e.target.value;
  
    if (selectedAccount) {
      this.setState(
        {
          account: selectedAccount
        },
        () => {
          let data = localStorage.getItem(this.state.account);
          if (data) {
            this.setState({
              data: JSON.parse(data),
              name: JSON.parse(data).name,
              email: JSON.parse(data).email,
              phone: JSON.parse(data).phone,
              password: JSON.parse(data).password,
              profilePic: JSON.parse(data).profilePic
            });
          } else {
            // If no data found for the selected account, show an alert
            alert('No data found for the selected account.');
          }
        }
      );
    } else {
      // If no account is selected, show an alert
      alert('Please select an account from the list.');
    }
  };
  
  handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Check if the file size is less than or equal to 1MB (1MB = 1024 * 1024 bytes)
      if (file.size <= 1024 * 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({ profilePic: reader.result });
        };
      } else {
        // Show an error message or perform any desired action if the image size exceeds 1MB
        alert('Please choose an image whose size is less than or equal to 1MB.');
      }
    }
  };
  
  delimg=()=>{
    this.setState({
      profilePic:''
    },()=>{alert('Image Deleted')})
  }

  update = () => {
    const { name, email, password, phone, profilePic,repassword } = this.state;
    const updatedData = { name, email, password, phone, profilePic };
    if (repassword===password) {
      
    
    localStorage.setItem(this.state.account, JSON.stringify(updatedData));
    alert("Data Updated Successfully")
    }
    else{
      alert("Password Not matching, Kindly put same password in password and reenter password field")
    }
  };
  

  delete = () => {
    // Implement the logic to delete the account data from local storage
    localStorage.removeItem(this.state.account);
    // Reset the state to clear the form after deleting
    this.setState({
      account: '',
      data: {},
      name: '',
      email: '',
      password: '',
      repassword: '',
      phone: '',
      profilePic: ''
    },()=>alert('Account Deleted Successfully'));
  };

  render() {
    let { data, profilePic } = this.state;
    return (
      <>
        <Header />
        <div className="accountscont">
          <div className="container acclistcont mt-5 mb-5 p-5">
            <h6 className="mb-3">List Of Accounts</h6>
            <select name="" className="form-control" id="" onChange={this.selectacc}>
              <option value="Admin">Select Account</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Merchant">Merchant</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="accsetting p-4 text-center">
                  <div className="avatar mb-3">Change Avatar</div>
                  <div className="imgAvatar text-center ms-5">
                    <div className="trashimg fs-4">
                      <BsFillTrashFill onClick={()=>this.delimg()}/>
                    </div>
                    {profilePic ? (
                      <img src={profilePic} alt="No pic for selected account" />
                    ) : (
                      <p>No image selected</p>
                    )}
                  </div>
                  <div className="mt-3">
                    <input
                      type="file"
                      className=""
                      id="profile"
                      style={{ display: 'none' }}
                      onChange={this.handleImageChange}
                    />
                    <label className="accButton btn btn-warning w-50" htmlFor="profile">
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="accsetting p-4">
                  <h6>Account Setting</h6>
                  <div className="row inputfield">
                    <div className="col-md-6">
                      <label htmlFor="">Account Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                      />
                      <label htmlFor="">Password</label>
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                      />
                      <label htmlFor="">Phone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="">Account Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                      />
                      <label htmlFor="">Re-Enter Password</label>
                      <input
                        className="form-control"
                        type="text"
                        name="repassword"
                        onChange={(e) => this.setState({ repassword: e.target.value })}
                      />
                      <button className="btn btn-warning w-100 mt-4" onClick={this.update}>
                        UPDATE YOUR PROFILE
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-warning w-100 mt-4" onClick={this.delete}>
                    DELETE YOUR ACCOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
