import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate=useNavigate()
    const token = localStorage.getItem('user_token');
  
    const Logout = () => {
      localStorage.removeItem('useremail');
      localStorage.removeItem('u_login_id');
      localStorage.removeItem('user_token');
      navigate('/');
    };
      const Login=()=>{
        navigate('/')
  
      }
      const extract=()=>{
        navigate('/extractpdf')
      }
      const upload=()=>{
        navigate('/uploadpdf')
      }
      
  return (
    <>
       <div class="banner">

<div className="nav ">
<h4 className='coloring'>PDF EXtractor</h4>
<ul>
<li>
<a href="#">Home</a>
</li>
<li>
<a href="#" onClick={upload}>Upload</a>
</li>
<li>
<a href="#" onClick={extract}>Extracted file</a>
</li>
{token ? (
      <li>
        <a href="#" onClick={Logout}>
          Logout
        </a>
      </li>
    ) : (
      <li>
        <a href="/" onClick={Login}>Login/Register</a>
      </li>
    )}
</ul>
</div>
</div>
    </>
  )
}

export default Navbar
