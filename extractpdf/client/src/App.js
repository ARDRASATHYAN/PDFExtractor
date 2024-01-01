import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Reg from './pages/Reg';
import Uploadpdf from './pages/Uploadpdf';
import Extractpdf from './pages/Extractpdf';


function App() {
  return (
    
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Reg/>}/>
        <Route path='/uploadpdf' element={<Uploadpdf/>}/>
        <Route path='/extractpdf' element={<Extractpdf/>}/>

        

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
