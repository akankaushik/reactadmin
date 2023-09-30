import React, { Component } from 'react'
import './style.scss'
import Header from './Header'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, } from 'recharts';






export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            type:[],
            data: [],
            table: [],
            chartData: [],
            lineData: [],
            bardata: [],
            colors: ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'],
        }
    }
    componentDidMount() {
        let getdata = localStorage.getItem('locdata')
        let parsedata = JSON.parse(getdata).dasbhoardPage
        console.log(parsedata);
        let notice = parsedata.notifications
        this.setState({
            data: notice,
            table: parsedata.orders
        })
        let NewChartdata = []
        let newHits = []
        let newbar = []
        for (let keys in parsedata.storage) {

            NewChartdata.push({ name: keys, value: parsedata.storage[keys] })

        }
        for (let keys in parsedata.performance) {

            newbar.push({ name: keys, value: parsedata.performance[keys], color: (keys) })


        }
        for (let i = 0; i < parsedata.latestHits.months.length; i++) {

            newHits.push({ name: parsedata.latestHits.months[i], Latest: parsedata.latestHits.latest[i], Featured: parsedata.latestHits.featured[i], Popular: parsedata.latestHits.popular[i] },)
        }
        let type = localStorage.getItem('Type')
        this.setState({
            type: type,
            chartData: NewChartdata,
            lineData: newHits,
            bardata: newbar,
        })

    }

    render() {
        return (
            <>
                <Header />
                <div className="dashcont container mt-5 mb-5">
                    <h6>Welcome Back, {this.state.type}</h6>
                    <div className="row gx-4 p-3">
                        <div className="col">
                            <div className="latestHits p-3 borders">
                                <h5 className='mb-3'>Latest Hits</h5>

                                <div style={{ width: '100%', height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={this.state.lineData}>
                                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                            <XAxis dataKey="name"
                                                tick={{ fontSize: 11, fill: '#fff' }}
                                                tickLine={false} />
                                            <YAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} tick={{ fontSize: 13, fill: '#fff' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="Featured" stroke="#12fcd1" strokeWidth='2' name="Featured" fill="#12fcd1" />
                                            <Line type="monotone" dataKey="Latest" stroke="#fc7f12" strokeWidth='2' name="Latest" fill="#fc7f12" />
                                            <Line type="monotone" dataKey="Popular" stroke="#1ffa0f" strokeWidth='2' name="Popular" fill="#1ffa0f" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="performance p-3 borders">
                                <h5 className='mb-3'>Performance</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={this.state.bardata}
                                        layout="vertical"
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis type="number" tick={{ fontSize: 14, fill: '#fff' }} />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#fff' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="value"
                                            minPointSize={3}
                                            barSize={10}
                                        >
                                            {this.state.bardata.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-md-6">

                            <div className="storage p-3 borders">
                                <h5>Storage Information</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={this.state.chartData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label={(entry) => entry.name}
                                            >
                                                {this.state.chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={this.state.colors[index % this.state.colors.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="Noticification p-3 borders">
                                <h5>Noticification List</h5>
                                <div className="notgrid">

                                    {this.state.data.map((item) => (
                                        <div className=''>
                                            <div className='d-flex notgridcol p-3'>

                                                <img className='me-2' src={item.pic} alt="" />
                                                <p>{item.message}</p>

                                            </div>
                                            <br />
                                        </div>

                                    ))}

                                    {/* <div className="col-md-10">
                                    {this.state.data.map((item)=>(
                                        <p>{item.message}</p>
                                    ))}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tablesec container p-4">
                        <h6>Orders List</h6>
                        <div className="dashTable">
                        <table className="table table-hover table-stiped table-responsive-ms mt-4">
                            <thead>
                                <tr>

                                    <th scope="col">ORDER NO.</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">OPERATORS</th>
                                    <th scope="col">LOCATION</th>
                                    <th scope="col">DISTANCE</th>
                                    <th scope="col">START DATE</th>
                                    <th scope="col">EST DELIVERY DUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.table.map((value) => (


                                    <tr>

                                        <td>{value.orderNo}</td>
                                        <td>{value.status}</td>
                                        <td>{value.operators}</td>
                                        <td>{value.location}</td>
                                        <td>{value.distance}</td>
                                        <td>{value.startDate}</td>
                                        <td>{value.deliveryDate}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
