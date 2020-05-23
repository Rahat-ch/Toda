import React, { useState } from 'react';
import { ReactComponent as CheckBoxes } from '../../images/checkbox.svg'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password)
  }
  return (
    <div className="authInnerContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <label className="authLabel">
          <input
            className="authInput"
            type="name"
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="authHint">Enter an email</span>
        </label>
        <label className="authLabel">
          <input
            className="authInput"
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="authHint" >Enter an email</span>
        </label>
        <label className="authLabel">
          <input
            className="authInput"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="authHint" >Minimum six characters</span>
        </label>
        <input className="authSubmit" type="submit" value="Sign Up" />
      </form>
      <CheckBoxes className="checkboxes" />
    </div>
  )
}


export default Signup
