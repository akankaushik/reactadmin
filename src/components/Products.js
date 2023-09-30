import React, { Component } from 'react';
import Header from './Header';
import { BsTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      catdata: [],
      proddata: [],
      category: '',
      display: 'none'
    };
  }

  componentDidMount() {
  
    this.setinitial()

  }
  setinitial=()=>{
    let d1 =localStorage.getItem('locproddata')
    let c1 =localStorage.getItem('loccatdata')

    let getprod = JSON.parse(d1)
    let getcat = JSON.parse(c1)
    
    this.setState({
      catdata: getcat,
      proddata: getprod,
    });
  }

  handleRowCheckboxChange = (productName) => {
    this.setState((prevState) => ({
      proddata: prevState.proddata.map((product) =>
        product.name === productName ? { ...product, selected: !product.selected } : product
      ),
    }));
  };
  

  handleDeleteSelected = () => {
    this.setState((prevState) => ({
      proddata: prevState.proddata.filter((product) => !product.selected),
    }),()=>{    let prod = JSON.stringify(this.state.proddata)
      localStorage.setItem('locproddata',prod)});
    

  };

  handleDeleteIndividual = (productName) => {
    this.setState((prevState) => ({
      proddata: prevState.proddata.filter((product) => product.name !== productName),
      
    }),()=>{    let prod = JSON.stringify(this.state.proddata)
      localStorage.setItem('locproddata',prod)});
   

  };
  handleDeleteCategory = (category) => {
    this.setState((prevState) => ({
      catdata: prevState.catdata.filter((cat) => cat !== category),
    }),()=>{let cat= JSON.stringify(this.state.catdata)
      localStorage.setItem('loccatdata',cat)});
    
  };

  handlecategory=(e)=>{
    this.setState({
      category:e.target.value
    })
  }
  addcatloc=()=>{
    let cat =localStorage.getItem('loccatdata')
    let catarr =[]
    catarr = JSON.parse(cat)
    catarr.push(this.state.category)
    let catstr = JSON.stringify(catarr)
    localStorage.setItem('loccatdata', catstr)
    alert("Category Added Successfully")
    this.setState({
      display:'none',

    },()=>{this.setinitial()})
    
  }
  catdisplay=()=>{
    this.setState({
      display:'block',
    })
  }
  nonedisplay=()=>{
    this.setState({
      display:'none'
    })
  }

  render() {
    return (
      <>
        <Header />
        <div className="productcont container mt-5 mb-5">
          <div className="row">
            <div className="col-md-7">
              <div className="prodList p-4">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th></th>
                      <th>PRODUCT NAME</th>
                      <th>UNIT SOLD</th>
                      <th>IN STOCK</th>
                      <th>EXPIRE DATE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.proddata.map((value) => (
                      <tr key={value.name}>
                        <td>
                          <input
                            type="checkbox"
                            checked={value.selected}
                            onChange={() => this.handleRowCheckboxChange(value.name)}
                          />
                        </td>
                        <td>{value.name}</td>
                        <td>{value.unitSold}</td>
                        <td>{value.stock}</td>
                        <td>{value.expireDate}</td>
                        <td>
                          <span className="trash" onClick={() => this.handleDeleteIndividual(value.name)}>
                            <BsTrash3Fill />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-warning w-100 mt-2 mb-3" onClick={this.handleDeleteSelected}>
                Delete Selected Products
              </button>
             <Link to="/product/add"><button className="btn btn-warning w-100">Add New Product</button></Link>
            </div>
            <div className="col-md-5">
              <div className="prodCat p-4">
                <h5>Product Categories</h5>
                <div className="prodcatlist">
                  {this.state.catdata.map((cat) => (
                    <React.Fragment key={cat}>
                      <div className="d-flex">
                        <h6>{cat}</h6>
                        <span className="trash ms-4" onClick={() => this.handleDeleteCategory(cat)}>
                          <BsTrash3Fill />
                        </span>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
                <button className="btn btn-warning mt-3 w-100" onClick={()=>this.catdisplay()} >Add New Category</button>
              </div>
            </div>
          </div>
          <div className="row addcatrow" style={{display:this.state.display}}>
            <div className="col-md-12 popupcat p-4">
              <h5 className='my-5 text-center'>ADD NEW CATEGORY</h5>
              <label htmlFor="">Enter Category Name</label>
              <input type="text" className='form-control' onChange={this.handlecategory} />
              <button className='btn btn-warning my-3' onClick={()=>this.addcatloc()}>Add Category</button>
             <Link to='/product'> <button className="btn btn-danger closeaddcat" onClick={()=>this.nonedisplay()}>Close</button></Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
