import logo from "./logo.svg"
import "./App.css"
import React, { useState } from "react"
import Hi from "./components/textToMusic"
import ImageParser from "./components/imageParser"

function App() {
  return (
    <>
      <img src="react.png" className="h-20 w-20" id="reactimg"></img>
      <ImageParser />
    </>
  )
}

export default App
