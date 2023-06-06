import React,{useState} from 'react'
import {BsFillPersonFill,BsGlobe2,BsGearFill,BsSearch} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { auth,db } from '../../Firebase/Config'
import { collection, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {

  const [email, setEmail] = useState();
  console.log('email:', email);
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('creating user with email:', email);
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userRef = collection(db, 'users');
      const newUser = {
        id: user.uid,
        email: email,
        password: password,
      };
      await setDoc(doc(userRef, user.uid), newUser);
      console.log('User details added to Firestore!');
      navigate('/Login');
    } catch (error) {
      alert(error.message);
    }
  };

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
        <h1>Signup</h1>
        <form>
          <div className='qur-login-inp'>           
            <input  type='email'
              
              placeholder={'Email address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
           />    
              <input type='password'               
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />              
              <input required type="text" id="username" name="username" placeholder='username' />
            </div>
            <div className='qur-login-btn'>
              <button type="submit" onClick={handleSubmit} disabled={!email || !password}>Signup</button>
              <p>Already have an account <a style={{fontSize:"large",fontWeight:"bold",textDecoration:"underline",cursor:"pointer"}} onClick={()=>{navigate('/Login')}} >login</a></p>
             </div>

        </form>
      </div>
    </div>
  )
}

export default Signup