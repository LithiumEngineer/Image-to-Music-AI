import logo from "./logo.svg"
import "./App.css"
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setOutput(inputValue);
  };

  return <div
    className="text-red-500">
    <h1>Input Lyrics</h1>
    <div style={{ padding: '20px' }} className="text-black">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your lyrics"
      /> <br></br>
    </div>
    <div className="text-blue-500">
      <button onclick="functionToExecute()">Submit</button> <br></br>
    </div>
  </div>
}

export default App
