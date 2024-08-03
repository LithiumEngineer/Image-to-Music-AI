import logo from "./logo.svg"
import "./App.css"
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  
  return <div 
  className="text-red-500">
    <h1>Input Lyrics</h1>
    <div className="text-black-500">
    <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your lyrics"
      /> <br></br>
    </div>
    <button>Submit </button> <br></br>
  </div>
}

export default App
