import React from 'react';
import './App.css';
import FetchForm from './components/FetchForm'; // Import the FetchForm component
import QAForm from './components/QAForm'; // Import the QAForm component

const App = () => {
  return (
    <div className="App">
      <h1>Financial Avatar</h1>
      <FetchForm />
      <QAForm />
    </div>
  );
};

export default App;
