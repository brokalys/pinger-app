import React from 'react';
import SignupForm from './components/SignupForm';
import './App.css';

function App() {
  return (
    <div className="el-container">
      <div className="el-main">
        <h1>Brokalys pingeris</h1>
        <p>
          Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā
          īpašuma sludinājumiem.
        </p>
        <SignupForm />
      </div>
    </div>
  );
}

export default App;
