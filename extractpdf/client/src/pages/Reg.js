import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

function Reg() {
    const [state,setState] = useState({})

    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setState({...state,[name]:value})
      }


      const Submit=(e)=>{
        console.log(state);
        e.preventDefault();
        
    axios.post('http://localhost:3000/api/register',state).then((response)=>{ //register api
      console.log("res===========>",response.data);
      if(response.data.success===true){
        
          toast.success('registered successfuliy', {
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
      <Navbar/>
     <ToastContainer/>
      <div className='container'>
      <div className="wrapper">
  <form action="">
    <h2>Registration</h2>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="person" />
      </span>
      <input type="text" name='name' placeholder="Name" required="" onChange={inputchange} />
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="person" />
      </span>
      <input type="email" name='email' placeholder="email" required="" onChange={inputchange} />
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="lock-closed" />
      </span>
      <input type="password" name='password' placeholder="password" required="" onChange={inputchange} />
    </div>
    
    <button type="submit" onClick={Submit}>Register</button>
    <div className="register-link">
      <p>
        Already have an account<a href="/"> login here</a>
      </p>
    </div>
  </form>
</div>
      </div> 
    </>
  )
}

export default Reg
