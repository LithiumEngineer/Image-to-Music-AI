import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import Results from './components/resultspage';
import ImageParser from "./components/imageParser"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
