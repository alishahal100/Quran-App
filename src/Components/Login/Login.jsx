import React ,{useState} from 'react'
import {BsFillPersonFill,BsGlobe2,BsGearFill,BsSearch} from 'react-icons/bs'
import './Login.css'
import { auth } from '../../Firebase/Config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email ,setEmail] = useState()
  const [password ,setPassword] = useState()
  const navigate = useNavigate()
  const handleSignIn= async(e)=>{
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      if(user){
        alert('welcome')
        navigate('/')
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    
  }
  return (
    <div className='qur-login-container'>

      <div className="qur-nav">
               <div className="qur-logo">
                <h1>QURAN</h1>
               </div>
               <div className="qur-nav-button">
                <BsFillPersonFill/>
                <BsGlobe2/>
                <BsGearFill/>
                <BsSearch/>
               </div>
       </div>
      <div className='qur-login-body'>
        <h1>Login</h1>
        <form>
          <div className='qur-login-inp'>           
            <input type="email" id="email" name="email" placeholder='Email Address' required value={email} onChange={(e) => setEmail(e.target.value)}/>         
              <input type="password" id="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required  />   
            </div>
            <div className='qur-login-btn'>
              <button onClick={handleSignIn}  disabled={!email || !password} type="submit">Login</button>
              <p>Don't have an account ? <a style={{fontSize:"large",fontWeight:"bold",textDecoration:"underline",cursor:"pointer"}} onClick={()=>{navigate('/Signup')}} >Sign Up</a></p>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Login