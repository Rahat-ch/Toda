import React from 'react';
import { useQuery } from 'react-query';
import logo from './logo.svg';
import './App.css';

function App() {
  function fetchData() {
    return fetch("/api/v1/items").then(
      res => res.json()
    );
  }
  const { data, status } = useQuery("test", fetchData);
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
