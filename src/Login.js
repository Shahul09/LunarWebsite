import React, {useState} from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    //preventts the page from refreshing
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      navigate('/'); // Navigate to home after successful sign-in
    //some firebase login shittt
  })
  .catch(error => alert(error.message));
  };

  const register = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // It creates a new user with email and password
        console.log(userCredential);
        navigate('/'); // Navigate to home after successful registration
      })
      .catch(error => alert(error.message)); 
  };
  return (
    <div className='login'>
      <Link to='/'>
      <img className='login_logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB81mu4GyyRPDcGDU3i9B7rKo47icRPsLa5g&s' alt=' ' />
      </Link>

      <div className='login_container'>
        <h1>Sign-in</h1>

        <form>
            <h5>E=mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit' className='login_signinbtn' onClick={signIn}> Sign-in</button>
        </form>
        
        <p>
           By signing-in you agree to amazon's 
           conditions of Use & Sale. Please 
           see our Privacy Notice, our Cookies Notice
           and our Interest-Based Ads 
        </p>

        <button className='login_regbtn' onClick={register}>Create your Lunar Account</button>
      </div>
    </div>
  )
}

export default Login
 

