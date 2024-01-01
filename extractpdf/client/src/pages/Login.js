import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';




function Login() {
    const navigate=useNavigate()
    const [state,setState] = useState({})

    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setState({...state,[name]:value})
      }


      
      const Submit=(e)=>{
        console.log(state);
        e.preventDefault();
        
        axios.post('http://localhost:3000/log/login',state).then((response)=>{
          console.log("res===========>",response.data);
          if(response.data.success===true){

            //add data in localstorage

            localStorage.setItem('useremail',response.data.useremail)
            localStorage.setItem('u_login_id',response.data.loginId)
            localStorage.setItem('user_token',response.data.token)
            navigate('/uploadpdf')
            //toast
              toast.success('login successfuliy', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
          }
      
        }).catch((err)=>{
          console.log(err);
        })
      }
  return (
    <>
       <ToastContainer/>
 <Navbar/>
 <div className='container'> 
  <div class="wrapper">
     <form action="">
         <h2>login</h2>
         <div class="input-box">
             <span class="icon"><ion-icon name="person"></ion-icon></span>
             <input type="email" name='email' placeholder="email" required onChange={inputchange}/>
         </div>
         <div class="input-box">
             <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
             <input type="password" name='password' placeholder="password" required onChange={inputchange}/>
         </div>
         <div class="forgot-pass">
             <a href="#">forgot password? </a>
         </div>
         <button type="submit"  onClick={Submit}>Login</button>
         <div class="register-link">
             <p>Don't have an account?<a href="/register">Register here</a></p>
         </div>
     </form>
 </div></div>
    </>
  )
}

export default Login
