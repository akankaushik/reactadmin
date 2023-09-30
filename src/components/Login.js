import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [pas, setPas] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json';
    axios.get(url).then((response) => {
      let data = response.data;
      localStorage.setItem('locdata', JSON.stringify(data));

      let productsPage = data.productsPage;
      let categories = data.productsPage.categories;
      let accountsPage = data.accountsPage;

      localStorage.setItem('locproddata', JSON.stringify(productsPage.products));
      localStorage.setItem('loccatdata', JSON.stringify(categories));
      localStorage.setItem('Admin', JSON.stringify(accountsPage.Admin));
      localStorage.setItem('Customer', JSON.stringify(accountsPage.Customer));
      localStorage.setItem('Editor', JSON.stringify(accountsPage.Editor));
      localStorage.setItem('Merchant', JSON.stringify(accountsPage.Merchant));
    });
  };

  const submit = () => {
    let getdata = localStorage.getItem('locdata');
    let cred = JSON.parse(getdata).accountsPage;

    for (let key in cred) {
      if (user === cred[key].email && pas === cred[key].password) {
        localStorage.setItem('Type', key);
        login();
        return; // Exit the loop once credentials match
      }
    }

    // If the loop doesn't find a matching account, show an alert.
    alert('Invalid Username or password');
  };

  const login = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="login">
        <div className="loginwrap">
          <h6>Welcome To Dashboard, Login</h6>
          <div className="mb-3">
            <p>User Name</p>
            <input
              type="text"
              className="form-control mt-1"
              id="floatingInput"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="">
            <p>Password</p>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              onChange={(e) => setPas(e.target.value)}
            />
          </div>
          <button className="btn btn-warning mt-4 w-100" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
