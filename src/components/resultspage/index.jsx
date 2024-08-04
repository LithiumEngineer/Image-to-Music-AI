import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

const Results = () => {
  const location = useLocation()
  const { inputList } = location.state || {}
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [audioUrl, setAudioUrl] = useState("")

  const handlePlay = () => {
    const audioBase64 = localStorage.getItem("generatedAudio")
    console.log("audio", audioBase64)
    if (audioBase64) {
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))],
        { type: "audio/wav" }
      )
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    } else {
      console.error("No audio data found in local storage.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/data", {
          inputs: inputList,
          seconds: 1.0,
          cfg: 3.0,
        })
        const audioBase64 = response.data.audio_base64
        localStorage.setItem("generatedAudio", audioBase64)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    if (inputList) {
      console.log(inputList)
      fetchData()
    }
  }, [inputList])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className="w-screen h-screen" style={{ backgroundColor: "#DBBB9E" }}>
        <img
          src="Main_Logo.jpg"
          className="w-[75px] h-[75px] rounded-3xl ml-3 mt-3"
        ></img>
        <div
          className="w-2/3 h-2/3 flex rounded-3xl items-center justify-center"
          style={{ backgroundColor: "#E5DDD0" }}
        ></div>
        <h1>Results Page</h1>
        <p>
          Received data:{" "}
          {apiData ? JSON.stringify(apiData) : "No data received"}
        </p>
        <button onClick={handlePlay}>Play Audio</button>
        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
}

export default Results
