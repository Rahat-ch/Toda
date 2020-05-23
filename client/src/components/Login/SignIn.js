import React, { useState } from 'react';
import { ReactComponent as CheckBoxes } from '../../images/checkbox.svg'
import { useHistory } from 'react-router-dom';
import { login } from '../../apiRequests/auth'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password, history)
  }
  return (
    <div className="authInnerContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <label className="authLabel">
          <input
            className="authInput"
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="authHint">Enter an email</span>
        </label>
        <label className="authLabel">
          <input
            className="authInput"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="authHint">Enter Your Password</span>
        </label>
        <input className="authSubmit" type="submit" value="Log in" />
      </form>
      <CheckBoxes className="checkboxes" />
    </div>
  )
}


export default Signin
