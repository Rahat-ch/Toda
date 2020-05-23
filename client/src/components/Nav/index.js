import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../apiRequests/auth';

const Nav = () => (
  <nav>
    <button onClick={() => logout()}>Logout</button>
  </nav>
);

export default Nav;
