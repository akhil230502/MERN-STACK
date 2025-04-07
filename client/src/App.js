import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Pages/Login'
import Staff from './Pages/Staff'
import Book from './Pages/Book'
import Home from './Pages/Home'
import User from './Pages/User'
import Addbook from './Pages/Addbook';
import Adduser from './Pages/Adduser';
import Borrow from './Pages/Borrow';
import Track from './Pages/Track';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/staff" element={<Staff />}></Route>
          <Route path="/book" element={<Book />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/addbook" element={<Addbook />}></Route>
          <Route path="/adduser" element={<Adduser />}></Route>
          <Route path="/borrow" element={<Borrow />}></Route>
          <Route path="/track" element={<Track />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
