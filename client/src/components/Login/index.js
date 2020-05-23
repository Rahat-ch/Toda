import React, { useState } from 'react';
import Signup from './Signup';
import SignIn from './SignIn';
import './login.css';

const Login = () => {
  const [isMember, setIsMember] = useState(true);
  return (
    <div className="authContainer">
      <div>
        <button className="authToggle" onClick={() => setIsMember(true)}>Login</button>
        <span>or</span>
        <button className="authToggle" onClick={() => setIsMember(false)} >SignUp</button>
      </div>
      {isMember ? (<SignIn setIsMember={setIsMember} />)
        : (<Signup setIsMember={setIsMember} />)}
    </div>
  )
}

export default Login;
