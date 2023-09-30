    import React, { Component } from 'react'

    export default class Todo extends Component {
        constructor() {
            super();
            this.state = {
                list: "",
                lists: []
            }
        }
        add=()=>{
            if (this.state.list !== ''){
                this.setState({
                    lists: [...this.state.lists, this.state.list],
                    list:''
                })
            }
        }
        remove=(indx)=>{
            let newlist = this.state.lists.filter((_,i)=>{
               return i!==indx
            })
            this.setState({
                lists: newlist
            })
        }
        render() {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <input type="text" className='form-control' value={this.state.list} onChange={(e) => this.setState({ list: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <button className='btn btn-success' onClick={()=>this.add()}>Add Todo</button>
                            </div>
                        </div>
                                {this.state.lists.length !== 0? (this.state.lists.map((val,indx)=>(
                                    <div className="row" key={indx}>
                                    <div className="col-md-8">
                                        <p>{val}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <button className='btn btn-danger' onClick={()=>this.remove(indx)}>Remove</button>
                                    </div>
                                </div>
                                )))
                                : (<p>No Items added</p>)
                                }
                        
                    </div>
                </>
            )
        }
    }
