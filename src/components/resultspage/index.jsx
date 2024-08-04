import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { Loading } from "react-loading-dot"

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
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

  const handleClick = (e) => {
    e.preventDefault()
    navigate("/")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/data", {
          inputs: inputList,
          seconds: 3.0,
          cfg: 3.0,
        })
        const audioBase64 = response.data.audio_base64
        localStorage.setItem("generatedAudio", audioBase64)
        setLoading(false)
        handlePlay()
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

  if (loading)
    return (
      <div className="flex justify-around items-center w-screen h-screen bg-[#E1DBD5]">
        <div className="absolute top-4 left-4" onClick={handleClick}>
          <img
            src="Main_Logo.jpg"
            className="w-[75px] h-[75px] rounded-3xl ml-5 mt-3 hover:shadow-lg"
          ></img>
        </div>
        <div className="mx-auto my-auto w-fit h-fit">
          <p className="text-8xl text-center">...</p>
          <p className="text-6xl font-bold text-center">Loading</p>
          <p className="mt-2 text-lg text-center">
            Audiolux.AI Is Generating Your Personalized Music
          </p>
        </div>
      </div>
    )
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className="w-screen h-screen" style={{ backgroundColor: "#DBBB9E" }}>
        <div className="pt-3" onClick={handleClick}>
          <img
            src="Main_Logo.jpg"
            className="w-[75px] h-[75px] rounded-3xl ml-5 mt-3 hover:shadow-lg"
          ></img>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div
            className="w-2/3 h-2/3 flex flex-col rounded-3xl items-center justify-center"
            style={{ backgroundColor: "#E5DDD0" }}
          >
            {audioUrl && (
              <audio controls>
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
