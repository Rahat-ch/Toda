import React, { } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Daily from '../components/Daily';

const DashboardPage = () => {
  const [user, error] = useAuth();
  const history = useHistory();
  if (error) {
    history.push('/')
  }
  return (
    <>
      {user && <h2>Hello {user.name}</h2>}
      <Daily />
    </>
  )
}

export default DashboardPage;
