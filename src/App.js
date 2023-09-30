import './App.scss';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Accounts from './components/Accounts';
// import ImageUploader from './components/Image'
import Addproduct from './components/Addproduct';
import Todo from './components/Todo'
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* < Dashboard/> */}
      {/* <Products/> */}
      {/* <Accounts/> */}
      {/* <ImageUploader/> */}
      {/* <Addproduct/> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/add" element={<Addproduct />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
