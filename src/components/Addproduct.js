import React, { Component } from 'react'
import './style.scss'
import Header from './Header'

export default class Addproduct extends Component {
    constructor(){
        super();
        this.state = {
            productName: '',
            description: '',
            category: '',
            expireDate: '',
            unitsInStock: '',
            imageUrl: '', // New state variable to hold the uploaded image URL

        };
    }
    saveInput = (e) => {
        if (e.target.name === 'profile') {
          // Handling the image file input separately
          const file = e.target.files[0];
          const imageUrl = URL.createObjectURL(file);
          this.setState({ imageUrl });
        } else {
          // Regular form field handling
          this.setState({
            [e.target.name]: e.target.value,
          });
        }
      };
    add=()=>{
        let newProd ={
            "category": this.state.category,
            "description": this.state.description,
            "expireDate": this.state.expireDate,
            "name": this.state.productName,
            "stock": this.state.unitsInStock,
            "unitSold": " "
          }
          let locprod = localStorage.getItem('locproddata')
          let store = JSON.parse(locprod)
          store.push(newProd)
          console.log(store);
          let str = JSON.stringify(store)
          localStorage.setItem('locproddata', str)

         // Clear the form fields after processing
    this.setState({
        productName: '',
        description: '',
        category: '',
        expireDate: '',
        unitsInStock: '',
      });
      alert("Product Succeffully Added")
    }
    render() {
        return (
            <>
                <Header />
                <div className="addProdcont">
                    <div className="container mt-5">
                        <div className="row p-4">
                            <div className="col-md-6">
                                <h5>Add Product</h5>

                                <label htmlFor="">Product Name</label>
                                <input className="form-control" name='productName' type="text" onChange={this.saveInput} />

                                <label htmlFor="">Description</label>
                                <input className="form-control" name='description' type="text" onChange={this.saveInput} />

                                <label htmlFor="">Category</label>
                                <select name="category" className='form-control' id="" onChange={this.saveInput}>
                                    <option value="">Select Category</option>
                                    <option value="New Arrival">New Arrival</option>
                                    <option value="Most Popular">Most Popular</option>
                                    <option value="Trending">Trending</option>
                                </select>

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label htmlFor="">Expire Date</label>
                                        <input className="form-control" name='expireDate' type="date" onChange={this.saveInput}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">Units In Stock</label>
                                        <input className="form-control" type="text" name='unitsInStock' onChange={this.saveInput} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                <div className="imgAvatar text-center ms-5 mt-4">
                  {/* Display the uploaded image */}
                  {this.state.imageUrl ? (
                    <img src={this.state.imageUrl} alt="" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  ) : (
                    <p>No Image Uploaded</p>
                  )}
                </div>
                <div className="">
                  <input
                    type="file"
                    className=""
                    id="profile"
                    style={{ display: 'none' }}
                    accept=".png, .jpg, .jpeg, .webp"
                    name="profile" // Add the name attribute to the file input
                    onChange={this.saveInput} // Handle file input changes
                  />
                  <label className="accButton btn btn-warning w-50 ms-4 mt-2" htmlFor="profile">
                    Choose Image
                  </label>
                </div>
              </div>
              <button className="btn btn-warning m-2 mt-4" onClick={() => this.add()}>
                ADD PRODUCT NOW
              </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
